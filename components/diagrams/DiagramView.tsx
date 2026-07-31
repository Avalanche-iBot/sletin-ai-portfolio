import { cx } from "@/lib/format";
import type { Diagram, DiagramNode } from "@/content/types";
import { BlockDiagramView } from "@/components/diagrams/BlockDiagram";

/*
 * These are structured blocks rather than drawn diagrams.
 *
 * A drawn diagram forces every label through a fixed box, which means either
 * cutting the content down to fit or accepting crooked geometry. For content
 * this dense — nine layers, thirty-odd components, ten pipeline stages — the
 * information is worth more than the picture. So the renderers below lay the
 * same structure out as typographic blocks: grouped, ordered, aligned, and free
 * to be as long as they need to be.
 */

function NodeChip({ node }: { node: DiagramNode }) {
  return (
    <div
      className={cx(
        "border px-3 py-2.5",
        node.accent
          ? "border-accent/50 bg-accent/[0.06]"
          : node.muted
          ? "border-dashed border-line bg-transparent"
          : "border-line bg-raised",
      )}
    >
      <p className={cx("text-[0.8125rem] font-medium leading-snug", node.muted ? "text-ink-muted" : "text-ink")}>
        {node.t}
      </p>
      {node.sub && <p className="mt-1 font-mono text-[0.6875rem] leading-snug text-ink-muted">{node.sub}</p>}
    </div>
  );
}

/** Layered inventory: one labelled tier per row, components as chips. */
function LayersDiagram({ d }: { d: Extract<Diagram, { kind: "layers" }> }) {
  return (
    <div className="frame divide-y divide-line">
      {d.rows.map((row) => (
        <div key={row.label} className="grid gap-3 p-5 md:grid-cols-[8.5rem_1fr] md:gap-6">
          <p className="pt-1 font-mono text-micro uppercase leading-snug tracking-[0.1em] text-ink-muted">
            {row.label}
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {row.nodes.map((n, i) => (
              <NodeChip key={i} node={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Ordered path with its branch points.
 *
 * The steps are the spine; the branches are where the design actually lives, so
 * they get their own block with the condition and the consequence separated
 * rather than run together on one line.
 */
function FlowDiagram({ d }: { d: Extract<Diagram, { kind: "flow" }> }) {
  return (
    <div className="frame p-5 md:p-6">
      <ol className="space-y-2.5">
        {d.steps.map((step, i) => (
          <li key={i} className="flex items-stretch gap-3">
            <span
              className={cx(
                "flex w-8 shrink-0 items-center justify-center border font-mono text-micro",
                step.accent ? "border-accent bg-accent/[0.08] text-accent-deep" : "border-line text-ink-muted",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div
              className={cx(
                "flex-1 border px-4 py-3",
                step.accent ? "border-accent/50 bg-accent/[0.05]" : "border-line bg-raised",
              )}
            >
              <p className="text-[0.9375rem] font-medium leading-snug text-ink">{step.t}</p>
              {step.d && <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">{step.d}</p>}
            </div>
          </li>
        ))}
      </ol>

      {d.branches && d.branches.length > 0 && (
        <div className="mt-8 border-t border-line pt-6">
          <p className="eyebrow mb-1">Branches at the decision point</p>
          <p className="mb-5 max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
            One classification, three destinations. The split between them is what the running cost of the
            system is made of.
          </p>

          <div className="grid gap-4 lg:grid-cols-3">
            {d.branches.map((b, i) => (
              <div key={i} className="border border-line bg-raised p-4">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted">{b.at}</p>
                <p className="mt-2 font-display text-base leading-snug text-ink">{b.when}</p>
                <div className="my-3 h-px w-8 bg-accent" aria-hidden />
                <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{b.then}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Two-lane pipeline: what happens offline against what happens per request. */
function PipelineDiagram({ d }: { d: Extract<Diagram, { kind: "pipeline" }> }) {
  let counter = 0;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {d.lanes.map((lane) => (
        <div key={lane.label} className="frame flex flex-col p-5">
          <p className="font-mono text-micro uppercase leading-snug tracking-[0.1em] text-ink-soft">
            {lane.label}
          </p>
          <div className="mb-4 mt-3 h-px w-10 bg-accent" aria-hidden />

          <ol className="flex-1 space-y-2.5">
            {lane.steps.map((step) => {
              counter += 1;
              const n = counter;
              return (
                <li key={n} className="grid grid-cols-[1.75rem_1fr] gap-2 border-t border-line pt-2.5">
                  <span className="font-mono text-micro text-ink-muted">{String(n).padStart(2, "0")}</span>
                  <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{step}</p>
                </li>
              );
            })}
          </ol>

          {lane.note && (
            <p className="mt-4 border-t border-line pt-3 text-[0.75rem] leading-relaxed text-ink-muted">
              {lane.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Handoff trace, replacing the swimlane rendering.
 *
 * A swimlane needs width to be legible: five actors across meant every message
 * label collided with the next lifeline, and following one conversation required
 * scrolling sideways. The underlying information is a sequence of handoffs, so
 * it reads better as one — who passed what to whom, in order, with the decision
 * the system made about itself called out rather than buried as an arrow
 * pointing back at its own lane.
 */
function SequenceDiagram({ d }: { d: Extract<Diagram, { kind: "sequence" }> }) {
  return (
    <div className="frame p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="eyebrow mr-1">Participants</span>
        {d.actors.map((a, i) => (
          <span key={a} className="text-[0.8125rem] text-ink-soft">
            {a}
            {i < d.actors.length - 1 && <span className="ml-2 text-ink-muted">·</span>}
          </span>
        ))}
      </div>

      <ol className="space-y-0">
        {d.messages.map((m, i) => {
          const self = m.from === m.to;
          return (
            <li key={i} className="grid gap-2 border-t border-line py-4 md:grid-cols-[2rem_1fr] md:gap-4">
              <span className="font-mono text-micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>

              {/*
               * Handoff label sits above the message rather than in its own
               * column. A fixed column has to be wide enough for the longest
               * pair of actor names, and any name added later silently
               * overflows it into the message text — which is exactly what
               * "Orchestrator → Administrator" did at 11rem.
               */}
              <div className={self ? "border-l-2 border-accent pl-3" : undefined}>
                <p className="font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.06em] text-ink-muted">
                  {self ? (
                    <span className="text-accent-deep">{d.actors[m.from]} · decides</span>
                  ) : (
                    <>
                      {d.actors[m.from]}
                      <span aria-hidden className="mx-1.5">
                        &rarr;
                      </span>
                      {d.actors[m.to]}
                    </>
                  )}
                </p>

                <p
                  className={cx(
                    "mt-1.5 text-[0.9375rem] leading-snug",
                    self ? "font-medium text-ink" : "text-ink-soft",
                  )}
                >
                  {m.t}
                </p>
                {m.note && <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">{m.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function DiagramView({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="space-y-3">
      <figcaption className="font-mono text-micro uppercase tracking-[0.1em] text-ink-soft">
        {diagram.title}
      </figcaption>

      {diagram.kind === "blocks" && <BlockDiagramView d={diagram} />}
      {diagram.kind === "layers" && <LayersDiagram d={diagram} />}
      {diagram.kind === "flow" && <FlowDiagram d={diagram} />}
      {diagram.kind === "pipeline" && <PipelineDiagram d={diagram} />}
      {diagram.kind === "sequence" && <SequenceDiagram d={diagram} />}

      {diagram.caption && (
        <p className="max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">{diagram.caption}</p>
      )}
    </figure>
  );
}
