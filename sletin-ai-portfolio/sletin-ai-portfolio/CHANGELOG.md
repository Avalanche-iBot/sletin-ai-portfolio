# Changelog

## [0.1.0] — Initial build (this session)

### Added
- Full Next.js 14 App Router project scaffold (TypeScript, Tailwind,
  Framer Motion, ESLint config, `.env.example`).
- Design tokens: `tailwind.config.ts` + CSS variables in `app/globals.css`
  supporting light/dark mode.
- Content schema (`content/types.ts`) — the single `CaseStudy` type plus
  `Site`, `About`, `Learning`, `BlogPost`, `Service`, `Engagement`.
- Content modules: `content/site.ts`, `content/about.ts`,
  `content/learning.ts`, `content/blog.ts`.
- Project registry `content/projects/index.ts` with 5 live case studies
  and 5 reserved "planned" slots.
- 5 case study content files:
  - `case-01-ai-patient-communication-platform.ts` (flagship, from the
    uploaded Excel)
  - `case-02-ai-customer-support-platform.ts`
  - `case-03-ai-contract-intelligence.ts`
  - `case-04-ai-meeting-assistant.ts`
  - `case-05-enterprise-knowledge-assistant.ts`
- Components: `SiteHeader`, `SiteFooter`, `Primitives` (Section,
  ComplexityMeter, TagList, FactGrid, PointList, Prose, BulletList),
  `DataTables` (KPI/Risk/TechSelection/Stakeholder tables),
  `DiscoverySection`, `RoadmapTimeline`, `ProjectCard`, `ContactForm`,
  `diagrams/DiagramView` (layers/flow/pipeline/sequence renderer).
- Pages: `/`, `/about`, `/portfolio`, `/portfolio/[slug]`, `/learning`,
  `/blog`, `/blog/[slug]`, `/contact`, `/api/contact`, `/sitemap.xml`,
  `/robots.txt`, custom 404.

### Fixed (during this session's own review)
- `content/projects/index.ts` had incorrect relative import paths (`./types`
  and `./projects/case-...`) left over from being drafted as if it lived a
  directory higher. Corrected to `../types` and `./case-...`.
- `case-01`'s sequence diagram used an incompatible message shape
  (`{f, t, m, self}`) from an earlier draft of the schema. Converted to the
  shipped `{from, to, t, note?}` actor-index format used by all other
  case studies.
- `DiagramView`'s sequence renderer didn't handle a self-referencing
  message (`from === to`, used by case 1's confidence-check loop) —
  it would have collapsed to a zero-width line. Added a dedicated loop
  marker for this case.

### Validated
- Ran a structural sweep across all 5 case-study files: every `status`,
  `risks[].severity`, and `architectureComplexity` value matches the
  schema's allowed values; every diagram's `kind` is one of the 4
  supported kinds; every sequence diagram's actor indices are in bounds.
- Confirmed every `@/...` import in `app/` and `components/` resolves to
  an existing file.

### Deferred
- Case studies 6–10 (see PROJECT_STATUS.md).
- Real email sending for the contact form.
- Favicon / OG image.
- Blog post bodies (posts exist as metadata only).
