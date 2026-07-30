import type { CaseStudy } from "@/content/types";
import { DiagramView } from "@/components/diagrams/DiagramView";
import { readingMinutes } from "@/lib/format";

/**
 * The sixty-second version of a case note.
 *
 * These notes run to six or seven thousand words, and the honest consequence is
 * that almost nobody reads one end to end on a first visit. The previous entry
 * into a note was the executive summary, which is four paragraphs and is a
 * summary of the *situation* — useful once you have decided to read, useless
 * for deciding whether to.
 *
 * So this is not a summary. It is the three things a reader needs in order to
 * decide whether the next forty minutes are worth spending, and nothing else:
 *
 *  - **The verdict.** One sentence stating the architectural position. If a
 *    reader disagrees with it, that is the strongest possible reason to read
 *    on, and if they find it obvious they can leave without wasting an hour.
 *  - **One diagram.** The request-path diagram from the solution design, which
 *    is the densest single artefact in any of these notes — it shows the shape
 *    of the answer without the argument for it.
 *  - **What changes the answer.** Just the parameters from `tailoring`, with
 *    the value assumed here and the alternative. This is what tells somebody
 *    whether the note is about their situation or a different one, which is the
 *    only question a stranger actually has.
 *
 * Everything rendered here is already in the note. Nothing is written twice, so
 * the brief cannot drift out of step with the note it introduces — which is the
 * failure mode of every hand-written summary.
 */
export function NoteInBrief({ project }: { project: CaseStudy }) {
  const verdict = project.executiveSummary?.verdict;
  const diagram = project.solutionDesign?.flowDiagram;
  const tailoring = project.tailoring;

  // With none of the three there is nothing to show that the header did not
  // already say, and an empty frame is worse than no frame.
  if (!verdict && !diagram && !tailoring) return null;

  const minutes = readingMinutes(project);

  return (
    <section aria-labelledby="in-brief" className="border-b border-line bg-raised/40">
      <div className="shell py-12 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p id="in-brief" className="eyebrow">
            The short version
          </p>
          <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
            Full note: about {minutes} minutes
          </p>
        </div>

        {verdict && (
          <p className="mt-6 max-w-3xl border-l-2 border-accent pl-5 font-display text-2xl leading-snug text-ink md:text-3xl">
            {verdict}
          </p>
        )}

        {/*
         * Hidden below `sm`, and that is the whole reason the class is here.
         * The block renderer falls back to a numbered list of every node on a
         * narrow screen — correct for the section further down, useless here,
         * where it turned a glance into 968px of scrolling on a phone. A reader
         * who commits to the note meets the same diagram in its own section.
         *
         * Scoped so its arrowhead marker id stays distinct from that copy.
         */}
        {diagram && (
          <div className="mt-10 hidden sm:block">
            <DiagramView diagram={diagram} scope="brief" />
          </div>
        )}

        {tailoring && tailoring.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow mb-1">Whether it applies to you</p>
            <p className="mb-5 max-w-reading text-[0.8125rem] leading-relaxed text-ink-muted">
              Each decision below rests on one of these. Where your value differs, the architecture
              should too — the full section at the end says what it becomes and why.
            </p>
            {/*
             * The parameter alone is what a stranger is scanning for: it either
             * names their situation or it does not. The two values are the
             * evidence for that and are shown from `sm` up, where a two-column
             * grid can carry them without turning this into its own article.
             */}
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {tailoring.map((t, i) => (
                <div key={i} className="bg-surface px-5 py-4">
                  <dt className="font-display text-[0.9375rem] leading-snug text-ink">{t.parameter}</dt>
                  <dd className="mt-2 hidden space-y-1 text-[0.8125rem] leading-snug sm:block">
                    <p className="text-ink-soft">
                      <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                        Here
                      </span>{" "}
                      {t.hereValue}
                    </p>
                    <p className="text-ink">
                      <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                        Instead
                      </span>{" "}
                      {t.altValue}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="mt-8 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
          The reasoning follows ↓
        </p>
      </div>
    </section>
  );
}
