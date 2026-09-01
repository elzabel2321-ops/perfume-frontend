"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { adminApi } from "@/lib/adminApi";

type Period = "week" | "month" | "year";

type SalesData = {
  label: string;
  revenue: number;
  orders: number;
};

type AnalyticsData = {
  revenue?: number;
  orders?: number;
  customers?: number;
};

export default function AnalyticsPage() {
  const {
    data: session,
    status,
  } = useSession();

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [sales, setSales] =
    useState<SalesData[]>([]);

  const [period, setPeriod] =
    useState<Period>("month");

  const [loading, setLoading] =
    useState(true);

  const [chartLoading, setChartLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD ANALYTICS SUMMARY
  // =====================================================

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const token = session?.accessToken;

    if (!token) {
      setError(
        "Authentication token not found."
      );

      setLoading(false);

      return;
    }

    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await adminApi.analytics(token);

        console.log(
          "ANALYTICS:",
          result
        );

        const data =
          result?.analytics ||
          result?.data ||
          result;

        setAnalytics(data || {});
      } catch (error: any) {
        console.error(
          "Analytics error:",
          error
        );

        setError(
          error?.message ||
          "Failed to load analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [status, session]);

  // =====================================================
  // LOAD SALES CHART
  // =====================================================

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const token = session?.accessToken;

    if (!token) {
      return;
    }

    const loadSalesChart = async () => {
      try {
        setChartLoading(true);

        const result =
          await adminApi.salesChart(
            period,
            token
          );

        console.log(
          "SALES CHART:",
          result
        );

        const chartData =
          result?.sales ||
          result?.data ||
          result ||
          [];

        setSales(chartData);
      } catch (error: any) {
        console.error(
          "Sales chart error:",
          error
        );

        setSales([]);
      } finally {
        setChartLoading(false);
      }
    };

    loadSalesChart();
  }, [period, status, session]);

  // =====================================================
  // LOADING
  // =====================================================

  if (status === "loading") {
    return (
      <div className="p-6">
        Loading authentication...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading analytics...
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor your perfume shop performance.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* REVENUE */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {Number(
              analytics?.revenue || 0
            ).toLocaleString()}{" "}
            ETB
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            Today {Number((analytics as any)?.revenueBreakdown?.today || 0).toLocaleString()}
            {" · "}
            Week {Number((analytics as any)?.revenueBreakdown?.weekly || 0).toLocaleString()}
          </p>
        </div>

        {/* ORDERS */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Orders
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {Number(
              analytics?.orders || 0
            ).toLocaleString()}
          </h2>
        </div>

        {/* CUSTOMERS */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Customers
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {Number(
              analytics?.customers || 0
            ).toLocaleString()}
          </h2>
        </div>
      </div>

      {/* =================================================
          SALES OVERVIEW
      ================================================= */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        {/* TITLE */}

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-xl font-bold">
              Sales Overview
            </h2>

            <p className="text-sm text-gray-500">
              Revenue and orders performance
            </p>
          </div>

          {/* PERIOD BUTTONS */}

          <div className="flex gap-2">

            {(
              ["week", "month", "year"] as Period[]
            ).map((item) => (
              <button
                key={item}
                onClick={() =>
                  setPeriod(item)
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  period === item
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item === "week" && "Week"}

                {item === "month" && "Month"}

                {item === "year" && "Year"}
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            CHART
        ================================================= */}

        <div className="h-[400px] w-full">

          {chartLoading ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Loading chart...
            </div>
          ) : sales.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              No sales data available for this period.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={sales}
                margin={{
                  top: 20,
                  right: 30,
                  left: 10,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="label"
                />

                <YAxis />

                <Tooltip
                  formatter={(
                    value,
                    name
                  ) => [
                    Number(value).toLocaleString(),
                    name === "revenue"
                      ? "Revenue"
                      : "Orders",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />

                <Line
                  type="monotone"
                  dataKey="orders"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}