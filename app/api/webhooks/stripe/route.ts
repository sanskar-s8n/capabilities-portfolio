import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;

  if (!secret || !key) {
    return NextResponse.json({ received: true, mode: "demo" });
  }

  const stripe = new Stripe(key);
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId || session.payment_status !== "paid") {
        return NextResponse.json({ received: true, ignored: true });
      }

      const result = await prisma.order.updateMany({
        where: { id: orderId, stripeSession: session.id, status: "PENDING" },
        data: { status: "PAID" }
      });

      return NextResponse.json({ received: true, updated: result.count === 1 });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        return NextResponse.json({ received: true, ignored: true });
      }

      const released = await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: { id: orderId, stripeSession: session.id, status: "PENDING" },
          include: { items: true }
        });

        if (!order) return false;

        const updated = await tx.order.updateMany({
          where: { id: orderId, stripeSession: session.id, status: "PENDING" },
          data: { status: "CANCELLED" }
        });

        if (updated.count !== 1) return false;

        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { inventory: { increment: item.quantity } }
          });
        }

        return true;
      });

      return NextResponse.json({ received: true, inventoryReleased: released });
    }

    return NextResponse.json({ received: true, ignored: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
