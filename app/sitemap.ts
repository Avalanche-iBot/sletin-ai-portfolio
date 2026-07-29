import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { posts } from "@/content/blog";
import { siteUrl } from "@/content/site";

/**
 * Generates `/sitemap.xml` at build time.
 *
 * Like `robots.ts`, the filename is the configuration — Next.js finds this
 * file and produces the XML from what it returns.
 *
 * The list is built from the same content modules the pages themselves read,
 * so a new case study appears in search without anyone remembering to add it
 * here. Only the fixed pages are written out by hand, and that list has to be
 * kept in step with the `nav` array in `content/site.ts`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/portfolio", "/architecture", "/blog", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const projectRoutes = caseStudies.map((c) => ({
    url: `${siteUrl}/portfolio/${c.slug}`,
    lastModified: new Date(),
  }));

  // Posts without a body are listed on the blog index as planned but have no
  // page of their own, so including them would advertise URLs that 404.
  const blogRoutes = posts
    .filter((p) => p.body)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      // Posts carry a real publication date; the routes above fall back to the
      // build date, since their content changes whenever the site is rebuilt.
      lastModified: new Date(p.date),
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
