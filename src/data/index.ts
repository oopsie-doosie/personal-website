// src/data/index.ts

export const personalInfo = {
  name: "Yuksel Polat Akbiyik",
  shortName: "Polat",
  title: "Software Engineer | Crypto Enthusiast | Personal Finance Advocate",
  email: "ypolat99yupa@gmail.com",
  github: "https://github.com/oopsie-doosie/",
  linkedin: "https://www.linkedin.com/in/ypolat99/",
  bio: "UCLA graduate with dual degrees in Computer Science and Economics, currently working at Goldman Sachs and developing innovative AI solutions.",
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Los Angeles (UCLA)",
    duration: "2018 - 2022",
    description:
      "Focused on ML, AI, Data Sciene and software engineering principles. Developed a strong foundation in algorithms, data structures.",
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
    position: "Software Engineer",
    company: "Goldman Sachs",
    duration: "September 2022 - Present",
    description:
      "Developing high-performance financial software solutions and analytics tools that process large-scale data sets.",
    responsibilities: [
      "Designed and implemented core components of the v2 reporting engine (25+ tables) to drive the rendering of 200k+ daily reports.",
      "Identified a critical workflow bottleneck and engineered a parsing engine using Apache PDFBox, reducing processing time by 98% (10m to <10s).",
      "Engineered a self-service migration platform with a React UI, reducing operation time by 90% and enabling safe, one-click deployments.",
      "Developed reusable internal Java libraries adopted by 3+ teams, reducing boilerplate code by standardizing error handling.",
      "Led a legacy codebase modernization effort, removing 400+ unused files and increasing test coverage from 3% to 60%.",
    ],
  },
  {
    position: "Software Engineering Intern",
    company: "Appreciate",
    duration: "March 2022 - June 2022",
    description: "Optimized backend endpoints and built image filtering services.",
    responsibilities: [
      "Optimized Python (Flask) endpoints by implementing a tiered Redis caching strategy, reducing P99 latency by 70%.",
      "Built high-performance image filtering services on Google Cloud Platform (GCP), achieving >80% accuracy in automated content moderation.",
    ],
  },
];

export const projects = [
  {
    title: "Hermes Labs",
    description:
      "A high-performance crypto analytics dashboard providing deep insights into market data and trading patterns.",
    highlights: [
      "Architected end-to-end stack using Python (FastAPI), React/Vite, and PostgreSQL/Supabase.",
      "Engineered scalable pipeline processing 1M+ daily data points with sharded architecture.",
      "Achieved 60x reduction in API latency (40s to <1s) using multi-layered caching and materialized views.",
      "Built distributed social sentiment pipeline with LLM-based analysis for crypto signals.",
      "Established CI/CD pipelines and DevOps strategy using Netlify and Cloudflare.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Railway",
    ],
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
    { name: "JavaScript", isBold: true },
    { name: "Python", isBold: true },
    { name: "R", isBold: false },
    { name: "Java", isBold: false },
    { name: "C++", isBold: false },
  ],
  frontend: [
    { name: "React", isBold: true },
    { name: "Angular", isBold: true },
    { name: "HTML", isBold: true },
    { name: "Tailwind CSS", isBold: false },
    { name: "CSS", isBold: false },
    { name: "Framer Motion", isBold: false },
  ],
  backend: [
    { name: "Spring Boot", isBold: true },
    { name: "FastAPI", isBold: true },
    { name: "Node.js", isBold: false },
    { name: "Express", isBold: false },
    { name: "Flask", isBold: false },
  ],
  databases: [
    { name: "PostgreSQL", isBold: true },
    { name: "MySQL", isBold: false },
    { name: "InfluxDB", isBold: true },
    { name: "DB2", isBold: false },
    { name: "Sybase IQ", isBold: false },
  ],
  deployment: [
    { name: "Vercel", isBold: true },
    { name: "Netlify", isBold: true },
    { name: "Railway", isBold: false },
    { name: "Render", isBold: false },
    { name: "Git", isBold: true },
    { name: "Docker", isBold: false },
    { name: "AWS", isBold: false },
  ],
  other: [
    { name: "Machine Learning", isBold: false },
    { name: "Data Analysis", isBold: true },
    { name: "Financial Modeling", isBold: true },
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
