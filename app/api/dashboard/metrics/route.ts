import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    revenue: 48250,
    activeUsers: 1284,
    conversion: 7.8,
    chart: [12, 19, 15, 28, 31, 38, 44]
  });
}
