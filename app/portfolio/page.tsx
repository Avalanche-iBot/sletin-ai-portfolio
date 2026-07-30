import type { Metadata } from "next";
import Link from "next/link";
import {
  caseStudies,
  getCaseStudy,
  plannedCaseStudies,
  startHereSlug,
  totalPlannedCaseStudies,
} from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Primitives";
import { CaseNoteDisclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = { title: "Case Studies" };

/**
 * The case-study index, served at `/portfolio`.
 *
 * Shows the written studies as cards, then the planned ones as titles only.
 * Both lists come from `content/projects/index.ts`, so the count in the
 * introduction cannot fall out of step with what is actually on the page.
 */
export default function PortfolioPage() {
  const startHere = getCaseStudy(startHereSlug);

  return (
    <>
      <Section
        first
        eyebrow="Case studies"
        title="Operational problems, taken apart in the open"
        lede={`Each note runs the same path — business context, discovery, analysis, architecture, security, cost, risk, KPIs, roadmap — and ends with what I would question if I came back to it. ${caseStudies.length} of ${totalPlannedCaseStudies} planned notes are written; the rest are listed below.`}
      >
        {/*
         * Six notes of forty minutes each is a lot to arrive at with no
         * guidance, and the reading order is not the same as the order of
         * strength. Naming one entry point costs nothing and stops a first-time
         * reader defaulting to whichever card is top-left.
         */}
        {startHere && (
          <Link
            href={`/portfolio/${startHere.slug}`}
            className="group mb-10 block border-l-2 border-accent bg-raised/50 p-6 transition-colors hover:bg-raised"
          >
            <p className="eyebrow mb-3">If you read one, read this one</p>
            <p className="font-display text-xl text-ink group-hover:text-accent-deep">{startHere.title}</p>
            <p className="mt-3 max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">
              It takes a number every payments team reports as a risk metric and shows it is
              something else — a licence that decides how much friction sits in front of every
              checkout. The system then splits along that finding, with the language model kept
              permanently on the side that cannot make a decision. It is the note here most likely
              to change how you look at a problem you already have.
            </p>
          </Link>
        )}

        <CaseNoteDisclaimer />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      {plannedCaseStudies.length > 0 && (
        <Section eyebrow="In the pipeline" title="Not yet written">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plannedCaseStudies.map((p) => (
              <li
                key={p.order}
                className="flex items-center justify-between border border-dashed border-line px-5 py-4 text-ink-muted"
              >
                <span className="font-mono text-micro text-ink-muted">{String(p.order).padStart(2, "0")}</span>
                <span className="text-[0.9375rem]">{p.title}</span>
                <span className="font-mono text-micro uppercase tracking-[0.08em]">Planned</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
