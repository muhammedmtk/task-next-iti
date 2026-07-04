import Link from "next/link";
import { getProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const { products } = await getProducts({ limit: 8, revalidate: 3600 });

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-blue-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome to Northstar Commerce</h1>
        <p className="mt-2 text-blue-100">Browse our latest products from DummyJSON API.</p>
        <Link href="/products" className="mt-4 inline-block rounded bg-white px-4 py-2 text-sm font-semibold text-blue-600">
          View all products
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
