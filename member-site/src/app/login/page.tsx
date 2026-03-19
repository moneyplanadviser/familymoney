import { redirect } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { requireSiteAccess } from "@/lib/auth";
import { getSession } from "@/lib/session";

export default async function LoginPage() {
  await requireSiteAccess();
  const session = await getSession();
  if (session.userId) redirect("/home");

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-xl font-semibold">ログイン</h1>
        <p className="text-sm text-zinc-600">
          会員登録済みのメールとパスワードを入力
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-xs text-zinc-500">
        <Link href="/legal/terms" className="underline">
          利用規約
        </Link>
      </p>
    </main>
  );
}
