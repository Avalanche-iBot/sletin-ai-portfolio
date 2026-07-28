import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/Primitives";
import { ContactForm } from "@/components/ContactForm";
import { NoticeLine } from "@/components/Disclaimer";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Section
        first
        eyebrow="Contact"
        title="Corrections, counter-arguments and questions"
        lede="The most useful message you can send me is one that says a decision in a case note is wrong, and why. Questions about anything published here are equally welcome. I read everything myself."
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
              <p className="eyebrow mb-3">What this site is</p>
              <p className="max-w-reading text-[0.9375rem] leading-relaxed text-ink-soft">
                A place to write down how I reason about operational problems and where AI does or
                does not belong in them. It is not a consulting practice and not a rate card. If a
                note is useful to you, take it; if it is wrong, tell me.
              </p>
            </div>

            <NoticeLine>
              {site.availability}. Nothing published here represents the position of any employer,
              past or present.
            </NoticeLine>
          </div>
        </div>
      </Section>
    </>
  );
}
