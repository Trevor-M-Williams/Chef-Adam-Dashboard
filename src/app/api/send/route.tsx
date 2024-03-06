import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/email/template";

const resend = new Resend(process.env.RESEND_API_KEY);

const options = {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

export async function OPTIONS() {
  return NextResponse.json({}, options);
}

export async function POST(request: Request) {
  try {
    const { submission } = await request.json();
    const service = submission["service-info"].service?.replaceAll("-", " ");

    const { data, error } = await resend.emails.send({
      from: "Form Submission <orders@luminatedenver.dev>",
      to: "tmw7991@gmail.com",
      subject: `New ${service} order`,
      react: <EmailTemplate submission={submission} />,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { ...options, status: 400 });
    }

    console.log(data);
    return NextResponse.json({ success: true }, options);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { ...options, status: 500 });
  }
}
