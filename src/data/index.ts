// src/data/index.ts

export const personalInfo = {
  name: "Your Name",
  title: "Software Engineer & AI Enthusiast",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  bio: "UCLA graduate with dual degrees in Computer Science and Economics, currently working at Goldman Sachs and developing innovative AI solutions.",
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Los Angeles (UCLA)",
    duration: "2018 - 2022",
    description: "Double majored in Computer Science and Economics",
  },
];

export const experience = [
  {
    position: "Software Engineer",
    company: "Goldman Sachs",
    duration: "2022 - Present",
    description:
      "Developing high-performance financial software solutions and analytics tools.",
    responsibilities: [
      "Designed and implemented trading algorithms",
      "Optimized data processing pipelines",
      "Collaborated with stakeholders to deliver solutions",
    ],
  },
];

export const projects = [
  {
    title: "AI Analytics Platform for Hedge Funds",
    description:
      "An analytics tool targeting hedge funds that provides deep insights into market data and trading patterns.",
    highlights: [
      "Multiple funds have expressed interest",
      "Potential 7-figure valuation",
      "Combines AI and financial expertise",
    ],
    technologies: ["React", "TypeScript", "Python", "TensorFlow", "AWS"],
  },
  {
    title: "Personal Anonymous Blog",
    description:
      "A detailed personal blog with a focus on technical topics and industry insights.",
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
    { name: "Java", isBold: false },
    { name: "C++", isBold: false },
  ],
  frontend: [
    { name: "React", isBold: true },
    { name: "Tailwind CSS", isBold: true },
    { name: "HTML", isBold: true },
    { name: "CSS", isBold: true },
    { name: "Framer Motion", isBold: false },
  ],
  backend: [
    { name: "Node.js", isBold: true },
    { name: "Express", isBold: true },
    { name: "Django", isBold: false },
    { name: "Flask", isBold: false },
  ],
  databases: [
    { name: "MongoDB", isBold: true },
    { name: "PostgreSQL", isBold: true },
    { name: "MySQL", isBold: false },
  ],
  tools: [
    { name: "Git", isBold: true },
    { name: "Docker", isBold: true },
    { name: "AWS", isBold: false },
    { name: "Azure", isBold: false },
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
];
