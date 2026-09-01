"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { shopApi } from "@/lib/shopApi";

export default function OrdersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (sessionStatus === "unauthenticated") {
      setError("Please login to view your orders.");
      setIsLoading(false);
      return;
    }

    const token = session?.accessToken;
    if (!token) {
      setError("Please log out and log in again.");
      setIsLoading(false);
      return;
    }

    shopApi
      .orders(token)
      .then((result) => setOrders(result.orders || []))
      .catch((err) => setError(err.message || "Failed to load orders."))
      .finally(() => setIsLoading(false));
  }, [sessionStatus, session]);

  if (isLoading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2A2421]">My Orders</h1>
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
        )}
        {!error && orders.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center text-gray-500">
            You haven&apos;t placed any orders yet.
            <div className="mt-4">
              <Link href="/products" className="text-[#B38C2B] font-semibold">
                Browse products
              </Link>
            </div>
          </div>
        )}
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="block rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-semibold">{order.orderNumber || order._id}</p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#C9A038]">
                    {Number(order.totalAmount || 0).toFixed(2)}
                  </p>
                  <p className="text-sm capitalize text-gray-500">
                    {order.paymentStatus} / {order.orderStatus}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
