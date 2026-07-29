import Link from "next/link";

/**
 * The 404 page.
 *
 * Next.js renders this automatically for any unmatched URL, and also whenever
 * a page calls `notFound()` — which is how a case study or blog post with an
 * unrecognised slug ends up here. The filename is the wiring; nothing imports
 * it.
 */
export default function NotFound() {
  return (
    <div className="shell flex flex-col items-start py-24">
      <p className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">404</p>
      <h1 className="mt-3 font-display text-display-sm text-ink">This page hasn’t been drafted.</h1>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
        The page you’re looking for doesn’t exist, or the link is out of date.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
