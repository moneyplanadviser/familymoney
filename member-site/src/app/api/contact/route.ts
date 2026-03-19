import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const form = await req.formData();
  const subject = String(form.get("subject") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();
  const file = form.get("file");

  if (!subject || !body) {
    return NextResponse.json({ error: "件名と本文を入力してください" }, { status: 400 });
  }

  let attachmentPath: string | null = null;
  if (file instanceof File && file.size > 0) {
    const buf = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^\w.\-()]/g, "_").slice(0, 120);
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${safeName}`;
    const full = path.join(dir, name);
    await writeFile(full, buf);
    attachmentPath = `/uploads/${name}`;
  }

  await prisma.contactMessage.create({
    data: {
      email: user.email,
      subject,
      body: `[会員: ${user.nickname} <${user.email}>]\n\n${body}`,
      attachmentPath: attachmentPath ?? undefined,
    },
  });

  const to = process.env.CONTACT_TO_EMAIL ?? "admin@example.com";
  await sendMail({
    to,
    subject: `[お問い合わせ] ${subject}`,
    text: `会員: ${user.nickname} (${user.email})\n\n${body}\n\n添付: ${attachmentPath ?? "なし"}`,
  });

  return NextResponse.json({ ok: true });
}
