import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ogFonts } from "@/lib/ogFonts";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

/**
 * The site-wide link preview.
 *
 * Sitting at the root of `app/`, this is what any page without a card of its
 * own inherits — the homepage, About, Contact, the two index pages and the
 * architecture catalogue. Case notes and posts override it with their own.
 *
 * See `app/portfolio/[slug]/opengraph-image.tsx` for why this runs on the edge
 * runtime and why the fonts are fetched rather than imported.
 */

export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default async function Image() {
  const fonts = await ogFonts();

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Architecture notebook"
        title={site.name}
        summary={site.tagline}
        footerRight={site.location}
      />
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
