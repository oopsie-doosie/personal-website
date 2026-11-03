// src/paper/FrontPage.tsx
// The masthead and front page: banner headline, lead story with a halftone
// "photo", and a sidebar with the markets table, a fact box and the index.
import { education, experience, facts, personalInfo, stats } from "@/data/index";
import {
  CITY,
  PAPER_NAME,
  SECTIONS,
  article,
  builds,
  currentJob,
  pageOf,
  previousJob,
  sentences,
  storyId,
  yearsInFinance,
} from "./content";
import { Halftone } from "./Halftone";

const quotes = sentences(personalInfo.intro);

// A small rising line for each row of the markets table
const sparkline = (seed: number) =>
  Array.from({ length: 9 }, (_, i) => {
    const wobble = Math.sin(i * 1.7 + seed * 2.3) * 3;
    return `${i * 7.5},${Math.max(1, 19 - i * 2 + wobble).toFixed(1)}`;
  }).join(" ");

export function Masthead() {
  const today = new Date();
  const dateline = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="np-masthead">
      <div className="np-ears">
        <div className="np-ear">
          <p className="np-ear-title">Late City Edition</p>
          <p>Agents, finance and the occasional F1 race.</p>
        </div>
        <h1 className="np-title">{PAPER_NAME}</h1>
        <div className="np-ear">
          <p className="np-ear-title">Weather</p>
          <p>{CITY}: sunny, with a strong chance of shipping.</p>
        </div>
      </div>
      <div className="np-folio">
        <span>Vol. I · No. {today.getFullYear()}</span>
        <span>
          {personalInfo.location}, {dateline}
        </span>
        <span>Price: one click</span>
      </div>
    </header>
  );
}

export function FrontPage() {
  const headline = previousJob
    ? `Local engineer leaves ${previousJob.company} to build ${builds}`
    : `Local engineer builds ${builds}`;

  return (
    <section className="np-front" aria-label="Front page">
      <div className="np-banner np-reveal">
        <span className="np-extra" aria-hidden="true">
          Extra!
        </span>
        <h2 className="np-banner-head">{headline}</h2>
        <p className="np-deck">
          {personalInfo.name}, {personalInfo.role} of {personalInfo.company},{" "}
          {article(currentJob.summary)} {currentJob.summary}
          {yearsInFinance ? `, brings ${yearsInFinance.value} years in regulated finance to the job.` : "."}
        </p>
      </div>

      <div className="np-front-grid">
        <article className="np-lead">
          <figure className="np-photo np-reveal">
            <Halftone scene="city" label={`Illustration: sundown over ${CITY}`} />
            <figcaption>
              Sundown over {CITY}, where {personalInfo.shortName} is based.{" "}
              <span>Illustration by {PAPER_NAME}</span>
            </figcaption>
          </figure>
          <p className="np-byline">By the {PAPER_NAME.replace(/^The /, "")} staff</p>
          <div className="np-columns np-dropcap">
            <p>
              <span className="np-dateline">{CITY} —</span> {personalInfo.summary}
            </p>
            {quotes[1] && (
              <blockquote className="np-pullquote">
                <p>“{quotes[1]}”</p>
                <cite>{personalInfo.name}</cite>
              </blockquote>
            )}
            <p>{quotes[0]}</p>
            <p className="np-jump">
              Continued on <a href={`#${SECTIONS[0].id}`}>Page {SECTIONS[0].page}</a>
            </p>
          </div>

          <section className="np-briefs np-reveal" aria-label="In brief">
            <p className="np-briefs-title">In brief</p>
            <div className="np-briefs-grid">
              {experience.map((job) => {
                const lead = job.highlights.find((highlight) => highlight.metric);
                return (
                  <article key={job.company}>
                    <h3>{job.company}</h3>
                    <p>
                      {job.summary}.{" "}
                      {lead && `${lead.metric}${lead.metricLabel ? ` ${lead.metricLabel}` : ""}.`}{" "}
                      <a href={`#${storyId(job.company)}`}>Page {pageOf(storyId(job.company))}</a>
                    </p>
                  </article>
                );
              })}
              {education.map((school) => (
                <article key={school.school}>
                  <h3>{school.school}</h3>
                  <p>
                    {school.degrees.join(" and ")}, {school.period}.{" "}
                    <a href="#np-classifieds">Page {pageOf("np-classifieds")}</a>
                  </p>
                </article>
              ))}
            </div>
          </section>
        </article>

        <aside className="np-side">
          <section className="np-box np-markets np-reveal" aria-label="Markets">
            <p className="np-box-title">Markets</p>
            <p className="np-box-sub">At the close</p>
            <table>
              <tbody>
                {stats.map((stat, i) => (
                  <tr key={stat.label}>
                    <th scope="row">{stat.label}</th>
                    <td className="np-markets-value">
                      {stat.value}
                      {stat.unit}
                      <span aria-label="up"> ▲</span>
                    </td>
                    <td aria-hidden="true">
                      <svg viewBox="0 0 60 22" className="np-spark">
                        <polyline points={sparkline(i)} />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="np-box np-reveal" aria-label="At a glance">
            <p className="np-box-title">At a glance</p>
            <dl className="np-glance">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav className="np-box np-index np-reveal" aria-label="Inside this edition">
            <p className="np-box-title">Inside</p>
            <ol>
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                  <span>{section.page}</span>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </section>
  );
}
