import type { BlockDiagram as BlockDiagramData, BlockEdge, BlockNodeDef } from "@/content/types";
import { cx } from "@/lib/format";

/*
 * Block diagram renderer.
 *
 * Two layers over one deterministic grid:
 *
 *   - an SVG layer, behind, carrying group containers and connectors
 *   - an HTML layer, in front, carrying the node boxes
 *
 * Nodes are HTML rather than SVG on purpose. SVG has no text wrapping, so an
 * all-SVG diagram means either measuring text or hand-breaking every label —
 * both fragile as soon as content changes. HTML boxes wrap, inherit the site's
 * type scale, and respond to the theme without a second set of colour values.
 *
 * The trade for that is fixed cell geometry: connector endpoints have to be
 * computed in pixels, so cells cannot be fluid. The container scrolls
 * horizontally on narrow screens instead.
 */

const CELL_W = 172;
const CELL_H = 78;
const GAP_X = 52;
const GAP_Y = 40;
const GROUP_PAD = 14;
const GROUP_LABEL_H = 18;

const x0 = (col: number) => col * (CELL_W + GAP_X);
const y0 = (row: number) => row * (CELL_H + GAP_Y) + GROUP_LABEL_H;
const w = (span = 1) => span * CELL_W + (span - 1) * GAP_X;

type Box = { x: number; y: number; w: number; h: number };

function boxOf(n: BlockNodeDef): Box {
  return { x: x0(n.col), y: y0(n.row), w: w(n.span), h: CELL_H };
}

/** Orthogonal connector between two boxes, with at most one bend. */
function connector(a: Box, b: Box): { d: string; mid: { x: number; y: number } } {
  const aCx = a.x + a.w / 2;
  const bCx = b.x + b.w / 2;
  const aCy = a.y + a.h / 2;
  const bCy = b.y + b.h / 2;

  // Same row — straight horizontal.
  if (Math.abs(aCy - bCy) < 2) {
    const fromX = bCx > aCx ? a.x + a.w : a.x;
    const toX = bCx > aCx ? b.x : b.x + b.w;
    return { d: `M ${fromX} ${aCy} L ${toX} ${aCy}`, mid: { x: (fromX + toX) / 2, y: aCy } };
  }

  // Same column — straight vertical.
  if (Math.abs(aCx - bCx) < 2) {
    const fromY = bCy > aCy ? a.y + a.h : a.y;
    const toY = bCy > aCy ? b.y : b.y + b.h;
    return { d: `M ${aCx} ${fromY} L ${aCx} ${toY}`, mid: { x: aCx, y: (fromY + toY) / 2 } };
  }

  // Otherwise leave vertically, turn once, arrive horizontally.
  const fromY = bCy > aCy ? a.y + a.h : a.y;
  const turnY = bCy;
  const toX = bCx > aCx ? b.x : b.x + b.w;
  return {
    d: `M ${aCx} ${fromY} L ${aCx} ${turnY} L ${toX} ${turnY}`,
    mid: { x: aCx, y: (fromY + turnY) / 2 },
  };
}

function groupBox(nodes: BlockNodeDef[]): Box {
  const boxes = nodes.map(boxOf);
  const minX = Math.min(...boxes.map((b) => b.x));
  const minY = Math.min(...boxes.map((b) => b.y));
  const maxX = Math.max(...boxes.map((b) => b.x + b.w));
  const maxY = Math.max(...boxes.map((b) => b.y + b.h));
  return {
    x: minX - GROUP_PAD,
    y: minY - GROUP_PAD - GROUP_LABEL_H,
    w: maxX - minX + GROUP_PAD * 2,
    h: maxY - minY + GROUP_PAD * 2 + GROUP_LABEL_H,
  };
}

export function BlockDiagramView({ d }: { d: BlockDiagramData }) {
  const byId = new Map(d.nodes.map((n) => [n.id, n]));

  const cols = Math.max(...d.nodes.map((n) => n.col + (n.span ?? 1)));
  const rows = Math.max(...d.nodes.map((n) => n.row + 1));
  const totalW = cols * CELL_W + (cols - 1) * GAP_X;
  const totalH = y0(rows - 1) + CELL_H + GROUP_PAD;

  const edges: (BlockEdge & { a: Box; b: Box })[] = d.edges.flatMap((e) => {
    const from = byId.get(e.from);
    const to = byId.get(e.to);
    if (!from || !to) return [];
    return [{ ...e, a: boxOf(from), b: boxOf(to) }];
  });

  return (
    <figure className="frame overflow-x-auto p-5 md:p-6">
      <div
        className="relative"
        style={{ width: totalW, height: totalH, minWidth: totalW }}
      >
        {/* Groups and connectors sit behind the boxes. */}
        <svg
          className="absolute inset-0"
          width={totalW}
          height={totalH}
          viewBox={`0 0 ${totalW} ${totalH}`}
          aria-hidden
        >
          <defs>
            <marker
              id={`arrow-${d.id}`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M1 1 L7 4 L1 7" fill="none" stroke="rgb(var(--line-strong))" strokeWidth="1.2" />
            </marker>
          </defs>

          {d.groups?.map((g) => {
            const members = g.nodes.map((id) => byId.get(id)).filter((n): n is BlockNodeDef => Boolean(n));
            if (members.length === 0) return null;
            const b = groupBox(members);
            return (
              <g key={g.label}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill="none"
                  stroke="rgb(var(--line))"
                  strokeDasharray="3 3"
                />
                <text
                  x={b.x + 8}
                  y={b.y + 13}
                  fill="rgb(var(--ink-muted))"
                  style={{ font: "500 9px var(--font-mono), monospace", letterSpacing: "0.1em" }}
                >
                  {g.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {edges.map((e, i) => {
            const { d: path, mid } = connector(e.a, e.b);
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgb(var(--line-strong))"
                  strokeWidth="1"
                  strokeDasharray={e.dashed ? "4 3" : undefined}
                  markerEnd={`url(#arrow-${d.id})`}
                />
                {e.label && (
                  <text
                    x={mid.x + 6}
                    y={mid.y - 4}
                    fill="rgb(var(--ink-muted))"
                    stroke="rgb(var(--canvas))"
                    strokeWidth="3"
                    paintOrder="stroke"
                    style={{ font: "9px var(--font-mono), monospace" }}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node boxes. */}
        {d.nodes.map((n) => {
          const b = boxOf(n);
          return (
            <div
              key={n.id}
              className={cx(
                "absolute flex flex-col justify-center border px-3",
                n.accent
                  ? "border-accent/60 bg-accent/[0.07]"
                  : n.muted
                  ? "border-dashed border-line bg-canvas"
                  : "border-line bg-raised",
              )}
              style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
            >
              <p
                className={cx(
                  "text-[0.8125rem] font-medium leading-tight",
                  n.muted ? "text-ink-muted" : "text-ink",
                )}
              >
                {n.t}
              </p>
              {n.sub && <p className="mt-1 font-mono text-[0.625rem] leading-tight text-ink-muted">{n.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* Text equivalent — the diagram is decorative to a screen reader. */}
      <figcaption className="sr-only">
        {d.title}. Nodes: {d.nodes.map((n) => n.t).join(", ")}. Connections:{" "}
        {d.edges
          .map((e) => {
            const a = byId.get(e.from)?.t ?? e.from;
            const b = byId.get(e.to)?.t ?? e.to;
            return `${a} to ${b}${e.label ? ` (${e.label})` : ""}`;
          })
          .join("; ")}
        .
      </figcaption>
    </figure>
  );
}
