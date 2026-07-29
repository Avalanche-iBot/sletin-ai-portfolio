"use client";

import { useMemo, useState } from "react";
import type { ArchitectureLayer, Necessity } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";
import { LayerCard } from "./LayerCard";
import { LayerModal } from "./LayerModal";
import { DownloadSvgButton } from "./DownloadSvgButton";

type FilterValue = "all" | Necessity;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All layers" },
  { value: "required", label: NECESSITY_LABEL.required },
  { value: "conditional", label: NECESSITY_LABEL.conditional },
  { value: "enterprise", label: NECESSITY_LABEL.enterprise },
];

export function ArchitectureExplorer({ layers }: { layers: ArchitectureLayer[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sorted = useMemo(() => [...layers].sort((a, b) => a.order - b.order), [layers]);
  const visible = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((l) => l.necessity === filter)),
    [sorted, filter]
  );
  const selectedLayer = useMemo(
    () => sorted.find((l) => l.id === selectedId) ?? null,
    [sorted, selectedId]
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

      {selectedLayer && <LayerModal layer={selectedLayer} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
