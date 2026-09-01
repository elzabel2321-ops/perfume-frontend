import { NextRequest } from "next/server";
import { proxyBackend } from "@/lib/shopProxy";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return proxyBackend(req, "/api/checkout");
}
