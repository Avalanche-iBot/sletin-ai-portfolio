# Project Status

_Last checkpoint: this session — initial build, 5 of 10 case studies._

## What's built and working

- **Full Next.js 14 App Router scaffold**: TypeScript, Tailwind, Framer
  Motion dependency wired, npm scripts (`dev`, `build`, `start`, `lint`,
  `typecheck`).
- **Design system**: token-based (CSS variables), light/dark mode with a
  persisted toggle, custom type scale, "engineering title block" visual
  direction (see README → Design system).
- **CMS content layer**: `content/types.ts` defines one reusable
  `CaseStudy` schema; every section is optional so a case study can be
  published incrementally. Non-project content (`site`, `about`,
  `learning`, `blog`, `services`) follows the same pattern.
- **Pages implemented**:
  - `/` — hero, stats, featured case studies, why-me, learning preview, CTA
  - `/about` — timeline, credentials, strengths, philosophy, working style
  - `/portfolio` — full case-study grid + honestly-labelled "planned" list
  - `/portfolio/[slug]` — the 19-section case-study template, statically
    generated for all 5 live case studies
  - `/learning` — skill progress bars, tracks, milestones
  - `/blog` and `/blog/[slug]` — index + detail, gracefully handles posts
    with no body yet ("planned — not yet published")
  - `/contact` — form (client component) + services (grouped by tier)
  - `/api/contact` — form handler (logs server-side; no email provider
    wired up yet — see README)
  - `/sitemap.xml`, `/robots.txt` — generated dynamically from content
  - Custom 404
- **Diagram system**: `Diagram` type with 4 kinds (`layers`, `flow`,
  `pipeline`, `sequence`) rendered as themeable React/CSS components, not
  images. Case studies use all 4 kinds across the 5 live studies.
- **5 case studies, live**:
  1. AI Patient Communication Platform — flagship, derived from the
     uploaded `Enterprise_AI_Case_Studies.xlsx` (Healthcare / dental group)
  2. AI Customer Support Platform
  3. AI Contract Intelligence
  4. AI Meeting Assistant
  5. Enterprise Knowledge Assistant

  All 5 pass a structural validation sweep (enum values, diagram actor
  index bounds, required fields) run against the compiled content.

## Explicitly deferred (by current instruction: "only 5 case studies for now")

- Case studies 6–10 (Invoice Processing, Predictive Maintenance,
  Recruitment Assistant, Supply Chain Optimizer, Executive Dashboard) —
  titles are reserved in `content/projects/index.ts` under
  `plannedCaseStudies` and shown on `/portfolio` as "Planned", not built.

## Known gaps / next steps

- **Not yet run through a real Node toolchain.** This sandbox has no
  network access, so `npm install` / `next build` / `next dev` have not
  been executed here. The code has been manually validated (import paths,
  JSON-shape of every content file against the TypeScript schema, enum
  values, diagram index bounds) but a first `npm install && npm run build`
  on your machine is the real acceptance test. See "First run checklist"
  below.
- **Contact form has no email provider.** Submissions are logged
  server-side only. Wire up Resend/SES/SendGrid before relying on it in
  production.
- **OG image / favicon**: no custom favicon or social preview image yet —
  `public/` is currently empty.
- **Blog posts have metadata but no bodies yet** (6 planned posts listed,
  0 written). This is intentional — the blog is scaffolded and ready for
  content.
- **Content polish**: case studies 2–5 are architecture-first and
  thorough, but haven't had a second editorial pass the way case study 1
  (built directly from your Excel) has. Treat 2–5 as strong first drafts.
- **No automated tests.** Given the content-driven architecture, the
  highest-value test to add later is a schema-conformance test for
  `content/projects/*.ts` (a lightweight version of the Python validation
  sweep used during this build, ported to TypeScript/Vitest).
- **Accessibility**: keyboard focus states and `prefers-reduced-motion`
  are handled in `globals.css`; a full screen-reader pass hasn't been done.

## First run checklist

```bash
npm install
npm run typecheck   # confirms the TypeScript compiles cleanly
npm run dev          # http://localhost:3000
```

If `typecheck` surfaces anything, the most likely spots (given how this
was built) are:
- A stray field name mismatch in one of the case study `.ts` files vs
  `content/types.ts` — the compiler will point at the exact line.
- Tailwind/PostCSS peer version resolution — run `npm install` again if
  the first pass warns about peer deps.

## Change log

See `CHANGELOG.md`.
