import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.json({
    mode: "demo",
    query: {
      lat: Number(url.searchParams.get("lat") || 21.1458),
      lng: Number(url.searchParams.get("lng") || 79.0882),
      radius: Number(url.searchParams.get("radius") || 5000)
    },
    data: []
  });
}
