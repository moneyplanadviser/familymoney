import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { getSession } from "./session";
import { ensureSiteSettings } from "./site-settings";

/** API 用: ログイン済みユーザーを返す（未ログインは null） */
export async function getSessionUser() {
  const settings =
    (await ensureSiteSettings()) ??
    (await prisma.siteSettings.findUnique({ where: { id: 1 } }));
  if (!settings) return null;
  const session = await getSession();
  const siteOk =
    session.siteVerifiedAt != null &&
    session.siteVerifiedAt >= settings.updatedAt.getTime();
  if (!siteOk) return null;
  if (!session.userId) return null;
  return prisma.user.findUnique({ where: { id: session.userId } });
}

export async function requireSiteAccess() {
  const settings =
    (await ensureSiteSettings()) ??
    (await prisma.siteSettings.findUnique({ where: { id: 1 } }));
  if (!settings) redirect("/gate");

  const session = await getSession();
  const ok =
    session.siteVerifiedAt != null &&
    session.siteVerifiedAt >= settings.updatedAt.getTime();

  if (!ok) redirect("/gate");
}

export async function requireUser() {
  await requireSiteAccess();
  const session = await getSession();
  if (!session.userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/home");
  return user;
}
