import type { ArchitectureLayer } from "@/content/architecture";

/**
 * Deterministic validation for the architecture builder.
 *
 * Every rule below is a pure function over the current selection. There is no
 * model call anywhere in this file, and that is the point: the interesting
 * claim the builder makes is that most of what an architect checks on a first
 * pass is mechanical. Retrieval without embeddings is broken whoever is asking.
 * A 30-second gateway in front of an agent loop is broken whoever is asking.
 *
 * Rules are stated as "this combination is a problem", not as scores. A score
 * would imply a precision that does not exist here.
 */

export type Selection = Record<string, string[]>;

export type Severity = "error" | "warning" | "info";

export interface Finding {
  id: string;
  severity: Severity;
  message: string;
}

interface Rule {
  id: string;
  severity: Severity;
  message: string;
  /** True when the rule is violated. */
  triggers: (has: (layer: string) => boolean, picked: (block: string) => boolean) => boolean;
}

const RULES: Rule[] = [
  {
    id: "vector-without-embeddings",
    severity: "error",
    message:
      "A vector store with no embedding model. Vectors have to be produced before they can be searched — pick an embeddings layer.",
    triggers: (has) => has("vectorStore") && !has("embeddings"),
  },
  {
    id: "embeddings-without-parsing",
    severity: "error",
    message:
      "Documents are stored but never parsed. Something has to turn files into text before they can be embedded.",
    triggers: (has) => has("embeddings") && has("objectStorage") && !has("parsing"),
  },
  {
    id: "retrieval-without-store",
    severity: "error",
    message: "A retrieval strategy with nothing to retrieve from. Add a vector store, or drop the retrieval layer.",
    triggers: (has) => has("retrieval") && !has("vectorStore"),
  },
  {
    id: "no-identity",
    severity: "error",
    message:
      "No identity layer. For anything reading company data this is the difference between a demo and a system — and for RAG specifically, permission filtering has to happen at retrieval time, not in the prompt.",
    triggers: (has) => has("llm") && !has("identity"),
  },
  {
    id: "gateway-timeout-vs-agents",
    severity: "warning",
    message:
      "AWS API Gateway caps a request at about 30 seconds, which an agent loop will exceed. This combination needs an asynchronous pattern — add a queue, or change the gateway.",
    triggers: (_has, picked) => picked("gateway.aws") && picked("agent.langgraph"),
  },
  {
    id: "inmemory-cache-on-scaling-host",
    severity: "warning",
    message:
      "In-process memory on a host that scales to more than one instance. State stops being shared the moment a second instance starts, and the bug is intermittent rather than obvious.",
    triggers: (_has, picked) =>
      picked("cache.inmemory") && (picked("infra.k8s") || picked("infra.azureapp") || picked("orch.containerapps")),
  },
  {
    id: "rag-without-hybrid-or-rerank",
    severity: "warning",
    message:
      "Retrieval with neither hybrid search nor a reranker. Both are among the cheapest quality gains available — worth a deliberate decision rather than an omission.",
    triggers: (has, picked) =>
      has("vectorStore") && !picked("ret.hybrid") && !picked("ret.reranker"),
  },
  {
    id: "no-observability",
    severity: "warning",
    message:
      "No observability layer. Without traces and token accounting there is no way to substantiate a cost figure or a quality claim — which is what separates a demo from a system.",
    triggers: (has) => has("llm") && !has("observability"),
  },
  {
    id: "chroma-in-production",
    severity: "info",
    message:
      "Chroma is excellent for a prototype and not built for production load. Fine if this is a pilot; worth revisiting before it carries real traffic.",
    triggers: (_has, picked) => picked("vec.chroma"),
  },
  {
    id: "residency-conflict",
    severity: "error",
    message:
      "Self-hosted models were chosen for data sovereignty, but a vendor-hosted model sits alongside them. Data leaves the tenant through the second path, which defeats the first.",
    triggers: (_has, picked) =>
      picked("llm.opensource") && (picked("llm.openai") || picked("llm.anthropic") || picked("llm.gemini")),
  },
  {
    id: "irreversible-without-human",
    severity: "warning",
    message:
      "A model with tools and no human-in-the-loop layer. The less reversible the action, the more that gap costs — this is the best available answer to hallucination risk.",
    triggers: (has, picked) => has("llm") && picked("agent.langgraph") && !has("humanInLoop"),
  },
  {
    id: "env-secrets",
    severity: "warning",
    message: ".env files are fine for local development and not acceptable in production.",
    triggers: (_has, picked) => picked("secrets.env"),
  },
];

export function validate(selection: Selection, layers: ArchitectureLayer[]): Finding[] {
  const chosen = new Set(Object.values(selection).flat());
  const has = (layerId: string) => (selection[layerId]?.length ?? 0) > 0;
  const picked = (blockId: string) => chosen.has(blockId);

  const findings = RULES.filter((r) => r.triggers(has, picked)).map(({ id, severity, message }) => ({
    id,
    severity,
    message,
  }));

  // Required layers that carry no selection at all.
  for (const layer of layers) {
    if (layer.necessity === "required" && !has(layer.id)) {
      findings.push({
        id: `missing-${layer.id}`,
        severity: "warning",
        message: `No ${layer.title.toLowerCase()} chosen — this layer is present in almost every system.`,
      });
    }
  }

  const order: Record<Severity, number> = { error: 0, warning: 1, info: 2 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity]);
}

export interface Preset {
  id: string;
  name: string;
  rationale: string;
  selection: Selection;
}

export const PRESETS: Preset[] = [
  {
    id: "rag-assistant",
    name: "Document assistant (RAG)",
    rationale:
      "The default shape for “answer questions over our own documents”. Hybrid retrieval and a reranker are in because they are the cheapest quality available.",
    selection: {
      channel: ["channel.teams"],
      identity: ["identity.entra"],
      orchestration: ["orch.fastapi"],
      objectStorage: ["storage.sharepoint"],
      parsing: ["parse.docint"],
      embeddings: ["emb.azure"],
      vectorStore: ["vec.pgvector"],
      retrieval: ["ret.hybrid", "ret.reranker", "ret.metadata"],
      llm: ["llm.azureopenai"],
      database: ["db.postgres"],
      observability: ["obs.langfuse"],
      infrastructure: ["infra.azureapp"],
    },
  },
  {
    id: "predictive-maintenance",
    name: "Predictive maintenance",
    rationale:
      "Classical time-series ML does the work; the model sits at the edge summarising alerts. Note how little of the RAG stack survives contact with this problem.",
    selection: {
      channel: ["channel.teams"],
      identity: ["identity.entra"],
      orchestration: ["orch.fastapi"],
      messaging: ["msg.kafka"],
      database: ["db.timescale"],
      llm: ["llm.azureopenai"],
      observability: ["obs.otel"],
      humanInLoop: ["hitl.confirm"],
      infrastructure: ["infra.azureapp"],
    },
  },
  {
    id: "async-agentic",
    name: "Asynchronous document pipeline",
    rationale:
      "No live chat. Work is queued, drafts are versioned, and a person signs off before anything leaves the building.",
    selection: {
      channel: ["channel.web"],
      identity: ["identity.entra"],
      orchestration: ["orch.temporal"],
      agentFramework: ["agent.langgraph"],
      messaging: ["msg.servicebus"],
      objectStorage: ["storage.blob"],
      parsing: ["parse.docling"],
      embeddings: ["emb.azure"],
      vectorStore: ["vec.qdrant"],
      retrieval: ["ret.hybrid", "ret.metadata"],
      llm: ["llm.anthropic"],
      database: ["db.postgres"],
      guardrails: ["guard.deterministic"],
      observability: ["obs.langfuse"],
      humanInLoop: ["hitl.edit"],
      infrastructure: ["infra.azureapp"],
      secrets: ["secrets.keyvault"],
    },
  },
];
