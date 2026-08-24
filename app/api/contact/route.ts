import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  archetypeInterest: z.enum(["ecommerce","listing","content","saas","booking","custom"]),
  message: z.string().min(10)
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  console.log("LEAD", parsed.data);
  return NextResponse.json({ ok: true, message: "Lead captured" });
}
