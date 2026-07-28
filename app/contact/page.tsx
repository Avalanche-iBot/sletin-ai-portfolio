import type { Metadata } from "next";
import { site, services } from "@/content/site";
import { Section } from "@/components/Primitives";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

const TIER_ORDER = ["Core", "Delivery", "Advisory"] as const;

export default function ContactPage() {
  const byTier = TIER_ORDER.map((tier) => ({ tier, items: services.filter((s) => s.tier === tier) }));

  return (
    <>
      <Section
        first
        eyebrow="Contact"
        title="Let's talk about a role, a project, or an architecture problem"
        lede="I read every message myself. For roles, feel free to attach a JD; for project enquiries, a couple of lines on the problem is plenty to start."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Direct</p>
              <ul className="space-y-2 text-[0.9375rem]">
                <li>
                  <a href={`mailto:${site.email}`} className="text-ink hover:text-accent-deep">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ink hover:text-accent-deep">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} className="text-ink hover:text-accent-deep">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.github} className="text-ink hover:text-accent-deep">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-1">Location</p>
              <p className="text-[0.9375rem] text-ink-soft">{site.location}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Availability</p>
              <p className="text-[0.9375rem] text-ink-soft">{site.availability}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Services"
        title="What I can help with"
        lede="A structure built to support a future price list — for now, treat this as a menu to start a conversation from, not a fixed rate card."
      >
        <div className="grid gap-10 md:grid-cols-3">
          {byTier.map(({ tier, items }) => (
            <div key={tier}>
              <p className="mb-4 border-b border-line pb-2 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
                {tier}
              </p>
              <ul className="space-y-5">
                {items.map((s) => (
                  <li key={s.t}>
                    <p className="font-display text-base text-ink">{s.t}</p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">{s.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
