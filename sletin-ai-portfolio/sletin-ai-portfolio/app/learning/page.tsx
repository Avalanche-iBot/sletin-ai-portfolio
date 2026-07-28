import type { Metadata } from "next";
import { learning } from "@/content/learning";
import { Section } from "@/components/Primitives";
import { cx } from "@/lib/format";

export const metadata: Metadata = { title: "Learning Journey" };

const STATE_LABEL: Record<string, string> = {
  solid: "Solid",
  building: "Building",
  next: "Next",
  later: "Later",
};

const STATE_TONE: Record<string, string> = {
  solid: "bg-accent",
  building: "bg-accent/60",
  next: "bg-line-strong",
  later: "bg-line",
};

export default function LearningPage() {
  const grouped = learning.skills.reduce<Record<string, typeof learning.skills>>((acc, s) => {
    (acc[s.group] ??= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <Section first eyebrow={learning.eyebrow} title={learning.title} lede={learning.lede}>
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-5">
          {[
            { v: `${learning.totals.scheduled}h`, l: "Scheduled" },
            { v: `${learning.totals.target}h`, l: "Target" },
            { v: `${learning.totals.remaining}h`, l: "Remaining" },
            { v: `${learning.totals.hoursPerWeek}h`, l: "Per week" },
            { v: `${learning.totals.sprintWeeks} wk`, l: "Current sprint" },
          ].map((s) => (
            <div key={s.l} className="bg-canvas px-4 py-5">
              <p className="font-display text-xl text-ink">{s.v}</p>
              <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Current sprint" title={learning.sprint.label}>
        <div className="space-y-10">
          {Object.entries(grouped).map(([group, skills]) => (
            <div key={group}>
              <p className="eyebrow mb-4">{group}</p>
              <div className="space-y-4">
                {skills.map((s) => {
                  const pct = Math.min(100, Math.round((s.scheduled / s.target) * 100));
                  return (
                    <div key={s.name}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-[0.9375rem] font-medium text-ink">{s.name}</span>
                        <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                          <span className={cx("h-1.5 w-1.5 rounded-full", STATE_TONE[s.state])} />
                          {STATE_LABEL[s.state] ?? s.state}
                          <span className="text-ink-muted">
                            {s.scheduled}h / {s.target}h
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-raised">
                        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Tracks" title="Three parallel tracks">
        <div className="grid gap-6 md:grid-cols-3">
          {learning.tracks.map((t) => (
            <div key={t.t} className="frame p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-lg text-ink">{t.t}</p>
                <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                  {STATE_LABEL[t.state] ?? t.state}
                </span>
              </div>
              <ul className="space-y-2">
                {t.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[0.875rem] text-ink-soft">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Milestones" title="Where this is heading">
        <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {learning.milestones.map((m) => (
            <li key={m.q} className="bg-surface p-5">
              <p className="font-mono text-spec font-semibold text-accent-deep">{m.q}</p>
              <p className="mt-2 font-display text-base text-ink">{m.t}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{m.d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
