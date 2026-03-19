"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

const schema = z.object({
  postId: z.string(),
  body: z.string().min(1).max(5000),
  parentId: z.string().optional(),
});

export async function postBlogComment(formData: FormData) {
  const user = await requireUser();
  const parsed = schema.safeParse({
    postId: formData.get("postId"),
    body: formData.get("body"),
    parentId: formData.get("parentId") || undefined,
  });
  if (!parsed.success) return;

  const post = await prisma.blogPost.findUnique({
    where: { id: parsed.data.postId },
  });
  if (!post) return;

  const c = await prisma.blogComment.create({
    data: {
      postId: parsed.data.postId,
      userId: user.id,
      body: parsed.data.body,
      parentId: parsed.data.parentId,
    },
  });

  if (parsed.data.parentId) {
    const parent = await prisma.blogComment.findUnique({
      where: { id: parsed.data.parentId },
      include: { user: true },
    });
    if (parent && parent.userId !== user.id) {
      await notifyUser({
        userId: parent.userId,
        title: "ブログコメントに返信がありました",
        link: `/blog/${post.slug}#c-${c.id}`,
        emailBody: `${user.nickname} さんから返信がありました。\n記事: ${post.title}`,
      });
    }
  }

  revalidatePath(`/blog/${post.slug}`);
}
