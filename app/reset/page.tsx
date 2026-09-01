"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock, X } from "lucide-react";

export default function ResetPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isStrongPassword =
    passwordRequirements.length &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.special;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isStrongPassword) {
      setError("Password is not strong enough. Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          password,
          confirmPassword,
          resetToken: sessionStorage.getItem("aromanova_reset_token") || "",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setError(data?.message || "Unable to process your request. Please try again.");
        return;
      }

      setSuccess(
        data?.message || "Your password has been reset successfully."
      );
      sessionStorage.removeItem("aromanova_reset_token");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch {
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Requirement = ({
    valid,
    children,
  }: {
    valid: boolean;
    children: React.ReactNode;
  }) => (
    <div
      className={`flex items-center gap-2 text-sm ${
        valid ? "text-green-600" : "text-gray-500"
      }`}
    >
      {valid ? <Check size={16} /> : <X size={16} />}
      <span>{children}</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto w-full max-w-[760px] rounded-3xl bg-white px-8 py-12 shadow-xl md:px-14">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-[0.25em] text-[#171717]">
            A ROMANOVA
          </h1>
          <p className="mt-4 text-xl text-gray-500">Reset your password</p>
          <p className="mt-8 text-lg text-gray-600">
            Create a strong new password for your account.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-600">
            {error}
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
              htmlFor="password"
              className="mb-3 block text-lg font-semibold text-gray-800"
            >
              New Password
            </label>
            <div className="relative">
              <Lock
                size={24}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                required
                className="h-16 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-14 text-lg text-gray-900 outline-none focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                Password must contain:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <Requirement valid={passwordRequirements.length}>
                  At least 8 characters
                </Requirement>
                <Requirement valid={passwordRequirements.uppercase}>
                  One uppercase letter
                </Requirement>
                <Requirement valid={passwordRequirements.lowercase}>
                  One lowercase letter
                </Requirement>
                <Requirement valid={passwordRequirements.number}>
                  One number
                </Requirement>
                <Requirement valid={passwordRequirements.special}>
                  One special character
                </Requirement>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-3 block text-lg font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={24}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
                className="h-16 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-14 text-lg text-gray-900 outline-none focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038]"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>
            {confirmPassword && (
              <p
                className={`mt-2 text-sm ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading || !isStrongPassword || password !== confirmPassword
            }
            className="h-16 w-full rounded-xl bg-[#C9A038] text-lg font-semibold text-black transition hover:bg-[#B38C2B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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
