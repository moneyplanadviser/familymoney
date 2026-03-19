"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";

export async function changeMonthlyPassword(
  _prev: { error?: string; ok?: boolean } | null,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean } | null> {
  await requireAdmin();
  const password = String(formData.get("password") ?? "");
  if (password.length < 6) return { error: "6文字以上にしてください" };

  const monthlyPasswordHash = await bcrypt.hash(password, 10);
  await prisma.siteSettings.update({
    where: { id: 1 },
    data: { monthlyPasswordHash },
  });
  revalidatePath("/admin");
  return { ok: true };
}

const threadSchema = z.object({
  title: z.string().min(1).max(200),
  kind: z.enum(["operator", "theme"]),
});

export async function createThread(formData: FormData) {
  const user = await requireAdmin();
  const parsed = threadSchema.safeParse({
    title: formData.get("title"),
    kind: formData.get("kind"),
  });
  if (!parsed.success) return;

  const t = await prisma.thread.create({
    data: {
      title: parsed.data.title,
      kind: parsed.data.kind,
      authorId: user.id,
    },
  });
  revalidatePath("/board");
  redirect(`/board/${t.id}`);
}

const postSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(20000),
});

export async function createBlogPost(formData: FormData) {
  const user = await requireAdmin();
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });
  if (!parsed.success) return;

  const base = slugify(parsed.data.title);
  let slug = base;
  let n = 0;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${base}-${n}`;
  }

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug,
      body: parsed.data.body,
      authorId: user.id,
    },
  });
  revalidatePath("/blog");
  redirect(`/blog/${post.slug}`);
}

const annSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(10000),
});

export async function createAnnouncement(formData: FormData) {
  await requireAdmin();
  const parsed = annSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });
  if (!parsed.success) return;

  await prisma.announcement.create({
    data: { title: parsed.data.title, body: parsed.data.body },
  });
  revalidatePath("/home");
  redirect("/home");
}
