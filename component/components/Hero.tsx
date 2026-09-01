"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-[#FAF7F2] px-6 py-20">
      <div className="max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#C9A038]">Luxury Perfume Collection</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#2A2421] sm:text-5xl md:text-7xl">
          Discover Your Perfect Fragrance
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#7A7267] sm:text-xl">
          Premium perfumes crafted for every mood, season, and celebration.
        </p>
      </div>

      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-4 md:flex-row">
        <input
          type="text"
          value={search}
          placeholder="Search perfumes..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="h-14 w-full rounded-xl border border-gray-300 bg-white px-5 text-[#2A2421] outline-none transition focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20 md:w-[450px]"
        />

        <button
          onClick={handleSearch}
          className="h-14 rounded-xl bg-[#C9A038] px-10 font-semibold text-white transition hover:bg-[#B38C2B]"
        >
          Search
        </button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => router.push("/products")}
          className="rounded-xl bg-[#C9A038] px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-[#B38C2B]"
        >
          Shop Now
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="rounded-xl border border-[#C9A038] bg-white px-8 py-3 font-semibold text-[#C9A038] shadow-sm transition hover:bg-[#FFF8E8]"
        >
          Join Us
        </button>
      </div>
    </section>
  );
}
