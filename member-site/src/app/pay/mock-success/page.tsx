import Link from "next/link";

export default function PayMockSuccessPage() {
  const pw = process.env.DEMO_MONTHLY_PASSWORD ?? "prototype2025";

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-xl font-semibold">決済完了（デモ）</h1>
      <p className="mt-3 text-sm text-zinc-600">
        本番では PayPal の完了画面に表示します。ここでは環境変数{" "}
        <code className="rounded bg-zinc-100 px-1">DEMO_MONTHLY_PASSWORD</code>{" "}
        と同じ値を案内します。
      </p>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-700">初回のサイト入室パスワード</p>
        <p className="mt-2 break-all font-mono text-lg">{pw}</p>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        以降の更新は公式LINEで通知する想定（プロトタイプでは未接続）。
      </p>
      <div className="mt-8 flex flex-col gap-2">
        <Link
          href="/gate"
          className="rounded-lg bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
        >
          ゲートへ進む
        </Link>
        <Link href="/home" className="text-center text-sm text-zinc-600 underline">
          ホーム（ログイン済みの場合）
        </Link>
      </div>
    </main>
  );
}
