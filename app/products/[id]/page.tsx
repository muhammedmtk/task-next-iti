import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductById } from "@/lib/data";
import ReviewForm from "@/components/ReviewForm";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} - Northstar Commerce`,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export const revalidate = 300;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id), 300);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {" / "}
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        {" / "}
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-slate-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
          <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
        </div>
      </div>

      <section className="rounded-lg border bg-white p-6">
        <h2 className="text-xl font-semibold">Write a Review</h2>
        <div className="mt-4">
          <ReviewForm productId={product.id} />
        </div>
      </section>
    </div>
  );
}
