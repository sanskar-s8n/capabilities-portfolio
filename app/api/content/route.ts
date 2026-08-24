import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { slug: "welcome", title: "Welcome to the Content Hub", status: "published", excerpt: "Demo content for the portfolio." }
  ]);
}
