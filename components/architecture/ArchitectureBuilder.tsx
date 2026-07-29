"use client";

import { useMemo, useState } from "react";
import type { ArchitectureLayer } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";
import { generateStackSvg, generateStackHtml, type Selection } from "@/lib/stackDiagram";
import { cx } from "@/lib/format";

/**
 * Assemble a stack, take the diagram away.
 *
 * This is a time-saver, not an oracle. It does not grade the selection or
 * suggest what is missing — an architect using it already knows their own
 * constraints, and the hour they want back is the one spent laying boxes out
 * in Figma to show someone else.
 *
 * The preview is the exported file, rendered inline, so what appears on screen
 * is literally what downloads. It stays on a white card in both themes for the
 * same reason: the export has fixed colours, and previewing it in dark mode
 * would be showing something the reader is not going to get.
 */

const PRESETS: { id: string; name: string; selection: Selection }[] = [
  {
    id: "rag",
    name: "Document assistant",
    selection: {
      channel: ["channel.teams"],
      identity: ["identity.entra"],
      orchestration: ["orch.fastapi"],
      objectStorage: ["storage.sharepoint"],
      parsing: ["parse.docint"],
      embeddings: ["emb.azure"],
      vectorStore: ["vec.pgvector"],
      retrieval: ["ret.hybrid", "ret.reranker"],
      llm: ["llm.azureopenai"],
      database: ["db.postgres"],
      observability: ["obs.langfuse"],
      infrastructure: ["infra.azureapp"],
    },
  },
  {
    id: "predictive",
    name: "Predictive maintenance",
    selection: {
      channel: ["channel.teams"],
      identity: ["identity.entra"],
      orchestration: ["orch.fastapi"],
      messaging: ["msg.kafka"],
      database: ["db.timescale"],
      llm: ["llm.azureopenai"],
      observability: ["obs.otel"],
      humanInLoop: ["hitl.confirm"],
      infrastructure: ["infra.azureapp"],
    },
  },
  {
    id: "agentic",
    name: "Async document pipeline",
    selection: {
      channel: ["channel.web"],
      identity: ["identity.entra"],
      orchestration: ["orch.temporal"],
      agentFramework: ["agent.langgraph"],
      messaging: ["msg.servicebus"],
      objectStorage: ["storage.blob"],
      parsing: ["parse.docling"],
      embeddings: ["emb.azure"],
      vectorStore: ["vec.qdrant"],
      retrieval: ["ret.hybrid"],
      llm: ["llm.anthropic"],
      database: ["db.postgres"],
      guardrails: ["guard.deterministic"],
      observability: ["obs.langfuse"],
      humanInLoop: ["hitl.edit"],
      infrastructure: ["infra.azureapp"],
      secrets: ["secrets.keyvault"],
    },
  },
];

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ArchitectureBuilder({ layers }: { layers: ArchitectureLayer[] }) {
  const [selection, setSelection] = useState<Selection>({});
  const [openLayer, setOpenLayer] = useState<string | null>(null);
  const [title, setTitle] = useState("Untitled stack");

  const sorted = useMemo(() => [...layers].sort((a, b) => a.order - b.order), [layers]);
  const count = useMemo(() => Object.values(selection).flat().length, [selection]);
  const svg = useMemo(
    () => (count > 0 ? generateStackSvg(sorted, selection, title || "Untitled stack") : null),
    [sorted, selection, title, count],
  );

  function toggle(layerId: string, blockId: string) {
    setSelection((prev) => {
      const current = prev[layerId] ?? [];
      const next = current.includes(blockId) ? current.filter((b) => b !== blockId) : [...current, blockId];
      const updated = { ...prev, [layerId]: next };
      if (next.length === 0) delete updated[layerId];
      return updated;
    });
  }

  const slug = (title || "architecture-stack").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      {/* Selection ---------------------------------------------------- */}
      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Start from</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelection(p.selection);
                setTitle(p.name);
              }}
              className="border border-line-strong bg-surface px-3 py-1.5 font-mono text-micro uppercase tracking-wide text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {p.name}
            </button>
          ))}
          {count > 0 && (
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
                  className="flex w-full items-baseline justify-between gap-3 p-4 text-left transition-colors hover:bg-raised"
                >
                  <span className="min-w-0">
                    <span className="font-mono text-micro text-ink-muted">
                      {String(layer.order).padStart(2, "0")}
                    </span>
                    <span className="ml-3 font-display text-base text-ink">{layer.title}</span>
                    {picked.length > 0 && (
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-accent-deep">
                        {picked.map((id) => layer.blocks.find((b) => b.id === id)?.name).filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-mono text-micro text-ink-muted">{open ? "—" : "+"}</span>
                </button>

                {open && (
                  <div className="border-t border-line bg-canvas p-4">
                    <p className="mb-4 text-[0.8125rem] leading-relaxed text-ink-muted">
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

      {/* Preview and export ------------------------------------------- */}
      <div className="min-w-0">
        <div className="lg:sticky lg:top-24">
          <label className="mb-4 block">
            <span className="eyebrow">Diagram title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled stack"
              className="mt-2 w-full border border-line bg-surface px-3 py-2 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          </label>

          {svg ? (
            <>
              <div
                className="overflow-x-auto border border-line bg-white p-3"
                /* The export has fixed colours; this is a true preview of it. */
                dangerouslySetInnerHTML={{ __html: svg }}
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => download(svg, `${slug}.svg`, "image/svg+xml")}
                  className="border border-accent bg-accent/[0.08] px-4 py-2 font-mono text-micro uppercase tracking-wide text-accent-deep transition-colors hover:bg-accent/[0.14]"
                >
                  Download SVG &darr;
                </button>
                <button
                  type="button"
                  onClick={() =>
                    download(
                      generateStackHtml(sorted, selection, title || "Untitled stack"),
                      `${slug}.html`,
                      "text/html",
                    )
                  }
                  className="border border-line-strong bg-surface px-4 py-2 font-mono text-micro uppercase tracking-wide text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  Download page &darr;
                </button>
              </div>

              <p className="mt-4 max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
                The SVG stays sharp at any size and opens in Figma, Illustrator or a browser. The page version
                adds the same lists as text you can paste. Both carry the date and a link back, so the diagram
                still explains itself once it is in someone else&rsquo;s deck.
              </p>
            </>
          ) : (
            <div className="frame flex min-h-[16rem] items-center justify-center p-8">
              <p className="max-w-reading text-center text-[0.9375rem] leading-relaxed text-ink-muted">
                Pick the blocks your system actually uses, or load one of the starting points. The diagram
                appears here and downloads as SVG.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
