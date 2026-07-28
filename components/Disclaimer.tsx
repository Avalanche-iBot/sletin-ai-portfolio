/**
 * Disclaimers.
 *
 * Two variants, deliberately different in weight:
 *
 *  - `NoticeLine` is a single quiet sentence for the About page. It sets
 *    expectations without interrupting the reading.
 *  - `CaseNoteDisclaimer` is the formal notice that must appear before any
 *    case note. It is the single most load-bearing element on the site from a
 *    legal and employment point of view: it states plainly that these are
 *    educational analyses of hypothetical scenarios, so that no reader — and
 *    no current or former employer — can reasonably read a case note as a
 *    description of real internal work.
 *
 * Styled as a hairline notice rather than a coloured alert box: an alert would
 * read as a warning about the content. This is a statement of what the content
 * is.
 */

export function NoticeLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-accent/50 pl-4 text-[0.9375rem] leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}

export function CaseNoteDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-label="Notice about these case notes"
      className={compact ? "border border-line bg-raised/50 p-5" : "border border-line bg-raised/50 p-6 md:p-8"}
    >
      <p className="eyebrow mb-3">Notice</p>
      <div className="max-w-reading space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
        <p>
          These case notes are educational analyses. Each one is built from general industry
          knowledge, publicly available material and personal reasoning applied to a hypothetical
          scenario. They do not describe, and are not derived from, the internal systems, data,
          processes or projects of any organisation I have worked with or for.
        </p>
        <p>
          Any resemblance to a real organisation, system or engagement is coincidental. The
          architectures, estimates, cost models and figures shown are illustrative — they reflect
          how I reason about a class of problem, not a validated implementation.
        </p>
        <p>
          Nothing here constitutes consulting advice, and none of it represents the position of any
          employer, past or present. Where I have reached a conclusion, I have tried to show the
          reasoning that led there so it can be checked. Corrections, alternative approaches and
          outright disagreement are all welcome.
        </p>
      </div>
    </aside>
  );
}
