"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DebugAuthPage() {
  const { data: session, status } = useSession();

  const [backendResult, setBackendResult] =
    useState<any>(null);

  const [backendError, setBackendError] =
    useState("");

  useEffect(() => {
    const testBackend = async () => {
      try {
        const token = session?.accessToken;

        if (!token) {
          setBackendError(
            "No accessToken found in NextAuth session"
          );
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setBackendResult({
          status: response.status,
          data,
        });
      } catch (error) {
        setBackendError(
          error instanceof Error
            ? error.message
            : "Backend request failed"
        );
      }
    };

    if (status === "authenticated") {
      testBackend();
    }
  }, [session, status]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] p-8">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-3xl font-bold">
          Authentication Debug
        </h1>

        {/* SESSION STATUS */}

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            1. NextAuth Status
          </h2>

          <p>
            Status:
            <strong className="ml-2">
              {status}
            </strong>
          </p>
        </div>

        {/* SESSION */}

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            2. NextAuth Session
          </h2>

          <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
            {JSON.stringify(
              session,
              null,
              2
            )}
          </pre>
        </div>

        {/* TOKEN */}

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            3. Access Token
          </h2>

          <p className="break-all">
            {session?.accessToken
              ? session.accessToken
              : "❌ NO ACCESS TOKEN"}
          </p>
        </div>

        {/* BACKEND */}

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            4. Backend /api/orders
          </h2>

          {backendError && (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">
              {backendError}
            </div>
          )}

          {backendResult && (
            <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
              {JSON.stringify(
                backendResult,
                null,
                2
              )}
            </pre>
          )}

          {!backendError &&
            !backendResult &&
            status === "loading" && (
              <p>
                Checking authentication...
              </p>
            )}

        </div>

      </div>
    </main>
  );
}