import Link from "next/link";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/actions/notifications";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export default async function NotificationsPage() {
  const user = await requireUser();
  const items = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold">通知</h1>
          <p className="mt-1 text-sm text-zinc-600">
            返信がつくと通知・メール（設定時）が届きます。
          </p>
        </div>
        {items.some((n) => !n.read) && (
          <form action={markAllNotificationsRead}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs"
            >
              すべて既読
            </button>
          </form>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((n) => (
          <li
            key={n.id}
            className={`flex flex-wrap items-start justify-between gap-2 rounded-xl border px-4 py-3 ${
              n.read ? "border-zinc-100 bg-zinc-50" : "border-zinc-200 bg-white"
            }`}
          >
            <div>
              <Link href={n.link} className="font-medium text-zinc-900">
                {n.title}
              </Link>
              <p className="text-xs text-zinc-400">
                {n.createdAt.toLocaleString("ja-JP")}
              </p>
            </div>
            {!n.read && (
              <form action={markNotificationRead}>
                <input type="hidden" name="id" value={n.id} />
                <button
                  type="submit"
                  className="text-xs text-zinc-600 underline"
                >
                  既読
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-sm text-zinc-600">通知はまだありません。</p>
      )}
    </div>
  );
}
