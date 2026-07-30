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

The sequence, as chosen:

| # | Certification | Notes |
|---|---------------|-------|
| 1 | Azure Fundamentals (AZ-900) | Entry level, no prerequisite |
| 2 | Azure Data Fundamentals (DP-900) | Entry level |
| 3 | Azure AI Fundamentals (AI-900) | Entry level |
| 4 | Azure AI Apps and Agents Developer Associate | The associate tier — the one closest to what the notes actually design |
| 5 | Azure Solutions Architect Expert | The expert tier |

**Two things to verify on Microsoft Learn before booking anything, because both
change the schedule.**

- **The expert track has historically required an administrator-level
  certification alongside the architecture exam.** If that still holds, the list
  above is five exams and the reality is six, and the extra one is not small.
  Check this first — it is the difference between a comfortable December and an
  impossible one.
- **The associate exam's code and syllabus.** This track was renamed recently
  and the exam number quoted anywhere older than this year may not exist. Take
  the objective domains from Microsoft Learn directly rather than from a study
  guide.

Rough shape, assuming no prerequisite surprise:

- **August** — AZ-900, then DP-900. Two to three weeks each, and the two
  overlap more than the titles suggest.
- **September** — AI-900, then start the associate material.
- **October** — the associate exam. This is the one that takes real time, and it
  is the one that pays back most into the case notes.
- **November–December** — the expert exam, plus the administrator one if it is
  required.

**Do not compress this by skipping the fundamentals.** They are cheap, they are
quick, and three verifiable entries in August is what makes the About page stop
being a promise in the month it matters.

### What the site needs for this

1. **Move certifications up the About page.** They currently sit fourth, after
   Approach. They go second, directly under the opening — that is where a reader
   deciding whether to take the rest seriously will look.
2. **Extend the schema.** Each entry needs a status (*held* or *in
   preparation*), the date it was earned, and the verification URL. The
   verification link is the whole point: it is what turns a claim into a fact,
   and it is the reason none of this needs to be exaggerated.
3. **Badge images, downloaded rather than hotlinked.** Save them under
   `public/badges/`. Hotlinking the issuer means the page depends on a third
   party staying up and tells that third party who is reading the site.
4. **Keep the `mindset` writing.** The current section is good precisely because
   it says what each qualification changed about how the author works rather
   than displaying a badge. Badges go beside that, not instead of it.

### And cut the rest of About while you are in there

The page carries five sections and about twenty-five list items — three
paragraphs, five background lines, three certifications, five approach steps,
six strengths, six principles and five working-style notes. It is more than
anyone reads, and the certifications are competing with all of it.

- **Merge Strengths into Approach**, or cut Strengths entirely. They overlap;
  "make-vs-buy judgement" appears in both in different words.
- **Cut Principles from six to four.** Two of them restate the approach steps.
- **Keep Working style short.** The line about the diagram checker earns its
  place because the repository can substantiate it; the rest is softer.

Target: three sections, roughly fifteen items, certifications second.

---

## Workstream B — being able to defend the notes

This is the important one, and it is worth being blunt about why. The author's
own assessment is that the six published notes are not currently understood well
enough to be defended in an interview. That is the same fault that withdrew the
first case 06 — and it is worse when the note is published, because a note
nobody can defend is a liability that looks like an asset.

**So this outranks writing new notes.** Four more notes that cannot be defended
makes the problem four notes bigger.

### The method

For each published note, produce a **defence sheet**: every number and every
technical claim in it, with a two-sentence answer to "where does that come from
and what happens if it is wrong". Not for publication — for the author.

Then sort each line into one of three piles:

- **Can defend.** Move on.
- **Can learn.** Put it on the study list. Most of these will be covered by the
  certification work anyway.
- **Cannot defend and cannot cheaply learn.** Change the note. Either simplify
  the claim until it is defensible, or cut it. A note is allowed to say less.

### What the certifications already cover

Much of this work happens twice if it is planned separately, so it should not
be:

- **Cases 01, 03, 05** lean on Azure OpenAI, AI Search, Document Intelligence
  and Content Safety. That is the associate syllabus almost exactly. Studying
  for it *is* the defence work for three notes.
- **Case 05's** retrieval and identity design maps onto the architecture exam.
- **Case 04** is Speech plus a data-retention argument, mostly covered.
- **Case 06** is deliberately small and is defensible now, which is what it was
  written for.

**Case 02 is the exception and needs separate reading.** No Azure exam covers
PSD2 exemptions, gradient-boosted models, feature stores or false-decline
economics. It is also the note the portfolio index currently points a first-time
reader at. Two options, and the choice should be made deliberately rather than
by default:

- Learn it properly — the RTS bands are a short read, the ML is a fortnight, and
  the economics are already this author's strongest ground.
- Or move `startHereSlug` to a note that is defensible today, and move it back
  later.

### Order of work

1. Case 02 first, because it is the front door.
2. Then 01, since it is the flagship and the voice reference.
3. Then 03, 04, 05 as the certification study covers them.
4. Case 06 last and briefly — it was built to be defensible.

---

## Workstream C — the remaining notes

The queue stands at **09 → 08 → 10 → 07** and the reasoning is in
`CONTENT_PLAN.md`.

**Recommendation: write one, not four, before launch.** 09 — Edge Vision for
Asset Integrity — for the reason already recorded: it is the only note with no
language model anywhere, and publishing it is what stops the set reading as a
generative-AI portfolio. Seven of ten written is an honest number and the
portfolio index displays it as one.

Writing all four would mean four more notes to defend in the same five months
that are already carrying five certifications and a defence audit of six. That
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
| 1 | Aug, first half | Verify prerequisites, book AZ-900 | About restructure: certifications second, schema extended, page cut to three sections |
| 2 | Aug, second half | AZ-900, then DP-900 | Case 02 defence sheet — the front door first |
| 3 | September | AI-900, start associate | Case 01 defence sheet; fixes to both notes where a claim cannot be held |
| 4 | October | Associate exam | Cases 03, 04, 05 defence sheets, which the associate study largely writes |
| 5 | November | Expert exam study | Write note 09 |
| 6 | December | Expert exam | Launch readiness, whole-site read, deploy |

**The first iteration is the one to start today**, and the first task in it is
checking whether the expert track needs an administrator certification. Every
other date on this page depends on that answer.

---

## What "ready to launch" means

All five certifications held and verifiable. Every number in every published
note defensible in two sentences. Seven notes published, three shown as planned.
The About page short enough to be read. And one full pass over the live site on
a phone, as a stranger.

Not "perfect". The site's whole position is that reasoning is provisional and
gets argued with in public — waiting for perfect would contradict it. Ready
means nothing on it is a claim its author cannot stand behind.
