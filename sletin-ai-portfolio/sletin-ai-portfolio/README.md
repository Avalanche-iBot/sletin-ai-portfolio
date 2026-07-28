# Aleksandr Sletin — AI Architecture Portfolio

A premium, CMS-driven portfolio site positioning Aleksandr Sletin as an
Enterprise AI Solutions Architect. Built with Next.js 14 (App Router),
TypeScript, Tailwind CSS and Framer Motion.

## Status

**5 of 10 planned case studies are live**, per current instructions:

1. AI Patient Communication Platform (flagship, built from the uploaded Excel)
2. AI Customer Support Platform
3. AI Contract Intelligence
4. AI Meeting Assistant
5. Enterprise Knowledge Assistant

The remaining five (Invoice Processing, Predictive Maintenance, Recruitment
Assistant, Supply Chain Optimizer, Executive Dashboard) are listed as
"planned" on the Portfolio page rather than hidden, so the site never
overclaims what exists.

## Getting started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run typecheck
```

## Project structure

```
app/                      Next.js App Router pages
  page.tsx                Home
  about/                  About
  portfolio/              Portfolio index + [slug] case-study template
  learning/               Learning Journey
  blog/                   Blog index + [slug] post template
  contact/                Contact (form + services)
  api/contact/route.ts    Contact form submission handler
  globals.css             Design tokens (CSS variables) + Tailwind layers

components/               Reusable UI
  Primitives.tsx           Section, FactGrid, PointList, TagList, etc.
  DataTables.tsx           KPI / risk / tech-selection / stakeholder tables
  DiscoverySection.tsx     Stakeholder-interview renderer
  RoadmapTimeline.tsx      Phased roadmap component
  ProjectCard.tsx          Case-study card for grids
  SiteHeader.tsx / SiteFooter.tsx
  diagrams/DiagramView.tsx Renders layers / flow / pipeline / sequence diagrams

content/                  THE CMS LAYER
  types.ts                 The schema every case study and site section follows
  site.ts, about.ts, learning.ts, blog.ts   Non-project site content
  projects/
    index.ts               Registry — add a new case study here
    case-NN-slug.ts         One file per case study

lib/format.ts             Small shared formatting helpers
```

## Adding a new case study

1. Create `content/projects/case-06-your-slug.ts`:

   ```ts
   import type { CaseStudy } from "../types";

   const caseStudy: CaseStudy = {
     slug: "your-slug",
     order: 6,
     title: "Your Case Study Title",
     subtitle: "...",
     industry: "...",
     domain: "...",
     status: "Discovery",
     architectureComplexity: 3,
     shortSummary: "...",
     tags: ["..."],
     featured: false,
     // any of the 19 optional sections — add what you have, the page
     // template only renders sections that exist.
   };

   export default caseStudy;
   ```

2. Register it in `content/projects/index.ts`:
   ```ts
   import case06 from "./case-06-your-slug";
   // add case06 to the array passed to caseStudies
   ```
3. Remove its entry from `plannedCaseStudies` in the same file.

No page, route or component needs to change. The homepage, `/portfolio`,
and the case-study template all read from this registry.

## Design system

- **Direction**: "engineering title block" — hairline rules, drafting
  corner ticks, a fine background grid, mono data labels. One accent
  colour (hi-vis amber) used sparingly.
- **Type**: Fraunces (display/serif headlines) + Inter (body/UI) + IBM
  Plex Mono (data, labels, eyebrows). All loaded via `next/font/google`.
- **Tokens**: see `tailwind.config.ts` and the CSS variables in
  `app/globals.css` — colour is fully semantic and swaps automatically
  between light and dark via the `.dark` class.
- **Diagrams**: architecture diagrams are typed data (see `Diagram` in
  `content/types.ts`) rendered as React/CSS — not images — so they stay
  editable and themeable. Four kinds: `layers`, `flow`, `pipeline`,
  `sequence`.

## Contact form

`app/api/contact/route.ts` currently logs submissions server-side (visible
in your hosting provider's function logs) rather than sending real email —
no email provider is wired up yet. To send real email, add a provider
(Resend, SES, SendGrid, etc.), set `CONTACT_FORWARD_EMAIL` in your
environment, and replace the `console.log` block in that file with the
provider's send call.

## Deployment

Designed for Vercel:

```bash
npm i -g vercel
vercel
```

Set `NEXT_PUBLIC_SITE_URL` (and `CONTACT_FORWARD_EMAIL` once email is wired
up) as environment variables in the Vercel project settings — see
`.env.example`.

## Known follow-ups

See `PROJECT_STATUS.md` for the detailed backlog.
