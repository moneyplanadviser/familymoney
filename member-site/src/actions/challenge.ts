"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const schema = z.object({
  body: z.string().min(1).max(2000),
});

export async function postChallenge(formData: FormData) {
  const user = await requireUser();
  const parsed = schema.safeParse({ body: formData.get("body") });
  if (!parsed.success) return;

  await prisma.challengeDeclaration.create({
    data: { userId: user.id, body: parsed.data.body },
  });
  revalidatePath("/challenge");
}
