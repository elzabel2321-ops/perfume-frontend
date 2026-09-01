"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyResetOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please request a new verification code.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setError(data?.message || "Invalid or expired verification code.");
        return;
      }

      if (data.resetToken) {
        sessionStorage.setItem("aromanova_reset_token", data.resetToken);
      }

      setSuccess("Verification successful. Redirecting...");
      setTimeout(() => {
        router.push("/reset");
      }, 700);
    } catch {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please request a new verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 404) {
        setError(
          data?.message ||
            "No account found for this email. Please register first."
        );
        return;
      }

      if (response.status === 429) {
        setError(
          data?.message ||
            "Please wait before requesting another verification code."
        );
        return;
      }

      if (!response.ok) {
        setError(data?.message || "Unable to process your request. Please try again.");
        return;
      }

      setOtp("");
      setSuccess(
        data?.message ||
          "If an account exists for this email, a verification code has been sent."
      );
    } catch {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-[560px]">
        <div className="rounded-3xl bg-white px-8 py-10 shadow-xl md:px-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-[0.25em] text-[#171717]">
              A ROMANOVA
            </h1>
            <div className="mx-auto mt-4 h-[2px] w-16 bg-[#C9A038]" />
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Verify Your Email
            </h2>
            <p className="mt-3 text-gray-500">
              Enter the 6-digit verification code we sent to your email.
            </p>
            {email ? (
              <p className="mt-3 break-all font-semibold text-gray-900">
                {email}
              </p>
            ) : (
              <p className="mt-3 text-red-500">Email address not found.</p>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="mb-3 block text-sm font-semibold text-gray-800"
              >
                6-Digit Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="000000"
                disabled={loading}
                required
                className="h-16 w-full rounded-xl border border-gray-200 bg-white px-4 text-center text-2xl font-semibold tracking-[0.5em] text-gray-900 outline-none transition focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038] disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6 || !email}
              className="h-16 w-full rounded-xl bg-[#C9A038] text-lg font-semibold text-black transition hover:bg-[#B38C2B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          <div className="mt-7 rounded-xl bg-[#FAF7F2] p-4 text-center">
            <p className="text-sm text-gray-600">
              Your verification code expires after{" "}
              <strong className="text-gray-800">10 minutes</strong>.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Didn&apos;t receive the code?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={loading || !email}
              className="mt-2 font-semibold text-[#B38C2B] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send a new code
            </button>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-[#B38C2B] hover:underline"
            >
              Change email address
            </Link>
          </div>

          <div className="mt-3 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyResetOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
          <p className="text-gray-600">Loading...</p>
        </main>
      }
    >
      <VerifyResetOtpForm />
    </Suspense>
  );
}
