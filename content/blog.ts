import type { BlogPost } from "./types";

/**
 * Written pieces, newest intent first.
 *
 * Each post is the one argument from a case note that stands on its own. That
 * is deliberate rather than lazy: a post invented separately from the notes
 * eventually contradicts them, and writing it out of a note keeps the two
 * consistent while halving the work.
 *
 * `body` is optional so a post can be listed before it is written, but an
 * empty queue is better than a long one — a list of announced-and-unwritten
 * titles costs more credibility than an empty blog does. Publish, then add.
 */
export const posts: BlogPost[] = [
  {
    slug: "why-i-write-case-notes-about-companies-that-do-not-exist",
    title: "Why I write case notes about companies that don't exist",
    excerpt:
      "The convention in this genre is anonymised client work. I think the anonymising removes precisely the parts worth reading, and that a scenario built on purpose can be more honest than a real one with the names taken out.",
    date: "2026-07-30",
    readingTime: "4 min",
    tags: ["Method", "Writing", "Architecture"],
    category: "Method",
    featured: true,
    body: [
      {
        paragraphs: [
          "The first objection to everything on this site is the obvious one: none of these companies exist. The dental group with 38 clinics, the payment provider with 4,000 merchants — I made them up. So what is any of it worth?",
          "It is a fair question and I want to answer it properly, because the alternative convention is so well established that departing from it looks like evasion.",
        ],
      },
      {
        heading: "What anonymising actually removes",
        paragraphs: [
          "The normal way to build a portfolio like this is to take real engagements and sanitise them. Change the client's name, generalise the numbers, drop anything commercially sensitive. It is honest work and it demonstrates that you have done the job.",
          "But look at what survives that process. The client becomes \"a European insurer\". The volume becomes \"high\". The budget disappears entirely, because budgets are exactly what a client does not want published. The constraint that actually decided the architecture — the one that made three obvious options impossible — is usually the most confidential thing in the room, so it goes first.",
          "What is left is a description of what was built. Which is the least interesting part, because it is the *output*. The reasoning that produced it has been redacted out.",
          "And the reader cannot check any of it anyway. If I write that a system reduced handling time by 40%, you have no way to verify that, whether the engagement was real or not. Anonymised work asks for trust and then makes trust impossible to earn.",
        ],
      },
      {
        heading: "What a constructed scenario buys",
        paragraphs: [
          "If I invent the scenario, I control the constraints. That sounds like cheating and it is the opposite: it means I can choose constraints that actually bind, and then have to live with them for the whole note rather than quietly relaxing the inconvenient one.",
          "I can state every figure, because no client is exposed by it. I can say that the budget is €250,000 and that a per-request cost above three cents breaks the business case, and then show the arithmetic that gets from token counts to that number. Nobody has to approve the publication.",
          "Most importantly, I can be explicit about which numbers I invented and what happens if they are wrong. Every note on this site carries a section doing exactly that — naming a parameter, the value assumed, a plausible alternative, and what the architecture becomes at that value. That section is impossible to write about a real client. You cannot publish \"here is what we would have built if their data volume had been a tenth of what it was\" without telling everyone what it was.",
        ],
      },
      {
        heading: "The cost, stated plainly",
        paragraphs: [
          "This buys nothing in the way of proof. Nothing here demonstrates that I have delivered a system, kept one running, or been in the room when a design met production and lost.",
          "I am not going to pretend otherwise or dress it up. If you want evidence of delivery, a CV and a reference do that job and this does not. These notes make one claim only: that the reasoning is worth reading and worth arguing with.",
        ],
      },
      {
        heading: "Why it is not fiction",
        paragraphs: [
          "The scenarios are invented. Almost nothing else is.",
          "Regulations are real, and I check them rather than paraphrasing what I half-remember. Latency budgets in payment authorisation are real. The failure modes are real: training and serving features drifting apart, an escalation queue nobody clears, a retrieval system confidently citing a superseded revision. Cost structures are real, and where I use a price I say it is an assumption anchored to a moment rather than a quote.",
          "What is constructed is the arrangement — a particular company, with a particular combination of constraints, chosen so that the interesting trade-off is forced rather than avoidable. That is closer to how an architecture exercise works in an interview or a design review than it is to storytelling.",
        ],
      },
      {
        heading: "The test I would apply",
        paragraphs: [
          "If a note is only interesting because of who the client was, it was never about architecture. The useful question is whether the reasoning transfers — whether a reader facing a different volume, a different regulator and a different estate can work out which parts of the argument survive.",
          "That is why every note ends by naming the parameters it is most sensitive to. It is the section I would read first, and it is the one that anonymised work structurally cannot have.",
          "Disagree with any of it. That is the point of publishing the reasoning rather than the result.",
        ],
      },
    ],
  },

  {
    slug: "two-estates-when-part-of-the-system-cannot-live-in-the-cloud",
    title: "Two estates: when part of a system cannot live in the cloud",
    excerpt:
      "Three reasons to keep part of an AI system off the cloud that survive scrutiny — none of which is a complaint about the cloud. And the honest accounting of what running two estates costs you forever.",
    date: "2026-07-30",
    readingTime: "5 min",
    tags: ["Deployment", "Latency", "Compliance", "DORA"],
    category: "Architecture",
    featured: true,
    body: [
      {
        paragraphs: [
          "The default is one estate in one cloud, and it is the right default. Two estates means two deployment pipelines, two on-call rotations, two sets of credentials, and an engineer who has to hold both in their head to debug anything crossing the boundary. That is a permanent tax, paid every sprint, forever.",
          "So the bar for splitting a system is high. What follows is what I think clears it — and, first, what does not.",
        ],
      },
      {
        heading: "The argument that does not survive",
        paragraphs: [
          "\"The cloud cannot do this.\" It almost always can. Managed streaming, managed feature stores, managed inference: these are mature products and an architect reading your justification knows it. A design defended by understating what the alternative is capable of loses the reader at that paragraph, and everything after it is read with suspicion.",
          "Swapping one hyperscaler for another is not an argument either. Same drawing, different logos. If the reason you moved is that the second vendor is cheaper this quarter, say that — it is a legitimate reason and pretending it is architectural is not.",
        ],
      },
      {
        heading: "One: you are co-locating with something that cannot move",
        paragraphs: [
          "This is the strongest reason and the least ideological. Some decisions have to be returned inside a window measured in tens of milliseconds — a payment authorisation, an ad auction, a control loop on a production line. The budget is not yours to negotiate; it belongs to whatever is waiting for the answer.",
          "If the thing waiting sits in your own datacentre, a round trip out to a cloud region and back can consume most of the budget the system exists to protect. Not the compute — the distance. And you cannot autoscale your way out of it, because by the time an autoscaler has noticed the load, the requests it was meant to serve have already timed out.",
          "Note the shape of this argument: the constraint is not \"which cloud\", it is \"in the same building as the thing that is waiting\". If that thing ever moves to a managed cloud service, the entire justification evaporates and you should move with it.",
        ],
      },
      {
        heading: "Two: you are keeping an audited boundary small",
        paragraphs: [
          "Certain scopes — the cardholder data environment under PCI DSS is the clearest example — are audited annually, component by component. Everything inside the boundary costs money every year, not once.",
          "This is frequently misunderstood as \"you cannot do PCI in the cloud\", which is false; the major providers are certified service providers and plenty of compliant systems run entirely on them. The real question is narrower and more practical: does putting this component here make the audited estate larger or smaller? A scoring service that never sees a card number, sitting outside the boundary, is a different proposition from one that does.",
          "The architectural move that follows is worth more than the deployment decision: tokenise at the earliest possible point, so that everything downstream handles derived values and the audited boundary stops at the edge rather than spreading through the platform.",
        ],
      },
      {
        heading: "Three: concentration is now something you have to argue",
        paragraphs: [
          "For financial entities in the EU, the Digital Operational Resilience Act has been applicable since January 2025. Among other things it requires managing dependency on critical ICT third-party providers, maintaining a register of those arrangements, and having an exit strategy that is more than a slide.",
          "This does not prohibit anything. What it changes is the default: for a function that cannot be allowed to stop, \"all of it with one provider\" becomes a position you have to defend deliberately rather than one you arrive at by not thinking about it. That is a reasonable thing for a regulator to want, and it is a genuinely new input to a deployment decision that most AI architecture writing has not caught up with.",
        ],
      },
      {
        heading: "What the split looks like when it is done well",
        paragraphs: [
          "Not a system spread evenly across two places. A system cut along a clock.",
          "One side is whatever must answer inside the window: the request path, the state it reads, the model it runs. It is deliberately small — few components, no network hops, no queues — because everything in it is provisioned for the worst minute of the year and left there.",
          "The other side is everything measured in hours or days: training, backtesting, model approval, analytics, the tooling humans use. None of it is latency-bound, so the argument for operating it yourself disappears entirely. This is where managed services earn their keep.",
        ],
        bullets: [
          "Make the boundary one-directional. Events flow out continuously; the only things flowing in are signed artefacts.",
          "That inbound list is your real attack surface — if a model file and a rule set are the only things that can change behaviour, the blast radius of the whole cloud estate is finite and nameable.",
          "Let the cold path fall behind. It may be late; it may never be a dependency.",
          "Write down the condition that would collapse the split, and revisit it. Mine is \"if the switch becomes a managed service\".",
        ],
      },
      {
        heading: "Be honest about the bill",
        paragraphs: [
          "Two estates cost real money in engineer-hours and will keep costing it. If the only justification is a preference, or a general unease about the cloud, do not do it — you will pay the tax for years and get nothing back.",
          "But when one of the three above genuinely applies, the split is not a compromise. It is the design, and the single estate is the compromise.",
        ],
      },
    ],
  },

  {
    slug: "four-constraints-that-eliminate-most-architectures",
    title: "Four constraints that eliminate most architectures",
    excerpt:
      "Discovery usually produces a requirements list nobody reads twice. Four questions do more than the whole document, because their answers remove options rather than adding them.",
    date: "2026-07-30",
    readingTime: "4 min",
    tags: ["Discovery", "Requirements", "Enterprise AI"],
    category: "Architecture",
    featured: true,
    body: [
      {
        paragraphs: [
          "Most discovery output is additive. Stakeholders describe what they want, someone writes it down, and the result is a list of capabilities that any number of architectures could satisfy. It is not useless, but it does not decide anything.",
          "The questions worth asking are the ones whose answers *remove* options. Four of them do most of the work, and asking them in the first fortnight will save you from designing something that was never going to be allowed.",
        ],
      },
      {
        heading: "One: where may the data be, and where may it not go?",
        paragraphs: [
          "Residency is usually treated as a compliance checkbox to be confirmed near the end. It is not. It is a filter applied to the option set before evaluation begins.",
          "If personal data may not leave a jurisdiction, then the question is no longer \"which model is best\" but \"which models exist for me at all\" — because model availability by region is uneven, and the strongest option is frequently not offered where you need it. The same applies to the retrieval service, the vector index, and anywhere logs land.",
          "Ask it first and you evaluate three options properly. Ask it last and you evaluate eight, then discard five.",
        ],
      },
      {
        heading: "Two: who operates this after handover, and what is their actual job?",
        paragraphs: [
          "Not \"do you have a data team\" — the useful version is about the named person who will be paged at three in the morning in eighteen months' time, and what else that person is responsible for.",
          "Where the answer is a DevOps engineer whose day job is something else, managed services stop being one option among several and become the only defensible choice. Not because they are technically superior — a self-hosted embedding model and an operated vector store will usually be cheaper per query at volume — but because they survive handover to someone whose attention is elsewhere.",
          "This constraint eliminates more designs than any other, and it is the one most often discovered after the architecture is drawn.",
        ],
      },
      {
        heading: "Three: what already exists that you must inherit?",
        paragraphs: [
          "Identity, permissions, audit trails, document storage. In an organisation of any age these exist, are governed, have an owner and a review cycle, and someone notices when they break.",
          "A design that reuses them inherits all of that for free. A design that introduces a second source of truth for who works here has created a liability — the place where a departed employee's access quietly survives.",
          "This constraint cuts both directions, which is why it is worth stating explicitly. Inheriting an estate makes a project dramatically cheaper, and it is not architecture, it is luck. When a note says a system was quick to build because identity and audit were already there, that part does not transfer to a reader whose organisation has neither.",
        ],
      },
      {
        heading: "Four: what per-request cost makes this worth doing?",
        paragraphs: [
          "Ask for a number, not a sentiment. A ceiling turns cost from a reporting line into a non-functional requirement, and non-functional requirements change designs.",
          "Once there is a figure, routing becomes an architectural concern rather than an optimisation. Whether a request reaches a model at all, which tier answers it, how much retrieved context is packed into the prompt, whether a cache sits in front — these stop being tuning and become the thing that decides whether the system is viable.",
          "A ceiling nobody can see daily is not a constraint, it is a hope. Which means the answer to this question also produces a dashboard requirement and, ideally, a cost regression test in CI: price a representative traffic mix on every change, like any other non-functional requirement.",
        ],
      },
      {
        heading: "Why these four",
        paragraphs: [
          "Each one, answered honestly, invalidates whole categories of design. Residency removes providers. Operating capability removes self-hosted anything. An inherited estate removes — or adds — an entire identity and storage workstream. A cost ceiling removes architectures where every request reaches a model.",
          "Answer all four and the remaining option space is usually small enough to reason about properly. That is the actual output of discovery worth having: not a list of what the system should do, but a short list of what it can no longer be.",
        ],
      },
    ],
  },

  {
    slug: "your-models-accuracy-is-a-licence-not-a-metric",
    title: "Your model's accuracy is a licence, not a metric",
    excerpt:
      "Under PSD2, a payment provider may skip customer authentication only while its own fraud rate stays under a regulatory threshold. Precision stops being a quality measure and becomes permission to remove friction — which changes what the system is optimising for.",
    date: "2026-07-30",
    readingTime: "4 min",
    tags: ["PSD2", "Model governance", "Payments", "KPIs"],
    category: "Governance",
    featured: true,
    body: [
      {
        paragraphs: [
          "Model accuracy is normally an internal quality measure. You improve it, the product gets better, and nobody outside engineering has an opinion about the number itself.",
          "In some regulated settings that relationship inverts, and the effect on the architecture is larger than it first appears.",
        ],
      },
      {
        heading: "The mechanism",
        paragraphs: [
          "European payments regulation requires strong customer authentication on electronic payments — the step that interrupts a checkout to confirm the shopper is who they claim to be. It also allows exemptions, one of which is granted on the basis of the provider's own transaction risk analysis.",
          "The condition attached to that exemption is the interesting part: it is available only while the provider's own fraud rate stays below a reference threshold, and the threshold tightens as the transaction value rises. Lower fraud rate, higher value you are permitted to wave through unchallenged.",
          "So the model's performance is not describing quality. It is buying permission — specifically, permission to take friction out of every merchant's checkout.",
          "Treat the specific thresholds and the calculation method as something to confirm against the current technical standards and your national competent authority rather than against a blog post. The structure is the durable part.",
        ],
      },
      {
        heading: "What this does to the objective",
        paragraphs: [
          "The naive target is \"catch more fraud\", and it is trivially achievable: decline everything and your fraud rate is zero. The reason nobody does that is obvious, and the reason it matters is less so — it means the real objective was never fraud minimisation.",
          "The objective is to hold the fraud rate at a level that buys the exemption, at the lowest false-decline cost that achieves it. Those are different optimisation problems with different answers, and the threshold that solves one is provably not the threshold that solves the other.",
          "This reframing is what makes precision so expensive here. A rules-only system can get the fraud rate down; it cannot get it down without declining far too much genuine traffic. The specific thing a learned model buys is a low false-positive rate at a low false-negative rate simultaneously — and that, not fraud reduction, is what the exemption is paying for.",
        ],
      },
      {
        heading: "The rolling window changes the operating discipline",
        paragraphs: [
          "The fraud rate that determines eligibility is a rolling figure over months, not a monthly snapshot. That single detail has more architectural consequence than anything else in the regime.",
          "It means a bad fortnight is a liability for a quarter. It means by the time a breach is visible in the reported number, it is already months old and cannot be corrected by noticing it. And it means the exemption can be lost across the entire book at once — friction returns for every merchant simultaneously, which is a commercial event out of all proportion to the fraud that caused it.",
          "So the rate has to be steered rather than reported. In practice that means a target band set deliberately below the threshold, an intervention point above the band, and a defined automatic response — tightening rules as headroom shrinks, before anyone is asked to make a judgement call.",
        ],
        bullets: [
          "Set the internal target below the regulatory threshold on purpose. Running at the threshold is planning to cross it.",
          "Treat headroom as a controlled variable with a feedback loop, not a figure in a quarterly pack.",
          "Alert on the trajectory, not on the breach. A breach alert fires a quarter late by construction.",
        ],
      },
      {
        heading: "The KPI that follows",
        paragraphs: [
          "The metric a board should be shown is not fraud caught. It is the share of eligible transactions cleared without an authentication step — because that is what merchants see in their own conversion funnels, and merchant retention is what the programme is actually being paid for.",
          "Fraud loss becomes a constraint on that number rather than the number itself. It is a small change in phrasing and it reorganises the entire measurement design underneath.",
        ],
      },
      {
        heading: "Where else this shape appears",
        paragraphs: [
          "Payments is the cleanest example but not the only one. Any regime where measured performance gates a permission has this structure: an emissions threshold that determines a reporting obligation, a safety record that determines an inspection regime, an error rate that determines whether a process may run unsupervised.",
          "The question worth asking on any regulated system is simply whether the metric describes your quality or purchases your freedom. If it is the second, it belongs in the architecture — with a control loop around it — rather than in a report.",
        ],
      },
    ],
  },

  {
    slug: "the-right-to-erasure-is-an-architecture-problem",
    title: "The right to erasure is an architecture problem",
    excerpt:
      "Deleting the record is the easy part. What defeats most erasure requests is everything derived from it — embeddings, cache entries, prompt logs, search indexes — none of which looks like personal data until you think about what it was made from.",
    date: "2026-07-30",
    readingTime: "4 min",
    tags: ["GDPR", "RAG", "Data protection", "Retrieval"],
    category: "Governance",
    featured: true,
    body: [
      {
        paragraphs: [
          "Erasure is usually treated as a database operation. Someone exercises their rights, an identifier is resolved, rows are deleted, a confirmation goes out. In a conventional application that is broadly the whole job.",
          "In a system built around retrieval and generation, the row is the smallest part of the problem. Almost everything difficult is derived from it, and derived data does not announce that it is personal.",
          "I am not a lawyer and this is not legal advice. What follows is what changes in the architecture once a data protection officer takes a position — which is the part that lands on an architect.",
        ],
      },
      {
        heading: "Follow one sentence through the system",
        paragraphs: [
          "Suppose a person writes a message describing a health concern. Trace where that sentence ends up.",
          "It is stored as a conversation record. It is chunked and embedded, so a vector representing it lands in an index. That index may replicate. The chunk text is very likely stored alongside the vector for retrieval. The message goes into a prompt, and if prompts are logged — they almost always are, for debugging and evaluation — it is now in an observability store with its own retention policy, probably a different one. The model's completion, which may restate the concern, is logged beside it. A normalised version becomes a cache key. An anonymised extract goes into an evaluation set. An aggregate lands in an analytics warehouse. Backups of several of those exist.",
          "Delete the conversation record and most of that survives.",
        ],
      },
      {
        heading: "The embedding is the interesting one",
        paragraphs: [
          "It is tempting to treat a vector as safely abstract — a list of floating point numbers with no readable content. That intuition does not hold up. An embedding is a derived representation of specific personal text, it is retrievable by similarity, and research on inverting embeddings back into approximate source text has been steadily more successful.",
          "Whatever position your DPO takes on whether it is personal data, the architectural consequence is the same and it is unavoidable: you need to know which vectors came from which subject, and you need to be able to remove them. That is a design decision made at ingestion, because a vector store that did not record provenance cannot answer the question later at any price.",
        ],
        bullets: [
          "Tag every chunk with the subject it derives from, at ingestion, before you need it.",
          "Assume you will have to delete from the index, not just from the source — reindexing the whole corpus to honour one request is not an operational answer.",
          "Remember the chunk text stored beside the vector. It is usually the actual leak, and it is usually forgotten because attention goes to the vector.",
        ],
      },
      {
        heading: "Prompt logs are the second trap",
        paragraphs: [
          "Prompt and completion logs are built for debugging, and they get the retention policy of debugging telemetry — long, generous, and set by whoever configured the observability stack rather than by anyone thinking about personal data.",
          "But a prompt containing a patient's message is that message, sitting in a different system under a different policy, frequently in a different region. Treating prompts and completions as subject to exactly the same residency, retention and erasure rules as the source record is the only position that survives review.",
          "The design move that pays for itself is redaction *before* the model call rather than after logging. Strip identifiers on the way in, keep the mapping separately and under tighter control, and the logs become far less of a liability without losing their debugging value.",
        ],
      },
      {
        heading: "The one with no clean answer",
        paragraphs: [
          "If personal data reached a model's training set, erasure has no straightforward mechanism. Machine unlearning is an active research area rather than an operational capability, and retraining on request is not a process anyone can afford to run per individual.",
          "The honest architectural response is to avoid the situation rather than solve it: do not fine-tune on personal data, and use retrieval instead, where the corpus is a thing you can delete from. That is a real constraint on the design and it should be stated as one — \"we chose retrieval partly because it stays deletable\" is a legitimate architectural reason, and a more durable one than most.",
        ],
      },
      {
        heading: "The design rule",
        paragraphs: [
          "Enumerate the derived artefacts at design time, not when the first request arrives. For each one, write down what it is keyed by and how it is removed. The list is longer than anyone expects on the first attempt, which is exactly the point of writing it down.",
          "Then key the deletion path to the subject rather than to the record. Erasure applies to a person, not to a row, and a system that can only delete rows will keep finding new places the person still exists.",
          "None of this is expensive if it is designed in. All of it is close to impossible to retrofit — which makes it one of the few compliance topics that genuinely belongs in the first architecture conversation rather than the last review.",
        ],
      },
    ],
  },

  {
    slug: "the-model-that-decides-is-not-the-model-that-explains",
    title: "The model that decides is not the model that explains",
    excerpt:
      "A generated explanation is not a reason. It is a plausible account of a decision made somewhere else — and once it is written into a file someone signs, the difference stops being philosophical.",
    date: "2026-07-30",
    readingTime: "5 min",
    tags: ["Model governance", "Explainability", "Real-time"],
    category: "Governance",
    featured: false,
    body: [
      {
        paragraphs: [
          "Any system that decides something about a person will eventually be asked why. Not often, and rarely by the person it decided about — usually by an analyst reviewing a queue, a regulator sampling a quarter, or a colleague preparing a response to a complaint. But it will be asked, and the answer has to be produced from something.",
          "There is an obvious way to produce one now. Take the transaction, the customer history and the score, hand them to a language model, and ask it to write a paragraph explaining the outcome. It costs almost nothing, it reads better than anything a template would produce, and it is available this afternoon.",
          "I think this is one of the more consequential mistakes available in enterprise AI right now, and it is attractive precisely because the output looks so good.",
        ],
      },
      {
        heading: "A story about a decision is not the reason for it",
        paragraphs: [
          "The model that wrote the paragraph did not make the decision. It was shown the inputs and the outcome and asked to produce text that connects them, which is a different task from reporting what actually happened — and it will succeed at that task whether or not its account is true.",
          "Give it a transaction that was declined and it will find something in the history to point at. Give it the same transaction with the outcome flipped to approved, and it will find something else, just as fluently. Neither paragraph is a lie in any sense the model would recognise. Both are competent completions of the prompt they were given.",
          "The gap only matters when someone acts on the paragraph. An analyst repeats it to a customer. It goes into a chargeback representment. It is quoted in a response to a regulator. At that point an organisation has automated the production of confident, unverifiable claims about its own behaviour, and put them into documents that people sign.",
        ],
      },
      {
        heading: "The alternative is unglamorous and it works",
        paragraphs: [
          "A model that decides can be asked to show its work as a by-product of deciding. A gradient-boosted ensemble scoring a few hundred features will tell you, exactly and cheaply, how much each feature moved the score for this specific case. That is not an interpretation. It is the arithmetic that produced the outcome.",
          "So the arrangement inverts. The deciding model produces the reasons. The language model presents them — turning a ranked list of feature contributions into something a person can read in a case file, alongside the customer's recent pattern and a few comparable past cases and how they resolved.",
          "It never invents a reason. It has none to invent, because the reasons arrived with the decision.",
        ],
      },
      {
        heading: "This changes which model you choose",
        paragraphs: [
          "That is the part worth sitting with. If a decision has to be explainable, then the ability to explain itself becomes a selection criterion for the deciding model — ranked alongside accuracy rather than below it.",
          "Which means a more accurate model can be the wrong choice. A sequence model over transaction history may genuinely beat a tree ensemble on every offline metric, and still be the weaker option for a decision you have to justify, because its attributions are an approximation computed afterwards rather than the thing that produced the answer.",
          "Architects are used to trading accuracy against latency and against cost. Trading it against accountability is less familiar and, in a regulated setting, usually the more important trade.",
        ],
      },
      {
        heading: "What it looks like once built",
        paragraphs: [
          "The two models end up in different places, on different clocks, with different failure modes — and keeping them apart is enforced by deployment rather than by instruction.",
          "The deciding model sits in the request path, where the budget is measured in milliseconds and determinism is required: the same inputs must produce the same outcome, reproducibly, months later, from a logged feature vector and a version number. The language model sits behind a human, where a bad draft costs someone two minutes and nothing else.",
        ],
        bullets: [
          "Record the attributions and the generated narrative separately, each labelled as what it is.",
          "Render them separately too. A fluent paragraph sitting above a list of contributions will be read as a summary of it, and eventually quoted as one.",
          "Have the person sign against the attributions, not against the prose.",
          "Give the generative side no route into the decision path — not a degraded one, not a fallback, none.",
        ],
      },
      {
        heading: "Where I would not bother",
        paragraphs: [
          "If nobody ever has to justify an individual outcome, this is overhead. A recommendation, a search ranking, a draft somebody edits before sending — none of these needs a defensible account of any single result, and building one is effort spent on a question that will not be asked.",
          "The line is whether an outcome can be disputed by the person it affects. That covers less ground than compliance teams assume and more than product teams hope.",
        ],
      },
      {
        heading: "The honest caveat",
        paragraphs: [
          "Feature attributions are not causes either. They are contributions to a score under a particular model, and saying a transaction was declined \"because of velocity\" is already a simplification of something considerably less tidy.",
          "The difference is what the simplification is of. A feature contribution simplifies a real computation, and it is reproducible: run it again and get the same number. A generated paragraph simplifies nothing, because there was nothing underneath it — it was produced from the outcome, not from the process that reached it.",
          "That is a smaller distinction than the confidence of either output suggests, and it is the whole of the argument.",
          "The payment fraud case note on this site works the idea through in full, including where the language model does earn its place — writing the case file for a human to sign, on the far side of a boundary it cannot cross.",
        ],
      },
    ],
  },

  {
    slug: "permissions-belong-in-the-query-not-in-the-results",
    title: "Permissions belong in the query, not in the results",
    excerpt:
      "Filtering retrieved documents after the fact feels safe and is not. It leaks through ranking, through summaries, and through the simple fact that a result is missing.",
    date: "2026-07-30",
    readingTime: "3 min",
    tags: ["RAG", "Retrieval", "Access control", "Security"],
    category: "RAG",
    featured: false,
    body: [
      {
        paragraphs: [
          "The convenient way to add access control to a retrieval system is to put it at the end. Retrieve the best matches, check what the user is allowed to see, drop the rest, answer from what survives. It is a small change, it does not touch the index, and it is obviously correct.",
          "It is not obviously correct. It leaks in three ways, and two of them are invisible in testing.",
        ],
      },
      {
        heading: "One: absence is information",
        paragraphs: [
          "If a query returns four results where it should have returned six, the user has learned that two documents exist which they may not read. On a general corpus that is trivia. On a corpus partitioned by client, by joint venture or by legal matter, it is exactly the thing the partition exists to prevent — the existence of a document about a named counterparty is frequently more sensitive than its contents.",
          "Ranking makes this worse rather than better. A confidently top-ranked result that vanishes tells the user their query matched something well.",
        ],
      },
      {
        heading: "Two: the model already read it",
        paragraphs: [
          "Post-filtering means the restricted passage was retrieved. Whether it also reached the model depends on exactly where in the pipeline the filter sits, and in practice that ordering is easy to get wrong — particularly once reranking, query expansion or a summarisation step is introduced by someone who was not thinking about permissions that day.",
          "Once a restricted passage is in the context window, the answer can reflect it without citing it. There is no reliable way to detect that afterwards and no way to prove it did not happen.",
        ],
      },
      {
        heading: "Three: the numbers leak",
        paragraphs: [
          "Result counts, relevance scores, \"no results found\" versus \"nothing you can see\" — each of these distinguishes an empty corpus from a restricted one. Enough queries and the boundary is mappable without ever seeing a document.",
        ],
      },
      {
        heading: "The alternative",
        paragraphs: [
          "Make the permission part of the query. Tag each chunk at ingestion with the entitlements that govern it, and filter inside the search rather than after it, so a restricted document is never a candidate. The user's entitlements are resolved per request and become a predicate the index evaluates.",
          "This is more work in three specific places, and it is worth naming them rather than pretending the approach is free.",
        ],
        bullets: [
          "Ingestion has to carry permissions through, which means the source system has to expose them in a usable form. If it only offers a nightly export, you have a staleness window and should say so out loud.",
          "Entitlement changes have to reach the index. Someone loses access on Monday; if the index learns on Friday, you had a leak for four days.",
          "Ranking quality changes once the candidate pool is filtered, so retrieval has to be evaluated per permission profile rather than once globally.",
        ],
      },
      {
        heading: "Test it like an adversary, and let it break the build",
        paragraphs: [
          "The test that matters is not \"can an authorised user find the document\". It is whether an unauthorised user can detect that it exists — by result counts, by scores, by an answer that is subtly better informed than it should be.",
          "Write those as tests with fixtures for each permission boundary that actually matters commercially, and make them a build blocker rather than a report. A permission regression is not a defect to prioritise; in a partitioned corpus it is a contractual breach, and it should stop the release the way a failing type check does.",
        ],
      },
    ],
  },

  {
    slug: "nobody-asked-what-a-false-decline-costs",
    title: "Nobody asked what a false decline costs",
    excerpt:
      "One kind of error leaves a record and gets measured. The other leaves nothing and gets ignored. Systems optimised against only the first are usually optimised in the wrong direction.",
    date: "2026-07-30",
    readingTime: "3 min",
    tags: ["Decision systems", "Metrics", "Cost"],
    category: "Architecture",
    featured: false,
    body: [
      {
        paragraphs: [
          "Every classifier that gates something has two ways to be wrong, and organisations almost never know both numbers.",
          "The asymmetry is not carelessness. It is structural, and it is worth understanding before arguing about thresholds.",
        ],
      },
      {
        heading: "Why one loss is invisible",
        paragraphs: [
          "A fraudulent transaction that gets through leaves a chargeback, a case, a reconciliation entry and a line in a report. It is measured to within a few per cent because the measurement is a by-product of handling it.",
          "A legitimate customer who was declined leaves nothing. They try another card, or they go elsewhere, or they abandon the purchase. No record is created saying \"a good customer was turned away\", because nothing in the system knows that is what happened. The only trace is a slightly lower conversion rate that gets attributed to seasonality.",
          "So one loss has an owner, a dashboard and a quarterly review. The other has an anecdote from someone in sales.",
        ],
      },
      {
        heading: "The consequence",
        paragraphs: [
          "A threshold tuned against the measured loss minimises the measured loss. That is not the same as minimising cost, and when the unmeasured side is larger — which is common, and in card payments the estimates I find credible put it several times larger — the tuning is actively moving in the wrong direction while every dashboard shows improvement.",
          "This is the uncomfortable part: the system can be getting worse commercially and better by its own metrics simultaneously, indefinitely, with nobody misbehaving.",
        ],
      },
      {
        heading: "Where the same shape shows up",
        paragraphs: [
          "It is not a payments problem. It is the shape of every gate.",
        ],
        bullets: [
          "Support deflection: a resolved ticket is counted, a customer who gave up is not.",
          "Spam and fraud filters: the blocked bad message is logged, the blocked real one is a complaint that may never arrive.",
          "Alerting: a caught incident is a success story, an alert muted into irrelevance leaves no trace until something burns.",
          "Content moderation: removed violations are reported, wrongly removed posts are appeals most people never file.",
          "Credit and eligibility decisions: defaults are measured, the customer who was quietly wrong-footed is not.",
        ],
      },
      {
        heading: "What to do about it",
        paragraphs: [
          "Estimate the invisible loss before designing anything, and accept that the estimate will be poor. A poor estimate of the right quantity beats a precise measurement of the wrong one, and it is enough to answer the only question that matters at design time: which error is more expensive, and by roughly what factor?",
          "Retry behaviour, funnel data, re-contact rates and complaint volumes will all get you an order of magnitude. That is sufficient, because the threshold is not sensitive to the second significant figure — it is sensitive to which side is larger.",
          "Then treat that ratio as an input to the design rather than a tuning parameter discovered later, and re-derive it periodically. It moves: the cost of turning away a customer in a competitive market is not the cost of it in a captive one.",
        ],
      },
      {
        heading: "The version of this that matters most",
        paragraphs: [
          "In practice the first useful output of a project is often not a model at all. It is the sentence \"we have never measured what it costs us to be wrong in the other direction\", said out loud in a room containing the person who owns the number.",
          "That sentence has reframed more programmes for me than any architecture diagram.",
        ],
      },
    ],
  },

  {
    slug: "an-architecture-diagram-that-type-checks",
    title: "An architecture diagram that type-checks",
    excerpt:
      "Diagrams exported as images go stale, cannot be searched, and quietly disagree with the text around them. Treating them as typed content instead is a small amount of work with a disproportionate payoff — including catching a rendering bug no type system could see.",
    date: "2026-07-30",
    readingTime: "3 min",
    tags: ["Documentation", "Diagrams", "TypeScript", "Craft"],
    category: "Craft",
    featured: false,
    body: [
      {
        paragraphs: [
          "Architecture diagrams are usually images. Someone draws one, exports a PNG, and drops it into a document. Six months later the system has changed, the diagram has not, and nobody can tell — because an image cannot disagree with anything.",
          "The diagrams on this site are not images. They are typed data, rendered by components at page load, and the difference turned out to be worth more than I expected.",
        ],
      },
      {
        heading: "What it looks like",
        paragraphs: [
          "A diagram is an object: a kind, a title, a caption, a list of nodes with grid positions, and a list of edges. A schema defines the shapes, and the compiler rejects anything that does not fit. Adding a box is adding an object to an array.",
          "There is no drawing tool in the loop and no exported asset to keep in sync.",
        ],
      },
      {
        heading: "What that buys",
        paragraphs: [
          "Four things, roughly in ascending order of how much I care about them.",
        ],
        bullets: [
          "The text inside a diagram is real text — indexed by search, readable by a screen reader, selectable by a reader who wants to paste a component name into a search box.",
          "Colours come from the same tokens as the page, so diagrams follow the light and dark themes without a second set of exports.",
          "A change to a diagram shows up in a diff as a changed line, not as a replaced binary. You can review it.",
          "A missing field is a build error rather than a blank rectangle nobody notices.",
        ],
      },
      {
        heading: "And the thing I did not anticipate",
        paragraphs: [
          "Because the diagrams are data, they can be checked by a script — and it turns out they need to be.",
          "Twice, a diagram on this site rendered wrongly in a way that type checking cannot possibly catch. Once an edge label was longer than the gap between the two boxes it sat between, so it drew straight across the node beside it. Once a roadmap with three phases in a two-column grid left an empty cell that rendered as a solid grey panel, reading as missing content.",
          "Both were valid data. Both compiled. Both were only visible by opening the page and looking — which is exactly the check nobody performs after editing one line of prose.",
          "So the layout constants that govern the renderer now also govern a script that reads every diagram and computes whether each label fits the space it will be drawn into. It is about a hundred and fifty lines, it runs in under a second, and it caught both of those defects when I reintroduced them deliberately to check that it would.",
        ],
      },
      {
        heading: "The honest cost",
        paragraphs: [
          "You maintain a renderer. That is a real component with real bugs, and the two above were its bugs rather than the content's.",
          "You also accept a limited vocabulary. The schema here supports five kinds of diagram, and anything outside them is not expressible. That constraint is mostly good — it stops diagrams drifting into decorative shapes that mean nothing — but it does mean occasionally simplifying an idea to fit the grammar.",
          "For a one-off sketch in a document nobody will revisit, none of this is worth it. Draw the picture. For a diagram that has to stay true to a system for years, in a place where being quietly wrong is expensive, the arithmetic is different — and the moment a script can tell you a label will not fit, it stops being a documentation choice and starts being a correctness one.",
        ],
      },
    ],
  },
];
