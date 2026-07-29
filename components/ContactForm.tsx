"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * The four states the form can be in.
 *
 * A single union type instead of separate `isLoading` / `isDone` / `hasFailed`
 * booleans, because those permit combinations that make no sense — submitting
 * and succeeded at the same time — and then need guarding against. One value
 * can only ever be one of these four, so the impossible states cannot be
 * represented at all.
 */
type Status = "idle" | "submitting" | "success" | "error";

/**
 * The contact form on `/contact`.
 *
 * A Client Component: it holds state and handles a submit event, neither of
 * which a Server Component can do.
 *
 * Submission goes to `/api/contact` as JSON rather than as a native form POST,
 * so the page never reloads and the reader keeps their place. The server route
 * is what actually validates and forwards the message — the required
 * attributes below only save a round trip on obvious mistakes, and are trivial
 * to bypass, so they are a convenience and never the real check.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Stop the browser's own submit, which would navigate away from the page.
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    // Captured before the first `await`: React clears `currentTarget` once the
    // event handler yields, so reading `e.currentTarget` after the fetch would
    // give null and the reset below would throw.
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // fetch only rejects on a network failure — a 4xx or 5xx response is
      // still a fulfilled promise, so the status has to be checked by hand.
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending this. Please email me directly instead.");
    }
  }

  // On success the form is replaced rather than kept with a message beside it,
  // so there is no second copy of a message already sent to submit again.
  if (status === "success") {
    return (
      <div className="frame p-8">
        <p className="font-display text-lg text-ink">Message sent.</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          Thanks for reaching out — I read every message and will reply from{" "}
          <span className="text-ink">{site.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-reading space-y-5">
      {/* Each field is wrapped in its own <label>, which ties the caption to
          the input without needing matching id/htmlFor pairs. Clicking the
          caption focuses the field, and a screen reader announces the two
          together. The `name` attributes become the JSON keys the API reads. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">Name</span>
          <input
            name="name"
            required
            className="w-full border border-line bg-surface px-3 py-2.5 text-[0.9375rem] text-ink outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-line bg-surface px-3 py-2.5 text-[0.9375rem] text-ink outline-none focus:border-accent"
          />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow mb-2 block">Company (optional)</span>
        <input
          name="company"
          className="w-full border border-line bg-surface px-3 py-2.5 text-[0.9375rem] text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-2 block">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y border border-line bg-surface px-3 py-2.5 text-[0.9375rem] text-ink outline-none focus:border-accent"
        />
      </label>

      {/* Disabled while in flight, so an impatient second click cannot send the
          same message twice. `outline-none` on the fields above is paired with
          a visible `focus:border-accent`, so keyboard focus stays obvious. */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && <p className="text-[0.875rem] text-accent-deep">{error}</p>}
    </form>
  );
}
