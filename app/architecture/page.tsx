import type { Metadata } from "next";
import { architectureLayers, architectureIntro } from "@/content/architecture";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";
import { ArchitectureBuilder } from "@/components/architecture/ArchitectureBuilder";
import { CostModel } from "@/components/architecture/CostModel";

export const metadata: Metadata = {
  title: "Architecture — Layer Catalogue",
  description:
    "A reference catalogue of the layers that recur across enterprise AI systems, and the tool options available at each one.",
};

/**
 * The Architecture page, served at `/architecture`.
 *
 * A reference catalogue of the layers that recur across enterprise AI systems,
 * plus two tools built on the same data: a stack builder and a cost model.
 *
 * The page itself is a static Server Component; all three children are marked
 * "use client" because each is interactive. The catalogue they render comes
 * from `content/architecture.ts`, so a new layer or tool option is added there
 * and appears in all three at once.
 */
export default function ArchitecturePage() {
  return (
    <div className="shell py-16 sm:py-24">
      <header className="max-w-reading">
        <p className="eyebrow mb-4">{architectureIntro.eyebrow}</p>
        <h1 className="font-display text-display-lg text-ink">{architectureIntro.title}</h1>
        <p className="mt-4 font-prose text-lg leading-relaxed text-ink-soft">{architectureIntro.dek}</p>
      </header>

      {/*
       * Open, not a disclosure. The page carries three separate tools now, and
       * the two most useful sit a long way down — a reader who cannot see that
       * the builder exists will never scroll to find it.
       */}
      <nav aria-label="On this page" className="mt-10 border-y border-line py-4">
        <p className="eyebrow mb-3">On this page</p>
        <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {[
            { href: "#catalogue", n: "01", label: "The layer catalogue", note: "21 layers, with the options at each" },
            { href: "#builder", n: "02", label: "Stack builder", note: "Assemble yours, download the diagram" },
            { href: "#cost-model", n: "03", label: "Cost model", note: "What actually moves cost per request" },
          ].map((item) => (
            <li key={item.href}>
              <a href={item.href} className="group flex items-baseline gap-3">
                <span className="font-mono text-micro text-accent-deep">{item.n}</span>
                <span>
                  <span className="text-[0.9375rem] text-ink-soft group-hover:text-ink">{item.label}</span>
                  <span className="ml-2 hidden text-[0.8125rem] text-ink-muted lg:inline">{item.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div id="catalogue" className="mt-12 scroll-mt-24">
        <ArchitectureExplorer layers={architectureLayers} />
      </div>

      {/* Builder — the catalogue made selectable, and exportable. */}
      <section id="builder" className="mt-24 border-t border-line pt-16 scroll-mt-24">
        <header className="mb-10 max-w-reading">
          <p className="eyebrow mb-4">Use it on your own stack</p>
          <h2 className="font-display text-display-sm text-ink">Assemble a stack, take the diagram away</h2>
          <p className="mt-4 font-prose leading-relaxed text-ink-soft">
            Pick what your system actually uses and download the result as a diagram — for a slide, a
            handover document, or a conversation with someone who needs to see the shape of it. It is an
            hour of laying out boxes that you do not have to spend.
          </p>
          <p className="mt-3 font-prose text-[0.9375rem] leading-relaxed text-ink-muted">
            What it draws is the composition of a stack, not the path a request takes through it. Arrows
            would imply a call order the selection does not contain.
          </p>
        </header>

        <ArchitectureBuilder layers={architectureLayers} />
      </section>

      {/* Cost model — deliberately last; likely to move to its own page. */}
      <section id="cost-model" className="mt-24 border-t border-line pt-16 scroll-mt-24">
        <header className="mb-10 max-w-reading">
          <p className="eyebrow mb-4">Unit economics</p>
          <h2 className="font-display text-display-sm text-ink">What actually moves cost per request</h2>
          <p className="mt-4 font-prose leading-relaxed text-ink-soft">
            A single figure for &ldquo;cost per request&rdquo; hides more than it says. The inputs below are the
            ones that move it, and the largest lever is not in the model layer at all — it is the share of
            traffic that never reaches a model.
          </p>
        </header>

        <CostModel />
      </section>
    </div>
  );
}
