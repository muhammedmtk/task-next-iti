"use client";

import { useState } from "react";
import { addReview } from "@/lib/actions";

interface ReviewFormProps {
  productId: number;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await addReview(formData);

      if (result.success) {
        setMessage(result.message ?? "Review submitted successfully!");
      } else {
        setMessage(result.error ?? "Validation failed.");
      }
    } catch {
      setMessage("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="productId" value={productId} />

      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input type="text" name="name" required minLength={2} className="w-full rounded border px-3 py-2" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Rating</label>
        <select name="rating" required className="w-full rounded border px-3 py-2">
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Bad</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Comment</label>
        <textarea name="comment" required minLength={10} maxLength={500} rows={4} className="w-full rounded border px-3 py-2" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      {message && (
        <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}
    </form>
  );
}
