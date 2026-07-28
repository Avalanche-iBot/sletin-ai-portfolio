import { cx } from "@/lib/format";
import type { Diagram, DiagramNode } from "@/content/types";

function NodeChip({ node }: { node: DiagramNode }) {
  return (
    <div
      className={cx(
        "border px-3 py-2 text-left",
        node.accent
          ? "border-accent/50 bg-accent/[0.07] text-ink"
          : node.muted
          ? "border-dashed border-line text-ink-muted"
          : "border-line bg-raised text-ink"
      )}
    >
      <p className="text-[0.8125rem] font-medium leading-snug">{node.t}</p>
      {node.sub && <p className="mt-0.5 font-mono text-micro text-ink-muted">{node.sub}</p>}
    </div>
  );
}

function LayersDiagram({ d }: { d: Extract<Diagram, { kind: "layers" }> }) {
  return (
    <div className="frame overflow-x-auto p-5 md:p-6">
      <div className="min-w-[560px] space-y-3">
        {d.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[7rem_1fr] items-start gap-4">
            <span className="pt-2 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
              {row.label}
            </span>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {row.nodes.map((n, i) => (
                <div key={i} className="sm:min-w-[9.5rem] sm:flex-1">
                  <NodeChip node={n} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowDiagram({ d }: { d: Extract<Diagram, { kind: "flow" }> }) {
  return (
    <div className="frame p-5 md:p-6">
      <ol className="space-y-0">
        {d.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cx(
                  "flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-micro",
                  step.accent ? "border-accent bg-accent text-on-accent" : "border-line-strong text-ink-muted"
                )}
              >
                {i + 1}
              </span>
              {i < d.steps.length - 1 && <span className="my-1 w-px flex-1 bg-line" style={{ minHeight: "1.25rem" }} />}
            </div>
            <div className="pb-6">
              <p className="text-[0.9375rem] font-medium text-ink">{step.t}</p>
              {step.d && <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-muted">{step.d}</p>}
            </div>
          </li>
        ))}
      </ol>
      {d.branches && d.branches.length > 0 && (
        <div className="mt-2 space-y-2 border-t border-line pt-5">
          <p className="eyebrow mb-2">Conditional branches</p>
          {d.branches.map((b, i) => (
            <p key={i} className="text-[0.875rem] leading-relaxed text-ink-soft">
              <span className="font-mono text-micro uppercase text-ink-muted">at {b.at}</span>
              {" — if "}
              <span className="text-ink">{b.when}</span>
              {" → "}
              <span className="font-medium text-accent-deep">{b.then}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function PipelineDiagram({ d }: { d: Extract<Diagram, { kind: "pipeline" }> }) {
  return (
    <div className="frame overflow-x-auto p-5 md:p-6">
      <div className="grid min-w-[640px] grid-cols-3 gap-4">
        {d.lanes.map((lane) => (
          <div key={lane.label}>
            <p className="mb-3 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{lane.label}</p>
            <ol className="space-y-2">
              {lane.steps.map((s, i) => (
                <li key={i} className="border border-line bg-raised px-3 py-2 text-[0.8125rem] text-ink">
                  {s}
                </li>
              ))}
            </ol>
            {lane.note && <p className="mt-3 text-[0.8125rem] italic leading-relaxed text-ink-muted">{lane.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SequenceDiagram({ d }: { d: Extract<Diagram, { kind: "sequence" }> }) {
  return (
    <div className="frame overflow-x-auto p-5 md:p-6">
      <div className="min-w-[560px]">
        <div className="mb-4 grid" style={{ gridTemplateColumns: `repeat(${d.actors.length}, minmax(7rem, 1fr))` }}>
          {d.actors.map((a) => (
            <div key={a} className="text-center">
              <span className="border border-line-strong bg-raised px-2 py-1 font-mono text-micro uppercase tracking-[0.06em] text-ink">
                {a}
              </span>
            </div>
          ))}
        </div>
        <div className="relative" style={{ height: `${d.messages.length * 2.75}rem` }}>
          <div
            className="pointer-events-none absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${d.actors.length}, minmax(7rem, 1fr))` }}
          >
            {d.actors.map((a) => (
              <div key={a} className="mx-auto h-full w-px bg-line" />
            ))}
          </div>
          {d.messages.map((m, i) => {
            const cols = d.actors.length;
            const isSelf = m.from === m.to;
            const left = (Math.min(m.from, m.to) + 0.5) * (100 / cols);
            const right = isSelf ? left + (100 / cols) * 0.35 : (Math.max(m.from, m.to) + 0.5) * (100 / cols);
            const reverse = m.to < m.from;
            return (
              <div key={i} className="absolute w-full" style={{ top: `${i * 2.75}rem` }}>
                {isSelf ? (
                  <div
                    className="absolute h-3 rounded-r-full border border-l-0 border-ink-muted"
                    style={{ left: `${left}%`, width: `${right - left}%` }}
                  />
                ) : (
                  <>
                    <div
                      className="absolute h-px bg-ink-muted"
                      style={{ left: `${left}%`, width: `${right - left}%` }}
                    />
                    <div
                      className={cx(
                        "absolute -top-[3px] h-2 w-2 border-t border-ink-muted",
                        reverse
                          ? "left-0 -translate-x-1/2 rotate-[-45deg] border-r"
                          : "right-0 translate-x-1/2 rotate-[135deg] border-r"
                      )}
                      style={reverse ? { left: `${left}%` } : { left: `${right}%` }}
                    />
                  </>
                )}
                <p
                  className={cx(
                    "absolute -top-4 max-w-[12rem] whitespace-nowrap px-1 text-center font-mono text-micro text-ink",
                    isSelf ? "text-left" : "-translate-x-1/2"
                  )}
                  style={{ left: `${isSelf ? left : (left + right) / 2}%` }}
                >
                  {isSelf && <span className="mr-1 text-accent">↻</span>}
                  {m.t}
                </p>
                {m.note && (
                  <p
                    className="absolute top-2 max-w-[12rem] -translate-x-1/2 whitespace-normal px-1 text-center text-[0.6875rem] italic leading-tight text-ink-muted"
                    style={{ left: `${(left + right) / 2}%` }}
                  >
                    {m.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DiagramView({ diagram }: { diagram: Diagram }) {
  return (
    <figure>
      <p className="mb-3 font-mono text-spec font-medium text-ink">{diagram.title}</p>
      {diagram.kind === "layers" && <LayersDiagram d={diagram} />}
      {diagram.kind === "flow" && <FlowDiagram d={diagram} />}
      {diagram.kind === "pipeline" && <PipelineDiagram d={diagram} />}
      {diagram.kind === "sequence" && <SequenceDiagram d={diagram} />}
      {diagram.caption && (
        <figcaption className="mt-3 max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
