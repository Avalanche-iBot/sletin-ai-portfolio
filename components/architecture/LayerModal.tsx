"use client";

import { useEffect, useRef } from "react";
import type { ArchitectureLayer } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";

/**
 * The dialog showing one layer's tool options in full.
 *
 * Opened from a `LayerCard`; which layer is open is decided by
 * `ArchitectureExplorer`, so this component simply renders whatever it is
 * handed and reports that it wants to close.
 *
 * Most of the work here is the behaviour a dialog has to get right rather than
 * the markup — focus, the Escape key, and stopping the page behind from
 * scrolling. See the effect below.
 *
 * @param total Number of layers in the catalogue, for the "03 / 21" counter.
 *   Passed in rather than hard-coded, so adding a layer cannot leave the
 *   denominator quietly wrong.
 */
export function LayerModal({
  layer,
  total,
  onClose,
}: {
  layer: ArchitectureLayer;
  total: number;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Move focus into the dialog on open. Without this, a keyboard user's focus
    // stays on the page behind and tabbing walks the content underneath the
    // overlay instead of the dialog itself.
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    // Freeze the page behind, so scrolling inside the dialog does not carry on
    // scrolling the article once the dialog reaches its end.
    document.body.style.overflow = "hidden";

    // Runs when the dialog unmounts. The listener and the scroll lock are both
    // global, so failing to undo them here would leave the page permanently
    // unscrollable and stack a new listener on every open.
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/50 px-4 py-8 backdrop-blur-sm sm:py-16"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="layer-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-card border border-line bg-canvas shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-mono text-micro text-ink-muted">
                {String(layer.order).padStart(2, "0")} / {total}
              </span>
              <span className="rounded-card border border-line-strong px-2 py-0.5 font-mono text-micro uppercase tracking-wide text-ink-soft">
                {NECESSITY_LABEL[layer.necessity]}
              </span>
            </div>
            <h2 id="layer-modal-title" className="font-display text-display-md text-ink">
              {layer.title}
            </h2>
            <p className="mt-1 font-prose text-spec italic text-ink-soft">{layer.question}</p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer rounded-card border border-line p-2 text-ink-soft transition-colors
                       duration-200 hover:border-accent hover:text-accent focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-8">
          <p className="mb-6 max-w-reading font-prose text-base leading-relaxed text-ink-soft">
            {layer.summary}
          </p>

          <ul className="space-y-4">
            {layer.blocks.map((block) => (
              <li key={block.id} className="rounded-card border border-line p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg text-ink">{block.name}</h3>
                  {block.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-card border border-line-strong bg-raised px-2 py-0.5 font-mono text-micro uppercase tracking-wide text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 font-mono text-micro uppercase tracking-wide text-accent">Pros</p>
                    <ul className="space-y-1">
                      {block.pros.map((pro, i) => (
                        <li key={i} className="font-prose text-sm leading-snug text-ink-soft">
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-micro uppercase tracking-wide text-ink-muted">Cons</p>
                    <ul className="space-y-1">
                      {block.cons.map((con, i) => (
                        <li key={i} className="font-prose text-sm leading-snug text-ink-soft">
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {layer.note && (
            <div className="mt-6 rounded-card border border-accent/30 bg-accent/5 p-4">
              <p className="font-mono text-micro uppercase tracking-wide text-accent-deep">Note</p>
              <p className="mt-1 font-prose text-sm leading-relaxed text-ink-soft">{layer.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
