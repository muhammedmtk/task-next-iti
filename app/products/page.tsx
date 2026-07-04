import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";
import Pagination from "@/components/Pagination";

export const revalidate = 60;

const PAGE_SIZE = 12;

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { search, category, page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [result, categories] = await Promise.all([
    getProducts({ limit: PAGE_SIZE, skip, search, category, revalidate: 60 }),
    getCategories(),
  ]);

  const { products, total } = result;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-1 text-slate-500">{total} products found</p>
      </div>

      <Suspense fallback={<div className="rounded-lg border bg-white p-4">Loading filters...</div>}>
        <SearchFilter categories={categories} />
      </Suspense>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="rounded-lg border border-dashed p-8 text-center text-slate-500">No products match your filters.</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={{ search, category }} />
    </div>
  );
}
