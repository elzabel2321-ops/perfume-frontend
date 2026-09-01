"use client";

import { useState } from "react";

import AdminSidebar from "@/component/admin/AdminSidebar";
import AdminHeader from "@/component/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F7F3EC]">

      <AdminSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:pl-64">

        <AdminHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-4 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}