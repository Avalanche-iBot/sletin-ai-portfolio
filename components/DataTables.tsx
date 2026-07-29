import { cx, SEVERITY_TONE } from "@/lib/format";
import type { CaseStudy } from "@/content/types";

/**
 * The four data blocks a case study can carry: KPIs, risks, technology
 * choices and stakeholders.
 *
 * They live together because they share one problem — dense tabular content on
 * a phone — and one solution. Three of them are real `<table>` elements with a
 * `min-w-*` inside an `overflow-x-auto` wrapper: the table keeps a width at
 * which its columns stay readable, and the wrapper scrolls sideways instead of
 * the whole page doing so. Squeezing the columns to fit instead would leave a
 * table technically visible and practically unreadable.
 *
 * The exception is `KpiTable`, which abandoned the table form entirely — see
 * its own note. Each component's prop type is derived from `CaseStudy` with
 * `NonNullable<…>`, because these sections are optional on a case study: the
 * page decides whether the data exists, and by the time a component is
 * rendered the value is known to be present.
 */

/**
 * KPIs as grouped cards rather than a table.
 *
 * A five-column table forced the KPI name into a two-character-wide column and
 * pushed the rationale off the page — the widest column carried the least
 * information. Grouping by category also removes the repetition of the category
 * on every row, and lets the reader take in one dimension of measurement at a
 * time.
 *
 * The grouping loop below folds *consecutive* rows sharing a category, rather
 * than collecting every matching row wherever it sits. That is deliberate: it
 * preserves the order the author wrote, and a category split across two places
 * in the content file renders as two groups — visible in the page, and so
 * fixable in the content, instead of being silently rearranged here.
 */
export function KpiTable({ kpis }: { kpis: NonNullable<CaseStudy["kpis"]> }) {
  const groups: { name: string; items: typeof kpis }[] = [];
  for (const r of kpis) {
    const last = groups[groups.length - 1];
    if (last && last.name === r.category) last.items.push(r);
    else groups.push({ name: r.category, items: [r] });
  }

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g.name}>
          <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-2">
            <h3 className="eyebrow">{g.name}</h3>
            <span className="font-mono text-micro text-ink-muted">{g.items.length}</span>
          </div>

          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            {g.items.map((r, i) => (
              <article key={i}>
                <p className="font-display text-base leading-snug text-ink">{r.kpi}</p>

                {/* Baseline → target. The arrow is decorative and hidden from
                    screen readers, which would otherwise announce it as the
                    word "right arrow" between two numbers. */}
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[0.8125rem]">
                  <span className="text-ink-muted">{r.baseline}</span>
                  <span aria-hidden className="text-ink-muted">
                    →
                  </span>
                  <span className="font-medium text-accent-deep">{r.target}</span>
                </p>

                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{r.why}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Identified risks with severity, consequence and mitigation.
 *
 * Severity is rendered as a coloured mono label rather than a badge, so the
 * column stays narrow; the colour comes from `SEVERITY_TONE` so the same word
 * never appears in two different shades across the site.
 *
 * `max-w-*` on the prose cells is what makes the table readable — without it a
 * single long mitigation sentence would stretch its column and crush the rest.
 * Rows are keyed by `r.n`, the author-assigned risk number, which is stable and
 * meaningful in a way an array index is not.
 */
export function RiskTable({ risks }: { risks: NonNullable<CaseStudy["risks"]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="spec-table min-w-[720px]">
        <thead>
          <tr>
            <th className="w-10">No.</th>
            <th>Risk</th>
            <th>Severity</th>
            <th>Consequence</th>
            <th>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r) => (
            <tr key={r.n}>
              <td className="font-mono text-spec text-ink-muted">{r.n}</td>
              <td className="max-w-[16rem] font-medium text-ink">{r.risk}</td>
              <td>
                <span
                  className={cx(
                    "font-mono text-micro uppercase tracking-[0.08em]",
                    SEVERITY_TONE[r.severity],
                  )}
                >
                  {r.severity}
                </span>
              </td>
              <td className="max-w-[14rem]">{r.consequence}</td>
              <td className="max-w-[16rem]">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * What was chosen at each layer of the stack, why, and what lost out.
 *
 * The rejected alternative is set in muted ink: it belongs in the record — a
 * decision without its discarded option is not a decision — but it should not
 * compete with the choice that was actually made. The layer name takes
 * `whitespace-nowrap` so short technical labels stay on one line and the eye
 * can run down the column.
 */
export function TechSelectionTable({
  rows,
}: {
  rows: NonNullable<CaseStudy["technologySelection"]>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="spec-table min-w-[720px]">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Choice</th>
            <th>Why</th>
            <th>Alternative considered</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap font-medium text-ink">{r.layer}</td>
              <td className="max-w-[14rem]">{r.choice}</td>
              <td className="max-w-[16rem]">{r.why}</td>
              <td className="max-w-[16rem] text-ink-muted">{r.alt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Who is affected by the system, what they want from it and what worries them.
 *
 * Narrower than the other tables because it carries four short columns rather
 * than five prose ones, so it needs less room before scrolling starts.
 */
export function StakeholderTable({ rows }: { rows: NonNullable<CaseStudy["stakeholders"]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="spec-table min-w-[640px]">
        <thead>
          <tr>
            <th>Stakeholder</th>
            <th>Interest</th>
            <th>Concern</th>
            <th>Influence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap font-medium text-ink">{s.role}</td>
              <td className="max-w-[14rem]">{s.interest}</td>
              <td className="max-w-[14rem]">{s.concern}</td>
              <td className="whitespace-nowrap">{s.influence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
