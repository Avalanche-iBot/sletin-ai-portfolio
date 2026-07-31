# Roadmap to launch — 1 January 2027

The site goes live when the Azure certifications are held and the six published
notes can be defended in conversation. This file is the plan for getting there.
`CONTENT_PLAN.md` says what to write; this says in what order, by when, and what
"ready" means.

Written 30 July 2026. Five months to launch.

---

## The one rule this plan is built on

**Nothing goes on the site as held until it is held.** Microsoft publishes a
verification page for every certification, and a recruiter opens it in ten
seconds. One unverifiable badge does not cost one badge — it costs the other
four, the PMP, and the credibility of six case notes that spend most of their
length being scrupulous about what is assumed and what is measured.

There is also no need. The site does not deploy until the certifications are
real. So the section is built now with an honest status, each entry flips from
*in preparation* to *held* with its date and verification link as it lands, and
on 1 January the page is true without a word having been invented.

The same rule governs the second half of the plan. **A note stays published only
if its author can defend every number in it.** That test already withdrew one
case note in this repository. Applying it to the five that remain is the largest
piece of work below, and it matters more than writing new ones.

---

## Workstream A — certifications

**Settled: two exams, not five.** The Azure Fundamentals, Data Fundamentals, AI
Fundamentals and AI Apps and Agents Developer Associate exams that an earlier
version of this plan carried are dropped. The path is now:

| # | Certification | Notes |
|---|---------------|-------|
| 1 | Azure Administrator Associate (AZ-104) | Prerequisite for the second exam — not an independent goal |
| 2 | Azure Solutions Architect Expert (AZ-305) | Requires AZ-104 first; this was the open question in the first draft of this file, and it is now resolved by including it rather than by finding out it was optional |

Both are shown on the About page already, in progress, with a placeholder
credential ID that gets replaced the day each is passed.

**Only these two go on the site.** AZ-104 and AZ-305 are general Azure
architecture — compute, storage, networking, identity, governance,
resiliency, cost — and neither touches Azure OpenAI, AI Search, Document
Intelligence, Content Safety or Speech, which is the surface cases 01, 03, 04
and 05 design against. That material is still being studied — see Workstream
B — it is simply not sat as an exam or shown as a credential. Two badges
rather than five, and the reading behind the case notes is broader than the
badges on the page.

Rough shape:

- **August–October** — AZ-104. It is the meatier of the two administrator-tier
  exams and worth the longer runway alongside the defence-sheet work in
  Workstream B.
- **November–December** — AZ-305, once AZ-104 is held.

### What the site needed for this — done

1. ~~Move certifications up the About page.~~ Done: they sit in the opening
   section now, beside the prose, not fourth after Approach.
2. ~~Extend the schema.~~ Done: `Credential` carries issuer, issue date, expiry
   where one exists, and a credential ID, plus optional `verifyUrl` and
   `badge`.
3. **Still open: badge images.** Save under `public/badges/`, downloaded rather
   than hotlinked — hotlinking the issuer means the page depends on their
   uptime and tells them who is reading the site.
4. ~~Keep the certification writing honest rather than promotional.~~ Done, and
   taken further than planned: the per-certification paragraphs were cut
   entirely rather than kept. A credential in a sidebar block states what it
   is; it does not need three sentences arguing for itself.

### The rest of About — done

The page carried five sections and about twenty-five list items. It is now
two: an opening with education and certifications beside it, and one merged
set of principles. Strengths and working style were cut rather than merged,
on the grounds that a list of adjectives about the author is the wrong
argument for this site to make — the case notes make it or nothing does.

## Workstream B — being able to defend the notes

This is the important one, and it is worth being blunt about why. The author's
own assessment is that the six published notes are not currently understood
well enough to be defended in an interview. That is the same fault that
withdrew the first case 06 — and it is worse when the note is published,
because a note nobody can defend is a liability that looks like an asset.

**So this outranks writing new notes.** Four more notes that cannot be
defended makes the problem four notes bigger.

### The method

For each published note, produce a **defence sheet**: every number and every
technical claim in it, with a two-sentence answer to "where does that come
from and what happens if it is wrong". Not for publication — for the author.

Then sort each line into one of three piles:

- **Can defend.** Move on.
- **Can learn.** Put it on the study list.
- **Cannot defend and cannot cheaply learn.** Change the note. Either simplify
  the claim until it is defensible, or cut it. A note is allowed to say less.

### What the two exams cover, and what has to be studied separately

AZ-104 and AZ-305 are general architecture — identity, networking, cost
governance, resiliency — which is useful across every note's security,
scalability and cost sections, and directly useful for case 02's on-prem/cloud
split. Neither is the service surface that cases 01, 03, 04 and 05 actually
design against.

That surface is studied on its own, through Microsoft Learn's free modules for
Azure OpenAI, AI Search, Document Intelligence, Content Safety and Speech —
material rather than an exam, since none of those sit on the site as
credentials. This is the reading that turns into the defence sheets below, not
a side effect of preparing for AZ-104 or AZ-305.

Per note:

- **Case 02** — PSD2 exemption bands, gradient-boosted models, feature stores,
  false-decline economics. No Azure material covers any of it; this is
  independent reading, and the RTS bands are a short document. The economics
  are this author's strongest ground already.
- **Cases 01, 03, 05** — Azure OpenAI, AI Search, Document Intelligence,
  Content Safety, via Microsoft Learn's free modules rather than an exam.
- **Case 04** — Speech, plus the data-retention argument, which is closer to
  case reasoning than to a service and is mostly already solid.
- **Case 06** — deliberately small and defensible now, which is what it was
  written for. Confirm rather than assume.

### Order of work

1. Case 02 first. It has the most independent reading and no certification
   overlap at all.
2. Then 01, since it is the flagship and the voice reference.
3. Then 03, 04, 05, working through the free Azure AI service modules as the
   common thread across them.
4. Case 06 last and briefly.

## Workstream C — the remaining notes

The queue stands at **09 → 08 → 10 → 07** and the reasoning is in
`CONTENT_PLAN.md`.

**Recommendation: write one, not four, before launch.** 09 — Edge Vision for
Asset Integrity — for the reason already recorded: it is the only note with no
language model anywhere, and publishing it is what stops the set reading as a
generative-AI portfolio. Seven of ten written is an honest number and the
portfolio index displays it as one.

Writing all four would mean four more notes to defend in the same five months
that are already carrying two certifications and a defence audit of six. That
is how the second case 06 happens.

**Before starting 08, re-verify its two regulatory dates.** They moved once
during drafting and the note is built on them.

---

## Workstream D — launch readiness

Small, and none of it can be done before there is a live site — which is exactly
why it needs to be on a list rather than remembered.

- **DNS and deployment.** The domain does not currently resolve.
- **Link-preview images.** They run on the edge runtime and fetch fonts at
  request time, and have never run outside a local machine. First real test is
  the first deploy.
- **Structured data.** Correct and inert. Run it through Google's tester once
  the site answers.
- **The `NEXT_PUBLIC_SITE_URL` override** on preview deployments, so a preview
  does not advertise the production domain.
- **A read of the whole site on a phone**, end to end, once. Everything in this
  repository has been checked page by page and never as a visitor.

---

## Iterations

| # | Window | Certifications | Notes and site |
|---|--------|----------------|----------------|
| 1 | August | Start AZ-104 study | Case 02 defence sheet — no certification overlap, so it starts on its own |
| 2 | September | AZ-104 study continues | Case 01 defence sheet; badge images added to About |
| 3 | October | AZ-104 exam | Cases 03 and 05 defence sheets, alongside the free Azure AI service modules |
| 4 | November | AZ-305 study | Case 04 defence sheet; write note 09 |
| 5 | December | AZ-305 exam | Case 06 confirmed; launch readiness; whole-site read; deploy |

**The first iteration is the one to start today.** Unlike the first draft of
this file, there is no longer an open question gating the schedule — AZ-104
before AZ-305 is the plan, not an assumption to verify.

---

## What "ready to launch" means

Both certifications held and verifiable. Every number in every published
note defensible in two sentences — including the Azure AI service claims that
neither exam teaches, learned separately per Workstream B. Seven notes
published, three shown as planned. The About page short enough to be read, which
it now is. And one full pass over the live site on a phone, as a stranger.

Not "perfect". The site's whole position is that reasoning is provisional and
gets argued with in public — waiting for perfect would contradict it. Ready
means nothing on it is a claim its author cannot stand behind.
