"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { getCartItemCount } from "@/lib/cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // =====================================================
  // NEXTAUTH SESSION
  // =====================================================

  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const role = session?.user?.role;

  // =====================================================
  // CART COUNT
  // =====================================================

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    setOpen(false);

    await signOut({
      callbackUrl: "/",
    });
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111] shadow-lg">

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
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-8 md:flex">

          {/* PUBLIC LINKS */}

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
              NOT LOGGED IN
          ================================================= */}

          {status !== "loading" && !isLoggedIn && (
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

          {status !== "loading" && isLoggedIn && (
            <>
              {/* ADMIN */}

              {role === "admin" ? (
                <Link
                  href="/admnin"
                  className="text-sm font-semibold text-[#C9A038] transition hover:text-white"
                >
                  Admin Dashboard
                </Link>
              ) : (
                /* CUSTOMER */

                <Link
                  href="/profile"
                  className="text-sm font-medium text-[#F6EEDC] transition hover:text-[#C9A038]"
                >
                  Profile
                </Link>
              )}

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-[#F6EEDC] transition hover:text-red-400"
              >
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

      {/* =================================================
          MOBILE MENU
      ================================================= */}

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

            {/* =================================================
                NOT LOGGED IN
            ================================================= */}

            {status !== "loading" && !isLoggedIn && (
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

            {/* =================================================
                LOGGED IN
            ================================================= */}

            {status !== "loading" && isLoggedIn && (
              <>
                {/* ADMIN */}

                {role === "admin" ? (
                  <Link
                    href="/admnin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 font-semibold text-[#C9A038] transition hover:bg-[#1F1F1F] hover:text-white"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  /* CUSTOMER */

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-[#C9A038]"
                  >
                    Profile
                  </Link>
                )}

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-left text-[#F6EEDC] transition hover:bg-[#1F1F1F] hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {/* =================================================
                MOBILE CART
            ================================================= */}

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