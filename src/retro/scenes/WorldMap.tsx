// src/retro/scenes/WorldMap.tsx
// Stage select: one planet per school or job, with the player's ship flying
// along the route to the stage in progress.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx, scrollToSection, useInView, useReducedMotion } from "../hooks";
import { sfx } from "../sound";
import { SHIP, SHIP_THRUST } from "../sprites";
import { STAGES } from "../stages";
import { Coin, Heading, Sprite, Win } from "../ui";

const FLIGHT_MS = 2600;

export function WorldMap() {
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { threshold: 0.45 });
  const reduced = useReducedMotion();
  const [arrived, setArrived] = useState(false);
  const current = Math.max(0, STAGES.findIndex((stage) => stage.status === "current"));
  const target = STAGES[current].status === "current" ? current : STAGES.length - 1;

  useEffect(() => {
    if (!inView) return;
    sfx.jump();
    const timer = window.setTimeout(() => {
      setArrived(true);
      sfx.coin();
    }, reduced ? 0 : FLIGHT_MS);
    return () => window.clearTimeout(timer);
  }, [inView, reduced]);

  const position = ((inView ? target : 0) + 0.5) / STAGES.length;

  return (
    <section id="map" className="rx-section" data-stage="WORLD MAP" data-unlock="map">
      <Heading kicker="WORLD 1" title="WORLD MAP" sub="SELECT A STAGE" />
      <Win className="rx-map rx-reveal" tone="dark">
        <div className="rx-map-track" ref={trackRef} style={{ "--n": STAGES.length } as CSSProperties}>
          <div className="rx-map-path" aria-hidden="true" />
          <div
            className={cx("rx-map-ship", inView && "is-flying", arrived && "is-arrived")}
            style={{ "--p": position, "--flight": `${FLIGHT_MS}ms` } as CSSProperties}
            aria-hidden="true"
          >
            <Sprite art={SHIP} alt={SHIP_THRUST} />
          </div>
          <ol className="rx-map-nodes">
            {STAGES.map((stage, i) => (
              <li key={stage.id} className={cx("rx-map-node", stage.status === "current" && "is-current")}>
                <button
                  type="button"
                  onMouseEnter={sfx.blip}
                  onClick={() => {
                    sfx.select();
                    scrollToSection(`stage-${stage.id}`);
                  }}
                >
                  <span className="rx-map-world">
                    <Sprite art={stage.world} />
                  </span>
                  <span className="rx-map-no">STAGE {stage.number}</span>
                  <span className="rx-map-name">{stage.name}</span>
                  <span className="rx-map-period">{stage.period}</span>
                  <span className={cx("rx-badge", stage.status === "current" ? "rx-badge-live" : "rx-badge-clear")}>
                    {stage.status === "current" ? "NOW PLAYING" : "CLEAR"}
                  </span>
                </button>
                {i === target && arrived && <span className="rx-here">YOU ARE HERE</span>}
              </li>
            ))}
          </ol>
        </div>
      </Win>
      <Coin id="map" style={{ right: "4%", top: "8%" }} />
    </section>
  );
}
