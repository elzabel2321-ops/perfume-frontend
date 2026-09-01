"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

export default function PaymentsPage() {
  const { data: session, status } = useSession();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (filter) params.set("status", filter);
    adminApi
      .payments(session.accessToken, `?${params.toString()}`)
      .then((result) => setPayments(result?.payments || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [session, status, filter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payments</h1>
      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search customer or order"
          className="rounded-xl border px-4 py-2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
      {loading && <p>Loading payments...</p>}
      {error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      <div className="overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="px-6 py-4">
                    {payment.transactionId || payment._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4">
                    {payment.order?._id ? (
                      <Link
                        className="text-[#B38C2B]"
                        href={`/admnin/orders/${payment.order._id}`}
                      >
                        {payment.order.orderNumber || "Order"}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {payment.user?.name}
                    <div className="text-sm text-gray-500">{payment.user?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {Number(payment.amount || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4 capitalize">{payment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
