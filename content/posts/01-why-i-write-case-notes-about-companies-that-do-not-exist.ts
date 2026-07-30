import type { BlogPost } from "../types";

/**
 * The method post.
 *
 * It answers the first objection anyone has to this site, which went
 * unanswered for as long as the blog was placeholders — and an unanswered
 * first objection is the one a reader leaves on.
 */
const post: BlogPost = {
  slug: "why-i-write-case-notes-about-companies-that-do-not-exist",
  title: "Why I write case notes about companies that don't exist",
  excerpt:
    "The convention in this genre is anonymised client work. I think the anonymising removes precisely the parts worth reading, and that a scenario built on purpose can be more honest than a real one with the names taken out.",
  date: "2026-07-30",
  readingTime: "9 min",
  tags: ["Method", "Writing", "Architecture"],
  category: "Method",
  featured: true,
  body: [
    {
      paragraphs: [
        "The first objection to everything on this site is the obvious one: none of these companies exist. The dental group with 38 clinics, the payment provider routing for 4,000 merchants — I made them up. So what is any of it worth?",
        "It is a fair question and I want to answer it properly, because the alternative convention is so well established that departing from it looks like evasion rather than a choice.",
      ],
    },
    {
      heading: "What anonymising actually removes",
      paragraphs: [
        "The normal way to build a portfolio like this is to take real engagements and sanitise them. Change the client's name, generalise the numbers, drop anything commercially sensitive. It is honest work, it demonstrates you have done the job, and I am not going to argue that it has no value.",
        "But look carefully at what survives the process, because the sequence is not random. The most sensitive material goes first, and the most sensitive material is usually the most architecturally decisive.",
      ],
      bullets: [
        "The budget goes. No client wants their spend published, and budget is the constraint that eliminates more designs than any technical consideration.",
        "The failed prior attempt goes. \"They tried this twice before and it did not work\" is embarrassing to the client and is frequently the single most important input into the design.",
        "The political constraint goes. \"The system had to live inside the tool the team already used, because a second tool would not be adopted\" names an internal reality nobody wants attributed.",
        "The numbers become adjectives. Volume becomes \"high\". Latency becomes \"strict\". A per-request cost ceiling becomes \"cost was a consideration\".",
      ],
    },
    {
      paragraphs: [
        "What is left is a description of what was built. Which is the least interesting part, because it is the output. The reasoning that produced it has been redacted out — and reasoning is the only thing in a portfolio like this that transfers to a reader with different circumstances.",
        "There is a second problem, and it is worse. The reader cannot check any of it either way. If I write that a system cut handling time by 40%, you have no means to verify that, whether the engagement was real or invented. Anonymised work asks for trust and then removes every mechanism by which trust could be earned. It converts an architecture argument into a claim about my character.",
      ],
    },
    {
      heading: "The same case, written both ways",
      paragraphs: [
        "It is easier to see the loss with a concrete comparison. Take the healthcare note on this site. Written as sanitised client work, the publishable version reads roughly like this:",
        "\"A European healthcare group needed to handle high inbound patient message volume across multiple channels without expanding administrative headcount. We designed a hybrid solution combining deterministic automation with a retrieval-augmented language model, with human escalation for clinical topics. The solution was delivered on Azure and integrated with the existing CRM.\"",
        "Every word of that is true and none of it is useful. There is nothing in it a reader can disagree with, because there is nothing in it that could have been otherwise.",
        "The version I actually published says that roughly three quarters of inbound volume turned out to be deterministically answerable, that this share — not the choice of model — is what decides whether the system is affordable at all, and that if repetitive traffic were materially below about 40% the entire design stops paying for itself. It states the cost ceiling as a number and derives the expected figure from token counts and prices, showing the arithmetic. It names the clinical boundary as the hard constraint and explains what relaxes downstream if a clinician reviews outbound messages instead.",
        "The second version can be argued with. That is the whole difference.",
      ],
    },
    {
      heading: "What a constructed scenario buys",
      paragraphs: [
        "If I invent the scenario, I control the constraints. That sounds like cheating and it is nearly the opposite: it means I can choose constraints that genuinely bind, and then have to live with them for the length of the note rather than quietly relaxing whichever one becomes inconvenient in section nine.",
        "I can state every figure, because no client is exposed by any of them. I can say the phase-one budget is €250,000, that operating cost may not exceed €80,000 a year, and that this implies a ceiling of roughly three cents per model-path request at the stated volumes — and then show the multiplication that gets there, so a reader can check my arithmetic and tell me I am wrong.",
        "Most importantly, I can be explicit about which numbers I invented and what happens if they are wrong. Every note here carries a section doing exactly that: naming a parameter, the value assumed, a plausible alternative value, what the architecture becomes at that alternative, and why.",
        "That section is structurally impossible to write about a real client. You cannot publish \"here is what we would have built if their volume had been a tenth of what it was\" without telling everyone what it was. The most useful section in these notes is the one anonymised work cannot have.",
      ],
    },
    {
      heading: "The objection I take most seriously",
      paragraphs: [
        "It is not \"you have never done this\". It is this: if you invent the problem and the solution, of course they fit. You have written a scenario that flatters your own conclusion, and no reality ever pushed back.",
        "That is a real risk and it is the failure mode of the whole method. A constructed case can be a rigged demonstration as easily as an honest exercise, and from the outside the two look similar.",
        "The only defence I have found is structural rather than a promise. Each note has to name the parameter values at which its own design stops being the right answer — and name them specifically enough that a reader can check their own situation against them. The payments note says that if the payment switch is already a managed cloud service, its central architectural decision collapses entirely. The healthcare note says that above roughly 90% repetitive traffic, a language model probably does not belong in phase one at all.",
        "Writing those sections is uncomfortable in a way that writing the design is not, because they are where you argue against yourself in public. If a note has no such section, or if the section lists only alternatives under which the design still wins, it is a rigged demonstration and should be read as one. That test applies to mine as much as anyone's.",
      ],
    },
    {
      heading: "Where the invented part stops",
      paragraphs: [
        "The scenarios are constructed. Almost nothing else is, and the distinction matters more than the framing suggests.",
        "Regulations are real, and I read them rather than paraphrasing what I half-remember from a conference talk. Where a threshold or an obligation carries architectural weight, I say which instrument it comes from and that it should be confirmed against the current text — because regulation moves and a blog post does not.",
        "Latency budgets are real. So are the failure modes: training and serving features drifting apart until accuracy decays with no alert firing, an escalation queue that grows faster than the humans behind it, a retrieval system citing a superseded revision with complete confidence. These are not invented for narrative convenience; they are the things that actually go wrong, and most of them are boring enough that fiction would not bother with them.",
        "Cost structures are real in shape if not in figure. Where I use a price I say it is an assumption anchored to a moment rather than a quote, and I write the formula so the euros can be recomputed when the prices move — which they do, consistently downward, faster than anyone updates their slides.",
        "What is constructed is the arrangement: a particular organisation, with a particular combination of constraints, chosen so that an interesting trade-off is forced rather than avoidable. That is much closer to how an architecture exercise works in a design review than it is to storytelling.",
      ],
    },
    {
      heading: "The cost, stated plainly",
      paragraphs: [
        "This buys nothing in the way of proof. Nothing here demonstrates that I have delivered a system, kept one running through its second year, or been in the room when a design met production and lost.",
        "I am not going to dress that up. If you want evidence of delivery, a CV and a reference do that job and this does not. There is a second thing it cannot do either: a constructed scenario has no operational surprises in it, and operational surprise is a large fraction of what experience actually is. Nobody in these notes gets a call at three in the morning about a queue that stopped draining for reasons that make no sense.",
        "So the notes make one claim and only one: that the reasoning is worth reading and worth arguing with. If you are hiring, treat them as evidence about how someone thinks and not as evidence about what they have shipped. Those are different questions and they deserve different evidence.",
      ],
    },
    {
      heading: "The test I would apply to any of it",
      paragraphs: [
        "If a note is only interesting because of who the client was, it was never about architecture in the first place. The useful question is whether the reasoning transfers — whether a reader facing a different volume, a different regulator and a different existing estate can work out which parts of the argument survive contact with their own situation.",
        "That is why every note ends by naming what it is most sensitive to. It is the section I would read first in someone else's work, and the one that anonymised writing structurally cannot produce.",
        "Disagree with any of it. That is the point of publishing reasoning rather than results — a result can only be believed or not, but an argument can be taken apart.",
      ],
    },
  ],
};

export default post;
