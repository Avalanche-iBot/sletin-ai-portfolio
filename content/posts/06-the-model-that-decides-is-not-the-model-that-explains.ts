import type { BlogPost } from "../types";

/** Drawn from the verdict of the payment fraud note. */
const post: BlogPost = {
  slug: "the-model-that-decides-is-not-the-model-that-explains",
  title: "The model that decides is not the model that explains",
  excerpt:
    "A generated explanation is not a reason. It is a plausible account of a decision made somewhere else — and once it is written into a file someone signs, the difference stops being philosophical.",
  date: "2026-07-30",
  readingTime: "11 min",
  tags: ["Model governance", "Explainability", "Real-time"],
  category: "Governance",
  featured: false,
  body: [
    {
      paragraphs: [
        "Any system that decides something about a person will eventually be asked why. Not often, and rarely by the person it decided about — usually by an analyst reviewing a queue, a regulator sampling a quarter, or a colleague drafting a response to a complaint. But it will be asked, and the answer has to be produced from something.",
        "There is an obvious way to produce one now. Take the transaction, the customer history and the score, hand them to a language model, and ask it to write a paragraph explaining the outcome. It costs almost nothing, it reads better than anything a template would produce, and it is available this afternoon.",
        "I think this is one of the more consequential mistakes available in enterprise AI right now, and it is attractive precisely because the output looks so good.",
      ],
    },
    {
      heading: "Two explanations of the same decline",
      paragraphs: [
        "Make it concrete. A card is declined. The transaction is 340 euros at an electronics retailer, at 02:40, from a device the cardholder has not used before, in a country they have not transacted from in eighteen months.",
        "Ask a language model to explain the decline and you might get: \"This transaction was declined because it occurred at an unusual hour from a previously unseen device, in a location inconsistent with the cardholder's recent history. Taken together these signals indicate elevated risk of account takeover.\"",
        "Fluent, plausible, and the kind of thing an analyst would happily paste into a case file.",
        "Now flip the outcome. Same transaction, approved. Ask the same question and you get something equally fluent: \"This transaction was approved because the amount is consistent with the cardholder's typical spending at this merchant category, and the account shows a long history without disputes. The device and location, while new, are consistent with travel.\"",
        "Neither paragraph is a lie in any sense the model would recognise. Both are competent completions of the prompt they were given. The model was not reporting what happened — it was asked to produce text connecting inputs to an outcome, and that task succeeds whether or not the account is true.",
        "The decisive detail is that in the real system, the largest contribution to that score might have been none of the things either paragraph mentions. It might have been a velocity feature — four authorisation attempts on this card in the previous nine minutes across three merchants — which the model was never shown, because whoever built the explanation prompt passed the transaction and the history and did not think to pass the feature vector.",
      ],
    },
    {
      heading: "Where it becomes a real problem",
      paragraphs: [
        "The gap only matters when somebody acts on the paragraph, and in a working operation somebody always does.",
        "An analyst repeats it to a customer on the phone. It is pasted into a chargeback representment, which is a document submitted in a dispute process with money attached. It is quoted in a response to a supervisor asking why a segment of customers is being declined at an elevated rate. It is copied into an internal review, and six months later it is cited as the explanation of a pattern.",
        "At that point the organisation has automated the production of confident, unverifiable claims about its own behaviour and inserted them into documents that people sign. Nobody has behaved badly. Every individual step was reasonable.",
        "The regulatory dimension sharpens this rather than creating it. Where a person is entitled to an explanation of an automated decision, an explanation that was not derived from the decision process does not satisfy the obligation in substance, however well it satisfies it in form. And a fluent wrong explanation is worse than a terse right one, because it forecloses the follow-up question.",
      ],
    },
    {
      heading: "The alternative is unglamorous and it works",
      paragraphs: [
        "A model that decides can be asked to show its work as a by-product of deciding. A gradient-boosted ensemble scoring a few hundred features will tell you, exactly and cheaply, how much each feature moved the score for this specific case.",
        "That is not an interpretation. It is the arithmetic that produced the outcome — the actual contributions of the actual model version, recoverable from the logged feature vector months later, and identical every time you recompute them.",
        "So the arrangement inverts. The deciding model produces the reasons. The language model presents them: turning a ranked list of feature contributions into something a person can read in a case file, alongside the cardholder's recent pattern and a few comparable past cases and how those resolved.",
        "It never invents a reason, because it has none to invent. The reasons arrived with the decision.",
        "That also makes the generative component's job unambitious and safe. It is doing document assembly and summarisation over material that is already true, with a human reading the result before it goes anywhere. If it produces an awkward sentence, someone rewrites it. There is no failure mode in which it changes what the system decided.",
      ],
    },
    {
      heading: "This changes which model you choose",
      paragraphs: [
        "That is the part worth sitting with, because it inverts a habit. If a decision has to be explainable, the ability to explain itself becomes a selection criterion for the deciding model — ranked alongside accuracy, not below it.",
        "Which means a more accurate model can be the wrong choice. A sequence model over transaction history may genuinely beat a tree ensemble on every offline metric, and remain the weaker option for a decision you have to justify, because its attributions are an approximation computed afterwards by a separate method rather than the thing that produced the answer.",
        "Post-hoc attribution methods are useful and I am not dismissing them. But they answer a subtly different question — roughly, \"what would a simpler model have said about this region of the input space\" — and that difference is invisible until somebody with a legal interest starts pulling at it. An approximation of an explanation is a fine engineering tool and a poor evidential one.",
        "Architects are accustomed to trading accuracy against latency and against cost. Trading it against accountability is less familiar, and in a regulated setting it is usually the more consequential trade.",
      ],
    },
    {
      heading: "What it looks like once built",
      paragraphs: [
        "The two models end up in different places, on different clocks, with different failure modes — and the separation is enforced by deployment rather than by instruction, because an instruction is a request and a deployment boundary is a fact.",
        "The deciding model sits in the request path, where the budget is measured in milliseconds and determinism is required: the same inputs must produce the same outcome, reproducibly, months later, from a logged feature vector and a version number. The language model sits behind a human, in the analytics estate, where a bad draft costs somebody two minutes and nothing else.",
      ],
      bullets: [
        "Record the attributions and the generated narrative separately, each labelled as what it is. One is evidence; the other is presentation.",
        "Render them separately too. A fluent paragraph sitting directly above a list of contributions will be read as a summary of that list, and eventually quoted as one.",
        "Have the person sign against the attributions, not against the prose. What they are attesting to matters more than what they read.",
        "Give the generative side no route into the decision path — not a degraded one, not a fallback for when the primary model is unavailable, none. The fallback is rules, which are also explainable.",
        "Keep the model version and the rule-set version in the same record. \"Why was this declined\" is unanswerable without knowing which model did it.",
      ],
    },
    {
      heading: "The objection worth answering",
      paragraphs: [
        "The strongest counterargument is practical: a ranked list of feature contributions is not usable by a customer service agent, and a paragraph is. Insisting on the raw attributions means nobody reads them and everyone works from something else anyway.",
        "That is correct, and it is not an argument for generating the explanation. It is an argument for generating the presentation of the explanation, which is what I am describing. The distinction is whether the text is derived from the attributions or from the outcome.",
        "In practice the difference shows up in the prompt. If the generative step receives the feature contributions and is asked to render them in plain language, it is constrained by material that is true. If it receives the transaction and the outcome and is asked to explain, it is unconstrained and will confabulate — competently, and without any signal that it is doing so.",
        "Same model, same cost, entirely different epistemic status. The whole discipline is in what you put in the context window.",
      ],
    },
    {
      heading: "When the deciding model has to be a language model",
      paragraphs: [
        "Everything above assumes the decision is made over structured features, where a tree ensemble is available and attribution is exact. Sometimes it is not. Classifying a complaint, deciding whether a document meets a policy, judging whether a message breaches a rule — these are language tasks, and there is no tabular model waiting to do them better.",
        "The separation still holds; what changes is where the reason comes from. The move is to make the deciding model emit a structured verdict rather than prose: a decision, a confidence, and a set of specific spans from the input that support it. Not a paragraph — identifiers, quoted extracts, a policy clause reference. Something a second process can verify against the source before anyone sees it.",
        "That verification step is what replaces the arithmetic. A cited span either appears in the input or it does not, and one that does not is caught deterministically rather than trusted. It is a weaker guarantee than a feature contribution, and it is enormously stronger than a free-text rationale, because it converts \"the model says so\" into a claim that can be checked.",
        "The rule that survives translation is the one worth keeping: whatever produces the decision must also produce the evidence, in the same call, in a form something else can check. What must never happen is a second model being shown the answer and asked to justify it — and that is exactly what the convenient design does.",
      ],
    },
    {
      heading: "Where I would not bother",
      paragraphs: [
        "If nobody ever has to justify an individual outcome, this is overhead. A recommendation, a search ranking, a draft somebody edits before sending — none of these requires a defensible account of any single result, and building one is effort spent answering a question that will not be asked.",
        "The line is whether an outcome can be disputed by the person it affects. That covers less ground than compliance teams assume and considerably more than product teams hope. A useful test: if this decision were challenged in writing eleven months from now, what would we send back? If the answer is \"we would look it up and explain\", you need this. If it is \"we would apologise and redo it\", you probably do not.",
      ],
    },
    {
      heading: "The honest caveat",
      paragraphs: [
        "Feature attributions are not causes either. They are contributions to a score under a particular model, and saying a transaction was declined \"because of velocity\" is already a simplification of something considerably less tidy — a set of interacting features whose individual contributions depend on the values of the others.",
        "The difference is what the simplification is of. A feature contribution simplifies a real computation, and it is reproducible: run it again and get the same number. A generated paragraph simplifies nothing, because there was nothing underneath it — it was produced from the outcome rather than from the process that reached it.",
        "That is a smaller distinction than the confidence of either output suggests, and it is the whole of the argument.",
        "The payment fraud case note on this site works the idea through in full, including where the language model does earn its place: writing the case file for a human to sign, on the far side of a boundary it is not permitted to cross.",
      ],
    },
  ],
};

export default post;
