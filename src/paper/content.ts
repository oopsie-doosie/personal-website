// src/paper/content.ts
// Newspaper copy derived from src/data, shared by the edition's sections.
import { experience, facts, personalInfo, stats } from "@/data/index";
import { slug } from "./hooks";

export const PAPER_NAME = `The ${personalInfo.shortName} Times`;
export const CITY = personalInfo.location.split(",")[0];

export const currentJob = experience.find((job) => /present/i.test(job.period)) ?? experience[0];
export const previousJob = experience.find((job) => job !== currentJob);
export const builds = facts.find((fact) => fact.label === "builds")?.value ?? "software";
export const yearsInFinance = stats.find((stat) => stat.unit === "yrs");

export const article = (text: string) => (/^(AI\b|[aeiou])/i.test(text) ? "an" : "a");

// Split on sentence ends without breaking numbers like "3.5"
export const sentences = (text: string) =>
  text.replace(/([.!?])\s+(?=[A-Z])/g, "$1\u0000").split("\u0000");

export const storyId = (company: string) => `np-${slug(company)}`;

// Sections listed in the front-page index, in print order
export const SECTIONS = [
  ...experience.map((job, i) => ({
    id: storyId(job.company),
    title: job.company,
    page: i === 0 ? "A2" : `B${i}`,
  })),
  { id: "np-technology", title: "Technology", page: "C1" },
  { id: "np-classifieds", title: "Classifieds", page: "D1" },
  { id: "np-leisure", title: "Leisure & puzzles", page: "D2" },
  { id: "np-letters", title: "Letters to the editor", page: "D3" },
];

export const pageOf = (id: string) => SECTIONS.find((section) => section.id === id)?.page ?? "";
