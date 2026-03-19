import { postChallenge } from "@/actions/challenge";
import { prisma } from "@/lib/prisma";

export default async function ChallengePage() {
  const items = await prisma.challengeDeclaration.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">MYチャレンジ宣言</h1>
        <p className="mt-1 text-sm text-zinc-600">
          全員に見える宣言です（進捗更新はプロトタイプでは未実装）。
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">新しい宣言</h2>
        <form action={postChallenge} className="mt-3 flex flex-col gap-2">
          <textarea
            name="body"
            rows={4}
            required
            placeholder="今年のチャレンジを宣言"
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

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-800">みんなの宣言</h2>
        <ul className="space-y-3">
          {items.map((i) => (
            <li
              key={i.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium">{i.user.nickname}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">
                {i.body}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                {i.createdAt.toLocaleString("ja-JP")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
