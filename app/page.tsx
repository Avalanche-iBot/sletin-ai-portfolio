import Link from "next/link";
import { site, whyMe } from "@/content/site";
import { caseStudies, totalPlannedCaseStudies } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Primitives";

export default function HomePage() {
  const featured = caseStudies.filter((c) => c.featured).slice(0, 3);

  return (
    <>
      {/* Hero ---------------------------------------------------------- */}
      <section className="grid-field relative overflow-hidden border-b border-line">
        <div className="shell relative py-20 md:py-28">
          <p className="eyebrow mb-6 animate-rise-in">{site.role}</p>
          <h1 className="max-w-4xl animate-rise-in font-display text-display-lg text-ink" style={{ animationDelay: "80ms" }}>
            I optimise business processes before I optimise prompts.
          </h1>
          <p
            className="mt-7 max-w-xl animate-rise-in text-[1.0625rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: "160ms" }}
          >
            {site.positioning}
          </p>

          <div className="mt-9 flex animate-rise-in flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
            <Link href="/portfolio" className="btn btn-primary">
              Read the case studies
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a conversation
            </Link>
          </div>

        </div>
      </section>

      {/* What / who / why at a glance ------------------------------------ */}
      <Section first eyebrow="How these notes are written" title="Enterprise problems, translated into AI architecture — not the other way round.">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Make-vs-buy, honestly answered",
              d: "Every note opens by asking whether AI is the right tool at all — and says plainly when conventional automation would do more of the job.",
            },
            {
              t: "Discovery before diagrams",
              d: "Stakeholder interviews, expected answers, and their architectural implications come first. The architecture is a consequence of what discovery finds.",
            },
            {
              t: "Full lifecycle, not a demo",
              d: "Business context, security, cost, risk, KPIs and roadmap are part of the deliverable — the same structure a client would expect from a real engagement.",
            },
          ].map((f) => (
            <div key={f.t} className="frame p-6">
              <p className="font-display text-lg text-ink">{f.t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured projects ------------------------------------------------ */}
      <Section
        eyebrow="Case studies"
        title="Recent analyses"
        lede={`${caseStudies.length} of ${totalPlannedCaseStudies} planned notes are written. Each follows the same structure — context, discovery, analysis, architecture, trade-offs, risks — so the reasoning can be compared across problems.`}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/portfolio" className="btn btn-ghost">
            See all case studies
          </Link>
        </div>
      </Section>

      {/* Why me ------------------------------------------------------------ */}
      <Section eyebrow={whyMe.eyebrow} title={whyMe.title} lede={whyMe.body}>
        <div className="grid gap-6 md:grid-cols-3">
          {whyMe.pillars.map((p) => (
            <div key={p.num} className="border-t-2 border-accent pt-4">
              <p className="font-mono text-micro text-ink-muted">{p.num}</p>
              <p className="mt-1 font-display text-lg text-ink">{p.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{p.body}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA ---------------------------------------------------------------- */}
      <Section eyebrow="Get in touch" title="Corrections, alternative approaches and disagreement are all welcome.">
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
          <a href={site.linkedin} className="btn btn-ghost">
            Connect on LinkedIn
          </a>
        </div>
      </Section>
    </>
  );
}
