"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import CartItem from "@/component/components/CartItem";
import Button from "@/component/components/Button";

import {
  getCart,
  clearCart,
} from "@/lib/cart";

import { Cart as CartType } from "@/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartType>({
    items: [],
    total: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {
    const loadCart = () => {
      const savedCart = getCart();

      console.log("CART:", savedCart);

      setCart(savedCart);
      setIsLoading(false);
    };

    loadCart();

    // Update automatically when cart changes
    const handleCartUpdated = () => {
      const updatedCart = getCart();

      console.log("UPDATED CART:", updatedCart);

      setCart(updatedCart);
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdated
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );
    };
  }, []);

  // ==========================================
  // UPDATE CART
  // ==========================================

  const handleUpdateCart = () => {
    const updatedCart = getCart();

    console.log("UPDATED CART:", updatedCart);

    setCart(updatedCart);
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const handleClearCart = () => {
    if (
      !confirm(
        "Are you sure you want to clear your cart?"
      )
    ) {
      return;
    }

    const emptyCart = clearCart();

    setCart(emptyCart);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        Loading...
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div>

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="bg-gradient-to-r from-[#C9A038] to-[#E6C768] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="mx-auto max-w-7xl px-4 py-16">

        {/* ======================================
            EMPTY CART
        ====================================== */}

        {cart.items.length === 0 ? (

          <div className="py-12 text-center">

            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>

            <p className="mb-8 text-gray-600">
              Start shopping to add items to your cart
            </p>

            <Link href="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>

          </div>

        ) : (

          /* ======================================
             CART HAS ITEMS
          ====================================== */

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* ==================================
                CART ITEMS
            ================================== */}

            <div className="space-y-4 lg:col-span-2">

              {cart.items.map((item) => (

                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdate={handleUpdateCart}
                />

              ))}

              {/* BUTTONS */}

              <div className="flex gap-4 pt-4">

                <Button
                  variant="outline"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>

                <Link
                  href="/products"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </Link>

              </div>

            </div>

            {/* ==================================
                ORDER SUMMARY
            ================================== */}

            <div className="h-fit rounded-lg border border-gray-200 bg-white p-6">

              <h3 className="mb-6 text-2xl font-bold">
                Order Summary
              </h3>

              <div className="mb-6 space-y-4 border-b border-gray-200 pb-6">

                {/* SUBTOTAL */}

                <div className="flex justify-between">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ${cart.total.toFixed(2)}
                  </span>
                </div>

                {/* SHIPPING */}

                <div className="flex justify-between">

                  <span>
                    Shipping
                  </span>

                  <span className="font-semibold text-green-600">
                    FREE
                  </span>

                </div>

                {/* TAX */}

                <div className="flex justify-between">

                  <span>
                    Tax (estimated)
                  </span>

                  <span>
                    ${(cart.total * 0.1).toFixed(2)}
                  </span>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mb-6 flex items-center justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span className="text-[#C9A038]">
                  ${(cart.total * 1.1).toFixed(2)}
                </span>

              </div>

              {/* CHECKOUT */}

              <Link
                href="/checkout"
                className="block w-full"
              >
                <Button
                  fullWidth
                  className="w-full py-3"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <p className="mt-4 text-center text-sm text-gray-600">
                Free shipping on orders over $50
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}