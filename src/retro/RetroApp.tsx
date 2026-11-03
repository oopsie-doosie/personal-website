// src/retro/RetroApp.tsx
// The retro edition: the same content as the modern site, re-imagined as a
// late-90s pixel-art video game. Loaded on demand by SiteThemeProvider, so
// none of this ships to visitors who stay on the modern site.
import "@fontsource/press-start-2p/latin-400.css";
import "@fontsource-variable/pixelify-sans";
import "./retro.css";
import { useEffect, useRef, type RefObject } from "react";
import { personalInfo } from "@/data/index";
import { useSiteTheme } from "@/theme/siteTheme";
import { PowerScreen } from "./fx/PowerScreen";
import { Sky } from "./fx/Sky";
import { Sparkles } from "./fx/Sparkles";
import { Toasts } from "./fx/Toasts";
import { game, useGame, type AchievementId } from "./game";
import { Hud } from "./Hud";
import { cx } from "./hooks";
import { spawnFireworks } from "./particles";
import { BonusStage } from "./scenes/Bonus";
import { ContinueScreen } from "./scenes/Continue";
import { Credits } from "./scenes/Credits";
import { Inventory } from "./scenes/Inventory";
import { PlayerStatus } from "./scenes/Player";
import { Prologue } from "./scenes/Prologue";
import { SideQuests } from "./scenes/SideQuests";
import { JobStage, SchoolStage } from "./scenes/Stage";
import { TitleScreen } from "./scenes/Title";
import { WorldMap } from "./scenes/WorldMap";
import { pauseAudio, sfx, shutdownAudio, syncMusic, unlockAudio } from "./sound";
import { CURSOR, CURSOR_ACTIVE, spriteDataUri } from "./sprites";
import { STAGES } from "./stages";

const SECRET_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

// Takes over the page title, browser theme color and cursor while active
const usePageChrome = () => {
  useEffect(() => {
    const html = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previous = { title: document.title, color: themeColor?.content };

    html.classList.add("rx");
    html.classList.remove("rx-boot");
    html.style.setProperty("--rx-cursor", `url("${spriteDataUri(CURSOR)}") 0 0, auto`);
    html.style.setProperty("--rx-cursor-active", `url("${spriteDataUri(CURSOR_ACTIVE)}") 0 0, pointer`);
    document.title = `PRESS START | ${personalInfo.name}`;
    themeColor?.setAttribute("content", "#04010c");

    return () => {
      html.classList.remove("rx");
      html.style.removeProperty("--rx-cursor");
      html.style.removeProperty("--rx-cursor-active");
      document.title = previous.title;
      if (themeColor && previous.color) themeColor.content = previous.color;
    };
  }, []);
};

// Updates the HUD (and the score) as each section passes mid-screen
const useSectionTracker = (rootRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll<HTMLElement>("[data-stage]") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          game.enterSection(
            section.id,
            section.dataset.stage ?? "",
            section.dataset.unlock as AchievementId | undefined
          );
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [rootRef]);
};

// Pixel-materializes `.rx-reveal` elements as they scroll into view. Uses an
// attribute rather than a class so React re-renders can't wipe it.
const useReveal = (rootRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const elements = rootRef.current?.querySelectorAll(".rx-reveal") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef]);
};

const useSecretCode = () => {
  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === SECRET_CODE[progress] ? progress + 1 : key === SECRET_CODE[0] ? 1 : 0;
      if (progress < SECRET_CODE.length) return;
      progress = 0;
      unlockAudio();
      sfx.powerUp();
      spawnFireworks(12);
      game.activateCheat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
};

const useSoundtrack = (leaving: boolean) => {
  const music = useGame((s) => s.settings.music);

  useEffect(() => {
    syncMusic(music && !leaving);
  }, [music, leaving]);

  useEffect(() => {
    // Audio saved as "on" from a past visit needs a click or key to start
    const resume = () => {
      const { music: musicOn, sfx: sfxOn } = game.state.settings;
      if (musicOn || sfxOn) unlockAudio();
    };
    const onVisibility = () => pauseAudio(document.hidden);
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      document.removeEventListener("visibilitychange", onVisibility);
      shutdownAudio();
    };
  }, []);
};

export default function RetroApp() {
  const { phase, switchTheme } = useSiteTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const crt = useGame((s) => s.settings.crt);
  const cheat = useGame((s) => s.cheat);
  const leaving = phase === "leaving";

  usePageChrome();
  useSectionTracker(rootRef);
  useReveal(rootRef);
  useSecretCode();
  useSoundtrack(leaving);

  const exit = () => {
    sfx.powerOff();
    switchTheme("modern");
  };

  return (
    <div ref={rootRef} className={cx("rx-app", cheat && "rx-cheat")}>
      <a className="rx-skip" href="#prologue">
        SKIP TO CONTENT
      </a>
      <Sky />
      <Hud onExit={exit} />
      <main className="rx-main">
        <TitleScreen />
        <Prologue />
        <PlayerStatus />
        <WorldMap />
        {/* Newest stage first, like the modern site */}
        {[...STAGES].reverse().map((stage) =>
          stage.kind === "job" ? (
            <JobStage key={stage.id} index={stage.index} />
          ) : (
            <SchoolStage key={stage.id} index={stage.index} />
          )
        )}
        <BonusStage />
        <Inventory />
        <SideQuests />
        <ContinueScreen />
      </main>
      <Credits onExit={exit} />
      <Sparkles />
      <Toasts />
      {crt && <div className="rx-crt" aria-hidden="true" />}
      <PowerScreen leaving={leaving} />
    </div>
  );
}
