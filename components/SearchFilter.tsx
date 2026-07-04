"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Category {
  slug: string;
  name: string;
}

interface SearchFilterProps {
  categories: Category[];
}

export default function SearchFilter({ categories }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const handleFilter = (event: React.FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleFilter} className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="flex-1 rounded border px-4 py-2 text-sm outline-none focus:border-blue-500"
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="rounded border px-4 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}
