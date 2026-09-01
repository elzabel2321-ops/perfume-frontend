import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/backend";
import { sendResetOtpEmail } from "@/lib/send-reset-otp-email";
import {
  GENERIC_ERROR_MESSAGE,
  OTP_TTL_MS,
  REGISTERED_REQUEST_MESSAGE,
  UNREGISTERED_MESSAGE,
  generateOtp,
  hashSecret,
  isValidEmail,
  jsonError,
  jsonOk,
  normalizeEmail,
} from "@/lib/password-reset";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return jsonError(GENERIC_ERROR_MESSAGE, 500);
    }

    const body = await req.json();
    const email = normalizeEmail(body?.email);

    if (!email || !isValidEmail(email)) {
      return jsonError("Please enter a valid email address.", 400);
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

    const { response, data } = await backendFetch("/api/auth/reset/store-otp", {
      method: "POST",
      body: JSON.stringify({
        email,
        otpHash: hashSecret(otp),
        expiresAt,
      }),
    });

    if (response.status === 404) {
      return jsonError(data?.message || UNREGISTERED_MESSAGE, 404);
    }

    if (response.status === 429) {
      return jsonError(
        data?.message ||
          "Please wait before requesting another verification code.",
        429
      );
    }

    if (!response.ok || !data?.ok) {
      return jsonError(data?.message || GENERIC_ERROR_MESSAGE, 500);
    }

    const destination = String(data.email || email);
    await sendResetOtpEmail(destination, otp);

    console.info("Password reset email sent for a registered account.");
    return jsonOk(REGISTERED_REQUEST_MESSAGE);
  } catch (error) {
    console.error(
      "Password reset request failed.",
      error instanceof Error ? error.message : "unknown error"
    );
    return jsonError(
      "Unable to send the verification code. Please try again.",
      500
    );
  }
}
