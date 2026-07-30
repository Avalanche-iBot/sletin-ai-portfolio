import type { BlogPost } from "./types";

/**
 * Blog posts. `body` is optional: a post can be listed as planned before it is
 * written, which is honest and keeps the section alive. To publish, add a
 * `body` array of blocks.
 */
export const posts: BlogPost[] = [
  {
    slug: "the-model-that-decides-is-not-the-model-that-explains",
    title: "The model that decides is not the model that explains",
    excerpt:
      "A generated explanation is not a reason. It is a plausible account of a decision made somewhere else — and once it is written into a file someone signs, the difference stops being philosophical.",
    date: "2026-07-30",
    readingTime: "8 min",
    tags: ["Model governance", "Explainability", "Real-time"],
    category: "Architecture",
    featured: true,
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
    slug: "why-most-enterprise-ai-projects-fail-in-discovery",
    title: "Most enterprise AI projects fail in Discovery, not in production",
    excerpt: "Ten questions, asked in the right order, will kill more bad architecture than any evaluation harness. A field guide to the Discovery phase, using a 38-clinic healthcare group as the worked example.",
    date: "2026-07-20",
    readingTime: "9 min",
    tags: [
      "Discovery",
      "Enterprise AI",
      "Requirements"
    ],
    category: "Architecture",
    featured: true
  },
  {
    slug: "do-not-use-an-llm-where-a-rule-will-do",
    title: "Do not use an LLM where a rule will do",
    excerpt: "The single largest cost lever in a generative AI system is deciding which requests never reach the model. A practical breakdown of hybrid deterministic + LLM routing.",
    date: "2026-07-06",
    readingTime: "7 min",
    tags: [
      "Cost Optimization",
      "Architecture",
      "Routing"
    ],
    category: "Cost",
    featured: true
  },
  {
    slug: "rag-that-an-auditor-would-accept",
    title: "RAG that an auditor would accept",
    excerpt: "Citations, retrieval precision, knowledge ownership and reindexing. What it takes to move from a demo that answers to a system a regulated enterprise will sign off.",
    date: "2026-06-22",
    readingTime: "11 min",
    tags: [
      "RAG",
      "Compliance",
      "GDPR"
    ],
    category: "RAG",
    featured: true
  },
  {
    slug: "cost-per-request-as-an-architecture-constraint",
    title: "Cost per request as an architecture constraint",
    excerpt: "If you cannot state the € cost of one user interaction, you do not have an architecture — you have a prototype. Building a token and cost model before writing code.",
    featured: false, 
    date: "2026-06-08",
    readingTime: "8 min",
    tags: [
      "Cost Optimization",
      "FinOps",
      "Azure"
    ],
    category: "Cost"
  },
  {
    slug: "what-an-erp-rollout-taught-me-about-ai-adoption",
    title: "What an ERP rollout taught me about AI adoption",
    excerpt: "The technology was never the hard part. Notes on resistance, pilot design and why the front-line operator decides whether your system survives.",
    date: "2026-05-25",
    readingTime: "6 min",
    tags: [
      "Change management",
      "Adoption",
      "Lessons learned"
    ],
    category: "Delivery",
    featured: false
  },
  {
    slug: "agent-orchestration-mcp-and-the-boring-parts",
    title: "Agent orchestration, MCP, and the boring parts nobody demos",
    excerpt: "Tool permissions, identity propagation, idempotency and audit trails. Why agentic architecture is mostly an access-control problem wearing a costume.",
    date: "2026-05-11",
    readingTime: "10 min",
    tags: [
      "AI Agents",
      "MCP",
      "Security"
    ],
    category: "Agents",
    featured: false
  }
];
