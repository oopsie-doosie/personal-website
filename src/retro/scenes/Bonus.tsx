// src/retro/scenes/Bonus.tsx
// Side projects as game cartridges. Like the real thing, it won't boot until
// you blow on it.
import { useRef, useState } from "react";
import { projects } from "@/data/index";
import { game } from "../game";
import { cx } from "../hooks";
import { spawnBurst } from "../particles";
import { sfx } from "../sound";
import { DRONE, STAR } from "../sprites";
import { Coin, Heading, Sprite, Win } from "../ui";

type Slot = "empty" | "error" | "dusted" | "loading" | "playing";

const SCREEN: Record<Slot, string> = {
  empty: "NO CARTRIDGE",
  error: "ERROR! DUST IN SLOT",
  dusted: "READY. TRY AGAIN",
  loading: "LOADING...",
  playing: "NOW PLAYING!",
};

function Cartridge({ project }: { project: (typeof projects)[number] }) {
  const [slot, setSlot] = useState<Slot>("empty");
  const cartRef = useRef<HTMLDivElement>(null);

  const insert = () => {
    if (slot === "empty") {
      sfx.error();
      setSlot("error");
      return;
    }
    sfx.powerUp();
    setSlot("loading");
    window.setTimeout(() => {
      setSlot("playing");
      game.unlock("cartridge");
    }, 1300);
  };

  const blow = () => {
    sfx.whoosh();
    const rect = cartRef.current?.getBoundingClientRect();
    if (rect) {
      spawnBurst(rect.left + rect.width / 2, rect.bottom - 8, {
        colors: ["#c9d4ff", "#8a93b8", "#ffffff"],
        count: 26,
        speed: 4,
        gravity: -0.03,
      });
    }
    setSlot("dusted");
  };

  return (
    <div className={cx("rx-bonus", `is-${slot}`)}>
      <div className="rx-console-area">
        <div className="rx-cart" ref={cartRef} aria-hidden="true">
          <div className="rx-cart-ridges" />
          <div className="rx-cart-label">
            <span className="rx-cart-brand">POLATSOFT</span>
            <span className="rx-cart-art">
              <Sprite art={DRONE} />
            </span>
            <strong className="rx-cart-title">{project.title}</strong>
            <span className="rx-cart-plays">{project.surfaces.join(" + ")}</span>
          </div>
        </div>
        <div className="rx-console">
          <div className="rx-console-slot" />
          <div className="rx-console-screen" role="status">
            <span>{SCREEN[slot]}</span>
          </div>
          <i className="rx-console-led" />
          <span className="rx-console-name">PX-2000</span>
        </div>
        <div className="rx-bonus-actions">
          {slot === "error" ? (
            <button type="button" className="rx-btn" onClick={blow}>
              BLOW ON IT
            </button>
          ) : slot === "playing" ? (
            <button
              type="button"
              className="rx-btn"
              onClick={() => {
                sfx.back();
                setSlot("dusted");
              }}
            >
              EJECT
            </button>
          ) : (
            <button type="button" className="rx-btn" onClick={insert} disabled={slot === "loading"}>
              INSERT CARTRIDGE
            </button>
          )}
        </div>
      </div>

      <Win title="BACK OF THE BOX" className="rx-box-back rx-reveal">
        <h3 className="rx-box-title">{project.title}</h3>
        <p className="rx-box-tagline">{project.tagline}</p>
        <p className="rx-box-label">FEATURES</p>
        <ul className="rx-box-features">
          {project.highlights.map((feature) => (
            <li key={feature}>
              <Sprite art={STAR} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="rx-box-specs">
          <div>
            <p className="rx-box-label">SYSTEM REQUIREMENTS</p>
            <ul className="rx-chips">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rx-box-label">PLAYS ON</p>
            <ul className="rx-chips">
              {project.surfaces.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Win>
    </div>
  );
}

export function BonusStage() {
  return (
    <section id="bonus" className="rx-section" data-stage="BONUS STAGE">
      <Heading kicker="BONUS STAGE" title="SECRET CARTRIDGE" sub="A SIDE PROJECT APPEARS!" />
      {projects.map((project) => (
        <Cartridge key={project.title} project={project} />
      ))}
      <Coin id="bonus" style={{ left: "2%", bottom: "6%" }} />
    </section>
  );
}
