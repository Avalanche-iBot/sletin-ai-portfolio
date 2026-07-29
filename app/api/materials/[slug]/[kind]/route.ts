import { NextResponse } from "next/server";
import { caseStudies, getCaseStudy } from "@/content/projects";
import { generateMaterial, materialParams } from "@/lib/materials";

/** Pre-renders every (slug, kind) pair with data, same as the rest of the site. */
export function generateStaticParams() {
  return materialParams(caseStudies).map(({ slug, kind }) => ({ slug, kind }));
}

export function GET(_request: Request, { params }: { params: { slug: string; kind: string } }) {
  const project = getCaseStudy(params.slug);
  if (!project) return NextResponse.json({ ok: false, error: "Unknown case study" }, { status: 404 });

  const result = generateMaterial(project, params.kind);
  if (!result) return NextResponse.json({ ok: false, error: "Unknown or unavailable material" }, { status: 404 });

  const filename = `${project.slug}-${result.meta.kind}.${result.meta.ext}`;

  return new NextResponse(result.body, {
    headers: {
      "Content-Type": `${result.meta.mime}; charset=utf-8`,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
