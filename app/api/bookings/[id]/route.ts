import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    if (booking.status === "CANCELLED") {
      return NextResponse.json(booking);
    }

    const cancelled = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED", slotKey: null }
    });
    return NextResponse.json(cancelled);
  } catch (error) {
    console.error("Booking cancellation failed:", error);
    return NextResponse.json({ error: "Unable to cancel booking" }, { status: 500 });
  }
}
