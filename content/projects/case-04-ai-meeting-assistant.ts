import type { CaseStudy } from "../types";

/**
 * Case study 04 — AI meeting assistant.
 *
 * Transcription is a commodity and is not what this note is about. The lesson
 * it owns is attribution: turning talk into tracked commitments means deciding
 * who agreed to what and by when, and getting that wrong does not produce a
 * poor summary — it produces an obligation assigned to someone who never
 * accepted it. Precision therefore matters more than coverage, which inverts
 * the usual instinct for a summarisation system.
 *
 * Constructed scenario; the figures are assumptions, and the sections that
 * lean on them say so.
 */
const caseStudy: CaseStudy = {
  slug: "ai-meeting-assistant",
  order: 4,
  title: "AI Meeting Assistant",
  subtitle: "Turning meeting talk into tracked commitments — the part every transcription tool leaves on the floor.",
  industry: "Professional services",
  domain: "Internal productivity · Project governance",
  status: "In analysis",
  architectureComplexity: 3,
  shortSummary: "Transcription is a commodity. The architectural problem is extracting commitments — who agreed to what, by when — accurately enough to push them into the project tracker without creating false obligations.",
  tags: [
    "Speech to text",
    "Speaker attribution",
    "Action extraction",
    "Teams",
    "GDPR consent"
  ],
  featured: false,
  client: "Engineering and project organisation",
  clientNote: "220 people · matrix structure",
  statusNote: "Discovery in progress. Architecture sketched; commitment attribution accuracy is the open question.",
  complexityLabel: "Medium — real-time audio, speaker attribution, consent handling",
  duration: "Reference programme: 4 months",
  impact: "Target: 90% of decisions captured with owner and date · zero commitments assigned to the wrong person",
  role: "Solution Architect (case study author)",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — build scheduled",
  techGroups: [
    {
      group: "AI",
      items: [
        "Azure Speech",
        "Speaker diarisation",
        "Azure OpenAI"
      ]
    },
    {
      group: "Backend",
      items: [
        "Python",
        "FastAPI",
        "Service Bus",
        "Workers"
      ]
    },
    {
      group: "Data",
      items: [
        "PostgreSQL",
        "Blob Storage",
        "Redis"
      ]
    },
    {
      group: "Integrations",
      items: [
        "Microsoft Teams",
        "Outlook",
        "Jira",
        "SharePoint"
      ]
    }
  ],
  executiveSummary: {
    statement: "In a matrix organisation, decisions are made in meetings and then quietly lost. Transcription was already available and unused — because a transcript is a longer version of the problem, not a solution.\n\nThe design target is narrow: extract decisions and commitments with speaker attribution, confirm each with its owner, and write the confirmed ones into the tools people already use. Attribution accuracy, not transcription accuracy, is the binding constraint — a correct action item assigned to the wrong person is worse than no action item. The second constraint is organisational: an earlier recording pilot was blocked by the works council, so consent is a structural component of the architecture rather than a setting.",
    highlights: [
      {
        k: "Business driver",
        v: "Commitments made in meetings are not tracked anywhere"
      },
      {
        k: "Hard constraint",
        v: "Per-meeting consent, 30-day retention, no individual analytics"
      },
      {
        k: "Rejected option",
        v: "Always-on recording with auto-created tickets"
      },
      {
        k: "Architectural verdict",
        v: "Extraction proposes, the owner confirms, the tracker records"
      }
    ]
  },
  businessContext: {
    narrative: "Project reviews generate commitments that live in individual notebooks. Two of the last four schedule slips traced back to an agreement nobody recorded. The organisation runs on Microsoft 365 and has no appetite for another meeting platform.\n\nA previous recording pilot was stopped by the works council over always-on capture and unclear retention. That history defines the acceptable design space.",
    companyFacts: [
      {
        k: "People",
        v: "220"
      },
      {
        k: "Project reviews / week",
        v: "~35"
      },
      {
        k: "Languages",
        v: "Italian + English, often mixed"
      },
      {
        k: "Retention ceiling",
        v: "30 days for audio"
      },
      {
        k: "Prior pilot",
        v: "Blocked by works council"
      }
    ],
    drivers: [
      "Decisions made in meetings are not tracked anywhere",
      "Project managers spend hours writing minutes nobody reopens",
      "Accountability disputes after schedule slips"
    ],
    constraints: [
      "Recording requires informed consent and a works-council agreement",
      "Must run inside Teams",
      "Commercially sensitive meetings must never be recorded",
      "Italian and English, sometimes in the same sentence"
    ],
    existingStack: [
      "Microsoft 365",
      "Teams",
      "Jira",
      "SharePoint",
      "Azure"
    ]
  },
  stakeholders: [
    {
      role: "Head of PMO",
      interest: "Commitments tracked without more admin",
      concern: "Minutes that are technically complete and practically ignored",
      influence: "Sponsor"
    },
    {
      role: "Project managers",
      interest: "Less time writing minutes",
      concern: "Correcting machine output taking as long as writing it",
      influence: "Adoption make-or-break"
    },
    {
      role: "Works council / HR",
      interest: "No surveillance of employees",
      concern: "Recording used for performance assessment",
      influence: "Veto power"
    },
    {
      role: "DPO",
      interest: "Lawful basis and retention limits",
      concern: "Indefinite storage of voice data",
      influence: "Compliance gate"
    }
  ],
  discovery: {
    groups: [
      {
        audience: "Works council and HR",
        goal: "Find the conditions under which recording is acceptable at all.",
        questions: [
          "What made the previous pilot unacceptable?",
          "What would consent have to look like to be meaningful here?",
          "Who may see a transcript, and for how long may it exist?",
          "What must the system never be able to do?"
        ],
        answers: [
          "The objection was always-on recording and unclear retention.",
          "Per-meeting opt-in, a visible indicator, 30-day retention, and no aggregate reporting on individuals."
        ]
      },
      {
        audience: "Project managers",
        goal: "Find out whether minutes are the actual pain.",
        questions: [
          "What do you do with minutes after you write them?",
          "What gets lost between the meeting and the tracker?",
          "Would you trust an auto-created Jira ticket?",
          "Where would you want to stay in control?"
        ],
        answers: [
          "Minutes are filed and never reopened; the tracker is what matters.",
          "Nobody wants auto-created tickets — they want a confirm step, per item."
        ]
      }
    ],
    intro: "The first discovery finding was organisational, not technical: a previous recording pilot had been blocked. Any architecture that ignores that history fails on arrival, so the works council was the first interview, not the last approval.",
    assumptions: [
      "Per-meeting opt-in with a visible indicator satisfies the works-council conditions; confirmed in writing before build.",
      "Diarisation quality on Teams audio supports attribution when paired with a confirmation step.",
      "Code-switching between Italian and English is handled acceptably by the speech model.",
      "Owners will confirm their own commitments if it costs one click."
    ],
    implications: [
      {
        finding: "Always-on recording is unacceptable",
        implication: "Consent state becomes a first-class object, checked in the pipeline before any audio is processed."
      },
      {
        finding: "No aggregate reporting on individuals",
        implication: "The data model deliberately cannot support per-person analytics. The limitation is documented as a feature."
      },
      {
        finding: "Nobody wants auto-created tickets",
        implication: "A confirmation queue sits between extraction and the tracker. Extraction proposes; the human commits."
      },
      {
        finding: "Audio retention capped at 30 days",
        implication: "Derived commitments must be storable independently of the audio they came from."
      }
    ],
    businessRisks: [
      "Perception as a surveillance tool, killing adoption",
      "Minutes produced but commitments still untracked, leaving the original problem intact"
    ],
    technicalConstraints: [
      "30-day retention forces separation of derived data from audio",
      "Mixed-language meetings",
      "Teams integration must degrade gracefully when consent is refused"
    ]
  },
  analysis: {
    aiNeeded: {
      verdict: "Yes, for extraction and attribution",
      body: "Turning speech into structured commitments with owners and dates is a genuine language task. Deciding whether a commitment is real remains the owner's call, which the confirmation step enforces."
    },
    automationAlternative: {
      verdict: "Partly — templates and discipline would recover some of the value",
      canAutomate: [
        "Meeting metadata and attendance capture",
        "Reminder scheduling on confirmed items",
        "Retention enforcement and deletion"
      ],
      cannotAutomate: [
        "Identifying a commitment phrased as 'I'll look into that before Friday'",
        "Attributing it to the right speaker in a nine-person call"
      ],
      body: "The organisation already tried structured minute templates. Compliance was voluntary and decayed within a quarter."
    },
    valueAreas: [
      "Decision and commitment extraction with owner and date",
      "One-click confirmation in Teams",
      "Confirmed items written to Jira with traceability",
      "Searchable decision history within retention limits"
    ],
    outOfScope: [
      "Any per-person performance analytics",
      "Sentiment or engagement scoring",
      "Recording without explicit per-meeting consent"
    ],
    conclusion: "Value is delivered by narrowing scope, not widening it. The system captures commitments and nothing about the people who make them."
  },
  solutionDesign: {
    principles: [
      {
        t: "Consent before capture",
        d: "No audio is processed unless a per-meeting consent record exists. The check lives in the pipeline, not the interface."
      },
      {
        t: "Extraction proposes, humans commit",
        d: "No commitment becomes a tracked item without its owner's confirmation."
      },
      {
        t: "Derived data outlives audio",
        d: "Confirmed commitments persist; audio and transcripts expire at 30 days by design."
      },
      {
        t: "No individual analytics",
        d: "The schema cannot aggregate by person. That limitation is the concession that made the project possible."
      }
    ],
    flow: [
      "Meeting is scheduled; the organiser opts in and the consent record is created.",
      "Participants see a visible recording indicator; anyone may decline, which stops capture.",
      "Audio is transcribed and diarised; speakers are resolved against the attendee list.",
      "Commitment extraction proposes items with owner, action and date, each with a confidence score.",
      "Each proposed owner receives one adaptive card in Teams and confirms, edits or rejects.",
      "Confirmed items are written to Jira with a link back to the meeting record.",
      "Audio and transcript are deleted at 30 days; confirmed commitments persist."
    ]
  },
  alternatives: [
    {
      option: "Transcription vendor plus manual write-up",
      verdict: "Set aside",
      caseFor: "Almost no build cost, no consent architecture beyond what the vendor already handles, and the accuracy problem stays with a human who is accountable for it.",
      caseAgainst: "It leaves the actual work untouched. Someone still reads the transcript and decides what was committed to, which is the expensive part and the part being complained about."
    },
    {
      option: "Automatic extraction straight into the tracker",
      verdict: "Set aside",
      caseFor: "The only version that removes the manual step entirely, and the only one that would show a clean time saving.",
      caseAgainst: "A commitment attributed to the wrong person, or invented from a hypothetical remark, creates a real obligation in a real system. The failure mode is not a bad summary. It is a colleague being chased for something they never agreed to."
    },
    {
      option: "Extraction with a confirmation queue",
      verdict: "Direction taken in this note",
      caseFor: "Keeps a human between extraction and the tracker while still removing the reading and typing. Confirmation is also the cheapest available source of labelled data for improving extraction.",
      caseAgainst: "Queues that nobody clears are a well-known failure pattern. If confirmation is skipped under time pressure, the design collapses into the automatic option without anyone deciding that it should."
    }
  ],
  architecture: {
    overview: "One workable shape: a consent-gated capture path, an asynchronous extraction pipeline, and a confirmation queue that is the only route into the project tracker.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption: "First-pass layered view. Component boundaries are settled; node-level choices remain open pending discovery.",
        rows: [
          {
            label: "Capture",
            nodes: [
              {
                t: "Teams meeting bot",
                sub: "consent-gated"
              },
              {
                t: "Visible indicator"
              }
            ]
          },
          {
            label: "Pipeline",
            nodes: [
              {
                t: "Azure Speech",
                sub: "transcribe + diarise"
              },
              {
                t: "Commitment extractor",
                accent: true
              },
              {
                t: "Attribution resolver",
                accent: true
              }
            ]
          },
          {
            label: "Confirmation",
            nodes: [
              {
                t: "Owner confirmation queue",
                accent: true
              },
              {
                t: "Teams adaptive card"
              }
            ]
          },
          {
            label: "Targets",
            nodes: [
              {
                t: "Jira"
              },
              {
                t: "Outlook tasks"
              },
              {
                t: "SharePoint minutes",
                sub: "optional"
              }
            ]
          },
          {
            label: "Data",
            nodes: [
              {
                t: "PostgreSQL",
                sub: "commitments · consent"
              },
              {
                t: "Blob",
                sub: "audio, 30-day TTL"
              }
            ]
          }
        ]
      },
      {
        id: "consent-flow",
        kind: "flow",
        title: "Consent and capture decision",
        caption: "The consent gate is evaluated before audio leaves the meeting, not before it is stored.",
        steps: [
          {
            t: "Meeting starts",
            d: "Bot joins only if the organiser opted in."
          },
          {
            t: "Consent record checked",
            d: "Per-meeting record with participant notice.",
            accent: true
          },
          {
            t: "Capture",
            d: "Audio streamed to the pipeline with a visible indicator."
          },
          {
            t: "Transcribe and diarise",
            d: "Speakers resolved against the attendee list."
          },
          {
            t: "Extract commitments",
            d: "Owner, action, date, confidence.",
            accent: true
          },
          {
            t: "Owner confirmation",
            d: "One adaptive card per owner.",
            accent: true
          },
          {
            t: "Write to tracker",
            d: "Confirmed items only."
          }
        ],
        branches: [
          {
            at: "Consent record checked",
            when: "no consent, or any participant declines",
            then: "Bot leaves; nothing is captured or stored"
          },
          {
            at: "Extract commitments",
            when: "attribution confidence is low",
            then: "Item is proposed to the whole attendee list rather than one owner"
          },
          {
            at: "Owner confirmation",
            when: "not confirmed within 72 hours",
            then: "Item expires; nothing is written to the tracker"
          }
        ]
      }
    ],
    layers: [
      {
        name: "Capture",
        why: "Consent is enforced here, at the earliest possible point, so that a refusal means no data ever exists."
      },
      {
        name: "Confirmation",
        why: "The only write path to the tracker. This is what prevents false obligations."
      },
      {
        name: "Data",
        why: "Two lifecycles in one store: audio expires on a timer, confirmed commitments do not."
      }
    ]
  },
  technologySelection: [
    {
      layer: "Attribution",
      choice: "Diarisation plus attendee resolution plus mandatory owner confirmation",
      why: "Machine attribution alone is not accurate enough for obligations, and confirmation costs one click.",
      alt: "Diarisation-only auto-assignment — faster, and the failure mode is assigning work to the wrong colleague."
    },
    {
      layer: "Surface",
      choice: "Teams adaptive cards",
      why: "Confirmation has to happen where people already are, or it will not happen.",
      alt: "Web app for review — more capable, and an extra destination nobody visits."
    },
    {
      layer: "Retention",
      choice: "Separate lifecycles for audio and derived commitments",
      why: "Satisfies the 30-day ceiling without losing the organisational memory that justifies the project.",
      alt: "Single retention policy — simpler, and either illegal or useless."
    }
  ],
  security: {
    posture: "The governing risk is not data breach but perceived surveillance. Controls are chosen to be visible to participants, not merely effective.",
    controls: [
      {
        t: "Per-meeting consent records",
        d: "Immutable, auditable, and checked in the pipeline before processing."
      },
      {
        t: "Visible recording indicator",
        d: "Participants can always see capture state; anyone can stop it."
      },
      {
        t: "Schema-level analytics prohibition",
        d: "No per-person aggregation is possible in the data model, by design."
      },
      {
        t: "Automatic deletion",
        d: "Audio and transcripts are deleted at 30 days by a scheduled job with a deletion audit record."
      }
    ]
  },
  tailoring: [
    {
      parameter: "Whether meetings are already recorded",
      hereValue: "No — recording has to be introduced, with a works council to satisfy",
      altValue: "Recording is already routine and consented",
      architectureChange:
        "The hardest part of this programme is already done. What remains is an ordinary extraction project against an existing audio archive, and the timeline roughly halves.",
      why: "Almost all the risk in this note is social rather than technical. Consent, works-council agreement and the perception of surveillance are what killed the client's previous attempt — not accuracy."
    },
    {
      parameter: "Whether a shared tracker already exists and is used",
      hereValue: "Yes — a project tracker people genuinely work in",
      altValue: "No single tracker, or one nobody opens",
      architectureChange:
        "There is nowhere to put a commitment, and the system produces summaries nobody acts on. Fix that first; the assistant is worth nothing until the destination exists.",
      why: "This design's entire value is the last step — a commitment landing where the work is already tracked. Without that step it is a transcription tool with extra risk, and the client already has one of those."
    },
    {
      parameter: "Meeting style and audio conditions",
      hereValue: "Structured project meetings, mostly one speaker at a time, good headsets",
      altValue: "Fast overlapping discussion, shared room microphones",
      architectureChange:
        "Speaker attribution degrades sharply, and with it the premise of the design. Fall back to unattributed decision capture with the chair assigning owners, which is a different and much less valuable product.",
      why: "Attribution is what separates this from commodity transcription. It is also the first thing to break on real audio, and it breaks quietly — the transcript still reads plausibly with the wrong name on it."
    },
    {
      parameter: "Jurisdictional spread",
      hereValue: "One jurisdiction, one consent regime",
      altValue: "A matrix organisation across several countries",
      architectureChange:
        "Consent becomes per-participant and per-jurisdiction, resolved when someone joins rather than when a meeting is scheduled. That is a materially larger design and it constrains who may appear in a transcript at all.",
      why: "Recording law differs on whether all parties must consent. A single participant dialling in from the wrong country can make an otherwise lawful recording unlawful, and that has to be handled at join time because nothing later can undo it."
    },
    {
      parameter: "Who confirms a commitment",
      hereValue: "The named owner confirms their own items",
      altValue: "The meeting chair confirms the whole set in bulk",
      architectureChange:
        "Throughput rises sharply and attribution errors matter less, because one person is reviewing everything in context. What falls is the standing of the result — an obligation someone else accepted on your behalf carries less weight.",
      why: "This is the trade between speed and consent, and it is worth making deliberately. Bulk confirmation clears the queue; individual confirmation is what makes the tracked item feel like something the owner actually agreed to."
    },
    {
      parameter: "Meeting language",
      hereValue: "One working language",
      altValue: "Multilingual meetings with code-switching mid-sentence",
      architectureChange:
        "Diarisation and extraction both degrade, and the failure is uneven: it concentrates on the participants who switch languages, which is a fairness problem as well as an accuracy one.",
      why: "Most speech stacks assume a language per audio stream. Switching within a sentence is common in international teams and handled poorly, and the resulting error lands consistently on the same people."
    }
  ],
  assumptionsToTest: [
    "Speaker attribution accuracy in overlapping speech is the constraint the whole design rests on, and I have not tested it on realistic audio. Materially worse than assumed and the confirmation queue becomes too noisy to use.",
    "Consent handling here is described for a single jurisdiction. How much of it survives a multi-country matrix organisation, I do not know.",
    "People behave differently when recorded, and this system's value depends on meetings staying candid. I have no way to estimate that effect from a desk.",
    "Whether a confirmation queue gets cleared, rather than becoming a second backlog beside the first, is an adoption question this note does not answer."
  ],
  risks: [
    {
      n: "01",
      risk: "Commitment attributed to the wrong person",
      severity: "High",
      consequence: "False obligations and immediate loss of credibility",
      mitigation: "Owner confirmation is mandatory before any item is created; attribution confidence is shown on the card."
    },
    {
      n: "02",
      risk: "Perceived as surveillance",
      severity: "Critical",
      consequence: "Works-council block and cancellation, as before",
      mitigation: "Per-meeting opt-in, visible indicator, 30-day retention, and a schema that cannot produce individual analytics — all agreed in writing before build."
    },
    {
      n: "03",
      risk: "Confirmation fatigue",
      severity: "Medium",
      consequence: "Queue ignored and commitments still untracked",
      mitigation: "Batch confirmation in a single card per owner, with a strict cap on proposed items per meeting."
    },
    {
      n: "04",
      risk: "Mixed-language transcription errors",
      severity: "Medium",
      consequence: "Missed or garbled commitments",
      mitigation: "Language detection per utterance; low-confidence segments are shown verbatim rather than paraphrased."
    }
  ],
  kpis: [
    {
      category: "Capture",
      kpi: "Decisions captured with owner and date",
      baseline: "unmeasured",
      target: "> 90%",
      why: "The programme's reason to exist."
    },
    {
      category: "Trust",
      kpi: "Attribution corrections at confirmation",
      baseline: "n/a",
      target: "< 5%",
      why: "Directly measures whether attribution is good enough to keep."
    },
    {
      category: "Adoption",
      kpi: "Project reviews with consent granted",
      baseline: "0",
      target: "> 60%",
      why: "Consent rate is the honest adoption metric here."
    },
    {
      category: "Follow-through",
      kpi: "Confirmed commitments closed by their due date",
      baseline: "unmeasured",
      target: "improving trend",
      why: "Connects the tool to the outcome it was bought for."
    }
  ],
  roadmap: [
    {
      phase: "P0",
      name: "Consent and governance agreement",
      duration: "3 weeks",
      goal: "Written agreement with works council and DPO on capture, retention and prohibited uses.",
      deliverables: [
        "Consent model",
        "Retention policy",
        "DPIA input"
      ]
    },
    {
      phase: "P1",
      name: "Transcript and summary",
      duration: "5 weeks",
      goal: "Consent-gated capture with summaries in Teams. No tracker writes.",
      deliverables: [
        "Meeting bot",
        "Summary card"
      ]
    },
    {
      phase: "P2",
      name: "Commitment extraction",
      duration: "6 weeks",
      goal: "Extraction with attribution and the owner confirmation queue.",
      deliverables: [
        "Extractor",
        "Confirmation flow",
        "Attribution evaluation"
      ]
    },
    {
      phase: "P3",
      name: "Tracker integration",
      duration: "3 weeks",
      goal: "Confirmed commitments written to Jira with traceability back to the meeting.",
      deliverables: [
        "Jira integration",
        "Traceability report"
      ]
    }
  ],
  lessonsLearned: [
    "The blocking constraint was a works-council agreement, not a model choice. Discovery found it in the first interview.",
    "Designing the data model so it cannot answer certain questions was the concession that made the project possible.",
    "A 72-hour expiry on unconfirmed items removed the need for a queue-management feature entirely."
  ],
  futureImprovements: [
    "Cross-meeting tracking to surface repeatedly slipping commitments.",
    "Agenda-aware summaries aligned to the meeting's stated purpose.",
    "Retrieval over confirmed decisions as an organisational memory."
  ]
};

export default caseStudy;
