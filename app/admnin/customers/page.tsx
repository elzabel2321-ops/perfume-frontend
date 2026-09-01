"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

type Customer = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
};

export default function CustomersPage() {
  const { data: session, status } = useSession();

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (status !== "authenticated") return;

    const token = session?.accessToken;

    if (!token) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    const loadCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await adminApi.customers(token);

        console.log("CUSTOMERS:", result);

        setCustomers(
          result?.customers ||
          result?.data ||
          result ||
          []
        );
      } catch (error: any) {
        console.error(
          "Customers error:",
          error
        );

        setError(
          error?.message ||
          "Failed to load customers."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, [status, session]);

  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Customers
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer._id}
                className="border-b"
              >
                <td className="p-4">
                  {customer.name || "-"}
                </td>

                <td className="p-4">
                  {customer.email || "-"}
                </td>

                <td className="p-4">
                  {customer.role || "customer"}
                </td>

                <td className="p-4">
                  {customer.createdAt
                    ? new Date(
                        customer.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {customers.length === 0 && (
          <div className="p-6 text-center">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
}