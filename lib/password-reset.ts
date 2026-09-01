import { createHash, randomBytes, randomInt, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const RESET_TOKEN_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_REQUEST_COOLDOWN_MS = 60 * 1000;
export const RESET_COOKIE_NAME = "aromanova_reset_authorization";

export const REGISTERED_REQUEST_MESSAGE =
  "A verification code has been sent to your email.";

export const UNREGISTERED_MESSAGE =
  "No account found for this email. Please register first.";

export const GENERIC_ERROR_MESSAGE =
  "Unable to process your request. Please try again.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: unknown) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function isStrongPassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function secretsMatch(storedHash: string, candidate: string) {
  const candidateHash = hashSecret(candidate);
  const storedBuffer = Buffer.from(storedHash, "utf8");
  const candidateBuffer = Buffer.from(candidateHash, "utf8");

  if (storedBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, candidateBuffer);
}

export function generateOtp() {
  return randomInt(100000, 1000000).toString();
}

export function generateResetToken() {
  return randomBytes(32).toString("hex");
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

export function jsonOk(message: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: true, message, ...extra });
}

export function resetCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(RESET_TOKEN_TTL_MS / 1000),
  };
}

export function clearResetCookie(response: NextResponse) {
  response.cookies.set(RESET_COOKIE_NAME, "", {
    ...resetCookieOptions(),
    maxAge: 0,
  });
  return response;
}
