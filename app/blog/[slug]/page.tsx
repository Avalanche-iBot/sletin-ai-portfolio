import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/content/blog";
import { Section } from "@/components/Primitives";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
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
              This post is planned but not written yet. It's listed here — rather than hidden — so the publishing
              queue stays honest about what exists and what's coming.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
