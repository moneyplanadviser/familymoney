# 会員限定サイト（プロトタイプ）

ヒアリングで整理した要件を反映した **Next.js + Prisma + PostgreSQL** のプロトタイプです。

## できること

- **ゲート**: 全員共通の「今月のパスワード」（bcrypt 保存・運営が月次変更可）
- **会員**: メール必須・ニックネーム表示、ログイン後セッション
- **掲示板**: 運営スレ / テーマ別スレ（スレは運営のみ、会員はコメント・返信）
- **ブログ**: 運営のみ投稿、会員はコメント・返信
- **MYチャレンジ宣言**: 全員に見える宣言（進捗は未実装）
- **お問い合わせ**: 添付付き → DB 保存 + 転送メール（`RESEND_API_KEY` 未設定時はコンソールログ）
- **新着お知らせ**、**通知**（返信時）、**検索**（掲示板・ブログ）
- **利用規約・プライバシー**（ひな形）
- **決済完了デモ** `/pay/mock-success`（`DEMO_MONTHLY_PASSWORD` を表示）
- **公式リンク（Linktree 風）** `/links` — ゲート不要。SNSプロフィール用URLは `https://members.familymoney.jp/links` など。公開ツールサイトへのリンクは `NEXT_PUBLIC_PUBLIC_SITE_URL`（未設定時は `https://www.familymoney.jp`）を使用します。

## ローカル開発（Docker + PostgreSQL）

```bash
cd member-site
docker compose up -d
cp .env.example .env   # DATABASE_URL は .env.example の例でOK
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

ブラウザで **`http://localhost:3000/gate`** から。

### デモ用アカウント（シード後）

| 役割 | メール | パスワード |
|------|--------|------------|
| 運営 | `admin@example.com` | `admin123` |
| 会員 | `demo@example.com` | `demo123` |

**今月のサイトパスワード**（ゲート）: `.env` の `DEMO_MONTHLY_PASSWORD`（例: `prototype2025`）

## ブラウザで「見える」ようにする（Vercel）

GitHub Pages では Next.js + DB は動かせないため、**Vercel 等にデプロイ**します。

### 手早い手順

1. **[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoneyplanadviser%2Ffamilymoney&root-directory=member-site)**（または Vercel ダッシュボードで GitHub リポジトリを Import）
2. **Root Directory** を **`member-site`** に設定
3. **[Neon](https://neon.tech)**（無料）などで **PostgreSQL** を作成し、接続文字列をコピー
4. Vercel の **Environment Variables** に以下を設定（Production / Preview 両方推奨）

| 変数 | 例 |
|------|-----|
| `DATABASE_URL` | `postgresql://...@...neon.tech/neondb?sslmode=require` |
| `SESSION_SECRET` | 32文字以上のランダム文字列 |
| `DEMO_MONTHLY_PASSWORD` | ゲート用（シードと揃える） |
| `CONTACT_TO_EMAIL` | お問い合わせ転送先 |
| `NEXT_PUBLIC_APP_URL` | `https://あなたのプロジェクト.vercel.app` |

5. **Deploy** — ビルドで `prisma migrate deploy` が走り、テーブルが作成されます。
6. **初回だけ**、ローカルまたは CI からシードを流す（例）:

```bash
export DATABASE_URL="（Neon の URL と同じ）"
npx prisma db seed
```

これで **`https://（あなたのドメイン）/gate`** から画面が開けます。

## ビルド（参考）

- 本番相当: `npm run build`（`prisma migrate deploy` を含む）
- DB なしで型・Next のみ確認: `npm run build:next`

## 環境変数

| 変数 | 説明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 接続文字列（必須） |
| `SESSION_SECRET` | 32文字以上 |
| `DEMO_MONTHLY_PASSWORD` | ゲート用プレーン（シードと一致させる） |
| `CONTACT_TO_EMAIL` | お問い合わせ転送先 |
| `NEXT_PUBLIC_APP_URL` | 通知メール内リンク用（任意） |
| `NEXT_PUBLIC_PUBLIC_SITE_URL` | `/links` から飛ばす公開ツールサイトのオリジン（任意。未設定時は `https://www.familymoney.jp`） |
| `NEXT_PUBLIC_LINK_LINE_URL` など | `/links` の外部リンク（任意）。`LINE` / `INSTAGRAM` / `X` / `NEWSLETTER` — 未設定は非表示。note は固定で表示 |
| `RESEND_API_KEY` / `RESEND_FROM` | メール送信（任意） |
