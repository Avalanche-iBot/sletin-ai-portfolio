import type { CaseStudy } from "../types";

/**
 * Case study 04 — AI meeting assistant.
 *
 * Transcription is a commodity and is not what this note is about. The lesson
 * it owns is attribution, and the note takes that further than "who said it".
 *
 * Whether a remark was a commitment at all is not a property of the words. It
 * is a social fact that does not exist until somebody decides it does, and two
 * people can leave the same meeting holding different beliefs about it. A
 * system that writes commitments into a tracker is therefore not recording
 * something that happened — it is settling something that was open, and doing
 * so in writing, with a date on it.
 *
 * The second thread is that the confirmation step carrying the entire safety
 * argument is also the adoption bottleneck, and its decay is silent: a system
 * capturing nothing scores perfectly on the metric that matters most.
 *
 * Constructed scenario. Figures are assumptions chosen so the constraints bind,
 * and the sections that lean on them say so.
 */
const caseStudy: CaseStudy = {
  slug: "ai-meeting-assistant",
  order: 4,
  title: "AI Meeting Assistant",
  subtitle:
    "Turning meeting talk into tracked commitments — where the hard question is not who said it, but whether it was a commitment at all.",
  industry: "Professional services",
  domain: "Internal productivity · Project governance",
  status: "Architecture note",
  statusNote:
    "Discovery and analysis complete. Diarisation accuracy on real meeting audio and the durability of the confirmation habit are the two things that would decide whether this works.",
  architectureComplexity: 3,
  complexityLabel: "Medium — real-time audio, speaker attribution, consent as architecture",
  duration: "Assumed programme length: 4 months",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: false,
  shortSummary:
    "Transcription is a commodity. The architectural problem is that a commitment is not a linguistic object — it is a social one, and a system that writes it into a tracker settles a question the meeting may have left deliberately open. Everything here is arranged so that a person, not a model, does the settling.",
  impact:
    "Target: 90% of decisions captured with owner and date · zero commitments recorded without their owner's confirmation",
  tags: ["Speech to text", "Speaker attribution", "Action extraction", "Teams", "GDPR consent"],

  techGroups: [
    { group: "AI", items: ["Azure Speech", "Speaker diarisation", "Azure OpenAI"] },
    { group: "Backend", items: ["Python", "FastAPI", "Service Bus", "Workers"] },
    { group: "Data", items: ["PostgreSQL", "Blob Storage", "Redis"] },
    { group: "Integrations", items: ["Microsoft Teams", "Outlook", "Jira", "SharePoint"] },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario, used to reason through a class of problem rather than to report an engagement. The figures are assumptions chosen to make the constraints bind, and the sections that use them say so.\n\nScenario: a 220-person engineering and project organisation in a matrix structure, running roughly 35 project reviews a week. Decisions are made in those meetings and then quietly lost — two of the last four schedule slips traced back to an agreement nobody recorded. Transcription was already available through the existing collaboration platform and was going unused, because a transcript is a longer version of the problem rather than a solution to it.\n\nAn earlier recording pilot was stopped by the works council over always-on capture and unclear retention. That history is not background; it defines the acceptable design space, which is why the works council was the first interview rather than the last approval.\n\nThe usual framing of this problem is accuracy: extract commitments, attribute them correctly, avoid assigning work to the wrong colleague. That framing is right and incomplete. The deeper difficulty is that whether a remark was a commitment is not determined by the words. \"I'll look into that before Friday\" is a commitment, a courtesy or a deflection depending on who said it, to whom, and what everyone in the room understood. Two attendees can leave holding different beliefs, and the ambiguity is frequently doing useful work — it is how a meeting avoids a confrontation nobody has time for.\n\nSo writing that remark into a tracker does not record a fact. It creates one. The architecture is arranged around that: extraction proposes, the named owner decides, and nothing reaches the tracker without them.",
    verdict:
      "The system does not capture commitments — it proposes them, and a person makes them real. Every control here exists to keep that boundary from eroding.",
    highlights: [
      { k: "Business driver", v: "Commitments made in meetings are tracked nowhere" },
      { k: "Hard constraint", v: "Per-meeting consent, 30-day audio retention, no individual analytics" },
      { k: "The subtle failure", v: "Reifying an ambiguity the meeting left open on purpose" },
      { k: "Rejected option", v: "Always-on recording with auto-created tickets" },
      {
        k: "What would break it",
        v: "Confirmation rates falling — the safety control and the adoption bottleneck are the same step",
      },
    ],
  },

  businessContext: {
    narrative:
      "Project reviews generate commitments that live in individual notebooks. Project managers write minutes that are filed and never reopened, which is a fair description of most minutes anywhere. The tracker is what people actually work from, and the gap between the meeting and the tracker is where the commitments go.\n\nThe organisation runs on Microsoft 365 and has no appetite for another meeting platform. That constraint is more decisive than it sounds: it means the confirmation step has to happen inside the tool people are already in, because a second destination is a step that will not be taken.\n\nThe number I would want measured before building anything is not accuracy. It is how many commitments a typical review actually produces. In this scenario I have assumed three to four per meeting, of which perhaps two are unambiguous. If the real figure is closer to one, the confirmation traffic is negligible and the whole design is easier than described; if it is eight, the queue becomes the product and its ergonomics decide everything.",
    companyFacts: [
      { k: "People", v: "220" },
      { k: "Project reviews / week", v: "~35" },
      { k: "Commitments per review, assumed", v: "3–4 proposed, ~2 unambiguous" },
      { k: "Confirmations per person per week, assumed", v: "~4" },
      { k: "Languages", v: "Italian and English, often in the same sentence" },
      { k: "Audio retention ceiling", v: "30 days" },
      { k: "Prior pilot", v: "Blocked by the works council" },
    ],
    drivers: [
      "Decisions made in meetings are not tracked anywhere durable.",
      "Project managers spend hours writing minutes nobody reopens.",
      "Accountability disputes after schedule slips, with no record to settle them.",
      "Knowledge of what was agreed leaves when a project manager moves on.",
    ],
    constraints: [
      "Recording requires informed consent and a works-council agreement.",
      "Must run inside the existing collaboration platform — a second tool will not be adopted.",
      "Commercially sensitive meetings must never be recorded.",
      "Italian and English, sometimes within a single sentence.",
      "No reporting capability that could support individual performance assessment.",
    ],
    existingStack: ["Microsoft 365", "Teams", "Jira", "SharePoint", "Azure"],
  },

  stakeholders: [
    {
      role: "Head of PMO",
      interest: "Commitments tracked without adding administrative work.",
      concern: "Minutes that are technically complete and practically ignored, again.",
      influence: "Sponsor",
    },
    {
      role: "Project managers",
      interest: "Less time writing minutes nobody reads.",
      concern: "Correcting machine output taking as long as writing it from scratch.",
      influence: "Adoption make-or-break",
    },
    {
      role: "Works council and HR",
      interest: "No surveillance of employees, and a design they can explain to members.",
      concern: "Recording repurposed for performance assessment, whatever today's intention is.",
      influence: "Veto power",
    },
    {
      role: "Engineers and delivery leads",
      interest: "Not being chased for things they did not agree to.",
      concern: "A system that turns a polite hedge into a dated obligation with their name on it.",
      influence: "The people the design protects",
    },
    {
      role: "Data protection officer",
      interest: "Lawful basis, retention limits, and voice data treated as biometric-adjacent.",
      concern: "Indefinite storage, and derived data outliving the consent that produced it.",
      influence: "Compliance gate",
    },
    {
      role: "IT architecture",
      interest: "Fits the existing estate and adds no new platform to operate.",
      concern: "A bot with meeting-wide access and a broad permission scope.",
      influence: "Architecture gate",
    },
  ],

  discovery: {
    intro:
      "The first finding was organisational rather than technical: a previous recording pilot had been blocked, so the works council was the first interview and not the last approval. The second finding reframed the product. Asking people what they would do with an extracted action item produced a near-unanimous answer that nobody had asked for — they wanted to be able to say no.",
    groups: [
      {
        audience: "Works council and HR",
        goal: "Find the conditions under which recording is acceptable at all.",
        questions: [
          "What made the previous pilot unacceptable?",
          "What would consent have to look like here to be meaningful rather than formal?",
          "Who may see a transcript, and for how long may one exist?",
          "What must the system never be able to do, regardless of who asks?",
          "If management later wanted meeting analytics by person, what would stop them?",
        ],
        answers: [
          "The objection was always-on capture and unclear retention, not recording as such.",
          "Per-meeting opt-in, a visible indicator, 30-day retention, and no aggregate reporting on individuals.",
          "The last question was the important one: an assurance is not a control, and they wanted the capability absent rather than restricted.",
        ],
      },
      {
        audience: "Project managers",
        goal: "Find out whether writing minutes is the actual pain.",
        questions: [
          "What do you do with minutes after you write them?",
          "What gets lost between the meeting and the tracker?",
          "Would you trust an automatically created ticket?",
          "Where would you want to stay in control?",
          "How often do you deliberately leave something vague in the minutes?",
        ],
        answers: [
          "Minutes are filed and never reopened; the tracker is what matters.",
          "Nobody wants automatically created tickets — they want a confirmation step, per item.",
          "Deliberate vagueness is common and considered a skill, not a failure.",
        ],
      },
      {
        audience: "Engineers and delivery leads",
        goal: "Understand the failure mode from the perspective of the person it lands on.",
        questions: [
          "Describe a time you were chased for something you did not think you had agreed to.",
          "If a system proposed an action item with your name on it, what would you want to be able to do?",
          "Is there a difference between 'I'll look into it' and 'I'll do it'?",
          "Would you rather it missed things or over-captured them?",
        ],
        answers: [
          "Everyone had an example, and in each one the disagreement was about whether a commitment existed at all rather than about who made it.",
          "Unanimously: the ability to decline, without that decline being visible as a refusal.",
          "Strong preference for missing things over over-capturing, which is the opposite of what the sponsor wanted.",
        ],
      },
      {
        audience: "Data protection officer",
        goal: "Establish what voice data is and what the retention ceiling actually binds.",
        questions: [
          "What is the lawful basis, and does consent here meet the bar given the employment relationship?",
          "Does the 30-day ceiling apply to audio, transcripts, or anything derived?",
          "What happens to a confirmed commitment when the audio it came from expires?",
          "If someone withdraws consent after the meeting, what has to be undone?",
        ],
        answers: [
          "Consent in an employment context is fragile as a basis, which is why the works-council agreement carries more weight than individual consent does.",
          "The ceiling binds audio and transcripts. A confirmed commitment is a business record and is treated separately.",
          "Withdrawal after confirmation cannot unmake the tracked item, and that has to be said in advance rather than discovered.",
        ],
      },
      {
        audience: "IT architecture",
        goal: "Understand what a meeting bot actually costs in permission surface.",
        questions: [
          "What permission scope does a meeting bot need, and who approves it?",
          "How does this degrade when the platform's API changes under us?",
          "Where does audio physically go, and who else can reach it?",
          "What happens to this system when the team that built it moves on?",
        ],
        answers: [
          "Bot permissions are tenant-wide by nature, which is the part security will scrutinise most.",
          "There is no appetite to operate anything requiring specialist attention.",
        ],
      },
      {
        audience: "Meeting sample",
        goal: "Find out what the audio and the conversations will actually support.",
        questions: [
          "How many speakers in a typical review, and how much overlap?",
          "How often does a sentence switch language mid-way?",
          "How many commitments does a review actually produce?",
          "How many of those are unambiguous on a transcript alone?",
        ],
        answers: [
          "Six to nine attendees, with meaningful overlap during the parts that matter most.",
          "Code-switching is routine and concentrated in technical vocabulary.",
          "Three to four candidate commitments per review; roughly half survive a reading as unambiguous.",
        ],
      },
    ],
    assumptions: [
      "Per-meeting opt-in with a visible indicator satisfies the works-council conditions. This is confirmed in writing before build or the project does not start.",
      "Diarisation quality on platform audio supports attribution when paired with a confirmation step — it is explicitly not assumed to be sufficient alone.",
      "Code-switching between Italian and English is handled acceptably by the speech model. This is the assumption I would test first, because failure here is uneven across people rather than uniform.",
      "Owners will confirm their own commitments if it costs one action in a tool they are already in.",
      "Three to four candidate commitments per review is the right order of magnitude.",
    ],
    implications: [
      {
        finding: "Always-on recording is unacceptable",
        implication:
          "Consent becomes a first-class object checked in the pipeline before any audio is processed, rather than a setting in an interface. A refusal means no data is ever created, not that data is created and hidden.",
      },
      {
        finding: "The works council wants capability absent, not restricted",
        implication:
          "The data model is deliberately built so that per-person aggregation is not expressible. This is a real capability cost accepted on purpose, and documenting it as a feature rather than a limitation is what made the agreement possible.",
      },
      {
        finding: "The disagreements people described were about whether a commitment existed",
        implication:
          "Attribution is two problems, not one. Who spoke is a diarisation question with a measurable accuracy. Whether it was a commitment has no ground truth until the owner says so — which makes confirmation the mechanism that creates the fact rather than one that checks it.",
      },
      {
        finding: "Deliberate vagueness is a skill, not a defect",
        implication:
          "The system must make declining easy and unremarkable. A confirmation flow where 'no' is visible as a refusal will be answered 'yes' under social pressure, which converts the control into a rubber stamp.",
      },
      {
        finding: "Nobody wants automatically created tickets",
        implication:
          "A confirmation queue is the only write path to the tracker. Extraction proposes; the owner commits.",
      },
      {
        finding: "People prefer under-capture to over-capture; the sponsor prefers the reverse",
        implication:
          "This tension is not resolvable by tuning and has to be decided explicitly. The note comes down on the users' side, and says why: an over-capturing system loses trust once, permanently.",
      },
      {
        finding: "Audio retention is capped at 30 days",
        implication:
          "Confirmed commitments must be storable and useful independently of the audio they came from, which means the citation back to the meeting has to degrade gracefully rather than break.",
      },
    ],
    businessRisks: [
      "Perception as a surveillance tool, which kills adoption instantly and permanently",
      "Minutes produced but commitments still untracked, leaving the original problem intact with added cost",
      "Confirmation habit decaying until the system captures nothing while reporting no errors",
      "A single wrongly recorded obligation becoming the story everyone repeats",
    ],
    technicalConstraints: [
      "30-day retention forces separation of derived data from audio",
      "Mixed-language meetings with code-switching inside sentences",
      "Overlapping speech concentrated in exactly the passages that matter",
      "Platform integration must degrade gracefully when consent is refused",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes for the proposal. Never for the decision.",
      body:
        "Turning speech into structured candidates with owners and dates is a genuine language task and nothing else does it. Rules cannot recognise a commitment phrased as \"I'll take that one\" three exchanges after the topic was raised.\n\nBut the system may only propose. Whether the candidate is a commitment is the owner's call, and that is not a limitation imposed for safety — it is the only place the answer exists. There is no ground truth for the model to be accurate against, which means \"improve extraction until confirmation is unnecessary\" is not a roadmap item, it is a category error.",
    },
    automationAlternative: {
      verdict: "Templates and discipline would recover part of the value, and the organisation already tried",
      canAutomate: [
        "Meeting metadata and attendance capture",
        "Reminder scheduling on confirmed items",
        "Retention enforcement and deletion",
        "Chasing unconfirmed items before they expire",
      ],
      cannotAutomate: [
        "Recognising a commitment phrased as \"I'll look into that before Friday\"",
        "Attributing it to the right speaker in a nine-person call with overlap",
        "Deciding whether a hedge was a commitment",
      ],
      body:
        "Structured minute templates were introduced two years ago. Compliance was voluntary and decayed within a quarter, which is the ordinary fate of a process that costs the person doing it and benefits somebody else. That history matters for this design too: the confirmation step also costs the person doing it, and the only reason to expect a different outcome is that it costs one action rather than twenty minutes.",
    },
    valueAreas: [
      "Decision and commitment candidates with owner, action and date",
      "One-action confirmation inside the tool people already use",
      "Confirmed items written to the tracker with a link back to the meeting record",
      "Searchable decision history within the retention limits",
    ],
    outOfScope: [
      "Any per-person analytics, engagement scoring or speaking-time reporting",
      "Recording without explicit per-meeting consent",
      "Writing to the tracker without the named owner's confirmation",
      "Summarising the meeting as a document — the transcript problem is not the problem",
    ],
    conclusion:
      "Scope was narrowed rather than widened. The system captures commitments and deliberately nothing about the people who make them — and the second half of that sentence is what bought the works-council agreement that makes the first half possible.",
  },

  alternatives: [
    {
      option: "Transcription vendor plus manual write-up",
      verdict: "Set aside",
      caseFor:
        "Almost no build cost, no consent architecture beyond what the vendor already handles, and the accuracy problem stays with a human who is accountable for it. For an organisation without a blocked pilot in its history, this is often the right answer.",
      caseAgainst:
        "It leaves the actual work untouched. Somebody still reads the transcript and decides what was committed to, which is the expensive part and the part being complained about. The organisation already has transcription and does not use it, which is the strongest available evidence about this option.",
    },
    {
      option: "Automatic extraction straight into the tracker",
      verdict: "Set aside",
      caseFor:
        "The only version that removes the manual step entirely, and the only one that shows a clean time saving on a slide. It is also the version most vendors sell, which means the sponsor will have seen it demonstrated and will ask why this design is slower.",
      caseAgainst:
        "A commitment attributed to the wrong person, or inferred from a hypothetical remark, creates a real obligation in a real system. The failure mode is not a poor summary — it is a colleague being chased for something they never agreed to, in an organisation that has already had one pilot stopped. One instance of that would end this programme, and the probability of one instance over a year of meetings is not small.",
    },
    {
      option: "Extraction with a confirmation queue",
      verdict: "Direction taken in this note",
      caseFor:
        "Keeps a person between extraction and the tracker while still removing the reading and the typing. Confirmation is also the cheapest available source of labelled data for improving extraction, so the control funds its own improvement.",
      caseAgainst:
        "Queues nobody clears are a well-documented failure pattern, and this one is worse than most because its decay is invisible. If confirmation is skipped under time pressure the design does not fail loudly — it silently becomes a system that captures nothing while reporting zero errors. The safety metric and the value metric point in opposite directions, and the safety one is trivially satisfied by inaction.",
    },
    {
      option: "Confirmation by the meeting chair rather than each owner",
      verdict: "Set aside, and it is the closest call in this note",
      caseFor:
        "One person confirms everything in one sitting, in context, immediately after the meeting. Throughput rises sharply, the queue stops being a queue, and the decay risk largely disappears — which is a serious answer to the strongest objection against the chosen design.",
      caseAgainst:
        "It reintroduces the exact failure the design exists to prevent. An obligation somebody else accepted on your behalf is precisely what the engineers described being chased for, and the chair is frequently the person with the most interest in the commitment existing. It would work; it would just be a different and less defensible product.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Consent before capture, checked in the pipeline",
        d: "No audio is processed unless a per-meeting consent record exists, and the check lives in the pipeline rather than the interface. A refusal means the data never exists, which is a materially different promise from data existing and being hidden.",
      },
      {
        t: "Extraction proposes; the owner makes it real",
        d: "No commitment becomes a tracked item without its named owner confirming. This is not a review step catching model errors — for the question of whether a commitment exists, the owner's answer is the only ground truth there is.",
      },
      {
        t: "Declining must be as easy as accepting, and as invisible",
        d: "If 'no' is more effort than 'yes', or is visible to others as a refusal, the control becomes a rubber stamp under ordinary social pressure. The affordance matters more here than the accuracy of anything upstream of it.",
      },
      {
        t: "Prefer missing to inventing",
        d: "Under-capture leaves the organisation where it already is. Over-capture creates obligations nobody accepted, and one visible instance costs the trust the whole programme runs on. Thresholds are set accordingly, against the sponsor's instinct.",
      },
      {
        t: "Derived data outlives audio",
        d: "Confirmed commitments persist as business records; audio and transcripts expire on a timer. The link back to the meeting has to degrade into a reference rather than break.",
      },
      {
        t: "The capability to surveil is absent, not restricted",
        d: "The schema cannot aggregate by person. This is a genuine capability cost accepted deliberately — and it is what turned a works council that had already blocked one pilot into a party to the design.",
      },
    ],
    flowDiagram: {
      id: "proposal-to-record",
      kind: "blocks",
      title: "From remark to tracked item",
      caption:
        "Two paths lead nowhere and both are intended. Without consent nothing is captured at all; without confirmation the candidate expires and is deleted with the audio. Only the confirmed path reaches the tracker.",
      nodes: [
        { id: "meeting", t: "Meeting starts", sub: "organiser opted in", col: 0, row: 0 },
        { id: "consent", t: "Consent checked", sub: "per meeting", col: 1, row: 0, accent: true },
        { id: "capture", t: "Captured", sub: "indicator visible", col: 2, row: 0 },
        { id: "extract", t: "Candidates proposed", sub: "owner · action · date", col: 3, row: 0, accent: true },
        { id: "nothing", t: "Nothing captured", sub: "no data created", col: 0, row: 1 },
        { id: "confirm", t: "Owner decides", sub: "one action, in Teams", col: 3, row: 1, accent: true },
        { id: "expire", t: "Candidate expires", sub: "72 hours, deleted", col: 1, row: 2 },
        { id: "tracker", t: "Written to tracker", sub: "with meeting reference", col: 3, row: 2 },
      ],
      edges: [
        { from: "meeting", to: "consent" },
        { from: "consent", to: "capture" },
        { from: "consent", to: "nothing", label: "declined", dashed: true },
        { from: "capture", to: "extract" },
        { from: "extract", to: "confirm" },
        { from: "confirm", to: "tracker" },
        { from: "confirm", to: "expire", label: "no reply", dashed: true },
      ],
    },
  },

  architecture: {
    overview:
      "A consent-gated capture path, an asynchronous extraction pipeline, and a confirmation queue that is the only route into the project tracker.\n\nThe part that is not obvious from the component list is that two lifecycles run through the same store. Audio and transcripts expire on a thirty-day timer because the works-council agreement says so. Confirmed commitments are business records and persist. Keeping those separable is a schema decision made at the start, because a design that stores a commitment as a pointer into a transcript loses the commitment when the transcript expires — and discovering that in month nine means the organisational memory the project was justified by has been quietly deleting itself.\n\nThe second non-obvious property is negative. There is no table, view or export that can aggregate by person. That absence is the deliverable the works council actually cares about, and it is enforced by the data model rather than by access control, because access control is a promise and a missing column is a fact.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption:
          "The confirmation layer is the only write path to the tracker. Everything above it proposes; nothing above it commits.",
        rows: [
          {
            label: "Capture",
            nodes: [
              { t: "Teams meeting bot", sub: "consent-gated" },
              { t: "Visible indicator" },
              { t: "Consent record", sub: "per meeting", accent: true },
            ],
          },
          {
            label: "Pipeline",
            nodes: [
              { t: "Azure Speech", sub: "transcribe + diarise" },
              { t: "Attribution resolver", sub: "against attendees", accent: true },
              { t: "Commitment extractor", sub: "candidates only", accent: true },
            ],
          },
          {
            label: "Confirmation",
            nodes: [
              { t: "Candidate queue", sub: "72-hour expiry", accent: true },
              { t: "Teams adaptive card", sub: "accept · edit · decline" },
            ],
          },
          {
            label: "Targets",
            nodes: [{ t: "Jira" }, { t: "Outlook tasks" }, { t: "SharePoint minutes", sub: "optional" }],
          },
          {
            label: "Data",
            nodes: [
              { t: "PostgreSQL", sub: "commitments · consent" },
              { t: "Blob", sub: "audio, 30-day expiry" },
              { t: "No per-person view", sub: "absent by design", muted: true },
            ],
          },
        ],
      },
      {
        id: "consent-flow",
        kind: "flow",
        title: "Consent and capture decision",
        caption:
          "The consent gate is evaluated before audio leaves the meeting rather than before it is stored, which is the difference between data that was never created and data that was created and discarded.",
        steps: [
          { t: "Meeting starts", d: "The bot joins only if the organiser opted in." },
          { t: "Consent record checked", d: "Per-meeting record with participant notice.", accent: true },
          { t: "Capture", d: "Audio streamed to the pipeline with a visible indicator." },
          { t: "Transcribe and diarise", d: "Speakers resolved against the attendee list." },
          { t: "Propose candidates", d: "Owner, action, date, and an attribution confidence.", accent: true },
          { t: "Owner decides", d: "One adaptive card per owner, in Teams.", accent: true },
          { t: "Write to tracker", d: "Confirmed items only, with a reference back." },
        ],
        branches: [
          {
            at: "Consent record checked",
            when: "no consent, or any participant declines",
            then: "The bot leaves; nothing is captured or stored",
          },
          {
            at: "Propose candidates",
            when: "attribution confidence is low",
            then: "The candidate goes to the whole attendee list rather than to one named person",
          },
          {
            at: "Owner decides",
            when: "no response within 72 hours",
            then: "The candidate expires and is deleted; nothing reaches the tracker",
          },
        ],
      },
      {
        id: "two-lifecycles",
        kind: "pipeline",
        title: "Two lifecycles through one system",
        caption:
          "The retention ceiling binds audio and transcripts. Confirmed commitments are business records and outlive them, which only works if the commitment was never stored as a pointer into something that expires.",
        lanes: [
          {
            label: "Day 0 — the meeting",
            steps: ["Consent recorded", "Audio captured and transcribed", "Candidates proposed with confidence"],
            note: "The only moment the system holds everything. Everything after this is a subtraction.",
          },
          {
            label: "Days 0–3 — the decision",
            steps: ["Owner accepts, edits or declines", "Confirmed items written to the tracker", "Unconfirmed candidates expire"],
            note: "The window is short on purpose. A candidate that is still open after three days is one nobody is going to settle.",
          },
          {
            label: "Day 30 — the ceiling",
            steps: ["Audio deleted", "Transcript deleted", "Meeting record reduced to a reference"],
            note: "Enforced by the store rather than by a job somebody maintains, because a retention promise that depends on a cron entry is not one.",
          },
          {
            label: "Beyond — the record",
            steps: ["Commitment persists with its text and owner", "Meeting reference resolves to metadata only", "Decision history remains searchable"],
            note: "What survives is what the organisation was trying to keep. What expires is what the works council was worried about.",
          },
        ],
      },
    ],
    layers: [
      {
        name: "Capture",
        why: "Consent is enforced at the earliest possible point so that a refusal means no data ever exists. Enforcing it later would be a policy about data rather than an absence of it, and the works council was explicit about the difference.",
      },
      {
        name: "Attribution",
        why: "Diarisation plus attendee resolution produces a named owner and a confidence. Neither number is trusted on its own — the confidence routes the candidate, and the owner settles it.",
      },
      {
        name: "Confirmation",
        why: "The only write path to the tracker, and therefore the whole safety argument. It is also the adoption bottleneck, which means its health has to be measured directly rather than inferred from the absence of complaints.",
      },
      {
        name: "Data",
        why: "Two lifecycles in one store: audio expires on a timer, confirmed commitments do not. The separation is a schema decision, not an operational one.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Attribution",
      choice: "Diarisation plus attendee resolution plus mandatory owner confirmation",
      why: "Machine attribution alone is not accurate enough to create an obligation, and confirmation costs one action. The three together are load-bearing; any two are not.",
      alt: "Diarisation-only auto-assignment — faster, and its failure mode is assigning work to a colleague who never agreed to it.",
    },
    {
      layer: "Confidence handling",
      choice: "Low confidence widens the audience rather than lowering the bar",
      why: "An uncertain attribution goes to every attendee instead of one person, so somebody can claim it. Suppressing uncertain candidates would lose real commitments; guessing would create false ones.",
      alt: "A single confidence threshold with suppression below it — simpler, and it throws away exactly the ambiguous cases the meeting failed to resolve.",
    },
    {
      layer: "Surface",
      choice: "Teams adaptive cards",
      why: "Confirmation has to happen where people already are. A second destination is a step that will not be taken, and the whole design rests on that step being taken.",
      alt: "A web application for review — more capable, and an extra place nobody visits.",
    },
    {
      layer: "Candidate lifetime",
      choice: "72-hour expiry, then deletion",
      why: "Bounds the queue, and makes the decay measurable: an expiry is a recorded event, whereas an ignored item is silence. It also means an unconfirmed candidate cannot resurface months later as a surprise.",
      alt: "Indefinite queue — nothing is lost, and the queue becomes an inbox that is never empty and therefore never read.",
    },
    {
      layer: "Retention",
      choice: "Separate lifecycles for audio and derived commitments, enforced in the store",
      why: "Satisfies the ceiling without losing the organisational memory that justifies the project. Storing expiry as a store-level policy rather than a scheduled job means the promise does not depend on a job that can fail quietly.",
      alt: "One retention policy for everything — simpler, and either non-compliant or useless depending on which figure you pick.",
    },
    {
      layer: "Data model",
      choice: "No per-person aggregation expressible in the schema",
      why: "The works council asked for the capability to be absent rather than restricted. A missing column cannot be re-enabled by a future administrator with a good reason.",
      alt: "Access-controlled reporting — more flexible, and it makes the assurance a matter of who holds a permission rather than what exists.",
    },
  ],

  security: {
    posture:
      "The governing risk here is not a data breach. It is being perceived as surveillance, by a workforce whose representatives have already stopped one attempt — and perception is not addressed by controls that are merely effective. It is addressed by controls that are visible to the person being recorded.\n\nSo the design choices run the other way from usual. A visible indicator that anyone can act on is worth more than a stronger access policy nobody can see. A capability removed from the schema is worth more than the same capability protected by a role, because a role can be granted by someone with a plausible reason and a missing column cannot.\n\nThe conventional controls still apply underneath. But if the choice is between a control that is stronger and one that is legible, this design takes legible, and that is a deliberate inversion of the usual priority.",
    controls: [
      {
        t: "Per-meeting consent records",
        d: "Immutable, auditable, and checked in the pipeline before any processing. A meeting without one produces no data rather than hidden data.",
      },
      {
        t: "Visible recording indicator",
        d: "Participants can always see the capture state, and any participant can stop it. Visibility is the control; the audit trail is only the evidence of it.",
      },
      {
        t: "Per-person aggregation absent from the schema",
        d: "There is no table, view or export that groups by individual. The limitation is documented as a deliberate feature so that a future request to add it is a visible design change rather than a configuration.",
      },
      {
        t: "Store-enforced expiry",
        d: "Audio and transcripts expire through a store-level policy rather than a scheduled job, so the retention promise does not depend on something that can fail without anyone noticing.",
      },
      {
        t: "Confirmation as the sole write path",
        d: "No code path writes to the tracker except through a confirmed candidate. Enforced structurally, so adding a bypass is a reviewable change rather than a configuration flag.",
      },
      {
        t: "Bot permission scope reviewed and minimised",
        d: "A meeting bot's permissions are broad by nature. The scope is enumerated, justified line by line, and re-reviewed on every platform version rather than granted once.",
      },
      {
        t: "Declines recorded but not attributed",
        d: "That a candidate was declined is recorded for measuring queue health. Who declined what is not retained, because a decline history is a performance record by another name.",
      },
    ],
  },

  scalability: {
    body:
      "Nothing here is under load. Thirty-five meetings a week, each producing a handful of candidates, is a workload a single modest worker handles with room to spare. Designing for throughput would be effort spent on the one dimension that is not threatened, and saying so is more useful than a section about autoscaling.\n\nThe thing that scales badly is human attention. Every candidate consumes a decision from a specific named person, and that person has roughly four of them a week under the assumptions here. Double the meeting coverage and the number doubles; add a second candidate per meeting through better recall and it doubles again. At some point — and it is lower than anyone expects — confirmation stops being one action and becomes a chore, and the moment it becomes a chore the control degrades into a reflex.\n\nSo the capacity limit of this system is not requests per second. It is confirmations per person per week, and the design has to treat that as a budget with a ceiling rather than a number that emerges.",
    levers: [
      {
        t: "Candidate volume as a managed budget",
        d: "Extraction thresholds are set to produce a target number of candidates per person per week rather than to maximise recall. Recall is traded down deliberately when the budget is exceeded.",
      },
      {
        t: "Batch by person, not by meeting",
        d: "One card covering somebody's three candidates from the day beats three cards arriving separately. The cost of confirmation is mostly the interruption, not the decision.",
      },
      {
        t: "Expiry as backpressure",
        d: "The 72-hour window bounds the queue automatically. It also converts silent neglect into a recorded event, which is what makes the decay measurable at all.",
      },
      {
        t: "Asynchronous pipeline",
        d: "Transcription and extraction run on workers; nothing about the meeting waits for them. The only latency that matters is that the card arrives while the meeting is still remembered.",
      },
      {
        t: "Coverage expanded deliberately, not by default",
        d: "Adding meeting types multiplies confirmation load on the same people. Each expansion is a decision with a capacity implication rather than a configuration change.",
      },
    ],
  },

  costOptimization: {
    body:
      "The infrastructure cost of this system is close to a rounding error, and the useful thing this section can do is say so precisely rather than pretend otherwise.\n\nThirty-five meetings a week at an assumed average of 50 minutes is roughly 125 hours of audio a month. At an assumed €0.90 per hour for transcription with diarisation, that is about €115. Extraction runs over transcripts rather than audio: 125 hours at roughly 8,000 words an hour is about 1.3 million tokens a month, and at an assumed €5 per million with modest output that is under €10. Hosting the workers, the store and the bot on existing infrastructure adds perhaps €150. Call it €300 a month, or €3,600 a year.\n\nAgainst that: 220 people, of whom perhaps 30 run project reviews, spending an assumed two hours a week on minutes. That is 60 hours a week of skilled time. Even at a conservative internal rate, the labour figure is two orders of magnitude above the infrastructure figure — which means the entire economic argument rests on whether the confirmation step actually costs less than the writing step it replaces, and nothing at all on cost per token.\n\nThat is worth stating plainly because it redirects the optimisation effort. There is no meaningful saving available in the model tier, the caching strategy or the transcription vendor. There is an enormous saving available in whether a person confirms three items in ten seconds or opens a second tool to do it.",
    levers: [
      {
        n: "01",
        t: "Optimise the confirmation, not the pipeline",
        d: "Every second removed from the confirmation interaction is worth more than any reduction in inference cost, because it multiplies across every commitment and every person.",
      },
      {
        n: "02",
        t: "Transcribe once, extract from text",
        d: "Extraction never touches audio. Re-running extraction after a prompt change costs tokens rather than transcription minutes, which makes iteration nearly free.",
      },
      {
        n: "03",
        t: "Consent gate before transcription",
        d: "The most effective cost control is not processing meetings that should not be processed, which is also the control the works council asked for. The two align exactly.",
      },
      {
        n: "04",
        t: "Cheap model for candidate detection",
        d: "Finding candidate passages is a classification job. Only those passages reach the capable model for structured extraction.",
      },
      {
        n: "05",
        t: "Retention is a cost control as well as a promise",
        d: "Thirty-day audio expiry keeps storage flat rather than growing, without anyone having to manage it.",
      },
    ],
    model: [
      { k: "Meetings per month", v: "~150" },
      { k: "Average duration, assumed", v: "50 minutes — about 125 hours of audio" },
      { k: "Transcription with diarisation, assumed", v: "€0.90 per hour — roughly €115" },
      { k: "Extraction tokens", v: "~1.3m per month at an assumed €5/m — under €10" },
      { k: "Compute and storage", v: "~€150 on existing infrastructure" },
      { k: "Total run cost", v: "~€300 per month · ~€3,600 a year" },
      { k: "Minute-writing time replaced, assumed", v: "~30 people × 2 hours a week" },
      { k: "The comparison that matters", v: "€3,600 of infrastructure against 60 hours a week of skilled time" },
      { k: "Where optimisation belongs", v: "The confirmation interaction — not the model, the cache or the vendor" },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "A commitment recorded that its owner never accepted",
      severity: "Critical",
      consequence:
        "A colleague chased for work they did not agree to, in an organisation that has already stopped one pilot. One instance ends the programme.",
      mitigation:
        "Confirmation is the only write path, enforced structurally rather than by policy. Declining is one action and is not visible to others as a refusal.",
    },
    {
      n: "02",
      risk: "Confirmation habit decays and the system silently captures nothing",
      severity: "Critical",
      consequence:
        "The programme reports perfect safety while delivering no value, and nobody notices because the safety metric is satisfied by inaction",
      mitigation:
        "Confirmation rate and expiry rate are co-primary KPIs, reported together. A rising expiry rate triggers a reduction in candidate volume rather than a reminder campaign, because the cause is load rather than forgetfulness.",
    },
    {
      n: "03",
      risk: "Perceived as surveillance",
      severity: "Critical",
      consequence: "Works-council block and cancellation, as before, with less goodwill available the second time",
      mitigation:
        "Per-meeting opt-in, visible indicator, 30-day retention, and a schema that cannot produce individual analytics — all agreed in writing before any build begins.",
    },
    {
      n: "04",
      risk: "Attribution errors concentrate on particular people",
      severity: "High",
      consequence:
        "Speakers who code-switch, have accents the model handles poorly, or talk over others get systematically worse treatment — a fairness problem, not just an accuracy one",
      mitigation:
        "Attribution accuracy is measured per speaker rather than in aggregate, and a per-speaker regression blocks release. An aggregate figure would hide exactly this.",
    },
    {
      n: "05",
      risk: "The system reifies ambiguity the meeting left open deliberately",
      severity: "High",
      consequence:
        "A hedge becomes a dated obligation, and a disagreement the room had politely avoided becomes an explicit dispute with a record attached",
      mitigation:
        "Declining is frictionless and unattributed. Low-confidence candidates go to the whole attendee list rather than naming someone, so nobody has to refuse in public.",
    },
    {
      n: "06",
      risk: "Commitments lost when the audio expires",
      severity: "Medium",
      consequence: "The organisational memory the project was justified by quietly deletes itself at day 30",
      mitigation:
        "Confirmed commitments store their own text and owner rather than a pointer into a transcript. The meeting reference degrades to metadata rather than breaking.",
    },
    {
      n: "07",
      risk: "Review workload replaces writing workload with no net saving",
      severity: "Medium",
      consequence: "The sponsor loses the business case in month four",
      mitigation:
        "Confirmation time is measured directly rather than assumed. If the interaction exceeds its budget, candidate volume comes down before anything else is tried.",
    },
  ],

  kpis: [
    {
      category: "Safety",
      kpi: "Commitments written without owner confirmation",
      baseline: "n/a",
      target: "0",
      why: "The guarantee the whole design exists to make. Structurally impossible rather than merely monitored, so a non-zero reading is a defect report.",
    },
    {
      category: "Health",
      kpi: "Candidate confirmation rate",
      baseline: "n/a",
      target: "> 70%",
      why: "The co-primary metric. Reported beside the safety figure because safety alone is satisfied by a system that does nothing.",
    },
    {
      category: "Health",
      kpi: "Candidate expiry rate",
      baseline: "n/a",
      target: "< 25% and not rising",
      why: "The earliest signal of decay. A trend matters more than a level, and a rising trend means load rather than forgetfulness.",
    },
    {
      category: "Quality",
      kpi: "Confirmed items edited before acceptance",
      baseline: "n/a",
      target: "< 30%",
      why: "Heavy editing means the proposal is not saving the work it was meant to save, even though it is being accepted.",
    },
    {
      category: "Fairness",
      kpi: "Attribution accuracy for the worst-served speaker",
      baseline: "n/a",
      target: "Within 10 points of the median",
      why: "An aggregate hides the person the system consistently fails, and that person is usually the one who code-switches.",
    },
    {
      category: "Value",
      kpi: "Decisions captured with owner and date",
      baseline: "Unmeasured",
      target: "> 90% of those a reviewer identifies",
      why: "Measured against a human reading the same meeting, since there is no other standard available.",
    },
    {
      category: "Effort",
      kpi: "Median time to confirm a candidate",
      baseline: "n/a",
      target: "< 15 seconds",
      why: "The economic argument rests entirely on this number, and it is also the leading indicator for the expiry rate.",
    },
    {
      category: "Compliance",
      kpi: "Meetings processed without a valid consent record",
      baseline: "n/a",
      target: "0",
      why: "The condition the works-council agreement rests on. One breach is a governance event, not a bug.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Works-council agreement",
      duration: "4 weeks",
      goal: "Get the conditions in writing before any code exists, because they define what can be built.",
      activities: [
        "Consent model, retention and indicator design agreed with the works council",
        "Confirmation that per-person aggregation will be absent from the schema",
        "Meeting sample measured for speaker count, overlap and candidate volume",
      ],
      deliverables: ["Signed works-council agreement", "Consent and retention specification", "Meeting sample findings"],
    },
    {
      phase: "P1",
      name: "Capture and transcription",
      duration: "5 weeks",
      goal: "Consent-gated capture with transcription and diarisation, and nothing downstream of it.",
      activities: [
        "Meeting bot with consent gate and visible indicator",
        "Transcription and diarisation with per-speaker accuracy measurement",
        "Store-enforced retention for audio and transcripts",
      ],
      deliverables: ["Consent-gated capture", "Per-speaker attribution baseline", "Retention enforcement"],
    },
    {
      phase: "P2",
      name: "Candidates and confirmation",
      duration: "6 weeks",
      goal: "Propose candidates and let owners settle them, with nothing yet reaching the tracker.",
      activities: [
        "Commitment extraction with attribution confidence",
        "Adaptive card confirmation, batched per person",
        "Confirmation-rate and expiry-rate instrumentation from day one",
      ],
      deliverables: ["Candidate extraction", "Confirmation flow", "Queue health dashboard"],
    },
    {
      phase: "P3",
      name: "Tracker integration",
      duration: "3 weeks",
      goal: "Write confirmed items to the tracker, and only confirmed items.",
      activities: [
        "Jira integration with a reference back to the meeting record",
        "Reminder scheduling on confirmed items",
        "Decision history search within retention limits",
      ],
      deliverables: ["Tracker integration", "Meeting reference that survives audio expiry", "Decision history"],
    },
  ],

  tailoring: [
    {
      parameter: "Whether meetings are already recorded",
      hereValue: "No — recording has to be introduced, with a works council that has already blocked one attempt",
      altValue: "Recording is already routine and consented",
      architectureChange:
        "The hardest part of this programme is already done. What remains is an ordinary extraction project against an existing archive, and the timeline roughly halves.",
      why: "Almost all the risk here is social rather than technical. Consent, works-council agreement and the perception of surveillance are what stopped the previous attempt — not accuracy, which was never reached.",
    },
    {
      parameter: "Whether a shared tracker exists and is used",
      hereValue: "Yes — a project tracker people genuinely work in",
      altValue: "No single tracker, or one nobody opens",
      architectureChange:
        "There is nowhere for a commitment to land, and the system produces summaries nobody acts on. Fix that first; the assistant is worth nothing until the destination exists.",
      why: "The entire value is the last step — a commitment arriving where the work is already tracked. Without it this is a transcription tool with added risk, and the organisation already has one of those and does not use it.",
    },
    {
      parameter: "Who confirms a commitment",
      hereValue: "The named owner confirms their own items",
      altValue: "The meeting chair confirms the whole set in bulk",
      architectureChange:
        "Throughput rises sharply, the queue stops being a queue, and the decay risk largely disappears. What falls is the standing of the result — and the design's central protection with it.",
      why: "This is the closest call in the note. Bulk confirmation solves the strongest objection to the chosen design and reintroduces the exact failure it exists to prevent. Which trade is right depends on whether the organisation's problem is untracked work or contested obligations.",
    },
    {
      parameter: "Meeting style and audio conditions",
      hereValue: "Structured project reviews, six to nine attendees, some overlap",
      altValue: "Fast overlapping discussion on shared room microphones",
      architectureChange:
        "Speaker attribution degrades sharply and takes the premise with it. Fall back to unattributed decision capture with the chair assigning owners — a different and much less valuable product.",
      why: "Attribution is what separates this from commodity transcription. It is also the first thing to break on real audio, and it breaks quietly: the transcript still reads plausibly with the wrong name against a line.",
    },
    {
      parameter: "Jurisdictional spread",
      hereValue: "One jurisdiction, one works council",
      altValue: "A matrix organisation across several countries",
      architectureChange:
        "Consent becomes per-participant and per-jurisdiction, resolved at the moment somebody joins rather than when the meeting is scheduled. That is a materially larger design and it constrains who may appear in a transcript at all.",
      why: "Recording law differs on whether all parties must consent. One participant dialling in from the wrong country can make an otherwise lawful recording unlawful, and it has to be handled at join time because nothing later can undo it.",
    },
    {
      parameter: "Meeting language",
      hereValue: "Two languages, frequently mixed within a sentence",
      altValue: "A single working language",
      architectureChange:
        "Diarisation and extraction both improve materially, and the per-speaker fairness problem largely disappears along with the code-switching that causes it.",
      why: "Most speech stacks assume one language per stream. Switching mid-sentence is common in international teams, handled poorly, and the resulting error lands consistently on the same people — which makes it a fairness issue rather than an accuracy one.",
    },
  ],

  counterpart: {
    slug: "ai-contract-intelligence",
    note: "The other note about manufacturing an obligation out of unstructured material, and the contrast is in the source. A contract is signed and its words are authoritative; a spoken commitment is neither, and the person it is attributed to can simply say they never agreed. That difference is why one design leans on citation and the other on confirmation — and why only one of them has a ground truth to be accurate against.",
  },

  assumptionsToTest: [
    "Speaker attribution accuracy in overlapping speech is the constraint the whole design rests on, and I have not tested it on realistic audio. Materially worse than assumed and the confirmation queue becomes too noisy to use.",
    "Code-switching handling is assumed adequate. If it is not, the failure is uneven across people rather than uniform, which turns an accuracy problem into a fairness one and changes what has to be measured.",
    "Three to four candidates per review is a chosen figure. The confirmation budget, and therefore the whole capacity argument, follows from it.",
    "That owners will confirm reliably over months, rather than for the first fortnight, is the assumption I would least want to be wrong about — and the one this design can only detect after the fact.",
    "Consent handling here is described for a single jurisdiction. How much survives a multi-country matrix organisation, I do not know.",
    "People behave differently when recorded, and this system's value depends on meetings staying candid. I have no way to estimate that effect from a desk, and it may be the largest cost in the note.",
  ],

  lessonsLearned: [
    "The works council was the most useful interview in the programme, and it was the one a conventional plan would have scheduled last.",
    "Asking engineers about a time they were chased for something they had not agreed to changed the product. Every example was a disagreement about whether a commitment existed, not about who made it.",
    "There is no ground truth for whether a remark was a commitment. Once that is accepted, confirmation stops being a safety net over an imperfect model and becomes the mechanism that creates the fact.",
    "Designing the decline path turned out to matter more than designing the accept path, because the accept path is the one social pressure already favours.",
    "The safety metric here is satisfied by a system that does nothing, which is why it can never be reported on its own.",
  ],

  futureImprovements: [
    "Use confirmations and declines as labelled data to improve candidate detection — the control funds its own improvement.",
    "Detect commitments made and then superseded later in the same meeting, which currently produce two candidates and one confused owner.",
    "Extend to written channels, where attribution is trivial and the commitment question is exactly as hard.",
    "Measure whether meetings became less candid after introduction, which is the cost this design assumes away and should not.",
  ],
};

export default caseStudy;
