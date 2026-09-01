"use client";

import Link from "next/link";
import { useState } from "react";

import Button from "./Button";
import { Product } from "@/types";
import { addToCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(
      product.id,
      Number(product.price),
      1,
      { name: product.name, image: product.image }
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">

      {/* IMAGE */}
      <Link href={`/product/${product.id}`}>
        <div className="group relative h-48 w-full overflow-hidden bg-gray-100">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}

        </div>
      </Link>

      {/* PRODUCT INFORMATION */}
      <div className="p-4">

        <Link
          href={`/product/${product.id}`}
          className="transition hover:text-[#C9A038]"
        >
          <h3 className="line-clamp-2 text-lg font-bold text-gray-800">
            {product.name}
          </h3>
        </Link>

        <p className="mb-2 text-sm text-gray-600">
          {product.category}
        </p>

        {/* RATING */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-yellow-500">
            {"⭐".repeat(
              Math.floor(Number(product.rating) || 0)
            )}
          </span>

          <span className="text-sm text-gray-600">
            ({product.reviews || 0})
          </span>
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between gap-3">

          <span className="text-2xl font-bold text-[#C9A038]">
            ${Number(product.price).toFixed(2)}
          </span>

          <Button
            type="button"
            onClick={handleAddToCart}
            variant={added ? "secondary" : "primary"}
            className="text-sm"
          >
            {added ? "✓ Added" : "Add"}
          </Button>

        </div>
      </div>
    </div>
  );
}