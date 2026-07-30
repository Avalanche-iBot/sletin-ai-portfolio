import type { BlogPost } from "../types";

/** Drawn from the regulatory spine of the payment fraud note. */
const post: BlogPost = {
  slug: "your-models-accuracy-is-a-licence-not-a-metric",
  title: "Your model's accuracy is a licence, not a metric",
  excerpt:
    "Under European payments rules a provider may skip customer authentication only while its own fraud rate stays under a regulatory threshold. Precision stops being a quality measure and becomes permission to remove friction — which changes what the system is optimising for, and how it has to be operated.",
  date: "2026-07-30",
  readingTime: "9 min",
  tags: ["PSD2", "Model governance", "Payments", "KPIs"],
  category: "Governance",
  featured: true,
  body: [
    {
      paragraphs: [
        "Model accuracy is normally an internal quality measure. You improve it, the product gets better, and nobody outside engineering holds an opinion about the number itself.",
        "In some regulated settings that relationship inverts, and the architectural consequences are larger than the regulatory detail suggests. Payments is the cleanest example, so it is worth working through properly before generalising.",
      ],
    },
    {
      heading: "The mechanism",
      paragraphs: [
        "European payments regulation requires strong customer authentication on electronic payments — the step that interrupts a checkout to confirm the shopper is who they claim to be. It also permits exemptions, one of which is granted on the basis of the provider's own transaction risk analysis.",
        "The condition attached to that exemption is the part that matters here: it is available only while the provider's own fraud rate stays below a reference threshold, and the threshold tightens as the transaction value rises. A lower fraud rate entitles you to wave through higher-value transactions unchallenged.",
        "So the model's performance is not describing quality. It is purchasing permission — specifically, permission to remove friction from every merchant's checkout, which is the thing merchants can see in their own funnels and the thing they leave over.",
        "Treat the specific thresholds, the bands and the calculation method as things to confirm against the current technical standards and your national competent authority rather than against a blog post. Regulation moves; the structure of the argument does not.",
      ],
    },
    {
      heading: "What this does to the objective",
      paragraphs: [
        "The naive target is \"catch more fraud\", and it is trivially achievable: decline everything and your fraud rate is zero. The reason nobody does that is obvious. The reason it matters is less so — it means the objective was never fraud minimisation, and everyone had been describing it wrongly.",
        "The real objective is to hold the fraud rate at a level that buys the exemption, at the lowest false-decline cost that achieves it. Those are different optimisation problems with different solutions, and the threshold that solves the first is provably not the threshold that solves the second.",
        "This is what makes precision expensive here in a specific, purchasable way. A rules-only system can get the fraud rate down; what it cannot do is get it down without declining far too much genuine traffic. The thing a learned model buys is a low false-positive rate and a low false-negative rate simultaneously — and that, rather than fraud reduction as such, is what the exemption is paying for.",
        "Stated plainly: you are not buying a model to stop fraud. You are buying precision, and precision is what the regulator will sell you friction-removal for.",
      ],
    },
    {
      heading: "What it is worth, roughly",
      paragraphs: [
        "Numbers make the argument concrete, so here is the shape of it with figures I have chosen rather than measured — the point is the ratio between the two halves, not the euros.",
        "Take a provider handling ninety million card-not-present transactions a year at an average value of fifty-five euros: just under five billion euros of annual volume. At a fraud rate of 0.11% by value, fraud costs about 5.4 million a year. Bringing that under 0.06% takes it to roughly three million. A saving of 2.4 million, and it is the visible half.",
        "Now the other half. Suppose sixty-two million of those transactions currently carry an authentication step, and eight per cent of shoppers abandon at that step — a figure that varies enormously by market, device mix and implementation, and which is the single assumption here I would want measured first. That is roughly five million abandoned transactions, around 270 million euros of merchant volume, lost at a checkout interruption.",
        "Claiming the exemption on the eligible share removes most of that friction. The provider's own direct revenue on the recovered volume is a fraction of a per cent and is not the point. The point is that this is the number the merchant sees in its own reporting, and merchant retention is what the programme is actually being paid for.",
        "Set that against the infrastructure. Both estates for a system like this come to somewhere around 270,000 euros a year. Optimising that figure is not where the value is, and a business case built around it is aimed at the wrong number by two orders of magnitude.",
      ],
    },
    {
      heading: "The rolling window changes how you operate it",
      paragraphs: [
        "The fraud rate determining eligibility is a rolling figure over months, not a monthly snapshot. That single detail has more architectural consequence than anything else in the regime, and it is the part most often missed when people describe the exemption as a compliance matter.",
        "It means a bad fortnight is a liability for a quarter. It means that by the time a breach appears in the reported number it is already months old, and cannot be corrected by noticing it. And it means the exemption is lost across the entire book at once — friction returns for every merchant simultaneously, which is a commercial event out of all proportion to the fraud that caused it.",
        "So the rate has to be steered rather than reported, and that is a control loop rather than a dashboard. In practice: a target band set deliberately below the threshold, an intervention point above the band, and a defined automatic response that tightens rules as headroom shrinks — before anybody is asked to exercise judgement under pressure.",
      ],
      bullets: [
        "Set the internal target below the regulatory threshold on purpose. Running at the threshold is planning to cross it, and the gap is the room a design needs when an assumption turns out optimistic.",
        "Treat headroom as a controlled variable with a feedback loop, not a figure in a quarterly pack.",
        "Alert on trajectory, not on breach. A breach alert fires a quarter late by construction, which makes it a report rather than an alert.",
        "Make the tightening automatic and reversible. A person watching a number will notice too slowly and over-correct.",
      ],
    },
    {
      heading: "It also changes how you release models",
      paragraphs: [
        "There is a second-order effect that catches teams out. When your fraud rate is a regulatory position on a rolling window, and confirmed fraud labels arrive weeks after the transaction through chargebacks, you cannot evaluate a model change quickly. The ground truth simply is not available yet.",
        "That makes shadow running and parallel challengers permanent infrastructure rather than a maturity phase to graduate from. A challenger has to run alongside production for a full label cycle before anyone can say honestly whether it is better, and the promotion cadence is set by that cycle rather than by how fast the team can train.",
        "It also means fast proxy signals — authentication challenge outcomes, analyst verdicts, customer contacts — earn their place not as accuracy measures but as break detectors. They are biased and partial and are the only thing that will tell you something has gone wrong inside a week.",
      ],
    },
    {
      heading: "What happens on the day you breach",
      paragraphs: [
        "Worth designing before it happens rather than during. The exemption stops being available, authentication returns across the book, conversion drops for every merchant at once, and your commercial team is answering questions from customers who noticed before you told them.",
        "Three things are worth having ready. A defensible account of what moved and when, which requires that decisions were reproducible in the first place. A remediation position that a supervisor will accept, which is easier if the tightening response was automatic and logged rather than improvised. And a merchant communication that goes out before the merchant's own analytics team asks — because the difference between a provider that noticed and a provider that was told is most of the relationship.",
      ],
    },
    {
      heading: "The KPI that follows",
      paragraphs: [
        "The metric a board should be shown is not fraud caught. It is the share of eligible transactions cleared without an authentication step, because that is what merchants experience and what the programme is being funded to protect.",
        "Fraud loss becomes a constraint on that number rather than the number itself. It is a small change of phrasing and it reorganises the entire measurement design underneath it — which segments you monitor, what a regression means, and which alert wakes somebody up.",
        "Add one more that is easy to omit: the false-decline rate in the worst segment, not just in aggregate. A model can hold the overall rate and be dramatically worse for one country, one issuer or one merchant category. That is a commercial problem and a fairness problem simultaneously, and an aggregate that hides it is not worth reporting.",
      ],
    },
    {
      heading: "Where else this shape appears",
      paragraphs: [
        "Payments is the cleanest instance but not the only one. Any regime where measured performance gates a permission has this structure — and the structure, not the sector, is what transfers.",
        "An emissions figure that determines a reporting obligation. A safety record that determines an inspection regime. An error rate that determines whether a process may run unsupervised, or whether a human has to review each case. In each, a performance number stops describing quality and starts purchasing freedom, and in each the same three consequences follow: the metric belongs in the architecture rather than the report, it needs headroom rather than compliance, and it needs a control loop rather than a review.",
        "The question worth asking on any regulated system is simply whether the metric describes your quality or buys your latitude. If it is the second, treat it as an operating variable — and expect the engineering conversation and the commercial conversation to be the same conversation, which they rarely are otherwise.",
      ],
    },
  ],
};

export default post;
