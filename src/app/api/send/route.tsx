import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/email/template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { submission } = await request.json();

    const service = submission["service-info"].service?.replaceAll("-", " ");

    resend.emails.send({
      from: "Form Submission <orders@luminatedenver.dev>",
      to: "tmw7991@gmail.com",
      subject: `New ${service} order`,
      react: <EmailTemplate submission={submission} />,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
