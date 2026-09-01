import { NextRequest } from "next/server";
import { proxyBackend } from "@/lib/shopProxy";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return proxyBackend(req, `/api/notifications${req.nextUrl.search}`);
}
