import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  const link =
    "rounded-md px-2 py-1 text-sm text-zinc-800 hover:bg-zinc-100";

  return (
    <div className="min-h-dvh bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-3 py-2">
          <span className="text-sm font-semibold text-zinc-900">運営</span>
          <Link className={link} href="/admin">
            ダッシュボード
          </Link>
          <Link className={link} href="/admin/password">
            月次パスワード
          </Link>
          <Link className={link} href="/admin/threads/new">
            スレ作成
          </Link>
          <Link className={link} href="/admin/blog/new">
            ブログ投稿
          </Link>
          <Link className={link} href="/admin/announcements/new">
            お知らせ
          </Link>
          <Link className={`${link} ml-auto`} href="/home">
            会員サイトへ
          </Link>
        </nav>
      </header>
      <div className="mx-auto max-w-3xl px-3 py-4">{children}</div>
    </div>
  );
}
