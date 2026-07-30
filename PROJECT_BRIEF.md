# Project brief — aleksandrsletin.com

**Paste this file into a new Claude conversation to bring it up to speed.**
It is written to be self-contained: a chat without access to the repository
should be able to give useful help from this alone.

Last updated: 30 July 2026.

---

## What the site is

An independent notebook on enterprise AI architecture, published at
**aleksandrsletin.com**. It carries **case notes** — written analyses that take
an operational problem apart: context, discovery, constraints, the options
considered, the trade-offs behind each decision, and what stays unresolved.

The reasoning is the product. There is no software being sold, no client being
described, and no engagement being reported. Every scenario is constructed, and
each case note says so in its own opening paragraph.

**Audience:** AI solution architects, CTOs and CEOs evaluating whether the
author thinks clearly about this class of problem.

**Positioning trap to avoid:** anything that reads as a consultancy pitch or a
product portfolio. The site's credibility rests on being visibly honest about
what is assumed, what is unmeasured and what might be wrong. Marketing register
destroys that in one paragraph.

The site states openly that Claude Code helped write the code. That stays — it
is a statement about the code, not about the analysis.

---

## Stack

Next.js 14 (App Router) · TypeScript strict · Tailwind with CSS-variable
theming (light/dark) · statically generated · Vercel.

Content and presentation are strictly separated. Everything readable lives in
`content/` as typed TypeScript modules; pages read from it. **Adding a case note
requires no change to any route or component** — write the file, register it in
`content/projects/index.ts`, done.

```
app/                 Routes. portfolio/[slug]/ is the case-note template.
components/          Presentation only — no content strings.
  diagrams/          blocks · layers · flow · pipeline · sequence renderers
content/
  types.ts           The schema — the contract between content and pages
  site.ts            Nav, identity, canonical URL
  projects/          index.ts registry + one file per case note
lib/                 Formatting, downloadable-material generation, SVG export
```

Every narrative section on the `CaseStudy` type is optional. The template
renders a section if and only if its content exists, so a note can be published
partially written and filled in over time.

---

## Current state

**Not deployed.** `aleksandrsletin.com` does not resolve — no DNS record at all,
checked 30 July 2026. The site is built for Vercel and the canonical URL is set
throughout, but nothing is live and that is deliberate: the author will deploy
when he is satisfied with it, not before.

Two consequences worth carrying into any session. Everything SEO-related —
structured data, sitemap, canonical links, link-preview images — is correct and
currently inert, so there is no point checking anything against Google or a
social platform. And the link-preview images have never run outside a local
machine: they use the edge runtime and fetch fonts at request time, so their
behaviour on a real deployment is genuinely unverified.

**Six case notes written, four planned.** The portfolio index shows the
planned ones as titles so the published count stays honest.

| # | Case | The architectural lesson it owns | Shape |
|---|------|----------------------------------|-------|
| 01 | AI Patient Communication Platform *(flagship)* | Deterministic routing in front of the model — most volume should never reach it | Conversational · human-in-the-loop · Azure |
| 02 | Real-Time Payment Fraud Decisioning | A hard real-time decision with no human available, and what safety means without one | Streaming + ML · hybrid on-prem/cloud · LLM deliberately excluded from the decision |
| 03 | AI Contract Intelligence | Provenance proves the text and not the reading — and the gap is where the design lives | Document extraction · agreement as the unit of truth · Azure |
| 04 | AI Meeting Assistant | Whether a remark was a commitment has no ground truth until its owner decides | Speech · consent as architecture · Azure |
| 05 | Enterprise Knowledge Assistant | Permissions belong in the query, and "current" is a relation between document, asset and date | Permissioned RAG · applicability resolution · Azure |
| 06 | Order Intake from Email | "The usual" is not in the email — it is in the account | Email intake · history before catalogue · **AWS** |

Notes 03, 04 and 05 all turn on the same move: find where the obvious mechanism
is necessary and insufficient, then build around the insufficiency. It is the
difference between a note that describes a design and one worth arguing with.

**06 is the light one and is meant to stay light** — 5,700 words against a set
average of 7,700, complexity 2 where the rest are 4 or 5, and the only note built
on AWS. It is the second occupant of that slot. The first, "Agentic Turnaround
Execution", was withdrawn after drafting: not for being wrong but for being
unreadable — two specialist domains stacked on each other, a thesis that needed
three moves to land, and no story anywhere in it. `CONTENT_PLAN.md` records why,
and the constraints the current note is built to.

**Planned, not yet written**, each scoped around a lesson none of the six owns:

| # | Note | The lesson it owns | Setting · data · model |
|---|------|--------------------|------------------------|
| 07 | AI Spare Parts Planning | The decision is the product, not the prediction — and planner overrides are data, not disobedience | Industrial operations · time series · no LLM |
| 08 | Fatigue Risk and Fitness for Duty | A regulated decision about a person, where the safety case and the privacy case point in opposite directions | Safety-critical operations · physiological data · no LLM |
| 09 | Edge Vision for Asset Integrity | Inference where you cannot observe it, cannot easily update it, and nobody will tell you it was wrong | Remote assets · images · no LLM |
| 10 | AI-Assisted Legacy Modernisation | Verifying generated output against a running system that is itself the ground truth | Production accounting · source code · LLM |

The four named above sit in industrial operations, which reverses an earlier
plan for maximum sector spread. The reason is that a case note is only an
asset if its author can defend it in conversation: the architecture reasoning
transfers anywhere, the domain figures do not, and it is the figures people probe.

The cost is that five of ten notes end up industrial, so the portfolio reads as
a specialist's rather than a generalist's. The coverage that matters survives —
ten data types, ten problems, and four notes where no language model does the
work. Sector spread was only ever a proxy for problem spread.

`CONTENT_PLAN.md` carries the full reasoning, the material each note turns on,
and the specific way each could go wrong in the writing.

**Blog:** nine posts, all written, no placeholders — around 14,000 words in
total, averaging 1,550 each. They live one per file in `content/posts/`, with
`content/blog.ts` as the registry, the same arrangement as the case notes.

Reading order is array order rather than date, and the sequence is an argument:
the method piece explains what the site is before anything else asks to be
taken seriously. Each post is drawn from a case note — the one argument in it
that stands alone — which keeps the two consistent and halves the work. Invent
a post separately and it will eventually contradict the note it came from.

### The rule that governs new cases

The value of five cases is that they are five *different* problem classes. A
case that repeats another's architectural thesis is worth less than no case,
because it makes the whole set look templated.

This was a real problem: case 02 was originally an AI customer-support desk,
which turned out to be case 01 again under a different industry label — same
deterministic-first routing, same human-in-the-loop escalation, same Azure
OpenAI plus AI Search stack, same cost-per-message framing. It was rewritten
from scratch as payment fraud decisioning specifically to invert case 01: where
case 01 concludes "when unsure, hand it to a person", case 02 has 40
milliseconds and no person to hand it to.

Case 02 is also the only case that leaves Azure on part of its path — a hybrid
split, with the decision path co-located with the payment switch and everything
else in cloud. That contrast is load-bearing: it is what makes Azure in the
other four read as a choice rather than as the only thing the author knows.

---

## Voice

The bar is case 01. In short:

- **British spelling** — organisation, minimise, analysed, licence (noun).
- **First person for judgements, never for achievements.** "I have argued
  against it, but the argument rests on a risk appetite I assumed" — yes.
  "I successfully delivered" — no.
- **Numbers carry their derivation.** If a figure matters, the section using it
  shows where it came from and what changes if it is wrong.
- **Argue the rejected options properly.** Every alternative needs a case *for*
  that a reasonable person could hold. A straw man loses an architect reader
  immediately.
- **State the limits.** Each case carries an `assumptionsToTest` list naming
  what is assumed rather than measured — including the figures the business
  case is most sensitive to.
- **No adjectives doing an argument's work.**

Long em-dashed sentences are the house style.

---

## Schema notes

- `tailoring` names a parameter, the value assumed here, a plausible
  alternative, what the architecture becomes at that value, and why. It answers
  the reader's real question: *does this transfer to my situation?* All six
  notes carry it; the superseded `openQuestions` field is gone from the schema.
- `assumptionsToTest` holds the honest doubt — what is assumed rather than
  measured, and which figure the case is most sensitive to.
- `counterpart` points at one other note this one argues with, plus a sentence
  saying what the pairing teaches.
- `status` describes how finished the **analysis** is, never a product:
  `In analysis` · `Architecture note` · `Under revision` · `Open question`.
- Content modules are ordinary TypeScript with unquoted keys. They began as
  spreadsheet exports and read like it; that conversion is finished.

---

## Constraints that break the page silently

Type checking catches none of these, so `npm run check:content` does most of it
instead — it loads every note and applies the geometry rules the renderers use.

- **Roadmap: six phases maximum, and the count must divide the columns.** The
  grid shows a line-coloured container through one-pixel gaps, so an unfilled
  cell renders as a solid panel that reads as missing content. This has to hold
  at each breakpoint: three phases in two columns leaves a gap exactly as four
  columns would.
- **Block-diagram edge labels overflow.** Adjacent nodes on a row are 52px
  apart and labels render at 9px monospaced, so roughly eight characters fit.
  Put longer conditions in the diagram caption.
- **Block-diagram node labels clip rather than spill.** A two-line title over a
  two-line `sub` already fills 76 of 78 pixels; the next line vanishes silently.
- **Wide tables scroll inside their own container.** The page body must never
  scroll sideways.

The checker reasons about labels and grids and is blind to everything else, so
a new `blocks` diagram still wants a look in a browser at desktop and at 375px.

---

## Single sources of truth

- **Domain** — `site.url` in `content/site.ts`, re-exported as `siteUrl` which
  applies the `NEXT_PUBLIC_SITE_URL` override. Metadata, sitemap, robots and the
  attribution stamped into downloadable files all import it.
- **Email** — `site.email`.

Never write either literally anywhere else.

---

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # types + content rules — run after editing content
npm run build        # run before committing, with the dev server stopped
```

The last point matters: `dev` and `build` share `.next`, and building
underneath a running dev server leaves it serving `Cannot find module` errors
that look like a code fault and are not.

No environment variables are required for local development. Without
`CONTACT_FORWARD_EMAIL` the contact form logs submissions server-side instead
of sending mail.

---

## Working arrangement

**Commit freely; never push.** The author pushes himself and deploys when he
decides the site is ready, not when a branch goes green. Commits sitting
unpushed on `main` are the normal resting state here.

The repository is built for Vercel and is not deployed. The domain does not
resolve. Nothing that needs a live site — structured data in a validator, link
previews on a social platform, the edge-runtime preview images on real
infrastructure — can be verified yet, so do not report any of it as working.

**Queue: 09 → 08 → 10 → 07.** 06 is written. That order is reasoned rather than
numerical; `CONTENT_PLAN.md`
explains it, and 09 is early on purpose. Before starting 08, re-verify the two
regulatory dates its plan entry flags — they moved once already during drafting.

No note currently owes the blog a post. It stands at nine posts against six
notes.

---

## Notes are dated reasoning, not maintained documents

Worth carrying into any session, because it governs everything that ages:
regulation, model pricing, what a tool can do this quarter.

Do not hedge a note into something evergreen. Date it instead — "as at July
2026" — and state what was true then at the precision actually available. A
note softened until it survives every future amendment says nothing.

The reason is the site's premise. The artefact is the reasoning, and reasoning
happens at a moment under the conditions of that moment. In ten years the
regulation will have moved and the prices will look absurd, and the interesting
thing will be precisely that: how somebody decided, with what was known then. A
note that tried to be timeless will have nothing to show.

So: do not retrofit an old note when the world changes — it is a record, and a
superseded fact is information about the fact. And do not let a dated fact
become the load-bearing spine; the lesson has to be how a constraint of that
shape changes a design, illustrated by the constraint as it stood.

Case 01's cost section is the model to copy: prices given as "assumptions
anchored to hosted pricing as it stood in mid-2026, not a quote", with the
formula written out so the figures can be recomputed later.
