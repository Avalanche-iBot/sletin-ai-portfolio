"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { cx } from "@/lib/format";

/**
 * Brand mark — underlined serif monogram.
 * No container shape: the letterforms carry the identity, a single amber rule
 * sits underneath as the only graphic element. Scales cleanly to 16px.
 */
function BrandMark() {
  return (
    <span className="inline-flex items-baseline gap-2.5">
      <span className="relative font-display text-[1.35rem] leading-none tracking-[-0.01em] text-ink">
        AS
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-accent"
        />
      </span>
      <span className="hidden font-mono text-spec uppercase tracking-[0.14em] text-ink-muted sm:inline">
        {site.brandShort}
      </span>
    </span>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = stored ? stored === "dark" : prefersDark;
    setDark(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
    >
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="3.4" stroke="currentColor" />
          <path
            d="M7 0.6V2M7 12V13.4M13.4 7H12M2 7H0.6M11.4 2.6L10.4 3.6M3.6 10.4L2.6 11.4M11.4 11.4L10.4 10.4M3.6 3.6L2.6 2.6"
            stroke="currentColor"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M12.5 8.7A5.3 5.3 0 016 2a5.3 5.3 0 106.5 6.7z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandMark />
        </Link>

        {/*
         * Inline nav starts at lg, not md. Six items plus the wordmark leave no
         * gap at all at 768px — the nav butts straight against the monogram.
         * The burger covers the tablet range instead.
         */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "font-mono text-spec uppercase tracking-[0.1em] transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex h-8 w-8 items-center justify-center border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              {open ? (
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
              ) : (
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.3" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-canvas lg:hidden" aria-label="Primary mobile">
          <div className="shell flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-3 font-mono text-spec uppercase tracking-[0.1em] text-ink-soft last:border-none"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
