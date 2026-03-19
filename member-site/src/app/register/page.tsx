import { redirect } from "next/navigation";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";
import { requireSiteAccess } from "@/lib/auth";
import { getSession } from "@/lib/session";

export default async function RegisterPage() {
  await requireSiteAccess();
  const session = await getSession();
  if (session.userId) redirect("/home");

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-xl font-semibold">会員登録</h1>
        <p className="text-sm text-zinc-600">
          メールは必須（本人確認・通知用）。表示名はニックネームのみです。
        </p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-center text-xs text-zinc-500">
        <Link href="/legal/privacy" className="underline">
          プライバシー
        </Link>
      </p>
    </main>
  );
}
