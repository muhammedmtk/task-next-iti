import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export { login, logout, signup } from "@/lib/auth-actions";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const userId = Number.parseInt(token, 10);
  if (Number.isNaN(userId)) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
    return user;
  } catch {
    return null;
  }
}
