import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/gate" className="text-sm text-zinc-600 underline">
        ← ゲート
      </Link>
      <h1 className="mt-4 text-xl font-semibold">
        プライバシーポリシー（ひな形）
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-800">
        <p>
          本ページはプロトタイプ用のひな形です。実運用前に、個人情報の取り扱いを精査してください。
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>取得する情報：メールアドレス、ニックネーム、お問い合わせ内容等。</li>
          <li>利用目的：会員管理、本人確認、お問い合わせ対応、通知送信。</li>
          <li>第三者提供：法令に基づく場合を除き、同意なく第三者に提供しません。</li>
          <li>開示・訂正・削除：所定の手続きに応じます。</li>
        </ol>
      </div>
    </main>
  );
}
