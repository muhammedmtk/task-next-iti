"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signup(formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message ?? "Validation failed.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch {
    return { success: false, error: "Failed to create account. Please try again." };
  }

  redirect("/login");
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message ?? "Validation failed.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }
  } catch {
    return { success: false, error: "Failed to sign in. Please try again." };
  }

  redirect("/");
}
