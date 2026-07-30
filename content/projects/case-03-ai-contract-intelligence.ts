import type { CaseStudy } from "../types";

/**
 * Case study 03 — AI contract intelligence.
 *
 * The lesson this note owns is provenance, and specifically its limit. A
 * citation proves that a quoted span exists at a stated location. It proves
 * nothing about whether the reading built on it is correct — and in a contract
 * estate those come apart constantly, because a liability cap in one clause can
 * be qualified by a carve-out in another, an amendment signed years later and a
 * definition in a schedule.
 *
 * So the architecture has two obligations that are usually conflated: establish
 * the text, and separately establish that the text is the whole of the text.
 * Everything expensive in this design lives in the second one.
 *
 * Constructed scenario. Figures are assumptions chosen so the constraints bind,
 * and the sections that lean on them say so.
 */
const caseStudy: CaseStudy = {
  slug: "ai-contract-intelligence",
  order: 3,
  title: "AI Contract Intelligence",
  subtitle:
    "Making 14,000 supplier agreements answerable, under the legal reality that a perfectly cited answer can still be the wrong one.",
  industry: "Legal · Procurement",
  domain: "Contract lifecycle · Obligation management",
  status: "Architecture note",
  statusNote:
    "Discovery and analysis complete. The amendment-chain coverage figure and the cross-lingual clause equivalence assumption are the two things I would measure before designing anything further.",
  architectureComplexity: 4,
  complexityLabel: "High — legal accuracy bar, amendment chains, multilingual corpus, clause-level provenance",
  duration: "Reference programme: 7 months",
  role: "Solution Architect (case study author)",
  client: "Industrial group procurement function",
  clientNote: "€1.2bn annual spend",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: true,
  shortSummary:
    "Clause-level extraction and obligation tracking across a multilingual contract estate. The centre of gravity is not extraction accuracy but the distance between two claims a system can make: that a quoted clause exists, and that it says what the answer depends on it saying. The first is deterministic and cheap. The second is where the design spends its money.",
  impact:
    "Target: portfolio liability question 3 days → 2 hours · 100% of asserted terms citation-linked · zero answers from an incomplete agreement",
  tags: ["Document AI", "Clause extraction", "Provenance", "Multilingual", "Human review"],

  techGroups: [
    {
      group: "AI",
      items: ["Azure OpenAI", "Azure Document Intelligence", "Hybrid search", "Cross-encoder reranking"],
    },
    {
      group: "Backend",
      items: ["Python", "FastAPI", "Celery", "Service Bus"],
    },
    {
      group: "Data",
      items: ["PostgreSQL", "pgvector", "Blob Storage", "Redis"],
    },
    {
      group: "Governance",
      items: ["Entra ID", "Row-level security by entity", "Immutable audit log", "Legal review workflow"],
    },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario, used to reason through a class of problem rather than to report an engagement. The figures are assumptions chosen to make the constraints bind; where a number carries architectural weight, the section that uses it shows the derivation and says what changes if it is wrong.\n\nScenario: an industrial group's procurement function, roughly €1.2bn of annual spend across about 14,000 active supplier agreements in four languages, accumulated over two decades across SharePoint, a legacy document system and — for older assets — scanned paper. The trigger was a supplier dispute in which the group discovered a liability clause nobody had reviewed since signature. The board asked what else was in there. Nobody could answer, and the honest estimate for finding out by hand was several weeks of external counsel.\n\nThe obvious response is a chat interface over the archive, and discovery rejected it quickly: Legal will not act on an answer it cannot verify. That much is well understood, and it leads most designs to the same place — attach a citation to everything.\n\nThe position this note arrives at is that the citation is necessary and is not the hard part. Verifying that a quoted span exists at a stated location is deterministic and nearly free. What it does not establish is whether that clause is still in force, whether another clause qualifies it, or whether a definition elsewhere changes what its words mean. A system can cite perfectly and mislead completely — and the citation makes the misleading answer more credible, not less, because it looks checked.\n\nSo the architecture is organised around a distinction most contract tooling blurs: proving the text, and proving the reading. The first is a verifier. The second is a data model — one whose unit is the agreement rather than the document, and which refuses to answer at all when the agreement is not demonstrably complete.",
    verdict:
      "Provenance proves the text, not the reading — and everything expensive in this system lives in the gap between them.",
    highlights: [
      { k: "Business driver", v: "Renewal and liability exposure invisible at portfolio level" },
      { k: "Hard constraint", v: "No asserted term without a clause-level citation" },
      { k: "The trap", v: "A perfect citation attached to a superseded clause" },
      { k: "Rejected option", v: "Chat over raw documents" },
      {
        k: "What would break it",
        v: "An estate small enough for one person to read once — below a few thousand agreements none of this pays for itself",
      },
    ],
  },

  businessContext: {
    narrative:
      "The estate accumulated rather than being designed. Two decades of agreements, four languages, three storage locations, and a filename convention that stopped being followed in 2019. Many of the people who negotiated these contracts have left; institutional memory went with them, which is why the archive is the only remaining record of what was agreed.\n\nThe number that carries the most architectural weight here is not the 14,000. It is that the median agreement has been amended, and a meaningful minority carry side letters filed separately from the base document. In this scenario I have assumed roughly 2.4 amendments per active agreement and side letters on about 30% — figures I chose because they change the design, and which would be the first thing measured in a real programme.\n\nThat single fact is what separates this from a document-search problem. If the average agreement were one document, extraction accuracy would be the whole game. Because it is not, an extraction can be individually correct and collectively wrong, and no amount of accuracy on any single document fixes it.",
    companyFacts: [
      { k: "Active agreements", v: "~14,000" },
      { k: "Documents in the estate", v: "~48,000 — base agreements, amendments, annexes, side letters" },
      { k: "Amendments per agreement, assumed", v: "~2.4 median" },
      { k: "Agreements with side letters, assumed", v: "~30%" },
      { k: "Languages", v: "4 — Italian, English, French, German" },
      { k: "Scanned share of corpus", v: "~18%, quality uneven" },
      { k: "Annual spend covered", v: "€1.2bn" },
      { k: "Phase-1 budget", v: "€220,000" },
    ],
    drivers: [
      "Portfolio-level liability and renewal exposure is unknown, and the board has now asked.",
      "Manual review campaigns cost weeks of external counsel time and go stale immediately.",
      "Auto-renewals pass unnoticed, extending commitments nobody re-evaluated.",
      "Price indexation clauses exist and have never been exercised, which is money left on the table every year.",
    ],
    constraints: [
      "Legal will not accept an asserted term without a citation to the clause it came from.",
      "Documents in four languages, with clause equivalence that is legal rather than lexical.",
      "Roughly 18% of the corpus is scanned, some of it badly.",
      "Access must be segmented by legal entity — several entities have partners who may not see each other's terms.",
      "The document system remains the authority; this cannot become a second master copy.",
      "Phase-1 budget €220,000.",
    ],
    existingStack: ["SharePoint", "Legacy DMS", "SAP Ariba", "Power BI", "Azure", "Personal spreadsheets"],
  },

  stakeholders: [
    {
      role: "General Counsel",
      interest: "Reliable portfolio visibility without a review campaign.",
      concern: "A system producing plausible but wrong legal readings, dressed in citations.",
      influence: "Veto power",
    },
    {
      role: "Chief Procurement Officer",
      interest: "A renewal calendar and negotiation leverage.",
      concern: "Another repository nobody maintains, diverging from the document system within a year.",
      influence: "Sponsor",
    },
    {
      role: "Legal operations",
      interest: "Less manual review, and a way to find things.",
      concern: "Becoming reviewers of machine output at the same total workload.",
      influence: "Operational owner",
    },
    {
      role: "Contract managers",
      interest: "Not being asked the same questions repeatedly.",
      concern: "A system that does not know about the side letter they negotiated and filed elsewhere.",
      influence: "Knows where the truth actually is",
    },
    {
      role: "Data protection officer",
      interest: "Lawful processing of documents full of personal data nobody thinks of as personal data.",
      concern: "Signature blocks, annexed staff lists and contact schedules reaching embeddings and prompts.",
      influence: "Compliance gate",
    },
    {
      role: "IT architecture",
      interest: "Fits the existing Azure estate and does not add an operations burden.",
      concern: "A second document repository, and a vector store somebody has to run.",
      influence: "Architecture gate",
    },
  ],

  discovery: {
    intro:
      "The decisive discovery question was not about accuracy targets. It was: what will you actually do with an extracted clause? The answer reshaped the deliverable. A second question — what makes an agreement complete — reshaped the data model, and it was the one nobody had thought to ask.",
    groups: [
      {
        audience: "General Counsel",
        goal: "Establish the evidentiary standard the output has to meet.",
        questions: [
          "If the system flags an uncapped liability clause, what is your next action?",
          "What would make you distrust the whole system permanently?",
          "Is a summary ever acceptable, or only the clause verbatim with a citation?",
          "Which clause types matter enough to be wrong about?",
          "If we show a clause correctly but miss the amendment that changed it, whose failure is that?",
        ],
        answers: [
          "Any flag is followed by reading the clause in situ — the link matters more than the summary.",
          "One fabricated citation would end adoption permanently.",
          "Twelve clause types carry real risk; the rest is nice to have.",
          "A correct quotation of a superseded clause is worse than no answer, because it will be relied on.",
        ],
      },
      {
        audience: "Legal operations",
        goal: "Understand the current process well enough not to automate its worst parts.",
        questions: [
          "How do you find a contract today?",
          "Where do the scanned documents cause the most pain?",
          "What does your review checklist look like?",
          "How do you track obligations after signature?",
          "When you review a contract, what do you open besides the contract?",
        ],
        answers: [
          "Search is by a filename convention that broke in 2019.",
          "Obligations are tracked in three personal spreadsheets, none of which agree.",
          "Reviewing an agreement means opening the base document, then hunting for amendments by counterparty name.",
        ],
      },
      {
        audience: "Contract managers",
        goal: "Find out where the agreed position actually lives, as opposed to where it is filed.",
        questions: [
          "Walk me through the last agreement you renegotiated. Where did each change end up?",
          "How often is the operative term somewhere other than the base agreement?",
          "Is there anything agreed that is not in any signed document?",
          "How would you know whether you have the complete picture for a supplier?",
        ],
        answers: [
          "Most active suppliers have at least one amendment; several have four or five.",
          "Side letters exist, are signed, and are filed by whoever negotiated them — sometimes only in email.",
          "Nobody could describe a reliable way to confirm they had every document for a given supplier.",
        ],
      },
      {
        audience: "Chief Procurement Officer and IT architecture",
        goal: "Separate the quick win from the hard problem.",
        questions: [
          "Which single report would change a negotiation tomorrow?",
          "Must this live inside the document system, or alongside it?",
          "What metadata already exists and can be trusted?",
          "What happens to this system when the team that built it moves on?",
        ],
        answers: [
          "A renewal and indexation calendar is worth more immediately than clause search.",
          "Entity and counterparty metadata is reliable; clause-level data does not exist anywhere.",
          "There is no appetite to operate a vector database as a separate service.",
        ],
      },
      {
        audience: "Data protection officer",
        goal: "Establish what in a commercial document is nonetheless personal data.",
        questions: [
          "What personal data appears in these agreements?",
          "May contract text be sent to a model, and under what basis?",
          "What happens if a named individual in a signature block exercises their rights?",
          "Are there documents that may not be processed at all?",
        ],
        answers: [
          "Signature blocks, named contacts, annexed staff schedules and occasionally salary bands.",
          "Processing is lawful for contract administration, but minimisation is expected rather than optional.",
          "Erasure of a signature block is not possible — the document is a record — but derived copies are a different question.",
        ],
      },
      {
        audience: "Corpus survey",
        goal: "Find out what the documents will actually support before designing around them.",
        questions: [
          "How many documents have a usable text layer?",
          "How are amendments linked to their base agreement today, if at all?",
          "Do clause numbering conventions survive across languages and decades?",
          "How many documents are duplicates or superseded drafts?",
        ],
        answers: [
          "About 82% have native text; the rest need OCR and some of that will fail.",
          "Amendments are linked by nothing structural — only by counterparty name in a filename.",
          "Clause numbering is inconsistent even within a single supplier relationship.",
        ],
      },
    ],
    assumptions: [
      "Twelve priority clause types cover the material risk. The taxonomy is a phase-0 deliverable agreed with Legal rather than something an architect decides.",
      "Amendment chains can be reconstructed for the large majority of agreements from counterparty, date and reference text — this is the assumption I would test first.",
      "Scan quality supports OCR on most of the corpus, with a manual queue for the remainder.",
      "Legal will staff a review workflow for two quarters to build the evaluation set. Without that, none of the accuracy claims here can be made at all.",
      "Entity-level access segmentation is derivable from existing metadata.",
    ],
    implications: [
      {
        finding: "Every flag is followed by reading the source clause",
        implication:
          "Provenance is the primary feature and it belongs in ingestion, not in the interface. Retrieval must return document coordinates — file, revision, page, paragraph — rather than text alone.",
      },
      {
        finding: "A correct quotation of a superseded clause is worse than no answer",
        implication:
          "The unit of truth is the agreement, not the document. The system needs a defensible notion of what the complete agreement is before it may assert anything about a clause inside it.",
      },
      {
        finding: "Amendments are linked by nothing structural",
        implication:
          "Chain reconstruction becomes a first-class pipeline stage with its own accuracy measure, not a metadata cleanup task. Where the chain cannot be established with confidence, the agreement is marked incomplete and questions about it are refused rather than answered partially.",
      },
      {
        finding: "Obligations live in three disagreeing spreadsheets",
        implication:
          "The deliverable is a structured obligation store with owners and dates, not a search box. The chat surface is the last thing built and the least important.",
      },
      {
        finding: "One fabricated citation ends adoption",
        implication:
          "A deterministic citation check runs before display: the quoted span must exist at the cited coordinates or the answer is suppressed entirely, not softened with a hedge.",
      },
      {
        finding: "The renewal calendar is the immediate win and needs no extraction",
        implication:
          "Sequence deterministic metadata value into phase 1, entirely independent of extraction accuracy. It buys the trust the generative layer will need and it de-risks the business case.",
      },
      {
        finding: "Nobody will operate a separate vector service",
        implication:
          "Embeddings live beside the obligation tables in one database. At this corpus size that costs nothing in capability and removes an operational burden the organisation has said it will not carry.",
      },
    ],
    businessRisks: [
      "Legal disengagement after a single visible error, which is unrecoverable rather than a setback",
      "Extraction quality varying by language, producing a jurisdictional blind spot nobody detects",
      "The store becoming a parallel truth that diverges from the document system",
      "Review workload transferring to Legal rather than reducing, which removes the business case",
    ],
    technicalConstraints: [
      "Mixed-quality scans require an OCR fallback with human triage",
      "Clause boundaries do not align with token windows — chunking must follow document structure",
      "Multilingual embedding quality differs by language and must be measured per language",
      "Amendment chains have no structural link in the source systems and must be inferred",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes for finding and typing clauses. No for deciding what they mean.",
      body:
        "Locating an indemnity provision phrased three ways across four languages and two decades of drafting styles is not tractable with rules — there is no pattern to write, and the vocabulary shifts by jurisdiction and by the firm that drafted it. That is genuinely a language problem and it is what the model is for.\n\nDeciding what a clause means for the group's risk position is a lawyer's job, and the architecture should refuse to blur that line rather than quietly blurring it. The distinction has a concrete design consequence: the system may assert that a clause of type X exists at location Y, and may not assert that the group's liability is capped at a figure. The first is an extraction claim with a citation behind it. The second is a legal conclusion, and nothing in this system is entitled to reach one.",
    },
    automationAlternative: {
      verdict: "Rules carry the metadata layer entirely, and none of the clause layer",
      canAutomate: [
        "Renewal-date arithmetic and calendar alerts",
        "Entity and counterparty resolution",
        "Document classification by contract family",
        "Duplicate and superseded-draft detection",
        "Flagging agreements whose amendment chain looks incomplete",
      ],
      cannotAutomate: [
        "Identifying an indemnity clause phrased three ways in three languages",
        "Distinguishing a liability cap from a carve-out to that cap",
        "Resolving a defined term whose definition sits in an annex to an amendment",
      ],
      body:
        "Splitting these deliberately is what lets the renewal-calendar value — the thing the sponsor cares about most — ship in phase 1 without depending on extraction accuracy at all. It also means that if extraction turns out to be worse than hoped, the programme has already delivered something rather than nothing, which is a materially different conversation to have in month four.",
    },
    valueAreas: [
      "A structured obligation store that portfolio questions can be answered from with ordinary queries",
      "Renewal and indexation calendar, deterministic and independent of any model",
      "Portfolio risk queries with clause-level citations and an explicit completeness state",
      "Deviation detection against the group's standard templates",
    ],
    outOfScope: [
      "Legal advice, or risk scores presented as conclusions",
      "Automated contract drafting or redlining",
      "Negotiation recommendations",
      "Any assertion about an agreement whose amendment chain could not be established",
    ],
    conclusion:
      "Scope was reframed from \"a chat interface over the contract archive\" to \"a structured obligation store with an explicit completeness guarantee, and a query surface constrained to cite from it\". The sequencing follows from that: verifiable structured value lands before any generative feature reaches Legal, which is also the order that earns the trust the generative layer will need.",
  },

  alternatives: [
    {
      option: "General retrieval over the contract PDFs",
      verdict: "Set aside",
      caseFor:
        "Quick to stand up, and for exploratory questions across a large estate it is genuinely useful from the first week. It also degrades gracefully — a poor answer is a poor answer rather than a wrong record, because nothing is being written down.",
      caseAgainst:
        "It answers questions and cannot hold obligations. The moment anyone asks which commitments fall due next quarter, a chat surface over documents has no structure to answer from, and retrofitting one later is a rebuild rather than an addition. It also has no place to record that an agreement is incomplete, so it will answer confidently from a base agreement whose amendment it never saw.",
    },
    {
      option: "Extract from base agreements only, and treat amendments as a later phase",
      verdict: "Set aside, and this is the one I would expect to be argued for",
      caseFor:
        "It is what most tooling does, and the pragmatic case is strong. Amendments are a minority of documents, chain reconstruction is genuinely hard and has no structural support in the source systems, and shipping extraction over base agreements gets something useful into Legal's hands months earlier. Perfect is the enemy of good.",
      caseAgainst:
        "The amended clauses are disproportionately the ones anybody cares about. Nobody renegotiates a notice provision; they renegotiate liability caps, pricing, termination rights and indemnities — which is exactly the twelve-type list. So the subset the design would skip correlates almost perfectly with the subset the programme exists to find. A system that is right about boilerplate and wrong about liability is worse than useless, because it will be trusted on both.",
    },
    {
      option: "Commercial contract lifecycle platform",
      verdict: "Set aside, though it is the right answer for many organisations",
      caseFor:
        "Mature, legally aware, and somebody else maintains the clause taxonomy — which matters more than it sounds, because a large share of the work here is taxonomy rather than technology. It also arrives with a workflow, a permission model and a support contract, none of which this design gets for free.",
      caseAgainst:
        "These platforms generally assume contracts are authored inside them. An estate that already exists in four languages across three storage systems has to be migrated in, and the migration is precisely the hard part the product does not solve — the same extraction and chain-reconstruction problem, performed as a one-off project, usually by the vendor's professional services arm at a price that dwarfs the licence.",
    },
    {
      option: "Typed obligation store with constrained generation",
      verdict: "Direction taken in this note",
      caseFor:
        "Extraction writes into a structure that can be queried, reported, reconciled and diffed over time, and generation is constrained to cite from it. That is what makes an extracted term checkable rather than merely plausible — and it gives the completeness state somewhere to live, which none of the alternatives do.",
      caseAgainst:
        "It forces the schema decision very early, before enough of the estate has been read to know whether the schema is right. Getting it wrong means reprocessing everything, and the taxonomy is agreed with a Legal function that has other work on. There is also a real risk that the structured store becomes the parallel truth the IT architect is worried about, and preventing that is a discipline rather than a feature.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Cite the text; establish the reading separately",
        d: "Two different claims with two different mechanisms. That a quoted span exists at stated coordinates is checked deterministically and cheaply. That the clause is in force, unqualified and correctly typed is a property of the agreement record, and it is where the design spends its effort. Conflating them is how a system with perfect citations misleads a lawyer.",
      },
      {
        t: "The unit of truth is the agreement, not the document",
        d: "A base agreement, its amendments, its annexes and its side letters are one object. Extraction operates on documents; assertions are made about agreements. Nothing in the system may state a term from a document without reference to the agreement it belongs to.",
      },
      {
        t: "Refuse rather than qualify",
        d: "Where the amendment chain cannot be established, or a citation cannot be verified, the system declines to answer and says why. It does not answer with a caveat. A hedged answer is read as an answer, and the hedge is the first thing that gets dropped when someone pastes it into a summary.",
      },
      {
        t: "Structure first, generation last",
        d: "The obligation store is the product. The conversational surface is a view over it that may only cite what the store contains, which means the failure mode of the generative layer is silence rather than invention.",
      },
      {
        t: "Deterministic value ships before generative value",
        d: "The renewal and indexation calendar depends on metadata arithmetic, not on extraction. It lands first — it is worth money on its own, and it buys the credibility the extraction layer will need when it makes its first mistake.",
      },
      {
        t: "The document system stays the authority",
        d: "This store references documents; it never holds the master copy. The parallel-truth failure is prevented structurally rather than by policy, because policy erodes and a foreign key does not.",
      },
    ],
    flowDiagram: {
      id: "question-to-cited-answer",
      kind: "blocks",
      title: "From question to cited answer",
      caption:
        "Two gates rather than one. The completeness gate asks whether the agreement record is whole; the citation gate asks whether the quoted text is really there. Failing either produces a refusal that names the reason, never a hedged answer.",
      nodes: [
        { id: "ask", t: "Portfolio question", sub: "legal or procurement", col: 0, row: 0 },
        { id: "resolve", t: "Agreements resolved", sub: "not documents", col: 1, row: 0 },
        { id: "complete", t: "Chain checked", sub: "amendments · side letters", col: 2, row: 0, accent: true },
        { id: "terms", t: "Terms read", sub: "from the store", col: 3, row: 0 },
        { id: "refuse", t: "Refused, with reason", sub: "incomplete record", col: 0, row: 1 },
        { id: "verify", t: "Citations verified", sub: "span at coordinates", col: 2, row: 1, accent: true },
        { id: "answer", t: "Answer with citations", sub: "clause · page · revision", col: 3, row: 1 },
        { id: "audit", t: "Query recorded", sub: "clause ids · decision", col: 2, row: 2 },
      ],
      edges: [
        { from: "ask", to: "resolve" },
        { from: "resolve", to: "complete" },
        { from: "complete", to: "terms" },
        { from: "complete", to: "refuse", label: "gap", dashed: true },
        { from: "terms", to: "verify" },
        { from: "verify", to: "answer" },
        { from: "verify", to: "refuse", label: "no span", dashed: true },
        { from: "answer", to: "audit" },
      ],
    },
  },

  architecture: {
    overview:
      "A structure-aware ingestion pipeline writes into a typed obligation store whose primary entity is the agreement rather than the document. Retrieval and generation sit on top and are constrained to cite from it.\n\nThe part worth attention is the assembly stage between ingestion and the store. Documents arrive individually and have to be grouped into agreements — base plus amendments plus annexes plus whatever side letters can be found — and that grouping is inferred rather than looked up, because no source system records it. The confidence of that inference is stored alongside the agreement and gates every assertion made about it.\n\nEverything else is conventional, deliberately. The organisation has said it will not operate a separate vector service, so embeddings sit beside the obligation tables in the same database; at this corpus size that costs nothing in capability.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption:
          "Component boundaries are settled. The assembly layer is the one that does not appear in a conventional document-retrieval design, and it is the one carrying the completeness guarantee.",
        rows: [
          {
            label: "Surfaces",
            nodes: [
              { t: "Obligation dashboard" },
              { t: "Portfolio query interface" },
              { t: "Power BI", sub: "existing estate" },
              { t: "Review queue", sub: "legal ops" },
            ],
          },
          {
            label: "Query layer",
            nodes: [
              { t: "FastAPI", accent: true },
              { t: "Completeness gate", sub: "agreement whole?", accent: true },
              { t: "Citation verifier", sub: "span at coordinates", accent: true },
              { t: "Answer composer", sub: "cites the store only" },
            ],
          },
          {
            label: "Assembly",
            nodes: [
              { t: "Agreement grouping", sub: "inferred, scored", accent: true },
              { t: "Amendment ordering", sub: "by execution date" },
              { t: "Defined-term resolution" },
            ],
          },
          {
            label: "Extraction",
            nodes: [
              { t: "Document Intelligence", sub: "layout + OCR" },
              { t: "Structure-aware chunker" },
              { t: "Clause classifier", sub: "cheap model" },
              { t: "Typed extractor", sub: "schema-constrained" },
            ],
          },
          {
            label: "Stores",
            nodes: [
              { t: "PostgreSQL", sub: "agreements + obligations" },
              { t: "pgvector", sub: "clause embeddings" },
              { t: "Blob", sub: "source + page images" },
            ],
          },
          {
            label: "Governance",
            nodes: [
              { t: "Row-level security", sub: "by legal entity" },
              { t: "Immutable audit log" },
              { t: "Human review workflow" },
            ],
          },
        ],
      },
      {
        id: "what-must-be-true",
        kind: "pipeline",
        title: "What has to be true before a clause can be relied on",
        caption:
          "Four independent conditions, each with its own failure mode and its own measure. A citation establishes the second. The industry habit of treating that as sufficient is what this design exists to avoid.",
        lanes: [
          {
            label: "The document was read correctly",
            steps: [
              "Text layer present, or OCR succeeded",
              "Page and paragraph coordinates preserved",
              "Clause boundaries follow document structure",
            ],
            note: "Failure here looks like model error downstream and is not. Most of what is blamed on extraction is a reading fault upstream of it.",
          },
          {
            label: "The clause is where the citation says",
            steps: [
              "Quoted span located in the source",
              "Coordinates match the stored reference",
              "Answer suppressed if it cannot be found",
            ],
            note: "Deterministic, cheap and solved. It is also the only one of the four that most tooling implements.",
          },
          {
            label: "The agreement is complete",
            steps: [
              "Amendments discovered and ordered",
              "Side letters located or their absence confirmed",
              "Confidence in the chain recorded on the agreement",
            ],
            note: "Nothing in the source systems links these. Where confidence is low the agreement is marked incomplete and questions about it are refused.",
          },
          {
            label: "The reading is right",
            steps: [
              "Clause typed correctly",
              "Cross-references and carve-outs resolved",
              "Defined terms resolved to their operative definition",
            ],
            note: "The only one requiring a lawyer. The system's job is to present it for judgement, not to reach it.",
          },
        ],
      },
    ],
    layers: [
      {
        name: "Assembly",
        why: "The layer that does not exist in a document-retrieval design and is the reason this one works. Grouping documents into agreements is inferred from counterparty, dates and reference text, and the confidence of that inference is a stored property that gates every downstream assertion.",
      },
      {
        name: "Extraction",
        why: "Value is created here and everything downstream is bounded by the clause boundaries it produces. It is deliberately schema-constrained: the model fills a typed structure rather than writing prose, which turns a language problem into a data problem that can be validated and diffed.",
      },
      {
        name: "Completeness gate",
        why: "Refuses the question rather than answering from a partial record. This is the control that distinguishes the design, and it is also the one most likely to be argued away under delivery pressure — so it belongs in the query path where removing it is a visible change.",
      },
      {
        name: "Citation verifier",
        why: "A hard gate before display: if the quoted span cannot be located at the cited coordinates, nothing is shown. Cheap, deterministic, and the thing that makes the system usable by Legal at all — provided nobody mistakes it for a correctness check.",
      },
      {
        name: "Stores",
        why: "A typed obligation table makes renewal and exposure questions ordinary SQL, with no model in the loop for the questions asked most often. Embeddings sit in the same database because nobody here will operate a second one.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Primary entity",
      choice: "Agreement, with documents as members of it",
      why: "Every assertion the system makes is about an agreement. Modelling documents as the primary entity makes the completeness question unrepresentable, which is how it ends up unasked.",
      alt: "Document as the primary entity — simpler, matches the source systems, and quietly makes the central failure mode invisible.",
    },
    {
      layer: "Chain reconstruction",
      choice: "Inferred from counterparty, execution date and reference text, with a stored confidence",
      why: "No source system records the link. Making the inference explicit and scored means low confidence can gate answers rather than silently degrade them.",
      alt: "Manual linking by legal ops — accurate and unaffordable at 48,000 documents; viable as a targeted campaign on the highest-spend suppliers.",
    },
    {
      layer: "Chunking",
      choice: "Structure-aware, following clause boundaries",
      why: "A clause split across chunks produces a retrieval result that is legally meaningless, and a citation pointing at half of a provision is worse than no citation.",
      alt: "Fixed-size overlap chunking — trivial to build, and an unacceptable failure mode here.",
    },
    {
      layer: "Output shape",
      choice: "Typed extraction into a schema, never free text",
      why: "Turns a language problem into a data problem that can be validated, diffed across taxonomy versions and audited. It also makes an extraction reviewable in seconds rather than read in minutes.",
      alt: "Narrative summaries — faster to demonstrate, impossible to verify at portfolio scale, and they invite exactly the legal conclusions the design refuses to make.",
    },
    {
      layer: "Clause typing",
      choice: "A small model for classification, the capable model only for typed extraction on candidates",
      why: "Classification runs over the whole corpus and extraction over a fraction of it. Splitting them is most of the difference between a backfill that costs twenty thousand euros and one that costs a hundred.",
      alt: "One capable model throughout — simpler pipeline, several times the backfill cost for no measurable gain on the classification step.",
    },
    {
      layer: "Vector store",
      choice: "pgvector alongside the obligation tables",
      why: "Obligations and embeddings are queried together, and one database is one operational burden instead of two. Discovery was explicit that a second service would not be operated.",
      alt: "Dedicated vector database — better at very large scale, unnecessary at this corpus size and rejected on operations grounds rather than technical ones.",
    },
    {
      layer: "Access control",
      choice: "Row-level security by legal entity, in the obligation store",
      why: "Segmentation is enforced where the data lives rather than in each surface, so a new report cannot forget it.",
      alt: "Application-level filtering — one missed query away from a disclosure incident, and the incident is contractual rather than internal.",
    },
    {
      layer: "Document authority",
      choice: "The existing document system remains the master; the store holds references",
      why: "Prevents the parallel-truth failure structurally. A reference that cannot resolve is a detectable error; a diverging copy is not.",
      alt: "Copy documents into the platform — faster retrieval, and a second truth that starts diverging the day it is created.",
    },
  ],

  security: {
    posture:
      "Two properties do most of the work here, and they are enforced in different places.\n\nThe first is that segmentation lives in the database rather than in the application. Several entities in the group have partners who may not see each other's commercial terms, which makes a cross-entity disclosure a contractual event rather than an internal embarrassment. Row-level security means a new dashboard, a new export or a new query path inherits the boundary instead of being trusted to reimplement it.\n\nThe second is that contract text is full of personal data that nobody thinks of as personal data. Signature blocks, named contacts, annexed staff schedules, occasionally salary bands. The minimisation work happens at ingestion — before embedding, before any prompt — because a redaction applied later means the unredacted copy existed, and existed is the whole question.",
    controls: [
      {
        t: "Row-level security by entity",
        d: "Access scope is resolved from directory group claims and enforced in the database. Every surface inherits it; none implements it.",
      },
      {
        t: "Citation verification before display",
        d: "A deterministic check that the quoted span exists in the cited document at the cited coordinates. Failure suppresses the answer rather than annotating it.",
      },
      {
        t: "Completeness state on every assertion",
        d: "An answer carries the agreement's chain confidence. Below the threshold there is no answer to carry it, which makes the guarantee enforceable rather than advisory.",
      },
      {
        t: "Personal-data minimisation at ingestion",
        d: "Signature blocks and contact schedules are detected and excluded from embeddings and prompts before either exists. The source document is untouched, since it is a record.",
      },
      {
        t: "Immutable audit trail",
        d: "Queries, retrieved clause identifiers, citation-verification outcomes and reviewer decisions are written append-only. \"Why did it say that\" is the question that will actually be asked, and it is unanswerable without this.",
      },
      {
        t: "Extraction provenance retained",
        d: "Each stored term records the model version, taxonomy version and prompt that produced it, so a taxonomy change can be reasoned about rather than merely re-run.",
      },
      {
        t: "No write path to the document system",
        d: "The platform reads. It cannot modify, move or delete a document, which keeps the authority relationship one-directional and the blast radius of a defect finite.",
      },
    ],
  },

  scalability: {
    body:
      "Query volume is trivial — a few hundred people asking portfolio questions occasionally. Nothing here is under load in the ordinary sense, and designing for throughput would be effort spent on the dimension that is not threatened.\n\nThe load is reprocessing. A taxonomy change means re-extracting the estate, and the taxonomy will change: the twelve clause types are agreed before anyone has read a representative sample, so the first revision is a matter of when. Forty-eight thousand documents through layout analysis, classification and typed extraction is a campaign measured in days, and it has to be a background campaign rather than an outage.\n\nThe second scaling dimension is subtler and worth naming, because it grows without anyone deciding to grow it: the review queue. Extraction produces candidates, low-confidence candidates go to Legal, and Legal has a fixed and small capacity. A design that improves recall without improving confidence calibration will quietly saturate the humans behind it, and the system's throughput ceiling is theirs, not the pipeline's.",
    levers: [
      {
        t: "Idempotent, versioned reprocessing",
        d: "Extraction jobs are keyed by taxonomy revision and document version, so a re-run is resumable and a partial failure does not require starting again.",
      },
      {
        t: "Queue-based ingestion",
        d: "OCR, embedding and extraction run on workers scaled independently of the query path. A backfill campaign cannot degrade a portfolio query.",
      },
      {
        t: "Incremental ingestion from the procurement system",
        d: "New and amended agreements flow continuously rather than in batch reloads, which is also what keeps the amendment chains from going stale.",
      },
      {
        t: "Per-language evaluation gates",
        d: "Each language enters production only when its own accuracy threshold is met. No global accuracy claim is made, because a global figure hides the language that is failing.",
      },
      {
        t: "Confidence-banded routing with a queue ceiling",
        d: "Only low-confidence extractions reach Legal, and queue depth is a monitored figure with a defined response. A queue nobody can clear is a system nobody trusts.",
      },
    ],
  },

  costOptimization: {
    body:
      "The cost shape here is unusual and it changes where optimisation effort belongs. Almost everything is a one-time backfill over the back catalogue; steady-state operation is close to free, because the questions asked most often are answered by SQL over a structured table with no model in the loop at all.\n\nThe backfill derivation, with assumptions stated. Around 48,000 documents at an average of roughly 12,000 tokens each is about 580 million tokens through the cheap classification pass. At an assumed €0.15 per million input tokens that is roughly €90. Classification identifies candidate clauses in perhaps 15% of the content, and those go to the capable model for typed extraction: around 87 million tokens in and a small fraction out, at an assumed €5 per million in and €25 per million out, giving roughly €440 plus output. Layout analysis and OCR over the scanned 18% is priced per page rather than per token and is the larger line — on the order of €8,000 to €14,000 depending on page count and how much needs the higher-accuracy path.\n\nSo the backfill lands somewhere around €10,000 to €16,000 in model and document-processing cost per taxonomy version, against a phase-1 budget of €220,000. The AI is not the expensive part of this programme. Engineering time and Legal's review capacity are, and the review capacity is the one that cannot be bought.\n\nThe two figures to check before committing: the token-per-document average, which I have assumed and which varies enormously with annex-heavy agreements, and the share of the corpus needing the higher-accuracy document-processing path, which is where the range above comes from.",
    levers: [
      {
        n: "01",
        t: "One-time backfill, then incremental",
        d: "The expensive pass happens once per taxonomy version. Everything after it is marginal cost on new documents only.",
      },
      {
        n: "02",
        t: "Cheap model classifies, capable model extracts",
        d: "Classification runs over everything, extraction over a fraction. This split is most of the difference between a €15,000 backfill and a six-figure one.",
      },
      {
        n: "03",
        t: "Structured queries bypass models entirely",
        d: "Renewal, exposure and indexation questions are SQL over the obligation store. The most frequently asked questions cost nothing per request.",
      },
      {
        n: "04",
        t: "OCR only where needed",
        d: "Native-text documents skip the document-processing path, which removes 82% of the corpus from the largest single cost line.",
      },
      {
        n: "05",
        t: "Taxonomy changes are budgeted, not absorbed",
        d: "A revision costs a full backfill. Treating that as a known recurring cost rather than a surprise is what stops the taxonomy being frozen prematurely for the wrong reason.",
      },
    ],
    model: [
      { k: "Documents in the estate", v: "~48,000" },
      { k: "Average tokens per document, assumed", v: "~12,000" },
      { k: "Classification pass", v: "~580m tokens at an assumed €0.15/m — roughly €90" },
      { k: "Candidate share reaching extraction, assumed", v: "~15% of content" },
      { k: "Typed extraction", v: "~87m tokens at an assumed €5/m in, €25/m out — roughly €440 plus output" },
      { k: "Document processing on the scanned 18%", v: "€8,000–14,000 — the dominant line, priced per page" },
      { k: "Backfill total, per taxonomy version", v: "~€10,000–16,000" },
      { k: "Steady-state monthly", v: "~€900 — incremental ingestion plus occasional generation" },
      { k: "Structured portfolio queries", v: "€0 — no model in the path" },
      { k: "Against phase-1 budget", v: "€220,000 — the AI is not what this programme costs" },
      { k: "The constraint that actually binds", v: "Legal's review capacity, which no budget line can increase" },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "Fabricated or mislocated citation",
      severity: "Critical",
      consequence: "Permanent loss of legal trust — unrecoverable rather than a setback",
      mitigation:
        "Deterministic span verification before display. Unverifiable answers are suppressed entirely, not softened with a hedge.",
    },
    {
      n: "02",
      risk: "Correct citation attached to a superseded clause",
      severity: "Critical",
      consequence:
        "A true quotation supporting a false answer, made more credible by the citation — the failure this design exists to prevent",
      mitigation:
        "The completeness gate: no assertion about an agreement whose amendment chain is below the confidence threshold. Incomplete agreements are listed explicitly rather than answered partially.",
    },
    {
      n: "03",
      risk: "Cross-reference or carve-out not resolved",
      severity: "High",
      consequence: "A liability cap reported without the exclusion that makes it meaningless",
      mitigation:
        "Extraction records intra-document references as structure rather than prose; clause types known to carry carve-outs are routed to review regardless of confidence.",
    },
    {
      n: "04",
      risk: "Extraction quality varies by language",
      severity: "High",
      consequence: "A systematic blind spot in one jurisdiction that no aggregate metric reveals",
      mitigation:
        "Per-language evaluation sets and per-language acceptance thresholds. No global accuracy claim is made or reported.",
    },
    {
      n: "05",
      risk: "Review workload shifts to Legal rather than reducing",
      severity: "High",
      consequence: "No net saving, and the sponsor loses the business case in month five",
      mitigation:
        "Confidence-banded routing with queue depth as a tracked KPI and a defined ceiling. If the queue grows, recall is reduced deliberately rather than the queue being allowed to absorb it.",
    },
    {
      n: "06",
      risk: "Divergence from the document system",
      severity: "Medium",
      consequence: "Two versions of the truth, and the newer one is wrong",
      mitigation:
        "The document system stays the authority; the store holds references and has no write path. A broken reference is detectable in a way a diverging copy is not.",
    },
    {
      n: "07",
      risk: "Scan quality blocks part of the corpus",
      severity: "Medium",
      consequence: "Silent coverage gaps that read as absence of risk",
      mitigation:
        "Coverage reported per document family. Unprocessable documents are enumerated explicitly, because an unlisted gap is indistinguishable from a clean result.",
    },
  ],

  kpis: [
    {
      category: "Trust",
      kpi: "Citation verification failures shown to a user",
      baseline: "n/a",
      target: "0",
      why: "The adoption-critical guarantee. One is too many, which is why the control suppresses rather than warns.",
    },
    {
      category: "Completeness",
      kpi: "Agreements with a chain established above the confidence threshold",
      baseline: "0%",
      target: "> 85%",
      why: "Bounds what the system may answer at all. The remaining share is a known list, not a silent gap.",
    },
    {
      category: "Coverage",
      kpi: "Agreements with all 12 priority clause types extracted",
      baseline: "0%",
      target: "> 90%",
      why: "Portfolio questions are only answerable at high coverage, and partial coverage answers them wrongly rather than not at all.",
    },
    {
      category: "Accuracy",
      kpi: "Clause-type precision on the held-out set, per language",
      baseline: "n/a",
      target: "> 0.95",
      why: "Measured per language because that is where the failure hides. A global figure would report success while one jurisdiction fails.",
    },
    {
      category: "Accuracy",
      kpi: "Extractions surviving legal review unchanged",
      baseline: "n/a",
      target: "> 90%",
      why: "The honest measure. Precision against a held-out set is a proxy; a lawyer accepting the extraction is the thing itself.",
    },
    {
      category: "Capacity",
      kpi: "Review queue depth against the agreed ceiling",
      baseline: "n/a",
      target: "Within ceiling",
      why: "The system's real throughput limit is Legal's capacity. A queue past the ceiling means recall must come down.",
    },
    {
      category: "Efficiency",
      kpi: "Time to answer a portfolio liability question",
      baseline: "3 days",
      target: "< 2 hours",
      why: "The question that triggered the programme, and the one the board will ask again.",
    },
    {
      category: "Value",
      kpi: "Eligible indexation clauses exercised",
      baseline: "Unknown",
      target: "100%",
      why: "A direct, measurable cash benefit that does not depend on any extraction being right about liability.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Taxonomy and corpus survey",
      duration: "4 weeks",
      goal: "Agree the twelve priority clause types with Legal, and find out what the documents will actually support.",
      activities: [
        "Clause taxonomy workshops with Legal, working from real documents",
        "OCR quality measurement across the estate",
        "Amendment-chain reconstruction tested on a sample of the highest-spend suppliers",
      ],
      deliverables: ["Clause taxonomy", "Corpus quality report", "Chain-reconstruction feasibility finding", "Evaluation set design"],
    },
    {
      phase: "P1",
      name: "Metadata and renewal calendar",
      duration: "6 weeks",
      goal: "Ship the renewal and indexation calendar from deterministic metadata alone, with no extraction in the path.",
      activities: [
        "Ingestion pipeline and agreement assembly",
        "Obligation store with row-level security",
        "Renewal and indexation dashboard",
      ],
      deliverables: ["Agreement records with chain confidence", "Renewal dashboard", "Indexation opportunity report"],
    },
    {
      phase: "P2",
      name: "Clause extraction",
      duration: "9 weeks",
      goal: "Typed extraction with citation verification and a confidence-banded review queue Legal can actually clear.",
      activities: [
        "Structure-aware chunking and clause classification",
        "Schema-constrained extraction and citation verifier",
        "Legal review workflow and evaluation-set construction",
      ],
      deliverables: ["Extractor", "Citation verifier", "Per-language accuracy report", "Review workflow"],
    },
    {
      phase: "P3",
      name: "Portfolio queries",
      duration: "6 weeks",
      goal: "Natural-language portfolio questions answered from the structured store, refused where the record is incomplete.",
      activities: [
        "Query interface constrained to cite from the store",
        "Completeness gate in the query path",
        "Template deviation reporting",
      ],
      deliverables: ["Query interface", "Refusal reporting for incomplete agreements", "Template deviation report"],
    },
  ],

  tailoring: [
    {
      parameter: "Size and uniformity of the contract estate",
      hereValue: "~14,000 agreements, four languages, two decades of drafting styles",
      altValue: "A few hundred agreements on two or three templates",
      architectureChange:
        "Do not build extraction. A structured intake form for new agreements, plus one paralegal reading the back catalogue once, is cheaper, faster and more accurate than anything described here.",
      why: "Extraction earns its complexity on volume and variety. Below a few thousand documents the evaluation set alone costs more to assemble than reading the estate by hand — and a careful human reader makes fewer mistakes than the system being evaluated.",
    },
    {
      parameter: "How many agreements have been amended",
      hereValue: "Median 2.4 amendments, side letters on roughly 30%",
      altValue: "Agreements are signed once and rarely amended",
      architectureChange:
        "The assembly layer and the completeness gate both disappear. The document becomes the unit of truth, extraction accuracy becomes the whole problem, and the design collapses into conventional document intelligence.",
      why: "This is the parameter the note is built on. Most contract tooling assumes this alternative value implicitly and is correct to, for estates where it holds. Establishing which estate you have is a phase-0 question, not an implementation detail.",
    },
    {
      parameter: "Document condition",
      hereValue: "Mixed — born-digital PDFs alongside scans of executed originals",
      altValue: "Every document born digital with a reliable text layer",
      architectureChange:
        "The layout and OCR stage drops out, taking with it the largest single line in the backfill cost and the largest source of extraction error.",
      why: "Most of what looks like model error in document work is reading error upstream of the model. Remove the scans and the achievable accuracy ceiling rises before anything else is tuned.",
    },
    {
      parameter: "Who consumes the output",
      hereValue: "Procurement, wanting alerts on obligations coming due",
      altValue: "Legal, preparing for litigation or due diligence",
      architectureChange:
        "Recall replaces precision as the governing metric. Missing a clause becomes the unacceptable failure rather than surfacing a doubtful one, which inverts every threshold and makes the review queue much larger by intent.",
      why: "The same engine serves both, at different operating points. An alerting system that cries wolf gets muted; a due-diligence system that stays quiet about a clause has failed at the only thing it was for.",
    },
    {
      parameter: "Whether a legal owner will set the accuracy bar",
      hereValue: "Assumed — someone in Legal accepts the standard for a relied-upon term",
      altValue: "Nobody will put their name to it",
      architectureChange:
        "Ship search with citations and stop. Present passages, never asserted terms, and let a person read the clause and decide.",
      why: "An extracted obligation is a claim somebody will act on. Without a named owner for the standard, the system manufactures unattributed legal conclusions, and the citation layer is providing reassurance rather than control.",
    },
    {
      parameter: "Jurisdictional and language spread",
      hereValue: "Multilingual, several governing laws",
      altValue: "One language, one governing law",
      architectureChange:
        "Per-language evaluation sets, per-language thresholds and cross-lingual clause equivalence collapse into a single evaluation track — roughly a third of the assurance work disappears.",
      why: "Cross-lingual equivalence is the hardest unsolved part of this note. Removing it removes the risk that quality is quietly acceptable in one jurisdiction and quietly poor in another.",
    },
  ],

  counterpart: {
    slug: "enterprise-knowledge-assistant",
    note: "Both notes refuse to answer without showing the source, and arrive there from different directions: here the problem is proving a clause is the whole of what was agreed, there it is proving the document is the current revision and that the reader is entitled to see it. The pair shows how differently \"cite your source\" has to be built depending on which part of the claim can be wrong.",
  },

  assumptionsToTest: [
    "Amendment chains can be reconstructed from counterparty, date and reference text for the large majority of agreements. This is the assumption the whole design rests on, and I have not tested it. If chains can only be established for half the estate, the completeness gate refuses half the questions and the system is not worth building in this shape.",
    "The 2.4 amendments and 30% side-letter figures are chosen, not measured. They are the first two numbers I would establish, because both the data model and the phase ordering follow from them.",
    "Clause equivalence across languages is treated here as reliable at a level I cannot establish. Two clauses can be legally equivalent and lexically unrelated, and I have no dependable automatic test for that.",
    "The extraction accuracy needed before anyone relies on an obligation date is unknown to me. It is plainly higher than the bar for search, but where the line sits is a decision for a legal owner rather than an architect.",
    "The architecture assumes somebody is accountable when an obligation is extracted incorrectly and then missed. That is a governance question and I have assumed an answer exists rather than confirming one.",
    "The obligation schema was proposed without reading a representative sample of the estate. That is the wrong order and I would expect it to change on contact with the documents.",
    "The backfill cost figures rest on an assumed average token count per document and an assumed split between document-processing paths. Annex-heavy agreements would move both.",
  ],

  lessonsLearned: [
    "Asking what happens after a flag is raised turned the product from a chatbot into a database.",
    "The question nobody had asked was what makes an agreement complete. It changed the primary entity of the data model, and every other decision followed from that rather than from anything about models.",
    "Provenance is an architectural property rather than an interface feature — it has to be designed into ingestion, and by the time it is a display concern it is already too late.",
    "A citation makes an answer more credible whether or not it makes it more correct. That asymmetry is the thing to design against, and it is not obvious until stated.",
    "Sequencing the deterministic value first bought the credibility the extraction layer needed for its first mistake.",
  ],

  futureImprovements: [
    "Template deviation scoring against the group's standard clause library, which becomes cheap once extraction is typed.",
    "Negotiation support surfacing precedent positions across the estate — the highest-value thing on this list and the one most likely to be misused.",
    "Continuous ingestion from the procurement system so agreements and their chains never go stale.",
    "Extending the completeness notion to obligations that were agreed and never documented, which discovery found and this design does not address.",
  ],
};

export default caseStudy;
