import type { Metadata } from "next";
import { caseStudies, plannedCaseStudies, totalPlannedCaseStudies } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Primitives";

export const metadata: Metadata = { title: "AI Architecture Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <Section
        first
        eyebrow="AI Architecture Portfolio"
        title="Enterprise AI case studies, built the way a solutions architect would present them"
        lede={`Each case study runs the full lifecycle — business context, discovery, architecture, security, cost, risk, KPIs and roadmap. ${caseStudies.length} of ${totalPlannedCaseStudies} planned case studies are published; the rest are listed below as they're built.`}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      {plannedCaseStudies.length > 0 && (
        <Section eyebrow="In the pipeline" title="Coming next">
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
