import Link from "next/link";
import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "./SignOutButton";

export async function MemberNav({ user }: { user: User }) {
  const unread = await prisma.notification.count({
    where: { userId: user.id, read: false },
  });

  const link =
    "rounded-md px-2 py-1 text-sm text-zinc-800 hover:bg-zinc-100";

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-1 px-3 py-2">
        <Link className={link} href="/home">
          ホーム
        </Link>
        <Link className={link} href="/board">
          掲示板
        </Link>
        <Link className={link} href="/blog">
          ブログ
        </Link>
        <Link className={link} href="/challenge">
          チャレンジ
        </Link>
        <Link className={link} href="/contact">
          お問い合わせ
        </Link>
        <Link className={link} href="/search">
          検索
        </Link>
        <Link className={link} href="/notifications">
          通知{unread > 0 ? `(${unread})` : ""}
        </Link>
        {user.role === "admin" && (
          <Link className={link} href="/admin">
            運営
          </Link>
        )}
        <span className="ml-auto text-xs text-zinc-500">{user.nickname}</span>
        <SignOutButton />
      </nav>
    </header>
  );
}
