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

export type Diagram =
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
  techGroups?: TechGroup[];

  /* --- the 19 case-study sections --- */
  executiveSummary?: { statement: string; highlights?: Fact[] };
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
  solutionDesign?: { principles?: Point[]; flow?: string[] };
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
  implementationNotes?: {
    body?: string;
    decisions?: { id: string; t: string; d: string }[];
    repoStructure?: string[];
  };
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
  /** Retired — the site no longer presents self-describing metrics. */
  heroStats?: { value: string; label: string; note: string }[];
};

export type WhyMe = {
  eyebrow: string;
  title: string;
  body: string;
  pillars: { num: string; title: string; body: string; tags: string[] }[];
};

export type About = {
  eyebrow: string;
  title: string;
  lede: string;
  paragraphs: string[];
  timeline: { period: string; role: string; org: string; body: string; tags: string[]; current?: boolean }[];
  credentials: { label: string; org: string; note: string }[];
  strengths: Point[];
  philosophy: NumberedPoint[];
  workingStyle: string[];
};

export type SkillState = "solid" | "building" | "next" | "later";

export type Learning = {
  eyebrow: string;
  title: string;
  lede: string;
  totals: {
    target: number;
    scheduled: number;
    remaining: number;
    sprintWeeks: number;
    hoursPerWeek: number;
  };
  sprint: { label: string; weeks: string[] };
  skills: {
    name: string;
    target: number;
    scheduled: number;
    /** Hours planned per sprint week, aligned with `sprint.weeks`. */
    weeks: string[];
    group: string;
    state: SkillState;
  }[];
  tracks: { t: string; state: string; items: string[] }[];
  milestones: { q: string; t: string; d: string }[];
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
