import { cx, SEVERITY_TONE } from "@/lib/format";
import type { CaseStudy } from "@/content/types";

export function KpiTable({ kpis }: { kpis: NonNullable<CaseStudy["kpis"]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="spec-table min-w-[640px]">
        <thead>
          <tr>
            <th>Category</th>
            <th>KPI</th>
            <th>Baseline</th>
            <th>Target</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((k, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                {k.category}
              </td>
              <td className="font-medium text-ink">{k.kpi}</td>
              <td className="whitespace-nowrap font-mono text-spec text-ink-muted">{k.baseline}</td>
              <td className="whitespace-nowrap font-mono text-spec text-accent-deep">{k.target}</td>
              <td className="max-w-xs">{k.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
              <td className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                {r.layer}
              </td>
              <td className="max-w-[14rem] font-medium text-ink">{r.choice}</td>
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
              <td className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.08em] text-accent-deep">
                {s.influence}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
