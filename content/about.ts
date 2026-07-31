import type { About } from "./types";

/**
 * The About page.
 *
 * Two sections and nothing else: an opening with the credentials beside it, and
 * the principles. Everything that read as a pitch has gone — a list of
 * strengths, a list of working habits, and a paragraph under each certification
 * explaining why it mattered. A reader deciding whether to take the case notes
 * seriously wants to know what this person has actually done and how they think.
 * Neither question is answered better by making the page longer.
 *
 * `path` carries the working history, and it is prose rather than rows on
 * purpose. As a list beside the degrees it was a CV column standing next to
 * text insisting the page is not a CV, and it needed a note underneath
 * explaining why the sequence made sense — which is an apology in small grey
 * type. Two paragraphs make the same point and make it as an argument.
 *
 * Organisations stay unnamed throughout. Where someone has worked is less
 * useful than how they think, and naming employers would put this site
 * somewhere it does not belong.
 */
export const about: About = {
  eyebrow: "About",
  title: "I optimise business processes before I optimise prompts.",
  lede:
    "This page is not a career summary. It is an attempt to describe how I think about operational problems, because that is the only part of a person that is useful to a reader deciding whether the rest of this site is worth their time.",

  path: [
    "The route here in one pass, because it explains what I notice. I trained as an oil and gas engineer and spent my first years in the field, close to the equipment and to the people who keep it running. Then I moved to the other side of the same projects — scope, cost control, international programmes — and took a second degree in engineering management rather than picking it up as I went. Most recently, five AI projects end to end at a product company, and a full ERP rollout before them.",
    "Three seats at one table, and the same failure watched from each of them: a decision taken early, by someone who could not see what it would cost later. The engineer inherits it, the project manager pays for it, and by the time the problem has a name the money is already gone. Architecture is the seat where that decision gets made rather than absorbed, and that is what I am working towards.",
  ],

  paragraphs: [
    "What I enjoy about this work has very little to do with models. It is the moment in a discovery conversation when two people describe the same process and disagree without noticing — one describing how it is supposed to work, the other how it actually works. The gap between them is where the project lives, and finding it is the interesting part. Everything downstream is engineering.",
    "So my first questions are rarely technical ones. How often does this happen, who absorbs the cost when it goes wrong, and what would people do if the system were unavailable for a day? Those answers shape an architecture more than any requirement does. And the failures I have watched were not failures of accuracy — they were reasonable-sounding assumptions that nobody examined for three months, about data quality, about who would maintain the thing, about whether anyone wanted the output at all. Writing the reasoning down in public is how I try to leave mine findable while they are still cheap to fix.",
  ],

  education: ["Engineering Management", "Energy Engineering (Oil & Gas)"],

  certifications: [
    {
      label: "Project Management Professional (PMP)",
      org: "Project Management Institute",
      issued: "Dec 2024",
      expires: "Dec 2027",
      credentialId: "3992812",
    },
    {
      label: "PDPR — Becoming a Product Manager",
      org: "Skillfactory",
      issued: "Oct 2022",
      credentialId: "189912-XXXVII-701",
    },
    {
      label: "Data-Driven Management",
      org: "Skillfactory",
      issued: "Feb 2021",
      credentialId: "022021-XV-001",
    },
  ],

  /**
   * AZ-104 first: the Solutions Architect Expert exam has an administrator-level
   * prerequisite, so this is not two independent goals but one path with a step
   * in front of it. `issued` and `credentialId` are placeholders, replaced with
   * the real values the day each exam is passed.
   */
  certificationsInProgress: [
    {
      label: "Azure Administrator Associate (AZ-104)",
      org: "Microsoft",
      issued: "In preparation",
      credentialId: "XXXXXXXXX",
    },
    {
      label: "Azure Solutions Architect Expert (AZ-305)",
      org: "Microsoft",
      issued: "In preparation",
      credentialId: "XXXXXXXXX",
    },
  ],

  principles: [
    {
      n: "01",
      t: "Establish what actually happens",
      d: "Volume, frequency, the cost of failure, and what people have already built to cope. Stated process and observed process are rarely the same.",
    },
    {
      n: "02",
      t: "Ask whether AI is the right tool",
      d: "Many problems presented as AI problems are process or data-quality problems in disguise. Better said in week one than after a pilot.",
    },
    {
      n: "03",
      t: "Name the constraints that bind",
      d: "Budget, data protection, and who operates the thing after handover. These narrow the design space faster than any technical requirement.",
    },
    {
      n: "04",
      t: "Design the cheapest thing that could work",
      d: "Add complexity only where something demonstrably breaks. Sophistication nobody can maintain is a liability wearing the costume of an asset.",
    },
    {
      n: "05",
      t: "Write down what would prove this wrong",
      d: "Naming an assumption, and the evidence that would kill it, is what makes a proposal reviewable rather than merely persuasive.",
    },
    {
      n: "06",
      t: "Do not use a model where a rule will do",
      d: "Cheaper, faster, and far easier to explain on the day it goes wrong.",
    },
    {
      n: "07",
      t: "Grounding over training",
      d: "Most organisations do not need a fine-tuned model. They need retrieval they can audit and answers that cite a source.",
    },
    {
      n: "08",
      t: "Every architecture is a trade-off",
      d: "A proposal that appears to have no downside has an undiscovered one.",
    },
    {
      n: "09",
      t: "Design for whoever inherits it",
      d: "If there is no ML team, the architecture must not quietly assume one.",
    },
  ],
};
