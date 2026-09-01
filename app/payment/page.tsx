"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { shopApi } from "@/lib/shopApi";
import { clearCart } from "@/lib/cart";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<any>(null);

  const orderId = searchParams.get("orderId") || "";
  const paymentId =
    searchParams.get("paymentId") ||
    (typeof window !== "undefined"
      ? sessionStorage.getItem("checkoutPaymentId")
      : "") ||
    "";

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken || !orderId) {
      return;
    }

    shopApi
      .order(orderId, session.accessToken)
      .then((result) => setOrder(result.order))
      .catch((err) => setError(err.message || "Unable to load order."));
  }, [status, session, orderId]);

  const handlePayment = async () => {
    if (!session?.accessToken) {
      setError("Please log in again.");
      return;
    }

    const confirmToken = sessionStorage.getItem("checkoutConfirmToken") || "";
    const id = paymentId || order?.payment?._id || order?.payment;
    if (!id || !confirmToken) {
      setError("Payment session is missing. Please checkout again.");
      return;
    }

    try {
      setPaying(true);
      setError("");
      const result = await shopApi.confirmPayment(
        String(id),
        confirmToken,
        session.accessToken
      );
      clearCart();
      sessionStorage.removeItem("checkoutConfirmToken");
      router.push(
        `/payment/success?orderId=${result.order.id}&paymentId=${result.payment.id}`
      );
    } catch (err: any) {
      setError(err?.message || "Payment failed.");
    } finally {
      setPaying(false);
    }
  };

  const handleFail = async () => {
    if (!session?.accessToken || !paymentId) return;
    try {
      await shopApi.failPayment(String(paymentId), session.accessToken);
      setError("Payment cancelled.");
    } catch (err: any) {
      setError(err?.message || "Could not cancel payment.");
    }
  };

  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-bold text-[#2A2421]">Payment</h1>
        <p className="mt-2 text-gray-500">
          Simulated card payment. The backend verifies this request with a one-time token.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {order && (
          <div className="mt-6 rounded-2xl bg-[#FAF7F2] p-5 text-sm">
            <p>Order {order.orderNumber}</p>
            <p className="mt-2 text-2xl font-bold">
              {Number(order.totalAmount || 0).toFixed(2)}
            </p>
            <p className="mt-1 capitalize text-gray-500">
              Payment: {order.paymentStatus} / Order: {order.orderStatus}
            </p>
          </div>
        )}

        <button
          type="button"
          disabled={paying || order?.paymentStatus === "paid"}
          onClick={handlePayment}
          className="mt-6 w-full rounded-xl bg-[#C9A038] py-3 font-semibold disabled:opacity-50"
        >
          {paying
            ? "Processing..."
            : order?.paymentStatus === "paid"
              ? "Already paid"
              : "Pay now"}
        </button>

        <button
          type="button"
          onClick={handleFail}
          className="mt-3 w-full rounded-xl border py-3 text-sm text-gray-600"
        >
          Cancel payment
        </button>

        <Link href="/orders" className="mt-4 block text-center text-sm text-[#B38C2B]">
          View my orders
        </Link>
      </div>
    </main>
  );
}
