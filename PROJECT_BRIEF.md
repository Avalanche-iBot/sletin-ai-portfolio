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

**Planned, not yet written**, each scoped around a lesson none of the six owns:

| # | Note | The lesson it owns | Setting · data · model |
|---|------|--------------------|------------------------|
| 07 | AI Spare Parts Planning | The decision is the product, not the prediction — and planner overrides are data, not disobedience | Industrial operations · time series · no LLM |
| 08 | Fatigue Risk and Fitness for Duty | A regulated decision about a person, where the safety case and the privacy case point in opposite directions | Safety-critical operations · physiological data · no LLM |
| 09 | Edge Vision for Asset Integrity | Inference where you cannot observe it, cannot easily update it, and nobody will tell you it was wrong | Remote assets · images · no LLM |
| 10 | AI-Assisted Legacy Modernisation | Verifying generated output against a running system that is itself the ground truth | Production accounting · source code · LLM |


