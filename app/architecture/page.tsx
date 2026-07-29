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

export default function ArchitecturePage() {
  return (
    <div className="shell py-16 sm:py-24">
      <header className="max-w-reading">
        <p className="eyebrow mb-4">{architectureIntro.eyebrow}</p>
        <h1 className="font-display text-display-lg text-ink">{architectureIntro.title}</h1>
        <p className="mt-4 font-prose text-lg leading-relaxed text-ink-soft">{architectureIntro.dek}</p>
      </header>

      <div className="mt-12">
        <ArchitectureExplorer layers={architectureLayers} />
      </div>

      {/* Builder — the catalogue above, made selectable and checked. */}
      <section id="builder" className="mt-24 border-t border-line pt-16 scroll-mt-24">
        <header className="mb-10 max-w-reading">
          <p className="eyebrow mb-4">Try it against your own stack</p>
          <h2 className="font-display text-display-sm text-ink">Assemble a stack, see what contradicts</h2>
          <p className="mt-4 font-prose leading-relaxed text-ink-soft">
            The same catalogue, made selectable. Every check behind it is a plain function over the
            selection with no model involved — the claim being that a good deal of what a reviewer catches
            on a first pass is mechanical, and worth automating rather than admiring.
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
