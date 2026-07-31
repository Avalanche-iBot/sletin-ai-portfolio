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
  /**
   * Marks the one case study used as the site's reference deliverable — the
   * note whose voice the others are measured against. Editorial only; nothing
   * renders from it.
   *
   * The registry briefly also carried `startHereSlug`, a separate judgement
   * about which note a first-time reader should be pointed at. It was removed
   * — a portfolio index that tells the reader which card matters most reads as
   * managing them, and the six cards can make that case on their own.
   */
  flagship?: boolean;
  statusNote?: string;
  complexityLabel?: string;
  /**
   * How long the programme is assumed to take, as a rendered string.
   *
   * It reads "Assumed programme length: …" rather than naming a duration flat,
   * because nothing here was built and a bare figure in a field called
   * duration invites the reader to think otherwise. The earlier `client`,
   * `clientNote` and `role` fields were removed for the same reason and a
   * worse one: they rendered nowhere at all, so they were invisible scaffolding
   * that made the public source read like a record of engagements.
   */
  duration?: string;
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
  /**
   * Another note this one is in dialogue with.
   *
   * Not "related content" in the recommendation-engine sense. It is a pointer
   * worth following only where two notes reach different answers, or reach the
   * same answer from opposite constraints — the pairing has to teach something
   * that neither note teaches alone, which is why `note` has to say what the
   * relationship actually is rather than asserting one exists.
   *
   * `slug` refers to another published study. A slug with nothing behind it is
   * simply not rendered.
   */
  counterpart?: { slug: string; note: string };
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
 * Deliberately not a biography, and now deliberately short. The page ran to
 * five sections — approach, certifications, principles, strengths, working
 * style and background — which is more than anyone reads, and which left the
 * one section a stranger actually checks competing with four that read as
 * self-promotion.
 *
 * It is two sections now. An opening with the credentials in a block beside it,
 * styled like the fact panels in the case notes, and one merged set of
 * principles. What went: `strengths`, a list of things the author is good at,
 * which sold rather than showed; `workingStyle`, mostly the same again; and the
 * per-certification essays, on the grounds that a certification is a fact and
 * does not need three sentences arguing for itself.
 */
/**
 * One line of a certifications block — held or in progress, same shape.
 *
 * `issued` and `credentialId` are plain strings rather than a date type and a
 * number, because an in-progress entry needs to put "In preparation" and
 * "XXXXXXXXX" in exactly those slots. See `About.certificationsInProgress` for
 * why that placeholder exists rather than a boolean.
 */
export type Credential = {
  label: string;
  org: string;
  issued: string;
  /** Only where the issuer states one — PMP is the current example. */
  expires?: string;
  credentialId: string;
  /** Public verification page for this credential. */
  verifyUrl?: string;
  /** Badge image, served from `public/badges/`. */
  badge?: string;
};

export type About = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Why I find this work interesting. First person, no achievements. */
  paragraphs: string[];
  /**
   * The path, in two short paragraphs, above the reflective ones.
   *
   * It exists because the list of qualifications provokes a question — oil and
   * gas engineer, then project delivery, now architecture — and a reader who
   * has to ask it has already stopped reading. The first paragraph is the
   * sequence. The second is why it points here, and that argument is carried in
   * the prose rather than appended as a note underneath a list, because a
   * justification in small grey type reads as an apology.
   *
   * Not a career summary. It earns its place only by explaining a bias.
   */
  path: string[];
  /**
   * Degrees, for the block beside the opening — plain names, no institution or
   * dates. A reader either cares what the field was or does not, and "Energy
   * Engineering (Oil & Gas)" says that on its own; the year and the university
   * are the kind of detail a CV carries and this page explicitly is not one.
   */
  education: string[];
  /**
   * Certifications held, in the exact form the issuer states them.
   *
   * Every field here is something a stranger can check, which is the entire
   * argument for the block: a credential either stands on its own with an
   * issue date and an ID, or it does not belong here. There used to be a
   * paragraph under each one explaining what it changed about the way the
   * author works — decent writing, wrong place. A sidebar states facts.
   *
   * `verifyUrl` and `badge` are unset for now. They exist so that adding a
   * public verification link and an issuer logo later is a content edit rather
   * than a schema change — the block renders them when present and stays quiet
   * when absent.
   */
  certifications: Credential[];
  /**
   * Qualifications being worked towards, in the order they are being taken.
   *
   * Same shape as `certifications`, deliberately — the block is meant to read
   * as one form used honestly rather than two different treatments for what is
   * held and what is not. The difference is in the values: `issued` reads "In
   * preparation" and `credentialId` is the literal placeholder `"XXXXXXXXX"`,
   * to be replaced with the real one the day the exam is passed. Kept as a
   * separate list rather than a status flag on `certifications`, because the
   * distinction between held and attempted is the entire point of the section
   * and a flag on a shared list is the easiest way to blur it by accident.
   */
  certificationsInProgress?: Credential[];
  /**
   * How I work through a problem, and what I hold to while doing it.
   *
   * `approach` and `philosophy` were separate lists that a reader met four
   * sections apart, and half of each restated the other. Merged: the first
   * entries are an order of operations, the rest are defaults. One short line
   * each — the long form was three sentences per point across eleven points,
   * which is an essay pretending to be a list.
   */
  principles: NumberedPoint[];
};

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
