# Wiring the Architecture tab into the existing site

This archive contains only **new** files — nothing in your existing repo is
touched, so nothing can break on import. Drag the folders below into your repo
root via GitHub Desktop exactly as they are:

```
app/architecture/page.tsx
components/architecture/ArchitectureExplorer.tsx
components/architecture/LayerCard.tsx
components/architecture/LayerModal.tsx
components/architecture/DownloadSvgButton.tsx
content/architecture.ts
lib/architectureStackSvg.ts
```

## The one manual step: the nav link

I don't have `content/site.ts` in front of me, so I can't safely edit it —
guessing at its exact shape risks a silent break (the same class of bug the
project brief already flagged three times). Add one entry to whatever array
currently drives your header nav, matching the shape your other items use.
It will look something like:

```ts
{ label: "Notebook", href: "/portfolio" },
{ label: "Architecture", href: "/architecture" },   // ← add this line
{ label: "About", href: "/about" },
```

Match the exact field names (`label`/`href` or `title`/`url`, etc.) already
used in that file.

## Assumptions I made — check these before `npm run build`

1. **Path alias.** All imports use `@/…` (e.g. `@/content/architecture`).
   This is the Next.js 14 default in `tsconfig.json`; if yours differs, a
   find-and-replace across the seven files above will fix it in one pass.

2. **Utility classes.** The new files use these classes as if they already
   exist in `globals.css` / Tailwind config, per the project brief:
   `shell`, `frame`, `eyebrow`, `rounded-card`, `font-display`, `font-prose`,
   `font-mono`, `max-w-reading`, and the size scale `micro` / `spec` /
   `display-sm` / `display-md` / `display-lg`. If any of these have slightly
   different names in your actual config, it's a quick rename — the visual
   language itself (hairline rules, mono labels, one amber accent) is
   preserved either way.

3. **Colour tokens.** Used as Tailwind classes: `canvas`, `surface`, `raised`,
   `line`, `line-strong`, `ink`, `ink-soft`, `ink-muted`, `accent`,
   `accent-deep`, `on-accent`. Same note as above — if `tailwind.config.ts`
   maps these under different keys, rename in the five component files.

4. **SVG export colours are hard-coded hex**, not your CSS variables — a
   standalone SVG opened in Figma can't resolve `var(--accent)`. I used the
   accent value from your brief (`rgb(197,128,12)`) and reasonable defaults
   for ink/line/canvas in the "engineering title block" direction you
   described. If your actual hex values differ, they're three constants at
   the top of `lib/architectureStackSvg.ts` — update once and every future
   export uses them.

## What this does NOT touch

- No existing component, page, or content file is modified.
- No visual redesign — new page reuses your existing design system exactly
  as described in the brief (Fraunces/Inter/IBM Plex Mono, amber-only accent,
  hairline rules, `rounded-card`).
- The `services` block, case-study schema, and everything else stay untouched.

## Before you push

```bash
npm run build
```

If it fails on the new files specifically, the error will point at a class
or import mismatch from the assumptions above — send me the error and I'll
patch precisely that line.

## Content note

The layer catalogue in `content/architecture.ts` is written as a standalone
reference file, same pattern as your other `content/` modules — adding a
22nd layer or a new block under an existing layer later is just appending an
object to the array, no component changes required.
