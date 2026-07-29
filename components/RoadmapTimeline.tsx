import type { CaseStudy } from "@/content/types";
import { cx } from "@/lib/format";

/*
 * Columns follow the phase count, and only ever use a count that divides it.
 *
 * The hairline grid is drawn by `gap-px` over a `bg-line` container, so any
 * cell the phases do not fill renders as a solid panel in the line colour —
 * it reads as missing content rather than as empty space. A layout is
 * therefore only safe when every row comes out full.
 *
 * That has to hold at each breakpoint independently, which is the part worth
 * spelling out: three phases in two columns leaves a gap in the second row
 * just as surely as three phases in four columns does. So an odd count gets no
 * two-column layout at all, and stacks until there is room for the full set.
 *
 * Tailwind only emits classes it can see written out, so the mapping is
 * literal rather than interpolated.
 */
const PHASE_COLUMNS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3",
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
  // Anything past six phases falls back to a single column, which is the one
  // layout that cannot leave a gap at any width. A roadmap that long is a
  // content problem rather than a layout one, and silently rendering it wrong
  // would hide that.
  const columns = PHASE_COLUMNS[phases.length] ?? "";

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
