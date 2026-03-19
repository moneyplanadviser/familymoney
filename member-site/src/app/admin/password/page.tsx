import { PasswordForm } from "@/components/PasswordForm";

export default function AdminPasswordPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">月次パスワード</h1>
      <p className="text-sm text-zinc-600">
        変更すると{" "}
        <code className="rounded bg-zinc-100 px-1">SiteSettings.updatedAt</code>{" "}
        が進み、全員がゲートで再入力が必要になります（LINE通知は別途）。
      </p>
      <PasswordForm />
    </div>
  );
}
