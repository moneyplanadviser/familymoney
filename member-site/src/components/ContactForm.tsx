"use client";

import { useState } from "react";

export function ContactForm() {
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg((data as { error?: string }).error ?? "送信に失敗しました");
      return;
    }
    setMsg("送信しました");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {msg && (
        <p className="text-sm" role="status">
          {msg}
        </p>
      )}
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">件名</span>
        <input
          name="subject"
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-base"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">本文</span>
        <textarea
          name="body"
          required
          rows={6}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-base"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-zinc-700">添付（任意）</span>
        <input name="file" type="file" className="w-full text-sm" />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
      >
        送信
      </button>
    </form>
  );
}
