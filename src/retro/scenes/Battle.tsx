// src/retro/scenes/Battle.tsx
// The Arbwick showcase played out as a turn-based boss battle: the agent
// takes on an untested investment thesis and walks away with a report.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { experience, stats } from "@/data/index";
import { game } from "../game";
import { cx, useInView, useReducedMotion } from "../hooks";
import { sfx } from "../sound";
import { ARROW, BOSS, BOSS_WOBBLE, CHEST_OPEN, DRONE, DRONE_SPIN, MAGE, MAGE_BLINK, SCROLL } from "../sprites";
import { Coin, Sprite, Typewriter, Win } from "../ui";

type Act = "intro" | "plan" | "tools" | "parallel" | "audit" | "defeat" | "loot";

interface Beat {
  act: Act;
  say: string;
  command?: number;
  damage?: number;
  pop?: string;
}

// Numbers come from src/data so the battle stays in sync with the résumé
const toolStat = stats.find((stat) => /function/i.test(stat.label));
const TOOLS = toolStat ? `${toolStat.value}${toolStat.unit}` : "MANY";
const SPEEDUP =
  experience
    .flatMap((job) => job.highlights)
    .find((highlight) => highlight.visual === "pipeline")
    ?.metric?.replace(/\s*runtime/i, "")
    .replace("−", "-") ?? "FASTER";

const COMMANDS = ["PLAN", "TOOLS", "PARALLEL", "AUDIT"];

const BEATS: Beat[] = [
  { act: "intro", say: "An UNTESTED THESIS appears! It's written in plain English." },
  { act: "plan", command: 0, damage: 20, pop: "PLANNED!", say: "AGENT casts PLAN! The analyses line up in dependency order." },
  { act: "tools", command: 1, damage: 25, pop: TOOLS, say: `AGENT loads only the tools it needs from a bag of ${TOOLS}.` },
  { act: "parallel", command: 2, damage: 35, pop: SPEEDUP, say: `PARALLEL STRIKE! Independent branches hit at once. Runtime ${SPEEDUP}!` },
  { act: "audit", command: 3, damage: 20, pop: "TRACED!", say: "AUDIT TRAIL! Every figure traces back to the query that made it." },
  { act: "defeat", say: "The UNTESTED THESIS is defeated!" },
  { act: "loot", say: "Obtained a DEFENSIBLE REPORT! Backtested, too." },
];

const ACT_MS: Record<Act, number> = {
  intro: 900,
  plan: 1300,
  tools: 1500,
  parallel: 1700,
  audit: 1400,
  defeat: 1500,
  loot: 0,
};

const ACT_SOUND: Record<Act, () => void> = {
  intro: sfx.jump,
  plan: sfx.powerUp,
  tools: () => [0, 220, 440].forEach((ms) => window.setTimeout(sfx.laser, ms)),
  parallel: () => {
    sfx.laser();
    window.setTimeout(sfx.hit, 260);
    window.setTimeout(sfx.hit, 420);
  },
  audit: () => [0, 120, 240, 360].forEach((ms) => window.setTimeout(sfx.tick, ms)),
  defeat: sfx.explode,
  loot: sfx.victory,
};

// Background candlesticks, generated once with a fixed pattern
const CANDLES = Array.from({ length: 22 }, (_, i) => ({
  height: 18 + ((i * 37) % 47),
  offset: (i * 23) % 30,
  up: (i * 7) % 3 !== 0,
}));

export function BossBattle({ showcase }: { showcase: { title: string; text: string } }) {
  const battleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(battleRef, { threshold: 0.5 });
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(-1);
  const [typed, setTyped] = useState(false);
  const [instant, setInstant] = useState(false);
  const [round, setRound] = useState(0);

  const current = BEATS[beat] as Beat | undefined;
  const lastBeat = BEATS.length - 1;
  const finished = beat === lastBeat && typed;
  // Everything visual is derived from how far the battle has got
  const reached = beat + (typed ? 1 : 0);
  const damage = BEATS.slice(0, reached).reduce((sum, b) => sum + (b.damage ?? 0), 0);
  const hp = Math.max(0, 100 - damage);
  const act = typed ? current?.act : undefined;
  const defeated = reached > BEATS.findIndex((b) => b.act === "defeat");

  useEffect(() => {
    if (!inView || beat !== -1) return;
    if (reduced) {
      setBeat(lastBeat);
      setTyped(true);
    } else {
      setBeat(0);
    }
  }, [inView, beat, reduced, lastBeat]);

  // Once a line is typed out, play its action, then move to the next beat
  useEffect(() => {
    if (!typed || !current) return;
    if (!reduced) ACT_SOUND[current.act]();
    if (beat === lastBeat) {
      game.unlock("boss");
      return;
    }
    const timer = window.setTimeout(() => {
      setBeat((b) => b + 1);
      setTyped(false);
      setInstant(false);
    }, ACT_MS[current.act]);
    return () => window.clearTimeout(timer);
  }, [typed, current, beat, lastBeat, reduced]);

  const replay = () => {
    sfx.start();
    setRound((r) => r + 1);
    setBeat(0);
    setTyped(false);
    setInstant(false);
  };

  return (
    <div className="rx-battle-wrap">
      <Win title="MISSION BRIEFING" className="rx-brief rx-reveal">
        <h3 className="rx-brief-title">{showcase.title}</h3>
        <p className="rx-brief-text">{showcase.text}</p>
      </Win>

      <div
        ref={battleRef}
        className={cx("rx-battle rx-reveal", beat >= 0 && "is-live", act && `act-${act}`, defeated && "is-defeated")}
        onClick={() => !typed && setInstant(true)}
      >
        <div className="rx-arena" aria-hidden="true">
          <div className="rx-candles">
            {CANDLES.map((candle, i) => (
              <i
                key={i}
                className={candle.up ? "is-up" : "is-down"}
                style={{ "--h": `${candle.height}%`, "--o": `${candle.offset}%` } as CSSProperties}
              />
            ))}
          </div>
          <div className="rx-ground" />

          <div className="rx-hpbox rx-hpbox-enemy">
            <span>UNTESTED THESIS</span>
            <div className="rx-hp">
              <i style={{ width: `${hp}%` }} className={cx(hp <= 30 && "is-low")} />
            </div>
          </div>
          <div className="rx-hpbox rx-hpbox-party">
            <span>AGENT</span>
            <div className="rx-hp">
              <i style={{ width: "100%" }} />
            </div>
            <small>TOOLS {TOOLS}</small>
          </div>

          <div className="rx-enemy">
            <Sprite art={BOSS} alt={BOSS_WOBBLE} />
            {current?.pop && typed && (
              <span key={`${round}-${beat}`} className="rx-pop">
                {current.pop}
              </span>
            )}
          </div>
          <div className="rx-party">
            <span className="rx-magic" />
            <Sprite art={MAGE} alt={MAGE_BLINK} anim="blink" className="rx-party-mage" />
            <Sprite art={DRONE} alt={DRONE_SPIN} className="rx-party-drone" />
          </div>
          <div className="rx-shots">
            {[0, 1, 2].map((i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <span className="rx-beam" />
          <span className="rx-flash" />

          {finished && (
            <div className="rx-loot">
              <Sprite art={SCROLL} className="rx-loot-item" />
              <Sprite art={CHEST_OPEN} className="rx-loot-chest" />
              <p>DEFENSIBLE REPORT</p>
            </div>
          )}
        </div>

        <div className="rx-battle-ui">
          <ul className="rx-commands" aria-hidden="true">
            {COMMANDS.map((command, i) => (
              <li key={command} className={cx(current?.command === i && "is-active")}>
                <Sprite art={ARROW} />
                {command}
              </li>
            ))}
          </ul>
          <div className="rx-battle-msg">
            {current && (
              <Typewriter
                key={`${round}-${beat}`}
                text={current.say}
                active={inView}
                instant={instant}
                speed={20}
                onDone={() => setTyped(true)}
              />
            )}
            {finished && (
              <button type="button" className="rx-btn rx-btn-small" onClick={replay}>
                REPLAY
              </button>
            )}
          </div>
        </div>
      </div>
      <Coin id="boss" style={{ right: "2%", top: "-28px" }} />
    </div>
  );
}
