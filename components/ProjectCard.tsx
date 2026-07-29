import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ComplexityMeter, TagList } from "@/components/Primitives";
import { cx, STATUS_TONE } from "@/lib/format";

/**
 * The card that represents one case study in a listing.
 *
 * Used by both the homepage and the portfolio index, so any change here shows
 * up in both places — which is the point of having a single component rather
 * than two similar blocks of markup.
 *
 * The whole card is one `<Link>`, not a box with a "read more" link inside it.
 * That makes the entire surface clickable and gives the card a single stop in
 * the keyboard tab order, where nested links would produce several.
 *
 * `group` on that link is what lets the children react to hovering anywhere on
 * the card: Tailwind's `group-hover:` prefix reads the parent's hover state, so
 * the title changes colour and the footer prompt fades in together, without any
 * JavaScript or state.
 *
 * @param index Position in the listing, rendered as a plain sequence number.
 *   Optional — when the card appears outside an ordered list the industry is
 *   shown instead, so the corner is never empty.
 */
export function ProjectCard({ project, index }: { project: CaseStudy; index?: number }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group frame flex flex-col p-6 transition-colors duration-200 ease-precise hover:border-ink"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        {/* `typeof index === "number"` rather than a truthiness check: index 0
            is a perfectly good first item, and `index && …` would discard it.
            padStart gives "01", "02" — fixed width, so the numbers line up
            down a column of cards. */}
        <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
          {typeof index === "number" ? String(index + 1).padStart(2, "0") : project.industry}
        </span>
        <span
          className={cx(
            "border px-2 py-0.5 font-mono text-micro uppercase tracking-[0.08em]",
            STATUS_TONE[project.status],
          )}
        >
          {project.status}
        </span>
      </div>

      <h3 className="font-display text-xl text-ink transition-colors group-hover:text-accent-deep">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
        {project.industry} · {project.domain}
      </p>

      {/* flex-1 makes the summary absorb the leftover height, so that cards of
          differing text length still align their footers along one line. */}
      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
        {project.shortSummary}
      </p>

      {/* Optional, like most fields on a case study — the card renders whatever
          is written and omits what is not. */}
      {project.impact && (
        <p className="mt-4 border-l-2 border-accent/50 pl-3 text-[0.8125rem] font-medium leading-snug text-ink">
          {project.impact}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <ComplexityMeter level={project.architectureComplexity} />
        {/* Faded in on hover rather than mounted on hover: the element always
            occupies its space, so the footer does not shift when the pointer
            arrives. It stays in the layout for screen readers too. */}
        <span className="font-mono text-micro uppercase tracking-[0.08em] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
          Read the case study →
        </span>
      </div>

      {/* Capped at four so a heavily tagged study cannot push the card taller
          than its neighbours; the full set is shown on the study's own page. */}
      <TagList tags={project.tags.slice(0, 4)} className="mt-4" />
    </Link>
  );
}
