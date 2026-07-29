import type { ArchitectureLayer } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";

/**
 * Badge styling per necessity level.
 *
 * Only `required` carries the accent colour; the other two are neutral. That
 * is the whole visual argument of the grid — a reader scanning it sees at once
 * which layers are not optional, and the rest recede.
 *
 * Keying the record by `ArchitectureLayer["necessity"]` rather than by `string`
 * ties it to the type: adding a fourth level to the catalogue becomes a
 * compile error here, instead of an undefined lookup and an unstyled badge.
 */
const NECESSITY_STYLE: Record<ArchitectureLayer["necessity"], string> = {
  required: "border-accent/40 bg-accent/10 text-accent-deep",
  conditional: "border-line-strong bg-surface text-ink-soft",
  enterprise: "border-line-strong bg-raised text-ink-soft",
};

/**
 * One layer of the architecture catalogue, as a card in the explorer grid.
 *
 * A real `<button>`, not a styled `<div>` with a click handler. That gives
 * keyboard focus, Enter and Space activation, and the correct announcement to
 * a screen reader for free — all of which a div would need re-implementing by
 * hand, usually incompletely. `aria-haspopup="dialog"` warns in advance that
 * activating it opens a modal rather than navigating.
 *
 * The component is presentational: it renders and reports the click upward.
 * Which layer is open is state held by `ArchitectureExplorer`, so this file
 * needs no "use client" of its own.
 *
 * @param onOpen Called when the card is activated; the parent opens the modal.
 */
export function LayerCard({ layer, onOpen }: { layer: ArchitectureLayer; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full cursor-pointer flex-col justify-between rounded-card border border-line
                 bg-surface p-5 text-left transition-colors duration-200 hover:border-accent
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-micro text-ink-muted">
            {String(layer.order).padStart(2, "0")}
          </span>
          <span
            className={`rounded-card border px-2 py-0.5 font-mono text-micro uppercase tracking-wide ${NECESSITY_STYLE[layer.necessity]}`}
          >
            {NECESSITY_LABEL[layer.necessity]}
          </span>
        </div>

        <h3 className="font-display text-display-sm text-ink">{layer.title}</h3>
        <p className="mt-2 font-prose text-spec italic text-ink-soft">{layer.question}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
        {/* Singular for exactly one option — "1 options" is the kind of small
            wrongness that makes a page look unfinished. */}
        <span className="font-mono text-micro uppercase tracking-wide text-ink-muted">
          {layer.blocks.length} option{layer.blocks.length === 1 ? "" : "s"}
        </span>
        <span
          className="font-mono text-micro uppercase tracking-wide text-ink-soft transition-colors
                     duration-200 group-hover:text-accent"
        >
          View blocks →
        </span>
      </div>
    </button>
  );
}
