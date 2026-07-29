import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { posts } from "@/content/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleksandrsletin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/portfolio", "/architecture", "/blog", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = caseStudies.map((c) => ({
    url: `${siteUrl}/portfolio/${c.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts
    .filter((p) => p.body)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
