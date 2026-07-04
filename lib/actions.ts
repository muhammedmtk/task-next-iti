"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addReview(formData: FormData) {
  const reviewSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    rating: z.string().min(1, "Rating is required"),
    comment: z.string().min(10, "Comment must be at least 10 characters").max(500),
  });

  try {
    const validatedFields = reviewSchema.safeParse({
      productId: formData.get("productId"),
      name: formData.get("name"),
      rating: formData.get("rating"),
      comment: formData.get("comment"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0]?.message ?? "Validation failed.",
      };
    }

    console.log("Saving review:", validatedFields.data);
    revalidatePath(`/products/${validatedFields.data.productId}`);

    return {
      success: true,
      message: "Review submitted successfully!",
    };
  } catch {
    return {
      success: false,
      error: "Failed to submit review. Please try again.",
    };
  }
}

export async function submitContactForm(formData: FormData) {
  const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  try {
    const validatedFields = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0]?.message ?? "Validation failed.",
      };
    }

    console.log("Contact form:", validatedFields.data);

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch {
    return {
      success: false,
      error: "Failed to send message.",
    };
  }
}
