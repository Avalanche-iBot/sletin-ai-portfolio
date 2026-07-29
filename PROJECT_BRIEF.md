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

**Five case notes written, five planned.** The portfolio index shows the
planned ones as titles so the published count stays honest.

| # | Case | The architectural lesson it owns | Shape |
|---|------|----------------------------------|-------|
| 01 | AI Patient Communication Platform *(flagship)* | Deterministic routing in front of the model — most volume should never reach it | Conversational · human-in-the-loop · Azure |
| 02 | Real-Time Payment Fraud Decisioning | A hard real-time decision with no human available, and what safety means without one | Streaming + ML · hybrid on-prem/cloud · LLM deliberately excluded from the decision |
| 03 | AI Contract Intelligence | Provenance — every extracted term points back to document, revision, page | Document extraction · Azure |
| 04 | AI Meeting Assistant | Attribution — turning speech into tracked commitments without inventing obligations | Speech · Azure |
| 05 | Enterprise Knowledge Assistant | Permissions enforced inside the retrieval path | Permissioned RAG · Azure |

**Planned, not yet written:** invoice processing, predictive maintenance,
recruitment assistant, supply-chain optimiser, executive dashboard. Several of
these, as currently titled, would collapse into a lesson already owned above —
they need re-scoping before being written, not just writing.

**Blog:** six posts listed, three with bodies.

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

- `tailoring` supersedes `openQuestions`. It names a parameter, the value
  assumed here, a plausible alternative, what the architecture becomes at that
  value, and why. It answers the reader's real question: *does this transfer to
  my situation?* The template falls back to `openQuestions` only when
  `tailoring` is absent.
- `status` describes how finished the **analysis** is, never a product:
  `In analysis` · `Architecture note` · `Under revision` · `Open question`.
- Cases 01, 03, 04 and 05 still use quoted JSON-style keys with a
  `// Generated content module` header — an artefact of how they were first
  exported. Case 02 is idiomatic TypeScript with a real doc comment. Prefer the
  case-02 form; convert the others when already editing them.

---

## Constraints that break the page silently

Type checking does not catch any of these.

- **Roadmap: four phases maximum.** The renderer maps 1–4 phases to column
  counts and falls back to four columns beyond that, so five phases leaves one
  card alone beside three empty grey cells.
- **Block-diagram edge labels overflow.** Adjacent nodes on a row have a
  52-pixel gap; anything longer than two short words lands on top of the
  neighbouring box. Put conditions in the diagram caption instead.
- **Block-diagram node labels clip rather than spill.** Two lines of title plus
  a `sub` line fills the box. A third line disappears with no warning.
- **Wide tables scroll inside their own container.** The page body must never
  scroll sideways.

After adding any diagram, check it in a browser at both desktop and 375px —
including whether any connector or label intersects a node box.

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
npm run build        # run before committing
npm run typecheck    # tsc --noEmit
```

No environment variables are required for local development. Without
`CONTACT_FORWARD_EMAIL` the contact form logs submissions server-side instead
of sending mail.
