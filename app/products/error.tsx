"use client";

import { useEffect } from "react";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-red-200 bg-red-50 p-12 text-center">
      <h2 className="text-2xl font-bold text-red-800">Failed to load products</h2>
      <p className="mt-2 max-w-md text-sm text-red-600">
        We couldn&apos;t fetch products from the server. This might be a temporary issue — please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
