// src/data/index.ts

export const personalInfo = {
  name: "Yuksel Polat Akbiyik",
  shortName: "Polat",
  title: "Software Engineer | Crypto Enthusiast | Personal Finance Advocate",
  email: "ypolat99yupa@gmail.com",
  github: "https://github.com/oopsie-doosie/",
  linkedin: "https://www.linkedin.com/in/ypolat99/",
  bio: "UCLA graduate with dual degrees in Computer Science and Economics, currently building ArbWick and developing innovative AI solutions.",
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Los Angeles (UCLA)",
    duration: "2018 - 2022",
    description:
      "Focused on ML, AI, Data Science and software engineering principles. Developed a strong foundation in algorithms and data structures.",
  },
  {
    degree: "Bachelor of Arts in Economics",
    institution: "University of California, Los Angeles (UCLA)",
    duration: "2018 - 2022",
    description: "Specialized in econometrics and quantitative analysis",
  },
];

export const experience = [
  {
    position: "Co-Founder & CTO",
    company: "ArbWick",
    duration: "April 2026 - Present",
    description:
      "Building an advanced AI agent framework and data analytics platform for market intelligence to automate financial workflows.",
    responsibilities: [
      "Architected a highly scalable AI agent framework utilizing FastAPI and multiple LLM providers to autonomously execute context aware tasks and interact with production databases.",
      "Engineered an idempotent incremental data ingestion pipeline that synchronizes millions of data points daily while significantly optimizing database load times and API rate limits.",
      "Developed a dynamic responsive frontend dashboard leveraging React and Zustand to support complex multi metric data visualizations and interactive drag and drop grid layouts.",
      "Built a comprehensive real time Skills Library and metric catalog utilizing advanced caching layers and materialized database views to guarantee sub ten millisecond query latencies.",
      "Led cross-functional product design, day-to-day operations, and technical strategy in close collaboration with the non-technical co-founder to align engineering with business goals."
    ],
  },
  {
    position: "Software Engineer",
    company: "Goldman Sachs",
    duration: "September 2022 - April 2026",
    description:
      "Developing high-performance financial software solutions and analytics tools that process large-scale data sets.",
    responsibilities: [
      "Designed and implemented core components of the v2 reporting engine (25+ tables) to drive the rendering of 200k+ daily reports.",
      "Identified a critical workflow bottleneck and engineered a parsing engine using Apache PDFBox, reducing processing time by 98% (10m to <10s).",
      "Engineered a self-service migration platform with a React UI, reducing operation time by 90% and enabling safe, one-click deployments.",
      "Developed reusable internal Java libraries adopted by 3+ teams, reducing boilerplate code by standardizing error handling.",
      "Led a legacy codebase modernization effort, removing 400+ unused files and increasing test coverage from 3% to 60%."
    ],
  },
  {
    position: "Software Engineering Intern",
    company: "Appreciate",
    duration: "March 2022 - June 2022",
    description:
      "Optimized backend endpoints and built image filtering services.",
    responsibilities: [
      "Optimized Python (Flask) endpoints by implementing a tiered Redis caching strategy, reducing P99 latency by 70%.",
      "Built a high-performance image filtering services on Google Cloud Platform (GCP), achieving >80% accuracy in automated content moderation."
    ],
  },
];

export const projects = [
  {
    title: "Real-Time Market Signal Engine",
    description:
      "A sub-second signal generation engine that processes live financial streams for autonomous trading.",
    highlights: [
      "Built an asynchronous Python engine to ingest live data and continuously evaluate complex user conditions like price thresholds and ratio triggers.",
      "Optimized evaluation using O(1) in-memory lookups to process hundreds of concurrent rules with sub-millisecond latency.",
      "Designed an extensible architecture where the alert layer can be seamlessly swapped for direct automated order execution."
    ],
    technologies: ["Python", "Asyncio", "WebSockets"],
  },
  {
    title: "Dynamic Dashboard Engine",
    description:
      "A modular, responsive dashboard building platform for complex multi-metric data visualization.",
    highlights: [
      "Implemented a flexible React-based widget system with drag and drop grid layouts and Zustand for seamless state synchronization.",
      "Utilized Recharts and lightweight-charts for performant rendering of complex multi-metric time series data across dual Y-axes.",
      "Integrated an AI assistant to enable natural language generation of fully formed, interactive dashboards."
    ],
    technologies: ["React", "Zustand", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Personal Anonymous Blog",
    description:
      "A detailed personal blog with a focus on technical topics and industry insights.",
    highlights: [
      "Personal journal with book reviews, travel logs, and monthly finance updates",
      "Minimalist and responsive design with dark/light mode that is ready for expansion",
      "Personal experiment to improve writing skills and document life journey",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Sanity.io"],
  },
];

// Updated skills with isBold property for highlighting key skills
export interface Skill {
  name: string;
  isBold: boolean;
}

export const skills = {
  languages: [
    { name: "TypeScript", isBold: true },
    { name: "Python", isBold: true },
    { name: "JavaScript", isBold: true },
    { name: "SQL", isBold: true },
    { name: "Java", isBold: false },
    { name: "C++", isBold: false },
  ],
  frontend: [
    { name: "React", isBold: true },
    { name: "Zustand", isBold: true },
    { name: "Tailwind CSS", isBold: true },
    { name: "Framer Motion", isBold: true },
    { name: "Angular", isBold: false },
    { name: "HTML/CSS", isBold: false },
  ],
  backend: [
    { name: "FastAPI", isBold: true },
    { name: "Asyncio", isBold: true },
    { name: "Spring Boot", isBold: true },
    { name: "Node.js", isBold: false },
    { name: "Express", isBold: false },
  ],
  databases: [
    { name: "PostgreSQL", isBold: true },
    { name: "TimescaleDB", isBold: true },
    { name: "Redis", isBold: true },
    { name: "InfluxDB", isBold: false },
    { name: "MySQL", isBold: false },
  ],
  deployment: [
    { name: "Docker", isBold: true },
    { name: "Vercel", isBold: true },
    { name: "Cloudflare", isBold: true },
    { name: "AWS", isBold: false },
    { name: "Git", isBold: true },
    { name: "Railway", isBold: false },
  ],
  other: [
    { name: "AI Agent Frameworks", isBold: true },
    { name: "Data Engineering", isBold: true },
    { name: "Financial Modeling", isBold: true },
    { name: "WebSockets", isBold: true },
  ],
};

export const interests = [
  {
    name: "Yoga",
    description:
      "Practicing mindfulness and flexibility through regular yoga sessions.",
    icon: "yoga",
  },
  {
    name: "Swimming",
    description: "Enjoy swimming laps for exercise and relaxation.",
    icon: "swimming",
  },
  {
    name: "Tennis",
    description: "Competitive tennis player at the amateur level.",
    icon: "tennis",
  },
  {
    name: "Pickleball",
    description: "Recently discovered and enjoying this fast-growing sport.",
    icon: "pickleball",
  },
  {
    name: "Hiking",
    description: "Exploring nature trails and enjoying the outdoors.",
    icon: "hiking",
  },
  {
    name: "Reading",
    description: "Avid reader of non-fiction books on technology and business.",
    icon: "reading",
  },
  {
    name: "Crypto",
    description:
      "Exploring blockchain technology and cryptocurrency investments.",
    icon: "crypto",
  },
  {
    name: "Personal Finance",
    description:
      "Optimizing finances and working toward FIRE while still enjoying life.",
    icon: "finance",
  },
  {
    name: "Formula 1",
    description: "Passionate follower of F1 racing, strategy, and engineering.",
    icon: "f1",
  },
  {
    name: "Snowboarding",
    description: "Chasing powder and enjoying the mountains in winter.",
    icon: "snowboarding",
  },
  {
    name: "Cocktail Making",
    description: "Experimenting with mixology and creating craft cocktails.",
    icon: "cocktails",
  },
];
