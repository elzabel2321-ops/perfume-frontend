import { NextRequest, NextResponse } from "next/server";
import { fetchCatalogProduct } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const product = await fetchCatalogProduct(id);

  if (!product) {
    return NextResponse.json(
      { ok: false, message: "Product not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, product });
}
