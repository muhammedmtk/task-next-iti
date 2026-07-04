export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Northstar Commerce</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          This is a Next.js lab project demonstrating SSG, ISR, dynamic routing, server actions, and data fetching
          with the DummyJSON API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "SSG", body: "This page is statically generated at build time." },
          { title: "ISR", body: "The products page revalidates every 60 seconds." },
          { title: "Dynamic", body: "Product details use dynamic routes with [id]." },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border bg-white p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
