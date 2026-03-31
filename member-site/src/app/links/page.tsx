import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FamilyMoney 公式リンク",
  description:
    "会員サイト・シミュレーター・規約など FamilyMoney 関連リンクの一覧です。",
};

function publicSiteBase(): string {
  const raw = process.env.NEXT_PUBLIC_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://www.familymoney.jp";
}

const btn =
  "block w-full rounded-full border border-zinc-200 bg-white px-5 py-3.5 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";
const sub = "mt-1 block text-xs font-normal text-zinc-500";

export default function LinksPage() {
  const pub = publicSiteBase();

  return (
    <main className="mx-auto min-h-dvh max-w-md px-4 py-10 pb-16">
      <div className="mb-10 text-center">
        <div
          className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-2xl font-bold tracking-wide text-white shadow-lg"
          aria-hidden
        >
          FM
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
          FamilyMoney
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          家計・相続・年金をわかりやすくシミュレーション
        </p>
      </div>

      <nav className="flex flex-col gap-3" aria-label="公式リンク">
        <Link href="/gate" className={btn}>
          会員サイトに入る
          <span className={sub}>今月のパスワードを入力</span>
        </Link>
        <Link href="/login" className={btn}>
          ログイン
        </Link>
        <Link href="/register" className={btn}>
          新規登録
        </Link>
        <Link href="/home" className={btn}>
          ホーム
          <span className={sub}>ログイン後のトップ</span>
        </Link>
        <Link href="/board" className={btn}>
          掲示板
        </Link>
        <Link href="/blog" className={btn}>
          ブログ
        </Link>
        <Link href="/challenge" className={btn}>
          チャレンジ
        </Link>
        <Link href="/contact" className={btn}>
          お問い合わせ
        </Link>
        <Link href="/search" className={btn}>
          検索
        </Link>
        <Link href="/notifications" className={btn}>
          通知
        </Link>

        <a
          href={`${pub}/`}
          className={btn}
          target="_blank"
          rel="noopener noreferrer"
        >
          シミュレーター・ツール一覧
          <span className={sub}>公開サイト（別ウィンドウ）</span>
        </a>
        <a
          href={`${pub}/links.html`}
          className={btn}
          target="_blank"
          rel="noopener noreferrer"
        >
          ツール用リンク一覧
          <span className={sub}>静的ページ版（別ウィンドウ）</span>
        </a>
        <a
          href={`${pub}/salon-campaign.html`}
          className={btn}
          target="_blank"
          rel="noopener noreferrer"
        >
          オンラインサロン
          <span className={sub}>ご案内（別ウィンドウ）</span>
        </a>

        <Link href="/legal/terms" className={btn}>
          利用規約
        </Link>
        <Link href="/legal/privacy" className={btn}>
          プライバシーポリシー
        </Link>
      </nav>

      <p className="mt-10 text-center text-xs text-zinc-500">FamilyMoney</p>
    </main>
  );
}
