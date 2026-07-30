import type { CaseStudy } from "../types";

/**
 * Case study 05 — enterprise knowledge assistant.
 *
 * The lesson this note owns is that access control belongs inside the retrieval
 * path rather than in front of it. Filtering after retrieval leaks through
 * ranking, through summaries, and through the bare fact that a result is
 * missing — so permissions have to be part of the query.
 *
 * The note then pushes on a second idea that most retrieval writing treats as
 * settled. "The current revision" is not a property of a document. It is a
 * relation between a document, an asset and a date: an engineer working under a
 * management-of-change exception may be correctly required to follow revision 4
 * while revision 6 is current everywhere else, and both answers are right for
 * their own reader. A system that resolves revision globally will therefore be
 * confidently wrong for exactly the people whose situation is unusual — which,
 * in an operating company, is where the risk lives.
 *
 * Constructed scenario, drawn from a domain the author has worked in. That
 * combination is stated openly in the summary, because it changes how the note
 * should be read.
 */
const caseStudy: CaseStudy = {
  slug: "enterprise-knowledge-assistant",
  order: 5,
  title: "Enterprise Knowledge Assistant",
  subtitle:
    "A retrieval assistant for industrial operations, where the current revision of a procedure depends on which asset is asking.",
  industry: "Energy · Industrial operations",
  domain: "Technical knowledge · Operations support",
  status: "Open question",
  statusNote:
    "Discovery complete, drawn from direct domain experience. Retrieval quality remains the open question, and asset-specific revision applicability is the part I am least confident can be sourced cleanly.",
  architectureComplexity: 5,
  complexityLabel:
    "Very high — heterogeneous corpus, permissions inside retrieval, revision applicability, safety-critical accuracy bar",
  duration: "Assumed programme length: 8 months",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: true,
  shortSummary:
    "The case closest to my own working domain. Engineers will not use a system that cannot show the document, revision and page — so permissioned, revision-aware retrieval is the architecture and generation is a thin layer on top. The harder half is that \"current\" is not a property of a document but a relation between a document, an asset and a date.",
  impact:
    "Target: technical lookup 45 min → 3 min · every answer revision-linked and asset-qualified · zero cross-asset permission leaks",
  tags: ["RAG", "Permissioned retrieval", "Technical documents", "Revision control", "Azure"],

  techGroups: [
    { group: "AI", items: ["Azure OpenAI", "Azure AI Search", "Document Intelligence", "Cross-encoder reranking"] },
    { group: "Backend", items: ["Python", "FastAPI", "Celery", "Service Bus"] },
    { group: "Data", items: ["PostgreSQL", "Blob Storage", "Redis", "SharePoint"] },
    { group: "Governance", items: ["Entra ID", "Query-time security filters", "Immutable audit log", "Evaluation harness"] },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario — but with a qualification the other notes on this site do not need. I have spent two and a half years inside a technical function of roughly this shape, so the corpus, the permission structure and the failure modes here are observed rather than reasoned about. The organisation is invented; the way this work goes wrong is not.\n\nThat cuts both ways and it is worth saying which. Familiarity makes the discovery findings more reliable than in the other notes. It also makes me more confident than the evidence in front of me justifies, which is a bias that does not announce itself, and it is why the open questions at the end are longer here than elsewhere.\n\nScenario: technical knowledge in an operating company, spread across procedures, inspection reports, drawings, well files, vendor manuals and twenty years of email-attached spreadsheets. An engineer looking for the correct revision of a procedure for a specific asset routinely spends most of an hour on it, and frequently ends up phoning someone instead.\n\nTwo constraints dominate, and both are unusual enough that a generic retrieval design fails on them. Permissions are scoped by asset, contract and sometimes joint-venture agreement, and some material is restricted in its existence rather than only in its contents — which makes post-retrieval filtering unusable, because a missing result is itself a disclosure. Revision is the second, and it is where this note spends most of its effort: a superseded procedure retrieved confidently is a safety issue rather than a quality issue.\n\nThe part that took longest to see is that revision is not a document property. A management-of-change exception can leave one platform correctly operating to revision 4 while revision 6 is current everywhere else. Ask the same question from two assets and there are two different right answers. A system that resolves revision globally is not slightly wrong for a few users — it is confidently wrong for precisely the people whose circumstances are unusual, which in an operating company is where the incidents come from.",
    verdict:
      "Permissions belong in the query and revision belongs to the asset asking. Neither is a filter you can apply to an answer after it exists.",
    highlights: [
      { k: "Business driver", v: "Engineering time lost to document search, and knowledge leaving with retiring staff" },
      { k: "Hard constraint", v: "Asset-level permissions enforced inside retrieval, not after it" },
      { k: "Safety constraint", v: "A superseded revision presented as current is an incident, not a defect" },
      { k: "The part usually missed", v: "\"Current\" depends on which asset is asking, and on the date" },
      {
        k: "What would break it",
        v: "If revision applicability cannot be sourced per asset, the system can only answer for the standard case — which is the case nobody needed help with",
      },
    ],
  },

  businessContext: {
    narrative:
      "The corpus is heterogeneous by nature rather than by neglect. Scanned drawings, native PDFs, spreadsheets whose meaning is encoded in cell layout, and inspection reports whose tables carry the actual content while the prose carries the caveats. Ownership is distributed across engineering disciplines with no central librarian, which is normal and is not going to change.\n\nWhat separates this from a generic enterprise search project is the consequence structure. A wrong answer about a torque specification, an inspection interval or an isolation procedure is not an inconvenience — it is the first link in an incident chain, and it will be read out in the investigation.\n\nThe figure that matters most and that I would establish first is the share of assets currently operating under an active deviation or management-of-change exception. In this scenario I have assumed around 12%, concentrated on older facilities. If it is 2%, the applicability machinery described here is over-engineering. If it is 30%, it is the entire product and everything else is supporting work.",
    companyFacts: [
      { k: "Priority document families", v: "11" },
      { k: "Scanned share of legacy material", v: "~30%" },
      { k: "Permission scopes", v: "Asset · contract · joint-venture agreement" },
      { k: "Assets under an active deviation, assumed", v: "~12%, concentrated on older facilities" },
      { k: "Revision authority", v: "The document management system, never the assistant" },
      { k: "Current lookup time", v: "~45 minutes, or a phone call" },
      { k: "Target lookup time", v: "< 3 minutes" },
    ],
    drivers: [
      "Engineering hours lost searching for the current revision of a known document.",
      "Domain knowledge leaving with retiring staff faster than it is being written down.",
      "Repeated questions consuming senior engineers' time, which is the scarcest resource in the function.",
      "Inconsistent answers across sites, where the same question resolves differently depending on who is asked.",
    ],
    constraints: [
      "Document access is scoped by asset and by joint-venture agreement, and some documents are existence-restricted.",
      "Only controlled, current revisions may be presented as authoritative — and current is asset-dependent.",
      "Tables and drawings carry primary content; prose is frequently the least important part of a document.",
      "No document content may leave the tenant, and none may be used for training.",
      "The document management system remains the authority on everything it owns.",
    ],
    existingStack: ["SharePoint", "Document management system", "Microsoft 365", "Power BI", "Azure"],
  },

  stakeholders: [
    {
      role: "Engineering discipline leads",
      interest: "Faster access to correct technical information.",
      concern: "A system answering confidently from a superseded revision.",
      influence: "Architecture gate",
    },
    {
      role: "Operations superintendents",
      interest: "Field-usable answers, on a phone, in minutes.",
      concern: "Anything requiring a laptop and ten minutes, which is the same as nothing.",
      influence: "Adoption make-or-break",
    },
    {
      role: "Document control",
      interest: "Revision integrity preserved, and their authority not undermined.",
      concern: "A parallel uncontrolled copy of the document estate appearing beside the controlled one.",
      influence: "Veto power",
    },
    {
      role: "Technical authorities",
      interest: "Deviations and exceptions respected rather than averaged away.",
      concern: "An assistant telling an operator the standard answer when their asset has an approved exception.",
      influence: "Owns the exceptions",
    },
    {
      role: "Health, safety and environment",
      interest: "No safety-relevant misinformation, and a defensible account after an incident.",
      concern: "Procedural guidance generated rather than cited.",
      influence: "Compliance gate",
    },
    {
      role: "IT security",
      interest: "The permission model preserved end to end, including through derived data.",
      concern: "Embeddings carrying content across permission boundaries the source documents respect.",
      influence: "Compliance gate",
    },
  ],

  discovery: {
    intro:
      "Discovery here started from lived observation and was then tested with the questions below, rather than the other way round. The finding that changed the design was not about accuracy or about permissions — both were anticipated. It was that two engineers can ask an identical question and correctly receive different answers, because their assets are under different revision regimes.",
    groups: [
      {
        audience: "Engineering discipline leads",
        goal: "Establish what makes a technical answer trustworthy enough to act on.",
        questions: [
          "When a colleague gives you an answer, what makes you accept it?",
          "How do you currently confirm you have the current revision?",
          "Which questions do you get asked repeatedly?",
          "What would make you stop using such a system permanently?",
          "Is the current revision always the one that applies?",
        ],
        answers: [
          "Acceptance depends on knowing which document and which revision it came from.",
          "Revision checking is manual and is sometimes skipped under time pressure, which is exactly when it matters.",
          "One superseded-revision answer would end trust permanently.",
          "The last question produced a pause and then: no, not on assets with an open deviation.",
        ],
      },
      {
        audience: "Technical authorities",
        goal: "Understand how exceptions work, and where they are recorded.",
        questions: [
          "Walk me through an approved deviation from a standard procedure.",
          "Where does the fact of that deviation live?",
          "How would someone on that asset know the standard revision does not apply to them?",
          "How long do deviations typically remain open?",
          "What happens when the base procedure is revised while a deviation is open?",
        ],
        answers: [
          "Deviations live in a management-of-change register, separate from the document system.",
          "How anybody is supposed to know is largely institutional memory and the local superintendent.",
          "Deviations intended to last three months routinely remain open for years.",
        ],
      },
      {
        audience: "Document control",
        goal: "Establish what the document system can and cannot authoritatively answer.",
        questions: [
          "Who owns the definition of 'current revision'?",
          "Is there a state between approved and effective?",
          "How are withdrawn documents represented?",
          "Can the system tell me which revision applied on a given date?",
          "Does the document system know anything about deviations?",
        ],
        answers: [
          "The document system is the only authority on revision status, and it is reliable.",
          "There is an approved-but-not-yet-effective state, and it is a common source of confusion.",
          "It does not know about deviations at all — that register belongs to a different function.",
        ],
      },
      {
        audience: "IT security",
        goal: "Understand the permission model before designing retrieval rather than after.",
        questions: [
          "How are document permissions actually assigned today?",
          "Are there documents whose existence is itself restricted?",
          "What happens when someone changes role or moves asset?",
          "If a joint-venture partner's data leaked into an answer, what would that be?",
        ],
        answers: [
          "Permissions are asset- and agreement-scoped, with some existence-restricted material.",
          "Existence-restricted means the count of results is a disclosure, not only the contents.",
          "A cross-partner leak is a contractual breach rather than an internal incident.",
        ],
      },
      {
        audience: "Operations superintendents",
        goal: "Find out what usable means in the field, as opposed to at a desk.",
        questions: [
          "Where are you when you need this answer?",
          "How long before you give up and phone someone?",
          "Would you rather have a paragraph, or a pointer to the page?",
          "What would you do if the system said it was not sure?",
        ],
        answers: [
          "Often on site, on a phone, with gloves on and limited time.",
          "A pointer to the exact page beats a paragraph of explanation, every time.",
          "\"Not sure\" is a useful answer and gets a phone call — a wrong answer gets acted on.",
        ],
      },
      {
        audience: "Corpus survey",
        goal: "Find out what the documents will support before designing around them.",
        questions: [
          "What proportion has a usable text layer?",
          "Which document families carry their content in tables rather than prose?",
          "Are asset tags used consistently enough to filter on?",
          "How many near-duplicate copies of the same procedure exist?",
        ],
        answers: [
          "Roughly 70% is native text; the scanned remainder is concentrated in older and higher-risk material.",
          "Inspection reports and vendor manuals carry their content almost entirely in tables.",
          "Asset tagging is inconsistent outside the primary document families.",
        ],
      },
    ],
    assumptions: [
      "The document management system remains the single authority on revision status; the assistant reads it and never asserts its own.",
      "The management-of-change register is queryable programmatically. This is the assumption the applicability design rests on, and the one I am least sure of — in my experience these registers are frequently spreadsheets.",
      "Existing permission metadata is complete enough to drive query-time security filters without a remediation project first.",
      "Table and drawing extraction quality is sufficient for the priority families identified in phase 0.",
      "Engineers accept a citation-first answer format over a conversational one, and prefer an explicit refusal to a hedged answer.",
      "Roughly 12% of assets carry an open deviation at any time.",
    ],
    implications: [
      {
        finding: "Some documents' existence is restricted",
        implication:
          "Post-retrieval filtering is unusable, because a shortened result list is itself a disclosure. Security filters apply to the retrieval query, the index carries permission metadata, and result counts must be indistinguishable between a caller who may see a document and one who may not.",
      },
      {
        finding: "The current revision is not always the applicable revision",
        implication:
          "Revision resolution takes the asking asset and the date as inputs, not just the document. An answer states the revision and the basis on which it applies, and where the two diverge it says so explicitly rather than picking one.",
      },
      {
        finding: "Deviations live in a register the document system knows nothing about",
        implication:
          "A second authority enters the design. Applicability is resolved by joining two systems that have never been joined, and where the join fails the system must refuse rather than fall back to the document system's global answer.",
      },
      {
        finding: "Deviations intended to last months remain open for years",
        implication:
          "This is not an edge case to handle later. It is a standing condition affecting a material share of assets, and treating it as an exception is how the system ends up wrong for the highest-risk facilities.",
      },
      {
        finding: "There is an approved-but-not-yet-effective state",
        implication:
          "The date is a first-class input. \"Which revision applies\" has no answer without one, and the honest default — today — has to be visible rather than implicit, because the interesting questions are frequently about a future shutdown.",
      },
      {
        finding: "Trust depends on document, revision and page",
        implication:
          "The answer format leads with the citation and generation is constrained to what the citation supports. Generation is a convenience layered on retrieval, which is why retrieval ships alone first.",
      },
      {
        finding: "Tables carry the primary content",
        implication:
          "Table extraction is a separate pipeline stage with its own index and its own evaluation, not a preprocessing detail folded into document parsing.",
      },
      {
        finding: "Field users are on phones and prefer a refusal to a guess",
        implication:
          "A short cited answer with a page pointer, and an explicit \"cannot determine\" state that is a designed outcome rather than an error path.",
      },
    ],
    businessRisks: [
      "A safety-relevant answer from a superseded revision, or from the standard revision on an asset with an open deviation",
      "Permission leakage across joint-venture boundaries, which is contractual rather than internal",
      "Adoption failure among field staff if the interface is slower than phoning a colleague",
      "The assistant becoming an uncontrolled parallel copy of the controlled document estate",
    ],
    technicalConstraints: [
      "Query-time security filtering with no post-hoc redaction",
      "Revision applicability resolved live against two systems that have no existing join",
      "Scanned drawings need OCR plus human triage",
      "Spreadsheet semantics encoded in cell layout rather than in text",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes for retrieval. Generation is a convenience and ships second.",
      body:
        "The corpus is too heterogeneous and too large for navigation or keyword search: an engineer who does not know which of forty documents holds the answer cannot be helped by a better file tree. Semantic retrieval over a permission-tagged, table-aware index is the thing that creates value here.\n\nGeneration mainly saves reading time. That ratio is the justification for shipping retrieval alone in phase 1 — it delivers most of the benefit with none of the fabrication surface, and it lets the permission and revision machinery be proved in production before anything is composed on top of it.",
    },
    automationAlternative: {
      verdict: "Better metadata solves a real portion of this and should be done regardless",
      canAutomate: [
        "Revision status resolution against the document system",
        "Asset-tag extraction and linking",
        "Duplicate and superseded-copy detection",
        "Flagging documents whose applicability cannot be determined",
      ],
      cannotAutomate: [
        "Answering a phrased technical question that spans three document families",
        "Locating a torque value inside a scanned vendor manual table",
        "Deciding whether a deviation's wording covers the situation being asked about",
      ],
      body:
        "The metadata work is a prerequisite for retrieval quality in any case, so it is funded as part of phase 1 rather than argued about as a separate initiative. That framing matters politically: it is the same work document control has wanted for years, and it arrives with a budget attached.",
    },
    valueAreas: [
      "Cited answers to recurring technical questions, scoped to the asking engineer's entitlements",
      "Cross-document retrieval within permission scope",
      "Table and drawing content made searchable for the first time",
      "Explicit surfacing of deviations that apply to the asking asset",
    ],
    outOfScope: [
      "Generating or amending procedures",
      "Anything presented as engineering authority rather than as a citation",
      "Real-time operational decision support",
      "Answering when applicability cannot be established",
    ],
    conclusion:
      "Positioned as a retrieval assistant with citations, never as an authority — and the architecture enforces that positioning rather than relying on wording in the interface. The scope addition that came out of discovery is the applicability layer: the system's job is not to tell an engineer what the procedure says, but what procedure applies to them.",
  },

  alternatives: [
    {
      option: "Enterprise search without generation",
      verdict: "Set aside as a destination, adopted as phase 1",
      caseFor:
        "No fabrication surface at all, and for a user who knows roughly which document they want it is often faster than a conversational answer. It is also the version document control is least worried about.",
      caseAgainst:
        "It does not help the case that motivates the programme: somebody who does not know which of forty documents contains the answer. Ranking a list is not answering a question. Adopted as the first release precisely because it proves the permission and revision layers under real load without adding a second failure mode at the same time.",
    },
    {
      option: "Index everything, filter at answer time",
      verdict: "Set aside",
      caseFor:
        "Materially simpler ingestion, and permission logic lives in one place rather than being threaded through the pipeline. For a corpus without existence-restricted material it is a defensible design and it is what most implementations do.",
      caseAgainst:
        "Content the caller is not entitled to still influences retrieval and can leak through paraphrase even when the source is withheld. With existence-restricted documents it is worse than a leak risk — the number of results is itself a disclosure, and no post-filter can restore that. In an environment with joint-venture agreements, that is a contractual exposure I would not carry.",
    },
    {
      option: "Resolve revision globally and note deviations in the interface",
      verdict: "Set aside, and it is the tempting one",
      caseFor:
        "Enormously simpler. One authority, one join, one answer per document, and a banner saying \"check for local deviations\" discharges the obligation visibly. It ships months earlier and covers the large majority of questions correctly.",
      caseAgainst:
        "It is correct for the standard case and wrong for the exceptional one, and the exceptional one is where the risk is concentrated — older facilities with open deviations are exactly the assets where a procedural error costs most. A banner is not a control: it is read once and then filtered out, and it puts the burden back on the person the system was built to help.",
    },
    {
      option: "Permission-aware ingestion with asset-scoped revision applicability",
      verdict: "Direction taken in this note",
      caseFor:
        "Entitlement is enforced before content reaches the model, and the answer resolves against the revision that applies to the asking asset on the asking date rather than against whatever is globally current. That is what determines whether an engineer trusts the system a second time.",
      caseAgainst:
        "It couples the pipeline tightly to two source systems, one of which — the deviation register — may not be queryable at all. Reindexing on permission change is an operational cost that grows with the estate. And the refusal state it introduces will be unpopular: a system that declines to answer looks broken to somebody who does not know why it declined.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Permissions are part of the query",
        d: "Entitlement is a predicate the index evaluates, not a filter applied to results. With existence-restricted material this is not a hardening measure — it is the only design where the absence of a result is not itself an answer.",
      },
      {
        t: "Revision is a relation, not a property",
        d: "Which revision applies is a function of the document, the asking asset and the date. The system resolves all three or it declines. Answering with the global revision and a warning is the failure this design exists to prevent.",
      },
      {
        t: "Two authorities, joined explicitly",
        d: "The document system owns revision status; the management-of-change register owns deviations. Neither is authoritative alone. Where the join cannot be made, that is a stated outcome rather than a silent fallback to the simpler answer.",
      },
      {
        t: "Refusing is a designed outcome",
        d: "\"Cannot determine which revision applies to your asset\" is a first-class answer that gets someone to pick up the phone — which is what they do today anyway, and better than acting on a confident wrong answer.",
      },
      {
        t: "Retrieval before generation",
        d: "Phase 1 ships retrieval with citations and no composition at all. It delivers most of the value, proves the permission and revision layers under real load, and adds no fabrication surface while trust is being established.",
      },
      {
        t: "The document system stays the authority",
        d: "This index references controlled documents and never becomes a copy of them. Document control's veto is satisfied structurally rather than by assurance, because an assurance erodes and a reference does not.",
      },
    ],
    flowDiagram: {
      id: "question-to-applicable-answer",
      kind: "blocks",
      title: "From question to applicable answer",
      caption:
        "Three gates rather than one. Entitlement shapes the query itself; applicability joins two systems that have no existing link; citation constrains what may be said. Failing the second produces a refusal naming the asset, not a global answer with a warning attached.",
      nodes: [
        { id: "ask", t: "Question asked", sub: "engineer · asset · date", col: 0, row: 0 },
        { id: "scope", t: "Entitlement resolved", sub: "asset · agreement", col: 1, row: 0, accent: true },
        { id: "retrieve", t: "Retrieved in scope", sub: "filter inside the query", col: 2, row: 0 },
        { id: "apply", t: "Applicability resolved", sub: "revision for this asset", col: 3, row: 0, accent: true },
        { id: "refuse", t: "Refused, naming why", sub: "cannot determine", col: 1, row: 1 },
        { id: "cite", t: "Citations composed", sub: "document · revision · page", col: 3, row: 1, accent: true },
        { id: "answer", t: "Answer with source", sub: "and any deviation", col: 3, row: 2 },
        { id: "log", t: "Query recorded", sub: "identity · docs · revisions", col: 1, row: 2 },
      ],
      edges: [
        { from: "ask", to: "scope" },
        { from: "scope", to: "retrieve" },
        { from: "retrieve", to: "apply" },
        { from: "apply", to: "refuse", label: "no join", dashed: true },
        { from: "apply", to: "cite" },
        { from: "cite", to: "answer" },
        { from: "answer", to: "log" },
      ],
    },
  },

  architecture: {
    overview:
      "Permission-aware ingestion into an index carrying asset, agreement and revision metadata; query-time security filtering; applicability resolution against two source systems; citation-first composition.\n\nThe component that does not appear in a conventional retrieval design is the applicability resolver. It takes a candidate document, the asking engineer's asset and a date, and returns which revision governs — consulting the document system for revision status and the management-of-change register for open deviations. Neither source alone can answer, and the two have never been joined before, which means part of this programme is an integration nobody has previously had a reason to build.\n\nThe resolver has three outcomes rather than two: the global current revision applies; a deviation applies and here it is; or applicability cannot be determined. The third is a designed state that surfaces as a refusal, and defending it against the reasonable-sounding request to fall back to the global answer is the main political work of the build.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption:
          "The applicability layer is what distinguishes this from a permissioned RAG design. It joins two authorities that have no existing relationship.",
        rows: [
          {
            label: "Surfaces",
            nodes: [
              { t: "Teams app" },
              { t: "Web client" },
              { t: "Mobile", sub: "field use, citation-first" },
            ],
          },
          {
            label: "Query layer",
            nodes: [
              { t: "Query API", accent: true },
              { t: "Security filter", sub: "in the query", accent: true },
              { t: "Applicability resolver", sub: "asset · date", accent: true },
              { t: "Answer composer", sub: "citation-constrained" },
            ],
          },
          {
            label: "Retrieval",
            nodes: [
              { t: "Prose index", sub: "permission-tagged" },
              { t: "Table index", sub: "separate evaluation" },
              { t: "Cross-encoder reranker" },
            ],
          },
          {
            label: "Ingestion",
            nodes: [
              { t: "Source crawl", sub: "with ACLs" },
              { t: "Document Intelligence", sub: "layout · OCR · tables" },
              { t: "Structure-aware chunker" },
            ],
          },
          {
            label: "Authorities",
            nodes: [
              { t: "Document system", sub: "revision status" },
              { t: "Change register", sub: "open deviations", accent: true },
              { t: "Entra ID", sub: "asset scope claims" },
            ],
          },
          {
            label: "Governance",
            nodes: [
              { t: "Immutable audit log" },
              { t: "Evaluation harness", sub: "per document family" },
              { t: "Adversarial permission tests" },
            ],
          },
        ],
      },
      {
        id: "rag-pipeline",
        kind: "pipeline",
        title: "Retrieval pipeline with permission and applicability gates",
        caption:
          "Two gates distinguish this from a generic retrieval pipeline: permissions apply before retrieval rather than to its output, and applicability resolves before composition rather than being noted afterwards.",
        lanes: [
          {
            label: "Ingest",
            steps: [
              "Source crawl carrying permission metadata",
              "Layout, OCR and table extraction",
              "Structure-aware chunking",
              "Embedding and index write",
            ],
            note: "Permission metadata travels with every chunk. An untagged chunk is unusable by construction.",
          },
          {
            label: "Query",
            steps: [
              "Resolve caller identity and asset scope",
              "Build the security-filtered query",
              "Hybrid retrieval across prose and table indexes",
              "Rerank within scope",
            ],
            note: "Nothing is retrieved that the caller could not open directly, so result counts carry no information they should not.",
          },
          {
            label: "Applicability",
            steps: [
              "Resolve revision status for candidate documents",
              "Check the change register for open deviations on this asset",
              "Determine the governing revision for this asset and date",
            ],
            note: "Three outcomes: global current, a deviation applies, or cannot determine. The third refuses.",
          },
          {
            label: "Compose",
            steps: [
              "Drop passages from non-governing revisions",
              "Compose constrained to what the citations support",
              "Attach document, revision, page and any deviation",
            ],
            note: "Non-governing content is removed before generation rather than flagged after it.",
          },
        ],
      },
      {
        id: "auth-flow",
        kind: "sequence",
        title: "Authorisation and applicability resolution",
        caption:
          "Identity, revision and deviation are all resolved per request. None is cached in the index, because each can change without the documents changing.",
        actors: ["Engineer", "Teams app", "Query API", "Entra ID", "AI Search", "Document system", "Change register"],
        messages: [
          { from: 0, to: 1, t: "Asks a technical question" },
          { from: 1, to: 2, t: "Request with bearer token and asset context" },
          { from: 2, to: 3, t: "Validate token, read asset scope claims" },
          {
            from: 2,
            to: 4,
            t: "Retrieve with security filter",
            note: "The filter is part of the query, not a step after it",
          },
          { from: 2, to: 5, t: "Resolve revision status of candidates" },
          { from: 5, to: 2, t: "Current, superseded or not yet effective" },
          { from: 2, to: 6, t: "Any open deviation for this asset?" },
          { from: 6, to: 2, t: "Deviation, or none, or no record" },
          { from: 2, to: 1, t: "Cited answer, or a refusal naming the asset" },
          { from: 1, to: 0, t: "Answer with source link and applicable revision" },
        ],
      },
    ],
    layers: [
      {
        name: "Query layer",
        why: "Identity, applicability and citation constraints all converge here. Splitting them across services is how one of them gets skipped by a change nobody reviewed in that context.",
      },
      {
        name: "Applicability resolver",
        why: "The component that makes this design different. It joins the document system and the change register — two authorities with no existing relationship — and its third outcome, cannot determine, is the one that has to survive delivery pressure.",
      },
      {
        name: "Retrieval",
        why: "Two indexes, prose and tables, because they need different chunking and different accuracy measurement. Treating tables as prose loses the answer in the families where tables are the content.",
      },
      {
        name: "Ingestion",
        why: "Permission tagging happens here. A chunk without it cannot be retrieved by anyone, which makes the failure mode an absence rather than a leak.",
      },
      {
        name: "Governance",
        why: "The evaluation harness is a permanent component rather than a phase. Retrieval quality is regression-tested per document family, because a global figure hides the family that has degraded.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Retrieval security",
      choice: "Query-time security filters over a permission-tagged index",
      why: "The only model that survives existence-restricted documents. Filtering after retrieval has already leaked, and filtering after generation has leaked twice.",
      alt: "Single index with post-filtering — simpler, and it makes result counts a disclosure channel.",
    },
    {
      layer: "Revision applicability",
      choice: "Live resolution against the document system and the change register, keyed by asset and date",
      why: "Neither authority can answer alone. Caching either creates precisely the failure the client fears most, and the deviation register changes without any document changing.",
      alt: "Nightly revision sync with a deviations banner — much cheaper, and wrong for the assets where being wrong costs most.",
    },
    {
      layer: "Unresolvable applicability",
      choice: "Refuse, naming the asset and the document",
      why: "A refusal sends an engineer to the phone, which is what they do today. A confident global answer sends them to work with the wrong procedure.",
      alt: "Answer globally with a warning — better-looking metrics, and the warning is filtered out after the second week.",
    },
    {
      layer: "Table content",
      choice: "Separate table-extraction path with its own index and evaluation",
      why: "In this corpus tables are the content. Inspection reports and vendor manuals carry almost everything of value in them.",
      alt: "Prose-only extraction — far faster to build, and it misses the highest-value questions entirely.",
    },
    {
      layer: "Answer format",
      choice: "Citation-first, short, with a page pointer and the governing revision",
      why: "Matches how engineers verify and how field users read on a phone with gloves on. The citation is the answer; the prose is a convenience.",
      alt: "Conversational answers — friendlier, slower to verify, and they invite the authority framing the design refuses.",
    },
    {
      layer: "Phase-1 scope",
      choice: "Retrieval with citations and no generation",
      why: "Delivers most of the value with none of the fabrication surface, and proves the permission and applicability layers in production before anything is composed on top.",
      alt: "Ship generation from the start — a better demonstration, and it puts two unproven mechanisms in front of a safety-critical audience simultaneously.",
    },
  ],

  security: {
    posture:
      "The permission model is not a feature of the assistant. It is a property of retrieval, and the distinction is the whole design: nothing enters a prompt that the caller could not open directly in the document system.\n\nExistence-restricted material is what forces this and is worth stating precisely, because it is the requirement most often waved through. For some joint-venture documents, the fact that a document exists is itself restricted. That means a shortened result list, a changed relevance distribution or a different latency is a disclosure channel — and no filter applied to an answer can close a channel that opened during retrieval. The observable behaviour has to be identical whether or not a restricted document matched.\n\nThe second property is that permissions change without documents changing. Somebody moves asset, an agreement ends, a role is revoked. The index has to learn about that as an event rather than on a schedule, because the window between the change and the reindex is a window in which the system is wrong in the direction that matters.",
    controls: [
      {
        t: "Query-time security filtering",
        d: "Asset and agreement scope resolved from directory claims and applied to the retrieval query itself, so a restricted document is never a candidate at any stage of the pipeline.",
      },
      {
        t: "Permission-tagged chunks",
        d: "Every chunk carries its source access metadata. Re-permissioning triggers reindexing of the affected chunks as an event rather than a nightly job.",
      },
      {
        t: "Indistinguishable observables",
        d: "Result counts, score distributions and latency are the same whether or not a restricted document matched. Absence must not be informative, which is a stronger requirement than absence being enforced.",
      },
      {
        t: "Adversarial permission tests as a build gate",
        d: "A build fails if any test identity can retrieve, or detect, out-of-scope content. A permission regression here is a contractual breach rather than a defect to prioritise.",
      },
      {
        t: "Applicability recorded with every answer",
        d: "The governing revision and the basis for it are stored with the query record, so an answer given nine months ago can be reconstructed exactly during an investigation.",
      },
      {
        t: "Full audit trail",
        d: "Query, retrieved document identifiers, revisions, deviation references and caller identity written immutably. This is the artefact an incident investigation will ask for.",
      },
      {
        t: "Tenant-bound processing",
        d: "No document content leaves the tenant and none is used for model training, which is a contractual requirement in several of the joint ventures rather than a preference.",
      },
    ],
  },

  scalability: {
    body:
      "Query volume is not the problem. A technical function asking a few thousand questions a week is a trivial load, and designing for throughput would be effort spent where nothing is threatened.\n\nThe thing that scales badly is corpus onboarding. Each new asset arrives with its own document families, its own permission structure, its own scan quality and its own local conventions — and onboarding is where the quality of every subsequent answer is determined. Done as a bespoke project each time, it becomes the permanent cost of the programme and the reason it stalls after the third asset.\n\nThe second and less visible scaling dimension is permission churn. People change asset, agreements start and end, and each change invalidates chunks in the index. On a large estate that is a continuous trickle of reindexing work rather than an occasional event, and a design that handles it as a scheduled job has a permanent window of being wrong in the least acceptable direction.",
    levers: [
      {
        t: "Per-asset onboarding runbook with a quality gate",
        d: "Onboarding is a repeatable process ending in a measured retrieval quality threshold, not a bespoke project. An asset that does not pass its gate is not enabled.",
      },
      {
        t: "Independent worker pools",
        d: "OCR, table extraction and embedding scale separately because their cost and time profiles are entirely different, and one should not queue behind another.",
      },
      {
        t: "Event-driven reindexing on permission change",
        d: "Access changes reach the index as events. A scheduled reconciliation runs behind it as a safety net rather than as the mechanism.",
      },
      {
        t: "Incremental reprocessing",
        d: "Only affected chunks are reprocessed on document or permission change, so a large estate does not force full re-embedding campaigns.",
      },
      {
        t: "Identity-scoped caching",
        d: "Repeated questions within one permission scope are served from cache. The cache key must include the scope, or the cache becomes the leak the retrieval design prevented.",
      },
    ],
  },

  costOptimization: {
    body:
      "Steady-state query cost is small and the real spend is ingestion of a large, partly scanned back catalogue. Working the numbers through matters here because the intuition is wrong in both directions.\n\nDocument processing dominates and it is priced per page rather than per token. Across eleven priority families, an assumed 400,000 pages of which roughly 30% needs the higher-accuracy scanned path, the layout and OCR pass lands somewhere around €25,000 to €35,000 — and the range is entirely driven by that scanned share, which is why measuring it is a phase-0 deliverable rather than an estimate.\n\nEmbedding is comparatively trivial: 400,000 pages at an assumed 500 tokens a page is 200 million tokens, at an assumed €0.10 per million, around €20. Generation costs nothing in phase 1 because there is no generation. In phase 2, at an assumed few thousand questions a week with retrieved context, the monthly figure is in the low hundreds of euros.\n\nSo the shape is a one-time cost in the low tens of thousands and a running cost in the hundreds per month, against an engineering function whose lookup time this is meant to reduce from forty-five minutes to three. The economics are not close, and the risk to the business case is not cost — it is whether the applicability layer can be built at all.",
    levers: [
      {
        n: "01",
        t: "Retrieval-only phase 1",
        d: "The first release carries no generation cost whatsoever, while delivering most of the measurable value.",
      },
      {
        n: "02",
        t: "Document processing only where needed",
        d: "The 70% with a native text layer skips the expensive path entirely, which removes most of the dominant cost line.",
      },
      {
        n: "03",
        t: "Cheap model for query rewriting",
        d: "The capable model is reserved for composition, and composition only exists from phase 2.",
      },
      {
        n: "04",
        t: "Identity-scoped caching",
        d: "Repeat questions inside a permission scope avoid both retrieval and generation — with the scope in the cache key, always.",
      },
      {
        n: "05",
        t: "Reindex on change, not on schedule",
        d: "Avoids full re-embedding campaigns, and is also what closes the permission-staleness window.",
      },
    ],
    model: [
      { k: "Priority document families", v: "11" },
      { k: "Pages in scope, assumed", v: "~400,000" },
      { k: "Share needing the scanned path, assumed", v: "~30% — the figure driving the whole range" },
      { k: "Layout, OCR and table extraction", v: "€25,000–35,000 one-time, priced per page" },
      { k: "Embedding", v: "~200m tokens at an assumed €0.10/m — about €20" },
      { k: "Phase-1 generation cost", v: "€0 — there is no generation" },
      { k: "Phase-2 generation, assumed", v: "Low hundreds of euros a month" },
      { k: "Reindexing on permission change", v: "Continuous and small; a rounding error against ingestion" },
      { k: "What the programme is actually spending", v: "Engineering time on the applicability integration, not model or processing cost" },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "Superseded revision presented as current",
      severity: "Critical",
      consequence: "Safety-relevant misinformation acted on in the field",
      mitigation:
        "Live revision resolution before composition; non-governing passages dropped rather than flagged, and the revision stated explicitly in every answer.",
    },
    {
      n: "02",
      risk: "Global revision returned for an asset with an open deviation",
      severity: "Critical",
      consequence:
        "The standard answer given to the one facility where it does not apply — concentrated on older, higher-risk assets",
      mitigation:
        "Applicability resolved per asset and date against the change register. Where the join fails the system refuses rather than falling back to the global answer.",
    },
    {
      n: "03",
      risk: "Permission leakage across joint-venture boundaries",
      severity: "Critical",
      consequence: "Contractual breach rather than an internal incident",
      mitigation:
        "Query-time filtering, permission-tagged chunks, event-driven reindexing on access change, and adversarial tests that fail the build.",
    },
    {
      n: "04",
      risk: "Existence disclosure through result counts or timing",
      severity: "High",
      consequence: "A caller learns that restricted material exists without ever seeing it",
      mitigation:
        "Observables held identical regardless of restricted matches. Tested explicitly, because this leak is invisible to every functional test that would otherwise be written.",
    },
    {
      n: "05",
      risk: "The change register is not queryable",
      severity: "High",
      consequence: "The applicability layer cannot be built and the design reduces to the option it rejected",
      mitigation:
        "Established in phase 0 before anything is designed around it. If the register is a spreadsheet, making it a system is the first deliverable and the programme is re-scoped around that.",
    },
    {
      n: "06",
      risk: "Refusals are perceived as the system being broken",
      severity: "Medium",
      consequence: "Adoption damage, and pressure to fall back to a global answer with a warning",
      mitigation:
        "Refusals name the asset and the document and say what to do next. Refusal rate is a reported KPI so the pressure is answered with a number rather than an anecdote.",
    },
    {
      n: "07",
      risk: "Field adoption fails because it is slower than a phone call",
      severity: "Medium",
      consequence: "The system is used by desk engineers only, halving the benefit",
      mitigation:
        "Citation-first short answers, page pointers, and latency measured on a phone on site rather than on a laptop at a desk.",
    },
  ],

  kpis: [
    {
      category: "Safety",
      kpi: "Answers citing a non-governing revision",
      baseline: "n/a",
      target: "0",
      why: "The guarantee everything else exists to support. One instance ends trust permanently, so this is reported as a count and never as a rate.",
    },
    {
      category: "Safety",
      kpi: "Answers given for assets with an unresolved deviation status",
      baseline: "n/a",
      target: "0",
      why: "The failure the applicability layer prevents. A non-zero reading means the refusal path was bypassed.",
    },
    {
      category: "Security",
      kpi: "Cross-scope retrievals in adversarial testing",
      baseline: "n/a",
      target: "0, as a build gate",
      why: "A contractual exposure rather than a defect. It blocks release the way a failing type check does.",
    },
    {
      category: "Coverage",
      kpi: "Questions answerable within the asking engineer's scope",
      baseline: "n/a",
      target: "> 80%",
      why: "Measures whether the permission model is workable in practice rather than only correct.",
    },
    {
      category: "Health",
      kpi: "Refusal rate, and its reason distribution",
      baseline: "n/a",
      target: "< 10% and stable",
      why: "Refusals are designed, so the number is expected to be non-zero. A rising trend means a source system is degrading, not that the design is wrong.",
    },
    {
      category: "Quality",
      kpi: "Retrieval precision per document family",
      baseline: "n/a",
      target: "> 0.85",
      why: "Measured per family because a global figure hides the family that has degraded — usually the scanned one.",
    },
    {
      category: "Efficiency",
      kpi: "Median technical lookup time",
      baseline: "~45 minutes",
      target: "< 3 minutes",
      why: "The number that funds the programme.",
    },
    {
      category: "Adoption",
      kpi: "Share of queries from field rather than desk users",
      baseline: "0%",
      target: "> 30%",
      why: "The field is where the design constraints came from. Desk-only usage means the interface failed the people it was shaped around.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Corpus and authority survey",
      duration: "5 weeks",
      goal: "Establish what the documents and the source systems will actually support, before designing around either.",
      activities: [
        "Scan quality and text-layer measurement across the eleven families",
        "Permission metadata completeness audit, including existence-restricted material",
        "Change register assessed for programmatic access — the assumption the design rests on",
      ],
      deliverables: ["Corpus quality report", "Permission model findings", "Applicability feasibility finding", "Evaluation set design"],
    },
    {
      phase: "P1",
      name: "Permissioned retrieval",
      duration: "10 weeks",
      goal: "Ship retrieval with citations and no generation, proving the permission and applicability layers in production.",
      activities: [
        "Permission-aware ingestion with tagged chunks",
        "Query-time security filtering and adversarial test suite",
        "Applicability resolver joining both authorities",
      ],
      deliverables: ["Retrieval with citations", "Adversarial permission gate in CI", "Applicability resolver with refusal path"],
    },
    {
      phase: "P2",
      name: "Tables and drawings",
      duration: "8 weeks",
      goal: "Make the content that lives in tables searchable, which is where the highest-value questions are.",
      activities: [
        "Separate table extraction path and index",
        "Per-family evaluation and quality gates",
        "Field interface with page pointers, tested on site",
      ],
      deliverables: ["Table index", "Per-family accuracy report", "Field-tested mobile surface"],
    },
    {
      phase: "P3",
      name: "Composition",
      duration: "6 weeks",
      goal: "Add generation as a thin, citation-constrained layer over a retrieval product that already works.",
      activities: [
        "Citation-constrained answer composition",
        "Refusal messaging and reason reporting",
        "Audit records capturing governing revision and basis",
      ],
      deliverables: ["Composed answers with citations", "Refusal reporting", "Investigation-ready audit trail"],
    },
  ],

  tailoring: [
    {
      parameter: "Whether revision applicability varies by asset",
      hereValue: "Yes — around 12% of assets carry an open deviation at any time",
      altValue: "One revision is current everywhere, with no local exceptions",
      architectureChange:
        "The applicability resolver, the second authority integration and the refusal path all disappear. Revision resolution becomes a single lookup against the document system and the design collapses into conventional permissioned retrieval.",
      why: "This is the parameter the note is built on, and the one most likely to differ elsewhere. Most retrieval writing assumes this alternative value implicitly and is right to for estates where it holds — establishing which estate you have is a phase-0 question rather than an implementation detail.",
    },
    {
      parameter: "How permissions can be read",
      hereValue: "Live, per user, at query time",
      altValue: "Only as a nightly export from the document system",
      architectureChange:
        "Query-time filtering becomes impossible. Either accept a staleness window and state it plainly, or restrict the corpus to a single permission tier everyone using the system already holds.",
      why: "The central claim is that permissions live inside retrieval. Take away live entitlements and the claim cannot be made — a permission check a day out of date is not a check, it is a report.",
    },
    {
      parameter: "Whether any material is existence-restricted",
      hereValue: "Yes — some joint-venture documents' existence is itself confidential",
      altValue: "Restrictions cover contents only",
      architectureChange:
        "Post-retrieval filtering becomes defensible, and with it a much simpler ingestion path and a single index. The indistinguishable-observables requirement disappears entirely.",
      why: "Existence restriction is what turns a leak risk into a side-channel problem. Without it, most of the security complexity here is unnecessary — and this is the requirement most often waved through in discovery because it sounds like a detail.",
    },
    {
      parameter: "Safety criticality of the questions",
      hereValue: "High — answers bear on wells, pipelines and live operations",
      altValue: "General office and process knowledge",
      architectureChange:
        "The accuracy bar drops, composition can be freer, and refusing on low confidence stops being necessary. Most of the assurance machinery here is unnecessary at that risk level.",
      why: "Nearly every expensive property in this note is bought to prevent one class of harm. Remove the harm and you are paying for reassurance.",
    },
    {
      parameter: "Corpus homogeneity",
      hereValue: "Heterogeneous — reports, drawings, spreadsheets, scanned historical records",
      altValue: "Uniform, born-digital text documents",
      architectureChange:
        "Layout parsing, the separate table path and human triage all drop out of ingestion, retrieval quality rises, and the largest one-time cost line disappears.",
      why: "Retrieval quality in technical estates is usually limited by how well documents were read rather than by the retrieval method. A uniform corpus removes a ceiling no amount of reranking can lift.",
    },
    {
      parameter: "How easy it is to ask a colleague instead",
      hereValue: "Very — asking is fast, socially cheap and comes with accountability",
      altValue: "Distributed teams across time zones, or heavy loss of experienced staff",
      architectureChange:
        "Nothing in the architecture changes, but the adoption case does — and it is the adoption case, not the architecture, that decides whether this is worth building.",
      why: "The real competitor is not another tool. It is a colleague who answers in two minutes and is accountable for the answer. Where that colleague is asleep or has retired, a system that cites its source finally has something to beat.",
    },
  ],

  counterpart: {
    slug: "ai-contract-intelligence",
    note: "The other note built around never answering without a source, where the hard part sits elsewhere: there the citation has to prove a clause is the whole of what was agreed, here it has to prove the document is the one that governs this asset today. Same principle, almost no shared machinery — and in both cases the naive design is correct for the standard case and wrong for the exceptional one.",
  },

  assumptionsToTest: [
    "That the management-of-change register is queryable programmatically is the assumption the whole applicability design rests on, and in my experience these registers are frequently spreadsheets maintained by one person. If it cannot be queried, this design is not buildable as described and the honest answer is to say so in week three rather than month five.",
    "The 12% deviation figure is chosen rather than measured. Below a few per cent the applicability layer is over-engineering; above twenty it is the entire product.",
    "Whether live revision resolution stays genuinely live against a document system never designed to be queried this way. If it lags, the system cites superseded revisions confidently, which is worse than returning nothing.",
    "Permission drift is only partly addressed. Event-driven reindexing narrows the window; it does not close it, and I have not proposed anything that would catch a grant that was never revoked.",
    "That engineers will use a system rather than ask a colleague is the weakest assumption here. Asking is fast, socially cheap and carries accountability, and I have no evidence about what would displace it.",
    "This case is closest to my own working experience, which makes me more confident than the evidence in front of me justifies. Worth stating plainly, because it is the kind of bias that does not announce itself — and it is why this list is longer than the others on this site.",
  ],

  lessonsLearned: [
    "The question that changed the design was not about accuracy or permissions. It was whether the current revision is always the applicable one, and the pause before the answer was more informative than the answer.",
    "Two authorities with no existing join is an integration problem disguised as a retrieval problem, and it is where most of the engineering effort actually goes.",
    "A banner is not a control. Anything that relies on the reader noticing it has been read once and filtered out by the second week.",
    "Designing the refusal state early made it defensible later. Added under delivery pressure it would have been argued away as a regression.",
    "Shipping retrieval before generation was the decision that made the safety conversation possible at all — it separated two unproven mechanisms that would otherwise have been evaluated together.",
  ],

  futureImprovements: [
    "Surface deviations proactively to the assets they apply to, rather than only in response to a question.",
    "Capture retiring engineers' knowledge into a reviewed, cited corpus — the highest-value item here and the one most likely to be done badly.",
    "Extend applicability reasoning to future dates, so a shutdown can be planned against the revision that will govern rather than the one that does.",
    "Close the permission-drift window with periodic entitlement reconciliation rather than relying on change events alone.",
  ],
};

export default caseStudy;
