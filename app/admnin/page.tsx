"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";
import StatCard from "@/component/admin/StatCard";
import RecentOrders from "@/component/admin/RecentOrders";

type DashboardStats = {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  pendingOrders: number;
  lowStock: number;
};

type Order = {
  _id?: string;
  totalAmount?: number;
  status?: string;
  user?: {
    name?: string;
    email?: string;
  };
};

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    pendingOrders: 0,
    lowStock: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || !session) {
      router.replace("/login");
      return;
    }

    const role = session.user?.role;
    if (role !== "admin" && role !== "admnin") {
      setError("Access denied. Admin account required.");
      setLoading(false);
      return;
    }

    const token = session.accessToken;
    if (!token) {
      setError(
        "Authentication token is missing. Please log out and log in again."
      );
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [dashboardResult, ordersResult] = await Promise.all([
          adminApi.dashboard(token),
          adminApi.orders(token),
        ]);

        const dashboard =
          dashboardResult?.dashboard || dashboardResult?.data || {};

        setStats({
          totalCustomers: Number(dashboard.totalCustomers || 0),
          totalProducts: Number(dashboard.totalProducts || 0),
          totalOrders: Number(dashboard.totalOrders || 0),
          totalSales: Number(dashboard.totalSales || 0),
          pendingOrders: Number(dashboard.pendingOrders || 0),
          lowStock: Number(dashboard.lowStock || 0),
        });

        const loadedOrders =
          ordersResult?.orders || ordersResult?.data || [];

        setOrders(Array.isArray(loadedOrders) ? loadedOrders.slice(0, 8) : []);
      } catch (err: any) {
        setError(err?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-gray-600 shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#2A2421]">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Live products, orders, customers, and sales from the A ROMANOVA
          database.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value={`${stats.totalSales.toFixed(2)} ETB`}
          icon="💳"
          description="Successful payments"
          href="/admnin/analytics"
        />
        <StatCard
          title="Orders"
          value={String(stats.totalOrders)}
          icon="🛒"
          description="All customer orders"
          href="/admnin/orders"
        />
        <StatCard
          title="Products"
          value={String(stats.totalProducts)}
          icon="🌸"
          description="Catalog items in inventory"
          href="/admnin/inventory"
        />
        <StatCard
          title="Customers"
          value={String(stats.totalCustomers)}
          icon="👥"
          description="Registered customer accounts"
          href="/admnin/customers"
        />
        <StatCard
          title="Pending orders"
          value={String(stats.pendingOrders)}
          icon="⏳"
          description="Awaiting processing"
          href="/admnin/orders"
        />
        <StatCard
          title="Low stock"
          value={String(stats.lowStock)}
          icon="📦"
          description="Needs restock"
          href="/admnin/inventory"
        />
      </div>

      <RecentOrders orders={orders} />
    </div>
  );
}
