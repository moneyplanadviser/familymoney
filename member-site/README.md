# 会員限定サイト（プロトタイプ）

ヒアリングで整理した要件を反映した **Next.js + Prisma + SQLite** のプロトタイプです。

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

## セットアップ

```bash
cd member-site
cp .env.example .env   # 必要なら編集
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

ブラウザで `http://localhost:3000/gate` から。

### デモ用アカウント（シード後）

| 役割 | メール | パスワード |
|------|--------|------------|
| 運営 | `admin@example.com` | `admin123` |
| 会員 | `demo@example.com` | `demo123` |

**今月のサイトパスワード**（ゲート）: `.env` の `DEMO_MONTHLY_PASSWORD`（初期値 `prototype2025`）

## デプロイについて

このアプリは **API・DB・ファイルアップロード** を使うため、**GitHub Pages 単体ではホストできません**。  
`github.io` で試す場合は、**別ホスティング（例: Vercel + Postgres）** に載せ替える想定です。ルートの `FamilyMoney` 静的サイトとは分離しています。

## 環境変数

| 変数 | 説明 |
|------|------|
| `DATABASE_URL` | 開発は `file:./dev.db` |
| `SESSION_SECRET` | 32文字以上 |
| `DEMO_MONTHLY_PASSWORD` | ゲート用プレーン（シードと一致） |
| `CONTACT_TO_EMAIL` | お問い合わせ転送先 |
| `RESEND_API_KEY` / `RESEND_FROM` | メール送信（任意） |
