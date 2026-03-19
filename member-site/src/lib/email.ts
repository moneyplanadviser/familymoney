/** プロトタイプ: RESEND_API_KEY があれば送信、なければコンソールのみ */

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[email stub]", opts.to, opts.subject, opts.text.slice(0, 200));
    return { ok: true as const, stub: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Member Site <onboarding@resend.dev>",
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    console.error("Resend error", t);
    return { ok: false as const, error: t };
  }
  return { ok: true as const, stub: false };
}
