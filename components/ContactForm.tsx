"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending this. Please email me directly instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="frame p-8">
        <p className="font-display text-lg text-ink">Message sent.</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          Thanks for reaching out — I read every message and will reply from{" "}
          <span className="text-ink">alexander.slyotin@gmail.com</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-reading space-y-5">
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

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && <p className="text-[0.875rem] text-accent-deep">{error}</p>}
    </form>
  );
}
