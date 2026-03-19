"use client";

import { useActionState } from "react";
import { changeMonthlyPassword } from "@/actions/admin";

export function PasswordForm() {
  const [state, formAction] = useActionState(changeMonthlyPassword, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="text-sm text-emerald-700" role="status">
          更新しました。全員がゲートで再入力が必要です。
        </p>
      )}
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">新しい今月のパスワード</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
      >
        変更する
      </button>
    </form>
  );
}
