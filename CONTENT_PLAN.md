# Content plan — ten case notes

What each note is for, and what it must not turn into.

---

## The rule the whole set is built on

**One note, one architectural lesson, and no two the same.**

The value of ten case notes is that they are ten *different* problems. A note
repeating another's thesis in a new industry is worth less than no note at all,
because it makes the entire set read as one template with the nouns swapped —
and a reader who notices that stops trusting the rest.

This is not hypothetical. Case 02 was originally a B2B customer-support desk,
and it was case 01 a second time: the same deterministic-routing verdict, the
same escalate-when-unsure design, the same Azure OpenAI and AI Search stack,
the same cost-per-message framing. Different industry, identical reasoning. It
was rewritten from scratch.

**The test before writing anything: name the lesson this note owns, in one
sentence, and check no published note already owns it.** If the sentence needs
an "and also" to sound distinct, it is not distinct.

---

## Published

| # | Note | The lesson it owns | Shape |
|---|------|--------------------|-------|
| 01 | AI Patient Communication Platform | Most volume should never reach the model — routing decides affordability, not model choice | Conversational · human-in-the-loop · Azure |
| 02 | Real-Time Payment Fraud Decisioning | A decision with no human available, and where safety has to live instead | Streaming ML · hybrid on-prem/cloud · LLM excluded from the decision |
| 03 | AI Contract Intelligence | Provenance proves the text, not the reading — the gap between them is the architecture | Document extraction · agreement as the unit of truth · Azure |
| 04 | AI Meeting Assistant | Whether a remark was a commitment has no ground truth until someone decides — so confirmation creates the fact rather than checking it | Speech · consent as architecture · Azure |
| 05 | Enterprise Knowledge Assistant | Permissions belong inside the query, and "current" is a relation between document, asset and date | Permissioned RAG · applicability resolution · Azure |

Each of 03, 04 and 05 was sharpened rather than re-scoped: the lesson each
owns is the same one, taken one step further than the first draft took it. The
pattern in all three is the same and is worth naming, because it is the move
that makes a note worth reading — find the place where the obvious mechanism is
necessary and insufficient, and build the design around the insufficiency. A
citation that proves the text but not the reading. An attribution that names a
speaker but cannot say whether a commitment existed. A revision that is current
globally and wrong for this asset.

Cases 01 and 02 are deliberately opposed, and cases 03 and 05 approach the same
principle from different sides. Those pairings are load-bearing — the site links
them to each other for exactly that reason. Do not "harmonise" case 02 back onto
Azure: it is the one note that leaves it on part of its path, and that contrast
is what makes Azure in the other four read as a choice rather than a default.

---

## Planned

The five below replace an earlier list — *AI Invoice Processing*, *Predictive
Maintenance AI*, *AI Recruitment Assistant*, *AI Supply Chain Optimizer*,
*Executive AI Dashboard* — and then replace part of their own replacement.
*Enterprise AI Platform* was dropped in favour of demand planning, and
*AI Recruitment* was moved to consumer credit. Both changes are explained
under the entries that displaced them.

They are chosen against a coverage map rather than a list of interesting
topics, because "different" has to mean something checkable. Across all ten:
ten sectors, ten data types, and six notes where a language model does the
central work against four where one is absent or peripheral. That last ratio
is the point — a portfolio in which every problem is solved by the same class
of tool describes a preference, not an architect.

Each entry states the lesson, the material it turns on, and the specific way
it could go wrong in the writing.

### 06 · Agentic Order-to-Cash Operations

**Sector: industrial distribution. Data: transactions and documents. Model: a
language-model agent over a deterministic workflow.**

**Lesson: reversibility.** Every published note has the system produce an
answer. This one has it *act* — amending orders, releasing credit holds,
issuing credit notes, posting into an ERP. The architectural question is not
accuracy but what happens when a chain of writes is 60% applied and the next
step fails.

The material: idempotency keys, compensating transactions, which steps may be
automatic and which need a human gate, and the uncomfortable fact that some
actions have no compensating transaction at all — a credit note issued to a
customer cannot be quietly un-issued. The honest verdict is probably that the
interesting work is transactional design and the model is the least difficult
component.

**Failure mode to avoid:** becoming an invoice-extraction note. The moment the
emphasis moves to reading documents, this is case 03 again. The writes are the
subject.

### 07 · AI Demand Planning

**Sector: grocery or general retail. Data: time series. Model: gradient
boosting or classical forecasting — no language model anywhere.**

**Lesson: the decision is the product, not the prediction.** A forecast nobody
acts on is worth exactly zero, and the architecture problem is the override
loop rather than the model.

Two threads carry it. First, the model is measured on forecast accuracy while
the business is measured on stock-outs and waste, and those can move in
opposite directions — a forecast that is more accurate on average can be worse
commercially if its errors fall on the wrong side. Second, and this is the
part rarely written: **planner overrides are the most valuable data in the
system and almost everyone throws them away.** A planner who consistently
overrides in one direction is reporting something the model cannot see, and
the architecture should treat that as a signal to be captured rather than as
non-compliance to be trained out.

**Failure mode to avoid:** a survey of forecasting methods. Nobody needs
another comparison of ARIMA against gradient boosting. The subject is what
happens between the forecast and the purchase order.

**Why it displaced the platform note:** the platform case is the hotter topic
and would have been the weaker note. It has no scenario, no sponsor and no
numbers, its customer is an internal engineering team, and it would have been
structurally unlike the other nine — a whitepaper wearing a case study's
clothes. Demand planning fills three coverage gaps at once (time series, batch
processing, a second note with no language model) and has a real business
problem in it.

### 08 · Consumer Credit Under the EU AI Act

**Sector: consumer lending. Data: tabular application and bureau data. Model:
scorecard plus machine learning.**

**Lesson: a regulated decision about a person, where compliance is
architecture rather than paperwork.** Credit scoring is named high-risk in the
Act's own annex, which turns obligations into design requirements at the
start: logging, human oversight that is real rather than nominal, transparency
to the applicant, technical documentation, and bias monitoring across
protected groups.

The material worth the note is one specific bind: **you cannot measure
fairness across an attribute you are not permitted to collect.** European
lenders generally may not hold ethnicity, and in several markets not gender
either — yet the Act expects demonstrable monitoring for discriminatory
outcomes. The resolutions are all uncomfortable: statistical proxies with
their own error, a separately governed collection path walled off from the
model, or an argument that monitoring on permitted attributes is sufficient.
Nobody writes about this and every lender in Europe is currently living it.

**Failure mode to avoid:** a compliance checklist. The note has to show the
regulation changing the architecture rather than sitting beside it.

**Why credit rather than recruitment:** the lesson is the same and the
material is not. Credit has real data, real models, an adverse-action notice
as a concrete artefact, and decades of fairness measurement to argue with.
Recruitment tends to end at "do not automate the ranking", which is a correct
conclusion and a thin case note.

### 09 · Edge Vision for Quality Inspection

**Sector: manufacturing. Data: images. Model: computer vision — no language
model. Deployment: on the line.**

**Lesson: inference where you cannot watch it.** The model runs on a
production line with no reliable link back, on hardware chosen years ago, at a
rate set by the conveyor rather than by you.

The material: what drift means when you cannot observe it — nobody tells you
the model missed a defect until a customer does, months later — so the
architecture needs a sampling regime that costs line time and has to be
justified to a plant manager. Shipping a model update over an intermittent
link without stopping a line. Keeping enough evidence locally to diagnose a
bad shift after the fact. And the constraint that overrides all of them: the
inspection is worthless unless it is faster than the line.

**Failure mode to avoid:** drifting into anomaly-detection theory. The subject
is the deployment boundary, not the model.

**Portfolio role:** the only note with no language model anywhere, the only
one where the constraint is physical, and the one that proves the rest of the
set is a set of choices rather than a habit.

### 10 · AI-Assisted Legacy Modernisation

**Sector: telecommunications — billing and provisioning. Data: source code.
Model: a language model over code.**

**Lesson: verifying output against a running system.** Every other note is
judged by a person reading the result. Here a ground truth exists — the
existing system — and the only acceptable standard is that the new behaviour
matches the old, bugs included, because processes have been built around them.

The material: recovering undocumented business rules from code nobody wrote
recently, differential testing against replayed production traffic, deciding
which divergences are defects and which are fixes, and why "an experienced
developer read it and it looks right" stops being a verification strategy
somewhere around the ten-thousandth line.

**Failure mode to avoid:** a post about code generation quality. The subject
is the verification harness; generation is the easy half.

**Why it matters:** nearly every large organisation has this problem and a
budget for it, and almost nobody writes about the part that decides whether it
works.

### The coverage this produces

| # | Sector | Data | Language model | Latency |
|---|--------|------|----------------|---------|
| 01 | Healthcare | Conversational text | Central | Seconds |
| 02 | Payments | Streaming transactions | Excluded from the decision | 40 ms |
| 03 | Legal · procurement | Documents | Central | Batch |
| 04 | Professional services | Audio | Central | Asynchronous |
| 05 | Energy | Documents, tables, drawings | Thin layer | Seconds |
| 06 | Industrial distribution | Transactions and documents | Central | Asynchronous |
| 07 | Retail | Time series | None | Nightly batch |
| 08 | Consumer lending | Tabular | None or peripheral | Seconds |
| 09 | Manufacturing | Images | None | Line rate, at the edge |
| 10 | Telecommunications | Source code | Central | Batch |

If a future note cannot add a new row to that table, it is probably not worth
writing.

## Sequencing

Ordered so that adjacent notes contrast rather than reinforce:

```
01 conversational, human in the loop      06 agentic, acts on systems of record
02 real-time, no human at all             07 batch forecast, decision is the product
03 documents, provenance                  08 regulated decision about a person
04 speech, attribution                    09 edge, physical constraint, no LLM
05 retrieval, permissions                 10 code, verification against truth
```

A reader arriving at any note and moving to the next should meet a different
kind of problem, not the same problem in another industry.

---

## Writing order

Not the same as reading order. Suggested:

1. **06** — the highest-demand topic in the set and the furthest from anything
   published, so it also does the most to broaden the portfolio's apparent
   range.
2. **09** — write it second rather than last. It is the only note with no
   language model anywhere, and getting it published early is what stops the
   set reading as a generative-AI portfolio while five notes are still missing.
3. **10** — the most distinctive, and the one least likely to already exist
   elsewhere in any depth.
4. **08** — timely while the Act's obligations are still being worked out in
   practice, and the note with the strongest unwritten material in it.
5. **07** — last, because it is the one whose value depends least on being
   early. Bring it forward if the set starts feeling narrow before 09 lands.

---

## The blog beside the notes

Nine posts, all written, no placeholders — around 14,000 words. Each is drawn
from a case note rather than invented separately: a post is the one argument
from a note that stands on its own, which keeps the two consistent and halves
the work.

Each new case note should therefore yield one post, and the strongest candidate
is usually the thing the note argues against rather than for. The obvious ones
waiting in the planned five: why some actions have no undo and what that does
to an agent's design (06), why planner overrides are data rather than
disobedience (07), how to monitor for bias in an attribute you may not collect
(08), and what drift means when nobody will ever tell you that you were wrong
(09).

Do not add a title without a body. A queue of announced-and-unwritten posts
costs more credibility than an empty blog does.
