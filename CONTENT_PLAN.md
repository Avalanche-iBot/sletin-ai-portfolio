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
| 06 | Order Intake from Email | "The usual" is not in the email — it is in the account | Email intake · customer history before catalogue · **AWS** |

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
Azure: it is the one published note that leaves it on part of its path, and 06
is the one built on AWS outright, for a reason it states.

---

## Planned

The four below sit in industrial operations, and that is a deliberate
reversal of an earlier plan for maximum sector spread. The reason is worth
recording, because it is the sort of decision that looks like a narrowing
and is not.

A case note is only an asset if its author can defend it in conversation. The
architecture reasoning transfers anywhere; the domain figures do not. Nobody is
caught out on whether a completeness gate is the right control — they are
caught out on whether 8% checkout abandonment is a realistic number, or whether
European lenders may hold an applicant's gender. Those are the details that
make a note good, and they are the details that require someone who knows the
domain.

So the remaining four move to energy, heavy industry and large capital
projects. The architectural lessons are unchanged. Only the setting moves.

**What this costs:** five of ten notes end up industrial. The portfolio stops
reading as a generalist's and starts reading as "an architect who works in
industrial operations and has thought carefully about adjacent domains". That
is a narrower position and, for a reader deciding whether this person could
help them, a more convincing one — but it is a different claim and should be
made knowingly.

**What it does not cost:** the coverage that matters. Ten data types, ten
distinct problems, and a spread of notes where a language model does the
central work against four where it is absent or peripheral. Sector spread was
never the point; it was a proxy for problem spread, and problem spread survives intact.

### 06 · Written — read this before touching it

06 is now *Order Intake from Email*, and it is the light one. What follows is
why the slot's first occupant was withdrawn, because those faults are easy to
repeat and the constraints they produced are what the current note is built to.

**Slot 06 was first written as "Agentic Turnaround Execution" and pulled after
drafting.** The reasoning in it held up. It was still the wrong note, and the
three faults are worth carrying forward because none of them is about accuracy.

- **It stacked two specialist domains.** Industrial turnaround operations and
  distributed transaction design. Each needs prior exposure to follow; the
  audience sitting in both is almost nobody.
- **Its thesis needed three moves before it landed.** "Most messages should
  never reach the model" lands in one sentence. "The fraud rate is a licence,
  not a metric" lands in one sentence. "Reversibility is a property of the
  action type rather than a runtime judgement" does not, and no amount of
  rewriting the sentence fixes that.
- **It never told a story.** Sixty-five findings a day, four classes of action,
  a taxonomy — and not once a single finding followed from an inspector's note
  to an applied change. The note described the shape of a problem without ever
  showing one.

It also failed the rule at the top of this file in a way worth being precise
about. The rule says a note is only an asset if its author can defend it in
conversation, and the planned notes moved to industrial operations for exactly
that reason. 06 *was* industrial and was still undefensible, because having
worked in a sector is not the same as being able to argue its figures under
questioning. Deferred production per hour, cancellation charges after release,
remobilisation clauses — those were beyond what could be held in an interview,
and the industrial setting hid that rather than preventing it.

**So the test is not which sector the scenario names. It is whether every
number in the note can be defended by the person whose name is on it.**

**What the replacement had to be, and is.** Five demanding notes in a row is too
many and the reader needs somewhere to rest. So 06 is a situation anyone has been
in — an order arriving as a hurried email — with four actors, one decision per
line, and figures small enough to check on paper. It runs 5,700 words against a
set average of 7,700 and carries complexity 2 where everything else is 4 or 5.
**Keep it short. If it grows, the reason it exists is gone.**

**And it is built on AWS.** Five of five choosing Azure reads as a default
however carefully the prose frames it as a decision. One note picking a
different cloud, for reasons it states, is what makes the others read as a
choice.

### 07 · AI Spare Parts Planning

**Sector: industrial operations. Data: consumption history, lead times,
criticality. Model: statistical forecasting or gradient boosting — no language
model anywhere.**

**Lesson: the decision is the product, not the prediction.** A forecast nobody
acts on is worth exactly zero, and the architecture problem is the override
loop rather than the model.

Spares make the point cleanly because the decision is discrete and expensive:
stock this €200,000 long-lead item or do not. Two threads carry the note.
First, the model is measured on forecast accuracy while the business is
measured on stockouts and working capital, and those move independently — a
forecast that is better on average can be worse commercially if its errors fall
on the critical items. Second, and this is the part rarely written: **planner
overrides are the most valuable data in the system and almost everyone throws
them away.** A reliability engineer who consistently overrides on one machine
knows something the model cannot see, and the architecture should capture that
as a signal rather than treat it as non-compliance to be trained out.

**Failure mode to avoid:** a survey of forecasting methods. Nobody needs
another comparison of exponential smoothing against gradient boosting. The
subject is what happens between the forecast and the purchase requisition.

**Adjacency to watch.** Keep 07 firmly about a batch decision a human overrides
and about the override as a signal, rather than about how the resulting
requisition reaches a system. The clean division is that 07 is about making a
decision, not about applying one.

**Why it displaced the platform note:** the platform case was the hotter topic
and would have been the weaker note — no scenario, no sponsor, no numbers, an
internal engineering team as its customer, and structurally unlike the other
nine. This fills time series, batch processing and a second note with no
language model at once, and has a real business decision in it.

### 08 · Fatigue Risk and Fitness for Duty

**Sector: energy or heavy industry, safety-critical operations. Data:
physiological and health indicators, shift and rotation history. Model:
classification over structured signals; a language model has no role.**

**Lesson: a regulated decision about a person, where compliance is architecture
rather than paperwork — and where the safety case and the privacy case point in
opposite directions.**

The decision is whether an individual is fit to take a shift on a
safety-critical operation.

**The regulatory position, verified rather than assumed.** Annex III point 4(b)
covers AI systems used "to allocate tasks based on individual behaviour or
personal traits or characteristics or to monitor and evaluate the performance
and behaviour of persons" in a work relationship. A fitness-for-duty system
deciding shift assignment from physiological state is caught on both limbs, so
the high-risk obligations apply: logging, human oversight that is real rather
than nominal, transparency to the worker, technical documentation, bias
monitoring.

Four threads make it worth writing, and the second one is the reason this
scenario is better than the consumer-credit one it replaced.

The first is the genuine conflict. You monitor fatigue because a tired crane
operator can kill someone. The same monitoring is surveillance of an
individual's physiological state, held by their employer. Both positions are
correct and neither can be designed away, which is different from every other
note here — case 04 resolved a similar tension by removing the capability, and
this one cannot, because individual assessment *is* the product.

**The second is the strongest material in the whole planned set, and it is a
line the design has to sit exactly on.** Article 5(1)(f) prohibits AI that
infers emotions in the workplace. Recital 18 then excludes physical states from
that definition in as many words — "It does not include physical states, such
as pain or fatigue" — and names the exact scenario as its example: "systems
used in detecting the state of fatigue of professional pilots or drivers for
the purpose of preventing accidents."

So fatigue detection is lawful, and it is lawful because of a distinction that
is legal rather than technical. Future of Privacy Forum's analysis puts it
well: there is "a thin line between emotions, other readily apparent
expressions, and pain or fatigue, which also result in expressions that can be
mistaken for emotions". And the safety exception does not stretch — it covers
protecting life and health, and explicitly not general wellbeing monitoring
such as stress or burnout detection.

Which produces the constraint the note should be built around: **the model may
infer physical state and may not infer emotional state, and the boundary is a
legal one drawn through a technically continuous space.** Same camera, same
face, same features. Eyelid closure and head pose to detect drowsiness is
permitted; adding an inference that somebody looks agitated builds a prohibited
system in a workplace. Feature selection and model scope stop being product
decisions and become the compliance boundary — which is a far more concrete
demonstration of "compliance as architecture" than any documentation
obligation.

The third is Article 10(5), which permits processing special category data —
health among them — for bias detection and correction, under six simultaneous
conditions. One requires deletion once the bias has been corrected. **The
measurement needed to prove the system fair is the measurement you are least
permitted to keep**, so continuous monitoring has no clean legal shape. The
resolutions are all uncomfortable: retained aggregates rather than records,
periodic re-collection campaigns each needing fresh justification, a separately
governed measurement enclave with its own retention clock, or point-in-time
audits instead of monitoring.

The fourth is that Article 10(5) may not work at all. Scholarship in
*International Data Privacy Law* argues it is a "legal illusion": GDPR requires
both an Article 6 basis and an Article 9 exception, and Article 10(5) says
providers "may process" without clearly establishing the latter. A design can
satisfy the AI Act and still breach the GDPR, and nobody gets to wait for that
to be resolved.

**The timing asymmetry, which is the practical takeaway.** Article 5
prohibitions have applied since early 2025. The Digital Omnibus on AI, approved
by the Council on 29 June 2026, defers standalone Annex III high-risk
obligations to 2 December 2027 and embedded ones to 2 August 2028.

So the line you must not cross binds today, while the obligations that shape
how you build it do not yet. For an architect that inverts the usual priority:
right now it matters more not to build a prohibited system than to build a
fully compliant one.

**Verify before publishing, both of them.** The deferral dates are recent —
check the Official Journal. And confirm the Article 5 application date has not
itself moved, since the omnibus touched prohibitions too and that was not
checked. The Recital 18 boundary will not move; it is a definition rather than
a date.

**Then write them down and let them age.** This note should be explicitly dated
— "as at July 2026", with the position stated at the precision available — and
should not be hedged into something that survives every future amendment. It is
a record of how a design decision was made under the conditions of a particular
month, and that is the durable part. When the dates move again, leave it alone;
a superseded fact tells the reader something about the fact.

The distinction that keeps it useful: date the facts, build on the reasoning.
The lesson is how a prohibition drawn through a continuous feature space
changes what a model may be allowed to infer. The deferral dates are context
that makes the decision legible, not the thing being argued.

**Failure mode to avoid:** a compliance checklist, or a surveillance polemic.
The note has to show the regulation changing the architecture, and it has to
take the safety argument as seriously as the privacy one.

**Why not consumer credit:** the lesson is identical and the domain is not
defensible by this author. That is a legitimate reason to move a case and a
poor reason to abandon a lesson.

### 09 · Edge Vision for Asset Integrity

**Sector: energy — remote or unmanned assets. Data: images, including thermal
and optical gas imaging. Model: computer vision — no language model.
Deployment: on the asset.**

**Lesson: inference where you cannot watch it.** The model runs on a remote
installation with an intermittent link, on hardware specified years ago,
looking for corrosion, leaks or damage.

The material: what drift means when you cannot observe it — nobody tells you
the model missed a corrosion patch until a physical inspection finds it, if it
ever does — so the architecture needs a sampling regime that costs inspection
time and has to be justified to an asset manager. Shipping a model update over
a satellite link without bricking a unit that nobody can reach for six weeks.
Keeping enough evidence locally to diagnose a bad month after the fact. And the
asymmetry that shapes the thresholds: a false positive costs a callout, a false
negative is an environmental or safety event.

**Failure mode to avoid:** drifting into anomaly-detection theory, or becoming
a note about drones. The subject is the deployment boundary.

**Portfolio role:** the only note with no language model anywhere, the only one
where the constraint is physical, and the one that proves the rest of the set
is a set of choices rather than a habit. Worth writing early for that reason.

### 10 · AI-Assisted Legacy Modernisation

**Sector: energy — production accounting or hydrocarbon allocation. Data:
source code. Model: a language model over code.**

**Lesson: verifying output against a running system.** Every other note is
judged by a person reading the result. Here a ground truth exists — the
existing system — and the only acceptable standard is that the new behaviour
matches the old, bugs included, because two decades of process have been built
around them.

Production accounting is the right setting: allocation rules accumulated over
decades, encoded by people who have retired, reconciled monthly against figures
that partners and regulators both rely on. The rules are undocumented, the code
is the specification, and no one alive can state what it does in full.

The material: recovering business rules from code nobody wrote recently,
differential testing against replayed production periods, deciding which
divergences are defects and which are fixes — and what to do when a partner has
been invoiced for years on the basis of one of the defects.

**Failure mode to avoid:** a post about code generation quality. The subject is
the verification harness; generation is the easy half.

### The coverage this produces

| # | Sector | Data | Language model | Latency |
|---|--------|------|----------------|---------|
| 01 | Healthcare | Conversational text | Central | Seconds |
| 02 | Payments | Streaming transactions | Excluded from the decision | 40 ms |
| 03 | Legal · procurement | Documents | Central | Batch |
| 04 | Professional services | Audio | Central | Asynchronous |
| 05 | Energy | Documents, tables, drawings | Thin layer | Seconds |
| 06 | Wholesale distribution | Inbound email and attachments | Central, reading only | Within the morning |
| 07 | Industrial — spares | Consumption time series | None | Batch |
| 08 | Heavy industry — workforce | Physiological and shift data | None | Shift boundary |
| 09 | Energy — asset integrity | Images | None | Edge, intermittent |
| 10 | Energy — production accounting | Source code | Central | Batch |

Ten data types, ten problems, and four notes where no language model does the
work. If a future note cannot add a new row to that table, it is probably not
worth writing.

## Sequencing

Ordered so that adjacent notes contrast rather than reinforce:

```
01 conversational, human in the loop      06 email intake, the light one, AWS
02 real-time, no human at all             07 batch forecast, decision is the product
03 documents, provenance                  08 regulated decision about a person
04 speech, attribution                    09 edge, physical constraint, no LLM
05 retrieval, permissions                 10 code, verification against truth
```

A reader arriving at any note and moving to the next should meet a different
kind of problem, not the same problem in another setting.

That test now carries more weight than it did, because five of the ten share a
sector. Contrast has to come from the problem rather than from the industry
label, and where it does not, the note is redundant however different its
scenario looks.

---

## Writing order

Not the same as reading order. **06 is written. Next up: 09.** Then 08, 10, 07.

1. **09** — write it next rather than last. It is the only note with no
   language model anywhere, and publishing it early is what stops the set
   reading as a generative-AI portfolio while four notes are still missing.
   With five published notes all leaning on a language model somewhere, the set
   currently reads as a generative-AI portfolio, and 09 is the correction.
2. **08** — the strongest unwritten material of the four, and the one whose
   supporting facts move. Write it while the Article 10(5) position is live;
   re-verify the deferral dates immediately before publishing.
3. **10** — the most distinctive, and the one least likely to already exist
   elsewhere in any depth. It also needs the least external verification, which
   makes it a good note to write when time is short.
4. **07** — last, because its value depends least on being early.

---

## The blog beside the notes

Nine posts, all written, no placeholders — around 14,000 words. Each is drawn
from a case note rather than invented separately: a post is the one argument
from a note that stands on its own, which keeps the two consistent and halves
the work.

Each new case note should therefore yield one post, and the strongest candidate
is usually the thing the note argues against rather than for.

No note currently owes one. The ones waiting in the planned five: why planner
overrides are data rather than disobedience (07), how to monitor for bias in an
attribute you may not collect (08), and what drift means when nobody will ever
tell you that you were wrong (09).

Do not add a title without a body. A queue of announced-and-unwritten posts
costs more credibility than an empty blog does.
