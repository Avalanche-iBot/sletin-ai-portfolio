"use client";

import { useMemo, useState } from "react";
import type { ArchitectureLayer } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";
import { validate, PRESETS, type Selection } from "@/lib/builderRules";
import { cx } from "@/lib/format";

/**
 * Pick blocks, get told what is inconsistent about the result.
 *
 * Selection is plain toggles rather than drag-and-drop: dragging looks better
 * in a demo and is worse to use, especially on a phone, and the interesting
 * part was never the gesture. The findings panel is the actual content — see
 * lib/builderRules.ts, where every rule is a pure function with no model
 * behind it.
 */

const SEVERITY_STYLE = {
  error: "border-l-2 border-accent-deep",
  warning: "border-l-2 border-accent/60",
  info: "border-l-2 border-line-strong",
} as const;

const SEVERITY_LABEL = {
  error: "Contradiction",
  warning: "Worth deciding",
  info: "Note",
} as const;

export function ArchitectureBuilder({ layers }: { layers: ArchitectureLayer[] }) {
  const [selection, setSelection] = useState<Selection>({});
  const [openLayer, setOpenLayer] = useState<string | null>(null);

  const sorted = useMemo(() => [...layers].sort((a, b) => a.order - b.order), [layers]);
  const findings = useMemo(() => validate(selection, sorted), [selection, sorted]);
  const chosenCount = useMemo(() => Object.values(selection).flat().length, [selection]);

  function toggle(layerId: string, blockId: string) {
    setSelection((prev) => {
      const current = prev[layerId] ?? [];
      const next = current.includes(blockId)
        ? current.filter((b) => b !== blockId)
        : [...current, blockId];
      const updated = { ...prev, [layerId]: next };
      if (next.length === 0) delete updated[layerId];
      return updated;
    });
  }

  const errors = findings.filter((f) => f.severity === "error").length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      {/* Layers ------------------------------------------------------- */}
      <div className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Start from</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelection(p.selection)}
              title={p.rationale}
              className="border border-line-strong bg-surface px-3 py-1.5 font-mono text-micro uppercase tracking-wide text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {p.name}
            </button>
          ))}
          {chosenCount > 0 && (
            <button
              type="button"
              onClick={() => setSelection({})}
              className="px-2 py-1.5 font-mono text-micro uppercase tracking-wide text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>

        <ol className="divide-y divide-line border border-line">
          {sorted.map((layer) => {
            const picked = selection[layer.id] ?? [];
            const open = openLayer === layer.id;
            return (
              <li key={layer.id} className="bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenLayer(open ? null : layer.id)}
                  aria-expanded={open}
                  className="flex w-full items-baseline justify-between gap-4 p-4 text-left transition-colors hover:bg-raised"
                >
                  <span className="min-w-0">
                    <span className="font-mono text-micro text-ink-muted">
                      {String(layer.order).padStart(2, "0")}
                    </span>
                    <span className="ml-3 font-display text-base text-ink">{layer.title}</span>
                    {picked.length > 0 && (
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-accent-deep">
                        {picked
                          .map((id) => layer.blocks.find((b) => b.id === id)?.name)
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                    {picked.length > 0 ? `${picked.length} ▾` : layer.necessity === "required" ? "Required ▾" : "▾"}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-line bg-canvas p-4">
                    <p className="mb-4 max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
                      {layer.question} · {NECESSITY_LABEL[layer.necessity]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.blocks.map((b) => {
                        const active = picked.includes(b.id);
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => toggle(layer.id, b.id)}
                            aria-pressed={active}
                            title={b.cons[0]}
                            className={cx(
                              "border px-3 py-1.5 text-[0.8125rem] transition-colors",
                              active
                                ? "border-accent bg-accent/[0.08] text-ink"
                                : "border-line bg-surface text-ink-soft hover:border-ink-muted hover:text-ink",
                            )}
                          >
                            {b.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Findings ----------------------------------------------------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="frame p-5">
          <p className="eyebrow mb-1">What this says about the stack</p>
          <p className="mb-5 text-[0.8125rem] leading-relaxed text-ink-muted">
            {chosenCount === 0
              ? "Pick blocks, or load one of the starting points above."
              : `${chosenCount} block${chosenCount === 1 ? "" : "s"} selected · ${errors} contradiction${errors === 1 ? "" : "s"}`}
          </p>

          {chosenCount > 0 && findings.length === 0 && (
            <p className="border-l-2 border-accent pl-3 text-[0.875rem] leading-relaxed text-ink-soft">
              Nothing inconsistent found. That is not the same as good — these rules catch mechanical
              contradictions, not whether the design fits the problem.
            </p>
          )}

          <ul className="space-y-4">
            {findings.map((f) => (
              <li key={f.id} className={cx("pl-3", SEVERITY_STYLE[f.severity])}>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted">
                  {SEVERITY_LABEL[f.severity]}
                </p>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">{f.message}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-ink-muted">
            Every check here is a plain function over the selection — no model is involved. Most of what a
            reviewer catches on a first pass is mechanical, and this is an argument for saying so.
          </p>
        </div>
      </aside>
    </div>
  );
}
