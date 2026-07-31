import type { About } from "./types";

/**
 * The About page: an opening with credentials beside it, and the principles.
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
    "I started in field engineering — two years on upstream oil and gas assets in Russia — then moved to Italy in 2019 and started again, in a different country and a different discipline. A second MSc, in engineering management, came out of that move. The AI company that followed is where I learned to be a project manager, not where I built AI systems end to end; the concrete thing I did there was introduce and adapt Scrum for a team that had been running without one. A full ERP rollout came next. Since 2024 I have worked as a project engineer on process optimisation, automation and cost control, inside a large enterprise, which is where I am now.",
    "That is not the résumé of someone who has architected AI systems for a living — it is the résumé of someone who has stood in three different seats around a project and decided, from there, that solution architecture is the seat worth moving into. The Azure certifications below are in progress rather than finished for the same reason this domain does not resolve yet: I am building toward the role in public, on a timeline I have set myself, rather than claiming it early because the title would read well. What the path above already gives me is the harder half of the job — I know what a process costs to run, who inherits what gets built, and how much of a project's real difficulty has nothing to do with the model. The case notes on this site are where I practise the other half, in the open, before I call it a job title.",
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
