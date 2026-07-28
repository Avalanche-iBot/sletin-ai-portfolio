import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; company?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  // No email provider is wired up yet. Logging server-side keeps the form
  // functional today; swap this block for a real provider (Resend, SES,
  // SendGrid...) when one is configured, using CONTACT_FORWARD_EMAIL from
  // the environment as the destination.
  console.log("[contact form submission]", {
    name,
    email,
    company: company ?? "(none)",
    message,
    forwardTo: process.env.CONTACT_FORWARD_EMAIL ?? "(not configured)",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
