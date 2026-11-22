import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  serviceName: z.string().trim().min(1).max(120),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format"),
  timeSlot: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional()
});

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }]
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Booking list failed:", error);
    return NextResponse.json({ error: "Unable to load bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid booking", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const date = new Date(`${parsed.data.date}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid booking date" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        ...parsed.data,
        date,
        slotKey: `${parsed.data.serviceName.toLowerCase()}|${parsed.data.date}|${parsed.data.timeSlot.toLowerCase()}`,
        phone: parsed.data.phone || null
      }
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This service and time slot are already booked" },
        { status: 409 }
      );
    }
    console.error("Booking creation failed:", error);
    return NextResponse.json({ error: "Unable to create booking" }, { status: 500 });
  }
}
