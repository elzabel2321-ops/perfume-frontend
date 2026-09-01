import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/backend";
import {
  GENERIC_ERROR_MESSAGE,
  RESET_COOKIE_NAME,
  clearResetCookie,
  isStrongPassword,
  jsonError,
  jsonOk,
} from "@/lib/password-reset";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body?.password || body?.newPassword || "");
    const confirmPassword = String(body?.confirmPassword || "");
    const cookieToken = req.cookies.get(RESET_COOKIE_NAME)?.value || "";
    const bodyToken = String(body?.resetToken || "");
    const resetToken = cookieToken || bodyToken;

    if (!resetToken) {
      return jsonError(
        "Your reset session expired. Please verify your email again.",
        400
      );
    }

    if (password !== confirmPassword) {
      return jsonError("Passwords do not match.", 400);
    }

    if (!isStrongPassword(password)) {
      return jsonError(
        "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one number, and one special character.",
        400
      );
    }

    const { response, data } = await backendFetch(
      `/api/auth/reset-password/${encodeURIComponent(resetToken)}`,
      {
        method: "POST",
        body: JSON.stringify({ password, confirmPassword }),
      }
    );

    if (!response.ok || !data?.ok) {
      return jsonError(
        data?.message ||
          "Your reset session expired. Please verify your email again.",
        400
      );
    }

    const result = jsonOk("Your password has been reset successfully.");
    clearResetCookie(result);
    return result;
  } catch (error) {
    console.error(
      "Password reset confirmation failed.",
      error instanceof Error ? error.message : "unknown error"
    );
    return jsonError(GENERIC_ERROR_MESSAGE, 500);
  }
}
