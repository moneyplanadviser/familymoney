import Link from "next/link";
import { notFound } from "next/navigation";
import { postThreadComment } from "@/actions/board";
import { prisma } from "@/lib/prisma";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = await prisma.thread.findUnique({
    where: { id },
    include: { author: true },
  });
  if (!thread) notFound();

  const comments = await prisma.comment.findMany({
    where: { threadId: id },
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
    <div className="space-y-6">
      <div>
        <Link href="/board" className="text-sm text-zinc-600 underline">
          ← 掲示板一覧
        </Link>
        <h1 className="mt-2 text-lg font-semibold">{thread.title}</h1>
        <p className="mt-1 text-xs text-zinc-500">
          {thread.kind === "operator" ? "運営スレ" : "テーマ別スレ"} ·{" "}
          {thread.createdAt.toLocaleString("ja-JP")}
        </p>
      </div>

      <section className="space-y-4">
        {top.map((c) => (
          <div key={c.id} id={`c-${c.id}`} className="space-y-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-zinc-900">
                {c.user.nickname}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">
                {c.body}
              </p>
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
                <p className="text-sm font-medium text-zinc-900">
                  {r.user.nickname}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">
                  {r.body}
                </p>
                <p className="mt-2 text-xs text-zinc-400">
                  {r.createdAt.toLocaleString("ja-JP")}
                </p>
              </div>
            ))}
            <form action={postThreadComment} className="ml-4 flex flex-col gap-2">
              <input type="hidden" name="threadId" value={thread.id} />
              <input type="hidden" name="parentId" value={c.id} />
              <textarea
                name="body"
                rows={2}
                required
                placeholder="返信を書く"
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
        <form action={postThreadComment} className="mt-3 flex flex-col gap-2">
          <input type="hidden" name="threadId" value={thread.id} />
          <textarea
            name="body"
            rows={4}
            required
            placeholder="コメントを書く"
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
    </div>
  );
}
