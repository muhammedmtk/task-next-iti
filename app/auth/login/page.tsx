import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ registered?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { registered } = await searchParams;

  return <LoginForm showSuccess={registered === "true"} />;
}
