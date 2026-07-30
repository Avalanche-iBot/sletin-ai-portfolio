import type { BlogPost, CaseStudy } from "@/content/types";
import { site, siteUrl } from "@/content/site";

/**
 * Schema.org descriptions of what each page is.
 *
 * This is the machine-readable half of the site. A search engine reading the
 * case-note template sees headings and paragraphs; it cannot tell that the
 * page is a technical article by a named author, that it belongs to a series,
 * or where it sits in the hierarchy. These objects say so explicitly.
 *
 * Nothing here renders. The output goes into a script tag that browsers do not
 * display, so it can be added to any page without touching its design.
 *
 * Everything is derived from the same content the page shows. That matters
 * more than it sounds: hand-written markup that disagrees with the visible
 * page is treated as an attempt to mislead, and is worse than none at all.
 */

const absolute = (path: string) => `${siteUrl}${path}`;

/**
 * The author.
 *
 * Defined once, in the site graph the layout emits on every page, and referred
 * to from each article by its identifier rather than repeated inside it. That
 * is what the identifiers are for: a consumer merges the two descriptions into
 * one entity, so the author's details live in a single place.
 */
function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: siteUrl,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: [site.github, site.linkedin].filter(Boolean),
  };
}

/**
 * The site and its author — emitted by the layout, so it appears on every page.
 *
 * This is the only place `Person` and `WebSite` are described. Everything else
 * points at them.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: site.positioning,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}

/**
 * The trail from the site root to the current page.
 *
 * Search results render this as the path shown under a title, in place of a
 * bare URL. Positions are 1-based, which the specification requires.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/**
 * A case note.
 *
 * `TechArticle` rather than plain `Article`, because that is what these are —
 * and the distinction is the one a reader searching for architecture writing
 * is implicitly making.
 *
 * No publication date is claimed. The notes carry no date in the content, and
 * inventing one to satisfy a recommended field would be asserting something
 * untrue about work that is revised continuously.
 */
export function caseNoteSchema(project: CaseStudy) {
  const path = `/portfolio/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${absolute(path)}#article`,
        headline: project.title,
        description: project.shortSummary,
        abstract: project.subtitle,
        url: absolute(path),
        mainEntityOfPage: absolute(path),
        image: absolute(`${path}/opengraph-image`),
        inLanguage: "en",
        keywords: project.tags.join(", "),
        articleSection: project.domain,
        about: [
          { "@type": "Thing", name: project.industry },
          { "@type": "Thing", name: project.domain },
        ],
        author: { "@id": `${siteUrl}/#person` },
        publisher: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/portfolio" },
        { name: project.title, path },
      ]),
    ],
  };
}

/**
 * A written piece.
 *
 * Posts do carry a date, so this one claims it. `wordCount` is computed from
 * the body rather than estimated, and omitted entirely for a post that is
 * listed but not yet written.
 */
export function blogPostSchema(post: BlogPost) {
  const path = `/blog/${post.slug}`;

  const words = post.body
    ?.flatMap((section) => [...(section.paragraphs ?? []), ...(section.bullets ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${absolute(path)}#article`,
        headline: post.title,
        description: post.excerpt,
        url: absolute(path),
        mainEntityOfPage: absolute(path),
        image: absolute(`${path}/opengraph-image`),
        datePublished: post.date,
        inLanguage: "en",
        keywords: post.tags.join(", "),
        articleSection: post.category,
        ...(words ? { wordCount: words } : {}),
        author: { "@id": `${siteUrl}/#person` },
        publisher: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path },
      ]),
    ],
  };
}
