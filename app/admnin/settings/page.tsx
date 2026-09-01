"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

type Settings = Record<string, any>;

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;
    adminApi
      .settings(session.accessToken)
      .then((result) => setSettings(result.settings || {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status, session]);

  const setField = (name: string, value: any) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!session?.accessToken) return;
    try {
      setSaving(true);
      await adminApi.updateSettings(settings, session.accessToken);
      setSuccess("Settings saved. Shipping and low-stock rules now apply.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="max-w-2xl space-y-6 p-2">
      <h1 className="text-2xl font-bold">Settings</h1>
      {error && <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>}
      {success && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">{success}</div>
      )}
      <section className="space-y-3 rounded-xl border bg-white p-6">
        <h2 className="font-bold">Store information</h2>
        {["shopName", "email", "phone", "address", "currency"].map((name) => (
          <label key={name} className="block">
            <span className="mb-1 block text-sm capitalize">{name}</span>
            <input
              className="w-full rounded-lg border px-4 py-3"
              value={settings[name] || ""}
              onChange={(e) => setField(name, e.target.value)}
            />
          </label>
        ))}
      </section>
      <section className="space-y-3 rounded-xl border bg-white p-6">
        <h2 className="font-bold">Orders and shipping</h2>
        <label className="block">
          Shipping fee
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-4 py-3"
            value={settings.shippingFee ?? 0}
            onChange={(e) => setField("shippingFee", Number(e.target.value))}
          />
        </label>
        <label className="block">
          Free shipping threshold (0 = off)
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-4 py-3"
            value={settings.freeShippingThreshold ?? 0}
            onChange={(e) =>
              setField("freeShippingThreshold", Number(e.target.value))
            }
          />
        </label>
        <label className="block">
          Default low-stock threshold
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-4 py-3"
            value={settings.defaultLowStockThreshold ?? 5}
            onChange={(e) =>
              setField("defaultLowStockThreshold", Number(e.target.value))
            }
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(settings.allowCancellations)}
            onChange={(e) => setField("allowCancellations", e.target.checked)}
          />
          Allow customer cancellations of unpaid orders
        </label>
      </section>
      <section className="space-y-3 rounded-xl border bg-white p-6">
        <h2 className="font-bold">Notifications</h2>
        {[
          ["notifyOrderConfirmation", "Order confirmation"],
          ["notifyPayment", "Payment notification"],
          ["notifyShipping", "Shipping notification"],
          ["notifyDelivery", "Delivery notification"],
        ].map(([name, label]) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(settings[name])}
              onChange={(e) => setField(name, e.target.checked)}
            />
            {label}
          </label>
        ))}
      </section>
      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        {saving ? "Saving..." : "Save settings"}
      </button>
    </div>
  );
}
