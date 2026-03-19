import Link from "next/link";
import { notFound } from "next/navigation";
import { postBlogComment } from "@/actions/blog";
import { prisma } from "@/lib/prisma";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true },
  });
  if (!post) notFound();

  const comments = await prisma.blogComment.findMany({
    where: { postId: post.id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  const top = comments.filter((c) => !c.parentId);
  const children = new Map<string, typeof comments>();
  for (const c of comments) {
    if (c.parentId) {
      const arr = children.get(c.parentId) ?? [];
      arr.push(c);
      children.set(c.parentId, arr);
    }
  }

  return (
    <article className="space-y-6">
      <div>
        <Link href="/blog" className="text-sm text-zinc-600 underline">
          ← ブログ一覧
        </Link>
        <h1 className="mt-2 text-xl font-semibold">{post.title}</h1>
        <p className="mt-1 text-xs text-zinc-500">
          {post.createdAt.toLocaleString("ja-JP")}
        </p>
      </div>
      <div className="max-w-none whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
        {post.body}
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold">コメント</h2>
        {top.map((c) => (
          <div key={c.id} id={`c-${c.id}`} className="space-y-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium">{c.user.nickname}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm">{c.body}</p>
              <p className="mt-2 text-xs text-zinc-400">
                {c.createdAt.toLocaleString("ja-JP")}
              </p>
            </div>
            {(children.get(c.id) ?? []).map((r) => (
              <div
                key={r.id}
                id={`c-${r.id}`}
                className="ml-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4"
              >
                <p className="text-sm font-medium">{r.user.nickname}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{r.body}</p>
                <p className="mt-2 text-xs text-zinc-400">
                  {r.createdAt.toLocaleString("ja-JP")}
                </p>
              </div>
            ))}
            <form action={postBlogComment} className="ml-4 flex flex-col gap-2">
              <input type="hidden" name="postId" value={post.id} />
              <input type="hidden" name="parentId" value={c.id} />
              <textarea
                name="body"
                rows={2}
                required
                placeholder="返信"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="self-end rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white"
              >
                返信
              </button>
            </form>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">新規コメント</h2>
        <form action={postBlogComment} className="mt-3 flex flex-col gap-2">
          <input type="hidden" name="postId" value={post.id} />
          <textarea
            name="body"
            rows={4}
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            投稿
          </button>
        </form>
      </section>
    </article>
  );
}
