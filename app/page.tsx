import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Welcome back, {user.name}!</h1>
      <p className="mt-4 text-lg text-slate-600">{user.email}</p>
      <p className="mt-2 max-w-md text-slate-500">
        You are signed in to E-commerce Lab. Browse products or manage your account from here.
      </p>
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
