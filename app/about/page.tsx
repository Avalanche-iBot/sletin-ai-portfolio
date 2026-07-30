import type { Metadata } from "next";
import { about } from "@/content/about";
import { Section, BulletList } from "@/components/Primitives";
import { NoticeLine } from "@/components/Disclaimer";

/**
 * Page-level metadata, merged over the defaults in `app/layout.tsx`.
 *
 * Only the title is set. The layout's `template` expands it to
 * "About — Aleksandr Sletin", so the site name is not repeated here, and the
 * shared description carries over untouched.
 */
export const metadata: Metadata = { title: "About" };

/**
 * The About page, served at `/about`.
 *
 * Every word shown comes from `content/about.ts`; this file only decides the
 * order of the sections and how each list is rendered. Rewriting the page is
 * therefore a content edit, not a code change.
 */
export default function AboutPage() {
  return (
    <>
      {/* Why this work — no biography, no employment history ---------------- */}
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

      {/* How I approach a problem -------------------------------------------- */}
      <Section
        eyebrow="Approach"
        title="How I work through a business problem"
        lede="Roughly in this order, and the first two steps are where most of the outcome is decided."
      >
        <ol className="space-y-0">
          {about.approach.map((a) => (
            <li key={a.n} className="grid gap-3 border-t border-line py-7 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-micro text-accent-deep">{a.n}</span>
              <div className="max-w-reading">
                <p className="font-display text-lg text-ink">{a.t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{a.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Certifications, as mindsets rather than badges ------------------------ */}
      <Section
        eyebrow="Certifications"
        title="What each one actually changed"
        lede="A certificate is only interesting for the habit it leaves behind. These are the habits."
      >
        <div className="space-y-0">
          {about.certifications.map((c) => (
            <article key={c.label} className="grid gap-5 border-t border-line py-8 lg:grid-cols-[16rem_1fr]">
              <div>
                <p className="font-display text-xl text-ink">{c.label}</p>
                <p className="mt-1 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{c.org}</p>
                <p className="mt-4 border-l-2 border-accent pl-3 text-[0.875rem] font-medium leading-snug text-ink">
                  {c.shaped}
                </p>
              </div>
              <p className="max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">{c.mindset}</p>
            </article>
          ))}
        </div>

        {/* Kept visually quieter than the list above, because an unfinished
            qualification has not changed how anyone works yet and should not
            be presented as though it had. */}
        {about.certificationsInProgress && about.certificationsInProgress.length > 0 && (
          <div className="mt-10 border-t-2 border-accent pt-6">
            <p className="eyebrow mb-4">Currently working towards</p>
            <div className="space-y-6">
              {about.certificationsInProgress.map((c) => (
                <div key={c.label} className="grid gap-5 lg:grid-cols-[16rem_1fr]">
                  <div>
                    <p className="font-display text-base text-ink">{c.label}</p>
                    <p className="mt-1 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{c.org}</p>
                  </div>
                  <p className="max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">{c.why}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Principles ------------------------------------------------------------ */}
      <Section
        eyebrow="Principles"
        title="What I hold to until a problem argues me out of it"
        lede="These are defaults, not rules. Each one has been wrong at least once."
      >
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {about.philosophy.map((p) => (
            <div key={p.n} className="border-t-2 border-accent pt-4">
              <p className="font-mono text-micro text-ink-muted">{p.n}</p>
              <p className="mt-1 font-display text-lg text-ink">{p.t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Strengths + working style + generic background ------------------------- */}
      <Section eyebrow="Practicalities" title="Where I am useful, and how I work">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Strengths</p>
            <dl className="space-y-5">
              {about.strengths.map((s) => (
                <div key={s.t}>
                  <dt className="font-display text-ink">{s.t}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{s.d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-5">Working style</p>
              <BulletList items={about.workingStyle} />
            </div>

            <div>
              <p className="eyebrow mb-5">Background</p>
              <ul className="space-y-2">
                {about.background.map((b) => (
                  <li key={b} className="border-t border-line pt-2 text-[0.9375rem] text-ink-soft">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-reading text-[0.875rem] leading-relaxed text-ink-muted">
                Kept deliberately generic. Where I have worked is less useful to you than how I think,
                and naming organisations would put this site somewhere it does not belong.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
