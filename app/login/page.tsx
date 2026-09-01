"use client";

import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // EMAIL + PASSWORD LOGIN
  // =====================================================

  const handleLogin = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    console.log("Login result:", result);

    // ==========================================
    // LOGIN FAILED
    // ==========================================

    if (!result || result.error) {
      setError("Email or password is incorrect.");
      setLoading(false);
      return;
    }

    // ==========================================
    // GET SESSION
    // ==========================================

    const response = await fetch(
      "/api/auth/session",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      setError(
        "Login succeeded, but your session could not be loaded."
      );

      setLoading(false);
      return;
    }

    const session = await response.json();

    console.log(
      "Current session:",
      session
    );

    // ==========================================
    // GET ROLE
    // ==========================================

    const role = session?.user?.role;
    const isAdmin = role === "admin" || role === "admnin";

    if (isAdmin) {
      router.replace("/admnin");
      router.refresh();
      return;
    }



    // ==========================================
    // CUSTOMER
    // ==========================================

    console.log(
      "✅ CUSTOMER LOGIN - GOING TO HOME"
    );

    router.replace("/");
    router.refresh();

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    setError(
      "Something went wrong. Please try again."
    );

    setLoading(false);
  }
};
  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {

      await signIn("google", {
        callbackUrl: "/",
      });

    } catch (error) {

      console.error(
        "Google login error:",
        error
      );

      setError(
        "Google login failed. Please try again."
      );

      setGoogleLoading(false);
    }
  };

  // =====================================================
  // IF SESSION IS LOADING
  // =====================================================

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">

        <p className="text-gray-600">
          Checking your account...
        </p>

      </main>
    );
  }

  // =====================================================
  // LOGIN UI
  // =====================================================

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-4 py-10">

      <div className="w-full max-w-[560px] rounded-3xl bg-white px-8 py-10 shadow-xl md:px-12">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold tracking-[0.25em] text-[#171717] md:text-4xl">
            A ROMANOVA
          </h1>

          <p className="mt-3 text-gray-500">
            Welcome back
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}


        {/* =================================================
            EMAIL + PASSWORD FORM
        ================================================= */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* =================================================
              EMAIL
          ================================================= */}

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email
            </label>

            <div className="relative">

              <Mail
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={loading}
                className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-gray-900 outline-none transition focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038] disabled:bg-gray-100"
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-800"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#B38C2B] hover:underline"
              >
                Forgot password?
              </Link>

            </div>


            <div className="relative">

              <Lock
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />


              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-14 text-gray-900 outline-none transition focus:border-[#C9A038] focus:ring-1 focus:ring-[#C9A038] disabled:bg-gray-100"
              />


              {/* SHOW PASSWORD */}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >

                {showPassword ? (
                  <EyeOff size={21} />
                ) : (
                  <Eye size={21} />
                )}

              </button>

            </div>

          </div>


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={
              loading ||
              googleLoading
            }
            className="h-14 w-full rounded-xl bg-[#C9A038] text-lg font-semibold text-black transition hover:bg-[#B38C2B] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="my-7 flex items-center gap-4">

          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />

        </div>


        {/* =================================================
            GOOGLE LOGIN
        ================================================= */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={
            loading ||
            googleLoading
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >

          <span className="text-lg font-bold">
            G
          </span>

          {googleLoading
            ? "Connecting..."
            : "Continue with Google"}

        </button>


        {/* =================================================
            SIGN UP
        ================================================= */}

        <div className="mt-7 text-center">

          <p className="text-sm text-gray-500">
            Don't have an account?
          </p>

          <Link
            href="/signup"
            className="mt-2 inline-block font-semibold text-[#B38C2B] hover:underline"
          >
            Create an account
          </Link>

        </div>

      </div>

    </main>
  );
}