import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBackendUrl } from "@/lib/backend";

export const runtime = "nodejs";

async function proxy(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    const isAdmin = role === "admin" || role === "admnin";

    if (!session || !isAdmin) {
      return NextResponse.json(
        { ok: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const token = session.accessToken;
    if (!token) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Authentication token is missing. Please log out and log in again.",
        },
        { status: 401 }
      );
    }

    const { path } = await context.params;
    const target = `${getBackendUrl()}/api/admin/${path.join("/")}${req.nextUrl.search}`;

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);

    const contentType = req.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const method = req.method.toUpperCase();
    const body =
      method === "GET" || method === "HEAD" ? undefined : await req.text();

    const response = await fetch(target, {
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
      "Admin proxy failed.",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Cannot reach the admin API. Please make sure perfume-backend is running on port 4000.",
      },
      { status: 503 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
