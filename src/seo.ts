// src/seo.ts
// Machine-readable versions of the site content, injected at build time by
// scripts/prerender.js so they always stay in sync with src/data.
import {
  personalInfo,
  education,
  experience,
  projects,
  skills,
  skillCategories,
} from "@/data";

const siteUrl = `${personalInfo.website}/`;
const currentRole = experience[0];
const institutions = [...new Set(education.map((item) => item.institution))];
const keySkills = Object.values(skills)
  .flat()
  .filter((skill) => skill.isBold)
  .map((skill) => skill.name);

// JSON-LD (schema.org) describing the site and the person behind it
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: personalInfo.name,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}#profilepage`,
      url: siteUrl,
      name: `${personalInfo.name} | Personal Website`,
      isPartOf: { "@id": `${siteUrl}#website` },
      mainEntity: { "@id": `${siteUrl}#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: personalInfo.name,
      alternateName: personalInfo.shortName,
      url: siteUrl,
      email: `mailto:${personalInfo.email}`,
      description: personalInfo.bio,
      jobTitle: currentRole.position,
      worksFor: { "@type": "Organization", name: currentRole.company },
      alumniOf: institutions.map((name) => ({
        "@type": "CollegeOrUniversity",
        name,
      })),
      knowsAbout: keySkills,
      sameAs: [personalInfo.github, personalInfo.linkedin],
    },
  ],
};

// llms.txt (https://llmstxt.org) gives AI assistants a plain-text summary
export const llmsTxt = [
  `# ${personalInfo.name}`,
  `> ${personalInfo.bio}`,
  `${personalInfo.name} (${personalInfo.shortName}) is currently ${currentRole.position} at ${currentRole.company}. ${personalInfo.title}.`,
  [
    "## Links",
    `- [Website](${siteUrl}): Portfolio with experience, projects, and skills`,
    `- [GitHub](${personalInfo.github})`,
    `- [LinkedIn](${personalInfo.linkedin})`,
    `- [Email](mailto:${personalInfo.email})`,
  ].join("\n"),
  [
    "## Experience",
    ...experience.map(
      (job) =>
        `- **${job.position}, ${job.company}** (${job.duration}): ${job.description}`
    ),
  ].join("\n"),
  [
    "## Education",
    ...education.map(
      (item) => `- ${item.degree}, ${item.institution} (${item.duration})`
    ),
  ].join("\n"),
  [
    "## Projects",
    ...projects.map(
      (project) =>
        `- **${project.title}**: ${project.description} (${project.technologies.join(", ")})`
    ),
  ].join("\n"),
  [
    "## Skills",
    ...skillCategories.map(
      (category) =>
        `- ${category.title}: ${skills[category.key]
          .map((skill) => skill.name)
          .join(", ")}`
    ),
  ].join("\n"),
].join("\n\n") + "\n";
