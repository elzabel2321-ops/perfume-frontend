import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    const { response, data } = await backendFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    return NextResponse.json(
      data || {
        ok: false,
        message: "Unable to create your account. Please try again.",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error(
      "Register proxy failed.",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Cannot reach the authentication server. Please make sure perfume-backend is running on port 4000.",
      },
      { status: 503 }
    );
  }
}
