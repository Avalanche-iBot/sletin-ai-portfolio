import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/about";
import { Section, FactRows } from "@/components/Primitives";
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
 * Two sections. The opening carries the prose on the left and the credentials
 * on the right, in the same bordered fact panel the case notes use — which is
 * the point: a reader checking whether this person is worth reading finds the
 * answer beside the first paragraph rather than four sections down.
 *
 * Everything that read as a pitch is gone. There was a Practicalities section
 * listing strengths and working habits, and it sold rather than showed; on a
 * site whose whole position is that the reasoning is the artefact, a list of
 * adjectives about the author is the wrong argument. The case notes make that
 * case or nothing does.
 *
 * Every word shown comes from `content/about.ts`; this file decides only the
 * order and the shape.
 */
export default function AboutPage() {
  return (
    <>
      {/* Opening, with credentials alongside ---------------------------------- */}
      <Section first eyebrow={about.eyebrow} title={about.title} lede={about.lede}>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
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

          {/*
           * One panel rather than two stacked ones: background and
           * certifications answer the same question — has this person done
           * anything — and splitting them made the page look longer than it is.
           */}
          <div className="frame h-fit p-6">
            <p className="eyebrow mb-4 border-b border-line pb-3">Background</p>
            <FactRows facts={about.background} />

            {about.backgroundNote && (
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-muted">{about.backgroundNote}</p>
            )}

            <p className="eyebrow mb-4 mt-8 border-b border-line pb-3">Certifications</p>
            <ul className="space-y-3">
              {about.certifications.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  {c.badge && (
                    <Image src={c.badge} alt="" width={32} height={32} className="mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-[0.9375rem] leading-snug text-ink">
                      {c.verifyUrl ? (
                        <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="hover:text-accent-deep">
                          {c.label}
                        </a>
                      ) : (
                        c.label
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                      {c.org}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Quieter than the list above, and labelled, because nothing here
                is held yet and the page must not let that blur. */}
            {about.certificationsInProgress && about.certificationsInProgress.length > 0 && (
              <>
                <p className="eyebrow mb-1 mt-8 border-b border-line pb-3">In progress · Azure</p>
                <p className="mb-4 text-[0.8125rem] leading-relaxed text-ink-muted">
                  In the order they are being taken. None held yet — each moves into the list above,
                  with a verification link, as it is earned.
                </p>
                <ol className="space-y-3">
                  {about.certificationsInProgress.map((c, i) => (
                    <li key={c.label} className="flex items-start gap-3">
                      <span className="mt-0.5 font-mono text-micro text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[0.9375rem] leading-snug text-ink-soft">{c.label}</p>
                        <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                          {c.org}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Principles — the order of operations, then the defaults -------------- */}
      <Section
        eyebrow="Principles"
        title="How I work, and what I hold to until a problem argues me out of it"
        lede="The first five are an order of operations. The rest are defaults, and each has been wrong at least once."
      >
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {about.principles.map((p) => (
            <div key={p.n} className="border-t-2 border-accent pt-4">
              <p className="font-mono text-micro text-ink-muted">{p.n}</p>
              <p className="mt-1 font-display text-lg leading-snug text-ink">{p.t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
