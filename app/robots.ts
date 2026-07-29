import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/**
 * Generates `/robots.txt` at build time.
 *
 * Next.js turns any `robots.ts` in the app directory into that file
 * automatically — the filename is the whole configuration, which is why
 * nothing here registers a route.
 *
 * Everything is open to crawlers: this is a public notebook with nothing to
 * hide from search. The sitemap line is the useful part, pointing crawlers at
 * the full page list rather than leaving them to discover it by following
 * links.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
