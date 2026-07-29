import { NextResponse } from "next/server";
import { caseStudies, getCaseStudy } from "@/content/projects";
import { generateMaterial, materialParams } from "@/lib/materials";

/**
 * Serves a downloadable material for one case study.
 *
 * The two bracketed folder names in the path make this a dynamic route, and
 * their names become the keys on `params`: a request for
 * `/api/materials/ai-meeting-assistant/risk-register` arrives as
 * `{ slug: "ai-meeting-assistant", kind: "risk-register" }`.
 *
 * Files are built from case-study data rather than stored — see
 * `lib/materials.ts` — so they cannot drift out of step with the note they
 * came from.
 */

/**
 * Pre-renders every (slug, kind) pair with data, same as the rest of the site.
 *
 * Without this, Next.js would have to build each file on the first request for
 * it. Listing the combinations up front turns them into static files produced
 * at deploy time, and any pair not listed is handled by the checks below.
 */
export function generateStaticParams() {
  return materialParams(caseStudies).map(({ slug, kind }) => ({ slug, kind }));
}

export function GET(_request: Request, { params }: { params: { slug: string; kind: string } }) {
  // Both segments arrive as arbitrary strings from the URL, so each is resolved
  // against known data and rejected if it matches nothing. Neither value ever
  // reaches a file path — the response is generated in memory — so a crafted
  // slug cannot be used to read something it should not.
  const project = getCaseStudy(params.slug);
  if (!project) {
    return NextResponse.json({ ok: false, error: "Unknown case study" }, { status: 404 });
  }

  // Null covers two cases: an unrecognised kind, and a real kind the study has
  // no data for — a note with no risks yet should 404 rather than hand back an
  // empty register.
  const result = generateMaterial(project, params.kind);
  if (!result) {
    return NextResponse.json(
      { ok: false, error: "Unknown or unavailable material" },
      { status: 404 },
    );
  }

  // Built from the validated case study, not from the raw URL, so the filename
  // cannot carry anything the request put there.
  const filename = `${project.slug}-${result.meta.kind}.${result.meta.ext}`;

  return new NextResponse(result.body, {
    headers: {
      "Content-Type": `${result.meta.mime}; charset=utf-8`,
      // `attachment` is what makes the browser save the file instead of
      // displaying it — without it the generated HTML dossier would simply
      // open as a page, and the CSVs would render as walls of text.
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
