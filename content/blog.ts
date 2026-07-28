// Generated content module. Edit freely — this is the CMS layer.
import type { BlogPost } from "./types";

/**
 * Blog posts. `body` is optional: a post can be listed as planned before it is
 * written, which is honest and keeps the section alive. To publish, add a
 * `body` array of blocks.
 */
export const posts: BlogPost[] = [
  {
    "slug": "why-most-enterprise-ai-projects-fail-in-discovery",
    "title": "Most enterprise AI projects fail in Discovery, not in production",
    "excerpt": "Ten questions, asked in the right order, will kill more bad architecture than any evaluation harness. A field guide to the Discovery phase, using a 38-clinic healthcare group as the worked example.",
    "date": "2026-07-20",
    "readingTime": "9 min",
    "tags": [
      "Discovery",
      "Enterprise AI",
      "Requirements"
    ],
    "category": "Architecture",
    "featured": true
  },
  {
    "slug": "do-not-use-an-llm-where-a-rule-will-do",
    "title": "Do not use an LLM where a rule will do",
    "excerpt": "The single largest cost lever in a generative AI system is deciding which requests never reach the model. A practical breakdown of hybrid deterministic + LLM routing.",
    "date": "2026-07-06",
    "readingTime": "7 min",
    "tags": [
      "Cost Optimization",
      "Architecture",
      "Routing"
    ],
    "category": "Cost",
    "featured": true
  },
  {
    "slug": "rag-that-an-auditor-would-accept",
    "title": "RAG that an auditor would accept",
    "excerpt": "Citations, retrieval precision, knowledge ownership and reindexing. What it takes to move from a demo that answers to a system a regulated enterprise will sign off.",
    "date": "2026-06-22",
    "readingTime": "11 min",
    "tags": [
      "RAG",
      "Compliance",
      "GDPR"
    ],
    "category": "RAG",
    "featured": true
  },
  {
    "slug": "cost-per-request-as-an-architecture-constraint",
    "title": "Cost per request as an architecture constraint",
    "excerpt": "If you cannot state the € cost of one user interaction, you do not have an architecture — you have a prototype. Building a token and cost model before writing code.",
    "featured": false, 
    "date": "2026-06-08",
    "readingTime": "8 min",
    "tags": [
      "Cost Optimization",
      "FinOps",
      "Azure"
    ],
    "category": "Cost"
  },
  {
    "slug": "what-an-erp-rollout-taught-me-about-ai-adoption",
    "title": "What an ERP rollout taught me about AI adoption",
    "excerpt": "The technology was never the hard part. Notes on resistance, pilot design and why the front-line operator decides whether your system survives.",
    "date": "2026-05-25",
    "readingTime": "6 min",
    "tags": [
      "Change management",
      "Adoption",
      "Lessons learned"
    ],
    "category": "Delivery",
    "featured": false
  },
  {
    "slug": "agent-orchestration-mcp-and-the-boring-parts",
    "title": "Agent orchestration, MCP, and the boring parts nobody demos",
    "excerpt": "Tool permissions, identity propagation, idempotency and audit trails. Why agentic architecture is mostly an access-control problem wearing a costume.",
    "date": "2026-05-11",
    "readingTime": "10 min",
    "tags": [
      "AI Agents",
      "MCP",
      "Security"
    ],
    "category": "Agents",
    "featured": false
  }
];
