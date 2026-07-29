"use client";

import { useMemo, useState } from "react";
import type { ArchitectureLayer, Necessity } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";
import { LayerCard } from "./LayerCard";
import { LayerModal } from "./LayerModal";
import { DownloadSvgButton } from "./DownloadSvgButton";

/** Either a specific necessity level, or the unfiltered view. */
type FilterValue = "all" | Necessity;

/**
 * The filter buttons, in display order.
 *
 * Labels are pulled from `NECESSITY_LABEL` rather than typed out again, so the
 * buttons and the badges on the cards can never word the same category
 * differently.
 */
const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All layers" },
  { value: "required", label: NECESSITY_LABEL.required },
  { value: "conditional", label: NECESSITY_LABEL.conditional },
  { value: "enterprise", label: NECESSITY_LABEL.enterprise },
];

/**
 * The filterable grid of architecture layers, with a dialog for each.
 *
 * This component owns both pieces of state — the active filter and the open
 * layer — while `LayerCard` and `LayerModal` stay presentational. Keeping the
 * state in one place is why the children can be simple: they render what they
 * are given and report events upward.
 *
 * Note what the open layer is stored as: an id, not the layer object. Holding
 * the object would keep a stale copy alive if the catalogue ever changed
 * underneath; looking it up by id each render means the dialog always shows
 * current data.
 */
export function ArchitectureExplorer({ layers }: { layers: ArchitectureLayer[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Copied before sorting, because sort mutates in place and `layers` is a prop
  // — reordering it would be reaching into data this component does not own.
  const sorted = useMemo(() => [...layers].sort((a, b) => a.order - b.order), [layers]);

  // `useMemo` keeps these from being recomputed on every render, so clicking a
  // card does not re-sort and re-filter the whole catalogue. Each recomputes
  // only when something in its dependency list actually changes.
  const visible = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((l) => l.necessity === filter)),
    [sorted, filter],
  );
  const selectedLayer = useMemo(
    () => sorted.find((l) => l.id === selectedId) ?? null,
    [sorted, selectedId],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter layers by necessity">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={`cursor-pointer rounded-card border px-3 py-1.5 font-mono text-micro uppercase tracking-wide
                          transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas
                          ${
                            active
                              ? "border-accent bg-accent text-on-accent"
                              : "border-line-strong bg-surface text-ink-soft hover:border-accent hover:text-accent"
                          }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((layer) => (
          <LayerCard key={layer.id} layer={layer} onOpen={() => setSelectedId(layer.id)} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-reading font-prose text-sm text-ink-soft">
          Exports a clean, text-only stack diagram — layer names and order only, no block detail —
          for laying out in Figma.
        </p>
        <DownloadSvgButton layers={sorted} />
      </div>

      {/* Mounted only while a layer is selected, so the dialog's focus and
          scroll-lock effects run on open and unwind on close. */}
      {selectedLayer && (
        <LayerModal
          layer={selectedLayer}
          total={sorted.length}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
