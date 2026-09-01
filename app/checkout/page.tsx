"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/component/components/Button";
import { getCart } from "@/lib/cart";
import { shopApi } from "@/lib/shopApi";
import type { Cart } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    setCart(getCart());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session?.user?.email && !formData.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user?.email || "",
        firstName: prev.firstName || String(session.user?.name || "").split(" ")[0],
        lastName:
          prev.lastName ||
          String(session.user?.name || "").split(" ").slice(1).join(" "),
      }));
    }
  }, [session, formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (status !== "authenticated" || !session?.accessToken) {
      setError("Please log in to checkout.");
      router.push("/login?callbackUrl=/checkout");
      return;
    }

    if (cart.items.length === 0) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    const required = ["firstName", "lastName", "email", "address", "city"] as const;
    for (const field of required) {
      if (!formData[field].trim()) {
        setError("Please complete all required shipping fields.");
        return;
      }
    }

    try {
      setCreatingOrder(true);
      const result = await shopApi.checkout(
        {
          items: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shipping: formData,
          paymentMethod: "card",
        },
        session.accessToken
      );

      sessionStorage.setItem("checkoutOrderId", String(result.order.id));
      sessionStorage.setItem("checkoutPaymentId", String(result.payment.id));
      sessionStorage.setItem("checkoutConfirmToken", String(result.confirmToken));

      router.push(
        `/payment?orderId=${result.order.id}&paymentId=${result.payment.id}`
      );
    } catch (err: any) {
      setError(err?.message || "Checkout failed.");
    } finally {
      setCreatingOrder(false);
    }
  };

  if (loading) {
    return <div className="px-4 py-16 text-center">Loading checkout...</div>;
  }

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/products" className="mt-4 inline-block text-[#B38C2B]">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#2A2421]">Checkout</h1>
          <p className="text-gray-500">
            Prices and shipping are calculated on the server. Your cart total is an estimate.
          </p>
          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
          )}
          {[
            ["firstName", "First name"],
            ["lastName", "Last name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["zipCode", "Postal code"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="mb-1 block text-sm text-gray-600">{label}</label>
              <input
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>
          ))}
          <Button type="submit" disabled={creatingOrder} className="w-full">
            {creatingOrder ? "Creating order..." : "Continue to payment"}
          </Button>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-4 divide-y">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between py-3 text-sm">
                <span>
                  {item.name || "Product"} × {item.quantity}
                </span>
                <span>
                  {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Estimated subtotal: {cart.total.toFixed(2)} (final total is calculated at checkout)
          </p>
        </aside>
      </div>
    </main>
  );
}
