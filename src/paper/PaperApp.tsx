// src/paper/PaperApp.tsx
// The newspaper edition: the same content as the modern site, printed as a
// vintage broadsheet. It spins in like a film headline and spins out on exit.
// Loaded on demand by SiteThemeProvider.
import "@fontsource/unifrakturmaguntia/latin-400.css";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource/old-standard-tt/latin-400.css";
import "@fontsource/old-standard-tt/latin-400-italic.css";
import "@fontsource/old-standard-tt/latin-700.css";
import "@fontsource-variable/caveat/wght.css";
import "./paper.css";
import { useEffect, useRef, useState, type RefObject } from "react";
import { experience, personalInfo } from "@/data/index";
import { useSiteTheme } from "@/theme/siteTheme";
import { Classifieds, Colophon, Leisure, Letters } from "./BackPages";
import { PAPER_NAME } from "./content";
import { FrontPage, Masthead } from "./FrontPage";
import { cx, prefersReducedMotion } from "./hooks";
import { JobStory, TechStory } from "./Stories";

// Matches np-spin-in in paper.css
const INTRO_MS = 1500;

// Takes over the page title and browser theme color while active
const usePageChrome = () => {
  useEffect(() => {
    const html = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previous = { title: document.title, color: themeColor?.content };

    html.classList.add("np");
    html.classList.remove("edition-boot");
    document.title = `${PAPER_NAME} | ${personalInfo.name}`;
    themeColor?.setAttribute("content", "#1b1813");

    return () => {
      html.classList.remove("np");
      document.title = previous.title;
      if (themeColor && previous.color) themeColor.content = previous.color;
    };
  }, []);
};

// Fades `.np-reveal` blocks in and draws `.np-pen` marks as they scroll into
// view. Uses an attribute rather than a class so React re-renders can't wipe it.
const useReveal = (rootRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const elements = rootRef.current?.querySelectorAll(".np-reveal, .np-pen") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef]);
};

export default function PaperApp() {
  const { phase, switchTheme } = useSiteTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(() => !prefersReducedMotion());
  const leaving = phase === "leaving";

  usePageChrome();
  useReveal(rootRef);

  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => setIntro(false), INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [intro]);

  // The sheet spins away from the top of the front page
  useEffect(() => {
    if (leaving) window.scrollTo({ top: 0, behavior: "instant" });
  }, [leaving]);

  return (
    <div ref={rootRef} className={cx("np-app", intro && "is-intro", leaving && "is-leaving")}>
      <a className="np-skip" href="#np-front">
        Skip to the front page
      </a>
      <div className="np-bar" role="navigation" aria-label="Editions">
        <p className="np-bar-name">
          {PAPER_NAME} <span>· Digital edition</span>
        </p>
        <div className="np-bar-actions">
          <button type="button" onClick={() => switchTheme("modern")} aria-label="Switch to the modern edition">
            Modern<span className="np-bar-long"> edition</span>
          </button>
          <button type="button" onClick={() => switchTheme("retro")} aria-label="Switch to the game edition">
            Game<span className="np-bar-long"> edition</span>
          </button>
          <button type="button" className="np-bar-print" onClick={() => window.print()} aria-label="Print this edition">
            Print
          </button>
        </div>
      </div>

      <main className="np-sheet" id="np-front">
        <svg className="np-coffee" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="46" />
          <circle cx="62" cy="58" r="42" />
          <path d="M18,70 C14,40 40,12 70,14" />
        </svg>
        <Masthead />
        <FrontPage />
        {experience.map((job, index) => (
          <JobStory key={job.company} index={index} />
        ))}
        <TechStory />
        <Classifieds />
        <Leisure />
        <Letters />
        <Colophon onModern={() => switchTheme("modern")} onGame={() => switchTheme("retro")} />
      </main>
    </div>
  );
}
