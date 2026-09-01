"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

// ======================================================
// TYPES
// ======================================================

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

// ======================================================
// MENU ITEMS
// ======================================================

const menuItems = [
  {
    name: "Dashboard",
    href: "/admnin",
    icon: "📊",
  },
  {
    name: "Products",
    href: "/admnin/products",
    icon: "🌸",
  },
  {
    name: "Orders",
    href: "/admnin/orders",
    icon: "🛒",
  },
  {
    name: "Customers",
    href: "/admnin/customers",
    icon: "👥",
  },
  {
    name: "Inventory",
    href: "/admnin/inventory",
    icon: "📦",
  },
  {
    name: "Payments",
    href: "/admnin/payments",
    icon: "💳",
  },
  {
    name: "Analytics",
    href: "/admnin/analytics",
    icon: "📈",
  },
  {
    name: "Settings",
    href: "/admnin/settings",
    icon: "⚙️",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function AdminSidebar({
  open,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = async () => {
    try {
      // Remove local tokens
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("accessToken");

      // Logout from NextAuth
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Logout failed:", error);

      // Fallback
      window.location.href = "/login";
    }
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <>
      {/* ================================================
          MOBILE OVERLAY
      ================================================= */}

      {open && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
          "
        />
      )}

      {/* ================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          bg-[#111111]
          text-white
          shadow-xl
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ==============================================
            LOGO
        =============================================== */}

        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-center
            border-b
            border-white/10
          "
        >
          <Link
            href="/admnin"
            onClick={onClose}
            className="
              text-xl
              font-bold
              tracking-[0.25em]
              text-[#E6C768]
            "
          >
            AROMANOVA
          </Link>
        </div>

        {/* ==============================================
            NAVIGATION
        =============================================== */}

        <nav
          className="
            flex-1
            space-y-2
            overflow-y-auto
            p-4
          "
        >
          {menuItems.map((item) => {
            // Active page
            const active =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-medium
                  transition-all
                  duration-200
                  ${
                    active
                      ? `
                        bg-[#C9A038]
                        text-white
                        shadow-md
                      `
                      : `
                        text-gray-300
                        hover:bg-white/10
                        hover:text-white
                      `
                  }
                `}
              >
                {/* ICON */}

                <span
                  className="
                    flex
                    w-7
                    justify-center
                    text-xl
                  "
                >
                  {item.icon}
                </span>

                {/* NAME */}

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ==============================================
            LOGOUT
        =============================================== */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-left
              text-base
              font-medium
              text-gray-300
              transition-all
              duration-200
              hover:bg-red-500/20
              hover:text-red-400
            "
          >
            {/* LOGOUT ICON */}

            <span
              className="
                flex
                w-7
                justify-center
                text-xl
              "
            >
              🚪
            </span>

            {/* LOGOUT TEXT */}

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}