import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy, getAdjacentCaseStudies } from "@/content/projects";
import type { CaseStudy } from "@/content/types";
import { Section, Prose, BulletList, TagList, FactGrid, FactRows, ComplexityMeter, PointList } from "@/components/Primitives";
import { DiagramView } from "@/components/diagrams/DiagramView";
import { DiscoverySection } from "@/components/DiscoverySection";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { KpiTable, RiskTable, TechSelectionTable, StakeholderTable } from "@/components/DataTables";
import { CaseNoteDisclaimer } from "@/components/Disclaimer";
import { CaseNoteToc, type TocEntry } from "@/components/CaseNoteToc";
import { cx, STATUS_TONE } from "@/lib/format";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getCaseStudy(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.shortSummary };
}

/**
 * The canonical section order for every case note.
 *
 * One list drives three things: the numbers in each eyebrow, the anchor ids,
 * and the grouped table of contents. Numbers were previously written by hand
 * into each eyebrow, which left visible gaps (08 followed by 13) whenever a
 * note had no content for a section. Deriving them from the list that already
 * knows which sections are present removes that class of mistake.
 *
 * `has` decides presence; the JSX below still guards its own data access, so a
 * disagreement between the two shows up as a wrong number rather than a crash.
 */
const SECTION_ORDER: { id: string; label: string; group: string; has: (p: CaseStudy) => boolean }[] = [
  { id: "executive-summary", label: "Executive Summary", group: "Problem", has: (p) => !!p.executiveSummary },
  { id: "business-context", label: "Business Context", group: "Problem", has: (p) => !!p.businessContext },
  { id: "stakeholders", label: "Stakeholders", group: "Problem", has: (p) => !!p.stakeholders },
  { id: "discovery", label: "Discovery Phase", group: "Analysis", has: (p) => !!p.discovery },
  { id: "business-analysis", label: "Business Analysis", group: "Analysis", has: (p) => !!p.analysis },
  { id: "solution-design", label: "Solution Design", group: "Design", has: (p) => !!p.solutionDesign },
  { id: "approaches", label: "Approaches Considered", group: "Design", has: (p) => !!p.alternatives },
  { id: "architecture", label: "Enterprise Architecture", group: "Design", has: (p) => !!p.architecture },
  { id: "technology", label: "Technology Selection", group: "Design", has: (p) => !!p.technologySelection },
  { id: "security", label: "Security", group: "Delivery", has: (p) => !!p.security },
  { id: "scalability", label: "Scalability", group: "Delivery", has: (p) => !!p.scalability },
  { id: "cost", label: "Cost Optimization", group: "Delivery", has: (p) => !!p.costOptimization },
  { id: "risks", label: "Risks", group: "Delivery", has: (p) => !!p.risks },
  { id: "kpis", label: "KPIs", group: "Delivery", has: (p) => !!p.kpis },
  { id: "roadmap", label: "Implementation Roadmap", group: "Delivery", has: (p) => !!p.roadmap },
  { id: "reflection", label: "Reflection", group: "Transfer & Limits", has: (p) => !!p.lessonsLearned },
  { id: "future", label: "Future Improvements", group: "Transfer & Limits", has: (p) => !!p.futureImprovements },
  { id: "tailoring", label: "If Your Situation Differs", group: "Transfer & Limits", has: (p) => !!p.tailoring },
  { id: "open-questions", label: "Open Questions", group: "Transfer & Limits", has: (p) => !p.tailoring && !!p.openQuestions },
];

function buildSections(project: CaseStudy) {
  const present = SECTION_ORDER.filter((s) => s.has(project));
  const entries: TocEntry[] = present.map((s, i) => ({
    id: s.id,
    label: s.label,
    group: s.group,
    number: String(i + 1).padStart(2, "0"),
  }));
  const byId = new Map(entries.map((e) => [e.id, e]));
  return {
    entries,
    /** "07 · Approaches Considered" for the eyebrow. */
    eyebrow: (id: string) => {
      const e = byId.get(id);
      return e ? `${e.number} \u00b7 ${e.label}` : "";
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getCaseStudy(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentCaseStudies(project.slug);

  const { entries: tocEntries, eyebrow: sectionEyebrow } = buildSections(project);

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

      {/* Contents rail and sections share one container, so the rail sits in the
          page gutter rather than floating over the text. */}
      <div className="shell grid gap-x-12 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <div className="lg:pt-14">
          <CaseNoteToc entries={tocEntries} />
        </div>

        <div>
      {/* Executive Summary ------------------------------------------------ */}
      {project.executiveSummary && (
        <Section bare first id="executive-summary" eyebrow={sectionEyebrow("executive-summary")} title="The situation, in brief">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <Prose text={project.executiveSummary.statement} />

            {/* Verdict and facts share the right rail; the accent rule divides them
                from the narrative rather than sitting inside it. */}
            <div className="space-y-8">
              {project.executiveSummary.verdict && (
                <p className="border-l-2 border-accent pl-5 font-display text-xl leading-snug text-ink">
                  {project.executiveSummary.verdict}
                </p>
              )}
            {project.executiveSummary.highlights && (
              <div className="frame p-6">
                <p className="eyebrow mb-4 border-b border-line pb-3">At a glance</p>
                <FactRows facts={project.executiveSummary.highlights} />
              </div>
            )}
            </div>
          </div>
        </Section>
      )}

      {/* Business Context -------------------------------------------------- */}
      {project.businessContext && (
        <Section bare id="business-context" eyebrow={sectionEyebrow("business-context")} title="Why this landed on the roadmap">
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

      {/* Stakeholders -------------------------------------------------------- */}
      {project.stakeholders && (
        <Section bare id="stakeholders" eyebrow={sectionEyebrow("stakeholders")} title="Who has a stake in getting this right">
          <StakeholderTable rows={project.stakeholders} />
        </Section>
      )}

      {/* Discovery & Business Analysis ------------------------------------ */}
      {project.discovery && (
        <Section bare id="discovery" eyebrow={sectionEyebrow("discovery")} title="The questions that shaped the architecture">
          <DiscoverySection discovery={project.discovery} />
        </Section>
      )}

      {project.analysis && (
        <Section bare id="business-analysis" eyebrow={sectionEyebrow("business-analysis")} title="Is AI even the right tool here?" lede="Working through this before any design, on the assumption that the answer might be no.">
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

      {/* Solution Design ------------------------------------------------------- */}
      {project.solutionDesign && (
        <Section bare
          id="solution-design" eyebrow={sectionEyebrow("solution-design")}
          title="Design principles and the request path"
          lede="These are the principles I would argue for given the constraints above — positions rather than conclusions. Each carries a cost, and the next section sets out what holding them gives up."
        >
          {project.solutionDesign.principles && (
            <div className="mb-10">
              <PointList points={project.solutionDesign.principles} />
            </div>
          )}
          {project.solutionDesign.flowDiagram && (
            <div className="mt-2">
              <DiagramView diagram={project.solutionDesign.flowDiagram} />
            </div>
          )}

          {project.solutionDesign.flow && (
            <div>
              <p className="eyebrow mb-4">End-to-end flow</p>
              <ol className="space-y-2">
                {project.solutionDesign.flow.map((f, i) => (
                  <li key={i} className="grid gap-3 sm:grid-cols-[2.5rem_1fr]">
                    <span className="font-mono text-micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{f}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Section>
      )}

      {/* Approaches considered — a note must show what it rejected --------- */}
      {project.alternatives && (
        <Section bare
          id="approaches" eyebrow={sectionEyebrow("approaches")}
          title="What else was on the table"
          lede="Broadly defensible directions, not straw men. Given the constraints in this note I would take one of them — but the case against it is real, and a different weighting of those constraints lands somewhere else."
        >
          <div className="space-y-0">
            {project.alternatives.map((a) => (
              <article key={a.option} className="grid gap-6 border-t border-line py-8 lg:grid-cols-[15rem_1fr]">
                <div>
                  <p className="font-display text-lg text-ink">{a.option}</p>
                  {a.verdict && (
                    <p className="mt-2 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                      {a.verdict}
                    </p>
                  )}
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-2">Case for</p>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{a.caseFor}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Case against</p>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{a.caseAgainst}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Enterprise Architecture & Technology Selection ---------------------- */}
      {project.architecture && (
        <Section bare
          id="architecture" eyebrow={sectionEyebrow("architecture")}
          title="One possible system design"
          lede="A design I would take into a review, not a specification. Several component choices could reasonably go the other way; where that is true, the technology table names the alternative."
        >
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
        <Section bare id="technology" eyebrow={sectionEyebrow("technology")} title="What I would choose, and what I would set aside">
          <TechSelectionTable rows={project.technologySelection} />
        </Section>
      )}

      {/* Security ----------------------------------------------------------------- */}
      {project.security && (
        <Section bare id="security" eyebrow={sectionEyebrow("security")} title="Security posture">
          {project.security.posture && (
            <div className="mb-8">
              <Prose text={project.security.posture} />
            </div>
          )}
          {project.security.controls && <PointList points={project.security.controls} />}
        </Section>
      )}

      {/* Scalability --------------------------------------------------------------- */}
      {project.scalability && (
        <Section bare id="scalability" eyebrow={sectionEyebrow("scalability")} title="How the system holds up under load">
          {project.scalability.body && (
            <div className="mb-8">
              <Prose text={project.scalability.body} />
            </div>
          )}
          {project.scalability.levers && <PointList points={project.scalability.levers} />}
        </Section>
      )}

      {/* Cost Optimization ---------------------------------------------------------- */}
      {project.costOptimization && (
        <Section bare id="cost" eyebrow={sectionEyebrow("cost")} title="Keeping unit economics under control">
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

      {/* Risks ------------------------------------------------------------------------- */}
      {project.risks && (
        <Section bare id="risks" eyebrow={sectionEyebrow("risks")} title="What could go wrong, and the mitigation for each">
          <RiskTable risks={project.risks} />
        </Section>
      )}

      {/* KPIs -------------------------------------------------------------------------- */}
      {project.kpis && (
        <Section bare id="kpis" eyebrow={sectionEyebrow("kpis")} title="How success is measured">
          <KpiTable kpis={project.kpis} />
        </Section>
      )}

      {/* Implementation Roadmap ---------------------------------------------------------- */}
      {project.roadmap && (
        <Section bare id="roadmap" eyebrow={sectionEyebrow("roadmap")} title="Phased delivery">
          <RoadmapTimeline phases={project.roadmap} />
        </Section>
      )}

      {/* Reflection ------------------------------------------------------------------- */}
      {project.lessonsLearned && (
        <Section bare id="reflection" eyebrow={sectionEyebrow("reflection")} title="What this exercise changed in my thinking">
          <BulletList items={project.lessonsLearned} />
        </Section>
      )}

      {/* Future Improvements ----------------------------------------------------------------- */}
      {project.futureImprovements && (
        <Section bare id="future" eyebrow={sectionEyebrow("future")} title="What comes next">
          <BulletList items={project.futureImprovements} />
        </Section>
      )}

      {/* Sensitivity — what this design becomes under different inputs ------ */}
      {project.tailoring && (
        <Section bare
          id="tailoring" eyebrow={sectionEyebrow("tailoring")}
          title="What changes the answer"
          lede="Every decision above is downstream of a handful of inputs. If yours differ, so should the architecture. This is where the note is most likely to be useful to someone solving the same class of problem under different conditions."
        >
          <div className="space-y-0">
            {project.tailoring.map((t, i) => (
              <article key={i} className="grid gap-6 border-t border-line py-8 lg:grid-cols-[16rem_1fr]">
                <div>
                  <p className="font-display text-lg leading-snug text-ink">{t.parameter}</p>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="eyebrow">Assumed here</dt>
                      <dd className="mt-1 text-[0.875rem] leading-snug text-ink-soft">{t.hereValue}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Instead</dt>
                      <dd className="mt-1 border-l-2 border-accent pl-3 text-[0.875rem] font-medium leading-snug text-ink">
                        {t.altValue}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-2">The architecture becomes</p>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{t.architectureChange}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Why</p>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{t.why}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {project.assumptionsToTest && (
            <div className="mt-12 border-t-2 border-accent pt-6">
              <p className="eyebrow mb-4">Assumptions I would test first</p>
              <ol className="max-w-reading space-y-3">
                {project.assumptionsToTest.map((a, i) => (
                  <li key={i} className="grid gap-3 sm:grid-cols-[2.5rem_1fr]">
                    <span className="font-mono text-micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Section>
      )}

      {/* Legacy: notes that still carry an open-questions list ---------------- */}
      {!project.tailoring && project.openQuestions && (
        <Section bare id="open-questions" eyebrow={sectionEyebrow("open-questions")} title="What I have not resolved">
          <ol className="space-y-0">
            {project.openQuestions.map((q, i) => (
              <li key={i} className="grid gap-3 border-t border-line py-5 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-micro text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">{q}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Discussion — the closing move of every note is an invitation to disagree */}
      <Section bare eyebrow="Discussion" title="Where would you have decided differently?">
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

        </div>
      </div>

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
