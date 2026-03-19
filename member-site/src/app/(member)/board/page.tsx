import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BoardPage() {
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const operator = threads.filter((t) => t.kind === "operator");
  const theme = threads.filter((t) => t.kind === "theme");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">掲示板</h1>
        <p className="mt-1 text-sm text-zinc-600">
          スレは運営のみ作成。会員はコメントのみです。
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-800">運営スレ</h2>
        <ul className="space-y-2">
          {operator.map((t) => (
            <li key={t.id}>
              <Link
                href={`/board/${t.id}`}
                className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-800">テーマ別スレ</h2>
        <ul className="space-y-2">
          {theme.map((t) => (
            <li key={t.id}>
              <Link
                href={`/board/${t.id}`}
                className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:bg-zinc-50"
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
