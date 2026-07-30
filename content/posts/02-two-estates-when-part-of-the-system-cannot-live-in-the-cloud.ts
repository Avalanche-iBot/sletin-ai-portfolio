import type { BlogPost } from "../types";

/** Drawn from the payment fraud note's deployment argument. */
const post: BlogPost = {
  slug: "two-estates-when-part-of-the-system-cannot-live-in-the-cloud",
  title: "Two estates: when part of a system cannot live in the cloud",
  excerpt:
    "Three reasons to keep part of an AI system off the cloud that survive scrutiny — none of which is a complaint about the cloud. Plus the honest accounting of what running two estates costs you, forever.",
  date: "2026-07-30",
  readingTime: "10 min",
  tags: ["Deployment", "Latency", "Compliance", "DORA"],
  category: "Architecture",
  featured: true,
  body: [
    {
      paragraphs: [
        "The default is one estate in one cloud, and it is the right default. Two estates means two deployment pipelines, two secret stores, two observability stacks, two on-call rotations, and an engineer who has to hold both in their head to debug anything that crosses the boundary. That is a permanent tax, paid every sprint, by every person who touches the system for as long as it exists.",
        "So the bar for splitting is high. What follows is what I think clears it — and, first, what does not, because the weak arguments are the popular ones and using them costs you the reader.",
      ],
    },
    {
      heading: "The arguments that do not survive",
      paragraphs: [
        "\"The cloud cannot do this.\" It almost always can. Managed streaming, managed feature stores, managed low-latency inference, managed everything — these are mature products, and an architect reading your justification knows it. A design defended by understating the alternative loses credibility at that paragraph, and every subsequent claim is read with suspicion. If you find yourself writing this sentence, the real reason is somewhere else and you have not found it yet.",
        "\"We are moving to a different cloud.\" Not an architectural argument. Same drawing, different logos. If the reason is that a second vendor is cheaper this quarter or that a procurement relationship exists, say so — those are legitimate reasons, and presenting them as architecture is what makes them sound weak.",
        "\"Data sovereignty\" on its own. Usually solvable in-cloud through region selection, and increasingly through sovereign-cloud offerings built precisely for this. It becomes a genuine argument only in narrow cases — where a regulator or a contract names the physical facility, or where the relevant sovereignty concern is about the provider's own jurisdiction rather than the data centre's. Those cases exist. Most invocations of the phrase are not them.",
      ],
    },
    {
      heading: "One: you are co-locating with something that cannot move",
      paragraphs: [
        "This is the strongest reason and the least ideological. Some decisions must return inside a window measured in tens of milliseconds — a payment authorisation, an ad auction, a control loop on a production line. The budget is not yours to negotiate. It belongs to whatever is waiting for the answer, and that thing will time out without asking your opinion.",
        "Work through where the milliseconds actually go and the argument becomes concrete rather than rhetorical. Suppose the fraud decision on a card authorisation has forty milliseconds at the ninety-ninth percentile. Feature assembly against a materialised store might take five. Real-time aggregate lookup, three. Rule evaluation, under one. Model inference on a few hundred features with a tree ensemble, two. That is roughly eleven milliseconds of work, leaving what looks like comfortable headroom.",
        "Now add a round trip from your own datacentre to a cloud region and back. Within the same metropolitan area, on a good day, that might be five to ten milliseconds. Between cities it is comfortably more. And the number that kills you is not the average — it is the tail, where a retransmission or a congested link turns ten milliseconds into fifty, and the decision that would have been correct arrives after the transaction has already been answered without it.",
        "You also cannot autoscale out of this. By the time an autoscaler has observed load and provisioned capacity, the requests it was meant to serve are long gone. The hot path is provisioned for the worst minute of the year and left there, which is a cost you accept as the price of the guarantee.",
        "Note the shape of the argument, because it determines when it expires: the constraint is not \"which cloud\", it is \"in the same facility as the thing that is waiting\". If that thing ever becomes a managed cloud service — and payment switches increasingly are — the justification evaporates, and the correct response is to move with it rather than defend the split out of habit.",
      ],
    },
    {
      heading: "Two: you are keeping an audited boundary small",
      paragraphs: [
        "Certain scopes are audited annually, component by component. The cardholder data environment under PCI DSS is the clearest example, but the pattern recurs wherever a standard defines a boundary and requires evidence for everything inside it.",
        "Everything inside that boundary costs money every year, not once. Each component needs evidence of access control, logging, patching, segmentation and change management, produced afresh at each assessment. Adding a service to the scope is not a one-off cost; it is an annuity paid to your assessor.",
        "This gets misunderstood as \"you cannot do PCI in the cloud\", which is false. The major providers are certified service providers and a great deal of compliant workload runs on them under a shared responsibility model. The real question is narrower and more useful: does putting this component here make the audited estate larger or smaller?",
        "Which leads to the architectural move that matters more than the deployment decision. Tokenise at the earliest possible point. If the scoring service never sees a primary account number — only derived features and a token — then it can sit outside the boundary regardless of where it runs, and the audited estate stops at the edge instead of spreading through the platform. That decision is worth more than the hosting choice, and it is available whichever way the hosting goes.",
      ],
    },
    {
      heading: "Three: concentration is now something you have to argue",
      paragraphs: [
        "For financial entities in the EU, the Digital Operational Resilience Act has applied since January 2025. Among its provisions: managing dependency on critical ICT third-party providers, maintaining a register of contractual arrangements, and having documented exit strategies — with an oversight regime for providers designated as critical.",
        "None of this prohibits anything. What it changes is the default. For a function that cannot be allowed to stop, \"all of it with one provider\" moves from a position you arrive at by not thinking about it to a position you have to defend deliberately, in writing, to someone whose job is to be unconvinced.",
        "The exit strategy requirement is the part with the sharpest architectural teeth. An exit strategy that consists of \"we would rebuild it\" is not one. Being able to say \"the decision path runs on components we operate ourselves, and only the training and analytics estate is provider-specific\" is a materially different conversation — and it is a conversation you have with a regulator, not with an architect.",
        "I would treat this as genuinely new input rather than a compliance footnote. Most AI architecture writing has not caught up with it, which is itself an opportunity if you work in a regulated sector.",
      ],
    },
    {
      heading: "What the split looks like when it is done well",
      paragraphs: [
        "Not a system spread evenly across two places, which is the failure mode. A system cut along a clock.",
        "One side is whatever must answer inside the window: the request path, the state it reads, the model it runs. Keep it deliberately small — few components, no network hops, no queues, no service you did not have to put there. Everything in it is provisioned for peak and left there, so every component is paid for continuously whether or not it is busy.",
        "The other side is everything measured in hours or days: training, backtesting, model approval, analytics, the tooling humans use to investigate things. None of it is latency-bound, so the argument for operating it yourself disappears entirely. This is where managed services earn their keep and where you should reach for them without hesitation.",
        "The boundary between them is where most of the design effort goes, and it should be asymmetric.",
      ],
      bullets: [
        "Events flow out continuously. Nothing flows in except signed, versioned artefacts — a model file and a rule set. That inbound list is the complete set of things that can change what the system decides, which makes the blast radius of the entire cloud estate finite and nameable.",
        "Verify signatures at load, and refuse an artefact whose feature schema does not match what the service expects. A model is executable content arriving from outside; treat it as supply chain, not as configuration.",
        "Let the cold path fall behind. If export buffers fill, decisions continue and export degrades. The cold path may be late; it may never be a dependency.",
        "Log the served feature vector, not the inputs it was derived from. This is what lets you train on what actually happened rather than on a reconstruction, and it is the single cheapest defence against training and serving quietly diverging.",
        "Write down the condition that would collapse the split, and revisit it annually. Mine is \"if the switch becomes a managed service\". A split nobody revisits becomes a split nobody can justify.",
      ],
    },
    {
      heading: "How you know the boundary is really one-way",
      paragraphs: [
        "It is easy to draw a one-directional arrow and much harder to keep one. Boundaries erode by reasonable increments: someone needs a configuration value from the cloud side, someone else wants the decision service to look up a customer segment computed by the analytics estate, and each request is individually sensible.",
        "The version that holds is enforced by the network rather than by agreement. No route exists from the cloud estate into the decision path — not a firewall rule that permits one service, an absence of a path. The only inbound channel is an artefact repository the decision service polls, and what it accepts from there is a signed file whose signature and schema it verifies before loading.",
        "That turns every future request to reach inwards into an explicit architectural change rather than a configuration edit, which is the point. If someone genuinely needs a customer segment on the hot path, the answer is that it becomes a feature computed by the streaming job on this side — not a lookup across the boundary. That is more work, and it is the work the split was buying.",
        "The test worth running periodically is simply to try it: from the cloud estate, attempt to reach anything in the decision path. If you can, the split is documentation rather than architecture.",
      ],
    },
    {
      heading: "What the second estate actually costs",
      paragraphs: [
        "Worth itemising, because the decision is usually made on the benefit side alone and the cost arrives later, distributed across people who were not in the meeting.",
        "You will maintain two deployment pipelines with different constraints and different failure modes. Two secret stores, and a rotation process that has to work in both. Two observability stacks, which in practice means a correlation problem: an incident that spans the boundary is investigated by joining two systems by hand at the worst possible moment. Two capacity models, one elastic and one emphatically not. And the human cost that nobody budgets — every engineer needs a working mental model of both, so onboarding is longer and the number of people who can debug the interesting failures is smaller.",
        "Against that: none of it is avoidable if a real constraint applies, and all of it is wasted if none does.",
      ],
    },
    {
      heading: "The decision, compressed",
      paragraphs: [
        "Three questions. If all three answers are no, put it all in one cloud and spend the saved effort on something that matters.",
      ],
      bullets: [
        "Is there something with a hard latency budget that this must sit beside, and is that thing immovable?",
        "Does hosting this here make an audited boundary meaningfully larger, and can tokenisation not solve it instead?",
        "Is this function one whose interruption is a regulatory event, in a sector where provider concentration is now a supervised concern?",
      ],
      // Closing paragraph after the checklist, deliberately short.
    },
    {
      paragraphs: [
        "When one of them is a yes, the split is not a compromise — it is the design, and the single estate is the compromise. When none of them is, two estates is an expensive way to express a preference.",
      ],
    },
  ],
};

export default post;
