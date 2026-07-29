import type { ArchitectureLayer } from "@/content/architecture";
import { NECESSITY_LABEL } from "@/content/architecture";

const NECESSITY_STYLE: Record<ArchitectureLayer["necessity"], string> = {
  required: "border-accent/40 bg-accent/10 text-accent-deep",
  conditional: "border-line-strong bg-surface text-ink-soft",
  enterprise: "border-line-strong bg-raised text-ink-soft",
};

export function LayerCard({
  layer,
  onOpen,
}: {
  layer: ArchitectureLayer;
  onOpen: () => void;
}) {
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
