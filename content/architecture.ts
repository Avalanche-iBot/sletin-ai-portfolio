/**
 * Content source for the Architecture tab — a reference catalogue of the
 * layers an enterprise AI system is assembled from, with the tool options
 * available at each.
 *
 * It is a teaching artefact, not a description of any one system. No project
 * uses all of these layers, and a design that reached for every one of them
 * would be a warning sign rather than a thorough job.
 *
 * Pure content: the page and its components read from here and hold no copy of
 * their own.
 */

export type Necessity = "required" | "conditional" | "enterprise";

export interface ArchitectureBlock {
  id: string;
  name: string;
  tags: string[];
  pros: string[];
  cons: string[];
}

export interface ArchitectureLayer {
  id: string;
  order: number;
  title: string;
  question: string;
  necessity: Necessity;
  summary: string;
  blocks: ArchitectureBlock[];
  note?: string;
}

export const NECESSITY_LABEL: Record<Necessity, string> = {
  required: "Usually required",
  conditional: "Conditional",
  enterprise: "Enterprise-only",
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "channel",
    order: 1,
    title: "Channel",
    question: "Where does the person actually meet the system?",
    necessity: "required",
    summary:
      "The entry point shapes everything downstream — UX limits, auth options, and message-format constraints all trace back to the channel.",
    blocks: [
      {
        id: "channel.web",
        name: "Web chat (own build)",
        tags: ["Full control", "Custom build"],
        pros: ["Full control over UX, streaming and file handling", "Custom auth and design system"],
        cons: ["Has to be built and hosted", "No built-in audience — people have to visit"],
      },
      {
        id: "channel.teams",
        name: "Microsoft Teams",
        tags: ["Enterprise", "SSO included"],
        pros: ["Users are already there", "SSO via Entra ID essentially for free", "Natural fit for enterprise rollout"],
        cons: ["Limited UI (Adaptive Cards)", "IT approval cycles", "Awkward local testing"],
      },
      {
        id: "channel.slack",
        name: "Slack",
        tags: ["Fast integration"],
        pros: ["Mature API", "Threads work well as conversation context"],
        cons: ["Less common in industrial/enterprise settings", "Formatting limits"],
      },
      {
        id: "channel.whatsapp",
        name: "WhatsApp Business API",
        tags: ["Highest reach", "Paid per message"],
        pros: ["Best reach for field staff and external customers"],
        cons: ["Priced per conversation", "Templates need approval", "24-hour session window", "GDPR complexity"],
      },
      {
        id: "channel.telegram",
        name: "Telegram Bot API",
        tags: ["Free", "Fast to build"],
        pros: ["Free, excellent developer experience"],
        cons: ["Low enterprise trust", "No SSO", "Blocked in some organisations"],
      },
      {
        id: "channel.email",
        name: "Email (SMTP / Graph API)",
        tags: ["Async by nature"],
        pros: ["Async fits naturally", "Familiar, handles attachments"],
        cons: ["High latency", "No real dialogue", "Parsing threads is painful"],
      },
      {
        id: "channel.voice",
        name: "Voice / IVR",
        tags: ["Hands-free"],
        pros: ["Works when hands are busy — shop floor, rig, warehouse"],
        cons: ["STT errors in noise", "Latency", "More expensive", "Hard to test"],
      },
      {
        id: "channel.embedded",
        name: "Embedded in ERP / ServiceNow",
        tags: ["In-context"],
        pros: ["Task context already present, no switching"],
        cons: ["Constrained by the host platform's release cycle"],
      },
    ],
    note: "If more than one channel is in play, a message-normalisation step becomes mandatory right after this layer.",
  },
  {
    id: "gateway",
    order: 2,
    title: "Edge / API Gateway",
    question: "What sits between the channel and the backend?",
    necessity: "conditional",
    summary:
      "Rate limiting per user, key masking, a single logging point, and canary routing between prompt versions — this is why it earns a spot separate from the backend.",
    blocks: [
      {
        id: "gateway.apim",
        name: "Azure API Management",
        tags: ["Enterprise"],
        pros: ["Policies, quotas, versioning", "Integrates with Entra ID"],
        cons: ["Expensive", "Heavy to configure"],
      },
      {
        id: "gateway.aws",
        name: "AWS API Gateway",
        tags: ["Serverless"],
        pros: ["Serverless-native", "Cheap at low volume"],
        cons: ["~29–30s request timeout — conflicts with long LLM responses"],
      },
      {
        id: "gateway.kong",
        name: "Kong / Nginx / Traefik",
        tags: ["Self-hosted"],
        pros: ["Cheap, flexible, self-hosted"],
        cons: ["You own HA and upgrades"],
      },
      {
        id: "gateway.cloudflare",
        name: "Cloudflare (WAF + Workers)",
        tags: ["Edge"],
        pros: ["DDoS protection, caching, cheap edge logic"],
        cons: ["Fewer enterprise policy controls", "One more vendor"],
      },
      {
        id: "gateway.none",
        name: "None — handled in the app",
        tags: ["Zero infra"],
        pros: ["No extra infrastructure"],
        cons: ["Rate limiting and WAF have to be hand-rolled"],
      },
    ],
  },
  {
    id: "identity",
    order: 3,
    title: "Identity & Access",
    question: "Who is this, and what are they allowed to see?",
    necessity: "required",
    summary:
      "For RAG systems specifically: permission filtering must happen at retrieval time, not in the prompt — otherwise a leak happens through the model's answer.",
    blocks: [
      {
        id: "identity.entra",
        name: "Microsoft Entra ID (OIDC/SAML)",
        tags: ["Enterprise standard"],
        pros: ["Groups map to permissions", "MFA and Conditional Access built in"],
        cons: ["Needs IT sign-off", "Licensing cost"],
      },
      {
        id: "identity.okta",
        name: "Okta / Auth0",
        tags: ["Managed"],
        pros: ["Fast to set up", "Many connectors"],
        cons: ["Cost scales with usage", "Another vendor"],
      },
      {
        id: "identity.keycloak",
        name: "Keycloak (self-hosted)",
        tags: ["Free", "Self-hosted"],
        pros: ["Free, full control, OIDC/SAML"],
        cons: ["You maintain uptime and upgrades"],
      },
      {
        id: "identity.cognito",
        name: "AWS Cognito / Firebase Auth",
        tags: ["Cloud-native"],
        pros: ["Cheap, integrated with the cloud provider"],
        cons: ["Limited customisation", "Weak enterprise SSO"],
      },
      {
        id: "identity.jwt",
        name: "Custom JWT + bcrypt",
        tags: ["Full control"],
        pros: ["No external dependency"],
        cons: ["You own the risk", "No SSO/MFA/rotation — a red flag in audits"],
      },
      {
        id: "identity.channel",
        name: "Channel-native identity (Teams/Slack user ID)",
        tags: ["Zero setup"],
        pros: ["User is already authenticated by the channel"],
        cons: ["Trust is delegated entirely to the channel"],
      },
    ],
    note: "RBAC (roles) covers most cases. ABAC (attributes like department + document classification + region) is needed once permissions depend on the data itself, not just the user.",
  },
  {
    id: "orchestration",
    order: 4,
    title: "Orchestration",
    question: "What actually runs the request?",
    necessity: "required",
    summary:
      "The core decision here is synchronous request/response versus an asynchronous task queue — the latter is mandatory for document processing, multi-agent chains, and report generation.",
    blocks: [
      {
        id: "orch.fastapi",
        name: "FastAPI (Python)",
        tags: ["AI-native"],
        pros: ["Native to the AI ecosystem", "Async, streaming, Pydantic validation"],
        cons: ["Needs its own hosting", "GIL under CPU-bound load"],
      },
      {
        id: "orch.node",
        name: "Node.js / NestJS",
        tags: ["Same language as frontend"],
        pros: ["One language with the frontend", "Excellent streaming"],
        cons: ["Python ML libraries aren't directly available"],
      },
      {
        id: "orch.functions",
        name: "Azure Functions / AWS Lambda",
        tags: ["Serverless"],
        pros: ["Pay per invocation", "Auto-scaling"],
        cons: ["Cold starts", "Timeouts cap long agentic sessions"],
      },
      {
        id: "orch.containerapps",
        name: "Azure Container Apps / Cloud Run",
        tags: ["Serverless containers"],
        pros: ["Scale to zero, no Kubernetes overhead"],
        cons: ["Less control than a full cluster"],
      },
      {
        id: "orch.lowcode",
        name: "n8n / Make / Power Automate",
        tags: ["Low-code"],
        pros: ["Fast, visual, accessible to non-developers"],
        cons: ["Poor versioning", "Testing is nearly impossible", "Low complexity ceiling"],
      },
      {
        id: "orch.temporal",
        name: "Temporal / Durable Functions",
        tags: ["Long-running"],
        pros: ["Retries and state handled for you — ideal for agents"],
        cons: ["Steep learning curve", "Overkill for simple tasks"],
      },
    ],
  },
  {
    id: "agentFramework",
    order: 5,
    title: "Agent / LLM Framework",
    question: "Does the number of steps need to be decided at runtime?",
    necessity: "conditional",
    summary:
      "The honest takeaway: in most enterprise tasks no framework is needed at all — deterministic code with one to three model calls is enough. A framework earns its place when the step count truly isn't known in advance.",
    blocks: [
      {
        id: "agent.direct",
        name: "Direct model API calls",
        tags: ["Minimal"],
        pros: ["Zero abstraction, full control, fewest dependencies"],
        cons: ["Retries, tool loops and memory all hand-written"],
      },
      {
        id: "agent.langchain",
        name: "LangChain",
        tags: ["Ecosystem"],
        pros: ["Huge connector ecosystem, many examples"],
        cons: ["Heavy abstractions", "Frequent breaking changes", "Hard to debug"],
      },
      {
        id: "agent.langgraph",
        name: "LangGraph",
        tags: ["Explicit state graph"],
        pros: ["Explicit branching, checkpointing, human-in-the-loop support"],
        cons: ["Requires mature understanding, more code"],
      },
      {
        id: "agent.llamaindex",
        name: "LlamaIndex",
        tags: ["RAG-focused"],
        pros: ["Best-in-class for RAG indexing and retrieval strategy"],
        cons: ["Weaker fit for agents and complex workflows"],
      },
      {
        id: "agent.sk",
        name: "Semantic Kernel",
        tags: ["Microsoft stack"],
        pros: ["Natural fit with Azure, C#/Python"],
        cons: ["Smaller community, documentation lags"],
      },
      {
        id: "agent.crewai",
        name: "CrewAI / AutoGen",
        tags: ["Multi-agent"],
        pros: ["Fast prototyping of multi-agent roles"],
        cons: ["Unpredictable, hard to control cost"],
      },
      {
        id: "agent.mcp",
        name: "MCP (Model Context Protocol)",
        tags: ["Emerging standard"],
        pros: ["Standardises tool/data connections, reusable servers"],
        cons: ["Young standard, ecosystem still forming"],
      },
    ],
  },
  {
    id: "messaging",
    order: 6,
    title: "Queue / Messaging",
    question: "What happens when work takes longer than a request cycle?",
    necessity: "conditional",
    summary:
      "Needed for document processing, sensor streaming, anything over ~30 seconds, and to smooth traffic spikes against an LLM provider's rate limits.",
    blocks: [
      {
        id: "msg.redis",
        name: "Redis Streams / Celery+Redis",
        tags: ["Lightweight"],
        pros: ["Minimal new infrastructure if Redis is already in place"],
        cons: ["Weaker delivery guarantees than a dedicated broker"],
      },
      {
        id: "msg.rabbitmq",
        name: "RabbitMQ",
        tags: ["Mature"],
        pros: ["Flexible routing, dead-letter queues"],
        cons: ["One more service to operate"],
      },
      {
        id: "msg.kafka",
        name: "Apache Kafka",
        tags: ["High throughput"],
        pros: ["Huge throughput, event replay — standard for sensor data"],
        cons: ["Operationally heavy, overkill below a certain scale"],
      },
      {
        id: "msg.servicebus",
        name: "Azure Service Bus / AWS SQS+SNS",
        tags: ["Managed"],
        pros: ["Managed, dead-letter queues, FIFO, serverless-friendly"],
        cons: ["Vendor lock-in, per-message cost"],
      },
      {
        id: "msg.eventgrid",
        name: "Azure Event Grid / EventBridge",
        tags: ["Event routing"],
        pros: ["Cheap event-based routing"],
        cons: ["Not built for guaranteed ordering"],
      },
    ],
  },
  {
    id: "cache",
    order: 7,
    title: "Cache / Session State",
    question: "What gets remembered between requests, and for how long?",
    necessity: "conditional",
    summary:
      "What actually gets cached in AI systems: LLM responses (exact and semantic match), embeddings, retrieval results, auth tokens, document metadata.",
    blocks: [
      {
        id: "cache.redis",
        name: "Redis / Valkey",
        tags: ["Versatile"],
        pros: ["Sessions, rate limiting, queues, pub/sub, vector search — one service"],
        cons: ["One more service; in-memory data costs money"],
      },
      {
        id: "cache.inmemory",
        name: "In-process memory",
        tags: ["Zero infra"],
        pros: ["No infrastructure at all"],
        cons: ["Breaks silently once there's more than one instance — a common bug"],
      },
      {
        id: "cache.db",
        name: "Database as session store",
        tags: ["No new service"],
        pros: ["Nothing new to add"],
        cons: ["Slower, adds load to the primary database"],
      },
      {
        id: "cache.semantic",
        name: "Semantic cache (GPTCache, Redis LangCache)",
        tags: ["Cost saving"],
        pros: ["20–40% token savings on repeated questions"],
        cons: ["Risk of a stale or cross-user answer — needs invalidation and permission isolation"],
      },
      {
        id: "cache.providercache",
        name: "Provider prompt caching (Anthropic/OpenAI)",
        tags: ["Zero infra"],
        pros: ["Sharp cost cut on long system prompts, no infrastructure"],
        cons: ["Only works within one provider, TTL is limited"],
      },
    ],
  },
  {
    id: "objectStorage",
    order: 8,
    title: "Object / Document Storage",
    question: "Where do the source files actually live?",
    necessity: "conditional",
    summary:
      "Rule of thumb: don't copy corporate documents into new storage without a reason — that creates a second source of truth and a duplicate permissions model. Prefer reading in place plus a metadata index.",
    blocks: [
      {
        id: "storage.blob",
        name: "Azure Blob Storage",
        tags: ["Managed"],
        pros: ["Cheap, access tiers, private endpoints, lifecycle policies"],
        cons: ["Needs custom code for upload and permissions"],
      },
      {
        id: "storage.s3",
        name: "AWS S3 / GCS",
        tags: ["Industry standard"],
        pros: ["Effectively unlimited scale, versioning"],
        cons: ["Vendor lock-in on egress costs"],
      },
      {
        id: "storage.sharepoint",
        name: "SharePoint / OneDrive (Graph API)",
        tags: ["Already there"],
        pros: ["Documents already live here, permissions inherit, familiar to users"],
        cons: ["API throttling, uneven metadata, complex permission model"],
      },
      {
        id: "storage.minio",
        name: "MinIO (self-hosted, S3-compatible)",
        tags: ["Data sovereignty"],
        pros: ["On-prem, S3 API, data stays in-house"],
        cons: ["You own hardware and backups"],
      },
      {
        id: "storage.box",
        name: "Box / Dropbox Business",
        tags: ["Compliance features"],
        pros: ["e-signature, compliance tooling"],
        cons: ["Cost, one more perimeter to manage"],
      },
    ],
  },
  {
    id: "parsing",
    order: 9,
    title: "Document Parsing & Chunking",
    question: "How does a document become model-ready text?",
    necessity: "conditional",
    summary:
      "Required whenever the pattern is retrieval-augmented generation (RAG). The chunking strategy usually matters more than the parser choice — fixed-size, structure-aware, parent-document, semantic, or table/page-based each trade simplicity for retrieval quality differently.",
    blocks: [
      {
        id: "parse.docint",
        name: "Azure AI Document Intelligence",
        tags: ["Best for tables"],
        pros: ["Strong on tables, layout, handwriting, prebuilt models (invoices, IDs)"],
        cons: ["Priced per page, data leaves the tenant for processing"],
      },
      {
        id: "parse.textract",
        name: "AWS Textract / Google Document AI",
        tags: ["Managed"],
        pros: ["Comparable quality, mature form extraction"],
        cons: ["Same trade-offs as Document Intelligence"],
      },
      {
        id: "parse.unstructured",
        name: "Unstructured.io",
        tags: ["Open source option"],
        pros: ["Broad format support, ready-made chunking"],
        cons: ["Table quality is inconsistent"],
      },
      {
        id: "parse.llamaparse",
        name: "LlamaParse",
        tags: ["RAG-tuned"],
        pros: ["Very good with PDF tables specifically for RAG"],
        cons: ["Paid, vendor dependency"],
      },
      {
        id: "parse.docling",
        name: "Docling (IBM, OSS)",
        tags: ["Free", "Local"],
        pros: ["Free, good structure extraction, runs locally"],
        cons: ["Slower, needs compute resources"],
      },
      {
        id: "parse.pymupdf",
        name: "PyMuPDF / pdfplumber",
        tags: ["Free", "Fast"],
        pros: ["Fast, free, full control"],
        cons: ["Text layer only — tables need manual handling"],
      },
    ],
  },
  {
    id: "embeddings",
    order: 10,
    title: "Embeddings",
    question: "How is meaning turned into a vector?",
    necessity: "conditional",
    summary:
      "What actually drives the decision: corpus language, document length, a requirement that data never leaves the tenant, and re-indexing cost. Changing embedding models means a full re-index — worth stating as an architectural commitment up front.",
    blocks: [
      {
        id: "emb.openai",
        name: "OpenAI text-embedding-3",
        tags: ["Cheap", "Multilingual"],
        pros: ["Cheap, strong quality, multilingual, adjustable dimensionality"],
        cons: ["Data leaves the tenant to the provider"],
      },
      {
        id: "emb.azure",
        name: "Azure OpenAI embeddings",
        tags: ["In-tenant"],
        pros: ["Same quality inside the enterprise perimeter, private endpoint"],
        cons: ["Regional quota limits"],
      },
      {
        id: "emb.cohere",
        name: "Cohere Embed v3+",
        tags: ["Multilingual"],
        pros: ["Strong multilingual performance, dedicated query/document modes"],
        cons: ["Paid"],
      },
      {
        id: "emb.voyage",
        name: "Voyage AI",
        tags: ["Domain-tuned"],
        pros: ["Top quality on domain data (legal, code)"],
        cons: ["More expensive, smaller ecosystem"],
      },
      {
        id: "emb.opensource",
        name: "BGE / E5 / Nomic / GTE (open, local)",
        tags: ["Free", "Data sovereignty"],
        pros: ["Free, local, data sovereignty, can be fine-tuned"],
        cons: ["Needs GPU or accepted latency; you maintain it"],
      },
    ],
  },
  {
    id: "vectorStore",
    order: 11,
    title: "Vector Store",
    question: "Where do the vectors actually live, and at what scale?",
    necessity: "conditional",
    summary:
      "Default for a corporate pilot: pgvector. Move to Qdrant or Azure AI Search once volume or permission-filtering needs grow.",
    blocks: [
      {
        id: "vec.pgvector",
        name: "pgvector (PostgreSQL)",
        tags: ["Default pilot choice"],
        pros: ["One database for everything, transactions, familiar SQL, hybrid search via tsvector"],
        cons: ["Needs tuning beyond roughly 1–5M vectors"],
      },
      {
        id: "vec.qdrant",
        name: "Qdrant",
        tags: ["Fast filtering"],
        pros: ["Fast, excellent metadata filtering, OSS or cloud"],
        cons: ["A separate service to run"],
      },
      {
        id: "vec.weaviate",
        name: "Weaviate",
        tags: ["Hybrid built-in"],
        pros: ["Hybrid search built in, modular"],
        cons: ["More operational overhead"],
      },
      {
        id: "vec.milvus",
        name: "Milvus",
        tags: ["Billion-scale"],
        pros: ["Scales into the billions, mature indexes"],
        cons: ["Heavy architecture (etcd, MinIO, Pulsar)"],
      },
      {
        id: "vec.pinecone",
        name: "Pinecone",
        tags: ["Fully managed"],
        pros: ["Minimal operations, fully managed"],
        cons: ["Expensive at scale, no self-host option"],
      },
      {
        id: "vec.azuresearch",
        name: "Azure AI Search",
        tags: ["Enterprise"],
        pros: ["Hybrid + semantic ranking, Entra ID and SharePoint integration, security filters"],
        cons: ["Higher-priced tiers, less index control"],
      },
      {
        id: "vec.chroma",
        name: "Chroma",
        tags: ["Prototype only"],
        pros: ["Ideal for a prototype, minimal setup"],
        cons: ["Not built for production load"],
      },
    ],
  },
  {
    id: "retrieval",
    order: 12,
    title: "Retrieval & Ranking",
    question: "How good is the search behind the answer, really?",
    necessity: "conditional",
    summary:
      "The layer most often skipped — and the one that determines answer quality more than the vector store or the model choice.",
    blocks: [
      {
        id: "ret.hybrid",
        name: "Hybrid search (BM25 + vector, RRF)",
        tags: ["Recommended baseline"],
        pros: ["Meaningful quality gain in almost every case"],
        cons: ["Two index systems, weight tuning required"],
      },
      {
        id: "ret.reranker",
        name: "Reranker (Cohere Rerank, cross-encoder)",
        tags: ["Best ROI"],
        pros: ["Cheapest large accuracy gain available"],
        cons: ["Adds 100–300ms latency and cost"],
      },
      {
        id: "ret.rewriting",
        name: "Query rewriting / decomposition",
        tags: ["Multi-hop"],
        pros: ["Helps with vague questions and multi-hop reasoning"],
        cons: ["Adds an extra model call"],
      },
      {
        id: "ret.metadata",
        name: "Metadata filtering",
        tags: ["Security-critical"],
        pros: ["Mandatory for permissions and version freshness"],
        cons: ["Requires disciplined metadata hygiene"],
      },
      {
        id: "ret.graphrag",
        name: "GraphRAG (e.g. Neo4j)",
        tags: ["Relationship-heavy"],
        pros: ["Strong for chains like equipment → incident → regulation"],
        cons: ["Expensive to build and maintain the graph"],
      },
    ],
  },
  {
    id: "llm",
    order: 13,
    title: "LLM Layer",
    question: "Which model, hosted where, at what latency and cost?",
    necessity: "required",
    summary:
      "Decisions worth pinning down here: model size matched to the task, cheap-model-first routing with escalation, RAG vs fine-tuning vs prompting, and determinism for auditable processes.",
    blocks: [
      {
        id: "llm.openai",
        name: "OpenAI API",
        tags: ["Broadest tooling"],
        pros: ["Broad capability range, tools, structured outputs, large ecosystem"],
        cons: ["Data leaves the tenant, single-vendor dependency"],
      },
      {
        id: "llm.anthropic",
        name: "Anthropic API",
        tags: ["Long context"],
        pros: ["Long context, strong document/code reasoning, prompt caching"],
        cons: ["Same tenant/vendor trade-offs"],
      },
      {
        id: "llm.gemini",
        name: "Google Gemini",
        tags: ["Multimodal"],
        pros: ["Multimodality, very long context, pricing"],
        cons: ["Another approval perimeter to add"],
      },
      {
        id: "llm.azureopenai",
        name: "Azure OpenAI",
        tags: ["In-tenant enterprise"],
        pros: ["Private endpoints, data-region control, SLA, Entra ID, familiar procurement path"],
        cons: ["Quotas, versions lag behind OpenAI directly"],
      },
      {
        id: "llm.bedrock",
        name: "AWS Bedrock",
        tags: ["Multi-vendor"],
        pros: ["Several model vendors behind one API, IAM-native"],
        cons: ["Regional model availability varies"],
      },
      {
        id: "llm.opensource",
        name: "Open models, self-hosted (Llama, Qwen, Mistral)",
        tags: ["Data sovereignty"],
        pros: ["Data never leaves the tenant, no per-token price, fine-tunable"],
        cons: ["GPU capital cost, needs an MLOps team, quality below top proprietary models"],
      },
      {
        id: "llm.router",
        name: "Routers (LiteLLM, OpenRouter, Portkey)",
        tags: ["Multi-provider"],
        pros: ["One API, fallback across providers, cost tracking"],
        cons: ["One more hop, one more point of failure"],
      },
    ],
  },
  {
    id: "database",
    order: 14,
    title: "Operational Database",
    question: "Where does everything that isn't a document or a vector live?",
    necessity: "required",
    summary:
      "Users and permissions, conversation history, model-call audit trail, document metadata, task state, feedback, cost counters — all live here.",
    blocks: [
      {
        id: "db.postgres",
        name: "PostgreSQL",
        tags: ["Default choice"],
        pros: ["Universal, JSONB, extensions, pgvector, free"],
        cons: ["Sharding is manual"],
      },
      {
        id: "db.sqlserver",
        name: "SQL Server / Oracle",
        tags: ["Already standard"],
        pros: ["Already the enterprise standard, existing support contracts"],
        cons: ["Licensing cost, less flexibility for new workloads"],
      },
      {
        id: "db.mongodb",
        name: "MongoDB",
        tags: ["Flexible schema"],
        pros: ["Flexible schema, convenient for unstructured metadata"],
        cons: ["Weaker transactions and analytics"],
      },
      {
        id: "db.cosmos",
        name: "Cosmos DB / DynamoDB",
        tags: ["Global scale"],
        pros: ["Global distribution, low latency"],
        cons: ["Expensive, query limitations, lock-in"],
      },
      {
        id: "db.timescale",
        name: "TimescaleDB / InfluxDB",
        tags: ["Time series"],
        pros: ["Exactly what predictive-maintenance sensor data needs"],
        cons: ["Narrow specialisation"],
      },
    ],
  },
  {
    id: "guardrails",
    order: 15,
    title: "Guardrails & Content Safety",
    question: "What stops the model from saying the wrong thing?",
    necessity: "enterprise",
    summary:
      "Input guardrails (injection, PII) and output guardrails (leakage, toxicity, schema compliance) are two different blocks, not one.",
    blocks: [
      {
        id: "guard.azure",
        name: "Azure AI Content Safety",
        tags: ["In-tenant"],
        pros: ["Harm categories, jailbreak detection, stays inside Azure"],
        cons: ["Per-call cost, false positives"],
      },
      {
        id: "guard.openai",
        name: "OpenAI Moderation",
        tags: ["Free with API"],
        pros: ["Free alongside the OpenAI API"],
        cons: ["Only works within that provider's contour"],
      },
      {
        id: "guard.llamaguard",
        name: "Llama Guard / ShieldGemma",
        tags: ["Local", "Free"],
        pros: ["Runs locally, free, configurable"],
        cons: ["Needs its own inference capacity"],
      },
      {
        id: "guard.presidio",
        name: "Microsoft Presidio (PII)",
        tags: ["PII detection"],
        pros: ["Detects and masks personal data, runs locally"],
        cons: ["Needs tuning per language and domain"],
      },
      {
        id: "guard.deterministic",
        name: "Deterministic validation (Pydantic, regex, allow-lists)",
        tags: ["Cheapest", "Auditable"],
        pros: ["Cheap, predictable, fully auditable"],
        cons: ["Misses semantic-level problems"],
      },
    ],
  },
  {
    id: "observability",
    order: 16,
    title: "Observability & Evaluation",
    question: "How do you know it's actually working, and what it costs?",
    necessity: "required",
    summary:
      "This is the layer that separates a demo from a system — without it there's no way to substantiate quality or cost claims.",
    blocks: [
      {
        id: "obs.langfuse",
        name: "Langfuse",
        tags: ["Open source"],
        pros: ["OSS, self-hostable, tracing, cost tracking, datasets"],
        cons: ["Needs hosting (or a paid cloud tier)"],
      },
      {
        id: "obs.langsmith",
        name: "LangSmith",
        tags: ["LangChain-native"],
        pros: ["Deep integration if already on LangChain/LangGraph"],
        cons: ["Ecosystem lock-in, priced"],
      },
      {
        id: "obs.phoenix",
        name: "Arize Phoenix",
        tags: ["Open source"],
        pros: ["OSS, strong quality analytics"],
        cons: ["Learning curve"],
      },
      {
        id: "obs.otel",
        name: "OpenTelemetry + Grafana / Datadog",
        tags: ["Unified stack"],
        pros: ["One observability stack with the rest of the infrastructure"],
        cons: ["LLM-specific detail (tokens, prompts) needs custom instrumentation"],
      },
      {
        id: "obs.eval",
        name: "RAGAS / DeepEval / promptfoo",
        tags: ["Eval frameworks"],
        pros: ["RAG-specific metrics, regression tests for prompts"],
        cons: ["Metrics are noisy, need a curated gold set"],
      },
    ],
  },
  {
    id: "costControl",
    order: 17,
    title: "Cost & FinOps",
    question: "What actually moves the per-request cost?",
    necessity: "conditional",
    summary:
      "A formula beats a single figure: request cost ≈ (input tokens × input price) + (output tokens × output price) + retrieval + amortised embeddings + infrastructure share. Show it as a range across cache-hit assumptions.",
    blocks: [
      {
        id: "cost.routing",
        name: "Model routing (cheap default, escalate on demand)",
        tags: ["Biggest lever"],
        pros: ["Largest single cost lever after removing the LLM entirely"],
        cons: ["Needs a reliable escalation trigger"],
      },
      {
        id: "cost.batch",
        name: "Batch API",
        tags: ["~50% discount"],
        pros: ["Roughly 50% discount when latency isn't time-critical"],
        cons: ["Not usable for interactive requests"],
      },
      {
        id: "cost.topk",
        name: "Limiting retrieval top-k",
        tags: ["Hidden cost driver"],
        pros: ["Retrieval volume is the main hidden cost driver — worth capping deliberately"],
        cons: ["Too aggressive a cap hurts answer quality"],
      },
      {
        id: "cost.deterministic",
        name: "Deterministic branch for routine requests",
        tags: ["Biggest saving"],
        pros: ["The single largest saving — skip the model entirely for templated cases"],
        cons: ["Requires a reliable classifier for the split"],
      },
    ],
  },
  {
    id: "ui",
    order: 18,
    title: "User Interface",
    question: "What does the person actually look at?",
    necessity: "conditional",
    summary: "Trade-off between build speed and production polish.",
    blocks: [
      {
        id: "ui.nextjs",
        name: "Next.js / React",
        tags: ["Production-grade"],
        pros: ["Full control, streaming, production quality"],
        cons: ["More development time"],
      },
      {
        id: "ui.streamlit",
        name: "Streamlit / Gradio",
        tags: ["Prototype speed"],
        pros: ["A working prototype in hours"],
        cons: ["Doesn't look or scale like a product"],
      },
      {
        id: "ui.chainlit",
        name: "Chainlit / Open WebUI",
        tags: ["Ready-made chat UI"],
        pros: ["Ready-made chat UI with tracing built in"],
        cons: ["Limited customisation"],
      },
      {
        id: "ui.powerapps",
        name: "Power Apps / Copilot Studio",
        tags: ["Low-code, in-tenant"],
        pros: ["Low-code inside the Microsoft perimeter, fast sign-off"],
        cons: ["Logic ceiling, licensing"],
      },
    ],
  },
  {
    id: "infrastructure",
    order: 19,
    title: "Infrastructure & Deployment",
    question: "Where does it actually run?",
    necessity: "required",
    summary: "The choice mostly comes down to how much operational overhead is acceptable versus control needed.",
    blocks: [
      {
        id: "infra.vercel",
        name: "Vercel",
        tags: ["Best for Next.js"],
        pros: ["Ideal for Next.js, preview deployments, zero config"],
        cons: ["Not built for heavy Python/GPU workloads, function limits"],
      },
      {
        id: "infra.azureapp",
        name: "Azure App Service / Container Apps",
        tags: ["Enterprise"],
        pros: ["Enterprise standard, VNet, private endpoints"],
        cons: ["More expensive and more configuration"],
      },
      {
        id: "infra.k8s",
        name: "Kubernetes (AKS/EKS/GKE)",
        tags: ["Max flexibility"],
        pros: ["Maximum flexibility, GPU workers"],
        cons: ["Needs a platform team — overkill for a single service"],
      },
      {
        id: "infra.compose",
        name: "Docker Compose on a VM",
        tags: ["Simple, cheap"],
        pros: ["Simple and cheap"],
        cons: ["Manual scaling and upgrades"],
      },
      {
        id: "infra.onprem",
        name: "On-premises",
        tags: ["Data sovereignty"],
        pros: ["Full data sovereignty, meets regulator requirements"],
        cons: ["Capital cost, slower change cycles"],
      },
    ],
  },
  {
    id: "secrets",
    order: 20,
    title: "Secrets & Compliance",
    question: "What changes once a regulator is involved?",
    necessity: "enterprise",
    summary:
      "Data residency, GDPR right-to-erasure (requires the ability to delete chunks and history), the EU AI Act's risk classification and human-oversight documentation, prompt-log retention, and a contractual no-training clause all reshape the architecture, not just the paperwork.",
    blocks: [
      {
        id: "secrets.keyvault",
        name: "Azure Key Vault / AWS Secrets Manager",
        tags: ["Managed"],
        pros: ["Managed rotation, access audit trail"],
        cons: ["Vendor coupling"],
      },
      {
        id: "secrets.vault",
        name: "HashiCorp Vault",
        tags: ["Multi-cloud"],
        pros: ["Multi-cloud, dynamic secrets"],
        cons: ["Operationally complex"],
      },
      {
        id: "secrets.env",
        name: ".env files",
        tags: ["Local dev only"],
        pros: ["Fine for local development"],
        cons: ["Not acceptable in production"],
      },
    ],
  },
  {
    id: "humanInLoop",
    order: 21,
    title: "Human in the Loop",
    question: "How reversible is the action the model is about to take?",
    necessity: "conditional",
    summary:
      "The most underrated block in the whole stack — and the best available answer to hallucination risk. The higher the cost of a mistake and the less reversible the action, the closer this moves toward mandatory confirmation.",
    blocks: [
      {
        id: "hitl.full",
        name: "Fully automatic",
        tags: ["Lowest friction"],
        pros: ["No delay, no reviewer load"],
        cons: ["No safety net if the model is wrong"],
      },
      {
        id: "hitl.sample",
        name: "Automatic with post-hoc sampled review",
        tags: ["Balanced"],
        pros: ["Catches drift without slowing every request"],
        cons: ["Errors still reach the end user before review"],
      },
      {
        id: "hitl.confirm",
        name: "Mandatory confirmation before action",
        tags: ["High-stakes default"],
        pros: ["Nothing irreversible happens without a person"],
        cons: ["Adds friction and latency to every action"],
      },
      {
        id: "hitl.edit",
        name: "Proposal with mandatory human edit",
        tags: ["Regulated processes"],
        pros: ["Best fit for regulated, high-cost-of-error processes"],
        cons: ["Slowest option, needs reviewer capacity"],
      },
    ],
  },
];

export const architectureIntro = {
  eyebrow: "System Design Reference",
  title: "The Architecture Layer Catalogue",
  dek: "Twenty-one layers that recur across enterprise AI systems, and the tool options available at each one — with the trade-offs that actually decide between them. A working reference I keep for myself, current as at July 2026: the layers are stable, the tool lists are not, and a catalogue like this is out of date in parts by the time anyone reads it. Where a layer was genuinely decided rather than merely listed, it links to the case note that decided it — that note is the useful half, and this page is the index.",
};

/**
 * The case note where a layer stopped being a list of options and became a
 * decision.
 *
 * A catalogue of tools with pros and cons is the most commoditised thing in
 * this field, and on its own it works against what this site claims: that the
 * artefact is the reasoning, and that reasoning only exists in a context. These
 * links are what turn the catalogue into an index into the notes rather than a
 * second encyclopaedia sitting beside them.
 *
 * Deliberately partial. A link is only worth following where a note argued the
 * choice out, so most layers have none — adding one everywhere would restore
 * exactly the sameness the links exist to break. Keyed by layer id and kept
 * here rather than inside each layer, so the whole mapping can be read at once.
 */
export const layerCaseNotes: Record<string, { slug: string; title: string; note: string }> = {
  channel: {
    slug: "ai-patient-communication-platform",
    title: "AI Patient Communication Platform",
    note: "Three channels at once, where the per-conversation pricing and the 24-hour session window of one of them shaped the routing design rather than the interface.",
  },
  identity: {
    slug: "enterprise-knowledge-assistant",
    title: "Enterprise Knowledge Assistant",
    note: "Where the general rule above — filter at retrieval, not in the prompt — turned out to be necessary and insufficient, because some documents' existence is itself restricted and a shortened result list is a disclosure.",
  },
  messaging: {
    slug: "ai-meeting-assistant",
    title: "AI Meeting Assistant",
    note: "An asynchronous pipeline where the queue carries work that must expire — audio and transcripts on a thirty-day clock, candidates on a seventy-two-hour one — while what it produces has to outlive both.",
  },
  cache: {
    slug: "enterprise-knowledge-assistant",
    title: "Enterprise Knowledge Assistant",
    note: "The one case where a cache key is a security control: leave the permission scope out of it and the cache becomes the leak that retrieval was designed to prevent.",
  },
  parsing: {
    slug: "enterprise-knowledge-assistant",
    title: "Enterprise Knowledge Assistant",
    note: "A corpus where tables are the content rather than an aid to it, which makes extraction a separate pipeline stage with its own index and its own evaluation.",
  },
  retrieval: {
    slug: "ai-contract-intelligence",
    title: "AI Contract Intelligence",
    note: "Where retrieval quality stops being the question. A citation can prove a clause exists and still not prove it is the whole of what was agreed.",
  },
  llm: {
    slug: "real-time-payment-fraud-decisioning",
    title: "Real-Time Payment Fraud Decisioning",
    note: "The note that keeps a language model out of the decision entirely and gives it the explanation instead — because the decision has to be reproducible, attributable and returned in tens of milliseconds.",
  },
  guardrails: {
    slug: "ai-patient-communication-platform",
    title: "AI Patient Communication Platform",
    note: "A boundary that cannot be crossed under any circumstances, and why enforcing it in routing is worth more than enforcing it in a prompt.",
  },
  observability: {
    slug: "real-time-payment-fraud-decisioning",
    title: "Real-Time Payment Fraud Decisioning",
    note: "Where a decision has to be reconstructable months later from a logged input and a version number, which turns observability from operations tooling into a regulatory obligation.",
  },
  costControl: {
    slug: "ai-patient-communication-platform",
    title: "AI Patient Communication Platform",
    note: "The case where cost per request decides the architecture rather than reporting on it — most volume never reaching a model is the whole economic argument.",
  },
  infrastructure: {
    slug: "real-time-payment-fraud-decisioning",
    title: "Real-Time Payment Fraud Decisioning",
    note: "The only note here that leaves the cloud on part of its path, and the one that explains what a hard latency budget does to a deployment choice.",
  },
  secrets: {
    slug: "ai-meeting-assistant",
    title: "AI Meeting Assistant",
    note: "Compliance as a shape rather than a control: the deliverable the works council cared about was the absence of a table that could aggregate by person.",
  },
  humanInLoop: {
    slug: "ai-meeting-assistant",
    title: "AI Meeting Assistant",
    note: "The strongest form of this layer: the human is not reviewing an answer but creating the fact. Nothing reaches the tracker until the person it is attributed to confirms it, and an unconfirmed candidate is deleted rather than filed.",
  },
};
