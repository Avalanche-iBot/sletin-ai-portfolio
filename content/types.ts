/**
 * CONTENT SCHEMA — the single contract between content and presentation.
 *
 * Adding a case study = adding one file under content/projects/ that satisfies
 * `CaseStudy`, then registering it in content/projects/index.ts. No page,
 * route or component needs to change.
 *
 * Every narrative section is optional so a case study can be published with
 * metadata only and filled in section by section. The page
 * template renders a section if and only if its content exists.
 */

/* ------------------------------------------------------------------ atoms */

/** Key/value pair, used for spec panels and fact grids. */
export type Fact = { k: string; v: string };

/** Title + description pair, used for principles, controls, levers, strengths. */
export type Point = { t: string; d: string };

/** Numbered title + description, where the order carries meaning. */
export type NumberedPoint = { n: string; t: string; d: string };

/**
 * Maturity of the *written analysis*, not of a product.
 * This site documents reasoning; it does not ship software, so the vocabulary
 * describes how finished the thinking is.
 */
export type Status = "In analysis" | "Architecture note" | "Under revision" | "Open question";

/** 1–5. Drives the complexity meter on cards and the case header. */
export type Complexity = 1 | 2 | 3 | 4 | 5;

/* -------------------------------------------------------------- diagrams */

export type DiagramNode = {
  t: string;
  /** Secondary line inside the node (protocol, model name, "phase 2"). */
  sub?: string;
  /** Highlights the node as part of the system's decision-making core. */
  accent?: boolean;
  /** Renders the node dashed — planned, deferred or external. */
  muted?: boolean;
};

/** Horizontal band of a layered architecture view. */
export type DiagramRow = { label: string; nodes: DiagramNode[] };

/** One numbered step in a request/decision flow. */
export type DiagramStep = { t: string; d?: string; accent?: boolean };

/** A conditional branch off a flow, e.g. "confidence < 0.75 → escalate". */
export type DiagramBranch = { at: string; when: string; then: string };

/** Vertical stage of a pipeline (ingestion, retrieval, generation). */
export type DiagramLane = { label: string; steps: string[]; note?: string };

/** One message in a sequence diagram. `from`/`to` index into `actors`. */
export type DiagramMessage = { from: number; to: number; t: string; note?: string };

/** A box on a block diagram, placed on a fixed grid. */
export type BlockNodeDef = {
  id: string;
  t: string;
  sub?: string;
  /** 0-based grid position. */
  col: number;
  row: number;
  /** Columns spanned, default 1. */
  span?: number;
  accent?: boolean;
  muted?: boolean;
};

/** A dashed container drawn around a set of nodes. */
export type BlockGroupDef = { label: string; nodes: string[] };

/** A directed connector. `label` annotates the condition or payload. */
export type BlockEdge = { from: string; to: string; label?: string; dashed?: boolean };

export type BlockDiagram = {
  id: string;
  kind: "blocks";
  title: string;
  caption?: string;
  nodes: BlockNodeDef[];
  groups?: BlockGroupDef[];
  edges: BlockEdge[];
};

export type Diagram =
  | BlockDiagram
  | { id: string; kind: "layers"; title: string; caption?: string; rows: DiagramRow[] }
  | {
      id: string;
      kind: "flow";
      title: string;
      caption?: string;
      steps: DiagramStep[];
      branches?: DiagramBranch[];
    }
  | { id: string; kind: "pipeline"; title: string; caption?: string; lanes: DiagramLane[] }
  | {
      id: string;
      kind: "sequence";
      title: string;
      caption?: string;
      actors: string[];
      messages: DiagramMessage[];
    };

/* ------------------------------------------------------- case study body */

export type TechGroup = { group: string; items: string[] };

export type Stakeholder = {
  role: string;
  interest: string;
  concern: string;
  /**
   * Why this stakeholder matters to the architecture, not their place on the
   * org chart. Free text so it can name the actual gate: "Budget gate",
   * "Compliance gate", "Veto power", "Adoption make-or-break".
   */
  influence: string;
};

/** One stakeholder interview: what was asked, what came back. */
export type DiscoveryGroup = {
  audience: string;
  goal: string;
  questions: string[];
  answers: string[];
};

export type CaseStudy = {
  /* --- identity & metadata (required) --- */
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  industry: string;
  domain: string;
  status: Status;
  architectureComplexity: Complexity;
  shortSummary: string;
  tags: string[];
  featured: boolean;

  /* --- optional metadata --- */
  /** Marks the one case study used as the site's reference deliverable. */
  flagship?: boolean;
  client?: string;
  clientNote?: string;
  statusNote?: string;
  complexityLabel?: string;
  duration?: string;
  role?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  demoNote?: string;
  /** One line of measurable outcome, shown on cards. */
  impact?: string;
  /**
   * Sensitivity of the design to its own inputs.
   *
   * Replaces the earlier "open questions" list. The reader who matters most is
   * not another architect admiring the reasoning — it is someone deciding
   * whether any of this transfers to their own situation. So each entry names a
   * parameter, states the value assumed here, gives a plausible alternative,
   * and says what the architecture becomes at that value and why.
   */
  tailoring?: {
    parameter: string;
    hereValue: string;
    altValue: string;
    architectureChange: string;
    why: string;
  }[];
  /** Kept short: the honesty about method, without it dominating the section. */
  assumptionsToTest?: string[];
  techGroups?: TechGroup[];

  /* --- the 19 case-study sections --- */
  executiveSummary?: {
    statement: string;
    /** The single architectural position, promoted above the fact grid. */
    verdict?: string;
    highlights?: Fact[];
  };
  businessContext?: {
    narrative: string;
    companyFacts?: Fact[];
    drivers?: string[];
    constraints?: string[];
    existingStack?: string[];
  };
  stakeholders?: Stakeholder[];
  discovery?: {
    intro?: string;
    groups: DiscoveryGroup[];
    assumptions?: string[];
    implications?: { finding: string; implication: string }[];
    businessRisks?: string[];
    technicalConstraints?: string[];
  };
  analysis?: {
    aiNeeded?: { verdict: string; body: string };
    automationAlternative?: {
      verdict: string;
      canAutomate?: string[];
      cannotAutomate?: string[];
      body?: string;
    };
    valueAreas?: string[];
    outOfScope?: string[];
    conclusion?: string;
  };
  solutionDesign?: { principles?: Point[]; flow?: string[]; flowDiagram?: Diagram };
  /**
   * Approaches that were on the table at architecture level, with the case for
   * and against each. Exists so a note cannot read as if one answer was
   * obvious — the reader can see what was rejected and disagree with the
   * rejection.
   */
  alternatives?: { option: string; caseFor: string; caseAgainst: string; verdict?: string }[];
  architecture?: {
    overview?: string;
    diagrams?: Diagram[];
    layers?: { name: string; why: string }[];
  };
  technologySelection?: { layer: string; choice: string; why: string; alt: string }[];
  security?: { posture?: string; controls?: Point[] };
  scalability?: { body?: string; levers?: Point[] };
  costOptimization?: { body?: string; levers?: NumberedPoint[]; model?: Fact[] };
  risks?: {
    n: string;
    risk: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    consequence: string;
    mitigation: string;
  }[];
  kpis?: { category: string; kpi: string; baseline: string; target: string; why: string }[];
  roadmap?: {
    phase: string;
    name: string;
    duration: string;
    goal: string;
    activities?: string[];
    deliverables?: string[];
  }[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
};

/* ----------------------------------------------------------- site content */

export type Site = {
  name: string;
  brandShort: string;
  role: string;
  tagline: string;
  positioning: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  availability: string;
  /**
   * Canonical public address, without a trailing slash.
   *
   * The single source for anything that has to name the site absolutely —
   * metadata, the sitemap, robots.txt, and the attribution line stamped into
   * downloadable files. Kept here so the domain appears once rather than in
   * every file that happens to need it.
   */
  url: string;
};

export type WhyMe = {
  eyebrow: string;
  title: string;
  body: string;
  pillars: { num: string; title: string; body: string; tags: string[] }[];
};

/**
 * About.
 *
 * Deliberately not a biography. The employment timeline and the org names were
 * removed: they answered "where has he been", which is a question a CV answers
 * and which this site does not need to. What replaces them answers "how does
 * he think", which is the only thing a reader of an architecture notebook can
 * actually use.
 *
 * `background` is the one concession to context, kept generic on purpose —
 * industry and function, never an employer.
 */
export type About = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Why I find this work interesting. First person, no achievements. */
  paragraphs: string[];
  /** Generic context only: sector and function, never an organisation. */
  background: string[];
  /** What each certification changed about the way I think — not the badge. */
  certifications: { label: string; org: string; shaped: string; mindset: string }[];
  /** How I approach a business problem, as a sequence. */
  approach: NumberedPoint[];
  strengths: Point[];
  philosophy: NumberedPoint[];
  workingStyle: string[];
};

export type Service = { t: string; d: string; tier: string };

/** Packaged engagement — the structure a price list can slot into later. */
export type Engagement = { t: string; len: string; d: string; out: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: string;
  featured: boolean;
  /** Body is optional: posts can be listed as "planned" before they are written. */
  body?: { heading?: string; paragraphs?: string[]; bullets?: string[] }[];
};
