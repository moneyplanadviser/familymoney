import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function RootPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const session = await getSession();
  if (!settings) redirect("/gate");
  const siteOk =
    session.siteVerifiedAt != null &&
    session.siteVerifiedAt >= settings.updatedAt.getTime();
  if (!siteOk) redirect("/gate");
  if (!session.userId) redirect("/login");
  redirect("/home");
}
