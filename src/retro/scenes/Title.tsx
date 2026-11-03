// src/retro/scenes/Title.tsx
// The title screen: chrome logo, attract-mode landscape and the main menu.
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { personalInfo } from "@/data/index";
import { HeroScene } from "../fx/HeroScene";
import { game, useGame, type Settings } from "../game";
import { cx, scrollToSection, useInView } from "../hooks";
import { spawnFireworks } from "../particles";
import { sfx, unlockAudio } from "../sound";
import { ARROW } from "../sprites";
import { Coin, Sprite, Win } from "../ui";

interface MenuItem {
  label: string;
  value?: boolean;
  run: () => void;
}

export function TitleScreen() {
  const sectionRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const inView = useInView(sectionRef, { once: false, threshold: 0.5 });
  const settings = useGame((s) => s.settings);
  const [menu, setMenu] = useState<"main" | "options">("main");
  const [cursor, setCursor] = useState(0);
  const logoTaps = useRef({ count: 0, last: 0 });

  const toggle = (key: keyof Settings) => {
    unlockAudio();
    game.setSetting(key, !settings[key]);
    sfx.select();
  };

  const items: MenuItem[] =
    menu === "main"
      ? [
          {
            label: "NEW GAME",
            run: () => {
              unlockAudio();
              sfx.start();
              game.unlock("start");
              scrollToSection("prologue");
            },
          },
          {
            label: "CONTINUE",
            run: () => {
              sfx.select();
              scrollToSection("continue");
            },
          },
          {
            label: "OPTIONS",
            run: () => {
              sfx.select();
              setMenu("options");
              setCursor(0);
            },
          },
        ]
      : [
          { label: "MUSIC", value: settings.music, run: () => toggle("music") },
          { label: "SOUND FX", value: settings.sfx, run: () => toggle("sfx") },
          { label: "CRT FILTER", value: settings.crt, run: () => toggle("crt") },
          {
            label: "BACK",
            run: () => {
              sfx.back();
              setMenu("main");
              setCursor(2);
            },
          },
        ];

  // Keep keyboard focus on the highlighted item when the menu swaps
  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement?.contains(document.activeElement)) return;
    menuElement.querySelectorAll("button")[cursor]?.focus();
    // Only when the menu changes, not on every cursor move
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  // Enter starts the highlighted item while the title screen is showing
  const runRef = useRef(items[cursor]?.run);
  runRef.current = items[cursor]?.run;
  useEffect(() => {
    if (!inView) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Enter" || document.activeElement !== document.body) return;
      event.preventDefault();
      runRef.current?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView]);

  const onMenuKey = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = (cursor + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    setCursor(next);
    sfx.blip();
    menuRef.current?.querySelectorAll("button")[next]?.focus();
  };

  // A secret for touch screens, where there's no keyboard for the code
  const tapLogo = () => {
    const now = Date.now();
    const taps = logoTaps.current;
    taps.count = now - taps.last < 600 ? taps.count + 1 : 1;
    taps.last = now;
    sfx.jump();
    if (taps.count === 5 && !game.state.cheat) {
      unlockAudio();
      sfx.powerUp();
      spawnFireworks();
      game.activateCheat();
    }
  };

  const letters = [...personalInfo.shortName.toUpperCase()];

  return (
    <section id="title" ref={sectionRef} className="rx-title" data-stage="TITLE SCREEN">
      <HeroScene />
      <div className="rx-title-inner">
        <p className="rx-presents">POLATSOFT PRESENTS</p>
        <h1 className="rx-logo" onClick={tapLogo}>
          <span className="rx-sr">{personalInfo.name}</span>
          <span className="rx-logo-word" aria-hidden="true">
            {/* The letter itself is the 3D extrusion; the face sits on top */}
            {letters.map((letter, i) => (
              <span key={i} className="rx-logo-letter" style={{ "--i": i } as CSSProperties}>
                {letter}
                <span className="rx-logo-face">{letter}</span>
              </span>
            ))}
          </span>
        </h1>
        <p className="rx-ribbon" aria-hidden="true">
          <span>{personalInfo.name.toUpperCase()}</span>
        </p>
        <p className="rx-title-role">
          {personalInfo.role} <span>@</span> {personalInfo.company}
        </p>

        <p className="rx-press-start" aria-hidden="true">
          PRESS START
        </p>
        <Win className="rx-menu" tone="dark">
          <ul ref={menuRef} onKeyDown={onMenuKey} aria-label={menu === "main" ? "Main menu" : "Options"}>
            {items.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={cx("rx-menu-item", cursor === i && "is-active")}
                  aria-pressed={item.value}
                  onMouseEnter={() => {
                    if (cursor !== i) sfx.blip();
                    setCursor(i);
                  }}
                  onFocus={() => setCursor(i)}
                  onClick={item.run}
                >
                  <Sprite art={ARROW} className="rx-menu-cursor" />
                  <span>{item.label}</span>
                  {item.value !== undefined && (
                    <span className={cx("rx-menu-value", item.value && "is-on")}>
                      {item.value ? "ON" : "OFF"}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </Win>
        <p className="rx-title-copy">
          © {new Date().getFullYear()} POLATSOFT · {personalInfo.location.toUpperCase()}
        </p>
      </div>
      <Coin id="title" style={{ left: "7%", top: "38%" }} />
    </section>
  );
}
