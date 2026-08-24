import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) return NextResponse.json({ received: true, mode: "demo" });
  const stripe = new Stripe(key);
  const signature = (await headers()).get("stripe-signature");
  const raw = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(raw, signature || "", secret);
    console.log("Stripe event:", event.type);
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
