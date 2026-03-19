import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">お問い合わせ</h1>
        <p className="mt-1 text-sm text-zinc-600">
          会員情報に紐づけて運営メールへ転送します（添付可）。本番では{" "}
          <code className="rounded bg-zinc-100 px-1">CONTACT_TO_EMAIL</code>{" "}
          と Resend 等を設定してください。
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
