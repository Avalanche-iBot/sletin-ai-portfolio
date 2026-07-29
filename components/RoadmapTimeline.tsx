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

/**
 * A case study's delivery roadmap, one panel per phase.
 *
 * An `<ol>` rather than a `<div>`, because the phases are a sequence and the
 * order carries meaning even when the visual grid is not being seen.
 *
 * The hairline grid is a trick worth knowing: the container is painted in the
 * line colour, each panel in the surface colour, and `gap-px` lets one pixel of
 * the container show through between them. That gives rules of exactly one
 * device pixel that never double up where panels meet — which stacking borders
 * on each panel would do.
 */
export function RoadmapTimeline({ phases }: { phases: NonNullable<CaseStudy["roadmap"]> }) {
  // Falls back to the four-column layout for any count beyond the table above,
  // which wraps rather than leaving a gap — five phases fill four columns and
  // then one, with no empty cell.
  const columns = PHASE_COLUMNS[phases.length] ?? "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <ol className={cx("grid gap-px overflow-hidden border border-line bg-line", columns)}>
      {phases.map((p) => (
        // flex-col here is what lets the deliverables list below use `mt-auto`
        // to sit against the bottom of its panel, so the lists align across
        // phases whose descriptions run to different lengths.
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
                  <span className="text-accent" aria-hidden>
                    ▸
                  </span>{" "}
                  {d}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
