import { createAnnouncement } from "@/actions/admin";

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">新着お知らせ</h1>
      <form action={createAnnouncement} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-zinc-700">タイトル</span>
          <input
            name="title"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-zinc-700">本文</span>
          <textarea
            name="body"
            required
            rows={8}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          公開
        </button>
      </form>
    </div>
  );
}
