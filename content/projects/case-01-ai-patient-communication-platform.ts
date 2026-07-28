// Generated content module. Edit freely — this is the CMS layer.
import type { CaseStudy } from "../types";

/**
 * Flagship case study.
 * Source: Enterprise_AI_Case_Studies.xlsx — sheet CASE01 (Healthcare, Italy).
 * The seven Excel columns (Discovery, Analysis, Architecture, Risks, Cost,
 * KPI, Roadmap) map onto the schema sections of the same name.
 */
const caseStudy: CaseStudy = {
  "slug": "ai-patient-communication-platform",
  "order": 1,
  "featured": true,
  "flagship": true,
  "title": "AI Patient Communication Platform",
  "subtitle": "Scaling a 38-clinic dental group from 5,000 daily messages to 80 clinics — without hiring a single new administrator.",
  "client": "SmileCare Group",
  "clientNote": "38 dental clinics · Italy",
  "industry": "Healthcare",
  "domain": "Patient operations · Contact centre",
  "status": "MVP in build",
  "statusNote": "Discovery, analysis and architecture complete. Backend thin-slice under construction.",
  "architectureComplexity": 4,
  "complexityLabel": "High — regulated data, hybrid routing, 6 system integrations",
  "duration": "Reference programme: 6 months to production",
  "role": "Solution Architect (case study author)",
  "githubUrl": "https://github.com/",
  "liveDemoUrl": "",
  "demoNote": "Demo pending — MVP in build",
  "shortSummary": "A regulated, GDPR-compliant patient communication platform for a fast-growing Italian dental group. The architectural core is a hybrid router: deterministic automation handles the 70% of requests that are genuinely deterministic, and a RAG-grounded LLM handles only free-text clinical-adjacent questions — with a hard rule that it never gives medical advice and escalates on low confidence.",
  "impact": "12 min → <30 s response time · ≥70% requests automated · <€0.03 AI cost per request",
  "tags": [
    "RAG",
    "Hybrid routing",
    "GDPR",
    "Azure",
    "Human-in-the-loop",
    "Omnichannel"
  ],
  "techGroups": [
    {
      "group": "AI",
      "items": [
        "Azure OpenAI (GPT-4.1 / GPT-4o mini)",
        "Azure AI Search",
        "text-embedding-3-large",
        "Azure AI Content Safety"
      ]
    },
    {
      "group": "Backend",
      "items": [
        "Python",
        "FastAPI",
        "Celery workers",
        "Azure Service Bus"
      ]
    },
    {
      "group": "Data",
      "items": [
        "PostgreSQL (Flexible Server)",
        "Redis Cache",
        "SharePoint",
        "Azure Blob Storage"
      ]
    },
    {
      "group": "Platform",
      "items": [
        "Azure Container Apps",
        "Azure Monitor",
        "Application Insights",
        "Azure Key Vault"
      ]
    },
    {
      "group": "Identity",
      "items": [
        "Microsoft Entra ID",
        "OAuth 2.0 / OIDC",
        "RBAC"
      ]
    },
    {
      "group": "Integrations",
      "items": [
        "Dynamics 365 CRM",
        "WhatsApp Business API",
        "Microsoft Teams",
        "Outlook",
        "Power BI"
      ]
    }
  ],
  "executiveSummary": {
    "statement": "SmileCare Group nearly doubled its patient base in twelve months and opened 22 new clinics. The administrative layer did not scale with it: 5,000 inbound messages a day across WhatsApp, phone and web, answered by overloaded receptionists, with clinicians increasingly pulled into scheduling work. The CEO asked for \"an AI that talks to patients\" — the correct architectural answer was narrower and much safer than that.\n\nDiscovery established that ~70–75% of inbound requests are literally repeated every day and fully deterministic. Those must never reach a language model. The remaining free-text questions — post-operative concerns, procedure preparation — require natural-language understanding, but under a hard constraint: the system may not diagnose, may not prescribe, and may only answer from clinician-approved knowledge. Everything else escalates to a human.\n\nThe resulting design is a hybrid orchestration layer on Azure: intent classification first, deterministic skills second, RAG-grounded LLM third, human escalation always available. Cost, GDPR posture and auditability were treated as first-class design constraints from the first diagram.",
    "highlights": [
      {
        "k": "Business driver",
        "v": "Grow to 80 clinics without growing admin headcount"
      },
      {
        "k": "Core constraint",
        "v": "AI may not give medical advice — ever"
      },
      {
        "k": "Phase-1 budget",
        "v": "≤ €250,000 CAPEX · ≤ €80,000 / year OPEX"
      },
      {
        "k": "Time to MVP",
        "v": "4 months"
      },
      {
        "k": "Architectural verdict",
        "v": "Hybrid: rules first, LLM only where language demands it"
      },
      {
        "k": "Compliance",
        "v": "GDPR · EU data residency · full audit log · right to erasure"
      }
    ]
  },
  "businessContext": {
    "narrative": "SmileCare Group grew from a regional practice into a 38-clinic network in three years, opening 22 new branches in the most recent expansion wave. Growth arrived faster than process design. Every new clinic required new front-desk staff, and the CEO's own projection was a ~40% increase in administrative payroll within two years if nothing changed. Leadership concluded that further growth is not possible without digitalising patient communication.\n\nCritically, the company is a Microsoft shop with no data-science function. Any architecture that assumes an in-house ML team to maintain it is a non-starter — a constraint that shaped nearly every technology decision in this case.",
    "companyFacts": [
      {
        "k": "Clinics",
        "v": "38 (Italy)"
      },
      {
        "k": "Employees",
        "v": "640"
      },
      {
        "k": "Clinicians",
        "v": "120"
      },
      {
        "k": "Patients in CRM",
        "v": "~250,000"
      },
      {
        "k": "Appointments / day",
        "v": "~1,800"
      },
      {
        "k": "Inbound messages / day",
        "v": "~5,000"
      },
      {
        "k": "Repeated questions",
        "v": "~70–75%"
      },
      {
        "k": "Knowledge base",
        "v": "~300,000 PDF documents"
      }
    ],
    "drivers": [
      "Admin payroll on track to rise ~40% in two years if the process is not changed.",
      "Patients complain about response latency; average first response is 12 minutes.",
      "Clinicians are absorbing organisational work that should never reach them.",
      "Expansion plan: ~80 clinics within three years, plus market entry into France."
    ],
    "constraints": [
      "Phase-1 budget capped at €250,000.",
      "MVP must be delivered in 4 months.",
      "Must integrate with the existing Dynamics 365 CRM — no replacement.",
      "The company will not hire a dedicated AI engineering team to operate the system.",
      "All actions must be logged and retained for audit.",
      "Italian and English required at launch; French anticipated.",
      "GDPR compliance is non-negotiable; medical data may not leak."
    ],
    "existingStack": [
      "Microsoft 365",
      "Outlook",
      "Microsoft Teams",
      "Dynamics 365 CRM",
      "Proprietary appointment system",
      "Power BI",
      "Microsoft Entra ID",
      "Azure (already in use)",
      "Corporate VPN — single network across clinics"
    ]
  },
  "stakeholders": [
    {
      "role": "CEO",
      "interest": "Scale to 80 clinics without proportional admin headcount.",
      "concern": "AI making a clinical mistake that becomes a legal and reputational event.",
      "influence": "Sponsor"
    },
    {
      "role": "CFO",
      "interest": "ROI in under two years; OPEX ceiling of €80k/year.",
      "concern": "Unbounded LLM token spend that grows with patient volume.",
      "influence": "Budget gate"
    },
    {
      "role": "Chief Medical Officer",
      "interest": "Clinical safety and control over medical content.",
      "concern": "Any answer not traceable to approved clinical material.",
      "influence": "Veto power"
    },
    {
      "role": "IT Director",
      "interest": "Reuse existing Azure and Entra ID; no new infrastructure silo.",
      "concern": "A system nobody in-house can operate or debug.",
      "influence": "Architecture gate"
    },
    {
      "role": "Front-desk administrators",
      "interest": "Relief from repetitive message volume.",
      "concern": "Job security; being blamed for AI errors.",
      "influence": "Adoption make-or-break"
    },
    {
      "role": "DPO / Legal",
      "interest": "GDPR lawfulness, retention, right to erasure.",
      "concern": "Personal health data leaving the EU or reaching a third-party model.",
      "influence": "Compliance gate"
    },
    {
      "role": "Clinic managers",
      "interest": "Fewer escalations, predictable schedules.",
      "concern": "Losing visibility over patient communication.",
      "influence": "Operational owner"
    }
  ],
  "discovery": {
    "intro": "Discovery is the differentiator in this case. The CEO's request — \"AI that handles most patient communication\" — contained three unexamined assumptions, each of which would have produced an expensive, unsafe system. Nine stakeholder groups, ~40 questions, and the architecture essentially designed itself.",
    "groups": [
      {
        "audience": "CEO",
        "goal": "Understand why this project, why now, and what success means.",
        "questions": [
          "Why implement AI now specifically?",
          "Which business problem are you solving?",
          "Which KPIs must improve?",
          "How will you know in twelve months that this succeeded?",
          "Which departments will use the solution?",
          "What does the board expect?",
          "What happens if nothing changes?"
        ],
        "answers": [
          "We want to open 20 more clinics without increasing administrative headcount.",
          "Average patient response time must fall from 12 minutes to 30 seconds.",
          "We want at least 70% of routine requests automated.",
          "If nothing changes, admin cost rises ~40% in two years."
        ]
      },
      {
        "audience": "CFO",
        "goal": "Establish the financial envelope the architecture must fit inside.",
        "questions": [
          "What is the maximum annual operating budget?",
          "What payback period is acceptable?",
          "Which costs must go down?",
          "Which financial KPIs matter most?",
          "Who is accountable for AI errors?",
          "Who will operate the system long-term?"
        ],
        "answers": [
          "OPEX must not exceed €80,000 per year.",
          "ROI expected in under two years.",
          "Cost per patient request must drop at least 40% (from ~€4.00).",
          "There is no budget for a dedicated AI operations team."
        ]
      },
      {
        "audience": "Chief Medical Officer",
        "goal": "Draw the hard boundary of AI responsibility.",
        "questions": [
          "Which questions may AI answer on its own?",
          "Which topics are categorically forbidden?",
          "Who approves medical content?",
          "How often are clinical recommendations updated?",
          "Which requests always require a clinician?"
        ],
        "answers": [
          "AI answers administrative questions only.",
          "Clinical content may come only from the approved knowledge base.",
          "All ambiguous cases route automatically to a clinician.",
          "The knowledge base is updated weekly."
        ]
      },
      {
        "audience": "IT",
        "goal": "Map the existing infrastructure and the integration surface.",
        "questions": [
          "Which systems are already in use?",
          "Which of them expose APIs?",
          "Where are the documents stored?",
          "Is Azure in use? Is Azure OpenAI available?",
          "Is there a DevOps team? Kubernetes?",
          "How is authorisation organised today?"
        ],
        "answers": [
          "Microsoft Azure, Dynamics 365 CRM, SharePoint for documents.",
          "Authorisation via Microsoft Entra ID.",
          "A DevOps team exists.",
          "No data scientists — complex ML models cannot be maintained in-house."
        ]
      },
      {
        "audience": "Front-desk staff",
        "goal": "Observe the real process, not the documented one.",
        "questions": [
          "Walk me through a full administrator day.",
          "Which questions come up most often?",
          "Which operations consume the most time?",
          "Where do errors happen today?",
          "Which requests repeat every single day?"
        ],
        "answers": [
          "75% of questions repeat daily.",
          "Most frequent: booking, cancellation, pricing, procedure preparation.",
          "Errors cluster around rescheduling and manual CRM entry."
        ]
      },
      {
        "audience": "Security & Compliance",
        "goal": "Convert GDPR into concrete architectural requirements.",
        "questions": [
          "Which GDPR requirements are most critical?",
          "Which data may never reach an external service?",
          "How long must logs be retained?",
          "Must data be deletable on patient request?",
          "Is encryption required?",
          "Who may access medical data?"
        ],
        "answers": [
          "Every interaction must be logged.",
          "Medical data must be encrypted at rest and in transit.",
          "Right to erasure must be supported end-to-end.",
          "We operate in Europe — no personal health data may leave the EU."
        ]
      },
      {
        "audience": "Data",
        "goal": "Understand what the AI will actually be reading.",
        "questions": [
          "Which data is structured?",
          "Which documents are PDF?",
          "Are there images? Call audio?",
          "What is the total data volume?",
          "How often does data change?"
        ],
        "answers": [
          "~300,000 PDF documents in SharePoint.",
          "Knowledge base refreshed weekly.",
          "Call audio exists but is out of scope for phase 1."
        ]
      },
      {
        "audience": "Integrations",
        "goal": "Identify the connection points and write operations.",
        "questions": [
          "Which systems must the AI work with?",
          "Must it create CRM records?",
          "Must it send email?",
          "Must it work inside Teams?",
          "Is WhatsApp mandatory?"
        ],
        "answers": [
          "CRM integration is mandatory (Dynamics 365).",
          "WhatsApp is mandatory.",
          "Email is mandatory.",
          "Teams for internal staff assistance."
        ]
      },
      {
        "audience": "Scalability",
        "goal": "Design for the company that will exist in five years.",
        "questions": [
          "Is branch growth planned?",
          "Expansion into other countries?",
          "Will new languages be required?",
          "How many users in five years?",
          "Are new AI scenarios planned?"
        ],
        "answers": [
          "~80 clinics within three years.",
          "Expansion into France planned.",
          "Voice channel anticipated in phase 2."
        ]
      }
    ],
    "assumptions": [
      "Roughly 70–75% of inbound volume is deterministic and can be served without a model.",
      "The clinical knowledge base is authoritative and has a named owner who keeps it current.",
      "Azure OpenAI capacity is available in an EU region with data residency guarantees.",
      "Dynamics 365 and the appointment system expose usable write APIs.",
      "Phase 1 is text-only; voice is deferred to phase 2.",
      "Patient identity can be resolved from the channel identifier plus a verification step."
    ],
    "implications": [
      {
        "finding": "70–75% of requests are literally repeated",
        "implication": "Hybrid architecture is mandatory. A cache and deterministic skill layer sit in front of the model — this is simultaneously the largest cost lever and the largest latency win."
      },
      {
        "finding": "AI must never give medical advice",
        "implication": "No fine-tuning, no open-ended generation. RAG over an approved corpus only, with citation, confidence thresholds and mandatory human escalation."
      },
      {
        "finding": "No in-house data-science team",
        "implication": "Managed services throughout: Azure OpenAI rather than self-hosted models, Azure AI Search rather than an operated vector cluster."
      },
      {
        "finding": "Azure and Entra ID already deployed",
        "implication": "Zero new identity infrastructure. SSO, RBAC and audit inherit from the existing tenant."
      },
      {
        "finding": "OPEX ceiling €80k/year",
        "implication": "Cost per request becomes a hard non-functional requirement (<€0.03), driving model routing, caching and prompt-length discipline."
      },
      {
        "finding": "France expansion planned",
        "implication": "Language must be a configuration concern, not a code concern. Knowledge base partitioned by locale from day one."
      }
    ],
    "businessRisks": [
      "A single hallucinated clinical answer could produce litigation and reputational damage disproportionate to the entire project value.",
      "Front-desk resistance could make adoption fail even with a technically correct system.",
      "Unbounded token spend could invert the ROI case within months.",
      "A stale knowledge base silently degrades answer quality with no visible failure."
    ],
    "technicalConstraints": [
      "EU data residency; no personal health data to non-EU endpoints.",
      "Must integrate with Dynamics 365, SharePoint, Teams, Outlook, WhatsApp Business API and Power BI.",
      "Authentication must use the existing Microsoft Entra ID tenant.",
      "Full interaction logging with configurable retention and erasure support.",
      "Italian and English at launch; French-ready.",
      "Operable by an existing DevOps team with no ML specialisation."
    ]
  },
  "analysis": {
    "aiNeeded": {
      "verdict": "Yes — but only for part of the process.",
      "body": "AI must not become the brain of the whole system. Discovery showed two distinct request classes. Type 1 is fully deterministic — opening hours, parking, rescheduling, price of a cleaning. A model adds cost, latency and unpredictability to questions that have exactly one correct answer. Type 2 is genuinely natural language: \"I had a wisdom tooth removed a week ago, can I train?\" or \"there is slight swelling after the implant, is that normal?\" The same question arrives in hundreds of phrasings, and only a language model handles that variance."
    },
    "automationAlternative": {
      "verdict": "Partially — and that partial answer is the architecture.",
      "canAutomate": [
        "Booking",
        "Rescheduling",
        "Reminders",
        "Service pricing",
        "Opening hours",
        "Clinic finder"
      ],
      "cannotAutomate": [
        "Answering from unstructured documents",
        "Understanding free text",
        "Searching the clinical knowledge base",
        "Assessing urgency from a patient's own words"
      ],
      "body": "Do not use GPT where ordinary automation suffices. It lowers cost, reduces latency and makes the system predictable — three things a regulated healthcare operator values more than cleverness."
    },
    "valueAreas": [
      "Answering patient questions in natural language",
      "Retrieving information from the clinical knowledge base with citations",
      "Assisting administrators on complex requests",
      "Generating draft replies for a human operator to approve",
      "Automatic classification of inbound requests",
      "Urgency detection and prioritisation",
      "Routing complex requests to a clinician"
    ],
    "outOfScope": [
      "Diagnosing",
      "Prescribing or recommending treatment",
      "Modifying a patient record autonomously",
      "Making any clinical decision",
      "Answering when confidence is low",
      "Inventing an answer that is not in the knowledge base"
    ],
    "conclusion": "AI is used only where it genuinely creates value. Every deterministic process stays ordinary automation. When model confidence falls below threshold, the conversation goes to a human — that is a designed path, not an error path."
  },
  "solutionDesign": {
    "principles": [
      {
        "t": "Deterministic first",
        "d": "Every request passes an intent classifier and a deterministic skill layer before any model is considered."
      },
      {
        "t": "Grounded, never generative",
        "d": "Clinical-adjacent answers are retrieved and cited from the approved corpus. No free generation on medical topics."
      },
      {
        "t": "Escalation is a feature",
        "d": "Low confidence, forbidden topic or detected urgency routes to a human with full context attached."
      },
      {
        "t": "Managed over self-hosted",
        "d": "The client has no ML team. Every component must be operable by an existing DevOps function."
      },
      {
        "t": "Cost as a contract",
        "d": "€0.03 per request is a non-functional requirement enforced by routing, caching and prompt budgets."
      },
      {
        "t": "Auditable by construction",
        "d": "Prompt, retrieved sources, confidence, cost and outcome are persisted for every single interaction."
      }
    ],
    "flow": [
      "Patient message arrives on WhatsApp, web chat or the mobile app.",
      "Channel adapter normalises it and resolves patient identity against the CRM.",
      "Guardrails and content safety screen the input; prompt-injection patterns are rejected.",
      "Intent classifier assigns a category and a confidence score.",
      "Deterministic branch: cached FAQ or a CRM/booking skill answers with zero tokens.",
      "LLM branch: retrieval over the approved knowledge base, then a grounded answer with citations.",
      "Confidence gate: below threshold, or forbidden topic, or urgency detected → human escalation with full transcript.",
      "Everything — request, response, sources, tokens, cost, latency — is logged for audit and KPI reporting."
    ]
  },
  "architecture": {
    "overview": "Seven logical layers on Azure, chosen so that nothing new has to be introduced into an existing Microsoft estate. The orchestration layer is where the intellectual content of this architecture sits: it is the component that decides whether a request costs €0.00 or €0.03, and whether a human sees it.",
    "diagrams": [
      {
        "id": "system-overview",
        "kind": "layers",
        "title": "System overview",
        "caption": "Seven layers, deliberately boring infrastructure. The orchestration layer holds all the routing intelligence.",
        "rows": [
          {
            "label": "Channels",
            "nodes": [
              {
                "t": "WhatsApp Business API"
              },
              {
                "t": "Website chat"
              },
              {
                "t": "Mobile app"
              },
              {
                "t": "Voice",
                "sub": "phase 2",
                "muted": true
              },
              {
                "t": "Teams",
                "sub": "staff"
              }
            ]
          },
          {
            "label": "Edge",
            "nodes": [
              {
                "t": "Azure API Management",
                "sub": "rate limit · WAF"
              },
              {
                "t": "Entra ID",
                "sub": "OAuth 2.0 / OIDC"
              }
            ]
          },
          {
            "label": "Orchestration",
            "nodes": [
              {
                "t": "FastAPI service",
                "accent": true
              },
              {
                "t": "Guardrails + Content Safety",
                "accent": true
              },
              {
                "t": "Intent classifier",
                "accent": true
              },
              {
                "t": "Hybrid router",
                "accent": true
              },
              {
                "t": "Escalation controller",
                "accent": true
              }
            ]
          },
          {
            "label": "AI services",
            "nodes": [
              {
                "t": "Azure OpenAI GPT-4.1",
                "sub": "complex"
              },
              {
                "t": "GPT-4o mini",
                "sub": "simple / classify"
              },
              {
                "t": "Azure AI Search",
                "sub": "hybrid + semantic"
              },
              {
                "t": "Embeddings",
                "sub": "text-embedding-3-large"
              }
            ]
          },
          {
            "label": "Async",
            "nodes": [
              {
                "t": "Azure Service Bus"
              },
              {
                "t": "Celery workers",
                "sub": "OCR · embed · sync"
              }
            ]
          },
          {
            "label": "Data",
            "nodes": [
              {
                "t": "PostgreSQL",
                "sub": "conversations · audit"
              },
              {
                "t": "Redis",
                "sub": "cache · sessions"
              },
              {
                "t": "SharePoint",
                "sub": "source documents"
              },
              {
                "t": "Blob Storage",
                "sub": "processed artefacts"
              }
            ]
          },
          {
            "label": "Systems of record",
            "nodes": [
              {
                "t": "Dynamics 365 CRM"
              },
              {
                "t": "Appointment system"
              },
              {
                "t": "Outlook"
              },
              {
                "t": "Power BI"
              }
            ]
          },
          {
            "label": "Observability",
            "nodes": [
              {
                "t": "Azure Monitor"
              },
              {
                "t": "Application Insights"
              },
              {
                "t": "Cost & token dashboard"
              },
              {
                "t": "Key Vault"
              }
            ]
          }
        ]
      },
      {
        "id": "hybrid-routing",
        "kind": "flow",
        "title": "Request flow — hybrid routing",
        "caption": "The single most important diagram in this case. Roughly 70% of traffic terminates before it reaches a language model.",
        "steps": [
          {
            "t": "Inbound message",
            "sub": "WhatsApp / web / app"
          },
          {
            "t": "Identity resolution",
            "sub": "CRM lookup + verification"
          },
          {
            "t": "Guardrails",
            "sub": "injection & safety screen"
          },
          {
            "t": "Intent classification",
            "sub": "GPT-4o mini · cheap"
          },
          {
            "t": "Router decision",
            "sub": "3 outcomes"
          }
        ],
        "branches": [
          {
            "at": "Router decision",
            "when": "A · Deterministic (~55%)",
            "then": "Redis / FAQ cache hit → Templated answer → 0 tokens · €0.00"
          },
          {
            "at": "Router decision",
            "when": "B · Transactional skill (~15%)",
            "then": "CRM / booking API call → Confirmed action → Minimal tokens"
          },
          {
            "at": "Router decision",
            "when": "C · Natural language (~30%)",
            "then": "RAG retrieval → Grounded answer + citations → Confidence gate → Answer or escalate"
          }
        ]
      },
      {
        "id": "rag-pipeline",
        "kind": "pipeline",
        "title": "RAG ingestion & retrieval pipeline",
        "caption": "300,000 clinical PDFs in SharePoint. Ingestion is fully asynchronous; retrieval is synchronous and must return in under 400 ms.",
        "lanes": [
          {
            "steps": [
              {
                "n": "1",
                "t": "SharePoint change feed",
                "d": "Detect new and modified documents; a named Knowledge Owner approves clinical content before it becomes eligible."
              },
              {
                "n": "2",
                "t": "Extract & OCR",
                "d": "Azure Document Intelligence for scanned material; layout-aware extraction preserves tables and headings."
              },
              {
                "n": "3",
                "t": "Chunk",
                "d": "Semantic chunking with heading-path metadata, locale tag and approval status. Chunks inherit document-level access labels."
              },
              {
                "n": "4",
                "t": "Embed",
                "d": "text-embedding-3-large in batch on Service Bus queues. Cost per document is amortised, never on the user path."
              },
              {
                "n": "5",
                "t": "Index",
                "d": "Azure AI Search — hybrid keyword + vector with semantic reranking. Versioned index allows atomic swap and rollback."
              }
            ],
            "label": "Ingestion — asynchronous, nightly workers"
          },
          {
            "steps": [
              {
                "n": "6",
                "t": "Query rewrite",
                "d": "Conversation-aware rewrite plus locale filter, executed by the cheap model."
              },
              {
                "n": "7",
                "t": "Hybrid retrieve",
                "d": "Top-k with metadata filters: approved content only, correct language, patient's access scope."
              },
              {
                "n": "8",
                "t": "Rerank & trim",
                "d": "Semantic rerank, then trim to a strict token budget. Only the passages needed — never the whole document."
              },
              {
                "n": "9",
                "t": "Grounded generation",
                "d": "GPT-4.1 with a system prompt that forbids answering outside the retrieved context and requires citation."
              },
              {
                "n": "10",
                "t": "Verify & gate",
                "d": "Citation check, confidence score, forbidden-topic check. Fail any of the three and the conversation escalates."
              }
            ],
            "label": "Retrieval — synchronous, on the user path"
          }
        ]
      },
      {
        "id": "escalation-sequence",
        "kind": "sequence",
        "title": "Human-in-the-loop escalation",
        "caption": "Escalation is designed, measured and reported as a KPI — not treated as a failure.",
        "actors": [
          "Patient",
          "Orchestrator",
          "AI layer",
          "Administrator",
          "Clinician"
        ],
        "messages": [
          {
            "from": 0,
            "to": 1,
            "t": "\"Swelling after implant — normal?\""
          },
          {
            "from": 1,
            "to": 2,
            "t": "Classify + retrieve from approved corpus"
          },
          {
            "from": 2,
            "to": 1,
            "t": "Answer draft · confidence 0.61 · clinical topic"
          },
          {
            "from": 1,
            "to": 1,
            "t": "Confidence < 0.85 AND clinical → escalate"
          },
          {
            "from": 1,
            "to": 0,
            "t": "Acknowledgement + expected response window"
          },
          {
            "from": 1,
            "to": 3,
            "t": "Ticket with transcript, draft, sources, urgency"
          },
          {
            "from": 3,
            "to": 4,
            "t": "Route clinical judgement"
          },
          {
            "from": 4,
            "to": 0,
            "t": "Approved reply — sent through the same channel"
          },
          {
            "from": 4,
            "to": 2,
            "t": "Approved answer becomes knowledge-base candidate"
          }
        ]
      },
      {
        "id": "deployment",
        "kind": "layers",
        "title": "Deployment view",
        "caption": "Single EU region, two environments, no Kubernetes. The client's DevOps team can operate this without ML expertise.",
        "rows": [
          {
            "label": "Region",
            "nodes": [
              {
                "t": "Azure West Europe",
                "sub": "primary · EU residency",
                "accent": true
              },
              {
                "t": "North Europe",
                "sub": "warm standby",
                "muted": true
              }
            ]
          },
          {
            "label": "Compute",
            "nodes": [
              {
                "t": "Container Apps — API",
                "sub": "autoscale 2–20"
              },
              {
                "t": "Container Apps — Workers",
                "sub": "queue-driven 0–10"
              }
            ]
          },
          {
            "label": "Managed data",
            "nodes": [
              {
                "t": "PostgreSQL Flexible",
                "sub": "zone-redundant HA"
              },
              {
                "t": "Redis",
                "sub": "premium · persistence"
              },
              {
                "t": "AI Search",
                "sub": "2 replicas"
              }
            ]
          },
          {
            "label": "Delivery",
            "nodes": [
              {
                "t": "GitHub Actions"
              },
              {
                "t": "IaC — Bicep"
              },
              {
                "t": "Dev → Stage → Prod"
              },
              {
                "t": "Blue/green revisions"
              }
            ]
          },
          {
            "label": "Secrets & network",
            "nodes": [
              {
                "t": "Key Vault"
              },
              {
                "t": "Private Endpoints"
              },
              {
                "t": "VNet integration"
              },
              {
                "t": "Managed identities"
              }
            ]
          }
        ]
      }
    ],
    "layers": [
      {
        "name": "Channels",
        "why": "Meet patients where they already are. WhatsApp, web chat and the mobile app require no behaviour change; voice is deliberately deferred to phase 2."
      },
      {
        "name": "Orchestration",
        "why": "A single FastAPI service owns routing, guardrails, escalation and logging. Keeping this logic in one place is what makes cost and safety controllable."
      },
      {
        "name": "AI services",
        "why": "Two models, not one. A cheap model classifies and rewrites; the capable model only answers grounded clinical-adjacent questions."
      },
      {
        "name": "Async processing",
        "why": "OCR, embedding, reindexing and CRM synchronisation never block a patient. Queues plus workers keep the user path fast and the cost predictable."
      },
      {
        "name": "Data",
        "why": "PostgreSQL for structured conversation and audit data, Redis for cache and sessions, SharePoint left as the document system of record."
      },
      {
        "name": "Integrations",
        "why": "Everything already exists. The architecture connects to Dynamics, Outlook, Teams and Power BI rather than replacing any of them."
      },
      {
        "name": "Observability",
        "why": "Azure Monitor and App Insights, plus a token-and-cost dashboard treated with the same seriousness as uptime."
      }
    ]
  },
  "technologySelection": [
    {
      "layer": "Channels",
      "choice": "WhatsApp Business API · Web chat · Mobile · Teams",
      "why": "These are the company's existing communication channels. Patients do not have to change habits, and staff assistance lives inside Teams where they already work.",
      "alt": "New standalone patient app — rejected: adoption cost and no behavioural payoff."
    },
    {
      "layer": "Backend",
      "choice": "FastAPI (Python)",
      "why": "Fast to develop, first-class async, excellent AI ecosystem integration, straightforward Azure deployment, very large community.",
      "alt": ".NET — a reasonable Microsoft-shop fit, but the AI tooling ecosystem is thinner and the team's Python skills are stronger."
    },
    {
      "layer": "LLM",
      "choice": "Azure OpenAI — GPT-4.1 and GPT-4o mini",
      "why": "GDPR posture and EU data residency, enterprise SLA, native Azure integration, and no obligation to host or maintain a model in a company with no ML team.",
      "alt": "Self-hosted open-weight model — rejected on operability: nobody in-house could maintain it."
    },
    {
      "layer": "Retrieval",
      "choice": "RAG over Azure AI Search",
      "why": "The clinic has a large internal clinical corpus. We do not want to train a model; we want the model to answer only from clinic documents, with citations.",
      "alt": "Fine-tuning — rejected: no auditability, stale on day one, weekly knowledge updates make it structurally wrong. Qdrant — viable, but adds an operated component."
    },
    {
      "layer": "Cache",
      "choice": "Redis (Azure Cache)",
      "why": "FAQ answers, repeated questions, retrieval results and auth tokens. Directly reduces GPT spend and latency — the largest single cost lever after routing.",
      "alt": "In-process cache — rejected: does not survive scale-out."
    },
    {
      "layer": "Async",
      "choice": "Azure Service Bus + workers",
      "why": "Document analysis, OCR, embeddings, index updates and CRM sync are not user-blocking. Queues make load spikes absorbable and cost schedulable.",
      "alt": "Synchronous processing — rejected: unpredictable latency and cost."
    },
    {
      "layer": "Database",
      "choice": "PostgreSQL",
      "why": "Users, requests, appointments and history are structured relational data with strong audit requirements. Mature, managed, well understood by the client's team.",
      "alt": "NoSQL — rejected: the domain is relational and audit queries are relational."
    },
    {
      "layer": "Identity",
      "choice": "Microsoft Entra ID",
      "why": "Already deployed. Single sign-on for staff, no new account stores, and RBAC and audit inherit from the existing tenant.",
      "alt": "Custom auth — rejected outright."
    },
    {
      "layer": "Documents",
      "choice": "SharePoint remains the system of record",
      "why": "The documents are already there. The AI indexes them for retrieval rather than forcing a migration into a new store.",
      "alt": "Migrate to Blob Storage — rejected: unnecessary change management for no architectural gain."
    },
    {
      "layer": "Observability",
      "choice": "Azure Monitor + Application Insights",
      "why": "Response time, request volume, errors, token usage, cost, success rate and escalation rate — all in the platform the DevOps team already operates.",
      "alt": "Third-party APM — rejected: extra vendor, extra cost, no added capability here."
    }
  ],
  "security": {
    "posture": "The system processes personal health data in the EU. Security was treated as a design input, not a hardening phase. The dominant decisions — Azure OpenAI over a public API, no data leaving the EU, full interaction logging, retrieval-only clinical answers — all originate from the compliance conversation in Discovery.",
    "controls": [
      {
        "t": "Data residency",
        "d": "All processing in Azure West Europe. Azure OpenAI with no training on customer data and no cross-region egress of personal health data."
      },
      {
        "t": "Identity & access",
        "d": "Entra ID SSO for staff, OAuth 2.0 / OIDC, RBAC by clinic and role, managed identities for service-to-service calls. Patients are verified per channel before any record is exposed."
      },
      {
        "t": "Encryption",
        "d": "TLS 1.2+ in transit; encryption at rest across PostgreSQL, Redis, Blob and Search. Keys and secrets in Azure Key Vault with rotation."
      },
      {
        "t": "Data minimisation",
        "d": "Only the fields required for the request are sent to the model. Identifiers are pseudonymised in prompts wherever the answer does not require them."
      },
      {
        "t": "Prompt injection defence",
        "d": "Input screening, instruction/data separation, retrieved content treated as untrusted data, Azure AI Content Safety, and a system prompt that cannot be overridden by user text."
      },
      {
        "t": "Clinical guardrail",
        "d": "A topic classifier blocks diagnosis and treatment requests before generation. Clinical answers must carry a citation to approved content or they are not sent."
      },
      {
        "t": "Audit trail",
        "d": "Every interaction persists request, response, retrieved sources, model, tokens, cost, latency and outcome — with configurable retention."
      },
      {
        "t": "Right to erasure",
        "d": "Patient-scoped deletion across PostgreSQL, cache, logs and search index, executed as a tracked workflow with a completion certificate."
      }
    ]
  },
  "scalability": {
    "body": "The company plans ~80 clinics in three years plus entry into France. The design target is therefore roughly 4× current volume with a new locale, achieved without re-architecture. Scale is handled by making the expensive path rare rather than by making it fast.",
    "levers": [
      {
        "t": "Horizontal stateless scale",
        "d": "The API layer holds no session state — sessions live in Redis. Container Apps scales 2→20 replicas on concurrent-request metrics."
      },
      {
        "t": "Queue-based load absorption",
        "d": "Workers scale independently on queue depth. Volume spikes lengthen the queue rather than degrading patient-facing latency."
      },
      {
        "t": "Deterministic-first routing",
        "d": "Growth in traffic is mostly growth in repeated questions — which the cache absorbs at near-zero marginal cost."
      },
      {
        "t": "Locale as configuration",
        "d": "Knowledge base partitioned by language with locale-filtered retrieval. Adding French is a content and configuration exercise, not a code change."
      },
      {
        "t": "Model capacity management",
        "d": "Provisioned throughput for baseline plus pay-as-you-go burst, with per-tenant token quotas to stop one clinic starving another."
      },
      {
        "t": "Index scaling",
        "d": "Azure AI Search replicas for query throughput, partitions for corpus growth; versioned indexes swap atomically during reindexing."
      }
    ]
  },
  "costOptimization": {
    "body": "The CFO set an €80,000 annual OPEX ceiling and a target of under €1.50 per patient request, down from ~€4.00. That translates into a hard technical requirement of under €0.03 average AI cost per request — which is only achievable if most requests never reach a model.",
    "levers": [
      {
        "n": "01",
        "t": "Do not use an LLM where a program will do",
        "d": "\"What are your opening hours?\" → deterministic FAQ → zero tokens. This is the first rule of enterprise AI and the largest single lever in the entire cost model."
      },
      {
        "n": "02",
        "t": "Redis cache",
        "d": "If the same question is asked a thousand times, do not pay a thousand times. First answer is computed, cached and served from memory thereafter."
      },
      {
        "n": "03",
        "t": "Model routing",
        "d": "FAQ and classification → GPT-4o mini. Complex clinical-adjacent questions → GPT-4.1. Savings of tens of percent for no perceptible quality loss."
      },
      {
        "n": "04",
        "t": "Prompt length discipline",
        "d": "Never send a whole document. Send only the passages retrieval identified as relevant, under an enforced token budget."
      },
      {
        "n": "05",
        "t": "Good RAG is a cost strategy",
        "d": "The better the retrieval, the less context is required. Retrieval precision and cost per request are the same metric viewed from two directions."
      },
      {
        "n": "06",
        "t": "Asynchronous processing",
        "d": "Embeddings, OCR and indexing do not need to happen while a patient waits. Workers run them off-peak on batch pricing."
      },
      {
        "n": "07",
        "t": "Sessions in Redis",
        "d": "Do not reassemble conversation history from scratch on every turn — that is tokens paid twice for the same context."
      },
      {
        "n": "08",
        "t": "Log tiering",
        "d": "Hot audit data in PostgreSQL, older records archived to cool Blob Storage with lifecycle policies while remaining discoverable."
      },
      {
        "n": "09",
        "t": "Daily cost observability",
        "d": "Cost broken down by user, department, model and prompt every day. An unnoticed prompt regression is a budget event."
      },
      {
        "n": "10",
        "t": "Right-sized model selection",
        "d": "Do not use the frontier model for trivia. A smaller model frequently performs identically on the task that actually needs doing."
      }
    ],
    "model": [
      {
        "k": "Requests / day",
        "v": "~5,000"
      },
      {
        "k": "Served without a model",
        "v": "~70% → €0.00"
      },
      {
        "k": "Classification cost",
        "v": "~€0.0004 / request"
      },
      {
        "k": "RAG answer cost",
        "v": "~€0.06 / request"
      },
      {
        "k": "Blended average target",
        "v": "< €0.03 / request"
      },
      {
        "k": "Annual AI OPEX estimate",
        "v": "~€45–55k, inside the €80k ceiling"
      }
    ]
  },
  "risks": [
    {
      "n": "01",
      "risk": "LLM hallucination",
      "severity": "Critical",
      "consequence": "A patient receives incorrect clinical information. Legal exposure and loss of trust.",
      "mitigation": "RAG only; answers restricted to the internal approved knowledge base; escalate to a human when no grounded answer exists; the model is explicitly forbidden from guessing."
    },
    {
      "n": "02",
      "risk": "Personal data leakage (GDPR)",
      "severity": "Critical",
      "consequence": "Regulatory action, litigation, reputational damage.",
      "mitigation": "Azure OpenAI with EU residency and no training on customer data; encryption; access control; data minimisation in prompts; complete action logging."
    },
    {
      "n": "03",
      "risk": "High LLM operating cost",
      "severity": "High",
      "consequence": "The project stops being economically viable.",
      "mitigation": "Redis cache; deterministic FAQ path; small model for simple tasks; prompt-length limits; token ceilings; daily cost dashboard."
    },
    {
      "n": "04",
      "risk": "Poor knowledge-base quality",
      "severity": "High",
      "consequence": "The AI answers confidently with outdated information — a silent failure mode.",
      "mitigation": "A named Knowledge Owner; scheduled document review; automatic reindexing; staleness alerts on source documents."
    },
    {
      "n": "05",
      "risk": "Staff resistance",
      "severity": "High",
      "consequence": "The system is bypassed and never adopted.",
      "mitigation": "Training; single-clinic pilot; positioning AI explicitly as an assistant, not a replacement; involving administrators in design and evaluation."
    },
    {
      "n": "06",
      "risk": "Azure OpenAI unavailability",
      "severity": "Medium",
      "consequence": "The chat stops responding.",
      "mitigation": "Degraded mode with deterministic FAQ fallback; retries with backoff; secondary region; health monitoring and status transparency to patients."
    },
    {
      "n": "07",
      "risk": "CRM integration failure",
      "severity": "Medium",
      "consequence": "Patient records or appointments are not created — information is lost.",
      "mitigation": "Message queues with retry and dead-letter handling; idempotent writes; error journal; integration monitoring with alerting."
    },
    {
      "n": "08",
      "risk": "Load growth",
      "severity": "Medium",
      "consequence": "System slows as the clinic network doubles.",
      "mitigation": "Horizontal scaling; load balancing; queues; Redis; load testing at 4× projected volume before rollout."
    },
    {
      "n": "09",
      "risk": "Prompt injection",
      "severity": "High",
      "consequence": "A user manipulates the AI into ignoring its clinical restrictions.",
      "mitigation": "Hardened system prompt; input validation; guardrails; Azure AI Content Safety; retrieved content treated as untrusted; red-team test suite."
    },
    {
      "n": "10",
      "risk": "Vendor lock-in",
      "severity": "Medium",
      "consequence": "The entire architecture depends on one provider; migration becomes expensive.",
      "mitigation": "LLM access behind an internal abstraction; model swappable by configuration; embeddings and documents stored independently of the vendor."
    }
  ],
  "kpis": [
    {
      "category": "Business",
      "kpi": "Average response time",
      "baseline": "12 min",
      "target": "< 30 sec",
      "why": "Faster patient service"
    },
    {
      "category": "Business",
      "kpi": "Automated request resolution",
      "baseline": "0%",
      "target": "≥ 70%",
      "why": "Reduced load on staff"
    },
    {
      "category": "Business",
      "kpi": "Cost per customer request",
      "baseline": "€4.00",
      "target": "< €1.50",
      "why": "Lower operating expenditure"
    },
    {
      "category": "Business",
      "kpi": "Administrative workload",
      "baseline": "baseline",
      "target": "− 50%",
      "why": "Frees administrator time"
    },
    {
      "category": "AI Quality",
      "kpi": "AI answer accuracy",
      "baseline": "—",
      "target": "≥ 95%",
      "why": "Answer quality"
    },
    {
      "category": "AI Quality",
      "kpi": "Hallucination rate",
      "baseline": "—",
      "target": "< 1%",
      "why": "Minimises false answers"
    },
    {
      "category": "AI Quality",
      "kpi": "Human escalation accuracy",
      "baseline": "—",
      "target": "> 99%",
      "why": "AI correctly recognises when to hand off"
    },
    {
      "category": "AI Quality",
      "kpi": "RAG retrieval precision",
      "baseline": "—",
      "target": "≥ 95%",
      "why": "Retrieves the right documents"
    },
    {
      "category": "Technical",
      "kpi": "API response time",
      "baseline": "—",
      "target": "< 3 sec",
      "why": "System responsiveness"
    },
    {
      "category": "Technical",
      "kpi": "System availability (SLA)",
      "baseline": "—",
      "target": "99.9%",
      "why": "Service reliability"
    },
    {
      "category": "Technical",
      "kpi": "Failed API requests",
      "baseline": "—",
      "target": "< 0.5%",
      "why": "Integration stability"
    },
    {
      "category": "Technical",
      "kpi": "Average AI cost per request",
      "baseline": "—",
      "target": "< €0.03",
      "why": "LLM spend control"
    },
    {
      "category": "Experience",
      "kpi": "Customer satisfaction (CSAT)",
      "baseline": "82%",
      "target": "> 90%",
      "why": "User satisfaction"
    },
    {
      "category": "Experience",
      "kpi": "Net Promoter Score (NPS)",
      "baseline": "45",
      "target": "> 60",
      "why": "Patient loyalty"
    },
    {
      "category": "Operations",
      "kpi": "Daily AI adoption by staff",
      "baseline": "0%",
      "target": "> 90%",
      "why": "Real usage by employees"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1",
      "name": "Discovery",
      "duration": "2–3 weeks",
      "goal": "Understand the business and define requirements.",
      "activities": [
        "Interviews with all stakeholders",
        "Business process analysis",
        "Data analysis",
        "Existing IT infrastructure analysis",
        "KPI definition",
        "Risk analysis",
        "Budget definition",
        "Pilot scenario selection"
      ],
      "deliverables": [
        "Business Requirements Document (BRD)",
        "Functional requirements",
        "Non-functional requirements",
        "AI use cases",
        "Success metrics"
      ]
    },
    {
      "phase": "Phase 2",
      "name": "Architecture & Design",
      "duration": "2 weeks",
      "goal": "Design the solution.",
      "activities": [
        "Architecture selection",
        "LLM selection",
        "RAG design",
        "API design",
        "Integration design",
        "Security design",
        "Database design",
        "Monitoring design",
        "Cost optimisation design"
      ],
      "deliverables": [
        "Solution architecture diagram",
        "API specification",
        "Security architecture",
        "Data flow diagram",
        "High Level Design (HLD)"
      ]
    },
    {
      "phase": "Phase 3",
      "name": "MVP Development",
      "duration": "4–6 weeks",
      "goal": "Build a minimally working solution.",
      "activities": [
        "Backend development",
        "Azure OpenAI integration",
        "CRM integration",
        "RAG configuration",
        "Redis configuration",
        "PostgreSQL setup",
        "Web chat implementation",
        "Logging",
        "Monitoring"
      ],
      "deliverables": [
        "Working MVP",
        "Integration tests",
        "API documentation"
      ]
    },
    {
      "phase": "Phase 4",
      "name": "Pilot",
      "duration": "3–4 weeks",
      "goal": "Validate the system with a limited user group.",
      "activities": [
        "Launch in a single clinic",
        "Staff training",
        "Feedback collection",
        "KPI measurement",
        "AI error analysis",
        "Prompt optimisation",
        "Evaluation harness setup"
      ],
      "deliverables": [
        "Pilot report",
        "Updated architecture",
        "KPI dashboard"
      ]
    },
    {
      "phase": "Phase 5",
      "name": "Production Rollout",
      "duration": "4–8 weeks",
      "goal": "Launch across the company.",
      "activities": [
        "Scaling",
        "User migration",
        "Connecting remaining clinics",
        "Redundancy configuration",
        "Fault tolerance",
        "SLA configuration",
        "User training"
      ],
      "deliverables": [
        "Production system",
        "User documentation",
        "Operational runbook"
      ]
    },
    {
      "phase": "Phase 6",
      "name": "Continuous Improvement",
      "duration": "Ongoing",
      "goal": "Continuously improve the system.",
      "activities": [
        "Answer quality monitoring",
        "Hallucination analysis",
        "Knowledge base updates",
        "Cost optimisation",
        "Model updates",
        "A/B testing of prompts",
        "New AI scenarios",
        "Monthly architecture review"
      ],
      "deliverables": [
        "Monthly KPI report",
        "Cost report",
        "Updated knowledge base",
        "Architecture improvement plan"
      ]
    }
  ],
  "implementationNotes": {
    "body": "The implementation is being built as a thin vertical slice rather than layer by layer: one channel, one deterministic skill, one RAG path, full logging. That order proves the routing and cost model early, which is where the architectural risk actually lives.",
    "decisions": [
      {
        "id": "ADR-001",
        "t": "Hybrid routing before model selection",
        "d": "The router is the primary architectural artefact. Model choice is a downstream, swappable decision."
      },
      {
        "id": "ADR-002",
        "t": "RAG instead of fine-tuning",
        "d": "Weekly knowledge updates and a hard auditability requirement make fine-tuning structurally wrong here."
      },
      {
        "id": "ADR-003",
        "t": "Azure OpenAI over direct provider APIs",
        "d": "EU residency, enterprise SLA and existing tenant governance outweigh marginal capability differences."
      },
      {
        "id": "ADR-004",
        "t": "Container Apps instead of Kubernetes",
        "d": "The client's DevOps team should not inherit cluster operations for a workload this shape."
      },
      {
        "id": "ADR-005",
        "t": "SharePoint stays the document system of record",
        "d": "Index in place. Avoid a migration that adds change-management cost and no architectural value."
      },
      {
        "id": "ADR-006",
        "t": "Cost per request as a non-functional requirement",
        "d": "€0.03 blended average is tested in CI against a representative traffic mix, like any other NFR."
      }
    ],
    "repoStructure": [
      "app/api — FastAPI routes, channel adapters, auth",
      "app/orchestration — router, guardrails, escalation controller",
      "app/rag — chunking, embedding, retrieval, reranking, citation checks",
      "app/skills — deterministic FAQ and transactional CRM/booking skills",
      "app/workers — Celery tasks for OCR, embeddings, reindex, CRM sync",
      "app/observability — token accounting, cost metering, structured audit logging",
      "eval — golden question set, hallucination and retrieval-precision harness",
      "infra — Bicep templates, GitHub Actions workflows"
    ]
  },
  "lessonsLearned": [
    "The CEO's brief and the correct architecture were two different projects. Discovery, not technology selection, closed that gap.",
    "The most valuable architectural decision in this case was deciding what the AI must not do. Constraints produced a cheaper and safer system than capabilities would have.",
    "Cost modelling belongs in the first architecture session. Retro-fitting a cost ceiling onto a working system means rewriting the routing layer.",
    "\"No in-house ML team\" is one of the highest-leverage constraints a client can give you. It eliminated more design options than the budget did.",
    "Front-desk staff were the real adoption risk, not the CMO. Involving them during design converted the loudest sceptics into the pilot's advocates.",
    "Writing 40 discovery questions before drawing any diagram felt slow and was the fastest part of the whole exercise."
  ],
  "futureImprovements": [
    "Voice channel via Azure Speech, reusing the same orchestration layer — the phase-2 commitment made during Discovery.",
    "Agentic rescheduling: a constrained agent that can propose and confirm appointment changes across clinics under explicit permission scopes.",
    "Continuous evaluation loop where clinician-approved escalation answers become reviewed knowledge-base candidates.",
    "Per-clinic cost and quality dashboards in Power BI, using the existing BI estate rather than a new tool.",
    "French locale rollout as a configuration and content exercise, validating the locale-as-configuration assumption.",
    "Semantic caching on embeddings rather than exact-match caching, to widen the zero-token path beyond literal repeats."
  ]
};

export default caseStudy;
