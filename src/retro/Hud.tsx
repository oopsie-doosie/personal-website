// src/retro/Hud.tsx
// The arcade heads-up display pinned to the top of the screen. The exit
// button on the right switches back to the modern edition.
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENT_IDS, ACHIEVEMENTS, COIN_IDS, game, useGame, type Settings } from "./game";
import { cx, pad, useTween } from "./hooks";
import { sfx, unlockAudio } from "./sound";
import { COIN, HEART, POWER, TROPHY } from "./sprites";
import { Sprite, Win } from "./ui";

function Toggle({ setting, label, title }: { setting: keyof Settings; label: string; title: string }) {
  const on = useGame((s) => s.settings[setting]);
  return (
    <button
      type="button"
      className={cx("rx-hud-toggle", `rx-hud-${setting}`, on && "is-on")}
      aria-pressed={on}
      title={title}
      onClick={() => {
        unlockAudio();
        game.setSetting(setting, !on);
        sfx.select();
      }}
    >
      {label}
      <i className="rx-led" aria-hidden="true" />
    </button>
  );
}

function TrophyCase({ onClose }: { onClose: () => void }) {
  const unlocked = useGame((s) => s.achievements);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const onClick = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [onClose]);

  return (
    <div className="rx-trophies" ref={panelRef} id="rx-trophy-case">
      <Win title={`TROPHIES ${unlocked.length}/${ACHIEVEMENT_IDS.length}`} tone="dark">
        <ul>
          {ACHIEVEMENT_IDS.map((id) => {
            const got = unlocked.includes(id);
            return (
              <li key={id} className={cx(got && "is-got")}>
                <Sprite art={TROPHY} />
                <span>
                  <strong>{got ? ACHIEVEMENTS[id].title : "? ? ?"}</strong>
                  {got ? ACHIEVEMENTS[id].text : "Keep exploring"}
                </span>
              </li>
            );
          })}
        </ul>
      </Win>
    </div>
  );
}

export function Hud({ onExit }: { onExit: () => void }) {
  const score = useTween(useGame((s) => s.score));
  const hiScore = useTween(useGame((s) => s.hiScore));
  const stage = useGame((s) => s.stage);
  const lives = useGame((s) => s.lives);
  const coins = useGame((s) => s.coins.length);
  const trophies = useGame((s) => s.achievements.length);
  const [showTrophies, setShowTrophies] = useState(false);

  return (
    <header className="rx-hud">
      <div className="rx-hud-scores">
        <p>
          <span className="rx-hud-1up">1UP</span>
          <span className="rx-hud-num">{pad(score, 7)}</span>
        </p>
        <p className="rx-hud-hi">
          <span>HI</span>
          <span className="rx-hud-num">{pad(hiScore, 7)}</span>
        </p>
      </div>

      <p className="rx-hud-stage" aria-live="polite">
        <span key={stage}>{stage}</span>
      </p>

      <div className="rx-hud-right">
        <p className="rx-hud-lives" title="Lives">
          <Sprite art={HEART} />
          <span>×{pad(lives, 2)}</span>
        </p>
        <p className="rx-hud-coins" title={`Hidden coins found: ${coins} of ${COIN_IDS.length}`}>
          <Sprite art={COIN} className="rx-spin" />
          <span>×{pad(coins, 2)}</span>
        </p>
        <button
          type="button"
          className="rx-hud-trophy"
          aria-expanded={showTrophies}
          aria-controls="rx-trophy-case"
          title="Trophies"
          onClick={(event) => {
            event.stopPropagation();
            sfx.select();
            setShowTrophies((open) => !open);
          }}
        >
          <Sprite art={TROPHY} />
          <span>
            {trophies}/{ACHIEVEMENT_IDS.length}
          </span>
        </button>
        <Toggle setting="music" label="BGM" title="Music on/off" />
        <Toggle setting="sfx" label="SFX" title="Sound effects on/off" />
        <Toggle setting="crt" label="CRT" title="CRT screen effect on/off" />
        <button
          type="button"
          className="rx-exit"
          onClick={onExit}
          aria-label="Exit to the modern edition of the site"
          title="Back to the modern site"
        >
          <Sprite art={POWER} />
          <span className="rx-exit-long">EXIT TO 2026</span>
          <span className="rx-exit-short">EXIT</span>
        </button>
      </div>

      {showTrophies && <TrophyCase onClose={() => setShowTrophies(false)} />}
    </header>
  );
}
