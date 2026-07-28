import type { CaseStudy } from "@/content/types";
import { Prose, BulletList } from "@/components/Primitives";

export function DiscoverySection({ discovery }: { discovery: NonNullable<CaseStudy["discovery"]> }) {
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
          <p className="eyebrow mb-4">Findings → architectural implications</p>
          <div className="space-y-3">
            {discovery.implications.map((im, i) => (
              <div key={i} className="grid gap-2 border-t border-line py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
                <p className="text-[0.9375rem] text-ink-soft">{im.finding}</p>
                <span className="hidden font-mono text-ink-muted sm:block" aria-hidden>
                  →
                </span>
                <p className="text-[0.9375rem] font-medium text-ink">{im.implication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        {discovery.assumptions && discovery.assumptions.length > 0 && (
          <div>
            <p className="eyebrow mb-3">Working assumptions</p>
            <BulletList items={discovery.assumptions} />
          </div>
        )}
        {discovery.businessRisks && discovery.businessRisks.length > 0 && (
          <div>
            <p className="eyebrow mb-3">Business risks surfaced</p>
            <BulletList items={discovery.businessRisks} />
          </div>
        )}
        {discovery.technicalConstraints && discovery.technicalConstraints.length > 0 && (
          <div className="sm:col-span-2">
            <p className="eyebrow mb-3">Technical constraints revealed</p>
            <BulletList items={discovery.technicalConstraints} />
          </div>
        )}
      </div>
    </div>
  );
}
