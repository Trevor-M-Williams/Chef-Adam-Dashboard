import { NextResponse } from "next/server";
import { Resend } from "resend";
import AppleReceiptEmail from "@/email/apple";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, order } = await request.json();

  resend.emails.send({
    from: "Trev <trev@luminatedenver.dev>",
    to: "tmw7991@gmail.com",
    subject: `New order from ${name}`,
    react: <AppleReceiptEmail order={order as string} />,
  });

  return NextResponse.json({ success: true });
}
