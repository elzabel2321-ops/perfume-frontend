"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useSession,
  signOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCartItemCount } from "@/lib/cart";

export default function Navbar() {
  const router = useRouter();

  const {
    data: session,
    status,
  } = useSession();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // =====================================================
  // AUTH
  // =====================================================

  const isLoggedIn =
    status === "authenticated";

  const isAdmin =
    session?.user?.role === "admin";

  // =====================================================
  // CART COUNT
  // =====================================================

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartItemCount());
    };

    updateCart();

    window.addEventListener(
      "cartUpdated",
      updateCart
    );

    window.addEventListener(
      "storage",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCart
      );

      window.removeEventListener(
        "storage",
        updateCart
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    setOpen(false);

    await signOut({
      redirect: false,
    });

    router.replace("/");
    router.refresh();
  };

  // =====================================================
  // PUBLIC LINKS
  // =====================================================

  const publicLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/products",
      label: "Products",
    },
    {
      href: "/cart",
      label: "Cart",
    },
  ];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111] shadow-lg">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.3em] text-white transition hover:text-[#C9A038]"
        >
          ARomanova
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav className="hidden items-center gap-8 md:flex">

          {/* HOME / PRODUCTS / CART */}

          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
            >
              {link.label}
            </Link>
          ))}

          {/* =================================================
              LOADING
          ================================================= */}

          {status === "loading" && (
            <span className="text-sm text-gray-400">
              ...
            </span>
          )}

          {/* =================================================
              NOT LOGGED IN
          ================================================= */}

          {status === "unauthenticated" && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* =================================================
              LOGGED IN
          ================================================= */}

          {status === "authenticated" && (
            <>
              {/* PROFILE */}

              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
              >
                <User size={18} />
                Profile
              </Link>

              {/* ADMIN DASHBOARD */}

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          {/* =================================================
              CART ICON
          ================================================= */}

          <Link
            href="/cart"
            className="relative rounded-full border border-[#C9A038]/40 p-2 text-white transition hover:border-[#C9A038] hover:text-[#C9A038]"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A038] text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>

        {/* =================================================
            MOBILE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-[#C9A038]/40 p-2 text-white md:hidden"
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {open && (
        <div className="border-t border-white/10 bg-[#111111] px-4 py-4 md:hidden">

          <nav className="flex flex-col gap-2">

            {/* PUBLIC LINKS */}

            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
              >
                {link.label}
              </Link>
            ))}

            {/* LOADING */}

            {status === "loading" && (
              <span className="px-3 py-2 text-gray-400">
                ...
              </span>
            )}

            {/* GUEST */}

            {status === "unauthenticated" && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* LOGGED USER */}

            {status === "authenticated" && (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
                >
                  <User size={18} />
                  Profile
                </Link>

                {/* ADMIN */}

                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                )}

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-red-400 transition hover:bg-[#1F1F1F]"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

            {/* MOBILE CART */}

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Cart
              </span>

              {cartCount > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C9A038] px-2 text-xs font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

          </nav>
        </div>
      )}

    </header>
  );
}