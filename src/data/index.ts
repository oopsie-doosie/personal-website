// src/data/index.ts

export const personalInfo = {
  name: "Yuksel Polat Akbiyik",
  shortName: "Polat",
  title: "Software Engineer | Crypto Enthusiast | Personal Finance Advocate",
  email: "your.email@example.com",
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
    position: "Full Stack Developer",
    company: "Goldman Sachs",
    duration: "2022 - Present",
    description:
      "Developing high-performance financial software solutions and analytics tools that process large-scale data sets, with a focus on improving efficiency and productivity.",
    responsibilities: [
      "Designed and implemented both frontend and backend components for financial applications",
      "Automated regular tasks, reducing processing time from 25 minutes to under 2 minutes",
      "Managed and mentored an intern, providing guidance throughout their project lifecycle",
      "Serving on the New Joiners Committee to improve onboarding experience",
      "Collaborated with stakeholders to deliver end-to-end solutions",
    ],
  },
];

export const projects = [
  {
    title: "Crypto Insights: Analytics Platform for Digital Assets",
    description:
      "An analytics tool targeting hedge funds that provides deep insights into market data and trading patterns.",
    highlights: [
      "Multiple funds have expressed interest",
      "Potential 7-figure valuation",
      "Combines AI and financial expertise",
      "Pattern recognition and anomaly detection",
      "Real-time integration of on-chain metrics and macro economic signals.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "InfluxDB",
      "Docker",
      "Redis",
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
    icon: "ping-pong",
  },
  {
    name: "Hiking",
    description: "Exploring nature trails and enjoying the outdoors.",
    icon: "mountain",
  },
  {
    name: "Reading",
    description: "Avid reader of non-fiction books on technology and business.",
    icon: "book-open",
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
];
