"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TelebirrPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId") || "";
    const paymentId = searchParams.get("paymentId") || "";
    const params = new URLSearchParams();
    if (orderId) params.set("orderId", orderId);
    if (paymentId) params.set("paymentId", paymentId);
    router.replace(`/payment?${params.toString()}`);
  }, [router, searchParams]);

  return <div className="p-10 text-center">Redirecting to secure payment...</div>;
}
