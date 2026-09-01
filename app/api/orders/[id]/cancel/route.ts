import { NextRequest } from "next/server";
import { proxyBackend } from "@/lib/shopProxy";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return proxyBackend(req, `/api/orders/${id}/cancel`);
}
