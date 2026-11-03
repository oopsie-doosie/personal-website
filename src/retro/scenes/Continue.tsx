// src/retro/scenes/Continue.tsx
// Contact, as the arcade "CONTINUE?" countdown. Press a button to join in.
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/index";
import { game, useGame } from "../game";
import { cx, pad, useInView } from "../hooks";
import { sfx } from "../sound";

const GAME_OVER_MS = 2600;

const BUTTONS = [
  { label: "EMAIL", color: "red", href: `mailto:${personalInfo.email}`, external: false },
  { label: "LINKEDIN", color: "blue", href: personalInfo.linkedin, external: true },
  { label: "GITHUB", color: "yellow", href: personalInfo.github, external: true },
];

export function ContinueScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, threshold: 0.4 });
  const credits = useGame((s) => s.coins.length);
  const [count, setCount] = useState(9);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(
      () => setCount((c) => (c < 0 ? 9 : c - 1)),
      count < 0 ? GAME_OVER_MS : 1000
    );
    return () => window.clearTimeout(timer);
  }, [inView, count]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      sfx.coin();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the address is on screen anyway
    }
  };

  return (
    <section id="continue" className="rx-section rx-continue" data-stage="CONTINUE?">
      <div className="rx-continue-inner rx-reveal" ref={ref}>
        <h2 className="rx-continue-title" data-text="CONTINUE?">
          CONTINUE?
        </h2>
        <p className={cx("rx-countdown", count < 0 && "is-over")} aria-hidden="true">
          <span key={count}>{count < 0 ? "GAME OVER?" : count}</span>
        </p>
        <p className="rx-continue-sub">PLAYER 2: PRESS A BUTTON TO JOIN THE PARTY</p>

        <div className="rx-arcade-row">
          {BUTTONS.map((button) => (
            <a
              key={button.label}
              className={`rx-arcade rx-arcade-${button.color}`}
              href={button.href}
              {...(button.external ? { target: "_blank", rel: "noreferrer" } : {})}
              onMouseEnter={sfx.blip}
              onClick={() => {
                sfx.coin();
                game.unlock("contact");
              }}
            >
              <span className="rx-arcade-base">
                <span className="rx-arcade-cap" />
              </span>
              <span className="rx-arcade-label">{button.label}</span>
            </a>
          ))}
        </div>

        <p className="rx-continue-mail">
          <span>{personalInfo.email}</span>
          <button type="button" className="rx-btn rx-btn-small" onClick={copyEmail}>
            {copied ? "COPIED!" : "COPY"}
          </button>
        </p>
        <p className="rx-continue-credit">
          CREDIT {pad(credits, 2)}
          <span className="rx-blink"> INSERT COIN</span>
        </p>
      </div>
    </section>
  );
}
