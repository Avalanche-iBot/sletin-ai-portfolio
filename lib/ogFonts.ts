/**
 * Font data for the generated link-preview images.
 *
 * The pages get their typefaces from `next/font/google`, which self-hosts them
 * at build time. That machinery is not available to an image route: the image
 * is rendered outside the document by a layout engine that needs the raw font
 * bytes handed to it.
 *
 * So the same three families are fetched directly here. The build already
 * reaches Google Fonts for `next/font`, so this adds no new dependency — only
 * another request to a host that has to be reachable anyway.
 *
 * Supplying fonts explicitly also sidesteps a bug in the image library's
 * bundled fallback, which builds an invalid file URL on Windows and fails the
 * render outright. Passing our own fonts means that path is never taken.
 */

/** Families and weights the card design actually uses. */
const FACES = [
  { family: "Fraunces", weight: 600 as const },
  { family: "Inter", weight: 400 as const },
  { family: "IBM Plex Mono", weight: 500 as const },
];

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600;
  style: "normal";
};

/*
 * Resolved once per build rather than per image.
 *
 * Every case note and every post renders its own card, and without this the
 * same three files would be fetched for each of them.
 */
let cached: Promise<OgFont[]> | null = null;

/**
 * Asks the Google Fonts CSS endpoint for one family and returns the font file
 * it points at.
 *
 * The old browser string is deliberate. Google serves whatever format the
 * requesting agent supports, and a current one gets WOFF2 — which the image
 * renderer cannot read. An old agent gets TrueType, which it can.
 */
async function fetchFace(family: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" },
  }).then((r) => r.text());

  const src = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('truetype'\)/);
  if (!src) throw new Error(`No TrueType source for ${family} ${weight}`);

  return fetch(src[1]).then((r) => r.arrayBuffer());
}

/**
 * The fonts the card should render with, or an empty list.
 *
 * Returning nothing rather than throwing is deliberate: a link preview is not
 * worth failing a deployment over. If the fonts cannot be fetched the renderer
 * falls back to its own default, which produces a plainer card on a platform
 * where that fallback works — and no card at all is strictly worse than a card
 * in the wrong typeface.
 */
export function ogFonts(): Promise<OgFont[]> {
  cached ??= Promise.all(
    FACES.map(async ({ family, weight }) => ({
      name: family,
      data: await fetchFace(family, weight),
      weight,
      style: "normal" as const,
    }))
  ).catch((error) => {
    console.warn(`[og] falling back to the default typeface: ${(error as Error).message}`);
    return [];
  });

  return cached;
}
