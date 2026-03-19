import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  if ((await prisma.thread.count()) > 0) {
    console.log("Seed skip: data already exists");
    return;
  }

  const monthly = process.env.DEMO_MONTHLY_PASSWORD ?? "prototype2025";
  const monthlyPasswordHash = await bcrypt.hash(monthly, 10);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, monthlyPasswordHash },
    update: { monthlyPasswordHash },
  });

  const adminPass = await bcrypt.hash("admin123", 10);
  const memberPass = await bcrypt.hash("demo123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    create: {
      email: "admin@example.com",
      passwordHash: adminPass,
      nickname: "運営",
      role: "admin",
    },
    update: {},
  });

  const member = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    create: {
      email: "demo@example.com",
      passwordHash: memberPass,
      nickname: "デモ会員",
      role: "member",
    },
    update: {},
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "会員サイト プロトタイプ公開",
        body: "掲示板・ブログ・チャレンジ宣言・お問い合わせを試せます。月次パスワードはゲート画面で入力してください。",
      },
      {
        title: "今月のパスワード運用",
        body: "本番では決済完了画面と公式LINEで案内する想定です。このデモでは .env の DEMO_MONTHLY_PASSWORD と一致させています。",
      },
    ],
  });

  const opThread = await prisma.thread.create({
    data: {
      title: "【運営】ようこそ・ルール案内",
      kind: "operator",
      authorId: admin.id,
    },
  });

  await prisma.thread.create({
    data: {
      title: "【テーマ】雑談・近況シェア",
      kind: "theme",
      authorId: admin.id,
    },
  });

  await prisma.comment.create({
    data: {
      threadId: opThread.id,
      userId: member.id,
      body: "プロトタイプ確認しました！",
    },
  });

  const post = await prisma.blogPost.create({
    data: {
      title: "会員向けブログのサンプル記事",
      slug: "welcome-sample",
      body: "これは運営のみが投稿できるブログです。会員はコメントできます。\n\n検索ページからキーワードを試してください。",
      authorId: admin.id,
    },
  });

  await prisma.blogComment.create({
    data: {
      postId: post.id,
      userId: member.id,
      body: "記事ありがとうございます。",
    },
  });

  await prisma.challengeDeclaration.create({
    data: {
      userId: member.id,
      body: "毎週3回ウォーキングを続ける（デモ宣言）",
    },
  });

  console.log("Seed OK. Admin: admin@example.com / admin123");
  console.log("Member: demo@example.com / demo123");
  console.log("Monthly site password:", monthly);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
