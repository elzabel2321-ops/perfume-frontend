"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OrderTrackPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id || "");

  useEffect(() => {
    if (id) router.replace(`/orders/${id}`);
  }, [id, router]);

  return <div className="p-10">Opening order tracking...</div>;
}
