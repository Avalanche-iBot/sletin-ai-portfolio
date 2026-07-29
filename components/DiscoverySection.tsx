import type { CaseStudy } from "@/content/types";
import { Prose, BulletList } from "@/components/Primitives";

/**
 * The discovery section of a case study — interviews, findings, and the
 * assumptions, risks and constraints they produced.
 *
 * The longest component on the site, because discovery has four distinct parts
 * and each is shaped differently. Only the interview groups are required; the
 * intro, the findings and the three closing lists each render only if written,
 * so an early note can publish with interviews alone and grow from there.
 *
 * That pattern — `{x && x.length > 0 && <Block/>}` — repeats throughout. The
 * explicit length check matters: `{arr.length && …}` would print a bare `0` on
 * the page when the array is empty, since React renders the number zero rather
 * than treating it as nothing.
 */
export function DiscoverySection({
  discovery,
}: {
  discovery: NonNullable<CaseStudy["discovery"]>;
}) {
  return (
    <div className="space-y-12">
      {discovery.intro && <Prose text={discovery.intro} />}

      <div className="grid gap-6 lg:grid-cols-2">
        {discovery.groups.map((g, i) => (
          <div key={i} className="frame p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-line pb-3">
              <p className="font-display text-lg text-ink">{g.audience}</p>
              <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">Interview</p>
            </div>
            <p className="mb-4 text-[0.875rem] italic leading-relaxed text-ink-muted">{g.goal}</p>

            <p className="eyebrow mb-2">Questions asked</p>
            <ul className="mb-5 space-y-2">
              {g.questions.map((q, qi) => (
                <li key={qi} className="text-[0.875rem] leading-relaxed text-ink-soft">
                  <span className="mr-1.5 font-mono text-accent-deep">Q.</span>
                  {q}
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-2">What came back</p>
            <ul className="space-y-2">
              {g.answers.map((a, ai) => (
                <li key={ai} className="text-[0.875rem] leading-relaxed text-ink">
                  <span className="mr-1.5 font-mono text-ink-muted">A.</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {discovery.implications && discovery.implications.length > 0 && (
        <div>
          <p className="eyebrow mb-1">Findings, and what each one rules out</p>
          <p className="mb-6 max-w-reading text-[0.9375rem] leading-relaxed text-ink-muted">
            This is the part of discovery that does the work. Each finding on the left removed options
            from the design space; the consequence on the right is what was left.
          </p>

          <ol className="space-y-0">
            {discovery.implications.map((im, i) => (
              // Three columns on wide screens — number, finding, consequence —
              // collapsing to a single stacked column below `lg`, where the
              // side-by-side reading would leave each half too narrow. The
              // consequence column is the wider of the two: it carries the
              // reasoning, the finding is a label.
              <li
                key={i}
                className="grid gap-3 border-t border-line py-6 lg:grid-cols-[2.5rem_1fr_1.4fr] lg:gap-6"
              >
                <span className="font-mono text-micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>

                <p className="font-display text-base leading-snug text-ink">{im.finding}</p>

                <div className="border-l-2 border-accent pl-4">
                  <p className="eyebrow mb-1.5">Therefore</p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{im.implication}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Assumptions, risks and constraints are the evidence of architectural
          thinking, not an appendix to it. Given equal weight and a frame each,
          rather than three unlabelled bullet lists at the foot of the section. */}
      {(discovery.assumptions?.length || discovery.businessRisks?.length || discovery.technicalConstraints?.length) && (
        <div>
          <p className="eyebrow mb-1">What discovery established</p>
          <p className="mb-6 max-w-reading text-[0.9375rem] leading-relaxed text-ink-muted">
            Three different kinds of output, deliberately kept apart. An assumption is something I chose
            to believe and would test. A risk is a business consequence somebody has to accept. A
            constraint is not negotiable and narrows the design before it starts.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {discovery.assumptions && discovery.assumptions.length > 0 && (
              <section className="frame p-6">
                <p className="eyebrow mb-1">Working assumptions</p>
                <p className="text-[0.75rem] leading-snug text-ink-muted">
                  Believed, not verified — each one is a test waiting to be run
                </p>
                <div className="mb-4 mt-3 h-px w-10 bg-accent" aria-hidden />
                <BulletList items={discovery.assumptions} />
              </section>
            )}

            {discovery.businessRisks && discovery.businessRisks.length > 0 && (
              <section className="frame p-6">
                <p className="eyebrow mb-1">Business risks surfaced</p>
                <p className="text-[0.75rem] leading-snug text-ink-muted">
                  Consequences the business has to own, whatever the design
                </p>
                <div className="mb-4 mt-3 h-px w-10 bg-line-strong" aria-hidden />
                <BulletList items={discovery.businessRisks} />
              </section>
            )}

            {discovery.technicalConstraints && discovery.technicalConstraints.length > 0 && (
              <section className="frame p-6">
                <p className="eyebrow mb-1">Technical constraints revealed</p>
                <p className="text-[0.75rem] leading-snug text-ink-muted">
                  Not negotiable — these decide what the architecture may be
                </p>
                <div className="mb-4 mt-3 h-px w-10 bg-line-strong" aria-hidden />
                <BulletList items={discovery.technicalConstraints} />
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
