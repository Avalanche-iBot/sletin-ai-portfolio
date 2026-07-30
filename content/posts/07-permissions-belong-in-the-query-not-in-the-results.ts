import type { BlogPost } from "../types";

/** Drawn from the permissioned retrieval design in the knowledge assistant note. */
const post: BlogPost = {
  slug: "permissions-belong-in-the-query-not-in-the-results",
  title: "Permissions belong in the query, not in the results",
  excerpt:
    "Filtering retrieved documents after the fact feels safe and is not. It leaks through ranking, through summaries, and through the simple fact that a result is missing — and two of those leaks are invisible in testing.",
  date: "2026-07-30",
  readingTime: "6 min",
  tags: ["RAG", "Retrieval", "Access control", "Security"],
  category: "RAG",
  featured: false,
  body: [
    {
      paragraphs: [
        "The convenient way to add access control to a retrieval system is to put it at the end. Retrieve the best matches, check what the user is entitled to see, drop the rest, answer from what survives. It is a small change, it does not touch the index, it can be added to a working system in an afternoon, and it is obviously correct.",
        "It is not obviously correct. It leaks in three ways, and two of them will not show up in any test you are likely to write.",
      ],
    },
    {
      heading: "One: absence is information",
      paragraphs: [
        "If a query returns four results where it should have returned six, the user has learned that two documents exist which they are not permitted to read. On a general corpus that is trivia. On a corpus partitioned by client, by joint venture or by legal matter, it is precisely what the partition exists to prevent — the existence of a document about a named counterparty is frequently more sensitive than anything inside it.",
        "Ranking makes this worse rather than better. A result that would have been top-ranked and instead vanishes tells the user their query matched something extremely well. Iterate a few times and you can characterise the hidden document without ever seeing it: search for a company name and watch how many results disappear; search for \"termination\" plus that name and watch again.",
        "This is the leak people accept as theoretical. In a professional services firm with ethical walls between matters, or an operator with joint-venture partners whose data is contractually separated, it is not theoretical. It is the thing the contract is about.",
      ],
    },
    {
      heading: "Two: the model already read it",
      paragraphs: [
        "Post-filtering means the restricted passage was retrieved. Whether it also reached the model depends on exactly where in the pipeline the filter sits — and that ordering is far easier to get wrong than it sounds.",
        "A retrieval pipeline is rarely one step. There is initial retrieval, often hybrid. There may be a reranking stage that scores candidates with a cross-encoder. There may be query expansion, where an earlier model rewrites the query using retrieved context. There may be a summarisation step that compresses candidates before they reach the answering model, because the context window is finite.",
        "Each of those is a place a restricted passage can be read by something. The permission filter sits at one point in that chain, and every stage before it has seen everything. A cross-encoder that reranked a restricted document has not leaked it — but a query-expansion step that rewrote the user's question using terms from that document absolutely has, in a way that is invisible in the final answer and completely undetectable afterwards.",
        "This ordering usually degrades over time rather than being wrong at the start. Someone adds reranking for quality in month four, and places it where it is most convenient. Nobody re-examines where the permission filter sits, because the filter still exists and the tests still pass.",
      ],
    },
    {
      heading: "Three: the numbers leak",
      paragraphs: [
        "Result counts, relevance scores, latency differences, and the distinction between \"no results found\" and \"nothing you are permitted to see\". Each of these distinguishes an empty corpus from a restricted one.",
        "Enough queries and the boundary becomes mappable without a single document being returned. This is the same class of problem as a login form that says \"no such user\" for one case and \"wrong password\" for the other, and it has the same fix: the observable behaviour must be identical regardless of which side of the boundary the answer is on.",
      ],
    },
    {
      heading: "The alternative",
      paragraphs: [
        "Make the permission part of the query. Tag each chunk at ingestion with the entitlements that govern it, and filter inside the search rather than after it, so a restricted document is never a candidate at any stage. The user's entitlements are resolved per request and become a predicate the index evaluates alongside the similarity search.",
        "Every modern vector store supports metadata filtering that can do this. The difficulty is not the query — it is everything around it, and it is worth naming the three hard parts rather than pretending the approach is free.",
      ],
      bullets: [
        "Ingestion has to carry permissions through. The source system must expose them in a form you can evaluate, per document, at the granularity you actually need. If it only offers a nightly export, you have a staleness window — and the honest response is to state its size rather than to hope.",
        "Entitlement changes have to reach the index. Someone loses access on Monday; if the index learns on Friday, you had a four-day leak that no test will find. Reindexing on access-control change is an event-driven requirement, not a scheduled job.",
        "Ranking quality changes once the candidate pool is filtered. Retrieval has to be evaluated per permission profile rather than once globally, because a user with narrow entitlements is searching a different corpus and may get materially worse results.",
      ],
    },
    {
      heading: "Two different problems that get conflated",
      paragraphs: [
        "Worth separating, because they have different answers and teams routinely solve one and assume they have solved both.",
        "Multi-tenancy is a hard boundary: tenant A must never see tenant B's data under any circumstances, and the safest implementation is usually physical — a separate index per tenant. It is more infrastructure and it makes the guarantee structural rather than logical, which is exactly what you want when the failure is a contractual breach.",
        "Intra-tenant permissions are a soft boundary within one organisation, where entitlements are many, overlapping and change constantly. A separate index per permission combination is combinatorially absurd, so this genuinely requires filtering at query time.",
        "Most systems need both, and using the second mechanism for the first is the mistake — a metadata filter is a correct implementation until somebody writes a query builder that forgets it.",
      ],
    },
    {
      heading: "Test it like an adversary, and let it break the build",
      paragraphs: [
        "The test that matters is not \"can an authorised user find the document\". That is the test everyone writes, and it passes under every broken design described above.",
        "The test that matters is whether an unauthorised user can detect that the document exists — by result count, by score distribution, by latency, or by an answer that is subtly better informed than it should be.",
      ],
      bullets: [
        "Seed a fixture document containing a distinctive token that appears nowhere else. Query for it as an unauthorised user and assert the token never appears in any output, including the generated answer.",
        "Assert result counts are identical between a user with entitlements and one without, for a query that would match a restricted document.",
        "Assert that adding a restricted document to the corpus does not change any observable for an unauthorised user — count, scores, ordering of what they do see.",
        "Run these per permission boundary that matters commercially, not once in aggregate.",
      ],
    },
    {
      paragraphs: [
        "Make them a build blocker rather than a report. A permission regression is not a defect to be prioritised in the next sprint; in a partitioned corpus it is a contractual breach, and it should stop a release exactly the way a failing type check does. That is a decision about what your pipeline treats as fatal, and it is the cheapest part of all of this.",
      ],
    },
  ],
};

export default post;
