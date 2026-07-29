# Working on this repository

Source for **aleksandrsletin.com** — an independent notebook on enterprise AI
architecture. Next.js 14 (App Router), TypeScript strict, Tailwind, statically
generated, deployed on Vercel.

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
  projects/index.ts  The registry
  projects/case-NN-slug.ts

lib/                 Formatting, material generation, SVG export
```

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

- `tailoring` **supersedes** `openQuestions`. The template renders
  `openQuestions` only when `tailoring` is absent. New cases use `tailoring`:
  it names a parameter, the value assumed here, a plausible alternative, what
  the architecture becomes at that value, and why. It answers the only question
  a reader really has — *does any of this transfer to my situation?*
- `status` describes how finished the **analysis** is, never a product:
  `In analysis` · `Architecture note` · `Under revision` · `Open question`.
- Older case files (01, 03, 04, 05) use quoted JSON-style keys and carry a
  `// Generated content module` header — an artefact of how they were first
  exported. Case 02 is written in idiomatic TypeScript. Prefer the case-02 form
  for anything new, and convert the others when you are already editing them.

---

## Component constraints that content has to respect

These are not style preferences. Violating them produces visible breakage that
type checking will not catch.

**Roadmap: four phases maximum.** `RoadmapTimeline` maps phase counts 1–4 to
column classes and falls back to a four-column grid beyond that. Five phases
renders one card alone in a row of three empty grey cells. Either write four
phases or add a `5:` entry to `PHASE_COLUMNS` first.

**Block-diagram edge labels need room.** Adjacent nodes on the same row have a
52-pixel gap. Anything longer than roughly two short words overflows into the
neighbouring node's box. Type checking passes; the page looks broken. Put the
condition in the diagram `caption` instead, or label only the long diagonal
edges. Verify after adding one.

**Block-diagram node labels clip.** Boxes are `foreignObject`, which clips
rather than spills. A two-line title plus its `sub` currently occupies 76 of
78 available pixels. A third line vanishes silently. Keep titles to two or
three words and `sub` to a short phrase.

**Wide tables scroll inside their own container.** Never let the page body
scroll sideways. If a new table needs more width, it goes in the existing
overflow wrapper.

### Verifying diagrams

Type checking cannot see a label sitting on top of a box. After adding a
diagram, run the dev server and check geometry in the browser — measure whether
any connector path or edge label intersects a node rectangle, and check 375px
width as well as desktop. This has caught real bugs twice.

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
| 03 | Contract intelligence | Provenance — every extracted term cites its source | Document extraction, Azure |
| 04 | Meeting assistant | Attribution — turning speech into obligations without inventing them | Speech, Azure |
| 05 | Knowledge assistant | Permissions enforced inside retrieval | Permissioned RAG, Azure |

Case 02 is deliberately the inverse of case 01 and the only one that leaves
Azure on part of its path — that contrast is load-bearing, and it is what makes
Azure in the other four read as a choice rather than a default. Do not
"harmonise" it.

Still unwritten (`plannedCaseStudies`): invoice processing, predictive
maintenance, recruitment, supply chain, executive dashboard. Before writing any
of them, check they do not collapse into a lesson already owned above — several
of them will, as currently titled.

---

## Build discipline

```bash
npm run typecheck    # tsc --noEmit
npm run build        # catches what typecheck does not
npm run dev          # http://localhost:3000
```

Run `npm run build` before committing. Content is typed, so most content errors
surface there — but layout and diagram problems only surface in a browser.

Commit when asked; do not push unless asked.
