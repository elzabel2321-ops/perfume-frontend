"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { adminApi } from "@/lib/adminApi";

const ACTIONS: Record<string, { label: string; status: string }[]> = {
  paid: [
    { label: "Start processing", status: "processing" },
    { label: "Cancel", status: "cancelled" },
    { label: "Refund", status: "refunded" },
  ],
  processing: [
    { label: "Approve", status: "approved" },
    { label: "Cancel", status: "cancelled" },
  ],
  approved: [{ label: "Mark shipped", status: "shipped" }],
  shipped: [{ label: "Mark delivered", status: "delivered" }],
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = String(params.id || "");
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    if (!token) return;
    const result = await adminApi.order(id, token);
    setOrder(result.order);
  };

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [token, id]);

  const updateStatus = async (status: string) => {
    if (!token) return;
    try {
      setUpdating(true);
      await adminApi.updateOrderStatus(id, status, token);
      setMessage(`Updated to ${status}`);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (!order) {
    return <div className="p-6">{error || "Loading order..."}</div>;
  }

  const actions = ACTIONS[order.orderStatus] || [];

  return (
    <div className="space-y-6">
      <Link href="/admnin/orders" className="text-sm text-[#B38C2B]">
        Back to orders
      </Link>
      <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
      {error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      {message && <div className="rounded-xl bg-green-50 p-4 text-green-700">{message}</div>}

      <section className="rounded-2xl bg-white p-6">
        <h2 className="font-bold">Customer</h2>
        <p>{order.customer?.name}</p>
        <p>{order.customer?.email}</p>
        <p>{order.customer?.phone}</p>
        <p>
          {order.shipping?.address}, {order.shipping?.city}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-6">
        <h2 className="font-bold">Order</h2>
        {(order.items || []).map((item: any, i: number) => (
          <div key={i} className="flex justify-between py-2 text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
          </div>
        ))}
        <p className="mt-2">Subtotal {Number(order.subtotal || 0).toFixed(2)}</p>
        <p>Shipping {Number(order.shippingCost || 0).toFixed(2)}</p>
        <p className="font-bold">Total {Number(order.totalAmount || 0).toFixed(2)}</p>
      </section>

      <section className="rounded-2xl bg-white p-6">
        <h2 className="font-bold">Payment</h2>
        <p>Status: {order.paymentStatus}</p>
        <p>Method: {order.paymentMethod}</p>
        <p>Transaction: {order.transactionId || "-"}</p>
        {order.payment?._id && (
          <Link
            href={`/admnin/payments?id=${order.payment._id}`}
            className="text-[#B38C2B]"
          >
            View payment
          </Link>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6">
        <h2 className="font-bold">Status: {order.orderStatus}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.status}
              type="button"
              disabled={updating}
              onClick={() => updateStatus(action.status)}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {(order.statusHistory || []).map((entry: any, i: number) => (
            <p key={i}>
              {entry.from || "—"} → {entry.to} ·{" "}
              {entry.changedAt ? new Date(entry.changedAt).toLocaleString() : ""}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
