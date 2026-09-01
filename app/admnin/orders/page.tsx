"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

const STATUSES = [
  "",
  "pending_payment",
  "paid",
  "processing",
  "approved",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const token = session?.accessToken;

  const loadOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (orderStatus) params.set("orderStatus", orderStatus);
      if (paymentStatus) params.set("paymentStatus", paymentStatus);
      params.set("page", String(page));
      params.set("limit", "20");
      const result = await adminApi.orders(token, `?${params.toString()}`);
      setOrders(result?.orders || []);
      setPages(result?.pages || 1);
      setError("");
    } catch (err: any) {
      setError(err?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") loadOrders();
  }, [status, token, page, orderStatus, paymentStatus]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A2421]">Orders</h1>
        <p className="mt-1 text-gray-500">Search, filter, and process customer orders.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, order number"
          className="rounded-xl border px-4 py-2"
        />
        <button
          type="button"
          onClick={() => {
            setPage(1);
            loadOrders();
          }}
          className="rounded-xl bg-black px-4 py-2 text-white"
        >
          Search
        </button>
        <select
          value={orderStatus}
          onChange={(e) => {
            setPage(1);
            setOrderStatus(e.target.value);
          }}
          className="rounded-xl border px-3 py-2"
        >
          {STATUSES.map((s) => (
            <option key={s || "all"} value={s}>
              {s || "All order statuses"}
            </option>
          ))}
        </select>
        <select
          value={paymentStatus}
          onChange={(e) => {
            setPage(1);
            setPaymentStatus(e.target.value);
          }}
          className="rounded-xl border px-3 py-2"
        >
          {["", "pending", "paid", "failed", "refunded"].map((s) => (
            <option key={s || "pay"} value={s}>
              {s || "All payment statuses"}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No orders found.
        </div>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/admnin/orders/${order._id}`}
            className="block rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {order.customer?.name || order.user?.name} ·{" "}
                  {order.customer?.email || order.user?.email}
                </p>
                <p className="text-sm text-gray-500">
                  {order.items?.length || 0} products
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {Number(order.totalAmount || 0).toFixed(2)}
                </p>
                <p className="text-sm capitalize">
                  {order.paymentStatus} / {order.orderStatus}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span>
          Page {page} / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
