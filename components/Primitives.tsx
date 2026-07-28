import { cx, COMPLEXITY_LABEL } from "@/lib/format";
import type { Complexity, Fact, Point, NumberedPoint } from "@/content/types";

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  first,
  bare,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children?: React.ReactNode;
  className?: string;
  first?: boolean;
  /**
   * Drop the built-in `shell` container. Used where a page supplies its own
   * grid — a case note puts the contents rail and the sections in one shell,
   * so the sections must not re-apply the gutter and max width.
   */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cx(
        !bare && "shell",
        "py-14 md:py-20 scroll-mt-24",
        !first && "border-t border-line",
        className,
      )}
    >
      {(eyebrow || title) && (
        <div className="mb-8 max-w-3xl md:mb-10">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && <h2 className="font-display text-display-sm text-ink">{title}</h2>}
          {lede && <p className="prose-arch mt-4">{lede}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function ComplexityMeter({ level, label }: { level: Complexity; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex items-center gap-[3px]" role="img" aria-label={`Architecture complexity: ${COMPLEXITY_LABEL[level]}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cx("h-3 w-1.5", n <= level ? "bg-accent" : "bg-line")}
          />
        ))}
      </div>
      <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
        {label ?? COMPLEXITY_LABEL[level]}
      </span>
    </div>
  );
}

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-2", className)}>
      {tags.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Stacked label/value rows for a narrow column.
 *
 * `FactGrid` lays facts out 3-up, which works in a full-width block and breaks
 * down in a sidebar rail — labels wrap, values collide. This variant keeps one
 * fact per row with a hairline between, so the block stays readable at any
 * column width and the labels remain scannable.
 */
export function FactRows({ facts }: { facts: Fact[] }) {
  return (
    <dl className="divide-y divide-line">
      {facts.map((f, i) => (
        <div key={f.k} className={i === 0 ? "pb-3" : "py-3 last:pb-0"}>
          <dt className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{f.k}</dt>
          <dd className="mt-1.5 text-[0.9375rem] leading-snug text-ink">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FactGrid({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.k}>
          <dt className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{f.k}</dt>
          <dd className="mt-1 text-[0.9375rem] text-ink">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PointList({ points, numbered }: { points: (Point | NumberedPoint)[]; numbered?: boolean }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {points.map((p, i) => (
        <li key={i} className="frame p-5">
          <p className="mb-1.5 flex items-baseline gap-2 font-mono text-spec text-ink">
            {numbered && "n" in p && <span className="text-accent">{(p as NumberedPoint).n}</span>}
            <span className="font-semibold">{p.t}</span>
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{p.d}</p>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className="prose-arch max-w-reading">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-reading space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
