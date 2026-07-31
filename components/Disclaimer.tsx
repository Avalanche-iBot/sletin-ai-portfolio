/**
 * Disclaimers.
 *
 * Two variants, deliberately different in weight:
 *
 *  - `NoticeLine` is a single quiet sentence for the About page. It sets
 *    expectations without interrupting the reading.
 *  - `CaseNoteDisclaimer` is the formal notice, shown once on the case-study
 *    index at `/portfolio` rather than repeated inside every note. It states
 *    plainly that these are educational analyses of hypothetical scenarios, so
 *    that no reader — and no current or former employer — can reasonably read
 *    a case note as a description of real internal work.
 *
 *    It used to run inside each note's header too, which meant a reader who
 *    had already read it once on the index met it again at the top of every
 *    note they opened. One clear statement, met before the list of notes, does
 *    the same legal work without the repetition — a reader arriving at a note
 *    directly from a link still passed through the index's metadata and
 *    description on the way, which carry the same point in miniature.
 *
 * Styled as a hairline notice rather than a coloured alert box: an alert would
 * read as a warning about the content. This is a statement of what the content
 * is.
 *
 * It used to run to three paragraphs and was cut to two. Length was working
 * against it: a reader meets this before a single sentence of analysis, and a
 * wall of hedging reads as anxiety rather than as care. What survived is the
 * claim that actually does the legal work — the scenarios are constructed and
 * are not drawn from any employer's systems — plus the invitation to disagree.
 * What went was the restatement of the same point in other words ("any
 * resemblance is coincidental") and the disclaimer of consulting advice, which
 * the contact page already makes in a place where it is relevant.
 */

export function NoticeLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-accent/50 pl-4 text-[0.9375rem] leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}

export function CaseNoteDisclaimer() {
  return (
    <aside aria-label="Notice about these case studies" className="border border-line bg-raised/50 p-6 md:p-8">
      <p className="eyebrow mb-3">Notice</p>
      <div className="max-w-reading space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
        <p>
          Every scenario here is constructed. These notes are built from general industry knowledge
          and personal reasoning, and they do not describe the internal systems, data or projects of
          any organisation I have worked with or for. The figures are illustrative assumptions, not
          measurements from a running system.
        </p>
        <p>
          Where I have reached a conclusion I have tried to show the reasoning that led there, so it
          can be checked. Corrections and disagreement are welcome.
        </p>
      </div>
    </aside>
  );
}
