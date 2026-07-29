import type { CaseStudy } from "@/content/types";
import { cx } from "@/lib/format";

/*
 * Columns follow the phase count rather than a fixed four.
 *
 * The hairline grid is drawn by `gap-px` over a `bg-line` container, which means
 * any column the phases do not fill renders as a visible empty panel — a
 * three-phase roadmap in a four-column grid left a grey cell that read as
 * missing content. Tailwind only emits classes it can see as literals, so the
 * mapping is spelled out instead of interpolated.
 */
const PHASE_COLUMNS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function RoadmapTimeline({ phases }: { phases: NonNullable<CaseStudy["roadmap"]> }) {
  const columns = PHASE_COLUMNS[phases.length] ?? "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <ol className={cx("grid gap-px overflow-hidden border border-line bg-line", columns)}>
      {phases.map((p) => (
        <li key={p.phase} className="flex flex-col bg-surface p-5">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-spec font-semibold text-accent-deep">{p.phase}</span>
            <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">{p.duration}</span>
          </div>
          <p className="mb-2 font-display text-base text-ink">{p.name}</p>
          <p className="mb-4 text-[0.8125rem] leading-relaxed text-ink-soft">{p.goal}</p>
          {p.deliverables && p.deliverables.length > 0 && (
            <ul className="mt-auto space-y-1.5 border-t border-line pt-3">
              {p.deliverables.map((d, i) => (
                <li key={i} className="text-[0.75rem] leading-snug text-ink-muted">
                  <span className="text-accent">▸</span> {d}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
