import type { About } from "./types";

/**
 * The About page.
 *
 * Deliberately not a biography — the employment timeline and organisation
 * names were removed on purpose. Those answer "where has he worked", which is
 * a question a CV answers and this site does not need to. What replaces them
 * answers "how does he think", which is the only thing a reader of an
 * architecture notebook can actually use.
 *
 * `background` is the single concession to context, and it stays generic by
 * design: sector and function, never an employer.
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
    "MSc in Engineering Management",
    "Engineering and operations in the energy sector",
    "Project delivery and cost control in large international organisations",
    "AI project management in a product company",
    "Enterprise systems implementation and process optimisation",
  ],

  certifications: [
    {
      label: "PMP®",
      org: "Project Management Institute",
      shaped: "Constraints are design inputs, not obstacles",
      mindset:
        "PMP is usually described as a scheduling qualification, which misses the part that changed how I work. What it actually trains is the discipline of naming a constraint before you start — budget, scope, resource, deadline — and then treating a solution that violates one of them as invalid rather than ambitious. Applied to architecture, that means a design that ignores the fact that the client has no ML team is not a good design with a staffing problem. It is the wrong design.",
    },
    {
      label: "Data-Driven Management",
      org: "Professional certification",
      shaped: "Ask what decision the number is for",
      mindset:
        "The most useful thing this gave me was scepticism about metrics that nobody acts on. Before agreeing to measure something, I now ask which decision changes depending on the result. If no decision changes, the metric is decoration — and a surprising number of AI dashboards are built entirely out of decoration. It also made me wary of accuracy as a headline number, since it hides the distribution of the errors that actually matter.",
    },
    {
      label: "Become a Product Manager",
      org: "Professional certification",
      shaped: "The user's workaround is the real requirement",
      mindset:
        "Product training reframed what a requirement is. Stakeholders describe solutions, not problems — and the workaround someone has already built for themselves in a spreadsheet tells you more about their actual need than anything they will say in a workshop. I now spend most of discovery looking for those workarounds. They are the cheapest available evidence about what a system has to do.",
    },
  ],

  approach: [
    {
      n: "01",
      t: "Establish what actually happens",
      d: "Before anything else: volume, frequency, who is involved, what the current cost of failure is, and what people have already built to cope. Stated process and observed process are rarely the same, and the difference is usually where the value is.",
    },
    {
      n: "02",
      t: "Ask whether AI is the right tool",
      d: "A large share of problems presented as AI problems are process problems, integration problems, or data-quality problems wearing a disguise. I would rather say so early than discover it after a pilot. Where a rule, a form change or a better handoff would do more, that goes in writing.",
    },
    {
      n: "03",
      t: "Name the constraints that bind",
      d: "Budget, data protection, who will operate the thing after handover, what the organisation is already licensed for. These narrow the design space far faster than technical requirements do, and they are the constraints most often discovered too late.",
    },
    {
      n: "04",
      t: "Design the cheapest thing that could work",
      d: "Start from the simplest architecture that satisfies the constraints, then add complexity only where something demonstrably breaks. Sophistication that nobody can maintain is a liability disguised as an asset.",
    },
    {
      n: "05",
      t: "Write down what would prove this wrong",
      d: "Every design rests on assumptions. Naming them — and saying what evidence would invalidate each — is what makes a proposal reviewable instead of merely persuasive.",
    },
  ],

  strengths: [
    {
      t: "Discovery and requirements",
      d: "Turning a vague executive sentence into testable statements and a scoped problem.",
    },
    {
      t: "Make-vs-buy judgement",
      d: "Knowing when not to reach for a model. Most cost overruns start with that decision.",
    },
    {
      t: "Stakeholder translation",
      d: "The same architecture explained three ways: to the board, to IT, to the people who will use it.",
    },
    {
      t: "Cost modelling",
      d: "Cost per request, token budgets and operating ceilings treated as design constraints rather than reporting.",
    },
    {
      t: "Industrial process fluency",
      d: "Operations, maintenance, asset documentation — environments where an unsourced answer is worse than no answer.",
    },
    {
      t: "Delivery under constraint",
      d: "Phased rollout, pilot before scale, explicit exit criteria. The unglamorous part that decides whether anything ships.",
    },
  ],

  philosophy: [
    {
      n: "01",
      t: "Optimise the process before automating it",
      d: "Automating a badly designed process makes it faster and harder to fix. The first question is whether the work needs to happen at all, not how to make a model do it.",
    },
    {
      n: "02",
      t: "Question assumptions before introducing AI",
      d: "Ten well-chosen stakeholder questions eliminate more risk than any model benchmark. Discovery is not a formality that precedes design — it is the design activity.",
    },
    {
      n: "03",
      t: "Do not use a model where a rule will do",
      d: "Deterministic logic for deterministic questions; a model only where language understanding is genuinely required. Cheaper, faster and far easier to explain when it goes wrong.",
    },
    {
      n: "04",
      t: "Grounding over training",
      d: "Most organisations do not need a fine-tuned model. They need retrieval they can audit, answers that cite their source, and a clean escalation path when confidence is low.",
    },
    {
      n: "05",
      t: "Every architecture is a trade-off",
      d: "There is no design without a cost somewhere — latency, money, flexibility, operability. A proposal that appears to have no downside has an undiscovered one.",
    },
    {
      n: "06",
      t: "Design for whoever inherits it",
      d: "If the organisation has no ML team, the architecture must not quietly assume one. Managed services, unremarkable infrastructure, documented runbooks.",
    },
  ],

  workingStyle: [
    "Written first — a decision lands in a short brief before it lands in code, so it can be argued with while changing it is still cheap.",
    "Case-based learner. I build the realistic scenario, then learn whatever stack the scenario demands, rather than the other way round.",
    "Explicit about gaps. I would rather write 'not yet' than overclaim and lose the reader at the first technical question.",
    "Comfortable being corrected in public. That is most of the reason this site exists in its current form.",
  ],
};
