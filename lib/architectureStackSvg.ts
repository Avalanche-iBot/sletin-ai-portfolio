// lib/architectureStackSvg.ts
//
// Generates a clean, text-only vertical stack diagram of the architecture
// layers for export to Figma. Deliberately excludes block-level content —
// this is a schema diagram, not a content dump. Colours are hard-coded hex
// (not CSS variables) because the file is meant to be opened outside the
// site, in Figma, where CSS custom properties would not resolve.
//
// NOTE ON COLOUR VALUES: accent is taken directly from the brief
// (rgb(197,128,12) light). ink/line/canvas are reasonable defaults matching
// the "engineering title block" direction described in the brief — swap the
// hex constants below if your actual globals.css values differ.

import type { ArchitectureLayer, Necessity } from "@/content/architecture";

const COLORS = {
  canvas: "#FBF9F5",
  ink: "#1C1917",
  inkSoft: "#57534E",
  line: "#E4DFD6",
  lineStrong: "#C9C2B4",
  accent: "#C5800C",
};

const NECESSITY_MARK: Record<Necessity, string> = {
  required: "REQ",
  conditional: "COND",
  enterprise: "ENT",
};

export function generateArchitectureStackSvg(layers: ArchitectureLayer[]): string {
  const sorted = [...layers].sort((a, b) => a.order - b.order);

  const rowHeight = 52;
  const rowGap = 10;
  const marginX = 32;
  const headerHeight = 92;
  const footerHeight = 40;
  const width = 720;
  const stackWidth = width - marginX * 2;

  const rows = sorted
    .map((layer, i) => {
      const y = headerHeight + i * (rowHeight + rowGap);
      const necessityLabel = NECESSITY_MARK[layer.necessity];
      const strokeColor = layer.necessity === "required" ? COLORS.accent : COLORS.lineStrong;

      return `
    <g>
      <rect x="${marginX}" y="${y}" width="${stackWidth}" height="${rowHeight}" rx="4"
            fill="${COLORS.canvas}" stroke="${strokeColor}" stroke-width="1.25" />
      <text x="${marginX + 16}" y="${y + rowHeight / 2 + 4}"
            font-family="'IBM Plex Mono', 'Courier New', monospace" font-size="12" fill="${COLORS.accent}">
        ${String(layer.order).padStart(2, "0")}
      </text>
      <text x="${marginX + 56}" y="${y + rowHeight / 2 + 5}"
            font-family="Georgia, 'Fraunces', serif" font-size="16" fill="${COLORS.ink}">
        ${escapeXml(layer.title)}
      </text>
      <text x="${marginX + stackWidth - 16}" y="${y + rowHeight / 2 + 4}" text-anchor="end"
            font-family="'IBM Plex Mono', 'Courier New', monospace" font-size="10" letter-spacing="1" fill="${COLORS.inkSoft}">
        ${necessityLabel}
      </text>
    </g>`;
    })
    .join("\n");

  const totalHeight =
    headerHeight + sorted.length * rowHeight + (sorted.length - 1) * rowGap + footerHeight;

  return `<svg viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${width}" height="${totalHeight}" fill="${COLORS.canvas}" />

  <text x="${marginX}" y="34" font-family="'IBM Plex Mono', monospace" font-size="11"
        letter-spacing="2" fill="${COLORS.accent}">ARCHITECTURE — LAYER STACK</text>
  <text x="${marginX}" y="60" font-family="Georgia, 'Fraunces', serif" font-size="22" fill="${COLORS.ink}">
    Enterprise AI system, 21 layers
  </text>
  <line x1="${marginX}" y1="74" x2="${width - marginX}" y2="74" stroke="${COLORS.line}" stroke-width="1" />

  ${rows}

  <line x1="${marginX}" y1="${totalHeight - footerHeight + 12}" x2="${width - marginX}" y2="${totalHeight - footerHeight + 12}"
        stroke="${COLORS.line}" stroke-width="1" />
  <text x="${marginX}" y="${totalHeight - 14}" font-family="'IBM Plex Mono', monospace" font-size="10"
        fill="${COLORS.inkSoft}">REQ = usually required · COND = conditional on pattern · ENT = enterprise-only</text>
</svg>`;
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
