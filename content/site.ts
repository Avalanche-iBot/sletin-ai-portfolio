import type { Site, WhyMe, Service, Engagement } from "./types";

/**
 * Site-wide content: identity, contact details, navigation.
 *
 * This is the content layer, not code — everything here is meant to be edited
 * directly. Components read from these exports rather than holding copy of
 * their own, so a change here propagates everywhere the value appears and no
 * two places can disagree about what the site says.
 */

export const site: Site = {
  "name": "Aleksandr Sletin",
  "brandShort": "Aleksandr Sletin",
  "role": "Independent AI Architecture Notebook",
  "tagline": "Notes on how enterprise AI problems get analysed before they get built",
  "positioning": "An open notebook on enterprise AI architecture. Each case note takes an operational problem apart — the questions worth asking, the constraints that actually bind, the trade-offs behind each decision — and leaves the reasoning visible so it can be argued with.",
  "location": "Milan, Italy",
  "email": "alexander.slyotin@gmail.com",
  "phone": "+39 371 469 0274",
  "github": "https://github.com/Avalanche-iBot",
  "linkedin": "https://linkedin.com/in/aleksandrsletin1995",
  "availability": "Knowledge sharing, not consulting advice",
  "url": "https://aleksandrsletin.com"
};

/**
 * The site's public address for this build.
 *
 * Falls back to the canonical domain above, so a local or preview build still
 * produces valid absolute URLs. Vercel preview deployments set
 * `NEXT_PUBLIC_SITE_URL` to their own address, which stops a preview from
 * advertising the production domain in its metadata and sitemap.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const whyMe: WhyMe = {
  "eyebrow": "Where this thinking comes from",
  "title": "Enterprise AI rarely fails on the model. It fails in the gap between the people who own a system and the people who own its budget.",
  "body": "I did not arrive at AI from a computer-science degree. I arrived from industrial operations, cost reports and steering committees. That route shapes what I notice first in a problem — and it is the reason these notes spend more time on constraints and stakeholders than on model selection.",
  "pillars": [
    {
      "num": "01",
      "title": "Operations, seen from inside",
      "body": "Petroleum engineering MSc, field engineering, and several years of operational work inside large international industrial organisations. Enough exposure to P&IDs, inspection reports and asset data to know why an engineer will not trust a system that cannot show its source.",
      "tags": [
        "Oil & Gas",
        "Industrial ops",
        "Asset data"
      ]
    },
    {
      "num": "02",
      "title": "Delivery constraints as design inputs",
      "body": "PMP certified. Five AI projects managed end-to-end at an AI company, plus a full ERP rollout. Scope, budget and phased rollout are not administrative afterthoughts — they are constraints that change what the architecture is allowed to be.",
      "tags": [
        "PMP",
        "Agile / Scrum",
        "Cost control"
      ]
    },
    {
      "num": "03",
      "title": "Questions before diagrams",
      "body": "Every note here opens with discovery, not with a model choice. Make-vs-buy, deterministic logic before LLM routing, retrieval boundaries, cost per request, data-protection posture. Where a rule would do the job, the note says so.",
      "tags": [
        "Solution design",
        "Azure",
        "RAG & agents"
      ]
    }
  ]
};

/**
 * Retained but no longer rendered.
 *
 * A services menu framed the site as a consulting offer, which is not what it
 * is. The data is kept here so a services or rate page can be reintroduced
 * later as a deliberate decision rather than rebuilt from nothing.
 */
export const services: Service[] = [
  {
    "t": "Enterprise AI Strategy",
    "d": "Opportunity mapping, make-vs-buy evaluation, prioritised AI portfolio with a defensible business case.",
    "tier": "Advisory"
  },
  {
    "t": "AI Solution Architecture",
    "d": "Target architecture, integration boundaries, security and cost model, HLD and ADRs.",
    "tier": "Core"
  },
  {
    "t": "RAG Solutions",
    "d": "Retrieval design over your own documents: chunking, embeddings, vector store, citations, reindexing.",
    "tier": "Core"
  },
  {
    "t": "LLM Integration",
    "d": "Model selection and routing, prompt architecture, guardrails, evaluation and observability.",
    "tier": "Core"
  },
  {
    "t": "Business Process Automation",
    "d": "Process mapping, deterministic-first automation, human-in-the-loop design.",
    "tier": "Delivery"
  },
  {
    "t": "Workflow Automation",
    "d": "n8n / Make / Power Platform orchestration connecting existing enterprise systems.",
    "tier": "Delivery"
  },
  {
    "t": "AI Consulting",
    "d": "Discovery workshops, architecture review, risk and cost assessment of an existing AI initiative.",
    "tier": "Advisory"
  },
  {
    "t": "Digital Transformation",
    "d": "ERP and data-platform adjacent programmes, phased rollout and change management.",
    "tier": "Advisory"
  }
];

export const engagements: Engagement[] = [
  {
    "t": "Discovery Sprint",
    "len": "1–2 weeks",
    "d": "Stakeholder interviews, process and data assessment, AI viability verdict, scoped use cases.",
    "out": [
      "Discovery report",
      "Prioritised use cases",
      "Go / no-go recommendation"
    ]
  },
  {
    "t": "Architecture Package",
    "len": "2–4 weeks",
    "d": "Target architecture with technology selection, security posture, cost model and phased roadmap.",
    "out": [
      "Solution architecture diagram",
      "HLD + ADRs",
      "Cost & KPI model",
      "Implementation roadmap"
    ]
  },
  {
    "t": "Proof of Value",
    "len": "4–8 weeks",
    "d": "Working thin-slice implementation against real data with measured KPIs.",
    "out": [
      "Working MVP",
      "Evaluation harness",
      "Pilot report"
    ]
  }
];

/**
 * Primary navigation, used by both the header and the footer.
 *
 * Order is the order shown. Adding a page here puts it in both places at once —
 * but a route must exist at that `href`, since nothing generates the page from
 * this list. Remember `app/sitemap.ts` too, which keeps its own list of static
 * routes for search engines.
 *
 * `as const` makes the array and its strings readonly, so an accidental
 * `nav.push(…)` elsewhere in the codebase is a compile error rather than a
 * menu that changes at runtime.
 */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Case Studies" },
  { href: "/architecture", label: "Architecture" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
