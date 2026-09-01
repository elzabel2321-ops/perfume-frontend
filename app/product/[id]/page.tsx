"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/component/components/Button";
import { addToCart } from "@/lib/cart";
import { Product } from "@/types";

export default function ProductDetail() {
  const params = useParams();
  const id = String(params.id || "");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/catalog/products/${id}`, {
          cache: "no-store",
        });
        const data = await response.json();
        setProduct(data?.product || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-600">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, product.price, quantity, {
      name: product.name,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#FFF3D4] text-[#C9A038] rounded-full text-sm font-semibold">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-yellow-500">
              {"⭐".repeat(Math.floor(product.rating || 0))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
            <span className="text-2xl text-[#C9A038] font-bold">
              ${product.price}
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-8">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              fullWidth
              variant={added ? "secondary" : "primary"}
              className="py-3 text-lg"
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
