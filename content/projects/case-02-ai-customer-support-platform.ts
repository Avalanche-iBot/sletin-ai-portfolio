// Generated content module. Edit freely — this is the CMS layer.
import type { CaseStudy } from "../types";

const caseStudy: CaseStudy = {
  "slug": "ai-customer-support-platform",
  "order": 2,
  "title": "AI Customer Support Platform",
  "subtitle": "Cutting first-response time on a 40,000-ticket-a-year B2B support desk without breaking the SLA guarantees an enterprise contract depends on.",
  "industry": "B2B SaaS",
  "domain": "Customer operations · Support desk",
  "status": "In analysis",
  "architectureComplexity": 3,
  "shortSummary": "A support platform that answers what it can prove and routes everything else. The architectural question is not whether a model can answer tickets, but how contractual SLAs stay auditable once a model is in the loop.",
  "tags": [
    "RAG",
    "Ticket routing",
    "SLA",
    "Multilingual",
    "Human-in-the-loop"
  ],
  "featured": true,
  "client": "Mid-market B2B SaaS",
  "clientNote": "~900 employees · EU + US",
  "statusNote": "Discovery complete. Architecture drafted; autonomy policy and SLA guardrails under review.",
  "complexityLabel": "Medium–High — SLA-bound routing, multilingual, earned autonomy",
  "duration": "Reference programme: 5 months to production",
  "impact": "Target: 45% deflection · first response < 2 min · zero SLA breaches attributable to AI",
  "role": "Solution Architect (case study author)",
  "githubUrl": "",
  "liveDemoUrl": "",
  "demoNote": "Architecture-first case study — build scheduled",
  "techGroups": [
    {
      "group": "AI",
      "items": [
        "Azure OpenAI",
        "Azure AI Search",
        "Cross-encoder reranking"
      ]
    },
    {
      "group": "Backend",
      "items": [
        "Python",
        "FastAPI",
        "Celery"
      ]
    },
    {
      "group": "Data",
      "items": [
        "PostgreSQL",
        "Redis",
        "Blob Storage"
      ]
    },
    {
      "group": "Integrations",
      "items": [
        "Zendesk API",
        "Jira",
        "Slack",
        "Status page"
      ]
    }
  ],
  "executiveSummary": {
    "statement": "Support cost per ticket rose faster than revenue for six consecutive quarters. The obvious move — a chatbot on the help centre — was rejected during discovery: 62% of ticket volume is not FAQ, it is account-specific troubleshooting that requires reading the customer's own configuration.\n\nThe architecture therefore splits the problem. A retrieval layer grounded in versioned product documentation drafts answers where documentation can answer. A separate deterministic layer resolves account-state questions by calling internal APIs rather than by generation. Anything touching billing, security incidents or contractual language routes to a human with a drafted summary attached — the system accelerates the agent instead of replacing them.",
    "highlights": [
      {
        "k": "Business driver",
        "v": "Support cost per ticket down 30% at flat headcount"
      },
      {
        "k": "Hard constraint",
        "v": "Contractual SLAs must remain auditable"
      },
      {
        "k": "Rejected option",
        "v": "Public-facing autonomous chatbot"
      },
      {
        "k": "Architectural verdict",
        "v": "Agent-assist first; autonomy earned per intent"
      }
    ]
  },
  "businessContext": {
    "narrative": "The company sells to enterprise buyers whose contracts specify response times by severity. Support headcount grew 3x in two years while ARR grew 2.2x. Two prior automation attempts failed — a decision-tree bot customers learned to bypass, and a macro library nobody maintained.\n\nThat history is the real constraint. The organisation has already been burned, so the architecture has to earn trust incrementally and be measurable from week one.",
    "companyFacts": [
      {
        "k": "Tickets / year",
        "v": "~40,000"
      },
      {
        "k": "Support headcount",
        "v": "34"
      },
      {
        "k": "Languages",
        "v": "5"
      },
      {
        "k": "Phase-1 budget",
        "v": "€160,000"
      },
      {
        "k": "Failed attempts",
        "v": "2 prior automation projects"
      }
    ],
    "drivers": [
      "Support cost per ticket growing faster than revenue",
      "Enterprise customers escalating on first-response time",
      "Senior agents spending 40% of their time on repeat questions",
      "Product knowledge trapped in individual agents' heads"
    ],
    "constraints": [
      "Contractual SLAs are audited quarterly by customers",
      "No EU customer data may leave the EU",
      "Must live inside the existing Zendesk workflow — agents will not adopt a second tool",
      "Phase-1 budget €160,000"
    ],
    "existingStack": [
      "Zendesk",
      "Jira",
      "Confluence",
      "Slack",
      "Snowflake",
      "Azure"
    ]
  },
  "stakeholders": [
    {
      "role": "VP Customer Success",
      "interest": "Lower cost per ticket without CSAT regression",
      "concern": "One bad AI answer on a renewal account costs more than the savings",
      "influence": "Sponsor"
    },
    {
      "role": "Support agents (tier 1–3)",
      "interest": "Fewer repetitive tickets, faster context gathering",
      "concern": "Being measured against an AI, or losing autonomy",
      "influence": "Adoption make-or-break"
    },
    {
      "role": "CISO",
      "interest": "No customer data in third-party training",
      "concern": "Prompt logs containing credentials or PII",
      "influence": "Compliance gate"
    },
    {
      "role": "CFO",
      "interest": "Predictable per-ticket cost",
      "concern": "Token spend scaling linearly with volume",
      "influence": "Budget gate"
    }
  ],
  "discovery": {
    "groups": [
      {
        "audience": "VP Customer Success",
        "goal": "Separate the cost problem from the quality problem.",
        "questions": [
          "Which severity tiers drive the cost, and which drive the complaints?",
          "What does a good resolution look like to your largest account?",
          "Which SLA breaches actually happened last year, and why?",
          "Would you accept slower resolution in exchange for consistency?"
        ],
        "answers": [
          "Tier 3 volume drives cost; tier 1 severity drives complaints.",
          "Breaches came from weekend coverage gaps, not from slow answers.",
          "Consistency matters more than speed above a two-minute floor."
        ]
      },
      {
        "audience": "Support agents",
        "goal": "Find where the time actually goes before automating the wrong step.",
        "questions": [
          "Walk me through the last ticket that took too long. Where did the time go?",
          "What do you look up before you can even start answering?",
          "Which macros do you trust, and which do you ignore?",
          "What would you want drafted for you, and what would you never want auto-sent?"
        ],
        "answers": [
          "Most time goes to gathering account context across four systems, not writing.",
          "Nobody trusts auto-send. Everybody wants a draft plus a config summary."
        ]
      },
      {
        "audience": "CISO and CFO",
        "goal": "Establish the non-negotiables early enough to shape the design.",
        "questions": [
          "What may never appear in a prompt or a log?",
          "What per-ticket cost ceiling makes this worth doing?",
          "How should data residency differ between EU and US accounts?"
        ],
        "answers": [
          "Credentials and payment data must be redacted before any model call.",
          "AI cost per handled ticket must stay under €0.04."
        ]
      }
    ],
    "intro": "Discovery answered a question the client had not asked: which tickets are actually answerable from documentation? The answer reshaped the entire scope.",
    "assumptions": [
      "Product documentation is accurate enough to ground answers; a documentation audit is a phase-0 deliverable.",
      "Account-state questions are answerable through existing internal APIs.",
      "Agents accept draft-and-review but not autonomous replies on named accounts.",
      "Ticket volume mix stays broadly stable across the pilot."
    ],
    "implications": [
      {
        "finding": "62% of volume needs account state, not documentation",
        "implication": "Retrieval alone cannot carry the solution. Deterministic API tool-calling becomes a first-class layer."
      },
      {
        "finding": "Time is lost in context gathering, not writing",
        "implication": "The highest-value feature is an automatic account-context summary, which needs no generation at all."
      },
      {
        "finding": "SLAs are audited by customers",
        "implication": "Every AI action needs an immutable, exportable audit record tied to the ticket."
      },
      {
        "finding": "Two prior automation attempts failed",
        "implication": "The rollout must produce measurable value in phase 1, before any generative feature is customer-visible."
      }
    ],
    "businessRisks": [
      "A confident wrong answer on an enterprise account during renewal",
      "Agent resistance if the tool is framed as headcount reduction",
      "Deflection metrics gamed by closing tickets the customer reopens"
    ],
    "technicalConstraints": [
      "EU data residency per account",
      "Zendesk API rate limits shape the sync design",
      "Documentation is versioned by release — retrieval must be version-aware"
    ]
  },
  "analysis": {
    "aiNeeded": {
      "verdict": "Partly — and less than the client assumed",
      "body": "About a third of volume is genuinely language-shaped work where retrieval and generation earn their cost. The rest is integration work mistaken for an AI problem because humans currently do it by reading four screens."
    },
    "automationAlternative": {
      "verdict": "Conventional automation solves more of this than the AI does",
      "canAutomate": [
        "Account context assembly across systems",
        "Severity classification from structured signals",
        "Duplicate and reopened-ticket detection",
        "Status-page correlation during incident bursts"
      ],
      "cannotAutomate": [
        "Free-text troubleshooting narratives",
        "Summarising a 40-message thread for escalation",
        "Explaining a technical cause at a non-technical buyer's level"
      ],
      "body": "Building the deterministic layer first also produces the evaluation data needed to prove the generative layer is safe."
    },
    "valueAreas": [
      "Draft-and-review answers where documentation can ground them",
      "Automatic account-context summary on every ticket open",
      "Thread summarisation at escalation",
      "Documentation gap reports from low-confidence retrievals"
    ],
    "outOfScope": [
      "Autonomous replies on billing or security topics",
      "Contract interpretation",
      "Anything that changes a customer's configuration"
    ],
    "conclusion": "Scope was reframed from 'AI support agent' to 'agent-assist platform with earned autonomy': autonomy is granted per intent, only after that intent clears an accuracy gate in production shadow mode."
  },
  "architecture": {
    "overview": "A Zendesk-embedded assist layer over a hybrid resolution engine: deterministic tool-calling for account state, version-aware retrieval for documentation, and a policy engine that decides between draft, auto-send and escalate per intent.",
    "diagrams": [
      {
        "id": "system-overview",
        "kind": "layers",
        "title": "System overview",
        "caption": "First-pass layered view. Component boundaries are settled; node-level choices remain open pending discovery.",
        "rows": [
          {
            "label": "Surfaces",
            "nodes": [
              {
                "t": "Zendesk agent sidebar"
              },
              {
                "t": "Help centre widget"
              },
              {
                "t": "Slack alerts",
                "sub": "internal"
              }
            ]
          },
          {
            "label": "Assist API",
            "nodes": [
              {
                "t": "FastAPI service",
                "accent": true
              },
              {
                "t": "Autonomy policy engine",
                "accent": true
              },
              {
                "t": "Guardrails + redaction",
                "accent": true
              }
            ]
          },
          {
            "label": "Resolution",
            "nodes": [
              {
                "t": "Account-state tools",
                "sub": "internal APIs"
              },
              {
                "t": "Doc retrieval",
                "sub": "version-aware"
              },
              {
                "t": "Thread summariser"
              }
            ]
          },
          {
            "label": "Data",
            "nodes": [
              {
                "t": "PostgreSQL"
              },
              {
                "t": "Redis"
              },
              {
                "t": "Azure AI Search",
                "sub": "index per release"
              }
            ]
          },
          {
            "label": "Governance",
            "nodes": [
              {
                "t": "Audit log",
                "sub": "immutable, exportable"
              },
              {
                "t": "Shadow-mode evaluation"
              }
            ]
          }
        ]
      }
    ],
    "layers": [
      {
        "name": "Assist API",
        "why": "One service owns the autonomy decision. Scattering that policy across surfaces is how SLA guarantees get quietly broken."
      },
      {
        "name": "Resolution",
        "why": "Deterministic tools and retrieval are separate paths with separate accuracy budgets, because they fail in different ways."
      },
      {
        "name": "Governance",
        "why": "Shadow mode is infrastructure, not a project phase. Every new intent passes through it before autonomy is granted."
      }
    ]
  },
  "technologySelection": [
    {
      "layer": "Autonomy control",
      "choice": "Per-intent policy engine with shadow-mode gating",
      "why": "Autonomy expands on evidence rather than optimism, and the SLA audit gets a defensible story.",
      "alt": "Global confidence threshold — simpler, but averages away exactly the cases that cause harm."
    },
    {
      "layer": "Retrieval",
      "choice": "Azure AI Search with one index per supported release",
      "why": "Version-aware answers. A correct answer for the wrong release is still wrong.",
      "alt": "Single index with version metadata filtering — cheaper, weaker isolation."
    },
    {
      "layer": "Surface",
      "choice": "Native Zendesk sidebar app",
      "why": "Discovery was unambiguous: a second tool would not be adopted.",
      "alt": "Standalone agent console — better UX control, near-zero adoption."
    }
  ],
  "security": {
    "posture": "Redaction happens before the model call, not after logging. Prompts, completions and retrieved passages are treated as customer data subject to the same residency rules as the ticket itself.",
    "controls": [
      {
        "t": "Pre-prompt redaction",
        "d": "Credentials, payment data and personal identifiers are stripped before any model call, with the redaction map stored separately."
      },
      {
        "t": "Regional routing",
        "d": "EU accounts are served by EU model deployments; residency is resolved from the account record, not from request origin."
      },
      {
        "t": "Immutable audit records",
        "d": "Every AI action on a ticket is written append-only and exportable for customer SLA audits."
      },
      {
        "t": "Least-privilege tool access",
        "d": "Account-state tools expose read-only, purpose-scoped endpoints rather than general API credentials."
      }
    ]
  },
  "scalability": {
    "body": "Load is bursty and correlated with incidents: a platform outage produces a spike of near-identical tickets at exactly the moment human capacity is saturated.",
    "levers": [
      {
        "t": "Status-page correlation",
        "d": "During a detected incident, matching tickets get a deterministic incident response with zero model calls."
      },
      {
        "t": "Semantic caching",
        "d": "Repeat questions within a release window are served from cache."
      },
      {
        "t": "Async escalation summaries",
        "d": "Summarisation runs on workers so ticket intake never blocks on generation."
      },
      {
        "t": "Per-intent rate ceilings",
        "d": "Protects both cost and the model deployment quota under burst."
      }
    ]
  },
  "costOptimization": {
    "body": "Cost control is a design property here, not an optimisation phase: the routing decision determines whether a request costs nothing or costs a model call.",
    "levers": [
      {
        "n": "01",
        "t": "Deterministic-first routing",
        "d": "The majority of resolved tickets never reach a model."
      },
      {
        "n": "02",
        "t": "Two-model split",
        "d": "A cheap model classifies and summarises; the capable model only drafts answers."
      },
      {
        "n": "03",
        "t": "Cache before retrieve",
        "d": "Repeat questions bypass both retrieval and generation."
      },
      {
        "n": "04",
        "t": "Token budget per intent",
        "d": "Long tickets are summarised before drafting rather than passed whole."
      },
      {
        "n": "05",
        "t": "Cost regression in CI",
        "d": "A representative traffic mix is priced on every change, like any other non-functional requirement."
      }
    ],
    "model": [
      {
        "k": "Tickets / month",
        "v": "~3,300"
      },
      {
        "k": "Served without a model",
        "v": "~55%"
      },
      {
        "k": "Draft answer cost",
        "v": "~€0.05 / ticket"
      },
      {
        "k": "Blended target",
        "v": "< €0.04 / ticket"
      },
      {
        "k": "Annual AI OPEX estimate",
        "v": "~€22–28k"
      }
    ]
  },
  "risks": [
    {
      "n": "01",
      "risk": "Confident wrong answer sent to a strategic account",
      "severity": "Critical",
      "consequence": "Churn risk far exceeding programme savings",
      "mitigation": "No autonomy on named-account tiers; draft-and-review only, with account tier as an input to the policy decision."
    },
    {
      "n": "02",
      "risk": "Deflection metric gamed",
      "severity": "High",
      "consequence": "Reported savings are fictional and trust collapses",
      "mitigation": "Deflection counted only after a 7-day no-reopen window; reopen rate is a co-primary KPI."
    },
    {
      "n": "03",
      "risk": "Stale documentation grounds wrong answers",
      "severity": "High",
      "consequence": "The system amplifies documentation debt",
      "mitigation": "Phase-0 documentation audit; low-confidence retrievals reported to the docs team weekly."
    },
    {
      "n": "04",
      "risk": "Agent resistance",
      "severity": "High",
      "consequence": "Drafts ignored, no measurable saving",
      "mitigation": "Agents co-design the sidebar; framing and metrics target handling time, never headcount."
    },
    {
      "n": "05",
      "risk": "Token spend scales with volume",
      "severity": "Medium",
      "consequence": "Unit economics erode as the desk grows",
      "mitigation": "Deterministic-first routing, caching, and a cost regression test in CI."
    }
  ],
  "kpis": [
    {
      "category": "Efficiency",
      "kpi": "Median handling time",
      "baseline": "22 min",
      "target": "< 13 min",
      "why": "Reflects the context-assembly saving, which is the deterministic layer's job."
    },
    {
      "category": "Quality",
      "kpi": "7-day reopen rate",
      "baseline": "9%",
      "target": "≤ 9%",
      "why": "Guards against deflection that is really deferral."
    },
    {
      "category": "Cost",
      "kpi": "AI cost per handled ticket",
      "baseline": "n/a",
      "target": "< €0.04",
      "why": "Keeps unit economics ahead of the labour saving."
    },
    {
      "category": "Adoption",
      "kpi": "Share of drafts accepted or edited by agents",
      "baseline": "n/a",
      "target": "> 60%",
      "why": "The honest adoption signal; usage counts mean nothing if drafts are discarded."
    },
    {
      "category": "Compliance",
      "kpi": "SLA breaches attributable to AI handling",
      "baseline": "n/a",
      "target": "0",
      "why": "The contractual guarantee the whole design protects."
    }
  ],
  "roadmap": [
    {
      "phase": "P0",
      "name": "Documentation and data audit",
      "duration": "3 weeks",
      "goal": "Establish whether the knowledge base can ground answers at all.",
      "deliverables": [
        "Coverage and freshness report",
        "Intent taxonomy from 12 months of tickets",
        "Cost model"
      ]
    },
    {
      "phase": "P1",
      "name": "Deterministic assist",
      "duration": "6 weeks",
      "goal": "Account-context summary and severity classification in the agent sidebar — no generation.",
      "deliverables": [
        "Zendesk sidebar app",
        "Tool-calling layer over internal APIs",
        "Audit log"
      ]
    },
    {
      "phase": "P2",
      "name": "Shadow-mode retrieval",
      "duration": "6 weeks",
      "goal": "Draft answers generated but never sent, measured against agent replies.",
      "deliverables": [
        "Retrieval pipeline",
        "Evaluation harness",
        "Per-intent accuracy report"
      ]
    },
    {
      "phase": "P3",
      "name": "Earned autonomy",
      "duration": "5 weeks",
      "goal": "Auto-send enabled per intent that clears the gate, on non-named accounts only.",
      "deliverables": [
        "Autonomy policy engine",
        "SLA audit export",
        "Rollout runbook"
      ]
    }
  ],
  "implementationNotes": {
    "body": "The build order front-loads the parts that need no model. That is not caution for its own sake — it produces the labelled data the generative layer will be evaluated against.",
    "decisions": [
      {
        "id": "ADR-01",
        "t": "Deterministic layer ships before generation",
        "d": "Delivers measurable value in phase 1 and produces the evaluation set."
      },
      {
        "id": "ADR-02",
        "t": "Autonomy is per intent, not global",
        "d": "Makes the SLA guarantee defensible and contains the blast radius of any single failure mode."
      },
      {
        "id": "ADR-03",
        "t": "Redaction sits before the model call",
        "d": "Prevents sensitive data entering prompts or logs, rather than removing it afterwards."
      }
    ]
  },
  "lessonsLearned": [
    "The client's brief named the wrong bottleneck. Time was going into context assembly, and no model was needed to fix that.",
    "Designing the measurement before the feature changed which feature got built first.",
    "Two failed automation attempts in the client's history were more useful input than any requirements document."
  ],
  "futureImprovements": [
    "Extend the autonomy policy to a per-account trust model rather than per-tier.",
    "Feed low-confidence retrieval gaps into the documentation backlog automatically.",
    "Reuse the resolution engine for a customer-facing self-service surface, once per-intent accuracy justifies it."
  ]
};

export default caseStudy;
