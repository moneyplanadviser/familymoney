import { createThread } from "@/actions/admin";

export default function NewThreadPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">スレ作成</h1>
      <form action={createThread} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-zinc-700">タイトル</span>
          <input
            name="title"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-zinc-700">種別</span>
          <select
            name="kind"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="operator">運営スレ</option>
            <option value="theme">テーマ別スレ</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          作成
        </button>
      </form>
    </div>
  );
}
