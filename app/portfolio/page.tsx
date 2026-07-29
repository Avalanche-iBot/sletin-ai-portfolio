import type { Metadata } from "next";
import { caseStudies, plannedCaseStudies, totalPlannedCaseStudies } from "@/content/projects";
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
  return (
    <>
      <Section
        first
        eyebrow="Case studies"
        title="Operational problems, taken apart in the open"
        lede={`Each note runs the same path — business context, discovery, analysis, architecture, security, cost, risk, KPIs, roadmap — and ends with what I would question if I came back to it. ${caseStudies.length} of ${totalPlannedCaseStudies} planned notes are written; the rest are listed below.`}
      >
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
