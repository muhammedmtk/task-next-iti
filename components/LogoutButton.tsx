"use client";

import { logout } from "@/lib/auth-actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Log out
      </button>
    </form>
  );
}
