"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { shopApi } from "@/lib/shopApi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tab, setTab] = useState<"info" | "orders" | "notifications">("info");
  const [orders, setOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState("");

  const user = session?.user;
  const isAdmin = user?.role === "admin" || user?.role === "admnin";
  const token = session?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    if (!token) return;
    if (tab === "orders") {
      shopApi
        .orders(token)
        .then((r) => setOrders(r.orders || []))
        .catch((e) => setError(e.message));
    }
    if (tab === "notifications") {
      shopApi
        .notifications(token)
        .then((r) => setNotifications(r.notifications || []))
        .catch((e) => setError(e.message));
    }
  }, [tab, token]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-[#2A2421]">My Profile</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["info", "Account"],
            ["orders", "My Orders"],
            ["notifications", "Notifications"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as any)}
              className={`rounded-full px-4 py-2 text-sm ${
                tab === id ? "bg-[#C9A038] text-black" : "bg-[#FAF7F2]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {tab === "info" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-[#FAF7F2] p-5">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{user?.name || "User"}</p>
            </div>
            <div className="rounded-xl bg-[#FAF7F2] p-5">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div className="rounded-xl bg-[#FAF7F2] p-5">
              <p className="text-sm text-gray-500">Account type</p>
              <p className="font-semibold capitalize">{user?.role || "customer"}</p>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-6 space-y-3">
            {orders.length === 0 && (
              <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
            )}
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block rounded-xl border p-4"
              >
                {order.orderNumber} · {order.orderStatus} ·{" "}
                {Number(order.totalAmount || 0).toFixed(2)}
              </Link>
            ))}
          </div>
        )}

        {tab === "notifications" && (
          <div className="mt-6 space-y-3">
            {notifications.length === 0 && (
              <p className="text-gray-500">No notifications yet.</p>
            )}
            {notifications.map((item) => (
              <div key={item._id} className="rounded-xl bg-[#FAF7F2] p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        )}

        {isAdmin && (
          <button
            type="button"
            onClick={() => router.push("/admnin")}
            className="mt-8 w-full rounded-xl bg-[#C9A038] px-6 py-3 font-semibold"
          >
            Admin Dashboard
          </button>
        )}

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-4 w-full rounded-xl bg-[#111111] px-6 py-3 font-semibold text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
