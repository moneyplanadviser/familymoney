import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  let threads: Awaited<ReturnType<typeof prisma.thread.findMany>> = [];
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];

  if (query.length >= 2) {
    threads = await prisma.thread.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { comments: { some: { body: { contains: query } } } },
        ],
      },
      take: 30,
      orderBy: { createdAt: "desc" },
    });
    posts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { body: { contains: query } },
        ],
      },
      take: 30,
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">検索</h1>
        <p className="mt-1 text-sm text-zinc-600">
          掲示板（スレ・コメント）とブログ記事を検索します（2文字以上）。
        </p>
      </div>

      <form method="get" className="flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="キーワード"
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          検索
        </button>
      </form>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-amber-700">2文字以上入力してください。</p>
      )}

      {query.length >= 2 && (
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-semibold text-zinc-800">掲示板</h2>
            {threads.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600">該当なし</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {threads.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/board/${t.id}`}
                      className="text-sm text-zinc-900 underline"
                    >
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="text-sm font-semibold text-zinc-800">ブログ</h2>
            {posts.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600">該当なし</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm text-zinc-900 underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
