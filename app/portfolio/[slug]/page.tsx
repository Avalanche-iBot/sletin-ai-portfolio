import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy, getAdjacentCaseStudies } from "@/content/projects";
import { Section, Prose, BulletList, TagList, FactGrid, ComplexityMeter, PointList } from "@/components/Primitives";
import { DiagramView } from "@/components/diagrams/DiagramView";
import { DiscoverySection } from "@/components/DiscoverySection";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { KpiTable, RiskTable, TechSelectionTable, StakeholderTable } from "@/components/DataTables";
import { CaseNoteDisclaimer } from "@/components/Disclaimer";
import { cx, STATUS_TONE } from "@/lib/format";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getCaseStudy(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.shortSummary };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getCaseStudy(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentCaseStudies(project.slug);

  return (
    <>
      {/* Header ----------------------------------------------------------- */}
      <header className="grid-field border-b border-line">
        <div className="shell py-14 md:py-20">
          <Link href="/portfolio" className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted hover:text-ink">
            ← All case notes
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className={cx("border px-2 py-0.5 font-mono text-micro uppercase tracking-[0.08em]", STATUS_TONE[project.status])}>
              {project.status}
            </span>
            <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
              {project.industry} · {project.domain}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-display-md text-ink">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">{project.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ComplexityMeter level={project.architectureComplexity} label={project.complexityLabel} />
            {project.duration && (
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">{project.duration}</span>
            )}
          </div>

          <TagList tags={project.tags} className="mt-6" />

          <div className="mt-10 max-w-reading">
            <CaseNoteDisclaimer compact />
          </div>

          {project.techGroups && (
            <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.techGroups.map((g) => (
                <div key={g.group}>
                  <p className="eyebrow mb-2">{g.group}</p>
                  <p className="text-[0.875rem] leading-relaxed text-ink-soft">{g.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 1. Executive Summary ------------------------------------------------ */}
      {project.executiveSummary && (
        <Section first eyebrow="01 · Executive Summary" title="The situation, in brief">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <Prose text={project.executiveSummary.statement} />
            {project.executiveSummary.highlights && (
              <div className="frame p-6">
                <p className="eyebrow mb-4">At a glance</p>
                <FactGrid facts={project.executiveSummary.highlights} />
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 2. Business Context -------------------------------------------------- */}
      {project.businessContext && (
        <Section eyebrow="02 · Business Context" title="Why this landed on the roadmap">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-8">
              <Prose text={project.businessContext.narrative} />
              {project.businessContext.drivers && (
                <div>
                  <p className="eyebrow mb-3">Business drivers</p>
                  <BulletList items={project.businessContext.drivers} />
                </div>
              )}
              {project.businessContext.constraints && (
                <div>
                  <p className="eyebrow mb-3">Constraints</p>
                  <BulletList items={project.businessContext.constraints} />
                </div>
              )}
            </div>
            <div className="space-y-6">
              {project.businessContext.companyFacts && (
                <div className="frame p-6">
                  <p className="eyebrow mb-4">Company facts</p>
                  <FactGrid facts={project.businessContext.companyFacts} />
                </div>
              )}
              {project.businessContext.existingStack && (
                <div>
                  <p className="eyebrow mb-3">Existing stack</p>
                  <TagList tags={project.businessContext.existingStack} />
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* 3. Stakeholders -------------------------------------------------------- */}
      {project.stakeholders && (
        <Section eyebrow="03 · Stakeholders" title="Who has a stake in getting this right">
          <StakeholderTable rows={project.stakeholders} />
        </Section>
      )}

      {/* 4 + 5. Discovery & Business Analysis ------------------------------------ */}
      {project.discovery && (
        <Section eyebrow="04 · Discovery Phase" title="The questions that shaped the architecture">
          <DiscoverySection discovery={project.discovery} />
        </Section>
      )}

      {project.analysis && (
        <Section eyebrow="05 · Business Analysis" title="Is AI even the right tool here?">
          <div className="grid gap-8 lg:grid-cols-2">
            {project.analysis.aiNeeded && (
              <div className="frame p-6">
                <p className="eyebrow mb-2">Is AI needed?</p>
                <p className="mb-2 font-display text-lg text-accent-deep">{project.analysis.aiNeeded.verdict}</p>
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{project.analysis.aiNeeded.body}</p>
              </div>
            )}
            {project.analysis.automationAlternative && (
              <div className="frame p-6">
                <p className="eyebrow mb-2">Could conventional automation solve it?</p>
                <p className="mb-3 font-display text-lg text-accent-deep">
                  {project.analysis.automationAlternative.verdict}
                </p>
                {project.analysis.automationAlternative.body && (
                  <p className="mb-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {project.analysis.automationAlternative.body}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.analysis.automationAlternative.canAutomate && (
                    <div>
                      <p className="mb-2 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                        Rules can handle
                      </p>
                      <BulletList items={project.analysis.automationAlternative.canAutomate} />
                    </div>
                  )}
                  {project.analysis.automationAlternative.cannotAutomate && (
                    <div>
                      <p className="mb-2 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                        Genuinely needs a model
                      </p>
                      <BulletList items={project.analysis.automationAlternative.cannotAutomate} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {project.analysis.valueAreas && (
              <div>
                <p className="eyebrow mb-3">Where AI adds real value</p>
                <BulletList items={project.analysis.valueAreas} />
              </div>
            )}
            {project.analysis.outOfScope && (
              <div>
                <p className="eyebrow mb-3">Explicitly out of scope</p>
                <BulletList items={project.analysis.outOfScope} />
              </div>
            )}
          </div>

          {project.analysis.conclusion && (
            <p className="mt-8 max-w-reading border-l-2 border-accent pl-4 text-[0.9375rem] font-medium leading-relaxed text-ink">
              {project.analysis.conclusion}
            </p>
          )}
        </Section>
      )}

      {/* 6. Solution Design ------------------------------------------------------- */}
      {project.solutionDesign && (
        <Section eyebrow="06 · Solution Design" title="Design principles and the request path">
          {project.solutionDesign.principles && (
            <div className="mb-10">
              <PointList points={project.solutionDesign.principles} />
            </div>
          )}
          {project.solutionDesign.flow && (
            <div>
              <p className="eyebrow mb-4">End-to-end flow</p>
              <ol className="max-w-reading space-y-3">
                {project.solutionDesign.flow.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-spec text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Section>
      )}

      {/* 7 + 8. Enterprise Architecture & Technology Selection ---------------------- */}
      {project.architecture && (
        <Section eyebrow="07 · Enterprise Architecture" title="System design">
          {project.architecture.overview && (
            <div className="mb-10">
              <Prose text={project.architecture.overview} />
            </div>
          )}
          {project.architecture.diagrams && (
            <div className="space-y-12">
              {project.architecture.diagrams.map((d) => (
                <DiagramView key={d.id} diagram={d} />
              ))}
            </div>
          )}
          {project.architecture.layers && (
            <div className="mt-12">
              <p className="eyebrow mb-4">Why each layer exists</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.architecture.layers.map((l) => (
                  <div key={l.name} className="border-t-2 border-line pt-4">
                    <p className="font-display text-base text-ink">{l.name}</p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{l.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {project.technologySelection && (
        <Section eyebrow="08 · Technology Selection" title="What was chosen, and what was rejected">
          <TechSelectionTable rows={project.technologySelection} />
        </Section>
      )}

      {/* 9. Security ----------------------------------------------------------------- */}
      {project.security && (
        <Section eyebrow="09 · Security" title="Security posture">
          {project.security.posture && (
            <div className="mb-8">
              <Prose text={project.security.posture} />
            </div>
          )}
          {project.security.controls && <PointList points={project.security.controls} />}
        </Section>
      )}

      {/* 10. Scalability --------------------------------------------------------------- */}
      {project.scalability && (
        <Section eyebrow="10 · Scalability" title="How the system holds up under load">
          {project.scalability.body && (
            <div className="mb-8">
              <Prose text={project.scalability.body} />
            </div>
          )}
          {project.scalability.levers && <PointList points={project.scalability.levers} />}
        </Section>
      )}

      {/* 11. Cost Optimization ---------------------------------------------------------- */}
      {project.costOptimization && (
        <Section eyebrow="11 · Cost Optimization" title="Keeping unit economics under control">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              {project.costOptimization.body && (
                <div className="mb-8">
                  <Prose text={project.costOptimization.body} />
                </div>
              )}
              {project.costOptimization.levers && <PointList points={project.costOptimization.levers} numbered />}
            </div>
            {project.costOptimization.model && (
              <div className="frame h-fit p-6">
                <p className="eyebrow mb-4">Cost model</p>
                <FactGrid facts={project.costOptimization.model} />
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 12. Risks ------------------------------------------------------------------------- */}
      {project.risks && (
        <Section eyebrow="12 · Risks" title="What could go wrong, and the mitigation for each">
          <RiskTable risks={project.risks} />
        </Section>
      )}

      {/* 13. KPIs -------------------------------------------------------------------------- */}
      {project.kpis && (
        <Section eyebrow="13 · KPIs" title="How success is measured">
          <KpiTable kpis={project.kpis} />
        </Section>
      )}

      {/* 14. Implementation Roadmap ---------------------------------------------------------- */}
      {project.roadmap && (
        <Section eyebrow="14 · Implementation Roadmap" title="Phased delivery">
          <RoadmapTimeline phases={project.roadmap} />
        </Section>
      )}

      {/* 15 + 16. Implementation Notes / Repo -------------------------------------------------- */}
      {project.implementationNotes && (
        <Section eyebrow="15 · Implementation Notes" title="Notes from building it">
          {project.implementationNotes.body && (
            <div className="mb-8">
              <Prose text={project.implementationNotes.body} />
            </div>
          )}
          <div className="grid gap-10 lg:grid-cols-2">
            {project.implementationNotes.decisions && (
              <div>
                <p className="eyebrow mb-4">Architecture decision records</p>
                <div className="space-y-4">
                  {project.implementationNotes.decisions.map((d) => (
                    <div key={d.id} className="border-l-2 border-line pl-4">
                      <p className="font-mono text-micro text-ink-muted">{d.id}</p>
                      <p className="mt-1 font-medium text-ink">{d.t}</p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">{d.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {project.implementationNotes.repoStructure && (
              <div>
                <p className="eyebrow mb-4">Repository structure</p>
                <pre className="frame overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
                  {project.implementationNotes.repoStructure.join("\n")}
                </pre>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 17. Discussion — the closing move of every note is an invitation to disagree */}
      <Section eyebrow="17 · Discussion" title="Where would you have decided differently?">
        <Prose text="This is one reading of the problem, not the only defensible one. Several decisions above rest on assumptions that discovery would need to confirm, and at least one of them is probably wrong. If your experience points somewhere else, I would rather hear it than not." />
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <Link href="/contact" className="btn btn-ghost">
            Send a correction
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              Code accompanying this note
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              Working prototype
            </a>
          )}
        </div>
      </Section>

      {/* 18. Lessons Learned ------------------------------------------------------------------- */}
      {project.lessonsLearned && (
        <Section eyebrow="18 · Reflection" title="Lessons learned">
          <BulletList items={project.lessonsLearned} />
        </Section>
      )}

      {/* 19. Future Improvements ----------------------------------------------------------------- */}
      {project.futureImprovements && (
        <Section eyebrow="19 · Future Improvements" title="What comes next">
          <BulletList items={project.futureImprovements} />
        </Section>
      )}

      {/* Prev / next -------------------------------------------------------------------------------- */}
      <nav className="shell flex flex-col gap-4 border-t border-line py-10 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link href={`/portfolio/${prev.slug}`} className="group max-w-xs">
            <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">← Previous</span>
            <p className="mt-1 font-display text-ink group-hover:text-accent-deep">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/portfolio/${next.slug}`} className="group max-w-xs text-right">
            <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">Next →</span>
            <p className="mt-1 font-display text-ink group-hover:text-accent-deep">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
