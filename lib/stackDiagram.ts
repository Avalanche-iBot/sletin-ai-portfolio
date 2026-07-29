import type { ArchitectureLayer } from "@/content/architecture";
import { site, siteUrl } from "@/content/site";

/**
 * Turns a stack selection into a diagram worth showing someone else.
 *
 * The point of the builder is to save an hour in Figma, so the output has to
 * be presentable on its own: it carries a title, the date it was produced, and
 * where it came from, because a diagram pasted into a deck outlives the tab it
 * was made in.
 *
 * Layout is deterministic rather than computed by a graph algorithm. The
 * catalogue already orders the layers, and that order is the vertical axis —
 * which is what makes the result reliably tidy instead of merely automatic.
 *
 * One honest limit, stated in the footer of the diagram itself: this shows
 * what a stack is made of, not how a request moves through it. Drawing arrows
 * would imply a call order the selection does not actually contain.
 */

/**
 * Layers that are not a step in the path but a concern applied across it.
 * Rendering these as rows would put "Secrets & Compliance" between the vector
 * store and the model, which reads as a sequence and is simply wrong. They get
 * a rail beside the stack instead — the convention any architect will recognise.
 */
const CROSS_CUTTING = new Set([
  "identity",
  "guardrails",
  "observability",
  "costControl",
  "secrets",
  "infrastructure",
  "humanInLoop",
]);

export type Selection = Record<string, string[]>;

const C = {
  canvas: "#FFFFFF",
  panel: "#F6F7F9",
  ink: "#0C121A",
  inkSoft: "#3D4857",
  inkMuted: "#74808F",
  line: "#D8DDE4",
  lineStrong: "#B0B8C3",
  accent: "#C5800C",
  accentSoft: "#FBF3E4",
};

const W = 940;
const MARGIN = 36;
const RAIL_W = 240;
const GAP = 28;
const MAIN_W = W - MARGIN * 2 - RAIL_W - GAP;
/** Usable rail width (240 less padding) divided by the 11.5px character estimate. */
const RAIL_CHARS = 34;

const HEADER_H = 104;
const ROW_LABEL_H = 22;
const CHIP_H = 30;
const CHIP_GAP = 8;
const ROW_PAD = 12;
const ROW_GAP = 10;

/** SVG cannot measure text, so chip widths come from an estimate. */
const charW = 6.6;
const chipWidth = (label: string) => Math.min(MAIN_W - 24, Math.round(label.length * charW) + 24);

/**
 * Break a label to fit a fixed width, since SVG will not wrap it.
 *
 * The rail is only ~216px of usable width and some block names run past 50
 * characters — "Deterministic validation (Pydantic, regex, allow-lists)" ran
 * off the edge of the canvas entirely. A word longer than the line is left
 * alone rather than hyphenated: overflowing one long token looks like a bug,
 * but a broken word reads as one.
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface PreparedLayer {
  title: string;
  order: number;
  names: string[];
  lines: string[][];
  height: number;
}

function wrapChips(names: string[], maxWidth: number): string[][] {
  const lines: string[][] = [];
  let line: string[] = [];
  let used = 0;
  for (const n of names) {
    const w = chipWidth(n);
    if (line.length > 0 && used + w + CHIP_GAP > maxWidth) {
      lines.push(line);
      line = [];
      used = 0;
    }
    line.push(n);
    used += w + CHIP_GAP;
  }
  if (line.length) lines.push(line);
  return lines;
}

function prepare(layers: ArchitectureLayer[], selection: Selection) {
  const chosen = (l: ArchitectureLayer) =>
    (selection[l.id] ?? [])
      .map((id) => l.blocks.find((b) => b.id === id)?.name)
      .filter((n): n is string => Boolean(n));

  const active = [...layers]
    .sort((a, b) => a.order - b.order)
    .filter((l) => chosen(l).length > 0);

  const sequential: PreparedLayer[] = [];
  const rail: { title: string; names: string[]; lines: string[] }[] = [];

  for (const l of active) {
    const names = chosen(l);
    if (CROSS_CUTTING.has(l.id)) {
      rail.push({ title: l.title, names, lines: names.flatMap((n) => wrapText(n, RAIL_CHARS)) });
      continue;
    }
    const lines = wrapChips(names, MAIN_W - 24);
    sequential.push({
      title: l.title,
      order: l.order,
      names,
      lines,
      height: ROW_LABEL_H + lines.length * CHIP_H + (lines.length - 1) * CHIP_GAP + ROW_PAD * 2,
    });
  }

  return { sequential, rail };
}

export function generateStackSvg(layers: ArchitectureLayer[], selection: Selection, title: string): string {
  const { sequential, rail } = prepare(layers, selection);

  const stackH =
    sequential.reduce((sum, r) => sum + r.height, 0) + Math.max(0, sequential.length - 1) * ROW_GAP;

  const railH = rail.reduce((sum, r) => sum + 30 + r.lines.length * 17 + 10, 0) + 34;
  const bodyH = Math.max(stackH, rail.length ? railH : 0);
  const footerH = 62;
  const totalH = HEADER_H + bodyH + footerH;

  const parts: string[] = [];

  // Sequential stack -------------------------------------------------
  let y = HEADER_H;
  for (const row of sequential) {
    parts.push(
      `<rect x="${MARGIN}" y="${y}" width="${MAIN_W}" height="${row.height}" rx="3" fill="${C.panel}" stroke="${C.line}"/>`,
      `<text x="${MARGIN + 12}" y="${y + 16}" font-family="'IBM Plex Mono',monospace" font-size="9.5" letter-spacing="1.2" fill="${C.inkMuted}">${esc(
        row.title.toUpperCase(),
      )}</text>`,
    );

    let cy = y + ROW_LABEL_H + ROW_PAD;
    for (const line of row.lines) {
      let cx = MARGIN + 12;
      for (const name of line) {
        const w = chipWidth(name);
        parts.push(
          `<rect x="${cx}" y="${cy}" width="${w}" height="${CHIP_H}" rx="2" fill="${C.canvas}" stroke="${C.lineStrong}"/>`,
          `<text x="${cx + w / 2}" y="${cy + CHIP_H / 2 + 4}" text-anchor="middle" font-family="Inter,Helvetica,Arial,sans-serif" font-size="12" fill="${C.ink}">${esc(
            name,
          )}</text>`,
        );
        cx += w + CHIP_GAP;
      }
      cy += CHIP_H + CHIP_GAP;
    }
    y += row.height + ROW_GAP;
  }

  // Cross-cutting rail -----------------------------------------------
  if (rail.length) {
    const rx = MARGIN + MAIN_W + GAP;
    parts.push(
      `<rect x="${rx}" y="${HEADER_H}" width="${RAIL_W}" height="${bodyH}" rx="3" fill="none" stroke="${C.lineStrong}" stroke-dasharray="4 3"/>`,
      `<text x="${rx + 12}" y="${HEADER_H + 20}" font-family="'IBM Plex Mono',monospace" font-size="9.5" letter-spacing="1.2" fill="${C.accent}">ACROSS EVERY LAYER</text>`,
    );
    let ry = HEADER_H + 44;
    for (const group of rail) {
      parts.push(
        `<text x="${rx + 12}" y="${ry}" font-family="'IBM Plex Mono',monospace" font-size="9" letter-spacing="1" fill="${C.inkMuted}">${esc(
          group.title.toUpperCase(),
        )}</text>`,
      );
      ry += 16;
      for (const line of group.lines) {
        parts.push(
          `<text x="${rx + 12}" y="${ry}" font-family="Inter,Helvetica,Arial,sans-serif" font-size="11.5" fill="${C.ink}">${esc(line)}</text>`,
        );
        ry += 17;
      }
      ry += 12;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const url = `${siteUrl}/architecture`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${totalH}" width="${W}" height="${totalH}">
<rect width="${W}" height="${totalH}" fill="${C.canvas}"/>
<text x="${MARGIN}" y="42" font-family="'IBM Plex Mono',monospace" font-size="10" letter-spacing="2" fill="${C.accent}">ARCHITECTURE STACK</text>
<text x="${MARGIN}" y="72" font-family="Georgia,serif" font-size="22" fill="${C.ink}">${esc(title)}</text>
<line x1="${MARGIN}" y1="${HEADER_H - 18}" x2="${W - MARGIN}" y2="${HEADER_H - 18}" stroke="${C.ink}" stroke-width="1.5"/>
${parts.join("\n")}
<line x1="${MARGIN}" y1="${totalH - footerH + 16}" x2="${W - MARGIN}" y2="${totalH - footerH + 16}" stroke="${C.line}"/>
<text x="${MARGIN}" y="${totalH - 26}" font-family="'IBM Plex Mono',monospace" font-size="9.5" fill="${C.inkMuted}">Composition of the stack, not the path a request takes through it.</text>
<text x="${MARGIN}" y="${totalH - 12}" font-family="'IBM Plex Mono',monospace" font-size="9.5" fill="${C.inkMuted}">Assembled ${today} · ${esc(url)} · ${esc(site.name)} · CC BY 4.0</text>
</svg>`;
}

/** Same content as a printable page, for readers who want to paste the lists. */
export function generateStackHtml(layers: ArchitectureLayer[], selection: Selection, title: string): string {
  const { sequential, rail } = prepare(layers, selection);
  const today = new Date().toISOString().slice(0, 10);
  const url = `${siteUrl}/architecture`;
  const svg = generateStackSvg(layers, selection, title);

  const rows = sequential
    .map(
      (r) =>
        `<tr><th scope="row">${esc(r.title)}</th><td>${r.names.map((n) => `<span>${esc(n)}</span>`).join("")}</td></tr>`,
    )
    .join("\n");

  const railRows = rail
    .map(
      (r) =>
        `<tr><th scope="row">${esc(r.title)}</th><td>${r.names.map((n) => `<span>${esc(n)}</span>`).join("")}</td></tr>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} — architecture stack</title>
<style>
  body{margin:0 auto;padding:3rem 1.5rem 5rem;max-width:64rem;background:#fff;color:#0c121a;
       font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  h1{font-size:1.6rem;margin:0 0 .35rem}
  h2{font-size:1.05rem;margin:2.5rem 0 .75rem;padding-bottom:.35rem;border-bottom:1px solid #d8dde4}
  .eyebrow{font:10px/1 ui-monospace,monospace;letter-spacing:2px;color:#c5800c;text-transform:uppercase;margin:0 0 .75rem}
  figure{margin:2rem 0;border:1px solid #d8dde4;padding:1rem;overflow-x:auto}
  figure svg{max-width:100%;height:auto;display:block}
  table{width:100%;border-collapse:collapse;font-size:.875rem;margin:.5rem 0 0}
  th,td{border:1px solid #d8dde4;padding:.55rem .7rem;text-align:left;vertical-align:top}
  th{background:#f1f3f6;width:15rem;font-weight:600}
  td span{display:inline-block;border:1px solid #b0b8c3;border-radius:2px;padding:.15rem .5rem;margin:.15rem .3rem .15rem 0}
  footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #d8dde4;font-size:.8125rem;color:#74808f}
  a{color:inherit}
  @media print{body{padding:0}}
</style></head><body>
<p class="eyebrow">Architecture stack</p>
<h1>${esc(title)}</h1>
<p style="color:#3d4857;margin:0">Composition of the stack — what it is made of, not the path a request takes through it.</p>
<figure>${svg}</figure>
<h2>Layers in order</h2>
<table><tbody>${rows}</tbody></table>
${railRows ? `<h2>Applied across every layer</h2><table><tbody>${railRows}</tbody></table>` : ""}
<footer>
  <p>Assembled ${today} with the stack builder at <a href="${esc(url)}">${esc(url)}</a>.</p>
  <p>Layer catalogue by ${esc(site.name)} · licensed CC BY 4.0 — reuse and adapt freely, with attribution.</p>
</footer>
</body></html>`;
}
