import { NextResponse } from "next/server";

/**
 * Receives contact-form submissions.
 *
 * A Route Handler rather than a page: exporting a function named after an HTTP
 * verb makes `POST /api/contact` exist, and nothing else has to register it.
 * The code runs on the server only, so it never reaches the browser bundle —
 * which is what makes it safe for it to read secrets from the environment.
 *
 * Validation happens here rather than trusting the form. The `required`
 * attributes in `components/ContactForm.tsx` are a convenience for the person
 * filling it in; anything can post to this URL directly, so the checks that
 * actually matter are the ones below.
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; company?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    // Malformed JSON throws rather than returning null, and an unhandled throw
    // here would surface as a 500 — blaming the server for a bad request.
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Every field is optional in the type above because the request is untrusted:
  // whatever arrives has been through JSON.parse, not through the form.
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
