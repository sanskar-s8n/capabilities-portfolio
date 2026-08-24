import { NextResponse } from "next/server";

const listings = [
  { id: "l1", title: "Modern 2BHK", category: "real-estate", price: 22000, location: { lat: 21.1458, lng: 79.0882 } },
  { id: "l2", title: "Frontend Developer", category: "jobs", price: 90000, location: { lat: 21.149, lng: 79.08 } },
  { id: "l3", title: "Design Studio", category: "services", price: 15000, location: { lat: 21.14, lng: 79.09 } }
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const data = listings.filter(x => (!category || x.category === category) && (!q || x.title.toLowerCase().includes(q)));
  return NextResponse.json({ data, count: data.length });
}
