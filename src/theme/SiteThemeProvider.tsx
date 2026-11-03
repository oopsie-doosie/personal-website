// src/theme/SiteThemeProvider.tsx
// Renders whichever edition of the site is active and animates the switch.
// The extra editions are code-split, so visitors who stay on the modern site
// never download them.
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { ScreenWipe, type WipeStyle } from "./ScreenWipe";
import {
  SiteThemeContext,
  rememberTheme,
  useSiteTheme,
  type Edition,
  type SiteTheme,
  type ThemePhase,
} from "./siteTheme";

// How long the modern edition's wipe runs
const WIPE_MS = 700;

// Per edition: its code, how long its own exit animation runs (see
// .rx-power-off in src/retro/retro.css and .np-sheet.is-leaving in
// src/paper/paper.css) and the wipe the modern edition plays to or from it
const EDITIONS: Record<
  Edition,
  { load: () => Promise<{ default: ComponentType }>; exitMs: number; wipe: WipeStyle }
> = {
  retro: { load: () => import("@/retro/RetroApp"), exitMs: 650, wipe: "pixels" },
  paper: { load: () => import("@/paper/PaperApp"), exitMs: 900, wipe: "halftone" },
};

// If an edition's chunk can't load (offline, stale deploy), fall back to modern
function EditionUnavailable() {
  const { switchTheme } = useSiteTheme();
  useEffect(() => {
    document.documentElement.classList.remove("edition-boot");
    switchTheme("modern");
  }, [switchTheme]);
  return null;
}

const lazyEdition = (edition: Edition) =>
  lazy<ComponentType>(() =>
    EDITIONS[edition].load().catch(() => ({ default: EditionUnavailable }))
  );

const EDITION_APPS: Record<Edition, ComponentType> = {
  retro: lazyEdition("retro"),
  paper: lazyEdition("paper"),
};

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function SiteThemeProvider({
  initialTheme = "modern",
  children,
}: {
  initialTheme?: SiteTheme;
  // The modern edition
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<SiteTheme>(initialTheme);
  const [phase, setPhase] = useState<ThemePhase>("idle");
  const [wipe, setWipe] = useState<WipeStyle>("pixels");
  const switching = useRef(false);

  const preloadEdition = useCallback((edition: Edition) => {
    EDITIONS[edition].load().catch(() => {});
  }, []);

  const switchTheme = useCallback(
    async (next: SiteTheme) => {
      if (switching.current || next === theme) return;
      switching.current = true;
      const instant = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // The modern edition wipes in the style of the edition it swaps with
      setWipe(EDITIONS[theme === "modern" ? (next as Edition) : theme].wipe);
      setPhase("leaving");
      try {
        await Promise.all([
          next === "modern" ? null : EDITIONS[next].load(),
          wait(instant ? 0 : theme === "modern" ? WIPE_MS : EDITIONS[theme].exitMs),
        ]);
      } catch {
        setPhase("idle");
        switching.current = false;
        return;
      }

      rememberTheme(next);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTheme(next);
      setPhase("entering");
      await wait(instant ? 0 : WIPE_MS);
      setPhase("idle");
      switching.current = false;
    },
    [theme]
  );

  const value = useMemo(
    () => ({ theme, phase, switchTheme, preloadEdition }),
    [theme, phase, switchTheme, preloadEdition]
  );

  const EditionApp = theme === "modern" ? null : EDITION_APPS[theme];

  return (
    <SiteThemeContext.Provider value={value}>
      {EditionApp ? (
        // Keyed so each edition gets a fresh boundary instead of suspending
        // inside the one that is still showing the previous edition
        <Suspense
          key={theme}
          fallback={
            <div style={{ position: "fixed", inset: 0, background: "#000" }} />
          }
        >
          <EditionApp />
        </Suspense>
      ) : (
        children
      )}
      {/* The other editions animate their own entrance and exit */}
      {theme === "modern" && phase !== "idle" && (
        <ScreenWipe
          key={phase}
          mode={phase === "leaving" ? "cover" : "reveal"}
          variant={wipe}
          duration={WIPE_MS}
        />
      )}
    </SiteThemeContext.Provider>
  );
}
