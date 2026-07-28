// Generated content module. Edit freely — this is the CMS layer.
import type { CaseStudy } from "../types";

/**
 * Flagship case study.
 * Source: Enterprise_AI_Case_Studies.xlsx
 */
const caseStudy: CaseStudy = {
  "slug": "ai-patient-communication-platform",
  "order": 1,
  "featured": true,
  "flagship": true,
  "title": "AI Patient Communication Platform",
  "subtitle": "Scaling a 38-clinic dental group from 5,000 daily messages to 80 clinics — without hiring a single new administrator.",
  "client": "A private dental group",
  "clientNote": "38 dental clinics · Italy",
  "industry": "Healthcare",
  "domain": "Patient operations · Contact centre",
  "status": "Architecture note",
  "statusNote": "Discovery, analysis and architecture complete. A thin technical slice is being written to test the riskiest assumptions.",
  "architectureComplexity": 4,
  "complexityLabel": "High — regulated data, hybrid routing, 6 system integrations",
  "duration": "Reference programme: 6 months to production",
  "role": "Solution Architect (case study author)",
  "githubUrl": "",
  "liveDemoUrl": "",
  "demoNote": "No public demo — this case study documents the architecture, not a product",
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
        "Embedding",
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
    "statement": "A constructed scenario, used to reason through a class of problem rather than to describe a real engagement. The figures below are assumptions I chose in order to make the constraints bind; where a number carries architectural weight, the section that uses it explains how it was derived and what changes if it is wrong.\n\nScenario: a private dental group — referred to here as the Group — operating 38 clinics, with roughly 5,000 inbound patient messages per day across WhatsApp, phone and web. Reception is saturated and clinicians are being pulled into scheduling work. Stated request from the CEO: \"an AI that talks to patients.\" Assumed constraints: no in-house ML capability, an existing Microsoft estate, a hard OPEX ceiling, GDPR with EU data residency, and a clinical boundary that cannot be crossed under any circumstances.\n\nThe architectural position I arrive at is that this is not a model problem but a routing problem. A sampling exercise in discovery suggests roughly 70\u201375% of inbound volume is repetitive and deterministically answerable — and that share, not the choice of model, is what decides whether the system is affordable at all. The design therefore places classification and deterministic skills in front of the model, and treats every path that reaches the model as something that has to justify itself.",
    "verdict": "A routing problem, not a model problem — deterministic paths first, the model only where language is unavoidable.",
    "highlights": [
      {
        "k": "Business outcome",
        "v": "Grow to 80 clinics without growing admin headcount"
      },
      {
        "k": "Hard constraint",
        "v": "No diagnosis, no dosage, no treatment guidance — clinical questions route to a clinician"
      },
      {
        "k": "Cost envelope",
        "v": "\u2264 \u20ac250,000 CAPEX \u00b7 \u2264 \u20ac80,000 / year OPEX"
      },
      {
        "k": "Compliance posture",
        "v": "GDPR \u00b7 EU data residency \u00b7 full audit trail \u00b7 right to erasure"
      },
      {
        "k": "What would break it",
        "v": "If repetitive traffic is materially below ~40%, this design stops paying for itself"
      }
    ]
  },
  "businessContext": {
    "narrative": "The Group grew from a regional practice into a 38-clinic network in three years, opening 22 new branches in the most recent expansion wave. Growth arrived faster than process design. Every new clinic required new front-desk staff, and the CEO's own projection was a ~40% increase in administrative payroll within two years if nothing changed. Leadership concluded that further growth is not possible without digitalising patient communication.\n\nCritically, the company is a Microsoft shop with no data-science function. Any architecture that assumes an in-house ML team to maintain it is a non-starter — a constraint that shaped nearly every technology decision in this case.\n\nOn the figure that carries the most architectural weight: discovery in this scenario included a two-week sample of inbound messages — roughly 600 across the three channels — hand-labelled into request types. Four categories (appointment change, opening hours, price of a listed procedure, document request) accounted for 70\u201375% of volume, with a long tail of free-text clinical concerns making up the remainder. The sample is small and covers a single fortnight; seasonality and campaign spikes are not represented in it.",
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
      "Phase 1 must be in operation within four months.",
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
      "concern": "Unbounded token spend that grows with patient volume.",
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
    "intro": "Discovery is the differentiator in this case. The CEO's request — \"AI that handles most patient communication\" — contained three unexamined assumptions, each of which would have produced an expensive, unsafe system. Nine stakeholder groups. The useful output of discovery was not a requirements list but four constraints that made most architectural options invalid.",
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
          "Who will operate the system long-term?"
        ],
        "answers": [
          "OPEX must not exceed €80,000 per year.",
          "ROI expected in under two years.",
          "Cost per patient request must drop by at least 40%.",
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
          "Which requests always require a clinician?",
          "Which accountability model do you want for escalated cases \u2014 a clinician signs off every one, a clinician owns the knowledge base only, or a named clinical owner reviews a weekly sample? Each choice changes what the system has to log."
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
          "Can these systems be integrated programmatically, or is the only interface a human screen?",
          "Where are the documents stored?",
          "Is Azure in use? Is Azure OpenAI available?",
          "Who operates this after handover, and what is that person's day job?",
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
  "technologySelection": [
    {
      "layer": "Channels",
      "choice": "WhatsApp Business API, web chat widget, existing mobile app",
      "why": "Patients already use these; a new channel would have to earn its own adoption before the system could prove anything.",
      "alt": "A dedicated patient portal — rejected: adoption cost exceeds the problem being solved."
    },
    {
      "layer": "Edge",
      "choice": "Azure API Management",
      "why": "Rate limiting, WAF and a single audited entry point, all configuration rather than code.",
      "alt": "A hand-rolled gateway in the application — rejected: puts security controls in the least reviewed part of the codebase."
    },
    {
      "layer": "Identity",
      "choice": "Microsoft Entra ID (existing tenant)",
      "why": "Staff identity, groups and audit already exist and are already governed. Nothing to build, nothing new to breach.",
      "alt": "A separate identity provider — rejected: a second source of truth for who works here is a liability, not a feature."
    },
    {
      "layer": "Orchestration runtime",
      "choice": "Python service on Azure App Service",
      "why": "The routing logic is the intellectual core and changes most often; it belongs in ordinary application code that any developer can read.",
      "alt": "A low-code workflow tool — rejected: the routing rules are the thing most likely to need review, and low-code makes review harder."
    },
    {
      "layer": "Intent classification",
      "choice": "A small hosted model with a constrained label set",
      "why": "No training data exists at design time, and a constrained label set keeps the failure mode legible: a wrong label is visible in the log.",
      "alt": "A fine-tuned classifier — better on cost and latency, but needs labelled data and someone to retrain it. Revisit once the escalation log provides labels."
    },
    {
      "layer": "Deterministic skills",
      "choice": "Direct CRM and scheduling calls, plus a curated answer set",
      "why": "Roughly three quarters of volume is answerable by lookup. Every one of those served without a model is cost and latency removed, not optimised.",
      "alt": "Routing everything through the model with a good prompt — rejected on cost and on auditability."
    },
    {
      "layer": "Retrieval",
      "choice": "Azure AI Search, hybrid keyword plus vector",
      "why": "Managed, EU-resident, and hybrid retrieval handles the case where a patient uses the clinical term and the document uses the colloquial one.",
      "alt": "A self-hosted vector database — cheaper per query at volume, but needs an operator. There isn't one."
    },
    {
      "layer": "Embedding",
      "choice": "A hosted embedding model, batch only",
      "why": "Documents are embedded once on ingestion, never on the user path, so throughput matters and latency does not.",
      "alt": "Embedding at query time for the corpus — rejected: pays the same cost repeatedly for an unchanging document set."
    },
    {
      "layer": "Generation",
      "choice": "Two tiers — a cheaper model for simple grounded answers, a stronger one for complex free-text",
      "why": "The cost ceiling only holds if model choice is a routing decision rather than a global default.",
      "alt": "A single strong model everywhere — simpler, and roughly triples per-request cost for no measurable quality gain on simple answers."
    },
    {
      "layer": "Cache",
      "choice": "Redis",
      "why": "Identical questions arrive thousands of times a day. A cache hit is the cheapest correct answer available.",
      "alt": "Application-level in-memory cache — rejected: cannot be shared across instances or invalidated centrally."
    },
    {
      "layer": "Conversation and audit store",
      "choice": "PostgreSQL",
      "why": "Every request, response, cited source, token count and routing decision has to be queryable for audit. Relational is the right shape for that.",
      "alt": "Document store — rejected: audit queries are relational by nature and the schema is stable."
    },
    {
      "layer": "Async processing",
      "choice": "Queue plus worker pool",
      "why": "Ingestion, OCR and embedding are slow and bursty; keeping them off the request path is what makes the user-facing latency budget achievable.",
      "alt": "Synchronous ingestion — rejected: couples document upload to patient response time for no reason."
    },
    {
      "layer": "Document source",
      "choice": "Existing SharePoint corpus",
      "why": "Permissions and versioning already exist there. Copying documents elsewhere would create a second, quietly diverging truth.",
      "alt": "A new managed document store — rejected: migration cost plus permanent synchronisation burden."
    },
    {
      "layer": "Observability and cost",
      "choice": "Platform monitoring plus a per-request cost and token dashboard",
      "why": "A cost ceiling that nobody can see daily is not a constraint, it is a hope.",
      "alt": "Monthly billing review — rejected: discovers an overrun a month after it started."
    }
  ],
  "security": {
    "posture": "The clinical boundary is the security boundary here. Most of the controls below exist to make one guarantee demonstrable after the fact: that the system did not produce clinical advice, and that anything approaching it reached a human. A control that cannot be evidenced in a log is not a control in this context — it is an intention.\n\nThe second organising idea is that almost nothing is built. Identity, permissions, audit and document versioning are inherited from an estate that is already governed. That is deliberate: inherited controls have an owner, a review cycle and someone who notices when they break.",
    "controls": [
      {
        "t": "Identity inherited, not built",
        "d": "Staff authentication, group membership and role assignment come from the existing directory. No separate user store, no separate password reset path, no second place for an ex-employee's access to survive."
      },
      {
        "t": "Patient identity resolved, never asserted",
        "d": "A message is bound to a patient record through the CRM, not through anything the sender claims. Where identity cannot be resolved with confidence, the request is treated as anonymous and no record-specific information is returned."
      },
      {
        "t": "Corpus integrity as a clinical control",
        "d": "Generation draws only from a corpus a clinician has approved. Ingestion is a reviewed process with a named owner, because in this design the approval step is the difference between a grounded answer and an unlicensed medical opinion."
      },
      {
        "t": "Citation enforced at the output boundary",
        "d": "An answer that cannot cite an approved source does not get sent. This is enforced after generation rather than requested in the prompt — a prompt is guidance, a check is a control."
      },
      {
        "t": "Prompt-injection screening on input",
        "d": "Instruction-shaped patterns in patient text are rejected before classification. Worth being honest about the limits: screening reduces exposure but does not eliminate it, which is part of why the model has no authority to act on anything."
      },
      {
        "t": "No write authority from the model path",
        "d": "The model can compose an answer. It cannot book, cancel, amend a record or send anything on its own. Every state change goes through a deterministic skill with its own validation."
      },
      {
        "t": "Data minimisation into the model",
        "d": "Only the fields a given intent needs are placed in the context window. Clinical history is never sent to answer an administrative question, which is both a privacy control and a cost control."
      },
      {
        "t": "Immutable audit trail",
        "d": "Request, routing decision, confidence score, retrieved sources, tokens, cost, latency and outcome are written append-only. The routing decision is logged because 'why did it not escalate' is the question that will actually be asked."
      },
      {
        "t": "Right to erasure, designed rather than retrofitted",
        "d": "Conversation records are keyed to the patient record so deletion is a defined operation. Derived artefacts — cache entries, embeddings of patient text — are enumerated at design time, because these are what erasure requests usually miss."
      },
      {
        "t": "Secrets and network posture",
        "d": "Keys in a managed vault with rotation, no credentials in configuration, private networking between application and data layers, and public exposure limited to the gateway."
      },
      {
        "t": "EU residency as a constraint on the option set",
        "d": "Data residency narrows which models and which retrieval services are available at all. Treated as a filter applied before evaluation, rather than a compliance question asked after a technology is chosen."
      }
    ]
  },
  "scalability": {
    "body": "Worth stating plainly, because it changes what this section is about: this system is not under load. Five thousand messages a day, concentrated into working hours, is on the order of one or two requests per second at peak. Doubling the clinic count and adding another country leaves it in the same order of magnitude. Any competent stateless service handles that on modest infrastructure.\n\nSo the scaling risks here are not throughput risks. They are corpus risks, locale risks and configuration risks — and the reason to say so is that 'scalability' sections tend to default to autoscaling and load balancers, which would be effort spent on the one dimension that is not actually threatened.\n\nThe dimension that does scale badly is the knowledge base: three hundred thousand documents today, growing, and re-embedding the whole corpus is a real cost every time the embedding model or the chunking strategy changes. That is the constraint worth designing around.",
    "levers": [
      {
        "t": "Stateless request path",
        "d": "Sessions in Redis, not in process memory, so instances can be added, replaced or moved without affecting an in-flight conversation. This is cheap to do at the start and expensive to retrofit."
      },
      {
        "t": "Ingestion decoupled from serving",
        "d": "Corpus growth consumes worker capacity, not response time. A large document import cannot degrade patient-facing latency because the two never share a path."
      },
      {
        "t": "Corpus partitioned by locale from day one",
        "d": "Italian, English and anticipated French are separate indexes rather than a language field in one index. Retrieval quality degrades when languages share an index, and the France expansion is planned rather than hypothetical."
      },
      {
        "t": "Incremental re-embedding",
        "d": "Content-hash tracking per chunk so that changing one document re-embeds one document. Without this, every chunking change becomes a full-corpus reprocessing job and effectively never happens."
      },
      {
        "t": "Cache keyed on normalised intent, not raw text",
        "d": "Thousands of phrasings of the same question collapse to one cache entry. This is the single largest lever on both cost and tail latency, and it improves as volume grows."
      },
      {
        "t": "Per-clinic configuration as data",
        "d": "Opening hours, services, pricing and escalation contacts live in configuration, not in prompts or code. Adding the thirty-ninth clinic must be an administrative action, not a deployment."
      },
      {
        "t": "Provider rate limits treated as a design constraint",
        "d": "Model quota, not compute, is the realistic bottleneck. The router degrades deliberately under quota pressure — cheaper tier first, then deterministic-only, then human — rather than failing."
      },
      {
        "t": "Escalation capacity as the real ceiling",
        "d": "The system can scale faster than the humans behind it. Escalation volume needs a monitored ceiling, because a queue nobody can clear is worse for a patient than a slow first response."
      }
    ]
  },
  "costOptimization": {
    "body": "The cost ceiling only holds because most requests never reach a model. That is the whole economic argument, and it is worth separating two numbers that get conflated.\n\nCost per model-path request is the figure quoted below: roughly €0.03. Cost per inbound message is far lower, because only the free-text remainder — on the order of a quarter of volume — takes that path at all. Blended across everything arriving, the expected figure is closer to €0.008.\n\nThe €0.03 is a point estimate inside a range, not a measurement. It moves with model tier, how much retrieved context is packed into the prompt, answer length, and language: Italian text is generally less token-efficient than English, which pushes the same answer up the range. Realistically the band is €0.012 to €0.075 per model-path request — the low end being a cheaper tier answering a short grounded question, the high end being the strongest tier with a long context and a detailed answer. Anything above that band means the prompt is carrying context nobody reads, and that is a design defect rather than a pricing problem.\n\nOne caution on the figure: it is anchored to hosted model pricing as it stood in mid-2026. Token prices have fallen consistently, so treat the formula and the token counts as the durable part and the euro figure as something to recompute.",
    "model": [
      {
        "k": "Formula",
        "v": "(input tokens x price_in) + (output tokens x price_out) + retrieval query cost"
      },
      {
        "k": "Input tokens, assumed",
        "v": "~2,500 — system instructions, conversation turn, five retrieved chunks"
      },
      {
        "k": "Output tokens, assumed",
        "v": "~350 — a grounded answer with citation, not an essay"
      },
      {
        "k": "Retrieval",
        "v": "One hybrid query per request, cost roughly an order of magnitude below generation"
      },
      {
        "k": "Point estimate",
        "v": "~€0.03 per model-path request"
      },
      {
        "k": "Plausible range",
        "v": "€0.012 – €0.075, driven by model tier, context length and language"
      },
      {
        "k": "Blended per inbound message",
        "v": "~€0.008, since ~75% never reach a model"
      },
      {
        "k": "Price basis",
        "v": "Hosted mid-tier model pricing, mid-2026 — recompute rather than trust"
      }
    ],
    "levers": [
      {
        "n": "01",
        "t": "Do not use a model where a lookup will do",
        "d": "Opening hours, a listed price, an appointment change. These are database questions. Answering them with a language model costs money, adds latency and introduces a failure mode that did not need to exist."
      },
      {
        "n": "02",
        "t": "Cache on normalised intent",
        "d": "The same question arrives in hundreds of phrasings. Caching the raw string catches almost nothing; caching the resolved intent plus its parameters catches most of it. Largest single lever in the design."
      },
      {
        "n": "03",
        "t": "Route between model tiers",
        "d": "A short grounded answer does not need the strongest model available. Tier selection by intent complexity is where a large share of the saving lives, and it costs nothing but a routing rule."
      },
      {
        "n": "04",
        "t": "Constrain prompt length deliberately",
        "d": "Retrieved context is the largest and least disciplined part of the prompt. Five well-ranked chunks beat twenty mediocre ones on both accuracy and cost — retrieval quality is a cost lever, not only a quality lever."
      },
      {
        "n": "05",
        "t": "Invest in retrieval to spend less on generation",
        "d": "Better ranking means less context needed for the same answer quality. This is the least obvious lever and one of the most effective: money spent on retrieval reduces money spent per request forever."
      },
      {
        "n": "06",
        "t": "Batch everything the user is not waiting for",
        "d": "OCR, chunking and embedding run on queues, off-peak. Amortised across the corpus lifetime rather than paid on the request path."
      },
      {
        "n": "07",
        "t": "Re-embed incrementally",
        "d": "Content hashing per chunk so a changed document costs one document. Without it, every improvement to chunking implies reprocessing the whole corpus, which means the improvement never ships."
      },
      {
        "n": "08",
        "t": "Tier the audit store",
        "d": "Recent conversations stay queryable and fast; older records move to cheap storage while remaining retrievable for the retention period. Audit obligations do not require hot storage."
      },
      {
        "n": "09",
        "t": "Make cost observable daily, by dimension",
        "d": "Cost per request, per intent, per model tier, per clinic. A monthly invoice discovers an overrun four weeks late. This is the control that turns the ceiling from an aspiration into a constraint."
      },
      {
        "n": "10",
        "t": "Set a hard per-request ceiling in code",
        "d": "A request that would exceed its token budget degrades — shorter context, cheaper tier, or escalation — instead of quietly costing ten times the estimate. Budgets that exist only in a spreadsheet are not budgets."
      }
    ]
  },
  "kpis": [
    {
      "category": "Business",
      "kpi": "Median first-response time",
      "baseline": "~12 min",
      "target": "< 30 sec",
      "why": "The complaint that started the project. Median rather than mean, because the mean hides the cases that generate escalation."
    },
    {
      "category": "Business",
      "kpi": "Requests resolved without human involvement",
      "baseline": "~0%",
      "target": "≥ 65% by month six",
      "why": "The direct measure of whether the deterministic layer is doing the work the economic case assumes it does."
    },
    {
      "category": "Business",
      "kpi": "Cost per resolved request",
      "baseline": "Current cost, established in month one",
      "target": "−40%",
      "why": "Per-resolved rather than per-request: a cheap answer that fails and returns is not a saving. Expressed as a reduction because the absolute baseline has to be measured, not asserted."
    },
    {
      "category": "Business",
      "kpi": "Administrative hours per clinic per week",
      "baseline": "Established in month one",
      "target": "−50%",
      "why": "The outcome leadership actually bought: growth to 80 clinics without proportional admin headcount."
    },
    {
      "category": "Business",
      "kpi": "Clinician time spent on scheduling",
      "baseline": "Established in month one",
      "target": "Near zero",
      "why": "Clinicians absorbing organisational work was a stated driver. If this does not move, the project missed one of its two reasons for existing."
    },
    {
      "category": "Safety",
      "kpi": "Missed escalations",
      "baseline": "No baseline — first month establishes it",
      "target": "Zero tolerated; any instance triggers review",
      "why": "The one metric that can end the project. A clinical question answered instead of escalated is the failure this whole architecture exists to prevent. Measured by clinician review of a sampled audit set, not by self-report."
    },
    {
      "category": "Safety",
      "kpi": "False escalations",
      "baseline": "No baseline",
      "target": "< 15%",
      "why": "Deliberately loose. Over-escalation costs staff time; under-escalation costs a patient. The asymmetry belongs in the target, not in a comment."
    },
    {
      "category": "Safety",
      "kpi": "Forbidden-topic containment",
      "baseline": "No baseline",
      "target": "100%",
      "why": "Diagnosis, dosage and treatment guidance must never be generated. Not a quality metric — a binary compliance one."
    },
    {
      "category": "Safety",
      "kpi": "Unsupported-claim rate",
      "baseline": "No baseline",
      "target": "< 1% of sampled answers",
      "why": "Replaces 'hallucination rate', which is unmeasurable without a definition. Defined here as a claim not entailed by the cited source, assessed by manual review of a weekly sample."
    },
    {
      "category": "Answer quality",
      "kpi": "Citation correctness",
      "baseline": "No baseline",
      "target": "≥ 98%",
      "why": "Whether the cited document actually contains the answer. Distinct from retrieval precision: a system can retrieve well and cite the wrong one of the retrieved documents."
    },
    {
      "category": "Answer quality",
      "kpi": "Intent classification accuracy",
      "baseline": "No baseline",
      "target": "≥ 95%",
      "why": "Misclassification is how a clinical question ends up on the administrative path. This metric is upstream of the safety metrics, which is why it is watched separately."
    },
    {
      "category": "Answer quality",
      "kpi": "Retrieval recall at 5",
      "baseline": "No baseline",
      "target": "≥ 90%",
      "why": "Whether the answer is present in the top five chunks at all. If it is not, no amount of generation quality recovers it."
    },
    {
      "category": "Answer quality",
      "kpi": "Answer edit rate on escalated cases",
      "baseline": "No baseline",
      "target": "Downward trend",
      "why": "How much staff change the drafted answer before sending. The cheapest ongoing signal of real quality, and it needs no annotation effort."
    },
    {
      "category": "Latency & reliability",
      "kpi": "p95 end-to-end response time",
      "baseline": "No baseline",
      "target": "< 3 sec",
      "why": "p95 rather than average: the average is dominated by cache hits and would look excellent while a fifth of patients wait."
    },
    {
      "category": "Latency & reliability",
      "kpi": "p95 on the deterministic path",
      "baseline": "No baseline",
      "target": "< 500 ms",
      "why": "Three quarters of traffic takes this path. If it is not fast, the headline latency figure is meaningless."
    },
    {
      "category": "Latency & reliability",
      "kpi": "Availability of the patient-facing path",
      "baseline": "No baseline",
      "target": "99.9%",
      "why": "Largely inherited from managed services rather than engineered. Worth stating so the number is not read as an achievement."
    },
    {
      "category": "Latency & reliability",
      "kpi": "Integration failure rate",
      "baseline": "No baseline",
      "target": "< 0.5%",
      "why": "CRM and scheduling calls are where the deterministic path breaks. A failure here silently pushes volume onto the expensive path."
    },
    {
      "category": "Cost control",
      "kpi": "Cost per model-path request",
      "baseline": "No baseline",
      "target": "≤ €0.03, alert at €0.045",
      "why": "The operating constraint expressed as a monitored figure. An alert threshold below the ceiling, because discovering the breach at the ceiling is discovering it late."
    },
    {
      "category": "Cost control",
      "kpi": "Share of traffic reaching a model",
      "baseline": "No baseline",
      "target": "≤ 30%",
      "why": "The single number the entire economic case rests on. If it drifts upward, the architecture needs revisiting, not the budget."
    },
    {
      "category": "Cost control",
      "kpi": "Cache hit rate on repeated intents",
      "baseline": "No baseline",
      "target": "≥ 60%",
      "why": "Direct measure of the largest cost lever. Should improve over time; if it does not, intent normalisation is not working."
    },
    {
      "category": "Adoption",
      "kpi": "Escalations handled inside the system",
      "baseline": "No baseline",
      "target": "≥ 90%",
      "why": "Replaces a generic staff-adoption figure. If staff work around the interface, the audit trail has holes and every safety metric above becomes unreliable."
    },
    {
      "category": "Adoption",
      "kpi": "Patient satisfaction on completed interactions",
      "baseline": "~0.82 CSAT",
      "target": "> 0.90",
      "why": "Per-interaction CSAT rather than NPS. NPS moves with pricing, clinical outcomes and parking; it cannot be attributed to this system."
    },
    {
      "category": "Adoption",
      "kpi": "Repeat use of the automated channel",
      "baseline": "No baseline",
      "target": "Upward trend",
      "why": "Whether patients come back to it voluntarily. The behavioural assumption underneath the whole business case, and the one nothing in the design can prove in advance."
    }
  ],
  "alternatives": [
    {
      "option": "Off-the-shelf chatbot product",
      "verdict": "Set aside",
      "caseFor": "Fastest route to something running, and the vendor carries the compliance burden for the conversational layer. For a group this size that is a real argument, because it removes an entire class of work.",
      "caseAgainst": "The escalation threshold and the clinical-topic boundary are the two decisions that matter most here, and both sit inside the vendor product. Licensing also tends to scale with patient count rather than request volume, which is the wrong axis for a business whose growth is patients."
    },
    {
      "option": "Single model behind a system prompt",
      "verdict": "Set aside",
      "caseFor": "By far the simplest thing to build and the most flexible. It handles the long tail of phrasing a classifier will miss, and it can be running in days rather than weeks.",
      "caseAgainst": "Cost per request becomes unbounded and unpredictable. More seriously, I cannot see how to demonstrate after the fact that the medical-advice boundary held on a given day. The evidence would be a prompt and a hope, which is not something I would want to put in front of a regulator."
    },
    {
      "option": "Deterministic automation only",
      "verdict": "Partially adopted",
      "caseFor": "Cheapest to run, fully auditable, and it genuinely covers the majority of traffic. If the volume estimates hold, most of the value is available without a model at all.",
      "caseAgainst": "It leaves the free-text remainder with reception, and that remainder is where the current cost sits. It also degrades badly at the edges: a patient who phrases a routine request unusually gets a worse experience than before."
    },
    {
      "option": "Hybrid router with grounded fallback",
      "verdict": "Direction taken in this note",
      "caseFor": "Keeps the deterministic path for the traffic that deserves it and confines the model to cases that genuinely need language understanding, which is also where cost can be bounded per request.",
      "caseAgainst": "It is the most complex option to operate, and the routing layer becomes a single place where a misconfiguration is expensive. It also assumes the deterministic share is large enough to justify building two paths, which I have not verified."
    }
  ],
  "architecture": {
    "overview": "One workable shape: seven logical layers on Azure, arranged so that nothing new has to be introduced into an existing Microsoft estate. Most of the intellectual content sits in the orchestration layer, since that is the component deciding whether a request costs nothing or costs money, and whether a human sees it. If I were wrong about anything structural here, I would expect it to be that layer.",
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
              { "t": "WhatsApp Business API" },
              { "t": "Website chat" },
              { "t": "Mobile app" },
              { "t": "Voice", "sub": "phase 2", "muted": true },
              { "t": "Teams", "sub": "staff" }
            ]
          },
          {
            "label": "Edge",
            "nodes": [
              { "t": "Azure API Management", "sub": "rate limit · WAF" },
              { "t": "Entra ID", "sub": "OAuth 2.0 / OIDC" }
            ]
          },
          {
            "label": "Orchestration",
            "nodes": [
              { "t": "FastAPI service", "accent": true },
              { "t": "Guardrails + Content Safety", "accent": true },
              { "t": "Intent classifier", "accent": true },
              { "t": "Hybrid router", "accent": true },
              { "t": "Escalation controller", "accent": true }
            ]
          },
          {
            "label": "AI services",
            "nodes": [
              { "t": "Azure OpenAI GPT-4.1", "sub": "complex" },
              { "t": "GPT-4o mini", "sub": "simple / classify" },
              { "t": "Azure AI Search", "sub": "hybrid + semantic" },
              { "t": "Embedding", "sub": "text to vectors" }
            ]
          },
          {
            "label": "Async",
            "nodes": [
              { "t": "Azure Service Bus" },
              { "t": "Celery workers", "sub": "OCR · embed · sync" }
            ]
          },
          {
            "label": "Data",
            "nodes": [
              { "t": "PostgreSQL", "sub": "conversations · audit" },
              { "t": "Redis", "sub": "cache · sessions" },
              { "t": "SharePoint", "sub": "source documents" },
              { "t": "Blob Storage", "sub": "processed artefacts" }
            ]
          },
          {
            "label": "Systems of record",
            "nodes": [
              { "t": "Dynamics 365 CRM" },
              { "t": "Appointment system" },
              { "t": "Outlook" },
              { "t": "Power BI" }
            ]
          },
          {
            "label": "Observability",
            "nodes": [
              { "t": "Azure Monitor" },
              { "t": "Application Insights" },
              { "t": "Cost & token dashboard" },
              { "t": "Key Vault" }
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
          { "t": "Inbound message (WhatsApp / web / app)" },
          { "t": "Identity resolution (CRM lookup + verification)" },
          { "t": "Guardrails (injection & safety screen)" },
          { "t": "Intent classification (GPT-4o mini)" },
          { "t": "Router decision (3 outcomes)" }
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
              "1. SharePoint change feed: Detect new and modified documents; a named Knowledge Owner approves clinical content before it becomes eligible.",
              "2. Extract & OCR: Azure Document Intelligence for scanned material; layout-aware extraction preserves tables and headings.",
              "3. Chunk: Semantic chunking with heading-path metadata, locale tag and approval status. Chunks inherit document-level access labels.",
              "4. Embed: the embedding model runs in batch on Service Bus queues. Cost per document is amortised, never on the user path.",
              "5. Index: Azure AI Search — hybrid keyword + vector with semantic reranking. Versioned index allows atomic swap and rollback."
            ],
            "label": "Ingestion — asynchronous, nightly workers"
          },
          {
            "steps": [
              "6. Query rewrite: Conversation-aware rewrite plus locale filter, executed by the cheap model.",
              "7. Hybrid retrieve: Top-k with metadata filters: approved content only, correct language, patient's access scope.",
              "8. Rerank & trim: Semantic rerank, then trim to a strict token budget. Only the passages needed — never the whole document.",
              "9. Grounded generation: GPT-4.1 with a system prompt that forbids answering outside the retrieved context and requires citation.",
              "10. Verify & gate: Citation check, confidence score, forbidden-topic check. Fail any of the three and the conversation escalates."
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
            "to": 3,
            "t": "Create escalation ticket in CRM with full transcript"
          },
          {
            "from": 3,
            "to": 4,
            "t": "Assign to clinic clinician based on specialty & roster"
          },
          {
            "from": 4,
            "to": 3,
            "t": "Approved response draft / direct contact"
          },
          {
            "from": 3,
            "to": 0,
            "t": "Human-approved response delivered to patient"
          }
        ]
      }
    ]
  },
  "tailoring": [
    {
      "parameter": "Share of repetitive, deterministically answerable traffic",
      "hereValue": "70–75%, from a two-week hand-labelled sample",
      "altValue": "Under 20%",
      "architectureChange": "The hybrid router stops earning its complexity. Drop the deterministic skill layer to a thin cache, send almost everything down the retrieval path, and move the entire engineering budget into retrieval quality and answer evaluation.",
      "why": "Two paths only pay for themselves when the cheap path carries most of the volume. Below roughly 20%, the routing layer costs more to build, test and operate than the tokens it saves — and it adds a failure mode (misrouting) that the single-path design does not have."
    },
    {
      "parameter": "Share of repetitive, deterministically answerable traffic",
      "hereValue": "70–75%",
      "altValue": "Above 90%",
      "architectureChange": "Question whether a language model belongs in phase 1 at all. A well-built FAQ search, CRM lookups and a booking skill would cover the volume. Keep the model as a phase-2 addition for the residual tail.",
      "why": "At that ratio the model addresses under a tenth of requests while carrying the full weight of the safety review, the audit design and the cost ceiling. Shipping without it is faster, cheaper and easier to defend to a regulator."
    },
    {
      "parameter": "In-house ML capability",
      "hereValue": "None, and no budget to hire",
      "altValue": "An existing ML or platform team",
      "architectureChange": "Managed services stop being mandatory. A self-hosted embedding model and an operated vector store become viable, and a small fine-tuned classifier likely beats prompt-based intent classification on both cost and latency.",
      "why": "Managed services here are not the technically optimal choice — they are the choice that survives handover to people whose job is something else. Remove that constraint and the calculus changes: per-request cost falls, operational burden rises, and someone has to be on call."
    },
    {
      "parameter": "Clinical boundary",
      "hereValue": "Absolute — no diagnosis, dosage or treatment guidance",
      "altValue": "A clinician reviews outbound answers before they are sent",
      "architectureChange": "The confidence gate stops being the primary safety control and becomes a prioritisation signal for a review queue. Generation can be more open, retrieval can draw on a wider corpus, and the escalation controller turns into queue management.",
      "why": "When a human authors every outbound message, the model's failure mode changes from harm to wasted effort. Almost every constraint downstream of the boundary — corpus curation, citation enforcement, threshold calibration — relaxes at once. The cost moves from tokens to clinician time."
    },
    {
      "parameter": "Data residency",
      "hereValue": "EU residency required, GDPR, right to erasure",
      "altValue": "No residency constraint",
      "architectureChange": "Region pinning and the audit and erasure machinery can be simplified, and model choice opens up to whatever is cheapest or strongest rather than whatever is available in-region.",
      "why": "Residency is usually treated as a compliance checkbox, but it is a real architectural constraint: it dictates which models exist for you, where the vector index lives, and how retention and deletion are implemented. Removing it removes work at every layer."
    },
    {
      "parameter": "Existing estate",
      "hereValue": "Microsoft — Azure, Dynamics 365, SharePoint, Entra ID",
      "altValue": "Google Workspace, or a mixed estate with no dominant vendor",
      "architectureChange": "Identity, document storage and CRM integration all have to be designed rather than inherited. Expect a separate identity decision, a document-ingestion connector per source, and a materially longer phase 1.",
      "why": "A large part of what makes this design cheap is that authentication, permissions, audit and document storage already exist and are already governed. That is inheritance, not architecture — and it does not transfer."
    },
    {
      "parameter": "Channel mix",
      "hereValue": "WhatsApp, web chat, mobile — all text",
      "altValue": "Phone calls are the dominant channel",
      "architectureChange": "Speech-to-text moves onto the critical path, latency budgets tighten sharply, and the confidence gate has to account for transcription error as well as model uncertainty. The deterministic layer becomes harder to hit reliably.",
      "why": "Text arrives already structured enough to classify. Voice adds an error source upstream of every decision the router makes, and a misheard word can send a clinical question down an administrative path."
    }
  ],
  "assumptionsToTest": [
    "The 70–75% figure rests on a two-week sample. Before building two paths I would want a full quarter, segmented by clinic and by channel, to rule out seasonality and campaign effects.",
    "The escalation confidence threshold is set at a plausible value, not a calibrated one. Choosing it properly needs a labelled set of real escalations, which by definition does not exist before launch.",
    "Per-request cost assumes token behaviour I have not measured in Italian. Non-English text is generally less token-efficient, and the size of that penalty here is unknown.",
    "Whether patients will use an automated channel for anything beyond scheduling is a behavioural question this note cannot answer from the inside."
  ],
  "risks": [
    {
      "n": "1",
      "risk": "Clinical hallucination",
      "severity": "High",
      "consequence": "Providing incorrect medical or post-operative guidance to patients.",
      "mitigation": "Strict RAG grounding, zero free generation on medical topics, mandatory citations, and automated pre-output verification."
    },
    {
      "n": "2",
      "risk": "Unbounded token cost",
      "severity": "Medium",
      "consequence": "Excessive API consumption driving up operational expenses beyond budget limits.",
      "mitigation": "Hybrid routing routing ~70% of traffic to cache/deterministic skills; strict prompt budgeting and model tiering (GPT-4o mini for classification)."
    },
    {
      "n": "3",
      "risk": "Data leakage under GDPR",
      "severity": "High",
      "consequence": "Potential exposure of sensitive personal health data outside of compliance boundaries.",
      "mitigation": "Azure OpenAI EU data residency, strict payload masking, no training on customer data, and end-to-end audit logging."
    },
    {
      "n": "4",
      "risk": "Administrator resistance",
      "severity": "Medium",
      "consequence": "Low user adoption or pushback from front-desk personnel fearing job displacement.",
      "mitigation": "Positioning AI as a routine message filter rather than a replacement; involving front-desk staff directly in workflow design."
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1",
      "name": "Discovery & Architecture",
      "duration": "Months 1–2",
      "goal": "Stakeholder interviews, data mapping, security baseline, and target architecture validation.",
      "activities": [
        "Stakeholder interviews",
        "Data mapping",
        "Security baseline"
      ],
      "deliverables": [
        "Architecture validation"
      ]
    },
    {
      "phase": "Phase 2",
      "name": "MVP Build & Integration",
      "duration": "Months 3–4",
      "goal": "FastAPI orchestration layer, Dynamics 365 connectors, RAG pipeline setup, and pilot clinic deployment.",
      "activities": [
        "FastAPI build",
        "Connectors setup"
      ],
      "deliverables": [
        "Pilot deployment"
      ]
    },
    {
      "phase": "Phase 3",
      "name": "Rollout & Optimisation",
      "duration": "Months 5–6",
      "goal": "Scale across all 38 Italian clinics, fine-tune routing thresholds, and activate advanced analytics dashboard.",
      "activities": [
        "Scale clinics",
        "Tune routing"
      ],
      "deliverables": [
        "Analytics dashboard"
      ]
    }
  ]
};

export default caseStudy;
