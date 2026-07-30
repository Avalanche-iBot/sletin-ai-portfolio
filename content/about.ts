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
 * `background` stays generic by design: discipline and function, never an
 * employer.
 */
export const about: About = {
  eyebrow: "About",
  title: "I optimise business processes before I optimise prompts.",
  lede:
    "This page is not a career summary. It is an attempt to describe how I think about operational problems, because that is the only part of a person that is useful to a reader deciding whether the rest of this site is worth their time.",

  paragraphs: [
    "What I enjoy about designing AI solutions has very little to do with models. It is the moment in a discovery conversation when two people describe the same process and disagree without noticing — one of them is describing how it is supposed to work, the other how it actually works, and the gap between them is where the entire project lives. Finding that gap is the interesting part. Everything downstream is engineering.",
    "I came to this from operations, which shapes what I notice first. When someone describes a problem, my instinct is not to ask which model would solve it. It is to ask how many times a week this happens, who currently absorbs the cost of it going wrong, and what they would do if the system were unavailable for a day. Those three answers usually determine the architecture more than any technical requirement does.",
    "The habit I most want to keep is treating a proposed solution as a hypothesis rather than a conclusion. Most enterprise AI work I have seen fail did not fail on accuracy. It failed because a reasonable-sounding assumption went unexamined for three months — about data quality, about who would maintain it, about whether anyone actually wanted the output. Writing the reasoning down, in public, is a way of making those assumptions findable while they are still cheap to fix.",
  ],

  background: [
    { k: "First degree", v: "Oil and gas engineering — BSc and MSc in transport and storage" },
    { k: "Second degree", v: "MSc in Engineering Management" },
    { k: "Engineering", v: "Field and operations work in the energy sector" },
    { k: "Delivery", v: "Project management and cost control on international programmes" },
    { k: "AI", v: "Five AI projects and a full ERP rollout, in a product company" },
  ],

  backgroundNote:
    "A line rather than a zigzag, and the second degree is where it turns: I went from building things to owning the scope and the money around them deliberately enough to go and study it, rather than by drift. Operations taught me what actually breaks, delivery taught me which constraints are real, and architecture is where both get decided — so the earlier steps are the reason I notice what I notice, not a detour from this one. Organisations are left unnamed on purpose.",

  certifications: [
    { label: "PMP®", org: "Project Management Institute" },
    { label: "Data-Driven Management", org: "SkillFactory, Moscow · 6 months" },
    { label: "Product Management", org: "SkillFactory, Moscow · 12 months" },
  ],

  /**
   * The Azure ladder, in the order it is being taken. All five in progress as at
   * July 2026 — none held, and the block says so rather than implying otherwise.
   */
  certificationsInProgress: [
    { label: "Azure Fundamentals", org: "AZ-900 · Microsoft" },
    { label: "Azure Data Fundamentals", org: "DP-900 · Microsoft" },
    { label: "Azure AI Fundamentals", org: "AI-900 · Microsoft" },
    { label: "Azure AI Apps and Agents Developer Associate", org: "Microsoft" },
    { label: "Azure Solutions Architect Expert", org: "Microsoft" },
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
