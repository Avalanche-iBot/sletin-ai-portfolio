// Generated content module. Edit freely — this is the CMS layer.
import type { Site, WhyMe, Service, Engagement } from "./types";

export const site: Site = {
  "name": "Aleksandr Sletin",
  "brandShort": "A. Sletin",
  "role": "AI Architecture Portfolio",
  "tagline": "Designing Enterprise AI Systems That Solve Real Business Problems",
  "positioning": "Engineering and project-delivery background in energy and industrial operations. PMP certified. Now designing enterprise AI architectures — where the hard part is not the model, but the questions you ask before you choose one.",
  "location": "Milan, Italy",
  "email": "alexander.slyotin@gmail.com",
  "phone": "+39 371 469 0274",
  "github": "https://github.com/Avalanche-iBot",
  "linkedin": "https://linkedin.com/in/aleksandrsletin1995",
  "availability": "Knowledge sharing, not consulting advice"
};

export const whyMe: WhyMe = {
  "eyebrow": "Why this background is unusual",
  "title": "Most AI architecture candidates have never sat in the room where the budget is decided.",
  "body": "I did not come to AI from a computer-science degree. I came from industrial operations, cost reports and steering committees — which means I have spent years translating between people who own a technical system and people who own its budget. That translation layer is exactly where enterprise AI projects succeed or quietly die.",
  "pillars": [
    {
      "num": "01",
      "title": "Industrial domain depth",
      "body": "Petroleum engineering MSc, field engineering experience, and several years of operational work inside large international industrial organisations. I understand P&IDs, inspection reports and asset data — and why an engineer will not trust a system that cannot show its source.",
      "tags": [
        "Oil & Gas",
        "Industrial ops",
        "Asset data"
      ]
    },
    {
      "num": "02",
      "title": "Delivery discipline",
      "body": "PMP certified. Five AI projects managed end-to-end at an AI company, plus a full ERP rollout. Scope, budget, stakeholders, phased rollout — the unglamorous part that decides whether an architecture ever reaches production.",
      "tags": [
        "PMP",
        "Agile / Scrum",
        "Cost control"
      ]
    },
    {
      "num": "03",
      "title": "Architecture-first thinking",
      "body": "Every case study here starts with Discovery, not with a model choice. Make-vs-buy, hybrid deterministic + LLM routing, RAG boundaries, cost per request, GDPR posture. The architecture is the deliverable — code is the consequence.",
      "tags": [
        "Solution design",
        "Azure",
        "RAG & agents"
      ]
    }
  ]
};

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

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/learning", label: "Learning Journey" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
