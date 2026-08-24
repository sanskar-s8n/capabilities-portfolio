import { NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  serviceName: z.string().min(1),
  date: z.string(),
  timeSlot: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional()
});

const bookings: any[] = [];

export async function GET() { return NextResponse.json(bookings); }

export async function POST(req: Request) {
  const parsed = bookingSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid booking" }, { status: 400 });
  const conflict = bookings.some(b => b.date === parsed.data.date && b.timeSlot === parsed.data.timeSlot && b.serviceName === parsed.data.serviceName);
  if (conflict) return NextResponse.json({ error: "Time slot already booked" }, { status: 409 });
  const booking = { id: crypto.randomUUID(), ...parsed.data, status: "CONFIRMED", createdAt: new Date().toISOString() };
  bookings.push(booking);
  return NextResponse.json(booking, { status: 201 });
}
