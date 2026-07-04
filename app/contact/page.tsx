"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/actions";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage(result.message ?? "Message sent successfully!");
      } else {
        setMessage(result.error ?? "Validation failed.");
      }
    } catch {
      setMessage("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-slate-600">Send us a message and we will get back to you.</p>
      </div>

      <form action={handleSubmit} className="max-w-lg space-y-4 rounded-lg border bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input type="text" name="name" required minLength={2} className="w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea name="message" required minLength={10} rows={5} className="w-full rounded border px-3 py-2" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {message && (
          <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>
        )}
      </form>
    </div>
  );
}
