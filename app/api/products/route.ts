import { NextResponse } from "next/server";

const products = [
  { id: "p1", name: "Starter Kit", price: 49, inventory: 12, category: "kits" },
  { id: "p2", name: "Pro Kit", price: 99, inventory: 8, category: "kits" },
  { id: "p3", name: "Growth Pack", price: 149, inventory: 5, category: "packs" }
];

export async function GET() { return NextResponse.json(products); }
