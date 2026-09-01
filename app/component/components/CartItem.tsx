"use client";

import { useState } from "react";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/cart";

import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export default function CartItem({
  item,
  onUpdate,
}: CartItemProps) {
  const [loading, setLoading] = useState(false);

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const handleIncrease = () => {
    setLoading(true);

    updateCartItemQuantity(
      item.productId,
      item.quantity + 1
    );

    onUpdate();

    setLoading(false);
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      return;
    }

    setLoading(true);

    updateCartItemQuantity(
      item.productId,
      item.quantity - 1
    );

    onUpdate();

    setLoading(false);
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemove = () => {
    setLoading(true);

    removeFromCart(item.productId);

    onUpdate();

    setLoading(false);
  };

  // ==========================================
  // ITEM TOTAL
  // ==========================================

  const itemTotal =
    Number(item.price) *
    Number(item.quantity);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

      {/* ======================================
          PRODUCT INFO
      ====================================== */}

      <div className="flex-1">

        <h3 className="text-lg font-semibold text-gray-800">
          {item.name || "Product"}
        </h3>

        {item.image ? (
          <img
            src={item.image}
            alt={item.name || "Product"}
            className="mt-2 h-16 w-16 rounded object-cover"
          />
        ) : null}

        <p className="mt-2 font-semibold text-[#C9A038]">
          ${Number(item.price).toFixed(2)}
        </p>

      </div>

      {/* ======================================
          QUANTITY
      ====================================== */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={handleDecrease}
          disabled={
            loading || item.quantity <= 1
          }
          className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span className="min-w-[30px] text-center font-semibold">
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>

      </div>

      {/* ======================================
          TOTAL
      ====================================== */}

      <div className="min-w-[100px] text-right">

        <p className="font-bold text-gray-800">
          ${itemTotal.toFixed(2)}
        </p>

      </div>

      {/* ======================================
          REMOVE
      ====================================== */}

      <button
        type="button"
        onClick={handleRemove}
        disabled={loading}
        className="text-sm font-medium text-red-600 transition hover:text-red-800 disabled:opacity-50"
      >
        Remove
      </button>

    </div>
  );
}