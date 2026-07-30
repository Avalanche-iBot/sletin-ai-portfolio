import type { CaseStudy } from "../types";

/**
 * Case study 06 — agentic turnaround execution.
 *
 * The first note on this site where the system acts rather than answers. It
 * raises requisitions, moves activities in a shutdown schedule, stands crews
 * down and tells contractor firms — across four systems of record with no
 * distributed transaction between them.
 *
 * The lesson it owns is reversibility. Accuracy is not the binding problem: a
 * plan that is ninety per cent right and applied cleanly can be corrected,
 * while a plan that is entirely right and applied halfway cannot. So the design
 * question is what a chain of writes leaves behind when it stops in the middle,
 * and the answer that reorganises everything is that reversibility is a
 * property of the action type rather than a judgement made at runtime — which
 * lets a plan be ordered so that the steps with no undo happen last.
 *
 * Two mechanisms everyone reaches for are necessary and insufficient here. A
 * human gate on every action is unaffordable in time and degrades into
 * rubber-stamping. A saga with compensating transactions is correct for every
 * step that has an inverse, and several here do not: a vendor who has begun
 * cutting steel, a crew that has gone to another site, and fourteen firms who
 * have been told. Information leaving the fence is a write with no undo at all.
 *
 * Constructed scenario. Figures are assumptions chosen so the constraints bind;
 * where a number carries architectural weight the section using it shows the
 * derivation and says what changes if it is wrong.
 */
const caseStudy: CaseStudy = {
  slug: "agentic-turnaround-execution",
  order: 6,
  title: "Agentic Turnaround Execution",
  subtitle:
    "An agent that writes to the systems of record during a 26-day shutdown, where the design question is not whether the plan is right but what a half-applied chain of writes leaves behind.",
  industry: "Energy · Heavy industry",
  domain: "Turnaround execution · Maintenance operations",
  status: "In analysis",
  statusNote:
    "Discovery and architecture complete. The reversibility register the whole design keys on does not exist in any organisation I have worked with, so the classification here is reasoned rather than sourced — which is why this is in analysis and not an architecture note.",
  architectureComplexity: 5,
  complexityLabel:
    "Very high — writes to four systems of record with no distributed transaction, actions with no inverse, and one live window every four years",
  duration: "Assumed programme length: 14 months across one turnaround cycle",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: true,
  shortSummary:
    "The first note here where the system acts instead of answering — raising requisitions, moving the schedule, standing crews down, telling contractors. Accuracy turns out not to be the binding problem. A plan that is ninety per cent right and applied cleanly can be corrected; one that is entirely right and applied halfway cannot. So reversibility, not confidence, decides what needs a human, and the plan is ordered so the steps with no undo happen last.",
  impact:
    "Target: emergent finding to applied change 5 h → < 30 min · zero duplicate or orphaned writes · every irreversible action gated, priced and attributable",
  tags: ["Agentic AI", "Reversibility", "Idempotency", "Systems of record", "Azure"],

  techGroups: [
    {
      group: "AI",
      items: ["Azure OpenAI", "Typed action schema", "Replay evaluation harness", "Prompt and model versioning"],
    },
    {
      group: "Orchestration",
      items: ["Azure Durable Functions", "Service Bus", "Action executor", "Compensation runner"],
    },
    { group: "Backend", items: ["Python", "FastAPI", "PostgreSQL (plan log)", "Redis"] },
    {
      group: "Systems of record",
      items: ["SAP S/4HANA (PM · MM)", "Primavera P6", "Permit-to-work system", "Contractor portals"],
    },
    {
      group: "Governance",
      items: ["Entra ID workload identity", "Per-plan spend ceilings", "Immutable action log", "Reconciliation service"],
    },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario, used to reason through a class of problem rather than to describe a real engagement. The figures are assumptions chosen so the constraints bind; where one carries architectural weight, the section using it shows the derivation and says what changes if it is wrong.\n\nScenario: a gas processing plant, twelve days into a twenty-six-day major turnaround on Train 2, with roughly 1,100 contractor personnel on site from fourteen firms. Base scope is about 9,400 work orders, and I have assumed 18% of what actually gets executed was not in the plan when it started — about 1,700 emergent findings, or sixty-five a day. An inspector opens a line, finds through-wall pitting, and the plan is now wrong in four systems at once.\n\nEvery published note on this site has the system produce an answer that a person then acts on. This one has the system act: it raises requisitions, moves activities in the schedule, stands crews down and tells contractors. That single change moves where the difficulty sits. Accuracy stops being the interesting problem, because a plan that is ninety per cent right and applied cleanly is recoverable and a plan that is entirely right and applied halfway is not.\n\nSo the question is what a chain of writes leaves behind when it stops in the middle. Four systems of record, no distributed transaction between them, and several steps with no inverse: a requisition released to a vendor who has begun cutting, a crew stood down who has gone to another site, and the one nobody classifies as a write at all — fourteen firms who have been told. The honest verdict is that the transactional design is the whole of the work and the language model is the least difficult component in it.\n\nThis is written in July 2026, and it is worth naming what agentic means at this moment, because the note is largely an argument against it. The frameworks available now are good at the loop — plan, call a tool, observe, continue — and close to silent on what that loop owes you when its fourth call times out and nobody knows whether a €210,000 requisition exists.",
    verdict:
      "Reversibility, not confidence, decides what needs a human — and the plan is ordered so the steps with no undo happen last.",
    highlights: [
      {
        k: "Business driver",
        v: "An emergent finding waits about five hours for a decision, and on the critical path an hour is priced at €20,000",
      },
      { k: "Hard constraint", v: "Four systems of record, no distributed transaction, and no prospect of one" },
      { k: "The design core", v: "Reversibility is a property of the action type, fixed before the plan runs" },
      {
        k: "The part usually missed",
        v: "Telling a contractor is a write, and it is the one with no inverse of any kind",
      },
      {
        k: "What would break it",
        v: "If a shutdown hour were worth €500 rather than €20,000, a human gate on every action would be affordable and almost none of this would be needed",
      },
    ],
  },

  businessContext: {
    narrative:
      "Scope is frozen months in advance, materials are staged, crews are contracted to a day-by-day plan, and then the plant is opened up and reality disagrees. That disagreement — emergent scope — is not a failure of planning. It is what inspection is for.\n\nTwo numbers carry the architectural weight and the business case conflates them. The first is volume: 18% emergent scope against 9,400 base work orders is about 1,700 findings across twenty-six days, so sixty-five a day, arriving in bursts after each opening milestone. A planning cell of four cannot triage that at any depth, which is why findings are batched into the 06:00 and 18:00 coordination meetings and why the median wait from finding to decision is around five hours, worse overnight.\n\nThe second is what the wait costs, and the arithmetic flatters itself unless it is done carefully. The operator's own figure for a day of extended shutdown is €480,000, or €20,000 an hour. But five hours of waiting only becomes five hours of shutdown if the finding sits on the critical path with its float already spent — usually true in the back half of a turnaround, rarely in the first week, so I have assumed 15% of findings qualify. And the saving does not sum: two crews idle in the same three hours cost that three hours once. The honest bound is the number of distinct critical-path interruptions, which I have put at twenty to thirty at an average of three avoidable hours each — two to four days of a twenty-six-day shutdown, offered as a range I would not defend at the midpoint.\n\nOne feature of this setting has no equivalent elsewhere on this site: the event happens once every four years. There is no control group and no second run, and the next turnaround will have different scope, contractors and plant. Nothing here can be shipped and then learned from in production, because production occurs for twenty-six days and then not again for a presidential term.",
    companyFacts: [
      { k: "Turnaround duration, planned", v: "26 days" },
      { k: "Base scope", v: "~9,400 work orders" },
      { k: "Emergent scope, assumed", v: "~18% — about 1,700 findings, or ~65 a day in bursts" },
      { k: "Touching the critical path, assumed", v: "~15%, so about ten a day" },
      { k: "Contractor personnel at peak", v: "~1,100 across 14 firms" },
      { k: "Firms reachable programmatically", v: "4 of 14 — the rest by email to a named coordinator" },
      { k: "Day of extended shutdown, operator's figure", v: "€480,000, or about €20,000 an hour" },
      { k: "Finding to decision today", v: "~5 hours, worse overnight" },
      { k: "Systems that have to agree", v: "4 — work orders, materials, schedule, permits" },
      { k: "How often the event happens", v: "Once every four years" },
    ],
    drivers: [
      "Emergent scope decided in twice-daily batches, while the crews it affects are standing on the job now.",
      "Duplicate and orphaned commitments found in the post-turnaround reconciliation, months after the money left.",
      "Crews idle because a change reached their coordinator after their shift had started.",
      "The previous turnaround overran by nine days, and the review attributed most of that to how long emergent scope took to work through the plan rather than to the work itself.",
    ],
    constraints: [
      "SAP S/4HANA and Primavera P6 remain the systems of record. Neither will be replaced or fronted by anything.",
      "No distributed transaction exists across the four systems, and none can be built.",
      "The permit-to-work system is out of bounds to automation — it is the isolation authority.",
      "Financial segregation of duties applies to the agent exactly as it applies to a person.",
      "The planning lead edits the schedule continuously and will not accept a lock on it.",
      "There is one live window every four years, so nothing can be learned in production and fixed afterwards.",
    ],
    existingStack: [
      "SAP S/4HANA (PM · MM)",
      "Primavera P6",
      "Permit-to-work system",
      "Microsoft 365",
      "Azure",
      "Power BI",
    ],
  },

  stakeholders: [
    {
      role: "Turnaround manager",
      interest: "The shutdown ends on the date it committed to.",
      concern: "An automated change that adds a day, and a review that traces it to a decision nobody made.",
      influence: "Budget gate",
    },
    {
      role: "Turnaround planning lead",
      interest: "A schedule that reflects reality by mid-morning rather than by the evening meeting.",
      concern: "Something editing the schedule under an identity that is not a person's.",
      influence: "Adoption make-or-break",
    },
    {
      role: "Procurement and contracts",
      interest: "No duplicate commitments, and no commitment that cannot be attributed to an approver.",
      concern: "A requisition raised and released by the same automated identity.",
      influence: "Owns the reversibility facts",
    },
    {
      role: "Area superintendents",
      interest: "Fewer crews standing around waiting for a decision that has already been made somewhere.",
      concern: "Being asked to approve things they cannot read on a phone in a hard hat.",
      influence: "They are the gate",
    },
    {
      role: "Contractor coordinators",
      interest: "Knowing about a change before their crew walks to the wrong job.",
      concern: "A stream of changes that are then reversed, which costs them more credibility than late news.",
      influence: "Where a reversal actually lands",
    },
    {
      role: "SAP and applications team",
      interest: "Nothing writing to SAP that they cannot trace, throttle or switch off.",
      concern: "Records created outside the normal control path, discovered at period close.",
      influence: "Compliance gate",
    },
    {
      role: "HSE and the permit authority",
      interest: "No schedule change that quietly invalidates an isolation or a permit prerequisite.",
      concern: "Automation reaching anything permit-related at all.",
      influence: "Veto power",
    },
  ],

  discovery: {
    intro:
      "Discovery went looking for the usual thing — how good does the plan have to be — and found that nobody could answer a more basic question. Asked which of these actions can be undone and what the undo costs, engineering, procurement and contracts gave three different answers, and all three were partly right. That table does not exist in any organisation I have worked with, and the design that follows is mostly a consequence of assembling it.",
    groups: [
      {
        audience: "Turnaround planning lead",
        goal: "Understand how emergent scope actually moves through the plan today, and where the hours go.",
        questions: [
          "Walk me through a finding from the moment the inspector reports it.",
          "How long before the schedule reflects it?",
          "Who else is editing the schedule while you are?",
          "What happens to a change decided at 02:00?",
          "When a change turns out to be wrong, how do you back it out?",
        ],
        answers: [
          "A finding is triaged at the next coordination meeting, so the median wait is about five hours.",
          "The schedule has no lock and is edited continuously by three people; conflicts are resolved by conversation.",
          "Overnight findings usually wait for the 06:00 meeting, which is the worst case and not a rare one.",
          "Backing a change out is done by hand, in whichever systems somebody remembers were touched.",
        ],
      },
      {
        audience: "Procurement and contracts",
        goal: "Establish what a commitment actually costs to reverse, and who knows.",
        questions: [
          "Can a released requisition be cancelled?",
          "Does that answer depend on anything?",
          "What does standing a contractor crew down cost?",
          "Who holds the cancellation terms for the long-lead vendors?",
          "Has anyone ever written this down in one place?",
        ],
        answers: [
          "Yes and no: cancellable at an assumed 18% charge after release, and not cancellable at all once material has been cut to size.",
          "So reversibility depends on the vendor and on how far that vendor has got — it is time-dependent, not a fixed property.",
          "A twelve-person crew stood down returns in about three days, with a remobilisation charge in the contract.",
          "The terms sit in individual contracts, and no consolidated view exists. The answer took four days to assemble for six vendors.",
        ],
      },
      {
        audience: "Area superintendents",
        goal: "Find out what an approval can realistically be during execution.",
        questions: [
          "Where are you when a decision is needed?",
          "How long would you spend reading a proposed change?",
          "What do you actually need to see to say yes?",
          "What would make you stop reading these altogether?",
          "Would you rather approve a plan or approve each step of it?",
        ],
        answers: [
          "On the unit, on a phone, with about twenty seconds of attention and an interruption already in progress.",
          "What is needed is the consequence and the price, not the reasoning: what changes, what it costs, what breaks if I say no.",
          "Any volume of approvals turns into reflexive tapping within a day, and everyone knew it.",
          "One decision per finding, never per step — nobody will approve seven things about one hole in a pipe.",
        ],
      },
      {
        audience: "Contractor coordinators",
        goal: "Understand what happens outside the fence when a change is communicated.",
        questions: [
          "How does a schedule change reach you today?",
          "What do you do with it in the first ten minutes?",
          "What happens if it is retracted an hour later?",
          "How many of your firms could receive this automatically?",
        ],
        answers: [
          "Four of the fourteen firms have a portal that could take a change programmatically; the rest are email to a named person.",
          "A change is acted on immediately — crews are moved, transport is rebooked, sometimes a shift is re-planned.",
          "A retraction costs more than late news. The crew has already moved and the coordinator's standing with them is spent.",
        ],
      },
      {
        audience: "SAP and applications team",
        goal: "Establish what the systems of record will tolerate and what they can guarantee.",
        questions: [
          "Can a write be made idempotent from outside?",
          "How would we know whether a call that timed out succeeded?",
          "Is there a provisional state for a requisition — raised but costing nothing?",
          "What controls apply to a non-human identity?",
          "Can we subscribe to changes, or do we have to poll?",
        ],
        answers: [
          "An external reference can be written and searched, which is enough for an idempotency check but not free of race conditions.",
          "There is no provisional requisition. A requisition either exists or does not, which removes the obvious two-phase design.",
          "Segregation of duties applies to a service identity as it does to a person, and the audit team will test it.",
          "Change feeds exist for some objects and not for the ones we need most, so reconciliation has to poll.",
        ],
      },
      {
        audience: "HSE and the permit authority",
        goal: "Find the boundary automation must not cross, and why.",
        questions: [
          "Which of these actions could affect an isolation?",
          "Can a schedule change invalidate a permit that is already issued?",
          "Where should the line be?",
        ],
        answers: [
          "Re-sequencing can invalidate an issued permit's prerequisites, which makes the schedule a safety-relevant object.",
          "Permit prerequisites must be checked by deterministic rules, never by a model, and the check must precede the human gate.",
          "The line is that the permit system is read, never written. That was non-negotiable and I did not try to move it.",
        ],
      },
    ],
    assumptions: [
      "The reversibility of every action type can be established as a contractual fact and recorded before the build starts. This is the assumption the entire design rests on.",
      "SAP's external-reference search is reliable enough, under turnaround load, to serve as the idempotency check.",
      "The previous turnaround's finding log is complete enough to replay as an evaluation set.",
      "A superintendent will answer a gated decision on a phone within minutes during execution.",
      "18% emergent scope, taken from a single previous event.",
      "€480,000 per day of deferred production, taken as given from the planning team rather than derived.",
      "Contractor coordinators will accept programmatic change notices for the four firms whose portals allow it.",
    ],
    implications: [
      {
        finding: "Reversibility depends on the vendor and on how far that vendor has got",
        implication:
          "A class is not a permanent property of an action type but a property of the type in a context, with an expiry. An order that was compensable at 09:00 is irreversible by 14:00 because fabrication started. So the class is resolved at plan time against contract terms and vendor state, and it defaults to irreversible when unknown.",
      },
      {
        finding: "Nobody owns the answer to what an undo costs",
        implication:
          "The reversibility register becomes the first deliverable and it is not a software artefact. It is a table owned jointly by procurement, contracts and engineering, and the architecture is unbuildable without it — which makes phase 0 a negotiation rather than a discovery exercise.",
      },
      {
        finding: "There is no provisional requisition",
        implication:
          "The obvious design — hold everything, do the reversible work, then confirm the lot — is unavailable, because the systems of record have no reservation primitive that costs nothing. Ordering the plan by increasing irreversibility is the substitute, and it is a weaker one.",
      },
      {
        finding: "A superintendent has twenty seconds, and any volume of approvals becomes reflexive tapping within a day",
        implication:
          "One gate per finding, never per action, showing consequence and price rather than reasoning. The gate has to be rare to be real, which makes the value ceiling deciding how many occur a capacity decision as much as a risk one — and makes fast approvals a monitored defect signal rather than a success metric.",
      },
      {
        finding: "The schedule is edited continuously and has no lock",
        implication:
          "Optimistic concurrency on the schedule version, and a plan computed against a state that has since moved expires rather than resumes. Retry is not resume — a plan is only valid against the state it was computed on.",
      },
      {
        finding: "A retraction costs a coordinator more than late news",
        implication:
          "Notification is the final step of every plan and is sent only once every preceding write is confirmed. The system never announces an intention, only an applied fact.",
      },
      {
        finding: "A schedule change can invalidate an issued permit's prerequisites",
        implication:
          "Permit and isolation checks are deterministic rules evaluated before the plan is shown to anyone, and the permit system is read-only to this one.",
      },
      {
        finding: "A call that times out leaves an unknown, not a failure",
        implication:
          "Intent is written to the plan log before the call rather than after it, every write carries an idempotency key, and the resolution of an ambiguous result is a search rather than a retry. Without the pre-written intent a lost reply is indistinguishable from a call that never happened.",
      },
    ],
    businessRisks: [
      "A duplicated long-lead commitment — the same €210,000 package ordered twice because a reply was lost",
      "A half-applied plan nobody owns, discovered at reconciliation months later",
      "Contractor crews acting on a change that is subsequently reversed",
      "An automated action that collapses segregation of duties and turns up in an audit finding",
      "A turnaround overrun attributed to the system, in a review with no control group to argue against",
    ],
    technicalConstraints: [
      "Four systems of record with no distributed transaction and no reservation primitive",
      "Idempotency achievable only through an external reference plus a search, with a race window",
      "Change feeds absent for the objects that matter most, so reconciliation polls",
      "Ten of fourteen contractor firms reachable only by email",
      "One live window every four years, so evaluation has to be done against replayed history",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes for the front door, and it is the least difficult part of the system.",
      body:
        "The input is free text written under time pressure by inspectors from fourteen firms with no shared vocabulary: \"through-wall pitting on the 6-inch line d/s V-201, recommend replace spool 2m.\" Turning that into the work it implies — a spool, a welder, a radiographer, scaffold, an isolation, a material call-off — is exactly the step no rules engine has ever survived, because the phrasing is unbounded and the vocabulary changes with the crew.\n\nEverything downstream of that is deterministic or transactional. Material availability, permit prerequisites, float on the affected activities, duplicate detection: all checkable facts, and all better checked by rules than by a model. So the model interprets and proposes, and the interesting engineering is entirely in what happens to the proposal afterwards. I would rather say that plainly here than let the note imply the model is the achievement.",
    },
    automationAlternative: {
      verdict: "Most of the value is deterministic, and only the free-text front door is not",
      canAutomate: [
        "Material availability and reservation against stock",
        "Permit prerequisite and isolation-conflict checks",
        "Critical-path and float recomputation for a proposed change",
        "Duplicate requisition and duplicate work-order detection",
        "Reconciliation of believed state against each system of record",
      ],
      cannotAutomate: [
        "Reading an inspector's shorthand and knowing what trades, materials and permits it implies",
        "Explaining a proposed change to a superintendent in a form that can be checked in twenty seconds",
        "Deciding whether the work should be done in this shutdown at all — that is a technical authority's judgement",
      ],
      body:
        "A version of this could have been built ten years ago with rules and a workflow engine, and the reason it was not is the front door. The finding arrives as prose, and everything downstream needs structure. That is the gap the model closes, and it is worth being precise that this is the whole of its contribution.",
    },
    valueAreas: [
      "Emergent findings analysed and applied in minutes rather than at the next coordination meeting",
      "Changes applied consistently across four systems instead of in whichever ones somebody remembered",
      "Irreversible commitments made deliberately, with their price visible at the moment of approval",
      "A complete record of what was changed, by whose authority, against which state — available during the event rather than after it",
    ],
    outOfScope: [
      "Optimising the turnaround schedule. The subject here is applying a change correctly, not finding a better plan.",
      "Writing to the permit-to-work system in any form",
      "Deciding whether emergent work is done in this shutdown or deferred",
      "Anything touching isolation boundaries or safety-critical sequencing",
      "Commercial negotiation with contractors or vendors",
    ],
    conclusion:
      "Positioned as an execution assistant with a bounded vocabulary of actions, not as a planner. The scope decision that took longest was to leave schedule optimisation out entirely: it is the more attractive project, it is what the phrase agentic planning suggests, and it would have produced a note about solvers. The binding constraint in a turnaround is not the quality of the plan but the latency and integrity with which a change is applied — so that is what this is about.",
  },

  alternatives: [
    {
      option: "A human approves every action",
      verdict: "Set aside, and it is the one every safety case will ask for",
      caseFor:
        "It needs no reversibility analysis at all, because the approver carries the judgement. It is trivially defensible in a post-event review, it is what the audit team would design, and a bad model proposal can never reach a system of record. For a first release into a safety-relevant environment that is a strong position.",
      caseAgainst:
        "It is unaffordable in time and, worse, it does not fail loudly. Sixty-five findings a day at perhaps four actions each is over two hundred approvals, landing on superintendents who have twenty seconds of attention. Discovery was unanimous and unprompted on what happens next: reflexive tapping within a day. That is not a weaker control than the design here, it is a fabricated one — it manufactures an audit trail of decisions nobody made, and the review afterwards finds approvals timestamped four seconds apart.",
    },
    {
      option: "Propose only — the agent drafts, a person executes",
      verdict: "Set aside as a destination, adopted as phase 2",
      caseFor:
        "No write path, so no transactional problem and no reversibility problem. It still removes the analysis work, which is where most of the five hours actually goes, and it is genuinely the highest-value-per-unit-risk version of this system. It is also the only version that can be trialled in a short outage without a full transactional design behind it.",
      caseAgainst:
        "It leaves the errors exactly where they are. A planner re-typing a plan into four systems under time pressure at 03:00 is the source of the duplicate and orphaned commitments the post-turnaround reconciliation keeps finding, and it is a large share of the remaining latency. It also cannot enforce ordering: a human applies steps in whatever order the screens allow, which is usually the order that puts the expensive write first.",
    },
    {
      option: "A full saga with compensating transactions",
      verdict: "Adopted for one class of action, rejected as the frame",
      caseFor:
        "It is the textbook answer to exactly this shape of problem, the literature is mature, and it is correct wherever a compensation exists. Every step gets an inverse, failure triggers unwinding, and the system returns to a consistent state without anybody being asked anything.",
      caseAgainst:
        "It assumes every action has an inverse, and here several do not. A vendor who has begun cutting material to size will not be uncutting it. A crew stood down has gone to another site. Fourteen firms who have been told cannot be untold — a correction is a second message, not an undo. A framework implying coverage it does not have is worse than none, because it produces the same half-applied state with the comfort of a pattern name over it. Adopted for the compensable class; the real content of this design is the classification of what sits outside it.",
    },
    {
      option: "Typed actions, ordered by irreversibility, with gates placed by class",
      verdict: "Direction taken in this note",
      caseFor:
        "The set of things the system can possibly do is enumerable, reviewable and small, and each action type carries its reversibility class as a property of the type rather than as a runtime judgement. Ordering a plan so the steps with no undo come last costs nothing and means any failure mid-chain leaves only reversible work applied. Gates then land where they are worth their cost: on the writes that cannot be taken back.",
      caseAgainst:
        "It constrains what a plan can be. Some genuinely need an irreversible step first — a long-lead order has to exist before the schedule can be re-planned around its delivery date — and those cannot be ordered safely, so they escalate whole and lose the latency benefit. The vocabulary has to be maintained by people who do not write software, and every addition to it is a governance event. And the classification is only as good as the register behind it: one action wrongly marked compensable and the design has quietly given away the guarantee it exists to provide.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Reversibility is a property of the type, not a judgement",
        d: "Every action the system can take is one of a small number of declared types, and each type carries its class — reversible, compensable, irreversible — resolved against contract terms at plan time. The model never decides how dangerous its own proposal is.",
      },
      {
        t: "One-way doors last",
        d: "A plan is executed in order of increasing irreversibility, so any failure mid-chain leaves only reversible work applied. This costs nothing and it is the single most valuable structural decision in the design.",
      },
      {
        t: "The plan lives in a durable log, never in the model's context",
        d: "After a restart the system has to be able to say what it already did. A plan held in a conversation cannot answer that, which makes it unusable for anything that writes to a system of record.",
      },
      {
        t: "Every write is idempotent, because the failure is ambiguity",
        d: "The common failure is not a rejected call but one whose reply is lost. Intent is written before the call, every write carries a key derived from the finding and the step, and an unknown outcome is resolved by searching rather than retrying.",
      },
      {
        t: "A stuck plan is a state with an owner",
        d: "When a chain halts, the output is a handover: what applied, what did not, and who resolves it. An unowned half-applied plan is the failure this design exists to prevent — it is not an error condition but a designed outcome with a name on it.",
      },
      {
        t: "The gate is placed by cost of undo, not by confidence",
        d: "A confident irreversible action still needs a person. A doubtful reversible one does not. Confidence is the wrong axis, and using it is how systems end up gating the cheap decisions and automating the expensive ones.",
      },
      {
        t: "Nothing leaves the fence until everything inside it is confirmed",
        d: "Notification is the last step of every plan. Information reaching fourteen contractor firms is a write with no inverse of any kind, so it is never sent on an intention.",
      },
    ],
    flowDiagram: {
      id: "finding-to-applied-change",
      kind: "blocks",
      title: "From finding to applied change",
      caption:
        "Two exits, both designed. The gate refuses before anything is written at all; a step that fails mid-chain produces a named owner and a statement of what did and did not apply, rather than an error. Notification sits last because it is the one write with no undo of any kind — and because everything before it is still recoverable.",
      nodes: [
        { id: "finding", t: "Finding raised", sub: "free text, on the tools", col: 0, row: 0 },
        { id: "plan", t: "Plan proposed", sub: "typed actions, ordered", col: 1, row: 0, accent: true },
        { id: "checks", t: "Constraints checked", sub: "permits · stock · float", col: 2, row: 0 },
        { id: "gate", t: "Gated where no undo", sub: "one card, with a price", col: 3, row: 0, accent: true },
        { id: "declined", t: "Nothing applied", sub: "plan discarded whole", col: 1, row: 1 },
        { id: "apply", t: "Applied in order", sub: "reversible steps first", col: 3, row: 1, accent: true },
        { id: "stuck", t: "Stuck, with an owner", sub: "what applied, what did not", col: 1, row: 2 },
        { id: "notify", t: "Contractors told", sub: "last, and never recalled", col: 3, row: 2 },
      ],
      edges: [
        { from: "finding", to: "plan" },
        { from: "plan", to: "checks" },
        { from: "checks", to: "gate" },
        { from: "gate", to: "apply" },
        { from: "gate", to: "declined", label: "gate says no", dashed: true },
        { from: "apply", to: "notify" },
        { from: "apply", to: "stuck", label: "step fails", dashed: true },
      ],
    },
  },

  architecture: {
    overview:
      "A finding intake, a planner that emits typed actions, deterministic constraint checks, a gate router, and a durable executor that applies actions in class order against four systems of record.\n\nThe component that does not appear in a conventional agent design is the reversibility register, and it is not software. It is a table mapping each action type, vendor and contract to what an undo costs and how long it remains possible, owned jointly by procurement, contracts and engineering. Planner, gate router and executor all read it. Without it the system has no basis for deciding what may be automatic, and the honest position is that the programme cannot start until it exists.\n\nThe second departure is that the model holds no credentials. It emits a plan — an ordered list of typed action objects — and the executor is the only component with write access. That inversion is what makes the blast radius enumerable: the worst a crafted or confused finding can produce is a plan made of declared action types, each already carrying its class, its ceiling and its gate requirement. Tool-calling straight into SAP would have been faster to build and would have made the answer to what can this thing do depend on what the model tries next.\n\nThe third is negative. There is no resume. A plan carries the state versions it was computed against, and if the schedule has moved it expires and the finding is re-planned — because resuming a stale plan produces changes that are individually correct and jointly wrong, which is the hardest class of error to find afterwards.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption:
          "The executor is the only component holding write credentials, and the reversibility register — a table owned by procurement, not a service — is what tells it which actions may be applied without asking.",
        rows: [
          {
            label: "Intake",
            nodes: [
              { t: "Finding intake", sub: "Teams · portal · handheld" },
              { t: "Context assembly", sub: "work orders · float · stock" },
            ],
          },
          {
            label: "Planning",
            nodes: [
              { t: "Azure OpenAI", sub: "proposes typed actions", accent: true },
              { t: "Constraint checker", sub: "deterministic rules", accent: true },
              { t: "Consequence summary", sub: "what changes, what it costs" },
            ],
          },
          {
            label: "Decision",
            nodes: [
              { t: "Gate router", sub: "by class, not confidence", accent: true },
              { t: "Superintendent card", sub: "Teams, one per finding" },
            ],
          },
          {
            label: "Execution",
            nodes: [
              { t: "Durable orchestrator", sub: "plan log is the authority", accent: true },
              { t: "Action executor", sub: "idempotent writes only", accent: true },
              { t: "Compensation runner", sub: "where an inverse exists" },
            ],
          },
          {
            label: "Systems of record",
            nodes: [
              { t: "SAP MM", sub: "materials · requisitions" },
              { t: "SAP PM", sub: "work orders" },
              { t: "Primavera P6", sub: "schedule, versioned" },
              { t: "Permit system", sub: "read only", muted: true },
              { t: "Contractor portals", sub: "4 of 14", muted: true },
            ],
          },
          {
            label: "Governance",
            nodes: [
              { t: "Reversibility register", sub: "owned by procurement", accent: true },
              { t: "Reconciliation service", sub: "belief against reality" },
              { t: "Immutable action log" },
              { t: "Spend ceilings", sub: "per plan · per day" },
            ],
          },
        ],
      },
      {
        id: "reversibility-classes",
        kind: "pipeline",
        title: "Four classes of action, and what the undo actually is",
        caption:
          "The classification is the design. Class decides whether an action may be automatic, what the gate has to show, and where the action sits in the plan's order — and it is a contractual fact with an expiry rather than a permanent property, since an order that was compensable this morning is not once fabrication has started.",
        lanes: [
          {
            label: "Reversible",
            steps: [
              "Reserve stock against a work order",
              "Reserve an own-force crew",
              "Create a draft schedule scenario",
              "Update a work order's status",
            ],
            note: "Applied without a gate and logged. The undo is a write of the same size, and nothing outside the fence has been told.",
          },
          {
            label: "Compensable, at a price",
            steps: [
              "Release a requisition to a vendor",
              "Stand a contractor crew down",
              "Cancel a scaffold booking",
              "Re-sequence an activity with float",
            ],
            note: "An inverse exists and it has a number attached: an assumed 18% cancellation charge, a remobilisation fee, three days of crew absence. The gate shows the number rather than asking for confidence.",
          },
          {
            label: "Irreversible in practice",
            steps: [
              "Confirm cut-to-size material",
              "Release a vendor to fabricate",
              "Commit a specialist crew window",
              "Consume a long-lead spare",
            ],
            note: "An inverse exists on paper and costs more than the delay it was avoiding. Treated as one-way: always gated, always priced, always last among the writes.",
          },
          {
            label: "Irreversible in principle",
            steps: [
              "Notify fourteen contractor firms",
              "Publish the revised day plan",
              "Send a change to a crew already mobilising",
            ],
            note: "No write reverses these, because what changed is what other people now believe. A correction is a second message, not an undo — which is why they are the final step of every plan and are never sent on an intention.",
          },
        ],
      },
      {
        id: "half-applied-chain",
        kind: "sequence",
        title: "A chain that stops at step four",
        caption:
          "The failure that matters is not a rejected call but an ambiguous one. Because everything before step four was reversible by design, the handover carries a single open question — whether a requisition exists — rather than a half-built change nobody can describe. The contractors were never told, since notification is last.",
        actors: ["Orchestrator", "Plan log", "SAP MM", "Primavera P6", "Superintendent"],
        messages: [
          {
            from: 0,
            to: 1,
            t: "Record the plan, its step order and the state versions it assumes",
            note: "Ordered reversible first. The schedule version is part of the plan, not context around it.",
          },
          { from: 0, to: 1, t: "Write intent for step 1 before calling anything" },
          { from: 0, to: 2, t: "Reserve stock, keyed on finding and step" },
          { from: 2, to: 0, t: "Reserved — reversible, no gate required" },
          { from: 0, to: 3, t: "Move two downstream activities with float" },
          { from: 3, to: 0, t: "Applied against schedule version 41" },
          {
            from: 0,
            to: 2,
            t: "Release the €210,000 requisition",
            note: "The first compensable step, and the first one a superintendent had to approve. Everything before it was free to undo.",
          },
          {
            from: 2,
            to: 0,
            t: "Timeout — no reply",
            note: "The ambiguous case. It is not known whether the requisition now exists, and a retry would be how it comes to exist twice.",
          },
          {
            from: 0,
            to: 0,
            t: "Halt the chain rather than retry, and resolve by searching",
            note: "The plan log already holds the intent, so the question is answerable. Without it, a lost reply and a call that never happened look identical.",
          },
          { from: 0, to: 2, t: "Search by external reference" },
          { from: 2, to: 0, t: "One requisition found, not two" },
          { from: 0, to: 1, t: "Mark step 4 applied, steps 5 to 7 not attempted" },
          {
            from: 0,
            to: 4,
            t: "Handover: what applied, what did not, and what is owed",
            note: "A named owner, not an alert. The plan stays open in their queue until they close it.",
          },
        ],
      },
    ],
    layers: [
      {
        name: "Planning",
        why: "The model's entire contribution sits here, and it is bounded: prose in, typed actions out. Keeping interpretation separate from execution is what makes the set of possible effects enumerable rather than emergent.",
      },
      {
        name: "Constraint checking",
        why: "Permit prerequisites, isolation conflicts, stock and spend ceilings are checkable facts, so they are checked by rules before a human is asked anything. A model reasoning about an isolation boundary is a slower rules engine with a worse audit trail.",
      },
      {
        name: "Gate routing",
        why: "The one place where the reversibility class turns into a decision about who is asked. Placing this by class rather than by confidence is the note's central claim, and putting it in its own component is what stops it being quietly re-litigated in a prompt.",
      },
      {
        name: "Durable execution and reconciliation",
        why: "The plan log is the authority on what the system believes it did, and recovering a half-applied chain depends entirely on that record existing before the calls rather than after them. Reconciliation sits with it because belief and reality diverge continuously while people edit the same objects — its divergence count is the honest measure of whether any of this works.",
      },
      {
        name: "The reversibility register",
        why: "Not software, and the thing without which nothing else can be designed. It is a contractual table with an owner in procurement, and every action type the system gains has to be added to it before the code that uses it ships.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Action interface",
      choice: "A closed vocabulary of typed actions; the model holds no write credentials",
      why: "It makes the set of things the system can possibly do enumerable and reviewable, and lets each action type carry its reversibility class, its ceiling and its gate requirement as properties of the type. Adding an action becomes a governance event with procurement in the room rather than a prompt edit.",
      alt: "Tool-calling directly against SAP and P6 — far faster to build, and the blast radius becomes whatever the model tries next.",
    },
    {
      layer: "Execution state",
      choice: "Durable orchestration with the plan log as the authority",
      why: "After a restart the system must be able to say what it already did, which is precisely the question a half-applied chain asks. A plan held in the model's context cannot answer it.",
      alt: "An agent loop carrying its state in the conversation — what most frameworks do as at mid-2026, and adequate until the first crash.",
    },
    {
      layer: "Write safety",
      choice: "Idempotency key per finding and step, with intent written before the call",
      why: "The common failure is an ambiguous result rather than a rejected one. Without a pre-written intent, a lost reply is indistinguishable from a call that never happened, and the retry is how €210,000 of material gets ordered twice.",
      alt: "Retry on timeout — correct in the ordinary case and expensive in exactly the case that matters.",
    },
    {
      layer: "Plan ordering",
      choice: "Steps sorted by increasing irreversibility; an unorderable plan escalates whole",
      why: "It costs nothing and it means any mid-chain failure leaves only reversible work applied. Where an irreversible step is genuinely a precondition, one human decision is cheaper than a partial application nobody can describe.",
      alt: "Execute in dependency order alone — the natural choice, and it puts the expensive write in the middle of the chain.",
    },
    {
      layer: "Concurrency",
      choice: "Optimistic concurrency on state versions; a stale plan expires rather than resumes",
      why: "The planning lead edits the schedule all day and there is no lock to take. A plan is only valid against the state it was computed on, and resuming it against a moved schedule produces changes that are individually correct and jointly wrong.",
      alt: "Lock the schedule for the duration of a plan — clean in theory, and unacceptable to the person whose job it is.",
    },
    {
      layer: "Contractor notification",
      choice: "The last step of every plan, sent only after every preceding write is confirmed",
      why: "Information leaving the fence is the one write with no inverse. Fourteen firms acting on a change that is then reversed costs a coordinator more than the same news arriving twenty minutes later.",
      alt: "Notify early so crews can prepare — better for the contractors, and it turns every upstream failure into a retraction.",
    },
    {
      layer: "Model role",
      choice: "Interpretation and proposal only, with deterministic rules for every hard constraint",
      why: "Permit prerequisites, stock and float are facts. Checking them with a model trades a reliable answer for an unreliable one and loses the audit trail in the process.",
      alt: "Let the model reason end to end — a much better demonstration, and one nobody can review.",
    },
    {
      layer: "Evaluation",
      choice: "Replay of the previous turnaround's finding log",
      why: "There is one live window every four years, so the alternative to replay is shipping untested into it. Roughly 1,700 historical findings give a real evaluation set, and the disagreements with what was actually done are the useful output.",
      alt: "Pilot in production — the normal approach, unavailable here because production happens for twenty-six days.",
    },
  ],

  security: {
    posture:
      "The security question here is not confidentiality. Nothing in this system is especially sensitive; the exposure is authority — a non-human identity that can commit money, move a safety-relevant schedule and tell a thousand contractors something.\n\nThe agent holds no authority a person does not. Every write executes under a workload identity scoped to the declared action vocabulary, and the executor rejects anything outside it, which makes the scope of possible harm a reviewable list rather than a question about the model.\n\nSegregation of duties is the property most easily lost by accident. An identity that can both raise a requisition and release it has collapsed a financial control that predates the system by decades — and the naive design does exactly that, silently, because both operations are just API calls to the same service. Raising is automated; releasing is gated and carries a named approver. The audit team will test this and should.\n\nThe third property is that untrusted text reaches a planner. A finding is free prose from any of fourteen firms, and a model turning prose into proposed actions is an obvious injection surface. The mitigation is structural rather than textual: the vocabulary bounds what can be proposed, the register decides what applies without asking, and per-plan ceilings bound the value. A crafted finding cannot invent an action type, and the worst it reaches is an action that already required a human.",
    controls: [
      {
        t: "Bounded action vocabulary",
        d: "The executor accepts only declared action types with validated parameters. An action the vocabulary does not contain cannot be attempted, whatever a plan says.",
      },
      {
        t: "Segregation of duties preserved",
        d: "The identity that raises a commitment cannot release it. Release is a gated action with a named human approver, recorded against the plan.",
      },
      {
        t: "Spend ceilings in the executor",
        d: "Per plan, per day and per turnaround, enforced in code rather than in a prompt — because a prompt is not a control and cannot be audited as one.",
      },
      {
        t: "Full attribution for every action",
        d: "Finding, plan version, model and prompt version, state versions, approver identity and timestamp. The post-turnaround review will ask why €400,000 of steel was ordered, and this is the only artefact that answers it.",
      },
      {
        t: "Named approvers, never role mailboxes",
        d: "An approval that cannot be attributed to a person is not an approval. Group inboxes are what turn a gate into a formality.",
      },
      {
        t: "Permit system read-only",
        d: "Enforced by credential scope, not by policy. The isolation authority is not a system this one writes to under any circumstances.",
      },
      {
        t: "Immutable action log with a switch off",
        d: "Every attempted and applied action written immutably, and a single control that stops the executor while leaving the planner running — so the fallback position is propose-only rather than nothing.",
      },
    ],
  },

  scalability: {
    body:
      "Throughput is not the problem, and designing for it would be effort spent where nothing is threatened. Sixty-five findings a day is a trivial computational load.\n\nWhat does not scale is human attention at the gate, and that is a capacity constraint dressed as a risk decision. Findings arrive in bursts after each opening milestone, so the peak matters far more than the mean, and the queue that forms is a queue of superintendents' twenty-second windows. The value ceiling deciding how many actions require a gate is therefore a capacity parameter as much as a safety one, and should be set with both in view.\n\nThe reversibility register scales badly for a different reason: it is contractual and local. A second plant inherits the parts that follow framework agreements and has to rebuild the rest. That is the real cost of taking this design anywhere else, and it is not a software cost, which makes it easy to leave out of a plan.\n\nReconciliation is the third. Divergence between believed and actual state grows with the number of concurrent human editors rather than with volume, and during a turnaround that number peaks exactly when the system is most active.",
    levers: [
      {
        t: "Gate queue routed by role and by criticality",
        d: "A superintendent sees only the findings in their area, ordered by critical-path impact, so the twenty seconds they have goes to the decision that costs most.",
      },
      {
        t: "The value ceiling as a capacity control",
        d: "Raising the ceiling reduces gate volume and increases automated exposure. Treating that as one dial with two effects is more honest than pretending it is only a risk setting.",
      },
      {
        t: "Burst absorption in the orchestrator",
        d: "Plans queue visibly and in order rather than in somebody's inbox, so a burst after an opening milestone becomes a visible backlog rather than five hours of silence.",
      },
      {
        t: "Register organised by contract, not by plant",
        d: "Reversibility follows the commercial agreement, so a new site under the same framework agreements inherits most of the classification instead of starting again.",
      },
      {
        t: "Replay harness as a permanent component",
        d: "Kept and re-run rather than built for one phase, because every prompt or vocabulary change needs re-testing against history and there is no production to test in.",
      },
    ],
  },

  costOptimization: {
    body:
      "The model is not the cost, and putting the figure on the table early is the fastest way to end an argument that would otherwise run for a month.\n\nOne plan takes an assumed 12,000 input tokens — the finding, the affected work orders, the schedule window, stock and the relevant contract terms — and returns about 1,200 output tokens. At an assumed €4 per million input and €18 per million output that is €0.048 plus €0.022, so roughly €0.07 a plan; with revisions, re-planning after expiry and reconciliation, call it €0.20 per finding all in. Across 1,700 findings that is about €340 for the entire turnaround.\n\nSet against the operator's own €480,000 for a day of extended shutdown, the total model spend for twenty-six days is worth about one minute of the event it protects. There is no cost optimisation problem here worth solving, and saying so is more useful than a lever list about model tiers.\n\nThe money goes elsewhere: four integrations, an executor that cannot be demonstrated to anybody, a reconciliation service whose output is a number that should be zero, and seven weeks of procurement, contracts and engineering time producing a table. That last item is the highest-leverage spend in the programme and the hardest to defend in a budget conversation, because it produces nothing anybody can look at.\n\nOne caution on the two price lines: they are assumptions anchored to hosted pricing as it stood in mid-2026, not a quote. The durable part is the token counts and the formula — recompute the euros against whatever the chosen model costs on the day.",
    levers: [
      {
        n: "01",
        t: "Do not optimise what costs €340",
        d: "Tier routing, prompt trimming and caching are all available and all pointless at this volume. The attention belongs on the executor, where a single mistake is a five-figure number.",
      },
      {
        n: "02",
        t: "Spend the ceilings, not the tokens",
        d: "The per-plan and per-day value ceilings cap procurement exposure, which is where the euros actually are. A ceiling set too high is a far more expensive mistake than a model tier chosen badly.",
      },
      {
        n: "03",
        t: "Budget the replay as engineer-days, not compute",
        d: "A full replay of 1,700 historical findings costs about €120 in tokens and several weeks of somebody reading the disagreements. The second number is the one that gets left out of the plan.",
      },
      {
        n: "04",
        t: "Fund the register explicitly",
        d: "Seven weeks of procurement, contracts and engineering time producing a table. If it is not a funded deliverable with a named owner it becomes a side task and the design loses its foundation.",
      },
      {
        n: "05",
        t: "Buy a hold rather than design around its absence",
        d: "A priced 48-hour hold negotiated with the two largest long-lead vendors would remove the ordering constraint this design is built around. A commercial change that deletes architectural work is a trade worth looking for and rarely available.",
      },
    ],
    model: [
      { k: "Findings in a turnaround, assumed", v: "~1,700 emergent, from the previous event's log" },
      {
        k: "Input tokens per plan, assumed",
        v: "~12,000 — finding, affected work orders, schedule window, stock, contract terms",
      },
      { k: "Output tokens per plan, assumed", v: "~1,200 — a typed plan and a consequence summary, not an essay" },
      { k: "Input price, assumed", v: "€4 per million — hosted pricing as it stood in mid-2026" },
      { k: "Output price, assumed", v: "€18 per million — output runs several times input across every tier" },
      { k: "Cost per plan", v: "~€0.07, which is what the four lines above multiply out to" },
      { k: "All in per finding", v: "~€0.20, allowing for revisions, expiry re-planning and reconciliation" },
      { k: "Model spend for the whole turnaround", v: "~€340" },
      { k: "One day of extended shutdown", v: "€480,000 — the operator's own figure, about €20,000 an hour" },
      { k: "So", v: "The entire model spend is worth about one minute of the event it protects" },
      {
        k: "Where the money actually goes",
        v: "Four integrations, an executor nobody can demo, and seven weeks assembling a table of cancellation terms",
      },
      {
        k: "Price basis",
        v: "Recompute rather than trust. The token counts and the formula are the durable part; the two price lines are the first thing to check.",
      },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "The same commitment raised twice after an ambiguous write",
      severity: "Critical",
      consequence: "A €210,000 long-lead package ordered twice, found weeks later at reconciliation",
      mitigation:
        "Intent written to the plan log before the call, an idempotency key derived from finding and step, and resolution of an unknown outcome by searching the external reference rather than retrying.",
    },
    {
      n: "02",
      risk: "A half-applied plan with no owner",
      severity: "Critical",
      consequence: "Material committed against a schedule change that was never made, and nobody holding the discrepancy",
      mitigation:
        "A halted chain produces a handover naming what applied, what did not and who resolves it. Open handovers block the next planning cycle rather than sitting in a log.",
    },
    {
      n: "03",
      risk: "An action classified as compensable that is not",
      severity: "High",
      consequence: "The design gives away its central guarantee silently, and finds out at the cancellation invoice",
      mitigation:
        "Classification is a contractual fact per vendor and contract, re-verified with an expiry, and it defaults to irreversible when unknown. The register has a named owner in procurement.",
    },
    {
      n: "04",
      risk: "Gates degrade into reflexive approval",
      severity: "High",
      consequence: "An audit trail of decisions nobody made, which is worse than no gate at all",
      mitigation:
        "Gate volume held down by value ceilings and one card per finding. The share of decisions returned in under twenty seconds is a monitored defect signal, not a performance metric.",
    },
    {
      n: "05",
      risk: "A plan applied against a state that has moved",
      severity: "High",
      consequence: "Changes that are individually correct and jointly wrong — the hardest error to see afterwards",
      mitigation:
        "State versions carried in the plan, optimistic concurrency on write, and expiry with re-planning instead of resumption.",
    },
    {
      n: "06",
      risk: "Contractors act on a change that is subsequently reversed",
      severity: "High",
      consequence: "Crews moved wrongly, and a coordinator who stops trusting the channel",
      mitigation:
        "Notification is the final step and is never sent on an intention. Where a plan must inform early it escalates to a person instead.",
    },
    {
      n: "07",
      risk: "Segregation of duties collapsed by the service identity",
      severity: "High",
      consequence: "An audit finding against a control that predates the system, and a suspended programme",
      mitigation:
        "Raise and release are separate actions with separate authority; release always carries a named human approver. Tested as a build gate.",
    },
    {
      n: "08",
      risk: "The reversibility register is never assembled",
      severity: "High",
      consequence: "The design reduces to the propose-only option, which is a smaller and different system",
      mitigation:
        "Phase 0 exists for this and its output is a gate on the rest of the programme. If it cannot be produced in seven weeks, that finding is reported rather than worked around.",
    },
    {
      n: "09",
      risk: "No way to demonstrate the system helped",
      severity: "Medium",
      consequence: "A successful programme that cannot be funded a second time, or a failed one that cannot be identified",
      mitigation:
        "Instrument what is attributable — latency, divergences, duplicate writes — and refuse to claim schedule savings that a single event with no control group cannot support.",
    },
  ],

  kpis: [
    {
      category: "Integrity",
      kpi: "Duplicate or orphaned writes found by reconciliation",
      baseline: "n/a",
      target: "0",
      why: "The failure this design exists to prevent. Reported as a count, because one duplicated long-lead commitment is a six-figure number and a rate hides it.",
    },
    {
      category: "Integrity",
      kpi: "Half-applied plans without a named owner",
      baseline: "n/a",
      target: "0",
      why: "A stuck plan is an acceptable state; an unowned one is not. This is the number that says whether the handover design actually works under load.",
    },
    {
      category: "Governance",
      kpi: "Irreversible actions applied without a recorded gate",
      baseline: "n/a",
      target: "0, as a build gate",
      why: "There is no acceptable non-zero reading. It blocks release the way a failing type check does.",
    },
    {
      category: "Speed",
      kpi: "Median time from finding to applied change",
      baseline: "~5 hours",
      target: "< 30 minutes",
      why: "The number that funds the programme, and the only one the turnaround manager asked about unprompted.",
    },
    {
      category: "Health",
      kpi: "Gate decisions returned in under twenty seconds",
      baseline: "n/a",
      target: "< 25%, and investigated when it rises",
      why: "A gate answered faster than its card can be read is not a gate. This is the failure mode the whole design is built to avoid, and it arrives wearing the costume of a good metric.",
    },
    {
      category: "Health",
      kpi: "Plans expired because a state version had moved",
      baseline: "n/a",
      target: "< 10%",
      why: "Expiry is designed, so a non-zero figure is expected. A rising one means the window between reading state and writing it has grown — a latency problem presenting as a correctness one.",
    },
    {
      category: "Quality",
      kpi: "Proposed plans corrected before approval",
      baseline: "n/a",
      target: "Measured, not minimised",
      why: "Driving this to zero would mean the gate had stopped being a review. The useful signal is what is being corrected, not how often.",
    },
    {
      category: "Quality",
      kpi: "Near-miss reports on proposed plans",
      baseline: "n/a",
      target: "Non-zero, and rising in the first week",
      why: "Zero reports about a system nobody trusts yet means people have stopped looking, not that there is nothing to find.",
    },
    {
      category: "Efficiency",
      kpi: "Critical-path hours spent waiting for a decision",
      baseline: "~3 h per interruption, assumed",
      target: "< 30 minutes",
      why: "The mechanism by which latency becomes money. Reported per interruption rather than summed, because concurrent delays overlap — and summing them is the mistake this programme's business case most wants to make.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Reversibility register and finding archaeology",
      duration: "7 weeks",
      goal: "Establish what each action costs to undo, and recover the previous turnaround's findings into something replayable.",
      activities: [
        "Action inventory with procurement, contracts and engineering in one room",
        "Cancellation, remobilisation and fabrication terms per vendor and contract",
        "Finding log recovered from three systems and a spreadsheet, and normalised",
      ],
      deliverables: [
        "Reversibility register with a named owner",
        "Replayable finding set from the last event",
        "Feasibility finding, including the case for stopping",
      ],
    },
    {
      phase: "P1",
      name: "Replay against history",
      duration: "10 weeks",
      goal: "Test the planner and the executor against 1,700 real findings, in a sandbox, before anything touches a live system.",
      activities: [
        "Typed action vocabulary and constraint checks",
        "Durable orchestrator, plan log and idempotent executor against sandbox systems",
        "Replay of the previous turnaround, with disagreements reviewed by planners",
      ],
      deliverables: [
        "Plan quality report against replayed history",
        "Executor with idempotency and compensation for the compensable class",
        "Injected-failure test suite covering ambiguous writes",
      ],
    },
    {
      phase: "P2",
      name: "Propose-only, in a live short outage",
      duration: "One 6-day outage, plus 6 weeks",
      goal: "Run against real findings with no write path, and find out whether the gate card is readable in twenty seconds on a unit.",
      activities: [
        "Live intake and planning during a short outage, writing nothing",
        "Gate cards issued for observation only, with response times measured",
        "Reconciliation service run in shadow against the four systems",
      ],
      deliverables: [
        "Gate card design validated on site",
        "Latency and readability findings",
        "Divergence baseline from shadow reconciliation",
      ],
    },
    {
      phase: "P3",
      name: "Bounded execution in the major turnaround",
      duration: "26 days, plus hardening",
      goal: "Apply reversible and gated compensable actions live, with the executor switch off available at all times.",
      activities: [
        "Reversible classes applied automatically; compensable and irreversible gated",
        "Contractor notification enabled for the four firms with portals",
        "Daily near-miss collection and divergence review during execution",
      ],
      deliverables: [
        "Live execution with full attribution",
        "Post-event review evidence, including what could not be attributed",
        "Register updates and vocabulary changes for the next cycle",
      ],
    },
  ],

  tailoring: [
    {
      parameter: "What an hour of the event is worth",
      hereValue: "~€20,000 an hour of extended shutdown, from the operator's own figure",
      altValue: "A few hundred euros an hour — a warehouse, a non-continuous plant, a maintenance backlog",
      architectureChange:
        "A human gate on every action becomes affordable, and with it almost everything expensive here disappears. The system collapses into the propose-only option: analyse the finding, draft the plan, let a person apply it.",
      why: "This is the parameter the whole design is bought with. Automating a write is only justified when the human's time in the loop costs more than the risk of the write, and below some value it plainly does not.",
    },
    {
      parameter: "Whether the systems of record offer a free provisional state",
      hereValue: "No — a requisition exists or it does not, and there is no costless hold",
      altValue: "A reservation primitive that can be taken and released at no charge",
      architectureChange:
        "Ordering by irreversibility stops being necessary, because everything can be held and confirmed together at the end. That is a genuine two-phase commit across the plan and a far simpler design than this one.",
      why: "Ordering is a workaround for a missing primitive, not a principle. If the source systems allowed holds I would build the simpler thing and this note would be about something else.",
    },
    {
      parameter: "How the outside world is told",
      hereValue: "Four of fourteen firms by API, the rest by email to a named person",
      altValue: "Every counterparty reachable programmatically, with a defined retraction",
      architectureChange:
        "Notification becomes a write like any other, with an inverse and a class. The irreversible-in-principle category empties out and the ordering constraint relaxes.",
      why: "The category that has no undo at all exists because information reaches people rather than systems. Where the counterparty is a system with a retraction protocol, that stops being true.",
    },
    {
      parameter: "How much scope emerges during the event",
      hereValue: "~18% of executed scope, about sixty-five findings a day",
      altValue: "A few per cent, on a recently inspected and well-characterised asset",
      architectureChange:
        "The volume never exceeds what the planning cell can triage properly, so the latency case evaporates. What remains is the integrity case — writes that are consistent across four systems — which is a smaller prize and a much smaller system.",
      why: "The automation argument here is made by volume, not by capability. At low emergent scope the humans are not the bottleneck and the honest answer is not to build this.",
    },
    {
      parameter: "Whether the previous event's findings were kept",
      hereValue: "Yes — about 1,700 records, in three places and partly free text",
      altValue: "No usable log; findings were handled and never recorded coherently",
      architectureChange:
        "Replay is impossible, so there is no evaluation before the one live window. I would not ship a writing agent into a once-in-four-years event with no prior evaluation, so the programme becomes propose-only for a full cycle while a log is built.",
      why: "The feasibility of this design rests on an archive nobody kept for this purpose. That is worth noticing in advance rather than in month four.",
    },
    {
      parameter: "How often the event recurs",
      hereValue: "Once every four years, twenty-six days at a time",
      altValue: "Continuous or rolling maintenance, with the same class of decision daily",
      architectureChange:
        "Nothing in the component design changes, but the delivery approach changes completely. With a daily feedback loop you ship narrow, measure and widen. With one window you have to be defensible before first use, which is why replay and injected-failure testing carry the weight that a pilot would carry elsewhere.",
      why: "Ship it and learn is not available here, and pretending otherwise is the most likely way this programme fails. The rarity of the event is a constraint on method rather than on architecture — and it is the one most often overlooked.",
    },
  ],

  counterpart: {
    slug: "ai-patient-communication-platform",
    note: "The two notes disagree about where a gate belongs, and the disagreement is the useful part. There, escalation is triggered by the model's uncertainty and that is the whole safety case. Here confidence is the wrong axis entirely: a perfectly confident action that cannot be undone still needs a person, and a doubtful one that can be undone does not. Reading them together shows that the gate's placement is a property of what the system does with its output, not of how sure it is.",
  },

  assumptionsToTest: [
    "That the reversibility register can be assembled at all is the assumption the whole design rests on. It requires procurement, contracts and engineering to agree on facts none of them owns jointly, and in discovery it took four days to answer for six vendors. If seven weeks turns out to be six months, the programme's shape changes and the honest move is to say so early.",
    "The €480,000 per day of deferred production is the planning team's figure, taken as given and not independently derived. Every judgement about which actions may be automatic rests on it.",
    "18% emergent scope comes from one previous turnaround. A single event is not a sample, and the figure moves with how long the asset has run and how thoroughly it was inspected last time.",
    "The previous finding log is assumed complete enough to replay. In practice the findings handled informally never reached it, which biases the replay toward the ones that went through process — that is, toward the easy ones.",
    "That a superintendent will answer a gate on a phone within minutes during execution is assumed rather than observed. If the real response time is an hour, the value ceiling has to rise and the automated exposure rises with it.",
    "No claim is made that latency savings sum. Concurrent delays overlap and I have not modelled the overlap, so the schedule benefit stated is a range I would not defend at the midpoint.",
    "The whole approach cannot be validated the way a normal system can, because the event happens once every four years and the next one will differ in scope, contractors and plant. Replay is a substitute for a pilot and it is not an equivalent one — and SAP's external-reference search, which the idempotency check depends on, has a race window I have not sized.",
  ],

  lessonsLearned: [
    "The question that reorganised the design was not whether the model could plan the work. It was which of these actions can be undone and what the undo costs — and nobody in the organisation owned the answer.",
    "Confidence is the wrong axis for placing a gate. A confident irreversible action still needs a person; a doubtful reversible one does not. Designs that gate on confidence end up guarding the cheap decisions.",
    "The failure mode is not a rejected write. It is an ambiguous one: the call timed out and nobody knows whether a €210,000 requisition exists. Everything about recovery follows from writing intent before the call rather than after it.",
    "Ordering a plan by increasing irreversibility is free, and it is the most valuable structural decision here — it converts an unbounded class of partial failures into a bounded one. Notification goes last for the same reason, because information that has left the fence cannot be recalled.",
    "An event that occurs once every four years cannot be improved by iteration, which changes what shipping and learning is allowed to mean. Replay against history is the substitute, and it should be budgeted as engineer-days spent reading disagreements rather than as compute.",
    "The most important deliverable in the programme is a table, owned by procurement, that produces nothing anybody can look at. That is a hard thing to get funded and the reason to name it in week one.",
  ],

  futureImprovements: [
    "Negotiate cancellation windows and priced holds as a design input rather than discovering them — a commercial change that would delete a large part of this architecture.",
    "Carry the finding log forward deliberately so the next turnaround starts with a real evaluation set instead of an archaeology project.",
    "Extend programmatic notification beyond the four firms that already support it, which is a procurement conversation with an architectural payoff.",
    "Bring the reversibility register into the contract templates themselves, so a new vendor arrives already classified rather than being classified afterwards.",
  ],
};

export default caseStudy;
