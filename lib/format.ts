import type { Complexity, CaseStudy } from "@/content/types";

/**
 * Presentation helpers shared across components.
 *
 * Nothing here touches content or fetches anything — these are pure functions
 * and lookup tables that turn a value from `content/` into something a
 * component can render. Keeping them in one place means a badge looks the same
 * on the homepage, in the portfolio index, and on a case-study page without
 * three separate copies of the same class list drifting apart.
 */

/**
 * Join class names, dropping anything falsy.
 *
 * Conditional classes in JSX usually come out as `cond && "class"`, which
 * evaluates to `false` when the condition fails. Passing that straight into a
 * template literal would print the word "false" into the class attribute, so
 * every falsy value is filtered out first.
 *
 *   cx("btn", isActive && "btn-active", size === "lg" ? "text-lg" : null)
 *   // isActive true, size "sm"  ->  "btn"
 *   // isActive true, size "lg"  ->  "btn btn-active text-lg"
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Wording for the 1–5 architecture-complexity rating.
 *
 * The rating is stored as a number so it can drive a meter widget, but a bare
 * "3" tells a reader nothing. This table supplies the label shown beside it.
 * Typed as `Record<Complexity, string>`, so if `Complexity` ever gains a 6 the
 * compiler will point here rather than letting the label silently come out
 * undefined.
 */
export const COMPLEXITY_LABEL: Record<Complexity, string> = {
  1: "Low",
  2: "Moderate",
  3: "Medium–High",
  4: "High",
  5: "Very high",
};

/**
 * Border and text colour for a case study's status badge.
 *
 * The values are Tailwind classes built on the theme's semantic colour tokens
 * (see `tailwind.config.ts`), never raw hex, so both light and dark mode are
 * handled by the token itself. Only "Architecture note" gets the accent
 * colour — a finished write-up is the one status worth drawing the eye to.
 */
export const STATUS_TONE: Record<string, string> = {
  "In analysis": "text-ink-soft border-line-strong",
  "Architecture note": "text-accent-deep border-accent",
  "Under revision": "text-ink-soft border-line-strong",
  "Open question": "text-ink-muted border-line",
};

/**
 * Text colour for a risk's severity level, used by the risk table.
 *
 * Severity is deliberately not colour-coded red/amber/green: the whole site
 * uses a single accent colour, so escalation is expressed by contrast instead.
 * "Low" sits back in muted grey and each step up moves closer to full-strength
 * ink, with only "Critical" additionally taking weight.
 */
export const SEVERITY_TONE: Record<string, string> = {
  Low: "text-ink-muted",
  Medium: "text-ink-soft",
  High: "text-accent-deep",
  Critical: "text-accent-deep font-semibold",
};

/**
 * Rough reading time for a case note, in whole minutes.
 *
 * Walks the whole content object and counts words in every string it finds,
 * rather than totting up named fields by hand — a note gains sections over
 * time, and a hand-maintained list would silently under-report the moment one
 * was added. Diagram labels and table cells are counted too: they are not prose
 * and read faster, but they are not free either, and over-reporting slightly is
 * the safer direction for a number whose job is to set expectations.
 *
 * 200 words per minute is the conservative end of the usual range for dense
 * technical text. The point of showing this at all is that these notes are long
 * and a reader deserves to know that before they start, not at minute twelve.
 */
export function readingMinutes(project: CaseStudy): number {
  let words = 0;

  const walk = (value: unknown): void => {
    if (typeof value === "string") {
      words += value.split(/\s+/).filter(Boolean).length;
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  };

  walk(project);
  return Math.max(1, Math.round(words / 200));
}
