# Working on this repository

Source for **aleksandrsletin.com** — an independent notebook on enterprise AI
architecture. Next.js 14 (App Router), TypeScript strict, Tailwind, statically
generated, built for Vercel.

**Not deployed yet.** The domain does not resolve, and that is a choice rather
than an oversight — it goes live when the author is happy with it. So anything
that can only be verified against a live site (structured data in Google's
tester, link previews on a social platform, the edge-runtime preview images on
real infrastructure) cannot be checked yet. Do not report those as working.

This file exists so a new session can be useful in its first ten minutes
instead of its fortieth. Read it before touching `content/`.

---

## What this site is, and what it is not

It publishes **case notes**: written analyses that take an operational problem
apart — context, discovery, constraints, options considered, the trade-offs
behind each decision, and what remains unresolved. The reasoning is the
artefact. Code, where it exists, is a consequence of it.

It is **not** a product portfolio and **not** a consultancy pitch. Nothing here
describes a real organisation's internal systems. Every scenario is
constructed, and the case notes say so in their own opening paragraph. Keep
that honesty — it is the site's whole credibility position, and marketing
language destroys it faster than anything else.

The site says openly that Claude Code helped write the code. That line stays.
It is a statement about the code, not about the analysis.

---

## Voice

The bar is set by `content/projects/case-01-*.ts`. Read a section of it before
writing anything. In short:

- **British spelling.** organisation, minimise, analysed, licence (noun).
- **First person for judgements, never for achievements.** "I have argued
  against it, but the argument rests on a risk appetite I assumed" — yes.
  "I successfully delivered" — no.
- **Numbers carry their derivation.** If a figure matters, the section using it
  shows where it came from and what changes if it is wrong. A number nobody can
  check is worse than no number.
- **Name what was rejected, and argue the rejected case properly.** Every
  `alternatives` entry needs a `caseFor` a reasonable person could actually
  hold. A straw man there is the fastest way to lose an architect reader.
- **Admit the limits.** `assumptionsToTest` is not a formality. If the business
  case rests on an unmeasured figure, say which one and say what happens if it
  is wrong.
- **No adjectives doing an argument's work.** Not "a robust, scalable,
  cutting-edge platform" — say what it does and why that shape.

Long em-dashed sentences are the house style. Match the surrounding prose.

### Notes are dated reasoning, not maintained documents

This one governs anything that will age: regulation, model pricing, vendor
capability, what a tool can do this quarter.

**Do not hedge to make a note evergreen.** Reach for the date instead. Write
"as at July 2026" and state plainly what was true then, at the precision you
actually have. A note softened until it survives every future amendment says
nothing, and saying nothing carefully is still saying nothing.

Case 01's cost section already does this — its prices are described as
"assumptions anchored to hosted pricing as it stood in mid-2026, not a quote",
with the formula given so the euros can be recomputed later. Copy that shape.

The reason is the site's whole premise. The artefact is the reasoning, and
reasoning happens at a moment, under the conditions of that moment. In ten
years the regulation will have moved and the prices will be absurd, and the
interesting thing will be exactly that: how somebody decided, with what was
known then. A note that tried to be timeless will have nothing to show.

Two consequences worth stating outright:

- **Do not retrofit an old note when the world changes.** It is a record. If a
  fact it rests on is superseded, that is information about the fact, not a
  defect in the note. Write a new note if the change is interesting enough.
- **A dated fact may not be the load-bearing spine.** The lesson has to be
  "here is how a constraint of this shape changes a design", illustrated by the
  constraint as it stood — not "the deadline is 2 December 2027". Date the
  facts; build on the reasoning.

---

## Architecture: content and presentation are separate

Everything readable lives in `content/`. Pages read from it. **Adding a case
note requires no change to any route or component.**

```
app/                 Routes (App Router)
  portfolio/[slug]/  The case-note template — renders a section iff it exists
  architecture/      The layer catalogue
  api/materials/     Generates downloadable CSV/HTML from case content

components/          Presentation only. No content strings.
  Primitives.tsx     Section, Prose, TagList, FactGrid, ComplexityMeter…
  DataTables.tsx     KPI, risk, technology-selection, stakeholder tables
  diagrams/          Diagram renderers (blocks / layers / flow / pipeline / sequence)

content/
  types.ts           The schema. Start here.
  site.ts            Nav, identity, the canonical URL
  projects/index.ts  Case-note registry
  projects/case-NN-slug.ts
  blog.ts            Post registry
  posts/NN-slug.ts   One post per file, same arrangement as the notes

lib/                 Formatting, material generation, SVG export
```

Post bodies render as plain text — there is no Markdown parser anywhere in the
template. Asterisks meant as emphasis appear on the page as asterisks. Give a
post structure through `heading`, `paragraphs` and `bullets` instead.

Every narrative section on `CaseStudy` is optional. The template renders a
section if and only if its content exists, so a note can ship partially written.

### Adding or replacing a case note

1. Write `content/projects/case-NN-your-slug.ts` exporting a `CaseStudy`.
2. Import it in `content/projects/index.ts` and add it to the array.
3. Remove its placeholder from `plannedCaseStudies` if it had one.
4. `npm run build` — a missing required field is a build error, not a blank space.

Routes, sitemap and the homepage pick it up automatically. Nothing else
references a slug, so renaming a case is those two files plus the filename.

### Schema notes worth knowing

- **`tailoring` is required in practice.** It names a parameter, the value
  assumed here, a plausible alternative, what the architecture becomes at that
  value, and why. It answers the only question a reader really has — *does any
  of this transfer to my situation?* All six notes carry it; the superseded
  `openQuestions` field has been removed from the schema entirely.
- **`assumptionsToTest`** is where honest doubt goes: what is assumed rather
  than measured, and which figure the whole case is most sensitive to.
- **`counterpart`** points at one other note this one is in dialogue with, plus
  a sentence saying what the pairing teaches. Only worth setting where the two
  genuinely disagree, or agree from opposite constraints. A slug with nothing
  behind it renders nothing, so it is safe to point at unwritten work.
- `status` describes how finished the **analysis** is, never a product:
  `In analysis` · `Architecture note` · `Under revision` · `Open question`.
- Content modules are ordinary TypeScript with unquoted keys. They were once
  spreadsheet exports and read like it; that conversion is finished, so do not
  reintroduce quoted keys or a "generated" banner.

---

## Component constraints that content has to respect

These are not style preferences. Violating them produces visible breakage that
type checking will not catch.

**Most of them are now checked automatically.** `npm run check:content` loads
every case note and applies the rules below. Run it after editing content —
`npm run check` does it together with the type check.

**Roadmap: six phases maximum, and the count must divide the columns.** The
grid is painted by showing a line-coloured container through one-pixel gaps, so
any cell the phases do not fill renders as a solid panel that reads as missing
content. `PHASE_COLUMNS` only ever uses a column count that divides the phase
count exactly, and that has to hold at *each* breakpoint — three phases in two
columns leaves a gap just as four columns would. Past six it falls back to a
single column.

**Block-diagram edge labels need room.** Adjacent nodes on the same row are
separated by exactly 52px. Labels render at 9px monospaced, so about eight
characters fit; anything longer draws across the node it points at. Put the
condition in the diagram `caption` instead, or label only the longer diagonal
edges.

**Block-diagram node labels clip.** Boxes are `foreignObject`, which clips
rather than spills, so an over-long label loses its last line without a trace.
A two-line title over a two-line `sub` already fills 76 of 78 pixels.

**Wide tables scroll inside their own container.** Never let the page body
scroll sideways. If a new table needs more width, it goes in the existing
overflow wrapper.

### What the checker cannot see

It reasons about geometry from the same constants the renderers use, which
makes it good at labels and grids and blind to everything else. It will not
notice a connector routed through the wrong gap, a diagram that is simply hard
to follow, or anything about the other four diagram kinds. For a new diagram —
particularly a `blocks` one — still open the page at desktop width and at
375px. If either renderer's layout constants change, update the copies at the
top of `scripts/check-content.mjs` too.

---

## Single sources of truth

- **Domain**: `site.url` in `content/site.ts`, re-exported as `siteUrl` (which
  applies the `NEXT_PUBLIC_SITE_URL` override). Metadata, sitemap, robots and
  the attribution line stamped into downloadable files all import it. Never
  write the domain literally anywhere.
- **Email**: `site.email`. The contact page imports it rather than repeating it.

---

## Portfolio map — read before proposing a new case

The point of five cases is five *different* problem classes. A case that
repeats another's architectural thesis is worth less than no case, because it
makes the whole set look templated. Check this table before starting one.

| # | Case | Architectural lesson it owns | Shape |
|---|------|------------------------------|-------|
| 01 | Patient communication | Deterministic routing in front of the model | Conversational, human-in-the-loop, Azure |
| 02 | Payment fraud decisioning | Hard real-time decision with no human available | Streaming + ML, hybrid on-prem/cloud, LLM excluded from the decision |
| 03 | Contract intelligence | Provenance proves the text, not the reading | Document extraction, agreement as the unit of truth, Azure |
| 04 | Meeting assistant | Whether it was a commitment has no ground truth until someone decides | Speech, consent as architecture, Azure |
| 05 | Knowledge assistant | Permissions inside the query; "current" depends on which asset asks | Permissioned RAG, applicability resolution, Azure |
| 06 | Turnaround execution | Reversibility, not confidence, decides what needs a human — one-way doors last | Agentic writes to four systems of record, no distributed transaction, Azure |

Notes 03, 04, 05 and 06 each turn on the same move, and it is the one worth
copying: find where the obvious mechanism is necessary and insufficient, then
build the design around the insufficiency. A citation that proves the quotation
and not the conclusion. An attribution that names a speaker and cannot say
whether a commitment existed. A revision that is current globally and wrong for
this asset. A compensating transaction for every action that has an inverse, and
several that do not.

Case 06 is the only one where the system acts rather than answers, and that is
its whole reason for existing. If a future note also writes to a system of
record, it needs a different lesson about doing so — repeating "some actions are
irreversible" in another setting is the templating failure this table exists to
prevent.

Case 02 is deliberately the inverse of case 01 and the only one that leaves
Azure on part of its path — that contrast is load-bearing, and it is what makes
Azure in the other five read as a choice rather than a default. Do not
"harmonise" it.

The four unwritten notes, what each is for and the specific way each could go
wrong, are in **[CONTENT_PLAN.md](CONTENT_PLAN.md)**. Read it before starting
one.

It also carries the coverage map the planned five were chosen against, which is
the operational form of the rule above: ten data types, ten problems, and four
notes where no language model does the work. A proposed note that cannot add a
row to that table is probably not worth writing.

Two constraints recorded there are easy to breach by accident. **The remaining
notes sit in industrial operations on purpose**, as 06 already does — a note is
only an asset if its author can defend its domain figures in conversation, and
that consideration outranks sector variety. Which means contrast has to come
from the problem rather than the industry label, and a new note that differs
only in setting is redundant however different its scenario looks.

That test now binds harder than it did, because 05 and 06 are both energy and
adjacent to each other in the reading order. They survive it on problem shape —
one answers questions and the other writes to systems of record — and the next
note has to clear the same bar rather than lean on a different plant.

---

## Build discipline

```bash
npm run check          # typecheck + content rules — run this after editing content
npm run build          # catches what neither of those does
npm run dev            # http://localhost:3000
npm run check:content  # the content rules alone
```

Run `npm run check` and `npm run build` before committing.

**Do not run `npm run build` while `npm run dev` is running.** They share
`.next`, and the build overwrites what the dev server is serving from — the
result is a dev server throwing `Cannot find module './682.js'` on every page,
which looks like a code fault and is not. Stop the dev server first, or clear
`.next` and restart it.

The link-preview images run on the edge runtime deliberately. The Node build of
the image library composes an invalid path to its bundled fallback typeface on
Windows and fails `npm run build` outright, so this is not a preference.

### Who does what

**Commit freely; never push.** The author pushes himself, and deploys when he
decides the site is ready rather than when a branch is green. Leave commits
sitting on `main` unpushed — that is the normal resting state here, not
something to tidy up.

Keep commits focused and their messages substantive. The history on this repo
is written to be read: what changed, and the reasoning that made the change
necessary. If a commit needs three unrelated things in it, it needs to be three
commits.

### What to work on next

06 is written. The queue, in order: **09 → 08 → 10 → 07.** The reasoning behind
that sequence is in `CONTENT_PLAN.md` under *Writing order* — it is not simply
the numbering, and 09 is deliberately early.

Before starting 08, re-verify the two regulatory dates flagged in its plan
entry. They moved once already during drafting.

06 also owes the blog a post — why some actions have no undo, and what that does
to an agent's design. Each note is meant to yield one, and this is the only
outstanding debt of that kind.
