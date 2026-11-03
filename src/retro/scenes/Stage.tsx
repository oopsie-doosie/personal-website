// src/retro/scenes/Stage.tsx
// One section per stage: the job (or school) intro card, its quest log of
// highlights, and a score tally for stages that have been cleared.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { education, experience, type Highlight } from "@/data/index";
import { game } from "../game";
import { cx, pad, useInView } from "../hooks";
import { sfx } from "../sound";
import { ICONS, STAR, iconFor } from "../sprites";
import { stageFor, type Stage } from "../stages";
import { CountUp, Sprite, Win } from "../ui";
import { BossBattle } from "./Battle";

function StageBanner({
  stage,
  title,
  role,
  period,
  note,
}: {
  stage: Stage;
  title: string;
  role: string;
  period: string;
  note?: string;
}) {
  const live = stage.status === "current";
  return (
    <header className="rx-stage-banner rx-reveal">
      <p className="rx-stage-no">
        <span>STAGE</span>
        {stage.number}
      </p>
      <div className="rx-stage-meta">
        <span className={cx("rx-badge", live ? "rx-badge-live" : "rx-badge-clear")}>
          {live ? "NOW PLAYING" : "STAGE CLEAR!"}
        </span>
        <h2 className="rx-stage-title">{title}</h2>
        <p className="rx-stage-role">
          {role} <span>//</span> {period}
        </p>
        {note && <p className="rx-stage-note">{note}</p>}
      </div>
      <Sprite art={stage.world} className="rx-stage-world" />
    </header>
  );
}

// Labels for the "stack" diagram, bottom to top, as described in src/data
const STACK_LAYERS = ["17 VENDORS", "40+ PIPELINES", "130M-ROW STORE", "FASTAPI", "REACT SPA"];

function MiniScene({ kind, metric }: { kind: NonNullable<Highlight["visual"]>; metric?: string }) {
  if (kind === "stack") {
    return (
      <div className="rx-mini rx-mini-stack" aria-hidden="true">
        {STACK_LAYERS.map((layer, i) => (
          <span key={layer} style={{ "--i": i } as CSSProperties}>
            {layer}
          </span>
        ))}
      </div>
    );
  }
  if (kind === "pipeline") {
    return (
      <div className="rx-mini rx-mini-pipe" aria-hidden="true">
        <span className="rx-node">THESIS</span>
        <i className="rx-wire" />
        <span className="rx-node">PLAN</span>
        <span className="rx-lanes">
          {[0, 1, 2].map((i) => (
            <span key={i} className="rx-lane" style={{ "--i": i } as CSSProperties}>
              <i />
            </span>
          ))}
        </span>
        <span className="rx-node rx-node-gold">REPORT</span>
        {metric && <span className="rx-mini-tag">{metric.replace("−", "-")}</span>}
      </div>
    );
  }
  return (
    <div className="rx-mini rx-mini-ref" aria-hidden="true">
      <span className="rx-node">STEP A</span>
      <span className="rx-ref-track">
        <i className="rx-ref-key">REF#</i>
      </span>
      <span className="rx-node">STEP B</span>
      <span className="rx-ref-store">BIG DATA STAYS IN THE STORE</span>
    </div>
  );
}

function QuestCard({ highlight, number }: { highlight: Highlight; number: number }) {
  return (
    <article
      className={cx("rx-quest rx-reveal", highlight.span && `rx-span-${highlight.span}`)}
      onMouseEnter={sfx.blip}
    >
      <header>
        <span className="rx-quest-icon">
          <Sprite art={iconFor(highlight.icon)} />
        </span>
        <div>
          <p className="rx-quest-no">QUEST {pad(number, 2)}</p>
          <h3 className="rx-quest-title">{highlight.title}</h3>
        </div>
      </header>
      {highlight.visual && <MiniScene kind={highlight.visual} metric={highlight.metric} />}
      <p className="rx-quest-text">{highlight.text}</p>
      <footer>
        {highlight.metric && (
          <p className="rx-loot-tag">
            <span>LOOT</span> {highlight.metric}
            {highlight.metricLabel && ` ${highlight.metricLabel}`}
          </p>
        )}
        <span className="rx-quest-stamp">COMPLETE</span>
      </footer>
    </article>
  );
}

function ResultsTally({ stage, rows }: { stage: Stage; rows: Highlight[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.6 });
  const [counted, setCounted] = useState(0);
  const finished = counted >= rows.length;

  useEffect(() => {
    if (!finished) return;
    sfx.powerUp();
    game.unlock("clear");
  }, [finished]);

  return (
    <div className="rx-tally-wrap" ref={ref}>
      <Win tone="dark" className="rx-tally rx-reveal">
        <p className="rx-tally-title" data-text={`STAGE ${stage.number} CLEAR!`}>
          STAGE {stage.number} CLEAR!
        </p>
        <dl>
          {rows.map((row, i) => (
            <div key={row.title} className={cx("rx-tally-row", inView && i <= counted && "is-on")}>
              <dt>{row.metricLabel}</dt>
              <dd>
                <CountUp
                  value={row.metric ?? ""}
                  active={inView && i <= counted}
                  duration={900}
                  onTick={sfx.tick}
                  onDone={() => setCounted((c) => Math.max(c, i + 1))}
                />
              </dd>
            </div>
          ))}
        </dl>
        <p className={cx("rx-tally-rank", finished && "is-on")}>
          RANK <strong>S</strong>
          <Sprite art={STAR} />
          <Sprite art={STAR} />
          <Sprite art={STAR} />
        </p>
      </Win>
    </div>
  );
}

export function JobStage({ index }: { index: number }) {
  const job = experience[index];
  const stage = stageFor("job", index);
  const tallied = job.highlights.filter((h) => h.metric && h.metricLabel);

  return (
    <section
      id={`stage-${stage.id}`}
      className="rx-section rx-stage"
      data-stage={`STAGE ${stage.number}: ${job.company.toUpperCase()}`}
    >
      <StageBanner stage={stage} title={job.company} role={job.role} period={job.period} note={job.summary} />
      {job.showcase && <BossBattle showcase={job.showcase} />}
      {stage.status === "clear" && tallied.length > 0 && <ResultsTally stage={stage} rows={tallied} />}
      <h3 className="rx-sub">
        <Sprite art={STAR} /> QUEST LOG <Sprite art={STAR} />
      </h3>
      <div className="rx-quests">
        {job.highlights.map((highlight, i) => (
          <QuestCard key={highlight.title} highlight={highlight} number={i + 1} />
        ))}
      </div>
    </section>
  );
}

const degreeIcon = (degree: string) =>
  /comput/i.test(degree) ? ICONS.braces : /econ|financ/i.test(degree) ? ICONS.finance : STAR;

export function SchoolStage({ index }: { index: number }) {
  const school = education[index];
  const stage = stageFor("school", index);

  return (
    <section
      id={`stage-${stage.id}`}
      className="rx-section rx-stage"
      data-stage={`STAGE ${stage.number}: TRAINING GROUNDS`}
    >
      <StageBanner
        stage={stage}
        title={school.school}
        role="TRAINING GROUNDS"
        period={school.period}
        note={school.location}
      />
      <Win className="rx-dual rx-reveal" tone="pink">
        <p className="rx-dual-title">{school.degrees.length > 1 ? "DUAL CLASS UNLOCKED!" : "CLASS UNLOCKED!"}</p>
        <ul>
          {school.degrees.map((degree) => (
            <li key={degree}>
              <Sprite art={degreeIcon(degree)} />
              <span>{degree}</span>
            </li>
          ))}
        </ul>
      </Win>
    </section>
  );
}
