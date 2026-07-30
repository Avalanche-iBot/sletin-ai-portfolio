import type { CaseStudy } from "../types";

/**
 * Case study 06 — order intake from email.
 *
 * Deliberately the light one. The five notes before it are demanding, and a set
 * that never lets the reader rest stops being read. So this is short, the
 * scenario is small enough to hold in your head, and the lesson is one
 * sentence: "the usual" is not in the email, it is in the account.
 *
 * The lesson it owns is that reading the message is the easy half. A model
 * handles the language without difficulty. What it cannot do is know that "the
 * usual 3/4 fittings" means one part number for this customer and a different
 * one for the next, because that fact lives in their order history rather than
 * in their words. So the design resolves against the customer first and the
 * catalogue second, which is the opposite of how these systems are usually
 * built.
 *
 * It is also the first note on this site built on AWS, and the reason is stated
 * in the technology section rather than assumed: this company has no Microsoft
 * estate to inherit, so the argument that decided the other five is simply not
 * available here.
 *
 * Constructed scenario. The figures are assumptions, and each one is small
 * enough to check on paper.
 */
const caseStudy: CaseStudy = {
  slug: "order-intake-from-email",
  order: 6,
  title: "Order Intake from Email",
  subtitle:
    "Two hundred orders a day arrive as emails written by people in a hurry. Reading them is easy. Knowing what \"the usual\" means is the whole problem.",
  industry: "Wholesale distribution",
  domain: "Order intake · Customer service",
  status: "Architecture note",
  statusNote:
    "The smallest system on this site, and the only one I would be comfortable building in a quarter. Written short on purpose.",
  architectureComplexity: 2,
  complexityLabel: "Moderate — one model call, one lookup, and a matching problem that is harder than it looks",
  duration: "Assumed programme length: 3 months",
  githubUrl: "",
  liveDemoUrl: "",
  demoNote: "Architecture-first case study — no public demo",
  featured: false,
  shortSummary:
    "A parts distributor gets 200 orders a day as emails. Two people retype them into the ERP. A model reads those emails easily — that turns out not to be the hard part. \"Twenty of the usual 3/4 fittings\" means one part number for this customer and a different one for the next, and the difference is in their order history, not in their words. So the system searches the customer before it searches the catalogue.",
  impact:
    "Target: 4 minutes an order → under 1 minute · wrong parts from typing errors down by two thirds · nothing ordered that a person did not see",
  tags: ["Email intake", "AWS", "Order entry", "Human-in-the-loop", "Small system"],

  techGroups: [
    { group: "AI", items: ["Amazon Bedrock", "Amazon Textract"] },
    { group: "Ingest", items: ["Amazon SES", "S3", "Lambda", "SQS"] },
    { group: "Data", items: ["DynamoDB", "OpenSearch", "The existing ERP"] },
    { group: "Operations", items: ["CloudWatch", "EventBridge"] },
  ],

  executiveSummary: {
    statement:
      "A constructed scenario. The figures are assumptions, chosen small enough that anyone can check them on paper.\n\nHere is the whole problem, in one email. It arrives at 08:14 on a Tuesday:\n\n\"Hi Marco, need 20 of the usual 3/4 fittings and 5 gasket kits like last time. Machine is down. Thanks, Luca\"\n\nA person in customer service reads that in four seconds. Then they spend four minutes on it. They work out which company Luca is from his email address. They open his order history and find that when this customer says \"the usual 3/4 fittings\", he means one specific part — not the six other 3/4 fittings in the catalogue. They check what gasket kit he bought last time, because it depends on which pump he runs. They see \"machine is down\" and put the order on today's van instead of tomorrow's. Then they type it into the ERP.\n\nTwo hundred of those a day, two people, about four minutes each. That is roughly thirteen hours of typing a day, and the typing is where the mistakes come from.\n\nA language model reads that email without difficulty. That is not in doubt and it is not the interesting part. The interesting part is that \"the usual\" has no meaning on its own. The same sentence from a different customer means a different part number. That information is not in the email — it is in the account.\n\nSo the system does not search the catalogue first. It searches what this customer has bought before, and only falls back to the catalogue when the history has nothing to say. That is the whole design, and everything else in this note follows from it.",
    verdict: "\"The usual\" is not in the email. It is in the account.",
    highlights: [
      { k: "The problem", v: "13 hours a day spent retyping orders that arrived as prose" },
      { k: "The easy half", v: "Reading the email. Any current model does this well" },
      { k: "The hard half", v: "\"The usual\" means a different part for every customer" },
      { k: "The design in one line", v: "Search the customer's history first, the catalogue second" },
      {
        k: "What would break it",
        v: "If most orders come from customers with no history, there is nothing to resolve against and this is an ordinary catalogue-search problem",
      },
    ],
  },

  businessContext: {
    narrative:
      "The company sells industrial consumables — fittings, seals, bearings, fasteners — to about 1,400 active customers. Most are small: workshops, maintenance departments, contractors. They order when something breaks, which means they order in a hurry and they write like people in a hurry.\n\nOrders arrive by email. Some are neat lists. Many are a sentence. A few are a photograph of a handwritten note taken on a phone, or a PDF exported from the customer's own system. Two people in customer service turn all of it into ERP orders.\n\nThe number that matters most is four minutes, and it is an average hiding a wide spread. A clean order with part numbers takes forty seconds. A vague one takes ten minutes, and sometimes a phone call. About one order in six needs that call, and the call is what makes the working day unpredictable rather than merely busy.\n\nThe second number is the error rate. I have assumed 1.5% of order lines are entered wrong — a transposed digit, the wrong variant of a part that has eight variants. At roughly 1,000 lines a day that is fifteen wrong lines, most caught before shipping and perhaps a third not. Five wrong deliveries a day, at an assumed €40 each to collect and re-ship, is about €200 a day. I would want that figure measured before anyone builds anything, because it is the one that carries the business case and it is the one nobody currently tracks.\n\nWhat makes this worth automating is not the typing. It is that the typing happens between 08:00 and 11:00, when everybody emails at once, and the van leaves at 15:00.",
    companyFacts: [
      { k: "Active customers", v: "~1,400" },
      { k: "Orders a day, by email", v: "~200" },
      { k: "Lines per order, average", v: "~5" },
      { k: "Time per order today", v: "~4 minutes, from 40 seconds to 10" },
      { k: "Orders needing a phone call", v: "~1 in 6" },
      { k: "Order-entry error rate, assumed", v: "~1.5% of lines" },
      { k: "People doing this", v: "2" },
      { k: "The deadline that matters", v: "The van leaves at 15:00" },
    ],
    drivers: [
      "Three hours of every morning spent typing, at exactly the hours the orders arrive.",
      "Wrong parts shipped because a digit was mistyped, on orders where the customer's machine is already stopped.",
      "One person on holiday means the backlog reaches the afternoon and orders miss the van.",
      "Customers who order rarely get slower service than customers who order daily, because their habits are not in anyone's head.",
    ],
    constraints: [
      "The ERP stays. It is the system of record for orders, stock and pricing, and nothing here writes around it.",
      "No customer is asked to change how they order. If the fix requires a portal, the fix has failed.",
      "An order that reaches the ERP has been seen by a person. That is a commercial rule, not a technical one.",
      "The company has no IT department — one external partner, two days a month.",
    ],
    existingStack: ["The ERP", "Microsoft 365 email", "A catalogue database", "Nothing else"],
  },

  stakeholders: [
    {
      role: "Customer service (two people)",
      interest: "Getting through the morning without the backlog reaching the afternoon.",
      concern: "A system that makes them check its work will be slower than typing.",
      influence: "They decide whether it is used at all",
    },
    {
      role: "Sales",
      interest: "Rare customers served as well as frequent ones.",
      concern: "An automated reply that reads as automated, to a customer with a stopped machine.",
      influence: "Owns the customer relationship",
    },
    {
      role: "Warehouse",
      interest: "Fewer wrong picks, and orders arriving before the van is loaded.",
      concern: "A rush of orders confirmed at 14:50.",
      influence: "Feels every error first",
    },
    {
      role: "The owner",
      interest: "Growing without hiring a third person for order entry.",
      concern: "Spending on something that needs an engineer to keep running.",
      influence: "Budget gate",
    },
  ],

  discovery: {
    intro:
      "Three conversations and one afternoon watching the work. The afternoon was worth more than the conversations, which is usually true and is worth saying because it is cheap to arrange and rarely done.",
    groups: [
      {
        audience: "Customer service, watched rather than interviewed",
        goal: "Find out where the four minutes actually go.",
        questions: [
          "Talk me through this order as you do it.",
          "How did you know that was the right part?",
          "What made you pick up the phone on that one?",
          "Which of these could you have done in your sleep?",
        ],
        answers: [
          "Almost none of the time is reading. It is looking things up and typing them in.",
          "\"He always orders that one\" was the answer to most of my questions about part choice.",
          "The phone comes out when the customer is new, or when they have bought two similar things before.",
          "Both operators knew the top thirty customers' habits by heart, and neither had written any of it down.",
        ],
      },
      {
        audience: "Sales",
        goal: "Understand what a mistake actually costs, and to whom.",
        questions: [
          "What happens when the wrong part ships?",
          "Which customers would forgive that, and which would not?",
          "Is a slow answer worse than a wrong one?",
        ],
        answers: [
          "A wrong part to a customer with a running machine is an annoyance. To one with a stopped machine it is a lost customer.",
          "Slow is survivable. Wrong is not, and the two are not close.",
        ],
      },
      {
        audience: "The ERP partner",
        goal: "Find out what can be written and how.",
        questions: [
          "Can an order be created through an interface?",
          "Can we read a customer's order history the same way?",
          "What happens if we send the same order twice?",
        ],
        answers: [
          "Orders can be created and history read through the ERP's own interface. Both are straightforward.",
          "Sending the same order twice creates two orders. Nothing stops it, so we have to.",
        ],
      },
    ],
    assumptions: [
      "Most orders come from customers who have ordered before — I have assumed 85%.",
      "Order history is complete enough to resolve against, going back at least two years.",
      "1.5% of lines are entered wrong today. Nobody measures this, and it is the figure the business case rests on.",
      "Operators will accept a pre-filled screen if it is genuinely faster than typing, and will abandon it if it is not.",
    ],
    implications: [
      {
        finding: "\"He always orders that one\" answered most part questions",
        implication:
          "The knowledge that makes this work is in the order history, not in the catalogue and not in the email. So the system resolves against the customer first. The catalogue is the fallback, not the starting point.",
      },
      {
        finding: "The phone comes out for new customers and for ambiguous ones",
        implication:
          "Those are precisely the cases the system should not guess at. It needs a third answer — not a part number, not a failure, but a question — and asking has to be as cheap as typing or it will not be used.",
      },
      {
        finding: "Wrong is much worse than slow",
        implication:
          "The system is tuned to ask more often than a person would, not less. Every threshold in it is set on that side.",
      },
      {
        finding: "Two operators hold thirty customers' habits in their heads",
        implication:
          "That is a single point of failure nobody has priced. Making it explicit is worth something on its own, separately from the time saved.",
      },
      {
        finding: "Sending the same order twice creates two orders",
        implication:
          "Every write carries a key derived from the email, so a retry cannot duplicate an order. Small, boring, and the kind of thing that is painful to add later.",
      },
    ],
    businessRisks: [
      "A wrong part shipped to a customer whose machine is stopped",
      "Operators abandoning the system in week two because confirming is slower than typing",
      "An automated reply reaching a customer who expected a person",
    ],
    technicalConstraints: [
      "The ERP is the system of record and is written to through its own interface",
      "Attachments arrive as PDFs and as photographs of handwritten notes",
      "No IT department — anything needing weekly attention will not survive",
    ],
  },

  analysis: {
    aiNeeded: {
      verdict: "Yes, for reading the email. That is a smaller job than it sounds.",
      body:
        "The input is prose written by someone in a hurry, in two languages, sometimes as a photograph. There is no rule that turns \"20 of the usual 3/4 fittings and 5 gasket kits like last time\" into two order lines. A model does this well and has done for some time.\n\nWhat the model does not do is decide which part \"the usual\" means. That is a lookup against this customer's history, and treating it as a language problem is the mistake this design exists to avoid. Ask a model to pick from a 40,000-line catalogue on a text description and it will pick something plausible, which for a workshop with a stopped machine is worse than picking nothing.",
    },
    automationAlternative: {
      verdict: "A customer portal would solve this and will not be adopted",
      canAutomate: [
        "Matching an email address to a customer account",
        "Pulling that customer's order history",
        "Stopping the same email from becoming two orders",
        "Flagging an order that mentions a stopped machine",
      ],
      cannotAutomate: [
        "Turning \"the usual ones, like last time\" into two order lines",
        "Reading a photograph of a handwritten list",
        "Deciding that a customer who has bought two similar parts needs asking rather than guessing",
      ],
      body:
        "The obvious answer is a portal where customers select parts themselves. It removes the problem completely and it is cheaper to build than this. It also fails, for a reason that has nothing to do with technology: these customers order when something has broken, from a phone, in a workshop, and they will send an email because an email takes eight seconds. A portal moves the work onto the person least willing to do it. Several of the company's competitors have one; the orders still arrive by email.",
    },
    valueAreas: [
      "The three hours a morning currently spent typing",
      "Errors introduced by typing rather than by judgement",
      "Rare customers getting the same quality of interpretation as frequent ones",
      "Thirty customers' buying habits written down instead of held in two people's heads",
    ],
    outOfScope: [
      "Pricing and discounts — the ERP decides those and always will",
      "Stock allocation and delivery scheduling",
      "Replying to customers automatically without a person seeing it",
      "Anything that asks the customer to change how they order",
    ],
    conclusion:
      "This is a small system and I want to be plain about that. One model call, one history lookup, one screen, one write to the ERP. The reason it is worth a case note is not its size but the ordering: almost every version of this that gets built searches the catalogue first, and searching the customer first is what makes it work.",
  },

  alternatives: [
    {
      option: "Match order lines against the catalogue with text search",
      verdict: "Set aside, and it is what most implementations do",
      caseFor:
        "It is the obvious design. Extract a description, search 40,000 catalogue lines, take the best match. It needs no customer history, works for new customers as well as old ones, and can be built in a fortnight.",
      caseAgainst:
        "\"Fitting 3/4\" matches two hundred catalogue entries and the best match is a coin toss between six of them. It is confidently wrong in exactly the situation that costs most, and it is wrong in a way that looks right on a test set — because a test set does not know which of the six the customer meant either.",
    },
    {
      option: "A customer portal",
      verdict: "Set aside",
      caseFor:
        "It removes the ambiguity at its source. The customer picks the part, so nobody has to interpret anything, and the order arrives structured. Cheaper than this, and permanently correct.",
      caseAgainst:
        "It moves the effort onto the customer, at the moment they are least willing to spend it — machine down, phone in hand, workshop floor. Competitors have portals and still receive their orders by email. A solution the customer declines to use is not a solution.",
    },
    {
      option: "Read the email, resolve against the customer, confirm on one screen",
      verdict: "Direction taken in this note",
      caseFor:
        "The model does the part it is good at and nothing else. The candidate parts come from what this customer has actually bought, which is a list of tens rather than tens of thousands, and choosing well from tens is a problem that can be got right. The operator stays in the loop, so nothing reaches the ERP unseen.",
      caseAgainst:
        "It does nothing for a genuinely new customer — the history is empty and the design falls back to catalogue search with all the weaknesses above. It also depends on order history being clean, and I have assumed that without checking. If customers were merged, renamed or duplicated in the ERP over the years, the history is thinner than it looks.",
    },
  ],

  solutionDesign: {
    principles: [
      {
        t: "Search the customer before the catalogue",
        d: "The candidate list starts as what this customer has bought, not as 40,000 catalogue lines. The catalogue is where you go when the history is silent.",
      },
      {
        t: "Three answers, not two",
        d: "Confident, ask, or cannot tell. A system that must always produce a part number will produce a wrong one, and here that ships the wrong thing to a stopped machine.",
      },
      {
        t: "Asking has to be cheaper than typing",
        d: "The whole design fails if confirming takes longer than doing it by hand. One screen, pre-filled, keyboard-first, no navigation.",
      },
      {
        t: "A person sees every order",
        d: "This is a commercial rule the company set, and I would have proposed it anyway at this error cost. The gain is the typing, not the approval.",
      },
      {
        t: "The same email can never become two orders",
        d: "Every write carries a key derived from the message. Boring, cheap now, painful to retrofit.",
      },
      {
        t: "Nothing that needs weekly attention",
        d: "There is no IT department. Managed services, no cluster to keep alive, and a system that fails by going quiet rather than by going wrong.",
      },
    ],
    flowDiagram: {
      id: "email-to-order",
      kind: "blocks",
      title: "From email to order",
      caption:
        "The only unusual step is the third one. Most designs of this kind go from the words straight to the catalogue; this one goes to the customer's own history and reaches the catalogue only when that history has nothing to offer.",
      nodes: [
        { id: "email", t: "Email arrives", sub: "text, PDF or photo", col: 0, row: 0 },
        { id: "read", t: "Read into lines", sub: "quantity and words", col: 1, row: 0, accent: true },
        { id: "match", t: "Matched to parts", sub: "against this customer", col: 2, row: 0, accent: true },
        { id: "screen", t: "Operator confirms", sub: "one screen, pre-filled", col: 3, row: 0, accent: true },
        { id: "ask", t: "Sent back to ask", sub: "when history is silent", col: 1, row: 1 },
        { id: "erp", t: "Order in the ERP", sub: "before the van leaves", col: 3, row: 1 },
      ],
      edges: [
        { from: "email", to: "read" },
        { from: "read", to: "match" },
        { from: "match", to: "screen" },
        { from: "screen", to: "erp" },
        { from: "match", to: "ask", label: "no history", dashed: true },
      ],
    },
  },

  architecture: {
    overview:
      "Email lands in a mailbox, a function reads it, a model turns it into lines, each line is resolved against the customer's history, and an operator confirms one screen. That is the whole system.\n\nThe only component worth describing at length is the resolver, because it is where the lesson lives. It takes a line of text and a customer, and returns a part number with a reason. It looks at what this customer has bought in the last two years, at how the words in the email compare to how they described those parts before, and at how often they buy each one. A customer who has ordered the same fitting eleven times in a year is not ambiguous. A customer who has bought two similar seals once each is, and the resolver says so instead of choosing.\n\nEverything else is small and unremarkable on purpose. There is no queue that needs draining, no database to tune, and nothing that has to be restarted. The company has no IT department, and a design that ignores that is not a good design with a staffing problem — it is the wrong design.",
    diagrams: [
      {
        id: "system-overview",
        kind: "layers",
        title: "System overview",
        caption:
          "Four services and the existing ERP. The resolver is the only piece with any real logic in it, and it is a lookup rather than a model.",
        rows: [
          {
            label: "In",
            nodes: [
              { t: "Amazon SES", sub: "the existing address" },
              { t: "S3", sub: "the raw message" },
              { t: "Textract", sub: "PDFs and photos" },
            ],
          },
          {
            label: "Reading",
            nodes: [
              { t: "Bedrock", sub: "email to order lines", accent: true },
              { t: "Customer lookup", sub: "from the sender", accent: true },
            ],
          },
          {
            label: "Deciding",
            nodes: [
              { t: "Resolver", sub: "history first, catalogue second", accent: true },
              { t: "Confidence rule", sub: "confident · ask · cannot" },
            ],
          },
          {
            label: "Out",
            nodes: [
              { t: "Confirmation screen", sub: "one page, pre-filled" },
              { t: "The ERP", sub: "order created, keyed" },
              { t: "Reply to the customer", sub: "written by a person", muted: true },
            ],
          },
        ],
      },
      {
        id: "resolving-one-line",
        kind: "pipeline",
        title: "How one line becomes a part number",
        caption:
          "\"20 of the usual 3/4 fittings\" goes through this. The second stage is the one that does the work, and it is a lookup rather than a model — which is why it can be explained to a customer service operator in a sentence.",
        lanes: [
          {
            label: "What the words give you",
            steps: ["Quantity: 20", "Description: \"the usual 3/4 fittings\"", "Signal: \"machine is down\""],
            note: "Everything a model can tell you from the email alone, and it stops here.",
          },
          {
            label: "What this customer has bought",
            steps: [
              "Two years of their order lines",
              "How they described those parts at the time",
              "How often each one recurs",
            ],
            note: "Eleven orders of the same fitting is not ambiguity. This is where most lines are settled.",
          },
          {
            label: "The catalogue, if needed",
            steps: ["Only when the history has nothing", "Ranked, never auto-selected"],
            note: "A new customer lands here, and the honest answer is that the system is much weaker for them.",
          },
          {
            label: "What the operator sees",
            steps: [
              "Confident: the part, pre-filled",
              "Ask: two candidates and why",
              "Cannot tell: the raw text, to type",
            ],
            note: "Three outcomes. The middle one is the reason this works, and it is the one most designs leave out.",
          },
        ],
      },
    ],
    layers: [
      {
        name: "Reading",
        why: "One model call per email, returning quantity, description and urgency. Deliberately not asked to choose parts — that is the next layer's job and it is not a language problem.",
      },
      {
        name: "Resolving",
        why: "The component the note exists for. Customer history first, catalogue second, and a stated reason attached to every match so the operator can disagree with it in one glance.",
      },
      {
        name: "Confirming",
        why: "One screen. If it is slower than typing, none of the rest matters, so it is the part I would build first and test with a stopwatch.",
      },
    ],
  },

  technologySelection: [
    {
      layer: "Cloud",
      choice: "AWS",
      why: "Worth stating plainly, because the other five notes on this site all chose Azure. They chose it because their scenarios had a Microsoft estate, an Entra directory and a procurement path already in place. This company has none of that — an ERP and a mailbox. With no estate to inherit, the argument that decided the others simply is not available, and SES receiving mail into S3 and triggering a function is about as small as this problem can be made.",
      alt: "Azure with Logic Apps and Communication Services — perfectly capable, and chosen here would have been habit rather than reasoning.",
    },
    {
      layer: "Part matching",
      choice: "Customer order history first, catalogue second",
      why: "It turns a search across 40,000 lines into a choice among tens. That is the difference between a system that is confidently wrong and one that is usually right and says when it is not.",
      alt: "Catalogue search with reranking — the standard design, and it guesses in exactly the cases where guessing costs most.",
    },
    {
      layer: "When it is unsure",
      choice: "Show two candidates with the reason for each",
      why: "The operator settles it in a couple of seconds because they can see why. Discovery was blunt: wrong is much worse than slow, so the thresholds sit on the side of asking.",
      alt: "Always return the best match — better-looking automation figures, and the errors land on customers with stopped machines.",
    },
    {
      layer: "Attachments",
      choice: "Textract before the model, for PDFs and photographs",
      why: "A photograph of a handwritten list is a real and regular input here. Extracting text first keeps the model's job the same whatever the order arrived as.",
      alt: "Send the image to the model directly — fewer moving parts, less predictable on bad handwriting in a badly lit workshop.",
    },
    {
      layer: "Not ordering twice",
      choice: "A key derived from the message, carried into the ERP write",
      why: "The ERP will happily create the same order twice. A retry after a timeout is the normal way that happens, and this costs nothing now.",
      alt: "Check for duplicates before writing — a race waiting to happen on a busy morning.",
    },
  ],

  security: {
    posture:
      "There is not much here, and saying so is more useful than inventing a threat model. The data is business contact details and what one company buys from another. No personal data beyond names in email signatures, no regulated category, no cross-border question.\n\nTwo things do matter. The mailbox is a public address, so anything arriving at it is untrusted text going to a model — which is handled by the model having no ability to do anything except return order lines, and by a person seeing every order before it exists. And customer order history is commercially sensitive between customers: a resolver that could reach across accounts would be leaking one workshop's buying pattern to another. The lookup is scoped to a single customer by construction.",
    controls: [
      {
        t: "The model returns data, never actions",
        d: "It produces quantities and descriptions. It cannot write to the ERP, price anything or send mail, so a crafted email has nothing to reach for.",
      },
      {
        t: "History lookups scoped to one customer",
        d: "Resolution runs against a single account. There is no query shape that can span two.",
      },
      {
        t: "A person before every order",
        d: "The commercial rule doubles as the security control, which is convenient and worth noticing rather than claiming as design.",
      },
      { t: "The raw email kept", d: "Every order links back to the message it came from, which settles disputes in one click." },
    ],
  },

  costOptimization: {
    body:
      "This is the cheapest system on this site by two orders of magnitude, and the numbers are worth putting down because they change what the conversation is about.\n\nReading one email takes an assumed 2,000 input tokens and returns about 400. At 200 orders a day and 22 working days that is 4,400 emails a month — 8.8 million input tokens and 1.8 million output. On a small hosted model at an assumed $0.80 per million input and $4 per million output, that is about $14 a month. Text extraction on the quarter of orders with an attachment adds a few euros. Everything else — mail receipt, storage, functions, a small table — is under €30 a month at this volume.\n\nSo call it €50 a month against two people spending three hours a morning typing.\n\nOne honest caveat about what that comparison means. Nobody is dismissed. The two operators are the ones confirming orders, and the saving shows up as capacity and as fewer errors, not as payroll. A business case written as \"replaces one salary\" would be both wrong and the fastest way to lose the operators whose cooperation the system depends on.\n\nThe prices above are assumptions anchored to hosted pricing as it stood in mid-2026. The token counts are the durable part; recompute the dollars.",
    levers: [
      {
        n: "01",
        t: "Use a small model",
        d: "Reading an email into quantities and descriptions is not hard. The capable model would cost ten times as much to do the same job no better.",
      },
      {
        n: "02",
        t: "Resolve with a lookup, not a model",
        d: "The matching step is the expensive one to get wrong and the cheapest one to run — it is a query against order history, not a second model call.",
      },
      {
        n: "03",
        t: "Extract attachments only when there is one",
        d: "Three quarters of orders are plain text and skip that path entirely.",
      },
    ],
    model: [
      { k: "Emails a month", v: "~4,400 — 200 a day over 22 working days" },
      { k: "Input tokens per email, assumed", v: "~2,000 — the message, the customer, their recent parts" },
      { k: "Output tokens per email, assumed", v: "~400 — a few order lines, nothing more" },
      { k: "Model price, assumed", v: "$0.80 / $4 per million in and out — a small hosted model, mid-2026" },
      { k: "Model cost", v: "~$14 a month" },
      { k: "Everything else", v: "Under €30 a month — mail, storage, functions, one table" },
      { k: "Total running cost", v: "~€50 a month" },
      { k: "What it is set against", v: "~13 hours a day of typing across two people" },
      { k: "What it does not do", v: "Remove a salary. The saving is capacity and errors, and saying otherwise loses the operators" },
      { k: "Price basis", v: "Assumptions from mid-2026. The token counts are durable; the dollars are not" },
    ],
  },

  risks: [
    {
      n: "01",
      risk: "A confidently wrong part on an urgent order",
      severity: "High",
      consequence: "The wrong thing arrives at a workshop whose machine is already stopped",
      mitigation:
        "Candidates come from the customer's own history rather than the catalogue; two candidates are shown rather than one guessed; thresholds set to ask more often than a person would.",
    },
    {
      n: "02",
      risk: "Operators stop using it because confirming is slower than typing",
      severity: "High",
      consequence: "The system is quietly abandoned in week two and nothing is recovered",
      mitigation:
        "One screen, pre-filled, keyboard-first. Time per order measured with a stopwatch during the pilot, against the same operators doing it by hand.",
    },
    {
      n: "03",
      risk: "Order history is dirtier than assumed",
      severity: "Medium",
      consequence: "Resolution is weak for more customers than expected and the design's advantage shrinks",
      mitigation:
        "Checked in the first two weeks against real history before anything is built around it. Duplicated and merged customer records are the specific thing to look for.",
    },
    {
      n: "04",
      risk: "The same email becomes two orders",
      severity: "Medium",
      consequence: "A duplicate delivery and a credit note, on a customer who is already annoyed",
      mitigation: "A key derived from the message carried into the ERP write, so a retry cannot create a second order.",
    },
    {
      n: "05",
      risk: "New customers get a visibly worse service",
      severity: "Medium",
      consequence: "The system helps most exactly where help is needed least",
      mitigation:
        "Stated as a limit rather than hidden. New customers route to catalogue search and to a person, which is what happens today anyway.",
    },
  ],

  kpis: [
    {
      category: "Speed",
      kpi: "Median time from email to order in the ERP",
      baseline: "~4 minutes",
      target: "< 1 minute",
      why: "The number that pays for it, and the one the operators feel every morning.",
    },
    {
      category: "Quality",
      kpi: "Order lines corrected by the operator before confirming",
      baseline: "n/a",
      target: "Measured, not minimised",
      why: "Driving this to zero would mean the confirmation had stopped being a check. What matters is which lines get corrected, because that is where the resolver is weak.",
    },
    {
      category: "Quality",
      kpi: "Wrong parts shipped from order entry",
      baseline: "~5 a day, assumed and unmeasured",
      target: "Down by two thirds",
      why: "The business case rests on this figure, and the first job is to measure it properly rather than to improve it.",
    },
    {
      category: "Health",
      kpi: "Share of lines the system declines to match",
      baseline: "n/a",
      target: "Reported, expected to be non-zero",
      why: "Declining is designed behaviour. A number rising over time means order history is drifting or a new customer segment has arrived.",
    },
    {
      category: "Adoption",
      kpi: "Orders going through the system rather than round it",
      baseline: "0%",
      target: "> 90% within a month",
      why: "The only honest measure of whether it is faster than typing. Operators voting with their hands is more reliable than any survey.",
    },
  ],

  roadmap: [
    {
      phase: "P0",
      name: "Check the history",
      duration: "2 weeks",
      goal: "Find out whether order history is clean enough to resolve against, before building anything on the assumption that it is.",
      activities: [
        "Sample 200 real emails and their resulting orders",
        "Check for duplicated and merged customer records",
        "Measure the current error rate, which nobody currently tracks",
      ],
      deliverables: ["A go or no-go on the central assumption", "A measured baseline for time and errors"],
    },
    {
      phase: "P1",
      name: "The screen",
      duration: "4 weeks",
      goal: "Build the confirmation screen first and prove it is faster than typing, before anything feeds it.",
      activities: [
        "One-screen confirmation, keyboard-first",
        "Reading and resolution behind it",
        "Timed against the same operators doing it by hand",
      ],
      deliverables: ["A screen the operators prefer", "Stopwatch comparison against manual entry"],
    },
    {
      phase: "P2",
      name: "Everything else",
      duration: "4 weeks",
      goal: "Attachments, the ERP write, and the boring parts that stop it going wrong.",
      activities: ["Textract for PDFs and photographs", "ERP order creation with a message key", "Monitoring that alerts a person, not a team"],
      deliverables: ["Live intake", "Duplicate protection", "A system that fails quietly and visibly"],
    },
  ],

  tailoring: [
    {
      parameter: "How many orders come from repeat customers",
      hereValue: "~85% — most customers order regularly",
      altValue: "Mostly one-off buyers with no history",
      architectureChange:
        "The resolver has nothing to resolve against and the design collapses into ordinary catalogue search, with all the weaknesses this note rejects. At that point I would build the catalogue version and be honest that it will need a person on most orders.",
      why: "This is the parameter the note is built on. Everything else follows from there being a history worth searching.",
    },
    {
      parameter: "What a wrong part costs",
      hereValue: "High — the customer's machine is usually stopped",
      altValue: "Low — a return and a re-ship, no urgency",
      architectureChange:
        "The thresholds move. Ask less, guess more, and the automation figures improve immediately. The three-answer design stops earning its complexity.",
      why: "Every threshold here is set by the asymmetry between slow and wrong. Remove the asymmetry and you are designing a different system.",
    },
    {
      parameter: "How the orders arrive",
      hereValue: "Free-text email, often with photos of handwritten notes",
      altValue: "Structured files or EDI from customers' own systems",
      architectureChange: "There is no reading step and no model. It is an integration, and a fairly ordinary one.",
      why: "The whole note exists because the input is prose. It is worth checking how much of the volume genuinely is — sometimes the large customers already send files and only the tail is prose.",
    },
    {
      parameter: "Whether there is anyone to run it",
      hereValue: "No IT department — one partner, two days a month",
      altValue: "An in-house team",
      architectureChange:
        "Self-hosted models and a search cluster become defensible, which changes the cost shape and removes the vendor dependency.",
      why: "The absence of anyone to maintain it eliminates more options here than any technical requirement does, and it is the constraint most often discovered after the fact.",
    },
  ],

  counterpart: {
    slug: "enterprise-knowledge-assistant",
    note: "The same structural idea at opposite ends of the risk scale. There, which revision of a procedure is current depends on which asset is asking; here, which part \"the usual\" means depends on which customer is asking. In both cases the answer is not a property of the thing being looked up but a relation between it and the person looking — and in both cases the naive design resolves globally and is confidently wrong for exactly the people whose situation is particular. Worth reading together for how differently the same insight is worth spending on: one buys an applicability layer joining two systems of record, the other buys a database query.",
  },

  assumptionsToTest: [
    "That 85% of orders come from customers with usable history. If it is closer to half, the design still works but is worth much less.",
    "That order history is clean. Merged and duplicated customer records over the years would thin it out invisibly, and I have not checked.",
    "The 1.5% error rate is assumed, not measured, and the business case rests on it. Measuring it is the first thing in the plan.",
    "That operators will prefer confirming to typing. I believe it, and it is the assumption I would test first with a stopwatch rather than argue about.",
  ],

  lessonsLearned: [
    "Reading the email was the part everyone assumed would be hard, and it is the part that needed the least thought.",
    "\"He always orders that one\" was the sentence that decided the architecture. The knowledge was in the order history the whole time, and nobody had thought of it as data.",
    "A third answer — ask — is what makes this usable. Systems that must always produce an answer produce wrong ones, and here a wrong one goes to a workshop that is already stopped.",
    "Watching an afternoon of the work told me more than the interviews did. It is cheap to arrange and it is the step most often skipped.",
  ],

  futureImprovements: [
    "Let the resolver learn from corrections, so a part the operator fixes twice stops being offered wrongly a third time.",
    "Draft the reply to the customer as well as the order — still sent by a person, but written in a second rather than a minute.",
    "Look at what customers reorder on a cycle and ask before they do, which is a sales idea rather than an intake one and would need its own note.",
  ],
};

export default caseStudy;
