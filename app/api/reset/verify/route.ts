import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backend";
import {
  GENERIC_ERROR_MESSAGE,
  RESET_COOKIE_NAME,
  isValidEmail,
  jsonError,
  jsonOk,
  normalizeEmail,
  resetCookieOptions,
} from "@/lib/password-reset";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email);
    const otp = String(body?.otp || "").trim();

    if (!email || !isValidEmail(email) || !/^\d{6}$/.test(otp)) {
      return jsonError("Invalid or expired verification code.", 400);
    }

    const { response, data } = await backendFetch(
      "/api/auth/verify-reset-otp",
      {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      }
    );

    if (!response.ok || !data?.ok || !data?.resetToken) {
      return jsonError(
        data?.message || "Invalid or expired verification code.",
        400
      );
    }

    const resetToken = String(data.resetToken);
    const cookieStore = await cookies();
    cookieStore.set(RESET_COOKIE_NAME, resetToken, resetCookieOptions());

    const result = jsonOk("Verification successful.", { resetToken });
    result.cookies.set(RESET_COOKIE_NAME, resetToken, resetCookieOptions());

    console.info("Password reset OTP verified.");
    return result;
  } catch (error) {
    console.error(
      "Password reset OTP verification failed.",
      error instanceof Error ? error.message : "unknown error"
    );
    return jsonError(GENERIC_ERROR_MESSAGE, 500);
  }
}
