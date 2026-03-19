import { MemberNav } from "@/components/MemberNav";
import { requireUser } from "@/lib/auth";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-dvh bg-zinc-50">
      <MemberNav user={user} />
      <div className="mx-auto max-w-3xl px-3 py-4">{children}</div>
    </div>
  );
}
