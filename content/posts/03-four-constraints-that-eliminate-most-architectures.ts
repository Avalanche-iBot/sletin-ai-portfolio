import type { BlogPost } from "../types";

/** Drawn from the discovery section of the patient communication note. */
const post: BlogPost = {
  slug: "four-constraints-that-eliminate-most-architectures",
  title: "Four constraints that eliminate most architectures",
  excerpt:
    "Discovery usually produces a requirements list nobody reads twice. Four questions do more than the whole document, because their answers remove options instead of adding wishes.",
  date: "2026-07-30",
  readingTime: "8 min",
  tags: ["Discovery", "Requirements", "Enterprise AI"],
  category: "Architecture",
  featured: true,
  body: [
    {
      paragraphs: [
        "Most discovery output is additive. Stakeholders describe what they would like, someone writes it down, and the result is a list of capabilities that a dozen different architectures could satisfy equally well. It is not useless — it tells you what the system is for — but it decides nothing.",
        "The questions worth asking are the ones whose answers remove options. Four of them do most of the work. Asked in the first fortnight they will save you from designing something that was never going to be permitted; asked in the third month they invalidate work you have already done.",
      ],
    },
    {
      heading: "One: where may the data be, and where may it not go?",
      paragraphs: [
        "Residency is usually treated as a compliance checkbox to be confirmed near the end, by someone else. It is not a checkbox. It is a filter applied to the option set before evaluation begins, and applying it late means evaluating options you were never allowed to choose.",
        "If personal data may not leave a jurisdiction, the question stops being \"which model performs best\" and becomes \"which models exist for me at all\". Model availability by region is uneven and changes on the provider's schedule, not yours. The strongest option is frequently not offered where you need it, and the one that is may be a generation behind.",
        "It propagates further than people expect. The retrieval service has to be in-region. The vector index has to be in-region. Backups, and the region they replicate to. Observability, which is where prompts and completions land and which is very often configured by someone who was thinking about uptime rather than about personal data.",
        "The version of the question that actually works: not \"do we have GDPR requirements\" — everyone says yes — but \"name a system we use today where data of this kind is stored, and tell me which region it is in\". That produces a fact rather than a policy.",
      ],
      bullets: [
        "What it eliminates: any provider without a compliant regional offering, and often the strongest model available globally.",
        "What it adds: region pinning as a first-class concern, and a retention and deletion story that has to be designed rather than assumed.",
        "Cost of asking late: an evaluation of eight options where three were viable.",
      ],
    },
    {
      heading: "Two: who operates this afterwards, and what is their actual job?",
      paragraphs: [
        "Not \"do you have a data team\". The useful form is about the named individual who will be paged at three in the morning eighteen months from now, and what else that person is responsible for during the day.",
        "Where the answer is a DevOps engineer whose primary work is something else entirely, managed services stop being one option among several and become the only defensible choice. Not because they are technically superior — a self-hosted embedding model and an operated vector store will usually be cheaper per query at volume, and give you more control over quality. Because they survive handover to somebody whose attention is elsewhere.",
        "This is the constraint that eliminates the most designs, and the one most often discovered after the architecture has been drawn. It is also the one architects are most tempted to argue with, because the technically better answer is right there and the organisational reality is annoying.",
        "The useful follow-up: \"when the retrieval quality degrades in month nine, who notices, and how?\" If there is no answer, the design needs to fail loudly rather than degrade quietly, and that is an architectural requirement rather than an operational preference.",
      ],
      bullets: [
        "What it eliminates: self-hosted models, operated vector clusters, anything requiring periodic retraining, and any component whose failure mode is gradual.",
        "What it adds: managed services throughout, and monitoring that a non-specialist can act on.",
        "Cost of asking late: a design that works beautifully at handover and is unmaintainable by month twelve.",
      ],
    },
    {
      heading: "Three: what already exists that you must inherit?",
      paragraphs: [
        "Identity, permissions, audit trails, document storage. In an organisation of any age these exist, are governed, have an owner and a review cycle, and — crucially — somebody notices when they break.",
        "A design that reuses them inherits all of that for nothing. A design that introduces a second source of truth for who works here has created a liability: the place where a departed employee's access quietly survives, because offboarding runs against the directory and not against your application.",
        "The same applies to documents. Copying a corpus into a new store creates a second, quietly diverging truth and a permanent synchronisation burden. Reading from where the documents already live inherits their permissions and their versioning.",
        "This constraint cuts in both directions, which is why it deserves stating explicitly rather than being quietly enjoyed. Inheriting a governed estate makes a project dramatically cheaper — and that is luck, not architecture. When a case note says a system was quick to build because identity, audit and document versioning were already in place, that part does not transfer to a reader whose organisation has none of it. Saying so is the difference between a useful note and a misleading one.",
      ],
      bullets: [
        "What it eliminates: a separate identity provider, a new document store, a bespoke audit log — or, if nothing exists to inherit, an entire workstream reappears that a comparable project did not have.",
        "What it adds: integration constraints shaped by whatever the existing systems can actually expose. \"Programmatically accessible\" and \"there is a screen a human uses\" are very different answers.",
        "Cost of asking late: discovering in month three that the CRM has no usable write API.",
      ],
    },
    {
      heading: "Four: what per-request cost makes this worth doing?",
      paragraphs: [
        "Ask for a number, not a sentiment. Everybody says cost matters. A ceiling turns cost from a reporting line into a non-functional requirement, and non-functional requirements change designs in a way that sentiments do not.",
        "Once a figure exists, routing becomes architectural rather than an optimisation to be done later. Whether a request reaches a model at all, which tier answers it, how much retrieved context is packed into a prompt, whether a cache sits in front of any of it — these stop being tuning knobs and start being the thing that determines whether the system is viable at the volumes the business is planning for.",
        "The derivation is worth doing in front of the person who owns the budget, because it is usually the first time anyone has seen the arithmetic. Input tokens times input price, plus output tokens times output price, plus retrieval. Multiply by requests per month. The number that comes out is frequently either reassuringly small or alarmingly large, and both outcomes change the conversation immediately.",
        "Two refinements that repay the effort. Separate the expected cost from the ceiling — a ceiling equal to your expectation is not a ceiling, it is a forecast, and it leaves no room for the assumption that turns out optimistic. And give the answer as a range with the parameters that move it, because a single number will be quoted back at you for two years.",
      ],
      bullets: [
        "What it eliminates: architectures where every request reaches a model, single-tier model selection, and prompts that carry context nobody reads.",
        "What it adds: a cost dashboard someone actually looks at daily, and ideally a regression test that prices a representative traffic mix on every change.",
        "Cost of asking late: discovering unit economics do not work after the system is built.",
      ],
    },
    {
      heading: "A fifth question I do not include, and why",
      paragraphs: [
        "\"What is the deadline?\" It matters enormously to delivery and it eliminates almost nothing architecturally. A tight timeline changes sequencing — what ships in phase one — but rarely rules out a shape of system. It compresses; it does not exclude.",
        "The test for whether a discovery question belongs on this list is simple: can you name a design that becomes impossible depending on the answer? If not, it is a planning question. Both kinds are necessary; only one of them belongs in the architecture conversation.",
      ],
    },
    {
      heading: "When the answer is \"we do not know\"",
      paragraphs: [
        "This happens most often on the cost ceiling and on the operating question, and it is more useful than it looks. \"We have never calculated what this costs us today\" is itself a finding, and frequently the most valuable output of the first fortnight.",
        "The response is not to guess quietly. It is to state the assumption, mark it as an assumption, and name what changes if it is wrong. A design built on \"we assumed operating budget of €80,000 a year, and below €40,000 this shape stops working\" is honest and reviewable. A design built on an unstated guess is neither, and the guess will be discovered by someone else at the worst possible moment.",
      ],
    },
    {
      heading: "Why these four",
      paragraphs: [
        "Each one, answered honestly, invalidates whole categories rather than trimming details. Residency removes providers. Operating capability removes anything self-hosted or gradually degrading. An inherited estate removes — or, in its absence, reinstates — an entire workstream. A cost ceiling removes architectures where every request reaches a model.",
        "Answer all four and the remaining space is usually small enough to reason about properly, which is the actual point. The output of discovery worth having is not a list of what the system should do. It is a short list of what it can no longer be, written down where everyone can see it, so that the option somebody re-proposes in month four can be answered with a reason rather than a preference.",
      ],
    },
  ],
};

export default post;
