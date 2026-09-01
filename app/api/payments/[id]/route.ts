import { NextRequest } from "next/server";
import { proxyBackend } from "@/lib/shopProxy";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return proxyBackend(req, `/api/payments/${id}`);
}
