import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export default function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return `/products${query ? `?${query}` : ""}`;
  };

  return (
    <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} className="rounded border px-4 py-2 text-sm hover:bg-slate-50">
          Previous
        </Link>
      ) : (
        <span className="rounded border px-4 py-2 text-sm text-slate-300">Previous</span>
      )}

      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} className="rounded border px-4 py-2 text-sm hover:bg-slate-50">
          Next
        </Link>
      ) : (
        <span className="rounded border px-4 py-2 text-sm text-slate-300">Next</span>
      )}
    </nav>
  );
}
