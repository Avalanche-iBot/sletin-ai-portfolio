import { ImageResponse } from "next/og";
import { posts } from "@/content/blog";
import { site } from "@/content/site";
import { ogFonts } from "@/lib/ogFonts";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

/**
 * The link preview for a single written piece.
 *
 * Same card as the case notes, differing only in what fills it — the category
 * takes the eyebrow and the reading time sits in the footer, since those are
 * what someone deciding whether to open a post actually wants to know.
 *
 * See `app/portfolio/[slug]/opengraph-image.tsx` for why this runs on the edge
 * runtime and why the fonts are fetched rather than imported.
 */

export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Writing";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  const fonts = await ogFonts();

  return new ImageResponse(
    (
      <OgCard
        eyebrow={post?.category ?? "Writing"}
        title={post?.title ?? site.name}
        summary={post?.excerpt ?? site.tagline}
        footerRight={post?.readingTime ?? site.role}
      />
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
