"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ensureSiteSettings } from "@/lib/site-settings";

export async function submitSitePassword(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  const password = String(formData.get("password") ?? "");
  const settings =
    (await ensureSiteSettings()) ??
    (await prisma.siteSettings.findUnique({ where: { id: 1 } }));
  if (!settings) {
    return {
      error:
        "設定がありません（Vercel に DEMO_MONTHLY_PASSWORD を設定してください）",
    };
  }

  const ok = await bcrypt.compare(password, settings.monthlyPasswordHash);
  if (!ok) return { error: "パスワードが違います" };

  const session = await getSession();
  session.siteVerifiedAt = Date.now();
  await session.save();
  redirect("/login");
}
