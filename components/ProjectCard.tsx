import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ComplexityMeter, TagList } from "@/components/Primitives";
import { cx, STATUS_TONE } from "@/lib/format";

export function ProjectCard({ project, index }: { project: CaseStudy; index?: number }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group frame flex flex-col p-6 transition-colors duration-200 ease-precise hover:border-ink"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
          {typeof index === "number" ? String(index + 1).padStart(2, "0") : project.industry}
        </span>
        <span className={cx("border px-2 py-0.5 font-mono text-micro uppercase tracking-[0.08em]", STATUS_TONE[project.status])}>
          {project.status}
        </span>
      </div>

      <h3 className="font-display text-xl text-ink transition-colors group-hover:text-accent-deep">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
        {project.industry} · {project.domain}
      </p>

      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{project.shortSummary}</p>

      {project.impact && (
        <p className="mt-4 border-l-2 border-accent/50 pl-3 text-[0.8125rem] font-medium leading-snug text-ink">
          {project.impact}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <ComplexityMeter level={project.architectureComplexity} />
        <span className="font-mono text-micro uppercase tracking-[0.08em] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
          Read the note →
        </span>
      </div>

      <TagList tags={project.tags.slice(0, 4)} className="mt-4" />
    </Link>
  );
}
