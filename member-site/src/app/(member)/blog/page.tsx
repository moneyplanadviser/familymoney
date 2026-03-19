import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">ブログ</h1>
        <p className="mt-1 text-sm text-zinc-600">
          記事は運営のみ投稿。会員はコメントできます。
        </p>
      </div>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
            >
              <span className="font-medium">{p.title}</span>
              <span className="mt-1 block text-xs text-zinc-500">
                {p.createdAt.toLocaleDateString("ja-JP")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
