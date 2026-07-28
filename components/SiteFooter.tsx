import Link from "next/link";
import { nav, site } from "@/content/site";

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
        <span>© {new Date().getFullYear()} {site.name}. Built with Next.js.</span>
        <span>{site.availability}</span>
      </div>
    </footer>
  );
}
