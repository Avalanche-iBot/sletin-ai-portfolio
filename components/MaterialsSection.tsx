import type { CaseStudy } from "@/content/types";
import { availableMaterials } from "@/lib/materials";

/**
 * Download links for the generated materials, plus the colophon.
 *
 * Every file listed here is a transform of data the note already renders —
 * see lib/materials.ts. If a case study is missing a field (an early note
 * with no `risks` yet, say), that row just doesn't appear rather than
 * linking to an empty file.
 */
export function MaterialsSection({ project }: { project: CaseStudy }) {
  const materials = availableMaterials(project);
  if (materials.length === 0) return null;

  const primary = materials.find((m) => m.primary);
  const rest = materials.filter((m) => !m.primary);

  return (
    <div className="space-y-8">
      {primary && (
        <a
          href={`/api/materials/${project.slug}/${primary.kind}`}
          download
          className="group flex flex-col justify-between gap-4 border border-accent/60 bg-accent/[0.05] p-6 transition-colors hover:bg-accent/[0.09] sm:flex-row sm:items-center"
        >
          <div className="max-w-reading">
            <p className="font-display text-lg text-ink group-hover:text-accent-deep">{primary.label}</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{primary.description}</p>
          </div>
          <span className="shrink-0 font-mono text-micro uppercase tracking-[0.08em] text-accent-deep">
            .{primary.ext} &darr;
          </span>
        </a>
      )}

      {rest.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Or the tables on their own, as data</p>
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {rest.map((m) => (
              <a
                key={m.kind}
                href={`/api/materials/${project.slug}/${m.kind}`}
                download
                className="group flex flex-col justify-between gap-4 bg-surface p-5 transition-colors hover:bg-raised"
              >
                <div>
                  <p className="font-display text-base text-ink group-hover:text-accent-deep">{m.label}</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{m.description}</p>
                </div>
                <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                  .{m.ext} &darr;
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <p className="max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
        Generated from the data behind this note, so they stay consistent with it. Licensed CC BY 4.0 —
        reuse and adapt freely, with attribution.
      </p>

      <p className="max-w-reading border-l-2 border-accent/50 pl-4 text-[0.8125rem] leading-relaxed text-ink-muted">
        Written and directed by Aleksandr Sletin. Drafted with Claude (Anthropic). Built with Next.js, React
        and TypeScript.
      </p>
    </div>
  );
}
