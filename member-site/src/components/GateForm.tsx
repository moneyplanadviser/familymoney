"use client";

import { useActionState } from "react";
import { submitSitePassword } from "@/actions/site";

export function GateForm() {
  const [state, formAction] = useActionState(submitSitePassword, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">今月のパスワード</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-zinc-500"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
      >
        入室する
      </button>
    </form>
  );
}
