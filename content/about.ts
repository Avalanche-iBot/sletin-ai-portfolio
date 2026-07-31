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
 * The opening carries the working history in prose rather than as rows next
 * to the degrees, and as one continuous piece rather than two blocks in
 * different registers — a "path" set slightly larger and divided by a rule
 * from a separate "why I find this interesting" section. There is only one
 * train of thought here: where I have been, what that qualifies me to say,
 * and the questions it makes me ask first. Splitting it implied otherwise.
 *
 * Three paragraphs, down from four, and the two that went were the two doing
 * literary work. One built a figure — three seats at one table, the same
 * decision watched from each — and the figure was the argument, which is the
 * failure mode this whole site is written against. The other opened "what I
 * enjoy about this work" and staged a scene in a discovery workshop that
 * never happened, to make a point that survives without it: the distance
 * between the stated process and the observed one is where the project is.
 * That sentence now sits inside the questions paragraph, where it is a
 * consequence of asking them rather than an anecdote about a room.
 *
 * The chronology was also wrong, in the direction that flatters. It had the
 * AI projects as the most recent work and the ERP rollout before them; both
 * are the other way round, and neither is recent. The actual sequence is
 * field engineering (two years, plus two student placements — not the
 * "several years of operational work" this page and site.ts both claimed),
 * then a second MSc, then a year of AI delivery, then a year of ERP, then
 * process optimisation and cost control from 2024 to now.
 *
 * That correction is what the second paragraph is now about, because the
 * corrected order is more interesting than the flattering one: AI delivery
 * came *before* the process engineering, which is backwards, and being on
 * the process side afterwards is what makes the AI experience worth reading.
 * It also turns the page title from a slogan into a job description, which
 * it had accidentally been all along.
 *
 * site.ts still carries the old inflated version in `whyMe`. Two pages
 * describing one working history must not describe it differently — fixing
 * that is the next edit, not a separate opinion.
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

  paragraphs: [
    "I trained as a petroleum engineer: two student summers on pipeline terminals, then two years on upstream assets — long enough to read an inspection report without help, and to learn what an engineer will and will not trust a system to tell them. Then I changed country and discipline at once, and took a second MSc in engineering management. A year running AI projects at an AI company came out of that, five of them end to end, and a year running a full ERP rollout after it. Since 2024 I have worked as a project engineer on process optimisation, automation and cost control.",
    "The order matters more than the list. I did the AI delivery first and the process engineering afterwards, which is the reverse of the usual route, and it is the reason this page is titled the way it is — process optimisation and cost control is not a positioning line here, it is the job. Seen from that seat, most of what gets proposed as an AI problem is a process that was already failing before anyone mentioned a model, and would still fail underneath a good one. So: I did not arrive at this from machine learning, and the notes on this site show it. What I can offer a reader is the other half — what the work costs, who ends up operating it, and which assumption in the business case is the one to check first.",
    "So my first questions are rarely technical. How often does this happen, who absorbs the cost when it goes wrong, and what would people do if the system were unavailable for a day? Those answers shape an architecture more than any requirement does, and they surface the thing a requirements document cannot — the distance between how a process is supposed to run and how it actually runs. The failures I have watched were rarely failures of accuracy. They were reasonable-sounding assumptions nobody examined for three months: about data quality, about who would maintain the thing, about whether anyone wanted the output at all. Writing the reasoning down in public is how I try to leave mine findable while they are still cheap to fix.",
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
      label: "Becoming a Product Manager",
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
