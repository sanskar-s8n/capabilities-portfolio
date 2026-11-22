import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const checkoutSchema = z.object({
  cartItems: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(20)
  })).min(1).max(30)
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart", details: parsed.error.flatten() }, { status: 400 });
  }

  const quantities = new Map<string, number>();
  for (const item of parsed.data.cartItems) {
    quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity);
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: [...quantities.keys()] } }
      });
      if (products.length !== quantities.size) {
        throw new Error("One or more products are unavailable");
      }

      const items = products.map((product) => {
        const quantity = quantities.get(product.id)!;
        if (product.inventory < quantity) {
          throw new Error(`Insufficient inventory for ${product.name}`);
        }
        return { productId: product.id, quantity, price: product.price };
      });

      for (const item of items) {
        const updated = await tx.product.updateMany({
          where: { id: item.productId, inventory: { gte: item.quantity } },
          data: { inventory: { decrement: item.quantity } }
        });
        if (updated.count !== 1) throw new Error("Inventory changed. Please refresh your cart.");
      }

      const total = items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );

      return tx.order.create({
        data: {
          total: new Prisma.Decimal(total.toFixed(2)),
          status: "PENDING",
          items: { create: items }
        },
        include: { items: { include: { product: true } } }
      });
    });

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        mode: "demo",
        message: "Order created in demo mode. No payment was collected.",
        orderId: order.id,
        status: order.status,
        total: order.total.toString()
      }, { status: 201 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: order.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: { name: item.product.name },
            unit_amount: Math.round(Number(item.price) * 100)
          },
          quantity: item.quantity
        })),
        metadata: { orderId: order.id },
        success_url: `${origin}/playground/ecommerce?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/playground/ecommerce?checkout=cancelled`
      });
    } catch (stripeError) {
      await prisma.$transaction(async (tx) => {
        await tx.order.updateMany({
          where: { id: order.id, status: "PENDING" },
          data: { status: "CANCELLED" }
        });
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { inventory: { increment: item.quantity } }
          });
        }
      });
      throw stripeError;
    }

    try {
      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSession: session.id }
      });
    } catch (saveError) {
      try {
        await stripe.checkout.sessions.expire(session.id);
      } catch (expireError) {
        console.error("Could not expire unlinked Stripe session:", expireError);
      }
      await prisma.$transaction(async (tx) => {
        await tx.order.updateMany({
          where: { id: order.id, status: "PENDING" },
          data: { status: "CANCELLED" }
        });
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { inventory: { increment: item.quantity } }
          });
        }
      });
      throw saveError;
    }

    return NextResponse.json({ mode: "stripe", orderId: order.id, url: session.url }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    const status = message.includes("unavailable") || message.includes("Insufficient") || message.includes("Inventory changed") ? 409 : 500;
    console.error("Checkout failed:", error);
    return NextResponse.json({ error: message }, { status });
  }
}
