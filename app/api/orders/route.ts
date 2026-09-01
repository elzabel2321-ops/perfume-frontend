import { NextRequest } from "next/server";
import { proxyBackend } from "@/lib/shopProxy";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return proxyBackend(req, `/api/orders${req.nextUrl.search}`);
}
