import type { Metadata } from "next";
import { about } from "@/content/about";
import { Section, Prose, BulletList } from "@/components/Primitives";
import { NoticeLine } from "@/components/Disclaimer";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Section first eyebrow={about.eyebrow} title={about.title} lede={about.lede}>
        <div className="max-w-reading space-y-5">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="prose-arch">
              {p}
            </p>
          ))}

          <NoticeLine>
            This website is intended as knowledge sharing rather than consulting advice, and does not
            represent the position of any employer, past or present.
          </NoticeLine>
        </div>
      </Section>

      <Section eyebrow="Career timeline" title="How I got here">
        <ol className="space-y-0">
          {about.timeline.map((t, i) => (
            <li key={i} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[9rem_1fr]">
              <div>
                <p className="font-mono text-spec font-medium text-ink-muted">{t.period}</p>
              </div>
              <div>
                <p className="font-display text-lg text-ink">
                  {t.role} <span className="text-ink-muted">· {t.org}</span>
                </p>
                <p className="mt-2 max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">{t.body}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Credentials" title="Certifications & education">
        <div className="grid gap-6 sm:grid-cols-2">
          {about.credentials.map((c) => (
            <div key={c.label} className="frame p-5">
              <p className="font-display text-base text-ink">{c.label}</p>
              <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">{c.org}</p>
              <p className="mt-2 text-[0.875rem] text-ink-soft">{c.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Strengths" title="What I bring to an architecture team">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.strengths.map((s) => (
            <div key={s.t} className="border-t-2 border-line pt-4">
              <p className="font-display text-base text-ink">{s.t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Philosophy" title="How I approach a design problem">
        <ol className="space-y-6">
          {about.philosophy.map((p) => (
            <li key={p.n} className="flex gap-5">
              <span className="font-mono text-2xl font-light text-accent">{p.n}</span>
              <div>
                <p className="font-display text-lg text-ink">{p.t}</p>
                <p className="mt-1.5 max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Working style" title="How I like to work">
        <BulletList items={about.workingStyle} />
      </Section>
    </>
  );
}
