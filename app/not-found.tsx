import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}