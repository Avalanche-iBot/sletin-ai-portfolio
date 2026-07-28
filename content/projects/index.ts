import type { CaseStudy } from "../types";

import case01 from "./case-01-ai-patient-communication-platform";
import case02 from "./case-02-ai-customer-support-platform";
import case03 from "./case-03-ai-contract-intelligence";
import case04 from "./case-04-ai-meeting-assistant";
import case05 from "./case-05-enterprise-knowledge-assistant";

/**
 * THE CMS REGISTRY.
 *
 * To publish a new case study:
 *   1. Add content/projects/case-NN-your-slug.ts satisfying `CaseStudy`.
 *   2. Import it above and add it to this array.
 * Nothing else changes — the homepage, /portfolio, and every case-study page
 * are generated from this list.
 *
 * Currently live: 5 of the planned 10. The remaining slots are reserved
 * below so the roadmap and portfolio counts stay honest about what's
 * built versus planned.
 */
export const caseStudies: CaseStudy[] = [case01, case02, case03, case04, case05].sort(
  (a, b) => a.order - b.order
);

/** Titles reserved for the next five, shown as "planned" rather than invented. */
export const plannedCaseStudies: { order: number; title: string }[] = [
  { order: 6, title: "AI Invoice Processing" },
  { order: 7, title: "Predictive Maintenance AI" },
  { order: 8, title: "AI Recruitment Assistant" },
  { order: 9, title: "AI Supply Chain Optimizer" },
  { order: 10, title: "Executive AI Dashboard" },
];

export const totalPlannedCaseStudies = caseStudies.length + plannedCaseStudies.length;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.featured);
}

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
