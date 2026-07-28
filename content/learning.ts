// Generated content module. Edit freely — this is the CMS layer.
import type { Learning } from "./types";

export const learning: Learning = {
  "eyebrow": "Learning Journey",
  "title": "A 1,000-hour roadmap to Enterprise AI Solutions Architect.",
  "lede": "This page is deliberately transparent. It shows what is already solid, what is actively being built, and what is still ahead — tracked in hours against a real six-week sprint plan. I would rather a hiring manager see the honest curve than a wall of logos.",
  "totals": {
    "target": 1000,
    "scheduled": 300,
    "remaining": 700,
    "sprintWeeks": 6,
    "hoursPerWeek": 50
  },
  "sprint": {
    "label": "Current sprint · 6 weeks · 50 h / week",
    "weeks": [
      "20.07–26.07",
      "27.07–02.08",
      "03.08–09.08",
      "10.08–16.08",
      "17.08–23.08",
      "24.08–30.08"
    ]
  },
  "skills": [
    {
      "name": "Python",
      "target": 250,
      "scheduled": 100,
      "weeks": [
        "30",
        "20",
        "15",
        "15",
        "10",
        "10"
      ],
      "group": "Foundation",
      "state": "building"
    },
    {
      "name": "Git + GitHub",
      "target": 40,
      "scheduled": 17,
      "weeks": [
        "2",
        "10",
        "5",
        "0",
        "0",
        "0"
      ],
      "group": "Foundation",
      "state": "solid"
    },
    {
      "name": "OpenAI / Anthropic APIs",
      "target": 80,
      "scheduled": 25,
      "weeks": [
        "0",
        "10",
        "10",
        "0",
        "0",
        "0"
      ],
      "group": "AI",
      "state": "building"
    },
    {
      "name": "RAG",
      "target": 80,
      "scheduled": 5,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "5",
        "0"
      ],
      "group": "AI",
      "state": "next"
    },
    {
      "name": "AI Agents",
      "target": 80,
      "scheduled": 12,
      "weeks": [
        "2",
        "0",
        "5",
        "5",
        "0",
        "0"
      ],
      "group": "AI",
      "state": "building"
    },
    {
      "name": "MCP",
      "target": 40,
      "scheduled": 5,
      "weeks": [
        "0",
        "0",
        "5",
        "0",
        "0",
        "0"
      ],
      "group": "AI",
      "state": "next"
    },
    {
      "name": "n8n / Make",
      "target": 50,
      "scheduled": 22,
      "weeks": [
        "2",
        "0",
        "5",
        "5",
        "0",
        "10"
      ],
      "group": "Automation",
      "state": "solid"
    },
    {
      "name": "SQL",
      "target": 40,
      "scheduled": 20,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "10",
        "10"
      ],
      "group": "Data",
      "state": "building"
    },
    {
      "name": "Docker",
      "target": 50,
      "scheduled": 10,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "10",
        "0"
      ],
      "group": "Platform",
      "state": "next"
    },
    {
      "name": "FastAPI",
      "target": 50,
      "scheduled": 10,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "10",
        "0"
      ],
      "group": "Backend",
      "state": "next"
    },
    {
      "name": "REST API",
      "target": 40,
      "scheduled": 10,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "10",
        "0"
      ],
      "group": "Backend",
      "state": "building"
    },
    {
      "name": "System Design",
      "target": 60,
      "scheduled": 35,
      "weeks": [
        "10",
        "5",
        "5",
        "5",
        "0",
        "10"
      ],
      "group": "Architecture",
      "state": "building"
    },
    {
      "name": "AI Architecture",
      "target": 60,
      "scheduled": 29,
      "weeks": [
        "4",
        "5",
        "5",
        "5",
        "0",
        "10"
      ],
      "group": "Architecture",
      "state": "building"
    },
    {
      "name": "Azure AI",
      "target": 80,
      "scheduled": 0,
      "weeks": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0"
      ],
      "group": "Cloud",
      "state": "next"
    }
  ],
  "tracks": [
    {
      "t": "Already solid",
      "state": "solid",
      "items": [
        "Project management · Agile / Scrum",
        "Stakeholder management",
        "Cost control & budgeting",
        "Excel / VBA automation",
        "Power BI",
        "ERP implementation",
        "Git / GitHub",
        "Make · n8n",
        "LLM usage at a practitioner level"
      ]
    },
    {
      "t": "Actively building",
      "state": "building",
      "items": [
        "Python (application level)",
        "REST API design",
        "FastAPI",
        "SQL / PostgreSQL",
        "System design",
        "AI architecture patterns",
        "Agent orchestration",
        "Streamlit prototyping"
      ]
    },
    {
      "t": "Next up",
      "state": "next",
      "items": [
        "RAG · embeddings · vector DBs",
        "Azure cloud-native & serverless",
        "Docker / Kubernetes",
        "Redis & queues",
        "MCP · A2A protocols",
        "OAuth / JWT",
        "CI/CD · DevSecOps",
        "Cost governance tooling"
      ]
    }
  ],
  "milestones": [
    {
      "q": "Q3 2026",
      "t": "Foundation + first three case studies shipped",
      "d": "Python to application level, FastAPI service in production, RAG pipeline with citations, Case 01–03 live with working demos."
    },
    {
      "q": "Q4 2026",
      "t": "Cloud & platform",
      "d": "Azure AI Foundry, containerised deployment, CI/CD pipeline, observability and cost dashboards. Case 04–07."
    },
    {
      "q": "Q1 2027",
      "t": "Agentic architecture",
      "d": "Multi-agent orchestration, MCP tool servers, enterprise identity and access boundaries. Case 08–10."
    },
    {
      "q": "Q2 2027",
      "t": "Market",
      "d": "Portfolio complete, resume and LinkedIn repositioned around AI solution architecture, active search for remote US roles with EU fallback."
    }
  ]
};
