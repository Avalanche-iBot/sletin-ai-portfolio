import { cx, SEVERITY_TONE } from "@/lib/format";
import type { CaseStudy } from "@/content/types";

/**
 * KPIs as grouped cards rather than a table.
 *
 * A five-column table forced the KPI name into a two-character-wide column and
 * pushed the rationale off the page — the widest column carried the least
 * information. Grouping by category also removes the repetition of the category
 * on every row, and lets the reader take in one dimension of measurement at a
 * time.
 */
export function KpiTable({ rows }: { rows: NonNullable<CaseStudy["kpis"]> }) {
  const groups: { name: string; items: typeof rows }[] = [];
  for (const r of rows) {
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
                <span className={cx("font-mono text-micro uppercase tracking-[0.08em]", SEVERITY_TONE[r.severity])}>
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

export function TechSelectionTable({ rows }: { rows: NonNullable<CaseStudy["technologySelection"]> }) {
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
