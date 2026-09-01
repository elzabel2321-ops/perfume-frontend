"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() === "") {
      router.push("/products");
    } else {
      router.push(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Search perfumes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-14 w-full rounded-xl border border-gray-300 bg-white px-5 text-[#2A2421] outline-none transition focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20 md:w-[550px]"
      />

      <button
        onClick={handleSearch}
        className="h-14 rounded-xl bg-[#C9A038] px-10 font-semibold text-white transition hover:bg-[#B38C2B]"
      >
        Search
      </button>
    </div>
  );
}
