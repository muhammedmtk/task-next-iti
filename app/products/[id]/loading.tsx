export default function ProductDetailLoading() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-lg bg-slate-200" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-24 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
