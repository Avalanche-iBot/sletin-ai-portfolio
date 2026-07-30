import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/projects";
import { site } from "@/content/site";
import { ogFonts } from "@/lib/ogFonts";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

/**
 * The link preview for a single case note.
 *
 * Nothing here appears on the site. This is the card a platform shows when
 * someone pastes the URL into LinkedIn, Slack or a message — and until now
 * every note shared one site-wide image, so five different pieces of work
 * arrived looking identical.
 *
 * Next.js turns a file with this name into an image route beside the page and
 * points `og:image` and `twitter:image` at it, so no metadata names it.
 *
 * It is built from the same content the page renders, which means the card
 * cannot drift from the note the way a hand-made image would.
 */

/*
 * The edge build of the image library rather than the Node one.
 *
 * The Node build resolves a path to its bundled fallback typeface as the
 * module loads, and composes that path wrongly on Windows — the import throws
 * before any code here runs, whether or not fonts are supplied. The edge build
 * initialises differently, so the route can be rendered and checked locally
 * instead of only after a deploy.
 */
export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case note";

/** One image per published note, generated at build time beside the pages. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const project = getCaseStudy(params.slug);
  const fonts = await ogFonts();

  // The route is only generated for slugs `generateStaticParams` returned, but
  // the types cannot express that — a plain card beats throwing.
  return new ImageResponse(
    (
      <OgCard
        eyebrow={project ? `Case note ${String(project.order).padStart(2, "0")}` : "Architecture notebook"}
        title={project?.title ?? site.name}
        summary={project?.subtitle ?? site.tagline}
        footerRight={project?.domain ?? site.role}
      />
    ),
    // An empty font list means the fetch failed; letting the renderer fall
    // back to its own default is better than failing the build over a card.
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
