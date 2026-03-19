"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/actions/auth";

export function RegisterForm() {
  const [state, formAction] = useActionState(register, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">ニックネーム（表示名）</span>
        <input
          name="nickname"
          type="text"
          required
          maxLength={40}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">メール（必須）</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">パスワード（6文字以上）</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
      >
        登録して入室
      </button>
      <p className="text-center text-sm text-zinc-600">
        <Link href="/login" className="font-medium text-zinc-900 underline">
          ログインへ
        </Link>
      </p>
    </form>
  );
}
