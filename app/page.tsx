import Link from "next/link";

import Hero from "@/component/components/Hero";
import ProductCard from "@/component/components/ProductCard";
import CategoryCard from "@/component/components/CategoryCard";

import { categories } from "@/lib/products";
import { fetchCatalog } from "@/lib/catalog";

export default async function Home() {
  const catalog = await fetchCatalog();
  const featuredProducts = catalog.slice(0, 9);

  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* HERO */}
      <Hero />

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B38C2B]">
            Explore
          </p>

          <h2 className="text-3xl font-bold text-[#2A2421] sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover fragrances carefully selected for
            every style, mood, and occasion.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </section>

      {/* FEATURED PERFUMES */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B38C2B]">
              Our Collection
            </p>

            <h2 className="text-3xl font-bold text-[#2A2421] sm:text-4xl">
              Featured Perfumes
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Explore some of our most popular luxury fragrances.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>

      </section>

      {/* SPECIAL OFFER */}
      <section className="bg-gradient-to-r from-[#C9A038] to-[#E6C768] py-16 text-white">

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em]">
            Limited Offer
          </p>

          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Special Offer
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
            Get 20% off on your first purchase with code:
          </p>

          <div className="mb-8 inline-block rounded-lg bg-white/20 px-6 py-3 backdrop-blur-sm">
            <span className="text-xl font-bold tracking-widest">
              WELCOME20
            </span>
          </div>

          <div>
            <Link
              href="/products"
              className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-[#C9A038] shadow-lg transition hover:bg-[#FFF8E8]"
            >
              Shop Now
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}