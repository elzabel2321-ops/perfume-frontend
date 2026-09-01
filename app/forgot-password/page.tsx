"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [needsRegister, setNeedsRegister] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setNeedsRegister(false);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 404) {
        setNeedsRegister(true);
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
        setError(
          data?.message || "Unable to process your request. Please try again."
        );
        return;
      }

      setSuccess(
        data?.message || "A verification code has been sent to your email."
      );

      setTimeout(() => {
        router.push(
          `/verify-reset-otp?email=${encodeURIComponent(cleanEmail)}`
        );
      }, 900);
    } catch {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto w-full max-w-[760px] rounded-3xl bg-white px-8 py-12 shadow-xl md:px-14">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-[0.25em] text-[#171717]">
            A ROMANOVA
          </h1>
          <p className="mt-4 text-xl text-gray-500">Forgot your password?</p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Enter the email address you registered with. We will send a 6-digit
            verification code so you can reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-600">
            {error}
            {needsRegister && (
              <div className="mt-3">
                <Link
                  href="/signup"
                  className="font-semibold text-[#B38C2B] hover:underline"
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="mb-3 block text-lg font-semibold text-gray-800"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={25}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                disabled={loading}
                required
                className="h-16 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-5 text-lg text-gray-900 outline-none transition focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-16 w-full rounded-xl bg-[#C9A038] text-lg font-semibold text-black transition hover:bg-[#B38C2B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending Verification Code..." : "Send Verification Code"}
          </button>
        </form>

        <div className="mt-8 rounded-xl bg-[#FAF7F2] p-5 text-center">
          <p className="text-sm text-gray-600">
            The verification code will expire after <strong>10 minutes</strong>.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="font-semibold text-[#B38C2B] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
