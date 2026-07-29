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

/*
 * Two formats, chosen for who has to open them.
 *
 * The dossier is the one most readers can use: double-click, it opens in a
 * browser, Ctrl+P gives a PDF, and its tables paste into a spreadsheet or a
 * document with the columns intact. The CSVs are for the smaller group who
 * want the rows as data.
 *
 * Markdown was here and is not any more. It renders beautifully on GitHub and
 * opens in Notepad everywhere else, which made it a format that only helped
 * readers who already knew what to do with it. Its content is in the dossier.
 */
export type MaterialKind =
  | "dossier"
  | "risk-register"
  | "kpi-scorecard"
  | "technology-selection";

export interface MaterialMeta {
  kind: MaterialKind;
  label: string;
  description: string;
  ext: "csv" | "html";
  mime: string;
  /** Shown first and styled as the primary download. */
  primary?: boolean;
}

const MATERIAL_META: Record<MaterialKind, Omit<MaterialMeta, "kind">> = {
  dossier: {
    label: "Everything, as one document",
    description:
      "All five sets in a single self-contained page. Opens in any browser, prints to PDF, and the tables paste straight into a spreadsheet or a document.",
    ext: "html",
    mime: "text/html",
    primary: true,
  },
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
};

const HAS_DATA: Record<MaterialKind, (p: CaseStudy) => boolean> = {
  dossier: (p) =>
    !!(p.risks?.length || p.kpis?.length || p.technologySelection?.length || p.discovery?.groups?.length || p.alternatives?.length),
  "risk-register": (p) => !!p.risks?.length,
  "kpi-scorecard": (p) => !!p.kpis?.length,
  "technology-selection": (p) => !!p.technologySelection?.length,
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

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The whole set as one self-contained page.
 *
 * This is the format most readers can actually use: it opens on a double
 * click with no tooling, prints to PDF through the browser, and its tables
 * paste into Excel, Word or Confluence with the columns intact — which a CSV
 * does not do without an import step. Styles are inlined and there are no
 * external references, so it keeps working offline and forever.
 */
function dossierHtml(project: CaseStudy): string {
  const url = `https://aleksandrsletin.com/portfolio/${project.slug}`;
  const parts: string[] = [];

  const table = (heading: string, headers: string[], rows: string[][]) => {
    if (rows.length === 0) return;
    parts.push(`<h2>${esc(heading)}</h2>`);
    parts.push("<table><thead><tr>");
    parts.push(headers.map((h) => `<th>${esc(h)}</th>`).join(""));
    parts.push("</tr></thead><tbody>");
    for (const r of rows) {
      parts.push("<tr>" + r.map((c) => `<td>${esc(c)}</td>`).join("") + "</tr>");
    }
    parts.push("</tbody></table>");
  };

  table(
    "Risk register",
    ["#", "Risk", "Severity", "Consequence", "Mitigation"],
    (project.risks ?? []).map((r) => [r.n, r.risk, r.severity, r.consequence, r.mitigation]),
  );

  table(
    "KPI scorecard",
    ["Category", "KPI", "Baseline", "Target", "Why this metric"],
    (project.kpis ?? []).map((k) => [k.category, k.kpi, k.baseline, k.target, k.why]),
  );

  table(
    "Technology selection",
    ["Layer", "Choice", "Why", "Alternative considered"],
    (project.technologySelection ?? []).map((t) => [t.layer, t.choice, t.why, t.alt]),
  );

  if (project.discovery?.groups?.length) {
    parts.push("<h2>Discovery question bank</h2>");
    for (const g of project.discovery.groups) {
      parts.push(`<h3>${esc(g.audience)}</h3>`);
      parts.push(`<p class="goal">${esc(g.goal)}</p>`);
      parts.push("<dl>");
      g.questions.forEach((q, i) => {
        parts.push(`<dt>${esc(q)}</dt>`);
        if (g.answers[i]) parts.push(`<dd>${esc(g.answers[i])}</dd>`);
      });
      parts.push("</dl>");
    }
  }

  if (project.alternatives?.length) {
    parts.push("<h2>Decision records</h2>");
    project.alternatives.forEach((a, i) => {
      parts.push(`<h3>ADR-${String(i + 1).padStart(3, "0")} · ${esc(a.option)}</h3>`);
      parts.push(`<p><strong>Case for.</strong> ${esc(a.caseFor)}</p>`);
      parts.push(`<p><strong>Case against.</strong> ${esc(a.caseAgainst)}</p>`);
      if (a.verdict) parts.push(`<p><strong>Verdict.</strong> ${esc(a.verdict)}</p>`);
    });
  }

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(project.title)} — working materials</title>
<style>
  :root { --ink:#0c121a; --soft:#3d4857; --muted:#74808f; --line:#d8dde4; }
  * { box-sizing:border-box }
  body { margin:0 auto; padding:3rem 1.5rem 6rem; max-width:60rem;
         font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
         color:var(--ink); background:#fff; }
  header { border-bottom:2px solid var(--ink); padding-bottom:1.5rem; margin-bottom:2.5rem }
  h1 { font-size:1.75rem; margin:0 0 .5rem; line-height:1.25 }
  h2 { font-size:1.25rem; margin:3rem 0 1rem; padding-bottom:.4rem; border-bottom:1px solid var(--line) }
  h3 { font-size:1rem; margin:2rem 0 .5rem }
  p { margin:0 0 .75rem }
  .sub { color:var(--soft); margin:0 }
  .notice { margin:1.25rem 0 0; padding:.85rem 1rem; background:#faf7f0;
            border-left:3px solid #c5800c; font-size:.875rem; color:var(--soft) }
  .goal { color:var(--muted); font-size:.875rem; font-style:italic }
  table { width:100%; border-collapse:collapse; margin:1rem 0 2rem; font-size:.875rem }
  th,td { border:1px solid var(--line); padding:.55rem .7rem; text-align:left; vertical-align:top }
  th { background:#f1f3f6; font-weight:600 }
  dt { font-weight:600; margin-top:.9rem }
  dd { margin:.25rem 0 0; color:var(--soft) }
  footer { margin-top:4rem; padding-top:1.25rem; border-top:1px solid var(--line);
           font-size:.8125rem; color:var(--muted) }
  a { color:inherit }
  @media print { body { padding:0 } .notice { background:none } h2 { break-after:avoid } table { break-inside:auto } tr { break-inside:avoid } }
</style></head>
<body>
<header>
  <h1>${esc(project.title)}</h1>
  <p class="sub">${esc(project.subtitle)}</p>
  <p class="notice"><strong>Educational analysis of a hypothetical scenario.</strong>
  Not derived from, and not describing, the internal systems, data or projects of any organisation.
  The figures and architectures are illustrative — they show how a class of problem is reasoned
  about, not a validated implementation.</p>
</header>
${parts.join("\n")}
<footer>
  <p>Source note: <a href="${esc(url)}">${esc(url)}</a></p>
  <p>Licensed CC BY 4.0 — reuse and adapt freely, with attribution to ${esc(site.name)} and the source note above.</p>
  <p>Generated ${new Date().toISOString().slice(0, 10)}.</p>
</footer>
</body></html>`;
}

const GENERATORS: Record<MaterialKind, (p: CaseStudy) => string> = {
  dossier: dossierHtml,
  "risk-register": riskRegisterCsv,
  "kpi-scorecard": kpiScorecardCsv,
  "technology-selection": technologySelectionCsv,
};

/**
 * `kind` arrives as an unvalidated URL segment, so an unknown value has to be
 * a null rather than a lookup on a map that does not contain it.
 */
export function generateMaterial(project: CaseStudy, kind: string): { body: string; meta: MaterialMeta } | null {
  if (!Object.prototype.hasOwnProperty.call(MATERIAL_META, kind)) return null;
  const known = kind as MaterialKind;
  if (!HAS_DATA[known](project)) return null;
  return { body: GENERATORS[known](project), meta: { kind: known, ...MATERIAL_META[known] } };
}
