import type { BlogPost } from "../types";

/** Drawn from the discovery finding that reframed the payment fraud note. */
const post: BlogPost = {
  slug: "nobody-asked-what-a-false-decline-costs",
  title: "Nobody asked what a false decline costs",
  excerpt:
    "One kind of error leaves a record and gets measured. The other leaves nothing and gets ignored. Systems optimised against only the first are usually being optimised in the wrong direction, while every dashboard shows improvement.",
  date: "2026-07-30",
  readingTime: "7 min",
  tags: ["Decision systems", "Metrics", "Cost"],
  category: "Architecture",
  featured: false,
  body: [
    {
      paragraphs: [
        "Every classifier that gates something has two ways to be wrong, and organisations almost never know both numbers.",
        "The asymmetry is not carelessness, which is why pointing it out rarely fixes it. It is structural, it reproduces itself through the reporting line, and it is worth understanding before anyone argues about thresholds.",
      ],
    },
    {
      heading: "Why one loss is invisible",
      paragraphs: [
        "A fraudulent transaction that gets through leaves a chargeback, a case, a reconciliation entry and a line in a monthly report. It is measured to within a few per cent, and the measurement costs nothing extra because it is a by-product of handling the thing anyway.",
        "A legitimate customer who was declined leaves nothing. They try another card, or they go elsewhere, or they abandon the purchase and think slightly less of the merchant. No record is created saying \"a good customer was turned away\", because nothing in the system knows that is what happened — from the inside, a correct decline and an incorrect one are the same event.",
        "The only trace is a marginally lower conversion rate, which is attributed to seasonality, or to the checkout redesign, or to the market. There is always a more available explanation than \"our risk model is too aggressive\".",
        "So one loss has an owner, a dashboard, a quarterly review and a named person whose bonus depends on it. The other has an anecdote from someone in sales that gets characterised as anecdotal.",
      ],
    },
    {
      heading: "The consequence, with numbers",
      paragraphs: [
        "A threshold tuned against the measured loss minimises the measured loss. That is not the same as minimising cost, and when the unmeasured side is larger the tuning actively moves in the wrong direction while every report improves.",
        "Put figures on it. Take a merchant book of five billion euros of annual volume. Fraud at 0.11% by value is 5.4 million a year — the number everybody knows, to two decimal places, because it arrives as chargebacks.",
        "Now the other side. A false-decline rate of 2.4% on ninety million transactions is roughly 2.2 million declined transactions that should have been approved. Say forty per cent of those customers do not retry successfully anywhere: 860,000 lost transactions at an average of fifty-five euros is around 47 million euros of merchant volume, gone, with no record anywhere.",
        "That is nearly nine times the fraud loss, and it is invisible. Worse, the relationship is antagonistic: pushing the decline threshold tighter to shave the 5.4 million reliably grows the 47 million, and only one of those movements will appear in a report.",
        "The uncomfortable conclusion is that a system can be getting worse commercially and better by its own metrics, indefinitely, with nobody misbehaving and every incentive working as designed.",
      ],
    },
    {
      heading: "Where the same shape shows up",
      paragraphs: [
        "It is not a payments problem. It is the shape of every gate, and once you have the pattern you find it everywhere.",
      ],
      bullets: [
        "Support deflection: a ticket resolved by self-service is counted; a customer who gave up and churned quietly is not. Deflection rate is the most gameable metric in customer operations for exactly this reason.",
        "Spam and fraud filters on messaging: the blocked bad message is logged; the blocked legitimate one is a complaint that may never be made, because the sender does not know it was blocked and the recipient does not know it existed.",
        "Alerting: a caught incident becomes a success story; an alert channel muted into irrelevance leaves no trace at all until something burns down, at which point the finding is \"the alert fired and nobody acted\".",
        "Content moderation: removed violations are reported weekly; wrongly removed posts are appeals that most people never file, because appealing is tedious and unrewarding.",
        "Credit and eligibility: defaults are measured precisely; the applicant who was wrongly declined and went elsewhere is not measured at all, and in some markets is a fairness problem as well as a commercial one.",
      ],
      // The list is deliberately long: the point is that the pattern is general.
    },
    {
      heading: "How to estimate the invisible half",
      paragraphs: [
        "You will not measure it precisely and you do not need to. The threshold is not sensitive to the second significant figure — it is sensitive to which side is larger and by roughly what factor. An order of magnitude is enough to change a design.",
        "Three methods, in ascending order of effort.",
      ],
      bullets: [
        "Retry analysis. Look at declined transactions followed within minutes by a successful one on a different instrument or at a different merchant. A successful retry is near-proof the customer was legitimate, and it gives a defensible floor on the false-decline rate.",
        "Merchant or downstream funnel data. Whoever sits after your gate can see what happened next. They are usually willing to share it and have rarely been asked.",
        "A deliberate holdout. Approve a small random sample that the model would have declined, accept the fraud losses, and measure what fraction were genuine. It is the only method that gives a real number, it costs money by design, and the cost is almost always small against what it reveals. The main obstacle is not budget — it is that somebody has to sign off on knowingly approving fraud.",
      ],
    },
    {
      paragraphs: [
        "The third one is worth pushing for. It converts an argument about intuitions into an argument about a measurement, and it is the only version of this conversation that ends.",
      ],
    },
    {
      heading: "What to do with the ratio",
      paragraphs: [
        "Treat it as an input to the design rather than as a tuning parameter discovered later. The cost ratio between the two error types determines the operating point, and if it is not written down somewhere then somebody is choosing it implicitly by choosing a threshold.",
        "Make it explicit and re-derive it periodically, because it moves. The cost of turning away a customer in a competitive market is not the cost of it in a captive one; the cost of a missed fraud changes when liability shifts; both change when the business changes what it is optimising for. A ratio set once at project inception and never revisited becomes wrong quietly.",
        "And monitor both sides at segment level, not just in aggregate. A model can hold the overall decline rate while being dramatically worse for one country, one issuer, or one customer cohort. In aggregate it looks fine. To the affected group it looks like a policy.",
      ],
    },
    {
      heading: "The caution",
      paragraphs: [
        "This argument can be abused, and it is worth saying so plainly because the abuse is easy and comfortable.",
        "\"False positives are expensive\" is a valid observation and also exactly what someone says when they want a filter loosened for reasons that have nothing to do with cost. In a fraud system the constraint is not purely economic — there are regulatory thresholds, scheme requirements and liability rules that do not care about your ratio. In moderation and safety systems the asymmetry runs the other way and the invisible cost is borne by people who are not your customers.",
        "The argument is for measuring both sides, not for assuming the unmeasured one is always larger. Sometimes it is not. The failure is not having a number, and that failure is fixed by getting one rather than by guessing in the more convenient direction.",
      ],
    },
    {
      heading: "The version that matters most",
      paragraphs: [
        "In practice the first useful output of a project like this is often not a model at all. It is the sentence \"we have never measured what it costs us to be wrong in the other direction\", said out loud in a room containing the person who owns the number.",
        "That sentence has reframed more programmes than any architecture diagram I have drawn. It usually changes the scope, occasionally cancels the project, and in the best case reveals that the thing the business wanted was never the thing it asked for.",
      ],
    },
  ],
};

export default post;
