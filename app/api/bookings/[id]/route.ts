import { NextResponse } from "next/server";
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; return NextResponse.json({ id, status: "CANCELLED", mode: "demo" }); }
