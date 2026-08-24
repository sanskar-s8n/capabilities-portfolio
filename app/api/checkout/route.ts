import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.json();
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ mode: "demo", message: "Stripe is not configured. Add STRIPE_SECRET_KEY to enable sandbox checkout.", cart: body }, { status: 200 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: (body.cartItems || []).map((item: any) => ({
      price_data: { currency: "usd", product_data: { name: item.name }, unit_amount: Math.round(Number(item.price) * 100) },
      quantity: Number(item.quantity || 1)
    })),
    mode: "payment",
    success_url: `${origin}/ecommerce/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/ecommerce/cancel`
  });
  return NextResponse.json({ url: session.url });
}
