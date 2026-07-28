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
  "In analysis": "text-ink-soft border-line-strong",
  "Architecture note": "text-accent-deep border-accent",
  "Under revision": "text-ink-soft border-line-strong",
  "Open question": "text-ink-muted border-line",
};

/** One line of plain English shown under the badge, so the label is self-explaining. */
export const STATUS_MEANING: Record<string, string> = {
  "In analysis": "Reasoning still in progress",
  "Architecture note": "Analysis written up",
  "Under revision": "Revisiting earlier decisions",
  "Open question": "Deliberately left unresolved",
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
