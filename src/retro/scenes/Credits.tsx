// src/retro/scenes/Credits.tsx
// The staff roll, high scores and the way out.
import type { CSSProperties } from "react";
import { education, experience, personalInfo } from "@/data/index";
import { useGame } from "../game";
import { pad, scrollToSection } from "../hooks";
import { sfx } from "../sound";
import { Coin, Win } from "../ui";

const previous = experience.find((job) => !/present/i.test(job.period));

// Every job on a one-person project goes to the same person
const ROLL: [string, string][] = [
  ["EXECUTIVE PRODUCER", personalInfo.name],
  ["DIRECTOR", personalInfo.shortName],
  ["LEAD ENGINEER", personalInfo.shortName],
  ["AGENT WRANGLER", personalInfo.shortName],
  ["EVALS & QA", personalInfo.shortName],
  ["LEVEL DESIGN", personalInfo.shortName],
  ["MUSIC & SOUND", "THE WEB AUDIO API"],
  ["NOW PLAYING AT", personalInfo.company],
  ...(previous ? [["PREVIOUSLY AT", previous.company] as [string, string]] : []),
  ...education.map((school) => ["TRAINED AT", school.school] as [string, string]),
  ["FILMED ON LOCATION", personalInfo.location],
  ["SPECIAL THANKS", "YOU, FOR PLAYING"],
];

export function Credits({ onExit }: { onExit: () => void }) {
  const score = useGame((s) => s.score);
  const hiScore = useGame((s) => s.hiScore);
  const thanks = "THANK YOU FOR PLAYING!";

  return (
    <footer id="credits" className="rx-credits" data-stage="STAFF ROLL" data-unlock="credits">
      <p className="rx-thanks" aria-label={thanks}>
        {[...thanks].map((letter, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} aria-hidden="true">
            {letter}
          </span>
        ))}
      </p>

      <div className="rx-roll" tabIndex={0} aria-label="Staff roll">
        <dl className="rx-roll-track">
          {ROLL.map(([job, who]) => (
            <div key={job + who}>
              <dt>{job}</dt>
              <dd>{who}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Win title="HIGH SCORES" tone="dark" className="rx-scores">
        <ol>
          <li>
            <span>HI-SCORE</span> <span>{pad(hiScore, 7)}</span>
          </li>
          <li>
            <span>THIS RUN</span> <span>{pad(score, 7)}</span>
          </li>
        </ol>
        <div className="rx-scores-actions">
          <button
            type="button"
            className="rx-btn"
            onClick={() => {
              sfx.start();
              scrollToSection("title");
            }}
          >
            PLAY AGAIN
          </button>
          <button type="button" className="rx-btn rx-btn-red" onClick={onExit}>
            EXIT TO 2026
          </button>
        </div>
      </Win>

      <p className="rx-copyright">
        © {new Date().getFullYear()} POLATSOFT. {personalInfo.name.toUpperCase()}. ALL RIGHTS RESERVED.
      </p>
      <p className="rx-hint">PSST... UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A</p>
      <Coin id="credits" style={{ right: "6%", bottom: "18%" }} />
    </footer>
  );
}
