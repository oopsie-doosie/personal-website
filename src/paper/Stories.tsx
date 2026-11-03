// src/paper/Stories.tsx
// The inside pages: one story per job and a technology feature per project.
import { Fragment } from "react";
import { experience, projects, type Highlight } from "@/data/index";
import { currentJob, pageOf, storyId } from "./content";
import { PenMark } from "./Pen";

export function SectionHead({ name, page }: { name: string; page: string }) {
  return (
    <div className="np-section-head">
      <span className="np-section-name">{name}</span>
      <span className="np-section-page">Page {page}</span>
    </div>
  );
}

// FIG. 1: how the agent turns a thesis into a report, as a line engraving
function Figure({ caption }: { caption: string }) {
  const branches = [44, 104, 164];
  return (
    <figure className="np-figure np-reveal">
      <svg viewBox="0 0 640 210" role="img" aria-label="Diagram: a thesis is planned, run as parallel branches, and returned as a backtested report">
        <defs>
          <pattern id="np-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" />
          </pattern>
          <marker id="np-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" />
          </marker>
        </defs>
        <g className="np-fig-box">
          <rect x="6" y="80" width="104" height="48" />
          <text x="58" y="102">Thesis</text>
          <text x="58" y="118" className="np-fig-small">plain English</text>
        </g>
        <g className="np-fig-box">
          <rect x="160" y="80" width="104" height="48" />
          <text x="212" y="102">Plan</text>
          <text x="212" y="118" className="np-fig-small">tools on demand</text>
        </g>
        <line x1="110" y1="104" x2="158" y2="104" markerEnd="url(#np-arrow)" />
        {branches.map((y, i) => (
          <g key={y} className="np-fig-box">
            <path d={`M264,104 C290,104 288,${y} 316,${y}`} markerEnd="url(#np-arrow)" className="np-fig-wire" />
            <rect x="318" y={y - 20} width="128" height="40" className="np-fig-hatched" />
            <text x="382" y={y + 5}>Branch {String.fromCharCode(65 + i)}</text>
            <path d={`M446,${y} C474,${y} 472,104 500,104`} markerEnd="url(#np-arrow)" className="np-fig-wire" />
          </g>
        ))}
        <g className="np-fig-box np-fig-final">
          <rect x="502" y="72" width="132" height="64" />
          <text x="568" y="98">Backtested</text>
          <text x="568" y="116">report</text>
        </g>
        <text x="382" y="200" className="np-fig-small">in parallel, on live market data</text>
      </svg>
      <figcaption>
        <strong>Fig. 1.</strong> {caption}
      </figcaption>
    </figure>
  );
}

function ByTheNumbers({ rows, highlightFirst }: { rows: Highlight[]; highlightFirst: boolean }) {
  return (
    <aside className="np-box np-numbers np-reveal" aria-label="By the numbers">
      <p className="np-box-title">By the numbers</p>
      <ul>
        {rows.map((row, i) => {
          const value = <span className="np-number">{row.metric}</span>;
          // The editor's pen finds the biggest number on the page
          const marked =
            highlightFirst && i === 0 ? (
              <PenMark note="not bad!">{value}</PenMark>
            ) : row.visual === "pipeline" ? (
              <PenMark shape="underline" note="faster!">
                {value}
              </PenMark>
            ) : (
              value
            );
          return (
            <li key={row.title}>
              {marked}
              <span className="np-number-label">{row.metricLabel ?? row.title}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export function JobStory({ index }: { index: number }) {
  const job = experience[index];
  const id = storyId(job.company);
  const isCurrent = job === currentJob;
  const numbers = job.highlights.filter((highlight) => highlight.metric);

  return (
    <section id={id} className="np-section np-story">
      <SectionHead name={isCurrent ? "Business" : "Finance"} page={pageOf(id)} />
      <div className="np-story-head np-reveal">
        <p className="np-kicker">
          {job.company} · {job.role} · {job.period}
        </p>
        <h2 className="np-head">
          {job.showcase ? job.showcase.title : `At ${job.company}, ${job.summary.toLowerCase()}`}
        </h2>
        <p className="np-deck">{job.showcase ? job.showcase.text : `${job.role}, ${job.period}.`}</p>
      </div>
      {job.showcase && (
        <Figure caption="Plan the analyses, run independent branches in parallel, return a report where every figure traces back to its query." />
      )}
      <div className="np-story-body">
        <div className="np-columns">
          {job.highlights.map((highlight) => (
            <Fragment key={highlight.title}>
              <h3 className="np-subhead">{highlight.title}</h3>
              <p>{highlight.text}</p>
            </Fragment>
          ))}
        </div>
        {numbers.length > 0 && <ByTheNumbers rows={numbers} highlightFirst={!isCurrent} />}
      </div>
    </section>
  );
}

export function TechStory() {
  return (
    <section id="np-technology" className="np-section np-story">
      <SectionHead name="Technology" page={pageOf("np-technology")} />
      {projects.map((project) => (
        <article key={project.title} className="np-feature np-reveal">
          <p className="np-kicker">Side project</p>
          <h2 className="np-head">{project.title}</h2>
          <p className="np-deck">{project.tagline}</p>
          <div className="np-story-body">
            <div className="np-columns np-columns-2 np-dropcap">
              {project.highlights.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="np-box np-factbox">
              <p className="np-box-title">Fact box</p>
              <dl>
                <dt>Built with</dt>
                <dd>{project.stack.join(", ")}</dd>
                <dt>Available on</dt>
                <dd>{project.surfaces.join(" and ")}</dd>
              </dl>
            </aside>
          </div>
        </article>
      ))}
    </section>
  );
}
