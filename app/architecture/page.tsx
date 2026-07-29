import type { Metadata } from "next";
import { architectureLayers, architectureIntro } from "@/content/architecture";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";

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
    </div>
  );
}
