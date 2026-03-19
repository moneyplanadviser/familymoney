import { prisma } from "./prisma";
import { sendMail } from "./email";

export async function notifyUser(opts: {
  userId: string;
  title: string;
  link: string;
  emailBody: string;
}) {
  const user = await prisma.user.findUnique({ where: { id: opts.userId } });
  if (!user) return;

  await prisma.notification.create({
    data: {
      userId: opts.userId,
      title: opts.title,
      link: opts.link,
    },
  });

  if (user.notifyEmail) {
    await sendMail({
      to: user.email,
      subject: opts.title,
      text: `${opts.emailBody}\n\n${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${opts.link}`,
    });
  }

  if (user.notifyLine) {
    console.log("[LINE stub] would notify user", user.id, opts.title);
  }
}
