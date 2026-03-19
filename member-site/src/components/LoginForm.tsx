"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction] = useActionState(signIn, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">メール</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">パスワード</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
      >
        ログイン
      </button>
      <p className="text-center text-sm text-zinc-600">
        はじめての方は{" "}
        <Link href="/register" className="font-medium text-zinc-900 underline">
          会員登録
        </Link>
      </p>
    </form>
  );
}
