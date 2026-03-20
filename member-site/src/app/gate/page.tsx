import { redirect } from "next/navigation";
import Link from "next/link";
import { GateForm } from "@/components/GateForm";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ensureSiteSettings } from "@/lib/site-settings";

export default async function GatePage() {
  const settings =
    (await ensureSiteSettings()) ??
    (await prisma.siteSettings.findUnique({ where: { id: 1 } }));
  const session = await getSession();

  if (settings && session.siteVerifiedAt != null) {
    if (session.siteVerifiedAt >= settings.updatedAt.getTime()) {
      if (session.userId) redirect("/home");
      redirect("/login");
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          会員限定サイト
        </h1>
        <p className="text-sm text-zinc-600">
          今月のパスワードを入力してください（決済完了画面・公式LINEで案内する想定）
        </p>
      </div>
      <GateForm />
      <p className="mt-6 text-center text-xs text-zinc-500">
        <Link href="/pay/mock-success" className="underline">
          決済完了（デモ）
        </Link>
        {" · "}
        <Link href="/legal/terms" className="underline">
          利用規約
        </Link>
      </p>
    </main>
  );
}
