import { NextResponse } from "next/server";
import { fetchCatalog } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await fetchCatalog();
  return NextResponse.json({ ok: true, products });
}
