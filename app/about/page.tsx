import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/about";
import { Section } from "@/components/Primitives";
import { NoticeLine } from "@/components/Disclaimer";
import type { Credential } from "@/content/types";
import { cx } from "@/lib/format";

/**
 * Page-level metadata, merged over the defaults in `app/layout.tsx`.
 *
 * Only the title is set. The layout's `template` expands it to
 * "About — Aleksandr Sletin", so the site name is not repeated here, and the
 * shared description carries over untouched.
 */
export const metadata: Metadata = { title: "About" };

/**
 * One line of the certifications block, held or in progress.
 *
 * `dim` is the only difference between the two lists — an in-progress entry is
 * the same shape and the same layout, just quieter, so the page reads as one
 * form used honestly rather than two different treatments for what is real and
 * what is not.
 */
function CredentialRow({ credential, dim }: { credential: Credential; dim?: boolean }) {
  // "In preparation" is a status, not a date, so it does not take the "Issued"
  // prefix the way an actual issue date does — "Issued In preparation" reads
  // like a typo rather than what it is.
  const meta = credential.expires
    ? `Issued ${credential.issued} · Expires ${credential.expires}`
    : credential.issued === "In preparation"
      ? credential.issued
      : `Issued ${credential.issued}`;

  return (
    <li className="flex items-start gap-3">
      {credential.badge && (
        <Image src={credential.badge} alt="" width={32} height={32} className="mt-0.5 shrink-0" />
      )}
      <div>
        <p className={cx("text-[0.9375rem] leading-snug", dim ? "text-ink-soft" : "text-ink")}>
          {credential.verifyUrl ? (
            <a href={credential.verifyUrl} target="_blank" rel="noreferrer" className="hover:text-accent-deep">
              {credential.label}
            </a>
          ) : (
            credential.label
          )}
        </p>
        <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{credential.org}</p>
        <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.06em] text-ink-muted">
          {meta} · Credential ID {credential.credentialId}
        </p>
      </div>
    </li>
  );
}

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
            {/* One continuous piece, one font — where I have been, why it
                points at architecture, and what actually holds my attention
                in the work. It used to be two blocks in different registers,
                divided by a rule; there was only one train of thought. */}
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
           * Qualifications only — the things that are either true or not, and
           * that a stranger can check. The working history used to sit here too
           * and has moved into the prose, because a list of jobs beside a page
           * that says it is not a CV is a CV.
           */}
          <div className="frame h-fit p-6">
            <p className="eyebrow mb-4 border-b border-line pb-3">Education</p>
            <ul className="space-y-2">
              {about.education.map((e) => (
                <li key={e} className="text-[0.9375rem] leading-snug text-ink">
                  {e}
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-4 mt-8 border-b border-line pb-3">Certifications</p>
            <ul className="space-y-4">
              {about.certifications.map((c) => (
                <CredentialRow key={c.label} credential={c} />
              ))}
            </ul>

            {/* Quieter than the list above, and labelled, because none of this
                is held yet and the page must not let that blur. AZ-104 first:
                it is the prerequisite for AZ-305, not a second, separate goal. */}
            {about.certificationsInProgress && about.certificationsInProgress.length > 0 && (
              <>
                <p className="eyebrow mb-4 mt-8 border-b border-line pb-3">In progress · Azure</p>
                <ul className="space-y-4">
                  {about.certificationsInProgress.map((c) => (
                    <CredentialRow key={c.label} credential={c} dim />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Principles — the order of operations, then the defaults -------------- */}
      <Section eyebrow="Principles" title="My Principles">
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
