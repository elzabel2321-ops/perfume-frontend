"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { shopApi } from "@/lib/shopApi";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const orderId = searchParams.get("orderId") || "";

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken || !orderId) {
      return;
    }

    shopApi
      .order(orderId, session.accessToken)
      .then((result) => setOrder(result.order))
      .catch((err) => setError(err.message || "Unable to load order."));
  }, [status, session, orderId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl text-green-600">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-[#2A2421]">Payment Successful</h1>
        <p className="mt-3 text-gray-600">
          Your payment was verified on the server. Refreshing this page will not create another order.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {order && (
          <div className="mt-8 rounded-2xl bg-[#FAF7F2] p-5 text-left text-sm">
            <div className="mb-3 flex justify-between">
              <span className="text-gray-500">Order</span>
              <span className="font-semibold">{order.orderNumber}</span>
            </div>
            <div className="mb-3 flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold uppercase">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">
                {Number(order.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={order ? `/orders/${order._id}` : "/orders"}
            className="w-full rounded-xl bg-[#C9A038] py-3 font-semibold text-white"
          >
            View order
          </Link>
          <Link href="/products" className="w-full rounded-xl border py-3 font-semibold">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
