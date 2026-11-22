import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [paidOrders, activeUsers, bookings, recentOrders] = await Promise.all([
      prisma.order.findMany({
        where: { status: { in: ["PAID", "SHIPPED"] } },
        select: { total: true, createdAt: true }
      }),
      prisma.user.count(),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.order.findMany({
        where: { status: { in: ["PAID", "SHIPPED"] } },
        orderBy: { createdAt: "desc" },
        take: 7,
        select: { total: true, createdAt: true }
      })
    ]);

    const revenue = paidOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const chart = recentOrders.reverse().map((order) => Number(order.total));

    return NextResponse.json({
      revenue: Number(revenue.toFixed(2)),
      activeUsers,
      confirmedBookings: bookings,
      paidOrders: paidOrders.length,
      chart,
      source: "postgresql"
    });
  } catch (error) {
    console.error("Dashboard metrics query failed:", error);
    return NextResponse.json({ error: "Unable to load dashboard metrics" }, { status: 500 });
  }
}
