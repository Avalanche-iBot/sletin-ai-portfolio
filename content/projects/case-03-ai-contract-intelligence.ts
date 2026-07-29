import type { CaseStudy } from "../types";

/**
 * Case study 03 — AI contract intelligence.
 *
 * The lesson this note owns is provenance. In a legal setting an unsourced
 * answer is worse than no answer, because it cannot be checked and therefore
 * cannot be relied on — so the centre of gravity is not extraction quality but
 * the citation chain: every extracted term points back to a document, a
 * revision, a page and a paragraph.
 *
 * Constructed scenario; the figures are assumptions, and the sections that
 * lean on them say so.
 */
const caseStudy: CaseStudy = {
  slug: "ai-contract-intelligence",
  order: 3,
  title: "AI Contract Intelligence",
  subtitle: "Making 14,000 supplier contracts answerable, under the legal reality that an unsourced answer is worse than no answer.",
  industry: "Legal · Procurement",
  domain: "Contract lifecycle · Obligation management",
  status: "In analysis",
  architectureComplexity: 4,
  shortSummary: "Clause-level extraction and obligation tracking across a multilingual contract estate. The centre of gravity is provenance: every extracted term points back to a document, revision, page and paragraph.",
  tags: [
    "Document AI",
    "Clause extraction",
    "Provenance",
    "Multilingual",
    "Human review"
  ],
  featured: true,
  client: "Industrial group procurement function",
  clientNote: "€1.2bn annual spend",
  statusNote: "Discovery and analysis complete. A clause-extraction evaluation set is being assembled to test the assumptions.",
  complexityLabel: "High — legal accuracy bar, clause-level provenance, multilingual corpus",
  duration: "Reference programme: 7 months",
  impact: "Target: obligation review 3 days → 2 hours · 100% of extracted terms citation-linked",
  role: "Solution Architect (case study author)",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — build scheduled",
  techGroups: [
    {
      group: "AI",
      items: [
        "Azure OpenAI",
        "Azure Document Intelligence",
        "Hybrid search",
        "Reranking"
      ]
    },
    {
      group: "Backend",
      items: [
        "Python",
        "FastAPI",
        "Celery",
        "Service Bus"
      ]
    },
    {
      group: "Data",
      items: [
        "PostgreSQL",
        "pgvector",
        "Blob Storage",
        "Redis"
      ]
    },
    {
      group: "Governance",
      items: [
        "Entra ID",
        "RBAC by legal entity",
        "Immutable audit log"
      ]
    }
  ],
  executiveSummary: {
    statement: "Procurement could not answer basic portfolio questions — which contracts carry uncapped liability, which auto-renew within 90 days, which permit price indexation — without a manual review campaign costing weeks of legal time.\n\nThe naive solution is a chat interface over the archive. Discovery rejected it: legal will not act on an answer it cannot verify, and a summarised clause has legal meaning only in context. The architecture inverts the usual emphasis. Extraction and provenance are the product; a structured obligation store is the deliverable; the conversational surface is a thin layer that may only cite what the store contains.",
    highlights: [
      {
        k: "Business driver",
        v: "Renewal and liability exposure invisible at portfolio level"
      },
      {
        k: "Hard constraint",
        v: "No answer without clause-level citation"
      },
      {
        k: "Rejected option",
        v: "Chat-only interface over raw documents"
      },
      {
        k: "Architectural verdict",
        v: "Extraction pipeline first, obligation store second, chat last"
      }
    ]
  },
  businessContext: {
    narrative: "The estate is roughly 14,000 active agreements in four languages, accumulated over two decades across SharePoint, a legacy DMS and — for older assets — scanned paper. Many contract owners have left the company; institutional memory is gone.\n\nThe trigger was a supplier dispute where the group discovered a liability clause nobody had reviewed since signature. The board asked what else was in there, and nobody could answer.",
    companyFacts: [
      {
        k: "Active agreements",
        v: "~14,000"
      },
      {
        k: "Languages",
        v: "4"
      },
      {
        k: "Scanned share of corpus",
        v: "~18%"
      },
      {
        k: "Annual spend covered",
        v: "€1.2bn"
      },
      {
        k: "Phase-1 budget",
        v: "€220,000"
      }
    ],
    drivers: [
      "Portfolio-level liability and renewal exposure is unknown",
      "Manual review campaigns cost weeks of external counsel time",
      "Auto-renewals passing unnoticed",
      "Price indexation clauses never exercised"
    ],
    constraints: [
      "Legal will not accept uncited extraction",
      "Documents in Italian, English, French and German",
      "Roughly 18% of the corpus is scanned, some of it poorly",
      "Access must be segmented by legal entity",
      "Phase-1 budget €220,000"
    ],
    existingStack: [
      "SharePoint",
      "Legacy DMS",
      "SAP Ariba",
      "Power BI",
      "Azure"
    ]
  },
  stakeholders: [
    {
      role: "General Counsel",
      interest: "Reliable portfolio visibility",
      concern: "A system producing plausible but wrong legal readings",
      influence: "Veto power"
    },
    {
      role: "Chief Procurement Officer",
      interest: "Renewal calendar and negotiation leverage",
      concern: "Another repository nobody maintains",
      influence: "Sponsor"
    },
    {
      role: "Legal operations",
      interest: "Less manual review",
      concern: "Becoming reviewers of machine output at the same total workload",
      influence: "Operational owner"
    },
    {
      role: "DPO",
      interest: "Lawful processing of contract data",
      concern: "Personal data inside signature blocks and annexes",
      influence: "Compliance gate"
    },
    {
      role: "IT architecture",
      interest: "Fits the existing Azure estate",
      concern: "A second document repository diverging from the DMS",
      influence: "Architecture gate"
    }
  ],
  discovery: {
    groups: [
      {
        audience: "General Counsel",
        goal: "Establish the evidentiary standard the output must meet.",
        questions: [
          "If the system flags an uncapped liability clause, what is your next action?",
          "What would make you distrust the whole system permanently?",
          "Is a summary ever acceptable, or only the clause verbatim with a citation?",
          "Which clause types matter enough to be wrong about?"
        ],
        answers: [
          "Any flag is followed by reading the clause in situ — the link matters more than the summary.",
          "One fabricated citation would end adoption.",
          "Twelve clause types carry real risk; the rest is nice to have."
        ]
      },
      {
        audience: "Legal operations",
        goal: "Understand the current process well enough not to automate its worst parts.",
        questions: [
          "How do you find a contract today?",
          "Where do the scanned documents cause the most pain?",
          "What does your review checklist look like?",
          "How do you track obligations after signature?"
        ],
        answers: [
          "Search is by a filename convention that broke in 2019.",
          "Obligations are tracked in three personal spreadsheets."
        ]
      },
      {
        audience: "CPO and IT architecture",
        goal: "Separate the quick win from the hard problem.",
        questions: [
          "Which single report would change a negotiation tomorrow?",
          "Must this live inside the DMS, or alongside it?",
          "What metadata already exists and can be trusted?"
        ],
        answers: [
          "A renewal and indexation calendar is worth more immediately than clause search.",
          "Entity and counterparty metadata is reliable; clause-level data does not exist."
        ]
      }
    ],
    intro: "The decisive discovery question was not about accuracy targets. It was: what will you actually do with an extracted clause?",
    assumptions: [
      "Twelve priority clause types cover the material risk; the taxonomy is a phase-0 deliverable agreed with Legal.",
      "Scan quality supports OCR on the majority of the corpus, with a manual queue for the remainder.",
      "Legal staffs a review workflow for two quarters to build the evaluation set.",
      "Entity-level access segmentation is derivable from existing metadata."
    ],
    implications: [
      {
        finding: "Every flag is followed by reading the source clause",
        implication: "Provenance is the primary feature. Retrieval must return document coordinates, not just text."
      },
      {
        finding: "Obligations live in personal spreadsheets",
        implication: "The deliverable is a structured obligation store with owners and dates, not a search box."
      },
      {
        finding: "One fabricated citation ends adoption",
        implication: "A deterministic citation-verification step checks the quoted span exists in the source before any answer is shown."
      },
      {
        finding: "The renewal calendar is the immediate win",
        implication: "Sequence deterministic metadata value into phase 1, independent of extraction accuracy."
      }
    ],
    businessRisks: [
      "Legal disengagement after a single visible error",
      "Extraction quality varying by language, creating a jurisdictional blind spot",
      "The system becoming a parallel truth that diverges from the DMS"
    ],
    technicalConstraints: [
      "Mixed-quality scans require an OCR fallback with human triage",
      "Clause boundaries do not align with token windows — chunking must be structure-aware",
      "Multilingual embedding quality differs by language and must be measured per language"
    ]
  },
  analysis: {
    aiNeeded: {
      verdict: "Yes for extraction, no for judgement",
      body: "Finding and typing clauses across 14,000 heterogeneous documents in four languages is not tractable with rules. Deciding what a clause means for the group's risk position remains a lawyer's job, and the architecture should not blur that line."
    },
    automationAlternative: {
      verdict: "Rules can carry the metadata layer, not the clause layer",
      canAutomate: [
        "Renewal-date arithmetic and calendar alerts",
        "Entity and counterparty resolution",
        "Document classification by contract family",
        "Duplicate and superseded-version detection"
      ],
      cannotAutomate: [
        "Identifying an indemnity clause phrased three ways in three languages",
        "Distinguishing a liability cap from a carve-out to that cap"
      ],
      body: "Splitting these means the renewal-calendar value — what the CPO cares about most — ships in phase 1 without depending on extraction accuracy."
    },
    valueAreas: [
      "Clause extraction into a structured obligation store",
      "Renewal and indexation calendar",
      "Portfolio risk queries with clause-level citations",
      "Deviation detection against the group's standard templates"
    ],
    outOfScope: [
      "Legal advice or risk scores presented as conclusions",
      "Automated contract drafting",
      "Negotiation recommendations"
    ],
    conclusion: "The programme is sequenced so structured, verifiable value lands before any generative feature reaches Legal — which is also the order that builds the trust the generative layer will need."
  },
  alternatives: [
    {
      option: "General retrieval over the contract PDFs",
      verdict: "Set aside",
      caseFor: "Quick to stand up, and for exploratory questions across a large estate it is genuinely useful from week one.",
      caseAgainst: "It answers questions but cannot hold obligations. Once anyone wants to know which commitments fall due next quarter, a chat surface over documents has no structure to answer from, and retrofitting one later is a rebuild."
    },
    {
      option: "Commercial contract lifecycle platform",
      verdict: "Set aside",
      caseFor: "Mature, legally aware, and someone else maintains the clause taxonomy, which is not a small thing given how much of the work here is taxonomy rather than technology.",
      caseAgainst: "These platforms generally assume contracts are authored inside them. An estate that already exists in several languages and formats has to be migrated in, and the migration is the hard part the product does not solve."
    },
    {
      option: "Typed obligation store with constrained generation",
      verdict: "Direction taken in this note",
      caseFor: "Extraction writes into a structure that can be queried, reported and reconciled, and generation is constrained to cite from it. That is what makes an extracted term checkable rather than merely plausible.",
      caseAgainst: "It forces the schema decision very early, before enough of the estate has been read to know whether the schema is right. Getting it wrong means reprocessing everything."
    }
  ],
  architecture: {
    overview: "One workable shape: a structure-aware ingestion pipeline writes into a typed obligation store. Retrieval and generation sit on top and are constrained to cite from it. Chat is a surface, not the system.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption: "First-pass layered view. Component boundaries are settled; node-level choices remain open pending discovery.",
        rows: [
          {
            label: "Surfaces",
            nodes: [
              {
                t: "Obligation dashboard"
              },
              {
                t: "Portfolio query interface"
              },
              {
                t: "Power BI",
                sub: "existing estate"
              },
              {
                t: "Review queue",
                sub: "legal ops"
              }
            ]
          },
          {
            label: "Query layer",
            nodes: [
              {
                t: "FastAPI",
                accent: true
              },
              {
                t: "Citation verifier",
                accent: true
              },
              {
                t: "Answer composer",
                accent: true
              }
            ]
          },
          {
            label: "Extraction",
            nodes: [
              {
                t: "Document Intelligence",
                sub: "layout + OCR"
              },
              {
                t: "Structure-aware chunker"
              },
              {
                t: "Clause classifier"
              },
              {
                t: "LLM extractor",
                sub: "typed output"
              }
            ]
          },
          {
            label: "Stores",
            nodes: [
              {
                t: "PostgreSQL",
                sub: "obligation store"
              },
              {
                t: "pgvector",
                sub: "clause embeddings"
              },
              {
                t: "Blob",
                sub: "source + page images"
              }
            ]
          },
          {
            label: "Governance",
            nodes: [
              {
                t: "RBAC by legal entity"
              },
              {
                t: "Audit log"
              },
              {
                t: "Human review workflow"
              }
            ]
          }
        ]
      }
    ],
    layers: [
      {
        name: "Extraction",
        why: "The value is created here. Everything downstream is only as good as the clause boundaries this layer produces."
      },
      {
        name: "Citation verifier",
        why: "A hard gate: if the quoted span cannot be located in the source, the answer is not shown. This is what makes the system usable by Legal at all."
      },
      {
        name: "Stores",
        why: "A typed obligation table makes renewal and exposure questions ordinary SQL — no model in the loop for the questions asked most often."
      }
    ]
  },
  technologySelection: [
    {
      layer: "Vector store",
      choice: "pgvector alongside the obligation tables",
      why: "Obligations and embeddings are queried together, and one database is one operational burden instead of two.",
      alt: "Dedicated vector database — better at very large scale, unnecessary at 14k documents."
    },
    {
      layer: "Chunking",
      choice: "Structure-aware, clause-boundary chunking",
      why: "A clause split across chunks produces a legally meaningless retrieval result.",
      alt: "Fixed-size overlap chunking — trivial to build, unacceptable failure mode here."
    },
    {
      layer: "Output shape",
      choice: "Typed extraction into a schema, not free text",
      why: "Turns a language problem into a data problem that can be validated, diffed and audited.",
      alt: "Narrative summaries — faster to demo, impossible to verify at portfolio scale."
    },
    {
      layer: "Access control",
      choice: "Row-level security by legal entity in the obligation store",
      why: "Segmentation is enforced where the data lives rather than in each surface.",
      alt: "Application-level filtering — one missed query away from a disclosure incident."
    }
  ],
  security: {
    posture: "Contract data is commercially sensitive and entity-segmented. The obligation store, not the application, is the enforcement point.",
    controls: [
      {
        t: "Row-level security by entity",
        d: "Access scope resolved from Entra ID group claims and enforced in the database."
      },
      {
        t: "Citation verification before display",
        d: "A deterministic check that the quoted span exists in the cited document at the cited location."
      },
      {
        t: "Personal-data minimisation",
        d: "Signature-block personal data is detected and excluded from embeddings and prompts."
      },
      {
        t: "Immutable audit trail",
        d: "Queries, retrieved clause IDs and reviewer decisions are logged append-only."
      }
    ]
  },
  scalability: {
    body: "Volume is modest but documents are large and reprocessing is the real load: a taxonomy change means re-extracting the estate.",
    levers: [
      {
        t: "Idempotent reprocessing",
        d: "Extraction jobs are versioned by taxonomy revision so a re-run is a background campaign, not an outage."
      },
      {
        t: "Queue-based ingestion",
        d: "OCR and embedding run on workers scaled independently of the query path."
      },
      {
        t: "Incremental indexing",
        d: "New and amended contracts flow continuously from Ariba rather than in batch reloads."
      },
      {
        t: "Per-language evaluation gates",
        d: "Each language scales into production only when its accuracy threshold is met."
      }
    ]
  },
  costOptimization: {
    body: "Cost is dominated by one-time extraction over the back catalogue rather than by steady-state queries, which changes where optimisation effort belongs.",
    levers: [
      {
        n: "01",
        t: "One-time backfill, then incremental",
        d: "The expensive pass happens once per taxonomy version."
      },
      {
        n: "02",
        t: "Cheap model for classification",
        d: "Clause typing uses a small model; the capable model only handles typed extraction on candidates."
      },
      {
        n: "03",
        t: "Structured queries bypass models",
        d: "Renewal and exposure questions are SQL over the obligation store."
      },
      {
        n: "04",
        t: "OCR only where needed",
        d: "Native-text documents skip the OCR path entirely."
      }
    ],
    model: [
      {
        k: "Backfill volume",
        v: "~14,000 documents"
      },
      {
        k: "Backfill AI cost estimate",
        v: "~€18–24k one-time"
      },
      {
        k: "Steady-state monthly",
        v: "~€900"
      },
      {
        k: "Structured queries",
        v: "€0.00"
      }
    ]
  },
  tailoring: [
    {
      parameter: "Size and uniformity of the contract estate",
      hereValue: "~14,000 contracts, several languages, decades of drafting styles",
      altValue: "A few hundred contracts on two or three templates",
      architectureChange:
        "Do not build extraction. A structured intake form for new agreements, plus one paralegal reading the back catalogue once, is cheaper, faster and more accurate than anything described here.",
      why: "Extraction earns its complexity on volume and variety. Below a few thousand documents the evaluation set alone costs more to assemble than reading the estate by hand, and a human reader makes fewer mistakes than the system being evaluated."
    },
    {
      parameter: "Where the leverage sits — back catalogue or inflow",
      hereValue: "A large static estate with modest new signing volume",
      altValue: "A small back catalogue and high inflow of new agreements",
      architectureChange:
        "Capture obligations at signature rather than recovering them afterwards. The back catalogue becomes a one-off migration and the permanent system is an intake workflow, not an extraction pipeline.",
      why: "Reading a signed PDF to recover terms that someone typed into a negotiation two weeks earlier is archaeology. It is worth doing for documents that already exist; it is a poor design for documents that do not exist yet."
    },
    {
      parameter: "Document condition",
      hereValue: "Mixed — born-digital PDFs alongside scans of executed originals",
      altValue: "Every document born digital with a reliable text layer",
      architectureChange:
        "The layout and OCR stage drops out entirely, taking with it the largest single source of extraction error and a substantial share of the ingestion cost.",
      why: "Most of what looks like model error in document work is actually reading error upstream of the model. Remove the scans and the achievable accuracy ceiling rises before anything else is tuned."
    },
    {
      parameter: "Who consumes the output",
      hereValue: "Procurement, wanting alerts on obligations that are coming due",
      altValue: "Legal, preparing for litigation or due diligence",
      architectureChange:
        "Recall replaces precision as the governing metric. Missing a clause becomes the unacceptable failure rather than surfacing a doubtful one, which inverts every threshold in the design and makes the review queue much larger by intent.",
      why: "The same extraction engine serves both, but not at the same operating point. An alerting system that cries wolf gets muted; a due-diligence system that stays quiet about a clause has failed at the only thing it was for."
    },
    {
      parameter: "Whether a legal owner will set the accuracy bar",
      hereValue: "Assumed — someone in legal accepts the standard for a relied-upon date",
      altValue: "Nobody will put their name to it",
      architectureChange:
        "Ship search with citations and stop there. Present passages, never asserted terms, and let a person read the clause and decide.",
      why: "An extracted obligation is a claim somebody will act on. Without a named owner for the standard, the system is manufacturing unattributed legal conclusions, and the citation layer is doing reassurance rather than control."
    },
    {
      parameter: "Jurisdictional and language spread",
      hereValue: "Multilingual, several jurisdictions",
      altValue: "One language, one governing law",
      architectureChange:
        "Per-language evaluation sets, per-language acceptance thresholds and cross-lingual clause equivalence all collapse into a single evaluation track — roughly a third of the assurance work disappears.",
      why: "Cross-lingual equivalence is the hardest unsolved part of this note. Removing it removes the risk that quality is quietly acceptable in one jurisdiction and quietly poor in another."
    }
  ],
  assumptionsToTest: [
    "Clause equivalence across languages is treated here as reliable at a level I cannot actually establish. Two clauses can be legally equivalent and lexically unrelated, and I have no dependable automatic test for that.",
    "The extraction accuracy needed before anyone relies on an obligation date is unknown to me. It is plainly higher than the bar for search, but where the line sits is a decision for a legal owner, not for an architect.",
    "The architecture quietly assumes someone is accountable when an obligation is extracted incorrectly and then missed. That is a governance question, and I have assumed an answer exists rather than confirming one.",
    "The obligation schema here was proposed without reading a representative sample of the estate. That is the wrong order, and I would expect it to change on contact with the documents."
  ],
  risks: [
    {
      n: "01",
      risk: "Fabricated or mislocated citation",
      severity: "Critical",
      consequence: "Permanent loss of legal trust",
      mitigation: "Deterministic span verification before display; unverifiable answers are suppressed, not softened."
    },
    {
      n: "02",
      risk: "Extraction quality varies by language",
      severity: "High",
      consequence: "Systematic blind spot in one jurisdiction",
      mitigation: "Per-language evaluation sets and per-language acceptance thresholds; no global accuracy claim."
    },
    {
      n: "03",
      risk: "Review workload simply shifts to Legal",
      severity: "High",
      consequence: "No net saving and the sponsor loses the business case",
      mitigation: "Confidence-banded routing: only low-confidence extractions enter the review queue, and queue volume is a tracked KPI."
    },
    {
      n: "04",
      risk: "Divergence from the DMS",
      severity: "Medium",
      consequence: "Two versions of the truth",
      mitigation: "The DMS stays the document authority; the obligation store references it and never holds the master copy."
    },
    {
      n: "05",
      risk: "Scan quality blocks part of the corpus",
      severity: "Medium",
      consequence: "Silent coverage gaps",
      mitigation: "Coverage is reported per document family; unprocessable documents are listed explicitly rather than omitted."
    }
  ],
  kpis: [
    {
      category: "Coverage",
      kpi: "Contracts with all 12 priority clause types extracted",
      baseline: "0%",
      target: "> 90%",
      why: "Portfolio questions are only answerable at high coverage."
    },
    {
      category: "Accuracy",
      kpi: "Clause-type precision on the held-out set, per language",
      baseline: "n/a",
      target: "> 0.95",
      why: "Measured per language because that is where the failure hides."
    },
    {
      category: "Efficiency",
      kpi: "Time to answer a portfolio liability question",
      baseline: "3 days",
      target: "< 2 hours",
      why: "The question that triggered the programme."
    },
    {
      category: "Trust",
      kpi: "Citation verification failures shown to users",
      baseline: "n/a",
      target: "0",
      why: "The adoption-critical guarantee."
    },
    {
      category: "Value",
      kpi: "Indexation clauses exercised",
      baseline: "unknown",
      target: "100% of eligible",
      why: "A direct, measurable cash benefit."
    }
  ],
  roadmap: [
    {
      phase: "P0",
      name: "Taxonomy and corpus survey",
      duration: "4 weeks",
      goal: "Agree the 12 priority clause types with Legal; measure OCR quality across the estate.",
      deliverables: [
        "Clause taxonomy",
        "Corpus quality report",
        "Evaluation set design"
      ]
    },
    {
      phase: "P1",
      name: "Metadata and renewal calendar",
      duration: "6 weeks",
      goal: "Ship the renewal and indexation calendar using deterministic metadata only.",
      deliverables: [
        "Ingestion pipeline",
        "Obligation store",
        "Renewal dashboard"
      ]
    },
    {
      phase: "P2",
      name: "Clause extraction",
      duration: "9 weeks",
      goal: "Typed extraction with citation verification and a confidence-banded review queue.",
      deliverables: [
        "Extractor",
        "Citation verifier",
        "Legal review workflow"
      ]
    },
    {
      phase: "P3",
      name: "Portfolio queries",
      duration: "6 weeks",
      goal: "Natural-language portfolio questions answered from the structured store with citations.",
      deliverables: [
        "Query interface",
        "Template deviation report"
      ]
    }
  ],
  lessonsLearned: [
    "Asking what happens after a flag is raised turned the product from a chatbot into a database.",
    "Provenance is an architectural property, not a UI feature — it has to be designed into ingestion.",
    "Sequencing the deterministic value first bought the trust the generative layer needed."
  ],
  futureImprovements: [
    "Template deviation scoring against the group's standard clause library.",
    "Negotiation support surfacing precedent positions across the estate.",
    "Continuous ingestion from Ariba so the store never goes stale."
  ]
};

export default caseStudy;
