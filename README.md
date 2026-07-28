# aleksandrsletin.com

Source for an independent notebook on enterprise AI architecture.

The site publishes case notes: written analyses that take an operational
problem apart — context, discovery, constraints, the approaches considered,
the trade-offs behind each decision, and the questions left unresolved. The
reasoning is the artefact. Code, where it exists, is a consequence of it.

Live at **https://aleksandrsletin.com**

---

## Notice

The case notes published here are educational analyses built from general
industry knowledge and personal reasoning applied to hypothetical scenarios.
They do not describe the internal systems, data or processes of any
organisation. Any resemblance to a real organisation is coincidental. Nothing
here is consulting advice, and none of it represents the position of any
employer.

---

## Stack

- Next.js 14 (App Router) · TypeScript
- Tailwind CSS with token-based theming (CSS variables, light/dark)
- Statically generated; deployed on Vercel

## Running locally

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
```

Environment variables are documented in `.env.example`. None are required for
local development; without `CONTACT_FORWARD_EMAIL` the contact form logs
submissions server-side instead of sending mail.

## Layout

```
app/                    Routes (App Router)
  page.tsx              Home
  about/                About
  portfolio/            Case-note index + [slug] template
  learning/             Learning roadmap
  blog/                 Writing index + [slug] template
  contact/              Contact form and services
  api/contact/          Form handler
  globals.css           Design tokens and Tailwind layers

components/             Shared UI
  Primitives.tsx        Section, Prose, TagList, FactGrid, ComplexityMeter…
  DataTables.tsx        KPI, risk, technology-selection, stakeholder tables
  DiscoverySection.tsx  Stakeholder-interview renderer
  RoadmapTimeline.tsx   Phased roadmap
  Disclaimer.tsx        Notice shown before every case note
  diagrams/             Diagram renderer

content/                Content layer — everything readable lives here
  types.ts              The schema
  site.ts about.ts learning.ts blog.ts
  projects/
    index.ts            Registry
    case-NN-slug.ts     One file per case note

lib/format.ts           Formatting helpers
```

## Content model

Presentation and content are separated. Pages read from `content/`; adding a
case note requires no change to any route or component.

Every narrative section on `CaseStudy` is optional, and the template renders a
section only if its content exists — so a note can be published partially
written and filled in over time.

### Adding a case note

1. Create `content/projects/case-06-your-slug.ts`:

```ts
import type { CaseStudy } from "../types";

const caseStudy: CaseStudy = {
  slug: "your-slug",
  order: 6,
  title: "…",
  subtitle: "…",
  industry: "…",
  domain: "…",
  status: "In analysis",
  architectureComplexity: 3,
  shortSummary: "…",
  tags: ["…"],
  featured: false,
  // add whichever sections are written
};

export default caseStudy;
```

2. Register it in `content/projects/index.ts` and remove its placeholder from
   `plannedCaseStudies`.

`status` describes how finished the *analysis* is, not a product:
`In analysis` · `Architecture note` · `Under revision` · `Open question`.

## Diagrams

Architecture diagrams are typed data (`Diagram` in `content/types.ts`) rendered
as React and CSS rather than images, so they stay editable, searchable and
theme-aware. Four kinds: `layers`, `flow`, `pipeline`, `sequence`.

## Design

One accent colour used sparingly, hairline rules, a fine background grid and
mono labels — closer to a drafting title block than to a product landing page.
Type: Fraunces for headlines, Inter for body, IBM Plex Mono for labels and
data. Colour is fully semantic and defined as CSS variables in
`app/globals.css`; dark mode swaps the token values via a `.dark` class.

## Licence

Code is available for reference. The written case notes and site copy are not
licensed for reuse.
