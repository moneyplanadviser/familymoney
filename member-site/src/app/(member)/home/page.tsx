import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-lg font-semibold">ホーム</h1>
        <p className="mt-1 text-sm text-zinc-600">
          新着のお知らせと、よく使うリンクです。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-800">新着お知らせ</h2>
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="font-medium">{a.title}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">
                {a.body}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                {a.createdAt.toLocaleString("ja-JP")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-2">
        <Link
          href="/board"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-zinc-50"
        >
          掲示板へ
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-zinc-50"
        >
          ブログへ
        </Link>
        <Link
          href="/challenge"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-zinc-50"
        >
          MYチャレンジ宣言へ
        </Link>
      </section>
    </div>
  );
}
