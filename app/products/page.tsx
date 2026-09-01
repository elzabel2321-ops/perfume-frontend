"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import ProductCard from "@/component/components/ProductCard";
import SearchBar from "@/component/components/SearchBar";
import { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { status } = useSession();

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [catalog, setCatalog] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/products");
    }
  }, [status, router]);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch("/api/catalog/products", {
          cache: "no-store",
        });
        const data = await response.json();
        setCatalog(Array.isArray(data?.products) ? data.products : []);
      } catch {
        setCatalog([]);
      }
    };

    loadCatalog();
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    const cat = category.trim().toLowerCase();

    setFilteredProducts(
      catalog.filter((product) => {
        const matchesQuery =
          !q ||
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        const matchesCategory =
          !cat || product.category.toLowerCase() === cat;
        return matchesQuery && matchesCategory;
      })
    );
  }, [catalog, query, category]);

  // ==========================================
  // CHECKING LOGIN
  // ==========================================

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">
          Checking login...
        </p>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (status === "unauthenticated") {
    return null;
  }

  // ==========================================
  // LOGGED-IN USER
  // ==========================================

  return (
    <div>
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="bg-gradient-to-r from-[#C9A038] to-[#E6C768] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">

          <h1 className="mb-8 text-4xl font-bold">
            Our Collection
          </h1>

          <div className="max-w-md">
            <SearchBar />
          </div>

        </div>
      </div>

      {/* =====================================
          PRODUCTS
      ===================================== */}

      <div className="mx-auto max-w-7xl px-4 py-16">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-[#2A2421]">

            {query &&
              `Search Results for "${query}"`}

            {category &&
              !query &&
              `${category} Perfumes`}

            {!query &&
              !category &&
              "All Perfumes"}

          </h2>

          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>

        </div>

        {/* =====================================
            PRODUCT GRID
        ===================================== */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        ) : (

          <div className="py-12 text-center">

            <p className="mb-4 text-xl text-gray-600">
              No products found
            </p>

            <p className="text-gray-500">
              Try adjusting your search or browse
              by category
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

// ==========================================
// PAGE
// ==========================================

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16">
          Loading...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}