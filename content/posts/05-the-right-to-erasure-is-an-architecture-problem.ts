import type { BlogPost } from "../types";

/** Drawn from the GDPR controls in the patient communication note. */
const post: BlogPost = {
  slug: "the-right-to-erasure-is-an-architecture-problem",
  title: "The right to erasure is an architecture problem",
  excerpt:
    "Deleting the record is the easy part. What defeats most erasure requests is everything derived from it — embeddings, prompt logs, cache keys, search indexes, evaluation sets — none of which looks like personal data until you consider what it was made from.",
  date: "2026-07-30",
  readingTime: "9 min",
  tags: ["GDPR", "RAG", "Data protection", "Retrieval"],
  category: "Governance",
  featured: true,
  body: [
    {
      paragraphs: [
        "Erasure is usually treated as a database operation. Someone exercises their rights, an identifier is resolved, rows are deleted, a confirmation is sent. In a conventional application that is broadly the whole job.",
        "In a system built around retrieval and generation, the row is the smallest part of the problem. Almost everything difficult is derived from it, and derived data does not announce that it is personal.",
        "I am not a lawyer and none of this is legal advice. What follows is what changes in the architecture once a data protection officer takes a position — which is the part that lands on an architect, usually late, usually as a surprise.",
      ],
    },
    {
      heading: "Follow one sentence through the system",
      paragraphs: [
        "It is easier to see with something concrete. Suppose a patient sends a message describing a symptom. Trace every place that sentence ends up.",
        "It is stored as a conversation record — the obvious copy, the one everybody deletes. It is chunked and embedded, so a vector derived from it lands in a search index, and that index probably replicates. The chunk text is almost certainly stored alongside the vector, because retrieval needs something to return.",
        "The message goes into a prompt. If prompts are logged — and they are, for debugging and evaluation — it now exists in an observability store with its own retention policy, typically a longer and more generous one set by whoever configured the platform. The model's completion, which may restate the symptom in its own words, is logged beside it.",
        "A normalised form of the question becomes a cache key, with the answer attached. An extract may have been sampled into an evaluation set, because someone needed realistic test cases and production data was the obvious source. An aggregate reaches an analytics warehouse. Backups of several of those systems exist on their own schedules, in their own regions.",
        "Delete the conversation record and most of that survives, indefinitely, in places nobody thought of as containing patient data.",
      ],
    },
    {
      heading: "The embedding is the interesting one",
      paragraphs: [
        "It is tempting to treat a vector as safely abstract — a list of floating point numbers with no readable content, a kind of one-way hash of meaning. That intuition does not survive examination.",
        "An embedding is a derived representation of specific personal text. It is retrievable by similarity, which means it can be used to find that person's content. And work on inverting embeddings back into approximate source text has been consistently more successful than the folk intuition assumes — not perfect reconstruction, but enough to recover the substance of short passages.",
        "Whatever position your data protection officer takes on whether a vector is personal data, the architectural consequence is identical and unavoidable: you need to know which vectors derive from which subject, and you need to be able to remove them individually.",
        "That is a decision made at ingestion, not at request time. A vector store that did not record provenance cannot answer the question later at any price — the mapping simply is not there, and the only remaining options are reindexing the entire corpus or admitting you cannot comply.",
      ],
      bullets: [
        "Tag every chunk with the subject it derives from, at ingestion, before anybody asks.",
        "Assume deletion from the index, not only from the source. Reindexing a whole corpus to honour one request is not an operational answer at any realistic volume.",
        "Do not forget the chunk text stored beside the vector. It is usually the actual exposure, and it is usually overlooked because attention goes to the vector.",
        "Check what your index does on delete. Some stores tombstone rather than remove, and the difference matters when someone asks you to demonstrate erasure.",
      ],
    },
    {
      heading: "Prompt logs are the second trap",
      paragraphs: [
        "Prompt and completion logs are built for debugging, and they inherit the retention policy of debugging telemetry: long, generous, and set by an engineer thinking about incident investigation rather than about personal data.",
        "But a prompt containing a patient's message is that message, sitting in a second system, under a different policy, frequently in a different region and sometimes with a different provider. Everything the residency analysis established about the primary store applies here and is routinely not applied.",
        "The only position that survives review is that prompts, completions and retrieved passages are subject to exactly the same residency, retention and erasure rules as the source record. Stated that way it sounds obvious. It is very often not what is configured.",
        "The design move that pays for itself is redaction before the model call rather than after logging. Strip identifiers on the way in, hold the mapping separately under tighter control, and the logs stop being a liability without losing their debugging value. Doing it the other way round — log everything, redact on the way out — means the unredacted copy existed, and existed is the whole question.",
      ],
    },
    {
      heading: "The one with no clean answer",
      paragraphs: [
        "If personal data reached a model's training set, erasure has no straightforward mechanism. Machine unlearning is an active research area rather than an operational capability, and retraining on request is not a process anyone can run per individual at any sensible cost.",
        "The honest architectural response is to avoid the situation rather than solve it. Do not fine-tune on personal data. Use retrieval instead, where the corpus is a thing you can delete from and the model itself holds no memory of any individual.",
        "That is a real constraint on the design and it deserves to be stated as one. \"We chose retrieval partly because it stays deletable\" is a legitimate architectural reason, and a more durable one than most of the reasons usually given for the same choice.",
      ],
    },
    {
      heading: "Backups, and the thing everyone fudges",
      paragraphs: [
        "This is where honest architecture documents go quiet, so it is worth being direct. Backups contain the deleted data. Immutable backups — which you have for ransomware protection, on advice from the same security function that also cares about data protection — cannot be edited by design.",
        "The generally accepted approach is to treat backups as out of scope for immediate erasure while ensuring the data does not return: record the deletion in a suppression list, apply it on restore, and bound the exposure with a backup retention period short enough to be defensible. Which makes retention policy part of your erasure design rather than a separate operational concern.",
        "The point is not that this is a solved problem. It is that you should have a written position on it before someone asks, because \"we had not considered backups\" is a materially worse answer than \"we suppress on restore and backups age out in ninety days\".",
      ],
    },
    {
      heading: "Deletion is not the only tool",
      paragraphs: [
        "Two cheaper levers often get skipped in the rush to build a deletion pipeline.",
        "The first is retention. Data you no longer hold cannot be erased, and a shorter retention period on conversation logs, prompt logs and caches reduces the size of every erasure problem simultaneously. It is usually the highest-leverage change available and it costs nothing to implement.",
        "The second is genuine anonymisation, where the link to an individual is severed irreversibly rather than merely removed from the obvious place. The bar is higher than teams assume — pseudonymised data with a mapping table somewhere is still personal data — but where it genuinely applies, it takes a dataset out of scope permanently rather than requiring it to be maintained.",
        "Neither replaces a deletion path. Both reduce how much has to flow through it.",
      ],
    },
    {
      heading: "The design rule",
      paragraphs: [
        "Enumerate the derived artefacts at design time, not when the first request arrives. For each one, write down what it is keyed by, how it is removed, and how you would demonstrate that it was. The list is always longer than expected on the first attempt, which is exactly why writing it down is the exercise.",
        "Then key the deletion path to the subject rather than to the record. Erasure applies to a person, not to a row, and a system that can only delete rows will keep discovering new places where the person still exists.",
        "And test it. An erasure path that has never been exercised is a plan, not a capability. Run it in a lower environment against a seeded subject, then search every store for traces — including the vector index by similarity rather than only by identifier, which is the search most likely to find something you forgot.",
      ],
    },
    {
      heading: "The same inventory answers a harder question",
      paragraphs: [
        "Erasure gets the attention because it is dramatic. The request that arrives more often, and that is considerably more awkward to answer badly, is the access request: tell me what you hold about me.",
        "That question is answered from exactly the same inventory. Every derived artefact you enumerated for deletion is an artefact you may have to disclose the existence of — and disclosure has a sharper edge, because a partial answer is verifiable. Someone who knows they contacted you eleven times and receives eight conversations knows you have missed something.",
        "There is a second-order effect worth planning for. An access request tends to surface the copies nobody documented, because answering it requires actually looking. Teams that build the deletion path first and the disclosure path later usually discover, at that point, that the deletion path was incomplete — and discover it in front of the person who asked.",
        "So build the inventory once and let it serve both. The expensive part is knowing where the data is; deleting it and describing it are both cheap once you do.",
      ],
    },
    {
      heading: "What a data protection officer will actually ask",
      paragraphs: [
        "Preparing for these four questions produces most of the design by itself, and each one has an architectural answer rather than a policy one.",
      ],
      bullets: [
        "Where does this personal data exist, in full? Not the systems of record — every derived copy, including ones created by tooling.",
        "How long does each copy live, and who set that period? A different answer per store is a finding.",
        "What happens when the subject asks for erasure, and how do you evidence completion?",
        "What happens to derived artefacts you cannot delete, and what bounds the exposure?",
      ],
    },
    {
      paragraphs: [
        "None of this is expensive when it is designed in. All of it is close to impossible to retrofit — which makes erasure one of the few data protection topics that genuinely belongs in the first architecture conversation rather than the last review before launch.",
      ],
    },
  ],
};

export default post;
