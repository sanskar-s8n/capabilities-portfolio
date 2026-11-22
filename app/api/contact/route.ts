import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional(),
  archetypeInterest: z.enum(["ecommerce", "listing", "content", "saas", "booking", "custom"]),
  message: z.string().trim().min(10).max(5000)
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const lead = await prisma.contactLead.create({
      data: {
        ...parsed.data,
        company: parsed.data.company || null
      },
      select: { id: true, createdAt: true }
    });
    return NextResponse.json({ ok: true, message: "Lead captured", lead }, { status: 201 });
  } catch (error) {
    console.error("Contact lead creation failed:", error);
    return NextResponse.json({ error: "Unable to save your request right now" }, { status: 500 });
  }
}
