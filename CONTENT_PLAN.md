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
*Executive AI Dashboard*. Three of those would have collapsed into lessons
already owned: invoice processing is document extraction with a different noun
(case 03), an executive dashboard has no architectural problem in it at all,
and supply-chain optimisation reduces to a forecasting pipeline whose real
difficulty is organisational rather than architectural.

Each entry below states the lesson, the tension that carries it, and the
specific way it could go wrong.

### 06 · Agentic Order-to-Cash Operations

**Lesson: reversibility.** Every published note has the system produce an
answer. This one has it *act* — amending orders, releasing credit holds,
posting documents into systems of record. The architecture question is not
accuracy but what happens halfway through a chain of writes that cannot all
succeed.

The material: idempotency keys, compensating transactions, which steps are
allowed to be automatic and which need a human gate, and how you reason about a
sequence that is 60% applied when something fails. The honest verdict is
probably that the interesting work is transactional design, and the model is
the least difficult part.

**Failure mode to avoid:** turning into an invoice-extraction note. The moment
the emphasis is on reading documents, this is case 03 again. The writes are the
subject.

**Why it matters commercially:** this is the thing every enterprise is trying to
buy in 2026 and almost nobody has put into production safely.

### 07 · Enterprise AI Platform

**Lesson: the customer is internal.** The only note about infrastructure rather
than an application — the answer to "we have thirty pilots and nothing in
production, and no idea what we are spending."

The material: a gateway, tenancy and quota between teams, cost attribution back
to the department that caused it, a prompt and model registry, evaluation
offered as a shared service, guardrails as infrastructure rather than as
something each team reimplements, and migrating models underneath applications
that assumed one would last forever.

**Failure mode to avoid:** becoming a tour of a vendor's product page. The
architectural content is tenancy, chargeback and the migration path — not a
feature list.

**Placement note:** it abstracts over the other nine, so it reads best once
several application notes exist to point at. Written earlier it would be theory.

### 08 · AI Recruitment Under the EU AI Act

**Lesson: a regulated decision about a person.** Employment selection is named
high-risk in the Act's own annex, which turns compliance from a review at the
end into a set of architectural requirements at the start: logging, human
oversight that is real rather than nominal, transparency to the candidate,
technical documentation, and bias monitoring across protected groups.

The material: what "meaningful human oversight" has to mean in a system that
processes thousands of applications, and why the defensible design probably
uses no model for the ranking at all — only for the parts that are not the
decision.

**Failure mode to avoid:** a compliance checklist. The note has to show the
regulation changing the architecture, not sitting beside it.

**Why it matters:** it is the clearest case in the set where the right answer
may be "do less with AI than you were asked to", argued rather than asserted.

### 09 · Edge Inference for Industrial Inspection

**Lesson: inference where you cannot watch it.** The model runs on a production
line with no reliable link back, on hardware chosen years ago, at a rate set by
the conveyor and not by you.

The material: what drift means when you cannot observe it, shipping a model
update over an intermittent connection without bricking a line, keeping enough
evidence locally to diagnose a bad shift afterwards, and the fact that the
inspection is worthless unless it is faster than the line.

**Failure mode to avoid:** drifting into anomaly-detection theory. The whole
point is the deployment boundary, not the model.

**Portfolio balance:** the only note with no language model anywhere in it, and
the only one where the constraint is physical.

### 10 · AI-Assisted Legacy Modernisation

**Lesson: verifying output against a running system.** Every other note is
judged by a human reading the result. Here there is a ground truth — the
existing system — and the only acceptable standard is that the new behaviour
matches the old one, including the bugs people have built processes around.

The material: recovering undocumented business rules from code nobody wrote
recently, differential testing against production traffic, deciding which
divergences are defects and which are fixes, and why "an experienced developer
read it and it looks right" is not a verification strategy at this volume.

**Failure mode to avoid:** a post about code generation quality. The subject is
the verification harness; the generation is the easy half.

**Why it matters:** nearly every large organisation has this problem and a
budget for it, and almost nobody writes about the part that actually decides
whether it works.

---

## Sequencing

Ordered so that adjacent notes contrast rather than reinforce:

```
01 conversational, human in the loop      06 agentic, acts on systems of record
02 real-time, no human at all             07 infrastructure, internal customer
03 documents, provenance                  08 regulated decision about a person
04 speech, attribution                    09 edge, physical constraint, no LLM
05 retrieval, permissions                 10 code, verification against truth
```

A reader arriving at any note and moving to the next should meet a different
kind of problem, not the same problem in another industry.

---

## Writing order

Not the same as reading order. Suggested:

1. **06** — the highest-demand topic in the set, and the furthest from anything
   already published.
2. **10** — the most distinctive, and the one least likely to already exist
   elsewhere in any depth.
3. **08** — timely while the Act's obligations are still being worked out in
   practice, and the strongest "do less" argument in the set.
4. **09** — the balance case; write it when the set starts looking too
   language-model-shaped.
5. **07** — last, once there are enough application notes for a platform note
   to have something concrete to abstract over.

---

## The blog beside the notes

Six posts are listed and **none is written** — every one renders the "not yet
published" placeholder, which is honest but is six promises outstanding.

The first, *The model that decides is not the model that explains*, is drawn
from case 02's verdict and is written. The rest should each come out of a case
note rather than being invented separately: a post is the one argument from a
note that stands on its own, and writing it that way keeps the two consistent
and halves the work.

Before adding a seventh title, write one of the five outstanding. A queue of
announced-but-unwritten posts costs more credibility than an empty blog does.
