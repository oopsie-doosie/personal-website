// src/data/index.ts
// All site content lives here. The page, the JSON-LD structured data and
// llms.txt are all generated from these values (see src/seo.ts).

export const personalInfo = {
  name: "Yuksel Polat Akbiyik",
  shortName: "Polat",
  role: "Co-Founder & CTO",
  company: "Arbwick",
  location: "Los Angeles, CA",
  email: "ypolat99yupa@gmail.com",
  github: "https://github.com/oopsie-doosie/",
  linkedin: "https://www.linkedin.com/in/ypolat99/",
  website: "https://www.ypolat.com",
  summary:
    "Software engineer with 4 years in regulated finance, 3.5 at Goldman Sachs and now sole technical founder of an AI research platform for institutional investors. Ships agentic workflows end to end, from scoping ambiguous problems with customers to building the tool, evaluation, and audit layers that make them production ready.",
  intro:
    "I'm the co-founder & CTO of Arbwick, an AI research platform for institutional investors, after 3.5 years as a software engineer at Goldman Sachs. I ship agentic workflows end to end, from scoping ambiguous problems with customers to the tool, evaluation, and audit layers that make them production ready.",
};

// Shown in the hero's "whoami" terminal
export const facts = [
  { label: "name", value: "Yuksel Polat Akbiyik" },
  { label: "goes by", value: "Polat" },
  { label: "based in", value: "Los Angeles, CA" },
  { label: "now", value: "Co-Founder & CTO, Arbwick" },
  { label: "before", value: "Software Engineer, Goldman Sachs" },
  { label: "studied", value: "CS + Economics, UCLA" },
  { label: "builds", value: "AI agents for institutional finance" },
  { label: "codes in", value: "Python · TypeScript · SQL" },
  { label: "off hours", value: "tennis · snowboarding · F1" },
];

export const stats = [
  { value: "4", unit: "yrs", label: "in regulated finance" },
  { value: "300", unit: "+", label: "agent functions, loaded on demand" },
  { value: "130", unit: "M", label: "rows of market data from 17 vendors" },
  { value: "200", unit: "k+", label: "client reports a day at Goldman Sachs" },
];

export interface Highlight {
  icon: string;
  title: string;
  text: string;
  metric?: string;
  metricLabel?: string;
  // Arbwick bento layout: 2 = wide card, 3 = full-width card on desktop
  span?: 2 | 3;
  // Small diagram shown on wide cards
  visual?: "stack" | "pipeline" | "reference";
}

export const experience: {
  company: string;
  monogram: string;
  role: string;
  period: string;
  summary: string;
  // Optional intro shown next to the animated agent-run terminal
  showcase?: { title: string; text: string };
  highlights: Highlight[];
}[] = [
  {
    company: "Arbwick",
    monogram: "Aw",
    role: "Co-Founder & CTO",
    period: "Apr 2026 — Present",
    summary: "AI research platform for institutional investors",
    showcase: {
      title: "A thesis in, a defensible report out",
      text: "Describe an investment idea in plain English. The agent plans the analyses, loads only the tools it needs, runs independent branches in parallel against live market data, and returns a backtested report where every figure traces back to the query that produced it.",
    },
    highlights: [
      {
        icon: "boxes",
        title: "The whole product, built solo",
        text: "Sole engineer on the entire product: FastAPI backend, React/TypeScript SPA, 40+ pipelines ingesting 17 data vendors into a 130M-row time-series store, plus multi-tenant access control, usage-based billing, and production monitoring.",
        metric: "130M rows · 17 vendors",
        span: 2,
        visual: "stack",
      },
      {
        icon: "users",
        title: "Designed with the people who use it",
        text: "Work directly with portfolio managers and analysts to identify which parts of their research an agent can reliably take over, agree on what counts as working, then build and ship it.",
      },
      {
        icon: "layers",
        title: "300+ tools, no accuracy collapse",
        text: "Scaled the agent to 300+ analytical functions across 50 modules without the selection-accuracy collapse that caps most agent systems, by having it load tool definitions on demand instead of carrying the full catalog in context.",
        metric: "300+ functions",
      },
      {
        icon: "flask",
        title: "Quant logic as tested code",
        text: "Built the quantitative function library the agent reasons over, implementing valuation, risk, and factor logic as tested code rather than prompt instructions, so every number in a report is reproducible and defensible to a client.",
      },
      {
        icon: "checks",
        title: "Evals before every change",
        text: "Keep a fixed set of validated queries the system is re-run against before every prompt or model change, so accuracy regressions surface before customers see them.",
      },
      {
        icon: "workflow",
        title: "From plain-English thesis to backtested report",
        text: "Architected the orchestration layer: the system takes an investment thesis written in plain English, plans the analyses needed, runs them in dependency order against live market data, and returns a backtested report. Running independent branches in parallel cut runtime 27%.",
        metric: "−27% runtime",
        span: 2,
        visual: "pipeline",
      },
      {
        icon: "shield",
        title: "Auditable by design",
        text: "Made agent output auditable for a compliance-sensitive audience. Every figure in a report traces to the query that produced it and re-verifies against live data in one click, with per-request tracing across the full agent trajectory.",
        metric: "1-click re-verify",
      },
      {
        icon: "network",
        title: "Context passed by reference",
        text: "Passed large intermediate results between stages by reference rather than through the prompt, keeping context small across long chains where naive prompt-chaining silently drops data, with caching and per-call cost attribution over the same path.",
        span: 3,
        visual: "reference",
      },
    ],
  },
  {
    company: "Goldman Sachs",
    monogram: "GS",
    role: "Software Engineer, Associate",
    period: "Sep 2022 — Apr 2026",
    summary: "Client reporting and document automation",
    highlights: [
      {
        icon: "gauge",
        title: "v2 client reporting engine",
        text: "Designed and shipped the v2 client reporting engine (25+ tables) rendering 200k+ reports daily for institutional clients, working with stakeholders to add dynamic grouping and sorting for accounts at 20k+ pages/day.",
        metric: "200k+",
        metricLabel: "reports a day",
      },
      {
        icon: "fileSearch",
        title: "Document parsing",
        text: "Engineered an Apache PDFBox parser extracting structured data from unstructured financial documents, cutting handling time 98% (10m to under 10s) and eliminating manual entry.",
        metric: "98%",
        metricLabel: "less handling time",
      },
      {
        icon: "testTube",
        title: "Legacy modernization",
        text: "Led a legacy modernization initiative: removed 400+ dead files and raised test coverage from 3% to 60%, unlocking daily deployments. Mentored new hires and interns through onboarding and production debugging.",
        metric: "3% → 60%",
        metricLabel: "test coverage",
      },
    ],
  },
];

export const projects = [
  {
    title: "Agentic Trade Execution MCP",
    tagline:
      "An MCP server that lets any LLM client place real orders in plain English, with guardrails on anything destructive.",
    stack: ["Python", "MCP", "React"],
    surfaces: ["Web UI", "WhatsApp"],
    highlights: [
      "Built a custom MCP server exposing an exchange-agnostic trading API to LLM clients for natural-language order execution, surfaced through both a web UI and WhatsApp.",
      "Designed the tool layer to cover the full order spectrum (perpetuals, limit and stop-loss, leverage) across equities, crypto, and commodities, with schema-level guardrails on destructive actions.",
    ],
  },
];

export const education = [
  {
    school: "University of California, Los Angeles",
    degrees: ["B.S. Computer Science", "B.A. Economics"],
    period: "Sep 2018 — Jun 2022",
    location: "Los Angeles, CA",
  },
];

export const skills = [
  {
    group: "Applied AI",
    icon: "bot",
    items: [
      "Anthropic",
      "OpenAI",
      "Gemini",
      "Agentic Workflows",
      "Plan-and-Execute",
      "ReAct",
      "Tool Use & Function Calling",
      "Custom Agent Orchestration",
      "Dynamic Tool Discovery",
      "RAG (Qdrant)",
      "Model Context Protocol (MCP)",
    ],
  },
  {
    group: "Languages",
    icon: "braces",
    items: ["Python", "TypeScript", "SQL", "Java", "C++", "JavaScript"],
  },
  {
    group: "Full Stack",
    icon: "server",
    items: [
      "FastAPI",
      "Spring Boot",
      "Postgres",
      "TimescaleDB",
      "Redis",
      "Dagster",
      "Celery",
      "Pandas/NumPy",
      "Docker",
      "React",
      "Angular",
      "Tailwind",
    ],
  },
  {
    group: "Observability & Enterprise",
    icon: "radar",
    items: [
      "Sentry",
      "PostHog",
      "Grafana",
      "Distributed Tracing",
      "Audit Logging",
      "RBAC",
    ],
  },
];

export const interests = [
  { name: "Yoga", icon: "yoga" },
  { name: "Swimming", icon: "swimming" },
  { name: "Tennis", icon: "tennis" },
  { name: "Pickleball", icon: "pickleball" },
  { name: "Hiking", icon: "hiking" },
  { name: "Reading", icon: "reading" },
  { name: "Crypto", icon: "crypto" },
  { name: "Personal Finance", icon: "finance" },
  { name: "Formula 1", icon: "f1" },
  { name: "Snowboarding", icon: "snowboarding" },
  { name: "Cocktail Making", icon: "cocktails" },
];
