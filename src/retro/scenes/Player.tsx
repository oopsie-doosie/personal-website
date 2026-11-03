// src/retro/scenes/Player.tsx
// Player 1's character sheet: the "whoami" facts and headline stats.
import { useRef } from "react";
import { facts, personalInfo, stats } from "@/data/index";
import { useInView } from "../hooks";
import { sfx } from "../sound";
import { DRONE, DRONE_SPIN, MAGE, MAGE_BLINK, STAR } from "../sprites";
import { Coin, CountUp, Heading, Sprite, Win } from "../ui";

// RPG names for the labels in src/data facts; unknown labels pass through
const FACT_LABELS: Record<string, string> = {
  name: "NAME",
  "goes by": "ALIAS",
  "based in": "HOME BASE",
  now: "CLASS",
  before: "PREV. QUEST",
  studied: "TRAINING",
  builds: "SPECIAL MOVE",
  "codes in": "SPELLS",
  "off hours": "SIDE QUESTS",
};

function Records() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  return (
    <div className="rx-records" ref={ref}>
      {stats.map((stat, i) => (
        <Win key={stat.label} tone="gold" className="rx-record rx-reveal">
          <p className="rx-record-value">
            <CountUp value={stat.value} active={inView} delay={i * 180} onTick={i === 0 ? sfx.tick : undefined} />
            <span className="rx-record-unit">{stat.unit}</span>
          </p>
          <p className="rx-record-label">{stat.label}</p>
        </Win>
      ))}
    </div>
  );
}

export function PlayerStatus() {
  return (
    <section id="player" className="rx-section" data-stage="PLAYER 1" data-unlock="player">
      <Heading kicker="PLAYER 1" title="CHARACTER STATUS" sub="PLAYER 1 IS READY" />
      <div className="rx-player">
        <Win className="rx-hero-card rx-reveal" tone="dark">
          <div className="rx-pedestal">
            <span className="rx-aura" aria-hidden="true" />
            <Sprite
              art={MAGE}
              alt={MAGE_BLINK}
              anim="blink"
              className="rx-hero-sprite"
              label={`${personalInfo.shortName}'s character: a hooded mage with a glowing staff`}
            />
            <Sprite art={DRONE} alt={DRONE_SPIN} className="rx-drone" />
          </div>
          <p className="rx-hero-name">{personalInfo.shortName.toUpperCase()}</p>
          <p className="rx-hero-class">{personalInfo.role}</p>
          <p className="rx-hero-ready">
            <Sprite art={STAR} /> <span className="rx-blink">READY!</span> <Sprite art={STAR} />
          </p>
        </Win>
        <Win title="STATUS" className="rx-status rx-reveal">
          <dl className="rx-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{FACT_LABELS[fact.label] ?? fact.label.toUpperCase()}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Win>
      </div>
      <h3 className="rx-sub">
        <Sprite art={STAR} /> HIGH SCORES <Sprite art={STAR} />
      </h3>
      <Records />
      <Coin id="player" style={{ left: "3%", top: "46%" }} />
    </section>
  );
}
