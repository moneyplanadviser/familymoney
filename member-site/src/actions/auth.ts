"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSiteAccess } from "@/lib/auth";
import { getSession } from "@/lib/session";

const cred = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signIn(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  await requireSiteAccess();
  const parsed = cred.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "入力を確認してください" };

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) return { error: "メールまたはパスワードが違います" };

  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!ok) return { error: "メールまたはパスワードが違います" };

  const session = await getSession();
  session.userId = user.id;
  await session.save();
  redirect("/home");
}

const registerSchema = cred.extend({
  nickname: z.string().min(1).max(40),
});

export async function register(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  await requireSiteAccess();
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    nickname: formData.get("nickname"),
  });
  if (!parsed.success) return { error: "入力を確認してください" };

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (exists) return { error: "このメールは登録済みです" };

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const created = await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash,
      nickname: parsed.data.nickname,
      role: "member",
    },
  });

  const session = await getSession();
  session.userId = created.id;
  await session.save();
  redirect("/home");
}

export async function signOut() {
  const session = await getSession();
  session.userId = undefined;
  await session.save();
  redirect("/login");
}
