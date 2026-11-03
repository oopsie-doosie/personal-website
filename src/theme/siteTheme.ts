// src/theme/siteTheme.ts
// The site ships in two independent editions that share the content in
// src/data: the default "modern" one and the "retro" game edition in
// src/retro. SiteThemeProvider swaps between them; this file holds the shared
// context and the saved-choice helpers.
import { createContext, useContext } from "react";

export type SiteTheme = "modern" | "retro";

// "leaving" plays the outgoing edition's exit animation, "entering" the
// incoming one's intro
export type ThemePhase = "idle" | "leaving" | "entering";

export interface SiteThemeValue {
  theme: SiteTheme;
  phase: ThemePhase;
  switchTheme: (next: SiteTheme) => void;
  // Starts downloading the retro edition early, e.g. when the toggle is hovered
  preloadRetro: () => void;
}

export const SiteThemeContext = createContext<SiteThemeValue>({
  theme: "modern",
  phase: "idle",
  switchTheme: () => {},
  preloadRetro: () => {},
});

export const useSiteTheme = () => useContext(SiteThemeContext);

const STORAGE_KEY = "site-theme";

// A ?theme=retro link wins over the saved choice. Keep in sync with the inline
// boot script in index.html, which hides the prerendered modern page early.
export const readInitialTheme = (): SiteTheme => {
  try {
    const choice =
      new URLSearchParams(window.location.search).get("theme") ??
      localStorage.getItem(STORAGE_KEY);
    return choice === "retro" ? "retro" : "modern";
  } catch {
    return "modern";
  }
};

export const rememberTheme = (theme: SiteTheme) => {
  // Calms the navbar toggle down now that the visitor has found it
  document.documentElement.classList.add("retro-seen");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the switch still works this visit
  }
  const url = new URL(window.location.href);
  if (url.searchParams.has("theme")) {
    url.searchParams.delete("theme");
    window.history.replaceState(window.history.state, "", url);
  }
};
