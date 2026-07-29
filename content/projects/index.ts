import type { CaseStudy } from "../types";

import case01 from "./case-01-ai-patient-communication-platform";
import case02 from "./case-02-ai-customer-support-platform";
import case03 from "./case-03-ai-contract-intelligence";
import case04 from "./case-04-ai-meeting-assistant";
import case05 from "./case-05-enterprise-knowledge-assistant";

/**
 * The case-study registry — this file is the site's content database.
 *
 * There is no CMS and no database. Every case study is a TypeScript module in
 * this folder exporting one object that satisfies the `CaseStudy` type, and
 * this array is the list of the ones that are live. The homepage, the
 * portfolio index, the sitemap and each individual case-study page all read
 * from here, so adding a study is a two-line change:
 *
 *   1. Write `content/projects/case-NN-your-slug.ts` exporting a `CaseStudy`.
 *   2. Import it above and add it to the array below.
 *
 * No route and no component needs touching. Because the content is typed, a
 * missing required field is a build error rather than a blank space that only
 * shows up in the browser.
 */

/**
 * Every published case study, ordered by its `order` field.
 *
 * The sort runs here, once, rather than at each call site — otherwise the
 * homepage and the portfolio index could disagree about sequence if one of
 * them forgot to sort. `order` is used instead of array position so the
 * imports above can stay in any arrangement without changing what readers see.
 */
export const caseStudies: CaseStudy[] = [case01, case02, case03, case04, case05].sort(
  (a, b) => a.order - b.order
);

/**
 * Titles held for studies not yet written.
 *
 * These are shown on the portfolio index as planned work rather than being
 * quietly omitted, which keeps the published count honest: a reader sees five
 * of ten written instead of five presented as the whole set. They carry a
 * title only — there is no page behind them and no route is generated.
 */
export const plannedCaseStudies: { order: number; title: string }[] = [
  { order: 6, title: "AI Invoice Processing" },
  { order: 7, title: "Predictive Maintenance AI" },
  { order: 8, title: "AI Recruitment Assistant" },
  { order: 9, title: "AI Supply Chain Optimizer" },
  { order: 10, title: "Executive AI Dashboard" },
];

/** Written plus planned — the denominator in "5 of 10" style progress copy. */
export const totalPlannedCaseStudies = caseStudies.length + plannedCaseStudies.length;

/**
 * Find one case study by its URL slug.
 *
 * Called by the dynamic route `app/portfolio/[slug]/page.tsx` to turn the
 * segment from the address bar into content. Returns `undefined` for an
 * unknown slug, which the page turns into a 404 — so a mistyped URL produces
 * a proper not-found page rather than a crash.
 */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * The studies immediately before and after the given one, for prev/next links
 * at the foot of a case study.
 *
 * `null` marks an end of the list, so the first study has no "previous" link
 * and the last has no "next". An unrecognised slug yields nulls on both sides
 * rather than throwing, since by the time this runs the page is already
 * rendering and a broken link is better than a broken page.
 */
export function getAdjacentCaseStudies(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? caseStudies[idx - 1] : null,
    next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
  };
}
