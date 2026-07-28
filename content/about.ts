// Generated content module. Edit freely — this is the CMS layer.
import type { About } from "./types";

export const about: About = {
  "eyebrow": "About",
  "title": "From wells and cost reports to enterprise AI architecture.",
  "lede": "I am Aleksandr Sletin — an engineer and project manager based in Italy, working in industrial operations inside large international organisations. Over the last two years I have deliberately re-pointed my thinking at one question: how an enterprise AI system can be designed so that a real company can afford, trust, audit and operate it.",
  "paragraphs": [
    "My path has zig-zagged, and that turns out to be the point. Petroleum engineering gave me the domain. Project management gave me the delivery discipline and the vocabulary of the business. An AI startup gave me my first real exposure to what breaks in AI projects — which is almost never the model.",
    "What I am not, yet, is a ten-year platform engineer. I am explicit about that on this site. What I am is someone who can sit a CFO, a CIO and a front-line operator in the same room, come out with a defensible architecture, and then build enough of it to find out where the reasoning was wrong."
  ],
  "timeline": [
    {
      "period": "2019 — 2021",
      "role": "Petroleum Engineer",
      "org": "Energy sector",
      "body": "Field and technical engineering. Digitised a 2,300-pipeline asset database — my first real lesson in how much enterprise value is trapped in unstructured technical documents.",
      "tags": [
        "Asset data",
        "Technical documentation"
      ]
    },
    {
      "period": "2021 — 2022",
      "role": "Project Management track · PMP",
      "org": "PMI certification",
      "body": "Formalised delivery: Agile/Scrum, stakeholder management, earned value and cost control. MSc Management Engineering, University of Genoa.",
      "tags": [
        "PMP",
        "Agile",
        "Cost control"
      ]
    },
    {
      "period": "2022 — 2023",
      "role": "AI Project Manager",
      "org": "AI company",
      "body": "Managed five AI projects end-to-end. Acted as the bridge between business stakeholders and the data-science team — requirements, feasibility, expectation management, delivery.",
      "tags": [
        "5 AI projects",
        "Business ↔ DS bridge"
      ]
    },
    {
      "period": "2023",
      "role": "Engineering Manager · ERP implementation",
      "org": "Industrial client",
      "body": "Led an ERP rollout: process mapping, integration boundaries, data migration, change management. Enterprise integration seen from the inside.",
      "tags": [
        "ERP",
        "Process mapping",
        "Change mgmt"
      ]
    },
    {
      "period": "Feb 2024 — present",
      "role": "Industrial Operations Engineer / Cost Control",
      "org": "Large international industrial organisation",
      "body": "Operational and cost-control work inside a complex international enterprise — standards, governance, and the stakeholder reality that decides whether anything actually gets adopted.",
      "tags": [
        "Industrial operations",
        "Enterprise context",
        "Excel/VBA · Power BI"
      ]
    },
    {
      "period": "2025 — 2026",
      "role": "Enterprise AI Solutions Architecture",
      "org": "Deliberate transition",
      "body": "A structured technical roadmap plus a growing set of written case studies: discovery → architecture → cost model → risks → KPIs → roadmap → reflection.",
      "tags": [
        "Target role",
        "In progress"
      ],
      "current": true
    }
  ],
  "credentials": [
    {
      "label": "PMP®",
      "org": "Project Management Institute",
      "note": "Certified project manager"
    },
    {
      "label": "MSc Petroleum Engineering",
      "org": "Gubkin / industry track",
      "note": "Domain foundation"
    },
    {
      "label": "MSc Management Engineering",
      "org": "University of Genoa",
      "note": "Business & operations"
    },
    {
      "label": "Languages",
      "org": "RU · EN · IT",
      "note": "Working proficiency across all three"
    }
  ],
  "strengths": [
    {
      "t": "Discovery & requirements",
      "d": "Turning a vague executive sentence into testable requirements and a scoped architecture."
    },
    {
      "t": "Make-vs-buy judgement",
      "d": "Knowing when not to use an LLM. Most cost overruns start here."
    },
    {
      "t": "Stakeholder translation",
      "d": "Same architecture, three audiences: board, IT, operators."
    },
    {
      "t": "Cost modelling",
      "d": "Cost per request, token budgets, OPEX ceilings — treated as design constraints."
    },
    {
      "t": "Industrial domain fluency",
      "d": "Energy, wells, maintenance, EPC, asset documentation."
    },
    {
      "t": "Shipping under constraint",
      "d": "PMP discipline: phased rollout, pilot before scale, measurable exit criteria."
    }
  ],
  "philosophy": [
    {
      "n": "01",
      "t": "The architecture starts before the technology",
      "d": "Ten stakeholder questions well chosen will eliminate more risk than any model benchmark. Discovery is not a formality — it is the design activity."
    },
    {
      "n": "02",
      "t": "Do not use an LLM where a rule will do",
      "d": "Hybrid by default: deterministic logic for deterministic questions, LLM only where natural language understanding is genuinely required. Cheaper, faster, more predictable."
    },
    {
      "n": "03",
      "t": "Grounding over training",
      "d": "Enterprises rarely need a fine-tuned model. They need retrieval they can audit, with citations, and a clean escalation path when confidence is low."
    },
    {
      "n": "04",
      "t": "Cost and compliance are first-class requirements",
      "d": "€ per request, GDPR posture, data residency and auditability belong in the first architecture diagram, not in a later hardening phase."
    },
    {
      "n": "05",
      "t": "Design for the operator who will inherit it",
      "d": "If the client has no ML team, the architecture must not assume one. Managed services, boring infrastructure, documented runbooks."
    }
  ],
  "workingStyle": [
    "Written-first: every decision lands in an ADR or a one-page brief before it lands in code.",
    "Case-based learner — I build the realistic scenario, then learn the stack the scenario demands.",
    "Explicit about gaps. I would rather say 'not yet' than overclaim and lose credibility in a technical interview.",
    "Roughly 50 hours per week of structured study on top of a full-time role."
  ]
};
