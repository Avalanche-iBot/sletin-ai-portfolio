import Link from "next/link";
import { nav, site } from "@/content/site";

/**
 * The site footer: identity, a repeat of the navigation, external links.
 *
 * Rendered once by `app/layout.tsx`, so it appears on every page. Unlike the
 * header this is a Server Component — it has no state and handles no clicks —
 * so it costs the browser no JavaScript at all.
 *
 * It reads the same `nav` array the header does, which is the reason a page
 * added to `content/site.ts` shows up in both places at once. Everything else
 * on display — name, tagline, contact details — comes from the `site` object
 * in that file, so none of it is duplicated in markup here.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">{site.tagline}</p>
          <p className="mt-4 font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
            {site.location}
          </p>
        </div>

        <div>
          <p className="eyebrow">Site</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.9375rem] text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.github} className="text-[0.9375rem] text-ink-soft hover:text-ink">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} className="text-[0.9375rem] text-ink-soft hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-[0.9375rem] text-ink-soft hover:text-ink">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <div className="shell flex flex-col gap-2 py-6 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted md:flex-row md:items-center md:justify-between">
        {/* The year is computed at build time, not in the browser: this is a
            statically generated page, so the value is baked into the HTML when
            the site is deployed. A build early in January is the one case that
            needs a rebuild to catch up. */}
        {/*
         * The source link is not vanity. Everything else on this site is
         * reasoning *about* systems; the repository is the one running system,
         * and the diagram checker in it is the only direct evidence that the
         * author builds as well as writes. Burying that in a blog post was
         * leaving the strongest available proof unlinked.
         */}
        <span>
          © {new Date().getFullYear()} {site.name}. Built with Next.js —{" "}
          <a href={site.github} className="underline underline-offset-4 hover:text-ink">
            source
          </a>
          .
        </span>
        <span>{site.availability}</span>
      </div>
    </footer>
  );
}
