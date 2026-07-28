import type { Complexity } from "@/content/types";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const COMPLEXITY_LABEL: Record<Complexity, string> = {
  1: "Low",
  2: "Moderate",
  3: "Medium–High",
  4: "High",
  5: "Very high",
};

export const STATUS_TONE: Record<string, string> = {
  Draft: "text-ink-muted border-line",
  Discovery: "text-ink-soft border-line-strong",
  "In design": "text-accent-deep border-accent/40",
  "MVP in build": "text-accent-deep border-accent/40",
  Live: "text-accent-deep border-accent",
  Archived: "text-ink-muted border-line",
};

export const SEVERITY_TONE: Record<string, string> = {
  Low: "text-ink-muted",
  Medium: "text-ink-soft",
  High: "text-accent-deep",
  Critical: "text-accent-deep font-semibold",
};

/** Slugify a heading into an anchor id, for in-page section navigation. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
