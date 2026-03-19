import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/gate" className="text-sm text-zinc-600 underline">
        ← ゲート
      </Link>
      <h1 className="mt-4 text-xl font-semibold">利用規約（ひな形）</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-800">
        <p>
          本ページはプロトタイプ用のひな形です。実運用前に、弁護士等の確認をお願いします。
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>本サービスは有料会員向けの情報提供を目的とします。</li>
          <li>会員は第三者の権利を侵害する投稿を行わないものとします。</li>
          <li>運営は、規約違反と判断した投稿を削除できるものとします。</li>
          <li>サービス内容は予告なく変更・終了する場合があります。</li>
        </ol>
      </div>
    </main>
  );
}
