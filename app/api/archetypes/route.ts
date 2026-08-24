import { NextResponse } from "next/server";
import { archetypes } from "@/lib/constants";

export async function GET() {
  return NextResponse.json(archetypes);
}
