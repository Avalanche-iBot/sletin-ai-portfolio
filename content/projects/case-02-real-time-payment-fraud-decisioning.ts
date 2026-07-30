import type { CaseStudy } from "../types";

/**
 * Case study 02 — real-time payment fraud decisioning.
 *
 * Deliberately the opposite of case 01 in almost every dimension that matters
 * architecturally. Case 01 concludes that when the system is unsure it should
 * hand the request to a person; this one has no person to hand it to, because
 * the answer has to leave the building before the shopper's browser times out.
 * Everything downstream of that single constraint — the deployment split, the
 * choice of model family, the fallback behaviour, even where the language model
 * is allowed to sit — follows from it.
 *
 * The scenario is constructed. Figures are assumptions chosen so the
 * constraints bind, and each section that leans on a number says where it came
 * from and what changes if it is wrong.
 */
const caseStudy: CaseStudy = {
  slug: "real-time-payment-fraud-decisioning",
  order: 2,
  title: "Real-Time Payment Fraud Decisioning",
  subtitle:
    "Scoring 90 million card transactions a year inside a 40-millisecond budget — where declining a real customer costs more than the fraud it prevents.",
  industry: "Financial services · Payments",
  domain: "Risk operations · Transaction authorisation",
  status: "Architecture note",
  statusNote:
    "Discovery, analysis and architecture complete. The latency budget and the false-decline baseline are the two figures that would be measured first in a real engagement.",
  architectureComplexity: 4,
  complexityLabel: "High — hard latency budget, adversarial drift, regulated decision, two estates",
  duration: "Assumed programme length: 7 months to production",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: true,
  shortSummary:
    "A fraud decision has to be made before the authorisation response leaves the building, so there is no human in the loop and no second attempt. The architecture splits along that clock: a hot path that answers in tens of milliseconds, and a cold path where models are trained and every decision is re-examined. The language model lives entirely in the cold path — it explains decisions, and is never permitted to make one.",
  impact:
    "Target: rolling fraud rate below the exemption threshold · authentication removed from ~85% of eligible checkouts · p99 decision latency under 40 ms",
  tags: [
    "Real-time inference",
    "Fraud detection",
    "Streaming",
    "Feature store",
    "PSD2 · SCA",
    "Model governance",
  ],

  techGroups: [
    {
      group: "Decision path",
      items: [
        "Gradient-boosted trees",
        "Portable inference runtime",
        "Declarative rule engine",
        "In-process scoring",
      ],
    },
    {
      group: "State",
      items: [
        "Partitioned event log",
        "Stream processing",
        "Online feature store",
        "Append-only decision log",
      ],
    },
    {
      group: "Learning",
      items: [
        "Point-in-time training sets",
        "Backtest harness",
        "Champion / challenger",
        "Model registry",
      ],
    },
    {
      group: "Analyst side",
      items: ["Case management", "Hosted language model", "Representment drafting", "Cloud analytics"],
    },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario, used to reason through a class of problem rather than to report an engagement. The figures are assumptions chosen to make the constraints bind; where a number carries architectural weight, the section that uses it shows the derivation and says what changes if it is wrong.\n\nScenario: a European payment service provider — the PSP — routing card-not-present authorisations for roughly 4,000 mid-market merchants, about 90 million transactions a year. Its payment switch sits in its own datacentre space alongside the scheme connections. Fraud is currently handled by an ageing rule set plus a bought-in score that cannot be tuned. Stated request from the Chief Risk Officer: \"reduce fraud losses.\"\n\nDiscovery moved the problem somewhere else entirely. Fraud losses are real but bounded. The uncontrolled cost is on the other side of the same decision — legitimate customers turned away, and an authentication step now standing in front of most of the checkout flow because the PSP's fraud rate is too high to claim the exemption that would remove it. The fraud rate stopped being a risk metric during discovery and became what it actually is: a licence. Hold it under the regulatory threshold and you are permitted to take friction out of every merchant's checkout. Cross it and the friction comes back, across the whole book, for a rolling quarter.\n\nThat reframing sets the objective. The system is not there to catch as much fraud as possible — that target is trivially met by declining everything. It is there to hold the fraud rate at a level that buys the exemption, at the lowest false-decline cost that achieves it. Those are different optimisation problems with different answers.",
    verdict:
      "The model that decides and the model that explains are different systems on different sides of a boundary — and keeping them apart is the architecture.",
    highlights: [
      {
        k: "Business outcome",
        v: "Take the authentication step out of most of checkout, and be entitled to",
      },
      {
        k: "Hard constraint",
        v: "A decision inside the authorisation window — no human, no retry, no second opinion",
      },
      {
        k: "The cost that decides it",
        v: "Turning away real customers, not fraud losses",
      },
      {
        k: "Where generation sits",
        v: "Cold path only — it explains decisions it did not make",
      },
      {
        k: "What would break it",
        v: "If the switch moves to a managed cloud service, the two-estate split loses its reason to exist",
      },
    ],
  },

  businessContext: {
    narrative:
      "The PSP grew by acquisition and inherited three things it would not have designed: a payment switch it operates itself, a rule set nobody fully understands, and a bought-in fraud score whose threshold is the only control it exposes.\n\nTwo events made the current arrangement untenable. Strong customer authentication became fully enforced, which put a challenge step in front of most of the checkout flow — and merchants can see, in their own funnels, exactly how many shoppers abandon at that step. Then a large merchant left, and named decline rates in the exit conversation. Neither event was about fraud losses, and both landed on the fraud team.\n\nOn the figure carrying the most weight: the false-decline rate. In this scenario it has never been measured, because a declined transaction that was actually legitimate leaves no record saying so. The 2.4% used throughout is inferred from retry behaviour and from merchant-reported funnel data, and it is the single number I would spend the first month of a real programme establishing properly. If the true figure is closer to 0.8%, most of the business case in this note evaporates and the honest recommendation becomes buying a vendor score rather than building anything.",
    companyFacts: [
      { k: "Merchants served", v: "~4,000" },
      { k: "Card-not-present transactions / year", v: "~90 million" },
      { k: "Average transaction value, assumed", v: "€55" },
      { k: "Peak authorisations / second", v: "~85" },
      { k: "Fraud analysts", v: "11" },
      { k: "Decision budget", v: "40 ms at p99" },
      { k: "Fraud rate today, assumed", v: "~0.11% by value" },
      { k: "False decline rate, inferred", v: "~2.4% — never directly measured" },
    ],
    drivers: [
      "Authentication now stands in front of most of checkout, and merchants can see the abandonment in their own funnels.",
      "A large merchant left over decline rates and said so on the way out.",
      "The bought-in score optimises for fraud caught, which is not the number the business is losing money on.",
      "Chargeback handling is manual and grows linearly with volume, against a fixed analyst headcount.",
    ],
    constraints: [
      "The decision must return inside the authorisation window; the switch will not wait for it.",
      "The switch runs in the company's own datacentre space, next to the scheme connectivity.",
      "The cardholder data environment must not grow — every component added to it is audited annually.",
      "The fraud rate is a regulatory position, not an internal metric.",
      "Eleven analysts is the capacity. No design may assume a twelfth.",
      "No model reaches production without a named approver outside the team that built it.",
    ],
    existingStack: [
      "In-house payment switch",
      "Colocated datacentre with scheme connectivity",
      "Third-party fraud score",
      "Legacy rule engine",
      "Azure — analytics estate",
      "Case management on spreadsheets",
    ],
  },

  stakeholders: [
    {
      role: "Chief Risk Officer",
      interest: "Fraud losses down without the decline rate going up.",
      concern: "A model whose behaviour cannot be explained to a regulator or a board.",
      influence: "Sponsor",
    },
    {
      role: "Head of Merchant Success",
      interest: "Fewer declined customers and a story to tell merchants who are shopping around.",
      concern: "A risk system tuned by people who never speak to a merchant.",
      influence: "Commercial veto",
    },
    {
      role: "Head of Payment Engineering",
      interest: "Anything in the authorisation path being fast, boring and predictable.",
      concern: "A dependency that is occasionally slow — which in this path is the same as broken.",
      influence: "Latency gate",
    },
    {
      role: "Fraud analysts",
      interest: "Better cases in the queue, less assembling of context by hand.",
      concern: "Being handed a score with no reasons and asked to defend it.",
      influence: "Operational owner",
    },
    {
      role: "Compliance and model risk",
      interest: "A defensible position on the exemption and on how models are approved.",
      concern: "A model changing what it does without anyone signing anything.",
      influence: "Regulatory gate",
    },
    {
      role: "CFO",
      interest: "A number that says whether this is worth doing.",
      concern: "A platform investment justified by fraud savings that turn out to be small.",
      influence: "Budget gate",
    },
  ],

  discovery: {
    intro:
      "The brief was \"reduce fraud losses\". Discovery produced a different problem statement, and the change came from one question that had never been asked: what does it cost us when we decline someone real?",
    groups: [
      {
        audience: "Chief Risk Officer",
        goal: "Separate the loss the business feels from the loss it measures.",
        questions: [
          "What did fraud cost last year, and how confident are you in that figure?",
          "What does it cost when we decline a genuine transaction?",
          "Which of those two numbers does the board ask about?",
          "What is our fraud rate relative to the exemption thresholds, and who watches it?",
          "If you could set one number for this system, what would it be?",
        ],
        answers: [
          "Fraud losses are known to within a few per cent. False declines have never been quantified.",
          "The rolling fraud rate is reported quarterly and nobody treats it as something to steer.",
          "The board asks about fraud losses. Merchants ask about declines.",
        ],
      },
      {
        audience: "Head of Merchant Success",
        goal: "Find out what actually causes a merchant to leave.",
        questions: [
          "What did the merchant who left actually say?",
          "What do merchants compare us against when they benchmark?",
          "How visible is the authentication step in their reporting?",
          "Would a merchant accept slightly more fraud in exchange for fewer declines?",
        ],
        answers: [
          "Merchants see abandonment at the authentication step directly and attribute it to us.",
          "Nobody has ever left over fraud losses — those are largely someone else's problem.",
          "Merchants would trade fraud for conversion almost without limit, which is itself a risk.",
        ],
      },
      {
        audience: "Payment engineering",
        goal: "Establish the real budget and, more importantly, the failure behaviour.",
        questions: [
          "How long can the switch wait for a risk decision before it gives up?",
          "What does it do today when the fraud service does not answer?",
          "Where does the switch physically run, and what is the network path to anywhere else?",
          "What is the peak second of the year, and how far above average is it?",
          "What would make you refuse to put this in the path at all?",
        ],
        answers: [
          "Forty milliseconds at p99, and the switch does not wait past it.",
          "Today a timeout means the transaction is approved unscored.",
          "The switch is in our own datacentre space, next to the scheme connections.",
          "Peak is roughly thirty times the average second, and it is not a business-hours pattern.",
        ],
      },
      {
        audience: "Fraud analysts",
        goal: "Watch the work before assuming which part of it is the problem.",
        questions: [
          "Walk me through one case from the queue to a decision.",
          "What do you look at before you can even form an opinion?",
          "What does the current score tell you, and what do you wish it told you?",
          "Which cases do you get right, and which ones do you argue about?",
          "What happens to a case after you decide?",
        ],
        answers: [
          "Most of the time on a case goes to pulling the cardholder's history together by hand.",
          "The score arrives as a number with no reasons, so it is treated as an opinion, not evidence.",
          "Representment files are written from scratch each time, mostly by copying an old one.",
        ],
      },
      {
        audience: "Compliance and model risk",
        goal: "Turn the regulatory position into design constraints rather than a review at the end.",
        questions: [
          "What is our current position on the risk-analysis exemption, and how is it calculated?",
          "Who signs off a model going live, and what do they need to see?",
          "What must we be able to reconstruct if a decision is challenged months later?",
          "How do we think about dependency on a single infrastructure provider for this function?",
        ],
        answers: [
          "The fraud rate is a rolling ninety-day figure by value, so a bad fortnight is a liability for a quarter.",
          "Model approval has to come from outside the team that built it. That function does not exist yet.",
          "A challenged decision must be reproducible exactly, not approximately.",
        ],
      },
      {
        audience: "Data",
        goal: "Find out when the system can actually learn it was wrong.",
        questions: [
          "When does a confirmed fraud label arrive relative to the transaction?",
          "What signals arrive sooner, and how biased are they?",
          "Can we reconstruct what the model saw at the moment it decided?",
          "How much confirmed fraud do we see in a year?",
        ],
        answers: [
          "Chargebacks arrive between thirty and ninety days later. That is the only trustworthy label.",
          "Nothing today records what the score was computed from, so past decisions cannot be replayed.",
          "Roughly a hundred thousand confirmed fraudulent transactions a year — enough to train on.",
        ],
      },
    ],
    assumptions: [
      "The rolling fraud rate can be held below the exemption threshold with meaningful headroom, rather than just touched.",
      "The false-decline rate is materially above 1%, which is what makes the trade worth optimising at all.",
      "Feature assembly can be completed inside single-digit milliseconds at p99 against a materialised store.",
      "Roughly a hundred thousand confirmed fraud labels a year is sufficient to train and retrain a model of this kind.",
      "Merchants will accept a risk decision made by the PSP rather than by a named third-party vendor.",
    ],
    implications: [
      {
        finding: "False declines are unmeasured and probably cost several times what fraud costs",
        implication:
          "The objective function is not fraud minimisation. It is the total cost of decisions, and the two have different optima — a threshold that minimises fraud is provably not the threshold that minimises cost.",
      },
      {
        finding: "The fraud rate is a rolling ninety-day figure that gates the exemption",
        implication:
          "Regulatory headroom becomes a controlled variable with a feedback loop, not a quarterly report. The system has to steer its own fraud rate, because by the time a breach shows up it is already three months old.",
      },
      {
        finding: "A timeout today means the transaction is approved unscored",
        implication:
          "Anyone who can make the fraud service slow can turn fraud checking off. The fallback must be a degraded decision rather than an absent one, which promotes the rule layer from legacy to load-bearing.",
      },
      {
        finding: "Confirmed labels arrive thirty to ninety days late",
        implication:
          "Nothing about this system can be evaluated quickly. Shadow running and champion/challenger are not maturity phases to graduate from — they are the permanent release process.",
      },
      {
        finding: "Nothing records what the score was computed from",
        implication:
          "The served feature vector has to be logged as served. Reconstructing it later from source systems is how training and serving quietly diverge.",
      },
      {
        finding: "Analysts spend most of a case assembling context by hand",
        implication:
          "There is a real job for a language model here, and it is on the analyst's side of the boundary — assembling the case and drafting the representment, never touching the decision.",
      },
      {
        finding: "Model approval must come from outside the building team, and no such function exists",
        implication:
          "Part of the deliverable is organisational, not technical. A model registry with an approval gate is easy; the named person who signs is the hard part and has to be agreed before anything ships.",
      },
    ],
    businessRisks: [
      "Losing the exemption for a quarter, which returns friction to every merchant's checkout at once",
      "A model that holds the aggregate decline rate while getting much worse for one country or one merchant category",
      "Building a platform whose justification rests on a false-decline figure nobody has measured",
    ],
    technicalConstraints: [
      "Forty milliseconds at p99, measured at the switch, including every network hop",
      "Peak is roughly thirty times average and cannot be scaled into",
      "Cardholder data environment must not grow",
      "Per-card ordering is required for velocity features to be correct",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes for the score. Emphatically no for the language model.",
      body:
        "This is one of the few problems where a model is not a more expensive way to do what a rule already does. Holding a very low false-positive rate and a very low false-negative rate at the same time, across a feature space too large to enumerate and too fast-moving to maintain by hand, is exactly what a learned model is for. That capability is what buys the exemption, and the exemption is the business case.\n\nIt is also precisely not a job for a language model. The decision has to be reproducible months later from a logged input and a version number, attributable to specific features when a customer or a regulator asks why, and returned in tens of milliseconds. A language model fails all three, and the third by two orders of magnitude.",
    },
    automationAlternative: {
      verdict: "Rules carry more of this than a vendor pitch suggests — and all of it when the model path is down",
      canAutomate: [
        "Hard blocks on cards already known to be compromised",
        "Velocity ceilings per card, per device and per merchant",
        "Card-testing burst patterns, which are low-entropy by nature",
        "Merchant-level circuit breakers during an attack",
      ],
      cannotAutomate: [
        "Separating an unusual but genuine purchase from a well-constructed fraudulent one",
        "Holding a false-positive rate low enough to buy the exemption",
        "Keeping up when the attack pattern changes, which it does in response to you",
      ],
      body:
        "The useful framing is that the two fail differently. A rule fails by being out of date — a knowable, fixable, visible failure. A model fails by being confidently wrong on a distribution it has not seen, which is none of those things. Running both, in that order, is not redundancy. It is two unrelated failure modes covering for each other, and it is the reason the rule layer is designed first here rather than treated as the thing being replaced.",
    },
    valueAreas: [
      "The score that buys regulatory headroom, and with it the right to remove checkout friction",
      "Burst containment during card-testing attacks, before any of it reaches the model",
      "Case assembly for the analyst queue",
      "Representment drafting from the decision record",
    ],
    outOfScope: [
      "Any generative model in the decision path, under any framing",
      "Automated chargeback submission without a human signature",
      "Merchant-facing risk scoring as a product",
      "Onboarding and know-your-customer risk — a different problem on a different clock",
    ],
    conclusion:
      "Scope was reframed from \"reduce fraud\" to \"hold the fraud rate at a level that buys the exemption, at the lowest false-decline cost that achieves it\". That sentence is the specification. Everything in the architecture below is either serving it or protecting it.",
  },

  alternatives: [
    {
      option: "Run the whole system in the public cloud, including the decision path",
      verdict: "Set aside here — but the conditions that reverse this are specific",
      caseFor:
        "There is no datacentre to run and no streaming platform to operate, which removes an entire on-call rota from a company that does not have one to spare. Managed feature stores and managed streaming are genuinely good now, and the cold path is going to be in the cloud regardless — so this is the difference between one estate and two, and two estates is a real, permanent tax on every engineer who touches the system. Capacity for the thirty-times peak becomes someone else's problem rather than a rack you have to buy and leave mostly idle.",
      caseAgainst:
        "It puts a network round trip inside a path measured in tens of milliseconds, which is the one budget the whole design exists to protect. It widens the cardholder data environment, and every component inside that boundary is audited annually — a cost that recurs forever. And it concentrates a function that cannot be allowed to stop into a single provider, which under the EU's operational resilience regime is now something a payment institution has to argue deliberately rather than assume.",
    },
    {
      option: "Buy a fraud-scoring vendor instead of building one",
      verdict: "The right answer for most PSPs, and worth being honest about",
      caseFor:
        "A vendor sees fraud across hundreds of merchants and thousands of institutions. That consortium view is a genuine signal advantage no single PSP can reproduce from its own book, and it is strongest exactly where an internal model is weakest — a card attacking you for the first time has usually attacked someone else already. There is no platform to build, no model risk function to invent, and it works next quarter rather than in three.",
      caseAgainst:
        "The threshold is the only control exposed, and the threshold is the entire economic question. A vendor score optimises for fraud caught, because that is what its own benchmark rewards; it does not know what a false decline costs this PSP, and it cannot be told. The consequence is that the fraud rate determining the PSP's regulatory position ends up governed by someone else's objective function — which is a strange place to leave a licence.",
    },
    {
      option: "Rules only — improve what already exists and add no model",
      verdict: "Set aside",
      caseFor:
        "Every rule is explainable to a regulator by construction. There is no drift, no label latency, no training pipeline, no model risk function to stand up, and nothing that behaves differently next month than it does today. The industry ran on this for a long time and it was not irrational.",
      caseAgainst:
        "Rules cannot hold the false-positive rate low enough. A rule set tight enough to bring the fraud rate under the higher exemption bands declines far too much genuine traffic to be commercially survivable — and precision at that operating point is the specific thing a learned model buys. Refusing the model here means refusing the exemption, which means refusing the business case.",
    },
    {
      option: "A sequence model over the cardholder's transaction history",
      verdict: "Deferred, not rejected",
      caseFor:
        "Published work fairly consistently shows sequence models beating tree ensembles on card fraud, and the reason is intuitive: the signal is often in the shape of recent behaviour rather than in any single transaction's features. The lift is real and probably worth money.",
      caseAgainst:
        "Inference cost moves the wrong way against a budget with no slack, and feature attribution becomes an approximation at exactly the moment it has to be evidence. Deferred rather than rejected because the prerequisite is the same either way — the feature backbone and the label pipeline have to exist before any model family can be evaluated honestly, and once they do this becomes a measurement rather than an argument.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Two paths, two clocks",
        d: "The hot path is measured in milliseconds and may not depend on anything capable of being slow. The cold path is measured in days and may not touch a live decision. Every component belongs to exactly one of them, and the ones that look like they belong to both are the ones worth arguing about.",
      },
      {
        t: "Fail degraded, never open and never closed",
        d: "A timeout falls back to a rules-only decision. Failing open lets anyone who can slow the service turn fraud checking off; failing closed stops payments entirely. The middle option is the only defensible one, and it is why the rule layer shares no dependency with the model path.",
      },
      {
        t: "Decide with something you can attribute",
        d: "Every declined transaction has to yield the reasons that produced it, from the same artefact that produced it. Not a plausible explanation generated afterwards — the actual contributions, from the actual model version, reproducible from the log.",
      },
      {
        t: "Log what was served, not what can be rebuilt",
        d: "The feature vector is written exactly as the model saw it. Reconstructing it later from source systems is the mechanism by which training and serving diverge, and that divergence is invisible in every offline metric you would think to look at.",
      },
      {
        t: "Regulatory headroom is a controlled variable",
        d: "The rolling fraud rate is steered, not reported. It has a target band well below the threshold, an intervention point, and a defined response — because a figure that only updates quarterly cannot be corrected by noticing it.",
      },
      {
        t: "Generation stays out of the decision",
        d: "The language model assembles cases, summarises histories and drafts documents for a person to sign. It does not score, approve, decline or hold any authority the decision path can read. This is enforced by deployment, not by prompt.",
      },
    ],
    flowDiagram: {
      id: "authorisation-path",
      kind: "blocks",
      title: "The decision path",
      caption:
        "Everything between the request arriving and the answer leaving happens inside one budget. Rules run first and can decide alone; the model is reached only when none of them has fired. The dashed branch is what happens when the budget is about to be missed — a worse decision, taken on time, rather than a better one that arrives too late to be used.",
      nodes: [
        { id: "arrive", t: "Authorisation request", sub: "from the switch", col: 0, row: 0 },
        { id: "features", t: "Features assembled", sub: "store read · stream state", col: 1, row: 0 },
        { id: "rules", t: "Rules applied", sub: "deterministic, first", col: 2, row: 0 },
        { id: "score", t: "Scored", sub: "model, in process", col: 3, row: 0, accent: true },
        { id: "degraded", t: "Rules-only decision", sub: "budget about to be missed", col: 0, row: 1 },
        {
          id: "policy",
          t: "Decision taken",
          sub: "approve · challenge · decline",
          col: 2,
          row: 1,
          accent: true,
        },
        { id: "respond", t: "Answer returned", sub: "inside the window", col: 3, row: 1 },
        { id: "log", t: "Vector logged as served", sub: "training set and audit record", col: 2, row: 2 },
      ],
      edges: [
        { from: "arrive", to: "features" },
        { from: "features", to: "rules" },
        { from: "rules", to: "score" },
        { from: "score", to: "policy" },
        { from: "features", to: "degraded", label: "timeout", dashed: true },
        { from: "degraded", to: "policy" },
        { from: "policy", to: "respond" },
        { from: "policy", to: "log" },
      ],
    },
  },

  architecture: {
    overview:
      "Two estates with one direction of travel between them. The authorisation path — rule evaluation, feature assembly, model scoring, decision policy — runs where the switch runs, because the reason it is there is a network hop it cannot afford. Training, backtesting, model approval, analyst tooling and regulatory reporting run in the cloud, because none of them is latency-bound and operating them yourself buys nothing.\n\nThe boundary is deliberately asymmetric. Events flow out continuously. Exactly two things flow in: a signed model artefact and a signed rule set. That asymmetry is the security design as much as the deployment design — the complete list of things that can change what this system decides is two files, both signed, both versioned, both approved by someone who did not write them.",
    diagrams: [
      {
        id: "two-estates",
        kind: "layers",
        title: "Two estates",
        caption:
          "The horizontal line that matters is the boundary. Everything above it is inside a latency budget; everything below it is inside a governance process.",
        rows: [
          {
            label: "Authorisation path · own datacentre",
            nodes: [
              { t: "Payment switch" },
              { t: "Decision service", accent: true },
              { t: "Rule evaluation", accent: true },
              { t: "Model runtime", sub: "in process", accent: true },
            ],
          },
          {
            label: "Hot state · own datacentre",
            nodes: [
              { t: "Online feature store", sub: "single-digit ms reads" },
              { t: "Stream processor", sub: "partitioned by card" },
              { t: "Decision log", sub: "append-only" },
            ],
          },
          {
            label: "Boundary",
            nodes: [
              { t: "Events out", sub: "one direction" },
              { t: "Signed artefacts in", sub: "the only inbound path", accent: true },
            ],
          },
          {
            label: "Learning · cloud",
            nodes: [
              { t: "Point-in-time training sets" },
              { t: "Backtest harness" },
              { t: "Model registry", sub: "versioned, approved" },
            ],
          },
          {
            label: "Analyst operations · cloud",
            nodes: [
              { t: "Case management" },
              { t: "Case assembly", sub: "language model" },
              { t: "Representment drafting", sub: "language model" },
            ],
          },
          {
            label: "Governance",
            nodes: [
              { t: "Model approval", sub: "outside the building team" },
              { t: "Rolling fraud rate", sub: "regulatory position" },
              { t: "Exemption headroom", sub: "controlled variable" },
            ],
          },
        ],
      },
      {
        id: "label-lifecycle",
        kind: "pipeline",
        title: "How the system learns it was wrong",
        caption:
          "The constraint that shapes the entire release process. The decision is instant; knowing whether it was right takes a quarter. Every cadence in this programme is set by the third lane, not by how fast anyone can train a model.",
        lanes: [
          {
            label: "Day 0 — the decision",
            steps: [
              "Transaction scored and decided",
              "Served feature vector written",
              "Model and rule-set versions recorded",
            ],
            note: "The only moment the system holds complete information about what it just did.",
          },
          {
            label: "Days 0–7 — proxy signals",
            steps: [
              "Authentication challenge outcomes",
              "Analyst verdicts on reviewed cases",
              "Customer contact about a decline",
            ],
            note: "Fast, partial and biased. Good enough to detect a break, never good enough to measure accuracy.",
          },
          {
            label: "Days 30–90 — the real labels",
            steps: [
              "Chargebacks arrive and are matched to decisions",
              "Confirmed fraud attached to the served vectors",
              "Point-in-time training set rebuilt",
            ],
            note: "The only trustworthy label, and the reason nothing here can be evaluated quickly.",
          },
          {
            label: "Quarterly — promotion",
            steps: [
              "Challenger trained and backtested point-in-time",
              "Run in parallel for a full label cycle",
              "Approved outside the team, then promoted as an artefact",
            ],
            note: "Cadence set by label latency. Shipping faster than this means shipping without evidence.",
          },
        ],
      },
    ],
    layers: [
      {
        name: "Decision service",
        why: "One process owns rule evaluation, scoring and the decision policy, because every boundary crossed inside this path is latency spent and a failure mode added. The model is a file it loads, not a service it calls.",
      },
      {
        name: "Hot state",
        why: "Read path and write path have different service levels and different owners. The store may be seconds behind reality; it may never be slow to read. Conflating those two requirements is the standard way this layer fails.",
      },
      {
        name: "Boundary",
        why: "One direction out, two signed artefacts in. This is what makes the blast radius of the cloud estate finite — nothing over there can change a decision except through a file somebody signed.",
      },
      {
        name: "Learning",
        why: "Training sets are assembled point-in-time from what was served, never from current source data. This is the only defence against a model that backtests beautifully and then underperforms in production for reasons nobody can find.",
      },
      {
        name: "Governance",
        why: "The rolling fraud rate, the headroom against the threshold and the model approval record are one layer because they answer one question: are we still entitled to be doing this.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Decision runtime",
      choice: "A single service co-located with the switch",
      why: "Every millisecond in this path is borrowed from a shopper's checkout. Co-location is not an optimisation here — it is most of the budget.",
      alt: "A model-serving platform behind an internal API — one more hop, one more queue, one more thing that is fine at p50 and unpredictable at p99.",
    },
    {
      layer: "Model family",
      choice: "Gradient-boosted trees, exported to a portable inference format",
      why: "Microsecond inference on a few hundred features, and exact feature attribution for every decline — which is evidence rather than a story.",
      alt: "A sequence model over transaction history — better published accuracy, worse on both latency and attribution. Revisit once the backbone exists and it becomes a measurement.",
    },
    {
      layer: "Model deployment",
      choice: "The model ships as a signed, versioned artefact loaded by the service",
      why: "Promotion becomes an artefact swap with an instant rollback, and there is no network between a decision and the model that made it.",
      alt: "A separately deployed model service — easier to update independently, which is exactly the property you do not want for the thing that decides.",
    },
    {
      layer: "Feature computation",
      choice: "Streaming aggregation writing to a materialised online store",
      why: "It splits the two service levels cleanly: the write path may lag, the read path may not. Velocity features are already computed by the time they are needed.",
      alt: "Computing features on request from source systems — always correct, and impossible inside the budget.",
    },
    {
      layer: "Feature definitions",
      choice: "One definition compiled into both the streaming job and the training job",
      why: "Training and serving skew is the failure that kills fraud models quietly. Two implementations of \"transactions in the last hour\" will eventually disagree, and nothing will alert.",
      alt: "Separate SQL for training — faster to write, and the divergence surfaces months later as accuracy loss nobody can attribute.",
    },
    {
      layer: "Event transport",
      choice: "A partitioned log, partitioned by card",
      why: "Ordering per card is what makes velocity features correct. Partitioning by card gives that guarantee for free and scales horizontally at the same time.",
      alt: "A queue without ordering guarantees — simpler to operate, and velocity becomes approximate exactly where precision matters most.",
    },
    {
      layer: "Rule evaluation",
      choice: "Declarative rules, versioned and reviewed like code, evaluated before the model",
      why: "Some decisions have to be a rule you can point at. It is also the standalone fallback, which is why it may not share a dependency with the model path.",
      alt: "Rules inside the model as engineered features — tidier, and it removes the one component that still works when the model does not.",
    },
    {
      layer: "Decision log",
      choice: "Append-only, storing the served vector alongside both version numbers",
      why: "It is the training set and the audit record at once. A decision is reproducible from this row and nothing else, which is what \"reproducible\" has to mean when the question arrives ten months later.",
      alt: "Logging inputs and re-deriving features later — smaller, and it destroys the only defence against skew.",
    },
    {
      layer: "Analyst tooling",
      choice: "Hosted language model in the cloud estate, on the analyst's side of the boundary",
      why: "Case assembly and representment drafting are genuine document work with a human signature at the end. Cost scales with the queue, not with transaction volume.",
      alt: "No generation at all — defensible, and it leaves eleven analysts assembling context by hand at volumes that are growing.",
    },
    {
      layer: "Cold-path platform",
      choice: "Managed cloud services throughout",
      why: "Nothing here is latency-bound, so the argument for operating it yourself disappears entirely. This is where the existing Azure estate is reused rather than duplicated.",
      alt: "Extending the on-premises footprint to cover training — consistent, and it pays datacentre costs for the one workload that genuinely is bursty.",
    },
  ],

  security: {
    posture:
      "The interesting property of this design is negative: the decision path has no inbound route from the internet and no inbound route from the cloud estate. Events leave; nothing enters except a signed model artefact and a signed rule set. The complete list of things that can change what this system decides is those two files, and both are versioned, both are approved outside the team that produced them, and both can be rolled back to a known state in the time it takes to restart a process.\n\nThe second organising idea is that the decision path never reads free text. No merchant descriptor, no customer message, no field a third party controls the wording of reaches anything that interprets language — because nothing in that path interprets language at all. A whole class of attack is absent by construction rather than defended against, and that is a large part of why generation is confined to the far side of the boundary.",
    controls: [
      {
        t: "One-way boundary",
        d: "Decisions and features flow out to the cloud estate continuously. There is no path back that can influence a live decision. A full compromise of the analytics estate does not change what the next transaction is scored as.",
      },
      {
        t: "Models treated as executable supply chain",
        d: "A model artefact is code by any useful definition — it determines behaviour and it comes from outside the running system. Signed at build, verified at load, and refused if the signature or the expected feature schema does not match.",
      },
      {
        t: "Cardholder data never leaves the switch in the clear",
        d: "Tokenisation happens before anything reaches the decision service. Features are derived values; the primary account number is not one of them. This is what keeps the audited boundary from expanding to cover the whole platform.",
      },
      {
        t: "No free text on the decision path",
        d: "Nothing in the authorisation path parses attacker-controlled language, which removes prompt injection as a category rather than mitigating it. The generative components sit behind the analyst, where the worst case is a bad draft a person declines to sign.",
      },
      {
        t: "Segregation of duties on promotion",
        d: "Whoever trains a model does not approve it. This is a control against optimism as much as against malice — the person who spent six weeks on a challenger is the worst-placed person to judge whether it is ready.",
      },
      {
        t: "Exact reproducibility of any decision",
        d: "Given a logged vector and two version numbers, a past decision recomputes bit-for-bit. Without this, answering a challenged decline is an argument about probability rather than a demonstration.",
      },
      {
        t: "Rule set as reviewed code",
        d: "Rules live in version control with the same review requirement as the service, because a rule change and a code change have identical blast radius and only one of them traditionally gets reviewed.",
      },
      {
        t: "Probing detection",
        d: "An adversary tests the boundary before crossing it, and that testing looks like a distinctive pattern of near-threshold transactions. Enumeration patterns are monitored as a first-class signal rather than being left to the model that is being enumerated.",
      },
      {
        t: "Scoped analyst access, tokenised throughout",
        d: "The case store holds tokenised identifiers, and the generative components see the same tokenised view an analyst does. A summarising model is given no data its reader would not already be entitled to.",
      },
    ],
  },

  scalability: {
    body:
      "Worth being precise about what is under pressure here, because it is not average load. Ninety million transactions a year is under three per second on average — trivially small. The problem is that peak is roughly thirty times that, and it does not follow business hours: a card-testing attack is thousands of attempts against one merchant in a few minutes, and it arrives exactly when the decisions matter most.\n\nThe consequence is uncomfortable and worth stating plainly: you cannot autoscale inside a forty-millisecond budget. By the time an autoscaler has noticed, the transactions it was meant to serve have already timed out. The hot path is provisioned for the worst minute of the year and left there. That is not a cost failure, it is the price of the guarantee — and it is why the cost section argues that the infrastructure bill is the wrong thing to optimise.\n\nThe dimension that genuinely scales badly is elsewhere: an attack burst simultaneously spikes load and distorts the feature distribution the model is reading. The system's busiest moment is also the moment its model is least reliable, which is a good reason for the cheapest component to be the one that handles it.",
    levers: [
      {
        t: "Provisioned, not elastic, on the hot path",
        d: "Sized for peak and left there. The saving comes from keeping the path small — few components, no network hops, no queues — rather than from scaling anything down.",
      },
      {
        t: "Bursts absorbed by rules, before the model",
        d: "A card-testing attack is low-entropy by nature, which makes it the easiest thing for a rule to catch and the worst thing to score. Containing it in the rule layer protects both the latency budget and the model's input distribution.",
      },
      {
        t: "Partitioned by card end to end",
        d: "The same partition key carries per-card ordering and horizontal scale together, so growth in merchants or volume never forces a rethink of how velocity is computed.",
      },
      {
        t: "Read replicas for the feature store",
        d: "Reads scale independently of the streaming writes. The read path is on the critical path and the write path is not, so they should never contend for the same capacity.",
      },
      {
        t: "Backpressure stops at the boundary",
        d: "If export to the cloud estate falls behind, decisions continue and export degrades. The cold path is allowed to be late; it is never allowed to be a dependency.",
      },
      {
        t: "Analyst queue as the real ceiling",
        d: "The system can flag faster than eleven people can review. Queue depth needs a monitored ceiling, because a challenge nobody reviews is a decline with extra steps.",
      },
    ],
  },

  costOptimization: {
    body:
      "The infrastructure bill is not the number that decides this programme, and saying so is the point of this section. Both estates together come to somewhere around €270,000 a year — a rack's worth of provisioned capacity on one side, training and analyst tooling on the other. That figure is not nothing, but it is not what anyone should be optimising.\n\nThe numbers that matter are two orders of magnitude larger and both sit on the decision itself. At an assumed 0.11% fraud rate by value on €4.95bn of annual volume, fraud costs about €5.4m a year; holding the rate under 0.06% brings that to roughly €3.0m. That €2.4m is the visible saving, and it is the smaller half.\n\nThe larger half is the exemption. Around 62 million transactions currently carry an authentication step, and at an assumed 8% abandonment that is roughly 5 million transactions lost at the challenge — about €270m of merchant volume. Claiming the exemption on the eligible share removes most of that friction. The PSP's direct revenue on the recovered volume is modest at a fraction of a per cent, but it is not the point: this is the number the merchant sees in its own funnel, and merchant retention is what the whole programme is actually being paid for.\n\nOne caution about the arithmetic. Every percentage above is an assumption, and the one carrying the most weight is the 8% abandonment figure — it varies enormously by market, by device mix and by how the challenge is implemented. Treat the structure as the durable part and re-derive the euros against measured funnel data before anyone commits a budget to them.",
    levers: [
      {
        n: "01",
        t: "Optimise the decision, not the model",
        d: "The decision threshold is an economic parameter derived from the cost of each kind of error, not a number tuned once against a validation set. It is re-derived quarterly as those costs move.",
      },
      {
        n: "02",
        t: "Rules before the model on bursts",
        d: "An attack is the cheapest traffic to catch and the most expensive to score. Containing it before the model is a cost lever and a quality lever at the same time.",
      },
      {
        n: "03",
        t: "Provision the hot path and stop",
        d: "Elasticity has no value inside the budget, so there is nothing to gain from chasing utilisation. The saving is in keeping the path short, not in scaling it.",
      },
      {
        n: "04",
        t: "Keep the cold path elastic",
        d: "Training and backtesting are the only genuinely bursty compute in the system, and the only place where managed cloud pricing works in your favour rather than against it.",
      },
      {
        n: "05",
        t: "Generation priced per case, not per transaction",
        d: "The language model touches only what reaches an analyst — a fraction of a per cent of volume. Its cost is bounded by the queue and by headcount, so it cannot scale with the business.",
      },
    ],
    model: [
      { k: "Annual card-not-present transactions", v: "~90,000,000" },
      { k: "Average transaction value, assumed", v: "€55 — about €4.95bn of annual volume" },
      { k: "Fraud rate today, assumed", v: "0.11% by value — roughly €5.4m a year" },
      { k: "Target band", v: "Below 0.06% — the reference fraud rate for the €250 exemption threshold value band" },
      { k: "Fraud loss at the target rate", v: "About €3.0m — a €2.4m annual reduction" },
      { k: "Transactions carrying an authentication step", v: "~62m" },
      { k: "Challenge abandonment, assumed", v: "8% — roughly 5m transactions lost at the step" },
      { k: "Merchant volume behind that abandonment", v: "~€270m a year" },
      { k: "Hot-path infrastructure", v: "~€180k a year, provisioned for peak" },
      { k: "Cold path, analyst tooling and generation", v: "~€90k a year" },
      {
        k: "The comparison that decides it",
        v: "€270k of infrastructure against €2.4m of fraud and €270m of merchant volume",
      },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "The rolling fraud rate crosses the exemption threshold",
      severity: "Critical",
      consequence:
        "The exemption is lost for a rolling quarter and the authentication step returns across every merchant at once — commercial damage far exceeding any fraud it prevents",
      mitigation:
        "Headroom is a controlled variable with a target band well below the threshold and a defined response. Rules tighten automatically as headroom shrinks, before a person is asked to decide anything.",
    },
    {
      n: "02",
      risk: "The decision path fails open under load",
      severity: "Critical",
      consequence:
        "Anyone able to make the service slow can switch fraud checking off, which converts a performance problem into an attack",
      mitigation:
        "Timeouts fall to a rules-only decision, never to approval. The rule path shares no dependency with the model path, so the failure that degrades one cannot reach the other.",
    },
    {
      n: "03",
      risk: "Training and serving features diverge",
      severity: "High",
      consequence:
        "Accuracy decays with no alert, because every offline metric is computed on the wrong data and looks fine",
      mitigation:
        "Train on the served vector. A daily job recomputes a sample from source and compares it against what was served, alerting on divergence rather than waiting for accuracy to explain it.",
    },
    {
      n: "04",
      risk: "Label latency hides a bad model for a quarter",
      severity: "High",
      consequence: "Three months of degraded decisions before the evidence arrives to prove it",
      mitigation:
        "Fast proxy signals for break detection, a challenger running in parallel for a full label cycle, and no promotion without point-in-time backtesting on labels that had actually arrived.",
    },
    {
      n: "05",
      risk: "Declines concentrate on one segment",
      severity: "High",
      consequence:
        "The aggregate rate is held while one country, issuer or merchant category is treated much worse — a commercial problem and a fairness problem at once",
      mitigation:
        "Decline rates monitored per segment rather than in aggregate only, with segment regression treated as a release blocker rather than a finding.",
    },
    {
      n: "06",
      risk: "The generated case narrative is mistaken for the reason",
      severity: "Medium",
      consequence:
        "A fluent summary is repeated to a customer or into a representment file as though it were the cause of the decision, which puts an invented explanation into a legal document",
      mitigation:
        "Feature attributions come from the model artefact and are rendered separately from any generated text, each labelled as what it is. The representment record stores both, and the analyst signs against the attributions.",
    },
  ],

  kpis: [
    {
      category: "Regulatory",
      kpi: "Rolling 90-day fraud rate by value",
      baseline: "0.11%",
      target: "< 0.045%",
      why: "The target sits deliberately below the 0.06% reference rate that governs the €250 band. Running at the threshold is the same as planning to cross it, and the bands step down sharply — the next one up is an order of magnitude tighter.",
    },
    {
      category: "Commercial",
      kpi: "Eligible transactions cleared without an authentication step",
      baseline: "~0%",
      target: "> 85%",
      why: "The thing merchants actually see, and the reason the fraud rate is worth holding down.",
    },
    {
      category: "Quality",
      kpi: "False decline rate",
      baseline: "~2.4% (inferred)",
      target: "< 1.4%",
      why: "The larger of the two error costs, and the one that has never been measured.",
    },
    {
      category: "Quality",
      kpi: "False decline rate in the worst segment",
      baseline: "Unknown",
      target: "< 2x the overall rate",
      why: "An aggregate that hides one badly-served market is not an aggregate worth reporting.",
    },
    {
      category: "Performance",
      kpi: "Decision latency at p99",
      baseline: "n/a",
      target: "< 40 ms",
      why: "The median is irrelevant. The budget is breached in the tail, and the tail is where attacks live.",
    },
    {
      category: "Resilience",
      kpi: "Share of decisions taken on the degraded path",
      baseline: "n/a",
      target: "< 0.1%",
      why: "A rising figure is the earliest signal that something upstream is slow, well before latency alerts fire.",
    },
    {
      category: "Governance",
      kpi: "Decisions reproducible from log and version numbers",
      baseline: "0%",
      target: "100%",
      why: "Anything less means a challenged decision is answered with an argument rather than a demonstration.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Baseline both losses",
      duration: "4 weeks",
      goal: "Establish what a false decline actually costs, since the entire business case rests on a figure nobody has measured.",
      activities: [
        "Retry and funnel analysis across a representative merchant sample",
        "Reconstruct the rolling fraud rate and its distance from each threshold",
        "Measure the real latency budget at the switch rather than accepting the stated one",
      ],
      deliverables: [
        "Measured false-decline baseline",
        "Exemption headroom position",
        "Decision cost model",
      ],
    },
    {
      phase: "P1",
      name: "Event backbone and feature store",
      duration: "8 weeks",
      goal: "Build the state layer and start logging served vectors. No model goes near a decision in this phase.",
      activities: [
        "Partitioned event log and streaming aggregation",
        "Online feature store with a measured read profile at p99",
        "Decision logging in the existing rules-only path",
      ],
      deliverables: [
        "Feature definitions compiled to both paths",
        "Served-vector decision log",
        "Replay capability over historical decisions",
      ],
    },
    {
      phase: "P2",
      name: "Shadow decisioning",
      duration: "8 weeks",
      goal: "Score every transaction and decide none of them, for long enough that a full label cycle completes.",
      activities: [
        "First model trained point-in-time on replayed decisions",
        "Scoring in the live path with the output discarded",
        "Model registry and the approval gate, including naming the approver",
      ],
      deliverables: [
        "Shadow accuracy report against arrived labels",
        "Segment-level decline analysis",
        "Model approval process with a named owner",
      ],
    },
    {
      phase: "P3",
      name: "Live decisioning and exemption claiming",
      duration: "10 weeks",
      goal: "Take the decision, then claim the exemption once the rate has held with headroom for a full rolling window.",
      activities: [
        "Model output promoted to the decision, rules retained ahead of it",
        "Degraded-path behaviour tested under induced failure",
        "Headroom control loop and the analyst case tooling",
      ],
      deliverables: [
        "Live decision path with rules-only fallback",
        "Exemption claimed on eligible traffic",
        "Analyst console with case assembly and representment drafting",
      ],
    },
  ],

  tailoring: [
    {
      parameter: "Where the payment switch runs",
      hereValue: "The PSP's own datacentre space, next to the scheme connections",
      altValue: "The switch is itself a managed cloud service",
      architectureChange:
        "The two-estate split collapses. Run everything in one cloud estate on managed streaming and a managed feature store, and the operations capability this design requires stops being necessary at all.",
      why: "The split exists to avoid a single network hop. Once the switch is already in the cloud, that hop is either gone or unavoidable, and every argument built on top of it goes with it. This is the assumption most likely to be different at another PSP, and it changes more than any other.",
    },
    {
      parameter: "Latency budget",
      hereValue: "40 ms at p99, measured at the switch",
      altValue: "200 ms or more — an issuer's window, or scoring after authorisation",
      architectureChange:
        "The model can be a service rather than a loaded artefact, sequence models become viable, and a second-stage scorer can be afforded on the uncertain band where the cheap model is least confident.",
      why: "Almost every constraint in this design descends from the budget: the deployment topology, the model family, the in-process runtime, the absence of a human. Relax it and most of the design's distinctive features stop being necessary.",
    },
    {
      parameter: "Whether a risk-based exemption is available",
      hereValue: "Yes — the fraud rate gates the right to skip authentication",
      altValue: "A market with no equivalent regime, or a segment the rules do not cover",
      architectureChange:
        "The headroom control loop disappears entirely. The threshold becomes a pure economic optimisation against fraud loss and decline cost, and the operating point moves considerably more aggressive.",
      why: "The regulation is what converts a performance metric into a licence. Without it, precision is worth exactly what it saves; with it, precision is worth what it permits — and those are different enough to produce different architectures.",
    },
    {
      parameter: "Annual transaction volume",
      hereValue: "~90 million, roughly 100,000 confirmed fraud labels a year",
      altValue: "Under 5 million",
      architectureChange:
        "Do not build this. Buy a vendor score and spend the engineering budget on the rule layer and the analyst tooling instead.",
      why: "Fraud modelling is data-hungry in a specific way: the positives are rare. At a twentieth of this volume you have a few thousand confirmed frauds a year, which is too few to train on and far too few to detect a regression against. The platform cost also has nothing to amortise against.",
    },
    {
      parameter: "Label latency",
      hereValue: "30–90 days, via chargeback",
      altValue: "Same-day confirmation of fraud",
      architectureChange:
        "Champion/challenger cycles compress from a quarter to a week, online adaptation becomes defensible, and the elaborate proxy-signal layer can be dropped in favour of the real thing.",
      why: "Everything about the release process here — shadow running, parallel challengers, quarterly promotion — is shaped by how long the system must wait to learn it was wrong. Shorten that wait and the process simplifies at every step.",
    },
    {
      parameter: "Who carries the fraud loss",
      hereValue: "The PSP, on unauthenticated transactions",
      altValue: "Liability shifts to the issuer once a transaction is authenticated",
      architectureChange:
        "The incentive inverts. You would challenge more rather than less, and the model's job becomes routing liability rather than preventing loss — a different objective function with a different operating point.",
      why: "This is the one parameter that changes what the system is for rather than how it is built. Every other row here alters the design; this one alters the specification, which is worth separating out because it is the easiest to get wrong when transplanting the reasoning.",
    },
  ],

  counterpart: {
    slug: "ai-patient-communication-platform",
    note: "The same question — what to do when the system is not sure — answered under the opposite constraint. That note has minutes and a person to escalate to, and builds its entire safety case on being able to. Reading the two together is the clearest way to see how much of a design is really a consequence of its latency budget.",
  },
  assumptionsToTest: [
    "The 2.4% false-decline rate is inferred, not measured, and the business case is disproportionately sensitive to it. If the real figure is nearer 0.8%, the honest recommendation becomes buying a vendor score.",
    "The exemption thresholds and the rolling-window calculation are stated as I understand the regime. Both should be confirmed against the current technical standards and the national competent authority before anything is designed around them.",
    "The 40 ms budget is an assumption about where the switch sits and what the scheme timeouts allow. It should be measured at the switch in week one, not accepted from a document.",
    "Whether 85% of challenges can genuinely be exempted depends on the distribution of transaction values against the exemption tiers, which this note does not model.",
    "In-process tree inference is comfortably fast enough — that part I am confident about. Feature store reads at p99 are where the budget will actually be spent, and I have not benchmarked them.",
    "The 8% challenge abandonment figure drives the largest number in the cost model and varies widely by market and implementation.",
  ],

  lessonsLearned: [
    "The brief named the wrong loss. Fraud was measured to within a few per cent; the cost of declining real customers had never been calculated at all, and it was the larger of the two.",
    "Designing the failure behaviour first changed the architecture. Once the answer to \"what happens when we time out\" became \"rules only\", the rule layer stopped being legacy awaiting replacement and became the component everything else leans on.",
    "The regulation turned out to be the design document. Once the fraud rate was understood as a licence rather than a metric, most of the arguments about where to set the threshold resolved themselves.",
    "The most useful thing I did with a language model in this case was keep it out of the decision — and then find it honest work on the other side of the boundary.",
  ],

  futureImprovements: [
    "Graph features across merchants, which is the signal a single-merchant view cannot see and the strongest argument consortium vendors have.",
    "Drive rule tightening from the headroom loop directly, rather than from a person watching the number move.",
    "A second-stage scorer on the uncertain band, if measurement shows the budget has room for one.",
    "Extend reproducibility into a customer-facing explanation, so a declined cardholder gets the actual reasons rather than a generic message.",
  ],
};

export default caseStudy;
