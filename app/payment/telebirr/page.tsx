"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TelebirrPaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const orderId = params.get("orderId") || "";
    const paymentId = params.get("paymentId") || "";

    const newParams = new URLSearchParams();

    if (orderId) newParams.set("orderId", orderId);
    if (paymentId) newParams.set("paymentId", paymentId);

    router.replace(`/payment?${newParams.toString()}`);
  }, [router]);

  return (
    <div className="p-10 text-center">
      Redirecting to secure payment...
    </div>
  );
}