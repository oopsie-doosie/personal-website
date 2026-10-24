// src/seo.ts
// Machine-readable versions of the site content, injected at build time by
// scripts/prerender.js so they always stay in sync with src/data.
import {
  personalInfo,
  education,
  experience,
  projects,
  skills,
} from "@/data";

const siteUrl = `${personalInfo.website}/`;
const [city, region] = personalInfo.location.split(", ");

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
      description: personalInfo.summary,
      jobTitle: personalInfo.role,
      worksFor: { "@type": "Organization", name: personalInfo.company },
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region,
        addressCountry: "US",
      },
      alumniOf: education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.school,
      })),
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: [personalInfo.github, personalInfo.linkedin],
    },
  ],
};

// llms.txt (https://llmstxt.org) gives AI assistants a plain-text summary
export const llmsTxt = [
  `# ${personalInfo.name}`,
  `> ${personalInfo.summary}`,
  `${personalInfo.name} (${personalInfo.shortName}) is ${personalInfo.role} of ${personalInfo.company}, based in ${personalInfo.location}.`,
  [
    "## Links",
    `- [Website](${siteUrl}): Portfolio with experience, projects, and skills`,
    `- [GitHub](${personalInfo.github})`,
    `- [LinkedIn](${personalInfo.linkedin})`,
    `- [Email](mailto:${personalInfo.email})`,
  ].join("\n"),
  [
    "## Experience",
    ...experience.map((job) =>
      [
        `### ${job.role}, ${job.company} (${job.period})`,
        job.summary,
        ...job.highlights.map((item) => `- ${item.text}`),
      ].join("\n")
    ),
  ].join("\n\n"),
  [
    "## Projects",
    ...projects.map((project) =>
      [
        `### ${project.title} (${project.stack.join(", ")})`,
        ...project.highlights.map((item) => `- ${item}`),
      ].join("\n")
    ),
  ].join("\n\n"),
  [
    "## Education",
    ...education.map(
      (item) =>
        `- ${item.degrees.join(", ")}, ${item.school} (${item.period})`
    ),
  ].join("\n"),
  [
    "## Skills",
    ...skills.map((group) => `- ${group.group}: ${group.items.join(", ")}`),
  ].join("\n"),
].join("\n\n") + "\n";
