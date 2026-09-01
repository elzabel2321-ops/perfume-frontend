"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      alert("Please enter a perfume name.");
      return;
    }

    router.push(
      `/shop?search=${encodeURIComponent(value)}`
    );
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==========================================
  // HERO UI
  // ==========================================

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] px-5 py-16 md:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-112px)] w-full max-w-6xl items-center justify-center">

        <div className="w-full text-center">

          {/* ==========================================
              BRAND
          ========================================== */}

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#B38C2B] md:text-base">
            A Romanova
          </p>

          {/* ==========================================
              HEADING
          ========================================== */}

          <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight text-[#171717] sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your

            <span className="block text-[#C9A038]">
              Perfect Fragrance
            </span>
          </h1>

          {/* ==========================================
              DESCRIPTION
          ========================================== */}

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
            Premium perfumes from luxury brands.
            <br className="hidden sm:block" />
            Elevate your senses with curated scents
            for every moment.
          </p>

          {/* ==========================================
              SEARCH
          ========================================== */}

          <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">

            {/* INPUT */}

            <div className="relative flex-1">

              <Search
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Search perfumes..."
                aria-label="Search perfumes"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-5 text-gray-900 outline-none transition focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20"
              />

            </div>

            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={handleSearch}
              className="h-14 rounded-xl bg-[#C9A038] px-8 font-semibold text-white shadow-md transition hover:bg-[#B38C2B] hover:shadow-lg"
            >
              Search
            </button>

          </div>

          {/* ==========================================
              ACTION BUTTONS
          ========================================== */}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            {/* SHOP NOW */}

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#C9A038] px-10 font-semibold text-white shadow-lg transition hover:bg-[#B38C2B] hover:shadow-xl sm:w-auto"
            >
              Shop Now

              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* JOIN US */}

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="h-14 w-full rounded-xl border-2 border-[#C9A038] bg-white px-10 font-semibold text-[#B38C2B] transition hover:bg-[#C9A038] hover:text-white sm:w-auto"
            >
              Join Us
            </button>

          </div>

          {/* ==========================================
              FEATURES
          ========================================== */}

          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-sm text-gray-500 sm:flex-row sm:gap-6">

            <span>
              Luxury Fragrances
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[#C9A038] sm:block" />

            <span>
              Premium Quality
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[#C9A038] sm:block" />

            <span>
              Curated For You
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}