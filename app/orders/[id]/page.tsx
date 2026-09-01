"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { shopApi } from "@/lib/shopApi";

const STEPS = [
  { key: "pending_payment", label: "Order placed" },
  { key: "paid", label: "Payment confirmed" },
  { key: "approved", label: "Order approved" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const ORDER = [
  "pending_payment",
  "paid",
  "processing",
  "approved",
  "shipped",
  "delivered",
];

export default function OrderDetailPage() {
  const params = useParams();
  const id = String(params.id || "");
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken || !id) return;
    shopApi
      .order(id, session.accessToken)
      .then((result) => setOrder(result.order))
      .catch((err) => setError(err.message || "Order not found."))
      .finally(() => setLoading(false));
  }, [status, session, id]);

  if (loading) return <div className="p-10">Loading order...</div>;
  if (error || !order) {
    return (
      <div className="p-10 text-center text-red-700">
        {error || "Order not found."}
      </div>
    );
  }

  const current = order.orderStatus || order.status;
  const currentIndex = ORDER.indexOf(current);
  const cancelled = current === "cancelled" || current === "refunded";

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <Link href="/orders" className="text-sm text-[#B38C2B]">
          Back to orders
        </Link>
        <h1 className="mt-4 text-3xl font-bold">{order.orderNumber}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm uppercase">
            Payment: {order.paymentStatus}
          </span>
          <span className="rounded-full bg-[#FAF7F2] px-3 py-1 text-sm uppercase">
            Order: {order.orderStatus}
          </span>
          {current === "delivered" && (
            <span className="rounded-full bg-green-700 px-3 py-1 text-sm text-white">
              Order Delivered
            </span>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {STEPS.map((step) => {
            const stepIndex = ORDER.indexOf(step.key);
            const done =
              !cancelled && currentIndex >= 0 && stepIndex <= currentIndex;
            return (
              <div key={step.key} className="flex items-center gap-3">
                <span>{done ? "✓" : "○"}</span>
                <span className={done ? "font-semibold" : "text-gray-500"}>
                  {step.label}
                </span>
              </div>
            );
          })}
          {cancelled && (
            <p className="font-semibold text-red-700">
              This order is {current}.
            </p>
          )}
        </div>

        <div className="mt-8 divide-y rounded-xl bg-[#FAF7F2]">
          {(order.items || []).map((item: any, index: number) => (
            <div key={index} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-right text-xl font-bold">
          Total {Number(order.totalAmount || 0).toFixed(2)}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Shipping {Number(order.shippingCost || 0).toFixed(2)} · Discount{" "}
          {Number(order.discount || 0).toFixed(2)}
        </p>
      </div>
    </main>
  );
}
