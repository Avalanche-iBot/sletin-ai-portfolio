import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";
import { Section } from "@/components/Primitives";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  return (
    <Section
      first
      eyebrow="Blog"
      title="Notes on enterprise AI architecture"
      lede="Short, practical write-ups on architecture decisions, discovery technique, and lessons from the case notes. Posts are drafted as they're written — the list below is the honest publishing queue."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group frame flex flex-col p-6 transition-colors hover:border-ink"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-accent-deep">{p.category}</span>
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                {p.body ? p.readingTime : "Planned"}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl text-ink group-hover:text-accent-deep">{p.title}</h3>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">{p.date}</span>
              <span className="flex flex-wrap gap-2">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
