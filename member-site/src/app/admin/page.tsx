import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">運営ダッシュボード</h1>
      <p className="text-sm text-zinc-600">
        スレ・ブログ・お知らせの作成と、月次パスワードの更新ができます。
      </p>
      <ul className="grid gap-2">
        <Link
          href="/admin/password"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
        >
          今月のパスワードを変更
        </Link>
        <Link
          href="/admin/threads/new"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
        >
          掲示板スレを作成
        </Link>
        <Link
          href="/admin/blog/new"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
        >
          ブログ記事を投稿
        </Link>
        <Link
          href="/admin/announcements/new"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
        >
          新着お知らせを追加
        </Link>
      </ul>
    </div>
  );
}
