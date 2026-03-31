import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FamilyMoney 公式リンク",
  description:
    "公式LINE・note・会員サイト・シミュレーター・規約など FamilyMoney 関連リンクの一覧です。",
};

function publicSiteBase(): string {
  const raw = process.env.NEXT_PUBLIC_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://moneyplanadviser.github.io/familymoney";
}

function trimEnv(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t || undefined;
}

type ExtLink = { href: string; label: string; sub?: string };

/** LINE / Instagram / X / メルマガは環境変数。note は固定。 */
function followLinks(): ExtLink[] {
  const out: ExtLink[] = [];
  const line = trimEnv(process.env.NEXT_PUBLIC_LINK_LINE_URL);
  if (line) out.push({ href: line, label: "公式LINE", sub: "友だち追加" });
  const ig = trimEnv(process.env.NEXT_PUBLIC_LINK_INSTAGRAM_URL);
  if (ig) out.push({ href: ig, label: "Instagram" });
  const x = trimEnv(process.env.NEXT_PUBLIC_LINK_X_URL);
  if (x) out.push({ href: x, label: "X（旧Twitter）" });
  out.push({
    href: "https://note.com/familymoney/membership",
    label: "note 会員・オンラインサロン",
    sub: "詳細・入会はこちら",
  });
  const newsletter = trimEnv(process.env.NEXT_PUBLIC_LINK_NEWSLETTER_URL);
  if (newsletter)
    out.push({
      href: newsletter,
      label: "メルマガ・ニュースレター",
      sub: "登録はこちら",
    });
  return out;
}

const btn =
  "block w-full rounded-full border border-zinc-200 bg-white px-5 py-3.5 text-center text-sm font-semibold text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";
const sub = "mt-1 block text-xs font-normal text-zinc-500";
const sectionTitle =
  "mb-2 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-400";

export default function LinksPage() {
  const pub = publicSiteBase();
  const social = followLinks();

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

      <nav className="flex flex-col gap-6" aria-label="公式リンク">
        <div>
          <h2 className={sectionTitle}>フォロー・参加</h2>
          <div className="flex flex-col gap-3">
            {social.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className={btn}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                {item.sub ? <span className={sub}>{item.sub}</span> : null}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className={sectionTitle}>会員サイト</h2>
          <div className="flex flex-col gap-3">
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
          </div>
        </div>

        <div>
          <h2 className={sectionTitle}>会員ページ</h2>
          <div className="flex flex-col gap-3">
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
          </div>
        </div>

        <div>
          <h2 className={sectionTitle}>ツール・その他</h2>
          <div className="flex flex-col gap-3">
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
              オンラインサロン（LP）
              <span className={sub}>キャンペーン案内（別ウィンドウ）</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className={sectionTitle}>規約</h2>
          <div className="flex flex-col gap-3">
            <Link href="/legal/terms" className={btn}>
              利用規約
            </Link>
            <Link href="/legal/privacy" className={btn}>
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </nav>

      <p className="mt-10 text-center text-xs text-zinc-500">FamilyMoney</p>
    </main>
  );
}
