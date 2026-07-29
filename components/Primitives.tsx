import { cx, COMPLEXITY_LABEL } from "@/lib/format";
import type { Complexity, Fact, Point, NumberedPoint } from "@/content/types";

/**
 * The building blocks every page is assembled from.
 *
 * These are the smallest reusable pieces of the design system: a section
 * wrapper, a few ways of listing facts, and the prose renderer. They hold no
 * state and fetch nothing — each one takes data from `content/` and returns
 * markup, which is why they can all be React Server Components (no "use client"
 * at the top of this file) and ship no JavaScript to the browser.
 *
 * The styling vocabulary they use — `shell`, `frame`, `eyebrow`, `tag`,
 * `prose-arch` — is defined once in `app/globals.css`, and the colour names
 * (`ink`, `line`, `accent`) are semantic tokens from `tailwind.config.ts` that
 * resolve differently in light and dark mode. Nothing here hard-codes a colour.
 */

/**
 * A titled band of page content, with a rule separating it from the one above.
 *
 * Every page is a stack of these. The three optional header slots are meant to
 * be used in order — `eyebrow` is the small mono kicker, `title` the heading,
 * `lede` the introductory paragraph — and the whole header block disappears if
 * neither eyebrow nor title is supplied, so a section can be pure content.
 *
 * `scroll-mt-24` matters for the table of contents: without it, clicking a
 * link would scroll the heading underneath the sticky site header, and the
 * reader would land on text that appears to start mid-sentence.
 */
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
  /** Anchor target, so the table of contents can link to this section. */
  id?: string;
  /** Small uppercase mono kicker above the title. */
  eyebrow?: string;
  title?: string;
  /** Introductory paragraph under the title. */
  lede?: string;
  children?: React.ReactNode;
  className?: string;
  /** Set on the first section of a page to suppress the top divider rule. */
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

/**
 * The 1–5 architecture-complexity rating, drawn as five bars plus a word.
 *
 * Bars up to `level` take the accent colour and the rest stay in the neutral
 * line colour, so the rating is legible at a glance without needing a number.
 *
 * The bars are decorative markup, not text, so a screen reader would otherwise
 * announce nothing at all. `role="img"` collapses them into a single element
 * and `aria-label` supplies the reading — meaning the rating is announced once
 * as "Architecture complexity: High" rather than as five anonymous spans.
 */
export function ComplexityMeter({ level, label }: { level: Complexity; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className="flex items-center gap-[3px]"
        role="img"
        aria-label={`Architecture complexity: ${COMPLEXITY_LABEL[level]}`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={cx("h-3 w-1.5", n <= level ? "bg-accent" : "bg-line")} />
        ))}
      </div>
      <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
        {label ?? COMPLEXITY_LABEL[level]}
      </span>
    </div>
  );
}

/**
 * Topic labels for a case study, as a wrapping row of chips.
 *
 * A `<ul>` rather than a row of `<span>`s because these are a list in substance
 * as well as in looks, and the tag text is unique per study, so it doubles as
 * a stable React key.
 */
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
 *
 * The `<dl>`/`<dt>`/`<dd>` markup is the point: these are term-definition
 * pairs, and the association survives for anyone reading with assistive
 * technology, which a grid of plain divs would lose.
 */
export function FactRows({ facts }: { facts: Fact[] }) {
  return (
    <dl className="divide-y divide-line">
      {facts.map((f, i) => (
        // The first row sits flush against whatever is above it; the rest are
        // padded on both sides so the dividing rules land centred between rows.
        <div key={f.k} className={i === 0 ? "pb-3" : "py-3 last:pb-0"}>
          <dt className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">{f.k}</dt>
          <dd className="mt-1.5 text-[0.9375rem] leading-snug text-ink">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The same label/value pairs as `FactRows`, laid out as a grid.
 *
 * Two columns on small screens widening to three, for use in a full-width
 * block. In a narrow sidebar reach for `FactRows` instead.
 */
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

/**
 * Titled paragraphs in bordered cards, two per row.
 *
 * With `numbered` set, each card leads with its step number in the accent
 * colour — used where the points are a sequence rather than an unordered set.
 *
 * The `"n" in p` check is a TypeScript narrowing trick: `points` may hold
 * either shape, and testing for the property proves to the compiler that this
 * particular item is a `NumberedPoint` before the number is read. It also
 * guards the render, so a plain `Point` passed with `numbered` set simply
 * shows no number rather than printing "undefined".
 */
export function PointList({
  points,
  numbered,
}: {
  points: (Point | NumberedPoint)[];
  numbered?: boolean;
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {points.map((p, i) => (
        // Index as key is safe here: these lists are static content, never
        // reordered, filtered or appended to after render.
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

/**
 * Render a body-copy string as paragraphs.
 *
 * Content in `content/` is written as plain multi-line strings rather than
 * HTML or Markdown, which keeps the content files free of markup and means
 * nothing author-supplied is ever injected as HTML. The one piece of structure
 * honoured is the blank line: splitting on two-or-more newlines turns the
 * usual prose convention into real `<p>` elements, so a single line break
 * inside a paragraph stays a soft wrap rather than becoming a new paragraph.
 */
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

/**
 * A bulleted list using a square accent marker instead of the browser default.
 *
 * The marker is a positioned `<span>` rather than a CSS `list-style`, because
 * the default bullet cannot be recoloured or squared off reliably across
 * browsers. `aria-hidden` keeps it out of the accessibility tree — the `<li>`
 * already conveys "list item", so announcing the decoration too would be
 * noise. `mt-[0.6em]` aligns it optically with the first line of text, which
 * `items-center` would not do once an item wraps to two lines.
 */
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
