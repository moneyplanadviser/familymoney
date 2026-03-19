"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

const commentSchema = z.object({
  threadId: z.string(),
  body: z.string().min(1).max(5000),
  parentId: z.string().optional(),
});

export async function postThreadComment(formData: FormData) {
  const user = await requireUser();
  const parsed = commentSchema.safeParse({
    threadId: formData.get("threadId"),
    body: formData.get("body"),
    parentId: formData.get("parentId") || undefined,
  });
  if (!parsed.success) return;

  const thread = await prisma.thread.findUnique({
    where: { id: parsed.data.threadId },
  });
  if (!thread) return;

  const comment = await prisma.comment.create({
    data: {
      threadId: parsed.data.threadId,
      userId: user.id,
      body: parsed.data.body,
      parentId: parsed.data.parentId,
    },
  });

  if (parsed.data.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: parsed.data.parentId },
      include: { user: true },
    });
    if (parent && parent.userId !== user.id) {
      await notifyUser({
        userId: parent.userId,
        title: "掲示板に返信がありました",
        link: `/board/${thread.id}#c-${comment.id}`,
        emailBody: `${user.nickname} さんから返信がありました。\nスレ: ${thread.title}`,
      });
    }
  }

  revalidatePath(`/board/${parsed.data.threadId}`);
}
