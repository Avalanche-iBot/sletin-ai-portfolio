import type { CaseStudy } from "@/content/types";
import { site } from "@/content/site";

/**
 * Downloadable materials, generated from case-study data.
 *
 * Nothing here is authored separately from the note. Every file is a
 * transform of fields the case-study template already renders — the risk
 * table, the KPI scorecard, the technology-selection grid, the discovery
 * transcript, the rejected alternatives. That is a deliberate constraint: it
 * means a material can never say something the note itself doesn't, and a new
 * case study gets the full set for free just by filling in the same schema.
 *
 * Route: app/api/materials/[slug]/[kind]/route.ts reads a case study by slug
 * and calls `generateMaterial`. Statically generated at build time like the
 * rest of the site — see `materialParams` below.
 */

export type MaterialKind =
  | "risk-register"
  | "kpi-scorecard"
  | "technology-selection"
  | "discovery-questions"
  | "decision-records";

export interface MaterialMeta {
  kind: MaterialKind;
  label: string;
  description: string;
  ext: "csv" | "md";
  mime: string;
}

const MATERIAL_META: Record<MaterialKind, Omit<MaterialMeta, "kind">> = {
  "risk-register": {
    label: "Risk register",
    description: "Every risk in the note, with severity, consequence and mitigation.",
    ext: "csv",
    mime: "text/csv",
  },
  "kpi-scorecard": {
    label: "KPI scorecard",
    description: "The full metric set, with baseline, target and why each one is there.",
    ext: "csv",
    mime: "text/csv",
  },
  "technology-selection": {
    label: "Technology selection matrix",
    description: "Layer, choice, rejected alternative and the reasoning behind each.",
    ext: "csv",
    mime: "text/csv",
  },
  "discovery-questions": {
    label: "Discovery question bank",
    description: "The questions put to each stakeholder group, and what they returned.",
    ext: "md",
    mime: "text/markdown",
  },
  "decision-records": {
    label: "Decision records",
    description: "Every option that was on the table, written up as one ADR each.",
    ext: "md",
    mime: "text/markdown",
  },
};

const HAS_DATA: Record<MaterialKind, (p: CaseStudy) => boolean> = {
  "risk-register": (p) => !!p.risks?.length,
  "kpi-scorecard": (p) => !!p.kpis?.length,
  "technology-selection": (p) => !!p.technologySelection?.length,
  "discovery-questions": (p) => !!p.discovery?.groups?.length,
  "decision-records": (p) => !!p.alternatives?.length,
};

/** Which materials this case study actually has data for, in a fixed order. */
export function availableMaterials(project: CaseStudy): MaterialMeta[] {
  return (Object.keys(MATERIAL_META) as MaterialKind[])
    .filter((kind) => HAS_DATA[kind](project))
    .map((kind) => ({ kind, ...MATERIAL_META[kind] }));
}

/** Every (slug, kind) pair with data — for generateStaticParams. */
export function materialParams(projects: CaseStudy[]): { slug: string; kind: MaterialKind }[] {
  return projects.flatMap((p) => availableMaterials(p).map((m) => ({ slug: p.slug, kind: m.kind })));
}

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function csvRow(cells: string[]): string {
  return cells.map(csvCell).join(",") + "\r\n";
}

/**
 * Shared preamble: what this is, where it came from, and the licence it
 * ships under. Kept on the file itself because a download outlives the page
 * it came from — if it's opened months later with no context, this is the
 * only thing telling the reader it's illustrative, not a real audit.
 */
function banner(project: CaseStudy, title: string): string {
  const url = `https://aleksandrsletin.com/portfolio/${project.slug}`;
  return [
    `${title} — ${project.title}`,
    `Educational analysis of a hypothetical scenario. Not derived from any real organisation's systems or data.`,
    `Source note: ${url}`,
    `License: CC BY 4.0 — reuse and adapt freely, with attribution to ${site.name} and the source note above.`,
    `Generated ${new Date().toISOString().slice(0, 10)}.`,
  ].join("\n");
}

function csvBanner(project: CaseStudy, title: string): string {
  return banner(project, title)
    .split("\n")
    .map((line) => csvRow([line]))
    .join("") + "\r\n";
}

function riskRegisterCsv(project: CaseStudy): string {
  const rows = project.risks ?? [];
  let out = csvBanner(project, "Risk register");
  out += csvRow(["#", "Risk", "Severity", "Consequence", "Mitigation"]);
  for (const r of rows) out += csvRow([r.n, r.risk, r.severity, r.consequence, r.mitigation]);
  return out;
}

function kpiScorecardCsv(project: CaseStudy): string {
  const rows = project.kpis ?? [];
  let out = csvBanner(project, "KPI scorecard");
  out += csvRow(["Category", "KPI", "Baseline", "Target", "Why this metric"]);
  for (const k of rows) out += csvRow([k.category, k.kpi, k.baseline, k.target, k.why]);
  return out;
}

function technologySelectionCsv(project: CaseStudy): string {
  const rows = project.technologySelection ?? [];
  let out = csvBanner(project, "Technology selection matrix");
  out += csvRow(["Layer", "Choice", "Why", "Alternative considered"]);
  for (const t of rows) out += csvRow([t.layer, t.choice, t.why, t.alt]);
  return out;
}

function discoveryQuestionsMd(project: CaseStudy): string {
  const d = project.discovery;
  const lines: string[] = [`# Discovery question bank — ${project.title}`, "", banner(project, "Discovery question bank").split("\n").slice(1).join("  \n"), ""];

  if (d?.intro) lines.push(d.intro, "");

  for (const g of d?.groups ?? []) {
    lines.push(`## ${g.audience}`, "", `**Goal:** ${g.goal}`, "");
    g.questions.forEach((q, i) => {
      lines.push(`**Q — ${q}**`);
      if (g.answers[i]) lines.push(`A — ${g.answers[i]}`);
      lines.push("");
    });
  }

  if (d?.implications?.length) {
    lines.push("## Findings and their architectural implications", "");
    for (const f of d.implications) {
      lines.push(`- **${f.finding}** → ${f.implication}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function decisionRecordsMd(project: CaseStudy): string {
  const alts = project.alternatives ?? [];
  const lines: string[] = [
    `# Decision records — ${project.title}`,
    "",
    banner(project, "Decision records").split("\n").slice(1).join("  \n"),
    "",
    `${alts.length} option${alts.length === 1 ? "" : "s"} considered at architecture level.`,
    "",
  ];

  alts.forEach((a, i) => {
    const n = String(i + 1).padStart(3, "0");
    lines.push(
      `## ADR-${n}: ${a.option}`,
      "",
      `**Status:** ${a.verdict ? "Rejected" : "Considered"}`,
      "",
      "### Case for",
      a.caseFor,
      "",
      "### Case against",
      a.caseAgainst,
      "",
    );
    if (a.verdict) lines.push("### Verdict", a.verdict, "");
  });

  return lines.join("\n");
}

const GENERATORS: Record<MaterialKind, (p: CaseStudy) => string> = {
  "risk-register": riskRegisterCsv,
  "kpi-scorecard": kpiScorecardCsv,
  "technology-selection": technologySelectionCsv,
  "discovery-questions": discoveryQuestionsMd,
  "decision-records": decisionRecordsMd,
};

export function generateMaterial(project: CaseStudy, kind: MaterialKind): { body: string; meta: MaterialMeta } | null {
  if (!HAS_DATA[kind](project)) return null;
  return { body: GENERATORS[kind](project), meta: { kind, ...MATERIAL_META[kind] } };
}
