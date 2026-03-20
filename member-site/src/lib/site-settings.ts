import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * 本番で prisma db seed を流していない場合でも、
 * DEMO_MONTHLY_PASSWORD があれば SiteSettings を1件作る。
 */
export async function ensureSiteSettings() {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (existing) return existing;

  const plain = process.env.DEMO_MONTHLY_PASSWORD;
  if (!plain) return null;

  const monthlyPasswordHash = await bcrypt.hash(plain, 10);
  try {
    await prisma.siteSettings.create({
      data: { id: 1, monthlyPasswordHash },
    });
  } catch {
    // 同時リクエストで既に作成された場合
  }
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}
