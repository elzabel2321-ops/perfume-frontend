"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

export default function InventoryPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [movements, setMovements] = useState<any[]>([]);
  const [qty, setQty] = useState("1");
  const [threshold, setThreshold] = useState("5");
  const token = session?.accessToken;

  const loadInventory = async () => {
    if (!token) return;
    const response = await adminApi.inventory(token);
    setProducts(response.products || []);
    if (response.summary) setSummary(response.summary);
  };

  useEffect(() => {
    if (status !== "authenticated" || !token) return;
    loadInventory()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status, token]);

  const openProduct = async (product: any) => {
    if (!token) return;
    setSelected(product);
    setThreshold(String(product.lowStockThreshold || 5));
    const result = await adminApi.movements(product._id, token);
    setMovements(result.movements || []);
  };

  const restock = async () => {
    if (!token || !selected) return;
    await adminApi.increaseStock(selected._id, Number(qty), token);
    await loadInventory();
    await openProduct(selected);
  };

  if (loading) return <div className="p-8">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory</h1>
      {error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6">Total {summary.totalProducts}</div>
        <div className="rounded-2xl bg-white p-6">Stock {summary.totalStock}</div>
        <div className="rounded-2xl bg-white p-6">Low {summary.lowStock}</div>
        <div className="rounded-2xl bg-white p-6">Out {summary.outOfStock}</div>
      </div>
      {products.length === 0 && (
        <p className="rounded-xl bg-white p-10 text-center text-gray-500">
          No products available.
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">Product</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Available</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="cursor-pointer border-b hover:bg-gray-50"
                onClick={() => openProduct(product)}
              >
                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{product.available}</td>
                <td className="p-4 capitalize">
                  {String(product.stockStatus || "").replace("_", " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="rounded-2xl bg-white p-6">
          <h2 className="text-xl font-bold">{selected.name}</h2>
          <p className="text-sm text-gray-500">
            Threshold {selected.lowStockThreshold} · Last updated{" "}
            {selected.updatedAt ? new Date(selected.updatedAt).toLocaleString() : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-24 rounded border px-3 py-2"
            />
            <button
              type="button"
              onClick={restock}
              className="rounded bg-black px-4 py-2 text-white"
            >
              Add stock
            </button>
            <input
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-24 rounded border px-3 py-2"
            />
            <button
              type="button"
              onClick={async () => {
                if (!token || !selected) return;
                await adminApi.updateStock(
                  selected._id,
                  Number(selected.stock),
                  token,
                  { lowStockThreshold: Number(threshold) }
                );
                await loadInventory();
              }}
              className="rounded border px-4 py-2"
            >
              Save threshold
            </button>
          </div>
          <h3 className="mt-6 font-semibold">Movements</h3>
          <div className="mt-2 space-y-2 text-sm">
            {movements.length === 0 && <p className="text-gray-500">No movements yet.</p>}
            {movements.map((m) => (
              <p key={m._id}>
                {m.delta > 0 ? "+" : ""}
                {m.delta} {m.reason}{" "}
                {m.order?.orderNumber ? `· ${m.order.orderNumber}` : ""} · {m.note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
