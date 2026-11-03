// src/paper/BackPages.tsx
// The back of the paper: classifieds (skills and education), leisure with
// the daily puzzle, letters to the editor (contact) and the colophon.
import { education, interests, personalInfo, skills } from "@/data/index";
import { PAPER_NAME, pageOf } from "./content";
import { PenMark } from "./Pen";
import { SectionHead } from "./Stories";
import { WordSearch } from "./WordSearch";

export function Classifieds() {
  return (
    <section id="np-classifieds" className="np-section">
      <SectionHead name="Classifieds" page={pageOf("np-classifieds")} />
      <div className="np-classifieds np-reveal">
        {skills.map((group) => (
          <div key={group.group} className="np-ad">
            <h3>{group.group}</h3>
            <p>
              <strong>Fluent in</strong> {group.items.join(", ")}.
            </p>
          </div>
        ))}
        {education.map((school) => (
          <div key={school.school} className="np-ad np-ad-notice">
            <h3>Notices</h3>
            <p>
              <strong>Graduated:</strong> {school.school}, {school.degrees.join(" and ")}. {school.period}.
            </p>
          </div>
        ))}
        <div className="np-ad np-ad-boxed">
          <h3>Wanted</h3>
          <p>
            Ambiguous problems in institutional finance, for scoping and shipping. Inquire with the editor,{" "}
            <a href="#np-letters">Page {pageOf("np-letters")}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Leisure() {
  return (
    <section id="np-leisure" className="np-section">
      <SectionHead name="Leisure & puzzles" page={pageOf("np-leisure")} />
      <div className="np-leisure">
        <div className="np-reveal">
          <h2 className="np-head np-head-small">Off the clock</h2>
          <p className="np-deck">What the editor gets up to when the markets close.</p>
          <ul className="np-pastimes">
            {interests.map((interest) => (
              <li key={interest.name}>{interest.name}</li>
            ))}
          </ul>
        </div>
        <div className="np-puzzle np-reveal">
          <h2 className="np-head np-head-small">Today’s puzzle</h2>
          <p className="np-deck">Every pastime is hidden in the grid. Drag across the letters to circle one.</p>
          <WordSearch />
        </div>
      </div>
    </section>
  );
}

export function Letters() {
  return (
    <section id="np-letters" className="np-section">
      <SectionHead name="Letters to the editor" page={pageOf("np-letters")} />
      <div className="np-letters np-reveal">
        <h2 className="np-head">Write to the editor</h2>
        <p className="np-deck">
          {PAPER_NAME} welcomes letters from readers, founders and fellow builders.
        </p>
        <p className="np-letters-mail">
          <PenMark note="write in!">
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </PenMark>
        </p>
        <p className="np-letters-links">
          Or find the editor on{" "}
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          and{" "}
          <a href={personalInfo.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
        <p className="np-correction">
          <strong>Corrections:</strong> none. Every figure in this edition traces back to its source.
        </p>
      </div>
    </section>
  );
}

export function Colophon({ onModern, onGame }: { onModern: () => void; onGame: () => void }) {
  return (
    <footer className="np-colophon">
      <p>
        © {new Date().getFullYear()} {PAPER_NAME}. Printed in {personalInfo.location} on recycled pixels.
      </p>
      <p>
        Also available as{" "}
        <button type="button" className="np-link-button" onClick={onModern}>
          the modern edition
        </button>{" "}
        and{" "}
        <button type="button" className="np-link-button" onClick={onGame}>
          the game edition
        </button>
        .
      </p>
    </footer>
  );
}
