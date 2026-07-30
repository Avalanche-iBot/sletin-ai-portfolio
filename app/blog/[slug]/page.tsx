import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/content/blog";
import { Section } from "@/components/Primitives";
import { StructuredData } from "@/components/StructuredData";
import { blogPostSchema } from "@/lib/structuredData";

/**
 * A single blog post, served at `/blog/<slug>`.
 *
 * Same dynamic-route mechanism as the case-study template: the `[slug]` folder
 * makes one file serve every post, with the matched segment on `params.slug`.
 *
 * Planned posts are included deliberately. A post with no `body` still gets a
 * page — showing its title and excerpt above a "not yet written" note — so a
 * link to something announced but undrafted lands somewhere sensible instead
 * of on a 404. Those slugs are kept out of `app/sitemap.ts`, since there is no
 * reason for search engines to index them.
 */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/**
 * Per-post metadata.
 *
 * The `openGraph` and `twitter` blocks are not duplication. Next.js merges a
 * page's metadata into the layout's key by key, and it does not copy `title`
 * and `description` into the social blocks — so a page that sets only those
 * two inherits the layout's `og:title` and `og:description` verbatim. Every
 * post therefore shared the site's own strapline when shared, whatever its own
 * headline said. Setting them here is what makes a shared link describe the
 * post rather than the site.
 *
 * The image is not named: the `opengraph-image` file beside this one is wired
 * up by convention.
 */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: path,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.excerpt },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  // `notFound()` throws, which is what lets TypeScript treat `post` as defined
  // below without an explicit return — the function never comes back from here.
  if (!post) notFound();

  return (
    <>
      {/* Machine-readable description of this post. Renders nothing. */}
      <StructuredData data={blogPostSchema(post)} />

      <header className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <Link href="/blog" className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted hover:text-ink">
            ← All posts
          </Link>
          <p className="mt-6 font-mono text-micro uppercase tracking-[0.08em] text-accent-deep">{post.category}</p>
          <h1 className="mt-3 max-w-3xl font-display text-display-sm text-ink">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.body ? post.readingTime : "Planned — not yet published"}</span>
          </div>
        </div>
      </header>

      <Section first>
        {post.body ? (
          <div className="max-w-reading space-y-8">
            {post.body.map((block, i) => (
              <div key={i}>
                {block.heading && <h2 className="mb-3 font-display text-xl text-ink">{block.heading}</h2>}
                {block.paragraphs?.map((p, pi) => (
                  <p key={pi} className="prose-arch">
                    {p}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="mt-3 space-y-2">
                    {block.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="frame max-w-reading p-8">
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">Not yet published</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              This post is planned but not written yet. It’s listed here — rather than hidden — so the publishing
              queue stays honest about what exists and what’s coming.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
