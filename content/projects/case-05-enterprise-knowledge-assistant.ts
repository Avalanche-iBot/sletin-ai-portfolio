// Generated content module. Edit freely — this is the CMS layer.
import type { CaseStudy } from "../types";

const caseStudy: CaseStudy = {
  "slug": "enterprise-knowledge-assistant",
  "order": 5,
  "title": "Enterprise Knowledge Assistant",
  "subtitle": "A retrieval assistant for industrial operations, where an unsourced answer about a well or a pipeline is not an answer at all.",
  "industry": "Energy · Industrial operations",
  "domain": "Technical knowledge · Operations support",
  "status": "In design",
  "architectureComplexity": 5,
  "shortSummary": "The case study closest to my own working domain. Engineers will not use a system that cannot show the document, revision and page — so permissioned, revision-aware retrieval is the architecture, and generation is the thin layer on top.",
  "tags": [
    "RAG",
    "Permissioned retrieval",
    "Technical documents",
    "Revision control",
    "Azure"
  ],
  "featured": true,
  "client": "Energy operator — technical function",
  "clientNote": "Upstream operations",
  "statusNote": "Discovery complete, drawn from direct domain experience. Retrieval evaluation harness in build.",
  "complexityLabel": "Very high — heterogeneous corpus, permissioned retrieval, safety-critical accuracy bar",
  "duration": "Reference programme: 8 months",
  "impact": "Target: technical lookup 45 min → 3 min · 100% of answers revision-linked · zero cross-asset permission leaks",
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
        "Document Intelligence",
        "Reranking"
      ]
    },
    {
      "group": "Backend",
      "items": [
        "Python",
        "FastAPI",
        "Celery",
        "Service Bus"
      ]
    },
    {
      "group": "Data",
      "items": [
        "PostgreSQL",
        "Blob Storage",
        "Redis",
        "SharePoint"
      ]
    },
    {
      "group": "Identity",
      "items": [
        "Entra ID",
        "Asset-level RBAC",
        "Query-time security filters"
      ]
    }
  ],
  "executiveSummary": {
    "statement": "Technical knowledge in an operating company is spread across procedures, inspection reports, drawings, well files, vendor manuals and twenty years of email-attached spreadsheets. An engineer looking for the correct revision of a procedure for a specific asset routinely spends most of an hour on it.\n\nTwo constraints dominate the architecture, and both are unusual. Permissions: access to technical documentation is scoped by asset, contract and sometimes joint-venture agreement, so retrieval must filter by identity at query time rather than after generation. Revision: a superseded procedure retrieved confidently is a safety issue, not a quality issue. Everything else in the design follows from those two facts, including the decision to ship a full retrieval product before enabling generation at all.",
    "highlights": [
      {
        "k": "Business driver",
        "v": "Engineering time lost to document search"
      },
      {
        "k": "Hard constraint",
        "v": "Asset-level permissions enforced inside retrieval"
      },
      {
        "k": "Safety constraint",
        "v": "Superseded revisions must never be surfaced as current"
      },
      {
        "k": "Sequencing choice",
        "v": "Retrieval ships in phase 1; generation waits for phase 2"
      },
      {
        "k": "Architectural verdict",
        "v": "Permissioned, revision-aware retrieval with generation as a thin layer"
      }
    ]
  },
  "businessContext": {
    "narrative": "The corpus is heterogeneous by nature: scanned drawings, native PDFs, spreadsheets whose meaning is encoded in cell layout, and reports whose tables carry the actual content. Ownership is distributed across engineering disciplines with no central librarian.\n\nWhat separates this from a generic enterprise search project is the consequence structure. A wrong answer about a torque specification or an inspection interval is not an inconvenience.",
    "companyFacts": [
      {
        "k": "Document families",
        "v": "11 priority families"
      },
      {
        "k": "Scanned share",
        "v": "~30% of legacy material"
      },
      {
        "k": "Permission scopes",
        "v": "Asset · contract · JV agreement"
      },
      {
        "k": "Revision authority",
        "v": "The DMS, not the assistant"
      },
      {
        "k": "Target lookup time",
        "v": "< 3 minutes"
      }
    ],
    "drivers": [
      "Engineering hours lost searching for the current revision",
      "Domain knowledge leaving with retiring staff",
      "Repeated questions consuming senior engineers' time",
      "Inconsistent answers across sites"
    ],
    "constraints": [
      "Document access is scoped by asset and joint-venture agreement",
      "Only controlled, current revisions may be presented as authoritative",
      "Tables and drawings carry primary content, not prose",
      "No document content may leave the tenant"
    ],
    "existingStack": [
      "SharePoint",
      "Document management system",
      "Microsoft 365",
      "Power BI",
      "Azure"
    ]
  },
  "stakeholders": [
    {
      "role": "Engineering discipline leads",
      "interest": "Faster access to correct technical information",
      "concern": "A system answering confidently from a superseded revision",
      "influence": "Architecture gate"
    },
    {
      "role": "Operations superintendents",
      "interest": "Field-usable answers",
      "concern": "Anything needing a laptop and ten minutes",
      "influence": "Adoption make-or-break"
    },
    {
      "role": "Document control",
      "interest": "Revision integrity preserved",
      "concern": "A parallel uncontrolled copy of the document estate",
      "influence": "Veto power"
    },
    {
      "role": "HSE",
      "interest": "No safety-relevant misinformation",
      "concern": "Procedural guidance generated rather than cited",
      "influence": "Compliance gate"
    },
    {
      "role": "IT security",
      "interest": "Permission model preserved end to end",
      "concern": "Embeddings leaking content across permission boundaries",
      "influence": "Compliance gate"
    }
  ],
  "discovery": {
    "groups": [
      {
        "audience": "Engineering discipline leads",
        "goal": "Establish what makes a technical answer trustworthy.",
        "questions": [
          "When a colleague gives you an answer, what makes you accept it?",
          "How do you currently confirm you have the current revision?",
          "Which questions do you get asked repeatedly?",
          "What would make you stop using such a system permanently?"
        ],
        "answers": [
          "Acceptance depends on knowing which document and revision it came from.",
          "Revision checking is manual and sometimes skipped under time pressure.",
          "One superseded-revision answer would end trust."
        ]
      },
      {
        "audience": "IT security and document control",
        "goal": "Understand the permission model before designing retrieval.",
        "questions": [
          "How are document permissions actually assigned today?",
          "Are there documents whose existence is itself restricted?",
          "What happens when someone changes role or asset?",
          "Who owns the definition of 'current revision'?"
        ],
        "answers": [
          "Permissions are asset- and agreement-scoped, with some existence-restricted material.",
          "The DMS is the only authority on revision status."
        ]
      },
      {
        "audience": "Operations superintendents",
        "goal": "Find out what usable means in the field.",
        "questions": [
          "Where are you when you need this answer?",
          "How long before you give up and phone someone?",
          "What would you rather have: a paragraph or a pointer to the page?"
        ],
        "answers": [
          "Often on site, on a phone, with limited time.",
          "A pointer to the exact page beats a paragraph of explanation."
        ]
      }
    ],
    "intro": "I have spent two and a half years inside a technical function of exactly this shape. Discovery here started from lived observation and was then tested with the questions below, rather than the other way round.",
    "assumptions": [
      "The DMS remains the single authority on revision status; the assistant reads it and never asserts its own.",
      "Existing permission metadata is complete enough to drive query-time security filters.",
      "Table and drawing extraction quality is sufficient for the priority document families identified in phase 0.",
      "Engineers accept a citation-first answer format over a conversational one."
    ],
    "implications": [
      {
        "finding": "Some documents' existence is restricted",
        "implication": "Post-generation filtering is unacceptable. Security filters apply to the retrieval query itself, and the index carries permission metadata."
      },
      {
        "finding": "The DMS owns revision status",
        "implication": "Revision status is resolved live at query time rather than cached. Stale revision state is the failure mode to design out."
      },
      {
        "finding": "Trust depends on document, revision and page",
        "implication": "The answer format leads with the citation, and generation is constrained to what the citation supports."
      },
      {
        "finding": "Tables carry primary content",
        "implication": "Table extraction is a separate pipeline stage with its own evaluation, not a preprocessing detail."
      },
      {
        "finding": "Field users are on phones",
        "implication": "A short cited answer with a page pointer, not a conversational exchange."
      }
    ],
    "businessRisks": [
      "A safety-relevant answer from a superseded revision",
      "Permission leakage across joint-venture boundaries",
      "Adoption failure among field staff if the interface is not fast"
    ],
    "technicalConstraints": [
      "Query-time security filtering, no post-hoc redaction",
      "Revision status resolved live against the DMS",
      "Scanned drawings need OCR plus human triage",
      "Spreadsheet semantics encoded in layout"
    ]
  },
  "analysis": {
    "aiNeeded": {
      "verdict": "Yes — retrieval is the value, generation is the convenience",
      "body": "The corpus is too heterogeneous and too large for navigation or keyword search. But nearly all measurable value comes from finding the right passage in the right revision; the generated wrapper mainly saves reading time. That ratio justifies shipping retrieval first."
    },
    "automationAlternative": {
      "verdict": "Better metadata would solve part of it and should be done regardless",
      "canAutomate": [
        "Revision status resolution",
        "Asset-tag extraction and linking",
        "Duplicate and superseded copy detection"
      ],
      "cannotAutomate": [
        "Answering a phrased technical question spanning three document families",
        "Locating a torque value inside a scanned vendor manual table"
      ],
      "body": "The metadata work is a prerequisite for retrieval quality anyway, so it is funded as phase 1 rather than argued about."
    },
    "valueAreas": [
      "Cited answers to recurring technical questions",
      "Cross-document retrieval within permission scope",
      "Table and drawing content made searchable",
      "Capture of retiring engineers' knowledge into a reviewed knowledge base"
    ],
    "outOfScope": [
      "Generating or amending procedures",
      "Anything presented as engineering authority",
      "Real-time operational decision support"
    ],
    "conclusion": "Positioned as a retrieval assistant with citations, never as an authority. The architecture enforces that positioning rather than relying on interface wording."
  },
  "architecture": {
    "overview": "Permission-aware ingestion into an index carrying asset, agreement and revision metadata; query-time security filtering; live revision resolution against the DMS; citation-first answer composition.",
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
                "t": "Teams app"
              },
              {
                "t": "Web client"
              },
              {
                "t": "Mobile",
                "sub": "field, phase 2",
                "muted": true
              }
            ]
          },
          {
            "label": "Query layer",
            "nodes": [
              {
                "t": "FastAPI",
                "accent": true
              },
              {
                "t": "Identity-scoped query builder",
                "accent": true
              },
              {
                "t": "Revision resolver",
                "accent": true
              },
              {
                "t": "Citation-first composer",
                "accent": true
              }
            ]
          },
          {
            "label": "Retrieval",
            "nodes": [
              {
                "t": "Azure AI Search",
                "sub": "hybrid + security filters"
              },
              {
                "t": "Reranker"
              },
              {
                "t": "Table index",
                "sub": "separate path"
              }
            ]
          },
          {
            "label": "Ingestion",
            "nodes": [
              {
                "t": "Document Intelligence",
                "sub": "layout · OCR · tables"
              },
              {
                "t": "Chunker",
                "sub": "structure-aware"
              },
              {
                "t": "Permission tagger"
              },
              {
                "t": "Embedding workers"
              }
            ]
          },
          {
            "label": "Sources",
            "nodes": [
              {
                "t": "DMS",
                "sub": "revision authority"
              },
              {
                "t": "SharePoint"
              },
              {
                "t": "Legacy shares"
              }
            ]
          },
          {
            "label": "Governance",
            "nodes": [
              {
                "t": "Entra ID"
              },
              {
                "t": "Audit log"
              },
              {
                "t": "Retrieval evaluation harness"
              }
            ]
          }
        ]
      },
      {
        "id": "rag-pipeline",
        "kind": "pipeline",
        "title": "Retrieval pipeline with permission and revision gates",
        "caption": "Two gates distinguish this from a generic RAG pipeline: permissions apply before retrieval, revision resolves before composition.",
        "lanes": [
          {
            "label": "Ingest",
            "steps": [
              "Source crawl with permission metadata",
              "Layout, OCR and table extraction",
              "Structure-aware chunking",
              "Embedding and index write"
            ],
            "note": "Permission metadata travels with every chunk."
          },
          {
            "label": "Query",
            "steps": [
              "Resolve caller identity and asset scope",
              "Build security-filtered query",
              "Hybrid retrieval",
              "Rerank"
            ],
            "note": "Nothing is retrieved that the caller may not open directly."
          },
          {
            "label": "Compose",
            "steps": [
              "Resolve revision status against the DMS",
              "Drop superseded passages",
              "Compose answer constrained to citations",
              "Attach document, revision and page"
            ],
            "note": "Superseded content is removed before generation, not flagged after."
          }
        ]
      },
      {
        "id": "auth-flow",
        "kind": "sequence",
        "title": "Authorisation and revision resolution",
        "caption": "Identity and revision are resolved on every request. Neither is cached in the index.",
        "actors": [
          "Engineer",
          "Teams app",
          "Query API",
          "Entra ID",
          "AI Search",
          "DMS"
        ],
        "messages": [
          {
            "from": 0,
            "to": 1,
            "t": "Asks a technical question"
          },
          {
            "from": 1,
            "to": 2,
            "t": "Request with bearer token"
          },
          {
            "from": 2,
            "to": 3,
            "t": "Validate token, read asset scope claims"
          },
          {
            "from": 2,
            "to": 4,
            "t": "Retrieve with security filter",
            "note": "Filter is part of the query, not a post-step"
          },
          {
            "from": 2,
            "to": 5,
            "t": "Resolve revision status of candidate documents"
          },
          {
            "from": 5,
            "to": 2,
            "t": "Current / superseded per document"
          },
          {
            "from": 2,
            "to": 1,
            "t": "Cited answer: document, revision, page"
          },
          {
            "from": 1,
            "to": 0,
            "t": "Answer with source link"
          }
        ]
      }
    ],
    "layers": [
      {
        "name": "Query layer",
        "why": "Identity, revision and citation constraints all converge here. Splitting them across services is how one of them gets skipped."
      },
      {
        "name": "Retrieval",
        "why": "Two indexes — prose and tables — because they need different chunking and different accuracy measurement."
      },
      {
        "name": "Ingestion",
        "why": "Permission tagging happens at ingest; an untagged chunk is unusable by design."
      },
      {
        "name": "Governance",
        "why": "The evaluation harness is a permanent component, not a phase. Retrieval quality is regression-tested per document family."
      }
    ]
  },
  "technologySelection": [
    {
      "layer": "Retrieval security",
      "choice": "Query-time security filters on a permission-tagged index",
      "why": "The only model that survives existence-restricted documents. Filtering after generation has already leaked.",
      "alt": "Single index with post-filtering — simpler, unacceptable here."
    },
    {
      "layer": "Revision handling",
      "choice": "Live resolution against the DMS at query time",
      "why": "The DMS is the authority; caching revision state creates exactly the failure the client fears most.",
      "alt": "Nightly revision sync — cheaper, opens a window where superseded content is authoritative."
    },
    {
      "layer": "Table content",
      "choice": "Separate table-extraction path with its own index and evaluation",
      "why": "In this corpus, tables are the content. Treating them as prose loses the answer.",
      "alt": "Prose-only extraction — much faster to build, misses the highest-value questions."
    },
    {
      "layer": "Answer format",
      "choice": "Citation-first, short, with a page pointer",
      "why": "Matches how engineers verify, and how field users actually read on a phone.",
      "alt": "Conversational answers — friendlier, and slower to verify."
    }
  ],
  "security": {
    "posture": "The permission model is not a feature of the assistant; it is a property of retrieval. Nothing enters a prompt that the caller could not open directly in the DMS.",
    "controls": [
      {
        "t": "Query-time security filtering",
        "d": "Asset and agreement scope resolved from Entra ID claims and applied to the retrieval query itself."
      },
      {
        "t": "Permission-tagged chunks",
        "d": "Every chunk carries its source ACL metadata; re-permissioning triggers reindexing of affected chunks."
      },
      {
        "t": "Adversarial permission tests in CI",
        "d": "A build fails if any test identity can retrieve out-of-scope content."
      },
      {
        "t": "Full audit trail",
        "d": "Query, retrieved document IDs, revisions and caller identity are logged immutably."
      },
      {
        "t": "Tenant-bound processing",
        "d": "No document content leaves the tenant and none is used for model training."
      }
    ]
  },
  "scalability": {
    "body": "The scaling problem is corpus onboarding, not query volume: each new asset brings its own document families, permission structure and quality profile.",
    "levers": [
      {
        "t": "Per-asset onboarding runbook",
        "d": "Onboarding is a repeatable process with a quality gate, not a bespoke project each time."
      },
      {
        "t": "Independent worker pools",
        "d": "OCR, table extraction and embedding scale separately, since their cost profiles differ."
      },
      {
        "t": "Incremental reindexing",
        "d": "Only affected chunks are reprocessed on document or permission change."
      },
      {
        "t": "Cache on identity plus query",
        "d": "Repeated questions within a permission scope are served from cache without re-retrieval."
      }
    ]
  },
  "costOptimization": {
    "body": "Steady-state query cost is small; the real spend is ingestion and reprocessing of a large, partly scanned back catalogue.",
    "levers": [
      {
        "n": "01",
        "t": "Retrieval-only phase 1",
        "d": "The first release has no generation cost at all."
      },
      {
        "n": "02",
        "t": "OCR only where needed",
        "d": "Native-text documents skip the OCR path."
      },
      {
        "n": "03",
        "t": "Cheap model for query rewriting",
        "d": "The capable model is reserved for composition."
      },
      {
        "n": "04",
        "t": "Identity-scoped caching",
        "d": "Repeat questions inside a scope avoid both retrieval and generation."
      },
      {
        "n": "05",
        "t": "Reindex on change, not on schedule",
        "d": "Avoids full re-embedding campaigns."
      }
    ],
    "model": [
      {
        "k": "Backfill volume",
        "v": "~11 document families"
      },
      {
        "k": "Backfill AI cost estimate",
        "v": "~€30–40k one-time"
      },
      {
        "k": "Phase-1 query cost",
        "v": "€0.00 — retrieval only"
      },
      {
        "k": "Phase-2 answer cost",
        "v": "~€0.02 / query"
      },
      {
        "k": "Steady-state monthly",
        "v": "~€1.5–2k"
      }
    ]
  },
  "risks": [
    {
      "n": "01",
      "risk": "Superseded revision presented as current",
      "severity": "Critical",
      "consequence": "Safety-relevant misinformation",
      "mitigation": "Live revision resolution before composition; superseded passages dropped and the revision stated explicitly in every answer."
    },
    {
      "n": "02",
      "risk": "Permission leakage across joint-venture boundaries",
      "severity": "Critical",
      "consequence": "Contractual breach",
      "mitigation": "Query-time filtering, permission-tagged chunks, reindex on ACL change, and adversarial permission tests that break the build."
    },
    {
      "n": "03",
      "risk": "Field adoption failure",
      "severity": "High",
      "consequence": "The users with least time keep phoning colleagues instead",
      "mitigation": "Teams-native surface, citation-first short answers, and a measured time-to-answer target."
    },
    {
      "n": "04",
      "risk": "Table and drawing extraction gaps",
      "severity": "High",
      "consequence": "The highest-value questions silently unanswerable",
      "mitigation": "Separate table path with its own accuracy measurement; unsupported document families listed explicitly rather than failing silently."
    },
    {
      "n": "05",
      "risk": "Corpus quality worse than assumed",
      "severity": "Medium",
      "consequence": "Coverage stalls and the business case weakens",
      "mitigation": "Phase-0 corpus survey with per-family quality scores; scope is set from measured quality, not optimism."
    },
    {
      "n": "06",
      "risk": "Assistant treated as an authority",
      "severity": "High",
      "consequence": "Engineering decisions taken on a generated paragraph",
      "mitigation": "Citation-first format, explicit non-authority framing, and no generated procedural guidance."
    }
  ],
  "kpis": [
    {
      "category": "Efficiency",
      "kpi": "Median time to a cited technical answer",
      "baseline": "~45 min",
      "target": "< 3 min",
      "why": "The engineering-hours business case."
    },
    {
      "category": "Safety",
      "kpi": "Answers citing a superseded revision",
      "baseline": "n/a",
      "target": "0",
      "why": "Non-negotiable gate for HSE and document control."
    },
    {
      "category": "Security",
      "kpi": "Permission-boundary test failures in CI",
      "baseline": "n/a",
      "target": "0",
      "why": "Treated as a build-breaking condition, not a monitoring metric."
    },
    {
      "category": "Coverage",
      "kpi": "Priority document families indexed with table extraction",
      "baseline": "0%",
      "target": "> 85%",
      "why": "Determines how many real questions the system can answer."
    },
    {
      "category": "Quality",
      "kpi": "Answers where the cited passage supports the claim",
      "baseline": "n/a",
      "target": "> 0.97",
      "why": "Measured by sampling, since this is the failure engineers will notice first."
    },
    {
      "category": "Adoption",
      "kpi": "Weekly active engineers per onboarded asset",
      "baseline": "0",
      "target": "> 50%",
      "why": "Adoption is per asset, because onboarding quality varies."
    }
  ],
  "roadmap": [
    {
      "phase": "P0",
      "name": "Corpus and permission survey",
      "duration": "5 weeks",
      "goal": "Map document families, extraction difficulty and the real permission model.",
      "deliverables": [
        "Corpus map with per-family quality scores",
        "Permission model specification",
        "Golden question set from real engineering queries"
      ]
    },
    {
      "phase": "P1",
      "name": "Permissioned retrieval, no generation",
      "duration": "8 weeks",
      "goal": "Search returning correct, permission-scoped, current-revision passages. Value ships before any model writes a sentence.",
      "deliverables": [
        "Ingestion pipeline",
        "Security-filtered index",
        "Revision resolver",
        "Retrieval evaluation harness"
      ]
    },
    {
      "phase": "P2",
      "name": "Cited answer composition",
      "duration": "6 weeks",
      "goal": "Citation-first generated answers over the retrieval layer, in Teams.",
      "deliverables": [
        "Composer with citation constraints",
        "Teams app",
        "Hallucination evaluation"
      ]
    },
    {
      "phase": "P3",
      "name": "Tables, drawings and scale-out",
      "duration": "8 weeks",
      "goal": "Table-aware retrieval and rollout to further assets.",
      "deliverables": [
        "Table index",
        "Per-asset onboarding runbook",
        "Field mobile surface"
      ]
    }
  ],
  "implementationNotes": {
    "body": "The build order is deliberately unusual: a full retrieval product ships before generation is enabled. It delivers standalone value, produces the evaluation data the generative layer needs, and means a delay in generation quality never blocks the business case.",
    "decisions": [
      {
        "id": "ADR-01",
        "t": "Permissions enforced in the query, not the answer",
        "d": "Rules out simpler designs and is the single most consequential decision in this case."
      },
      {
        "id": "ADR-02",
        "t": "The DMS remains the revision authority",
        "d": "The assistant resolves and cites revision status; it never asserts its own."
      },
      {
        "id": "ADR-03",
        "t": "Ship retrieval before generation",
        "d": "Sequencing choice that de-risks both the business case and the accuracy bar."
      },
      {
        "id": "ADR-04",
        "t": "Tables get their own pipeline and index",
        "d": "Follows from the corpus, not from the reference architecture."
      },
      {
        "id": "ADR-05",
        "t": "Permission tests break the build",
        "d": "Moves a security property from monitoring into CI."
      }
    ]
  },
  "lessonsLearned": [
    "Working inside this domain taught me that the blocking constraint is rarely the model — it is the permission model and the revision discipline around the documents.",
    "Shipping retrieval before generation is the sequencing decision I would defend hardest in a design review.",
    "'Tables are the content' is obvious to any engineer in this field and invisible in most RAG reference architectures.",
    "Asking field superintendents where they physically are when they need an answer changed the output format more than any model choice."
  ],
  "futureImprovements": [
    "Asset-tag graph linking documents, equipment and inspection history.",
    "Drawing-region retrieval so a P&ID area can be cited directly.",
    "Reviewed capture workflow turning retiring engineers' answers into citable knowledge.",
    "Offline-capable field client for low-connectivity sites."
  ]
};

export default caseStudy;
