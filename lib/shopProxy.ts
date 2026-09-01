import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBackendUrl } from "@/lib/backend";

export async function proxyBackend(
  req: NextRequest,
  backendPath: string,
  options?: { requireAuth?: boolean }
) {
  try {
    const requireAuth = options?.requireAuth !== false;
    const session = await auth();
    const token = session?.accessToken;

    if (requireAuth && (!session || !token)) {
      return NextResponse.json(
        { ok: false, message: "Please log in to continue." },
        { status: 401 }
      );
    }

    const headers = new Headers();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const contentType = req.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const method = req.method.toUpperCase();
    const body =
      method === "GET" || method === "HEAD" ? undefined : await req.text();

    const response = await fetch(`${getBackendUrl()}${backendPath}`, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Shop proxy failed.",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "Cannot reach the shop API. Please make sure perfume-backend is running on port 4000.",
      },
      { status: 503 }
    );
  }
}
