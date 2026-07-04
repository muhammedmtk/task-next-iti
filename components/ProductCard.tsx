import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <h3 className="font-semibold text-slate-900">{product.name}</h3>
      <p className="text-sm text-slate-500">{product.category}</p>
      <p className="mt-2 font-semibold text-blue-600">${product.price.toFixed(2)}</p>
    </Link>
  );
}
