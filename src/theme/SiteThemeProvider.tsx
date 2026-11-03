// src/theme/SiteThemeProvider.tsx
// Renders whichever edition of the site is active and animates the switch.
// The retro edition is code-split, so visitors who stay on the modern site
// never download it.
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
import { PixelWipe } from "./PixelWipe";
import {
  SiteThemeContext,
  rememberTheme,
  useSiteTheme,
  type SiteTheme,
  type ThemePhase,
} from "./siteTheme";

// Pixel dissolve over the modern edition, and the retro edition's CRT
// power-off (see .rx-power in src/retro/retro.css)
const WIPE_MS = 700;
const POWER_OFF_MS = 650;

const loadRetro = () => import("@/retro/RetroApp");

// If the retro chunk can't load (offline, stale deploy), fall back to modern
function RetroUnavailable() {
  const { switchTheme } = useSiteTheme();
  useEffect(() => {
    document.documentElement.classList.remove("rx-boot");
    switchTheme("modern");
  }, [switchTheme]);
  return null;
}

const RetroApp = lazy<ComponentType>(() =>
  loadRetro().catch(() => ({ default: RetroUnavailable }))
);

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
  const switching = useRef(false);

  const preloadRetro = useCallback(() => {
    loadRetro().catch(() => {});
  }, []);

  const switchTheme = useCallback(
    async (next: SiteTheme) => {
      if (switching.current || next === theme) return;
      switching.current = true;
      const instant = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setPhase("leaving");
      try {
        await Promise.all([
          next === "retro" ? loadRetro() : null,
          wait(instant ? 0 : next === "retro" ? WIPE_MS : POWER_OFF_MS),
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
    () => ({ theme, phase, switchTheme, preloadRetro }),
    [theme, phase, switchTheme, preloadRetro]
  );

  return (
    <SiteThemeContext.Provider value={value}>
      {theme === "modern" ? (
        children
      ) : (
        <Suspense
          fallback={
            <div style={{ position: "fixed", inset: 0, background: "#000" }} />
          }
        >
          <RetroApp />
        </Suspense>
      )}
      {/* The retro edition animates its own entrance and exit */}
      {theme === "modern" && phase !== "idle" && (
        <PixelWipe
          key={phase}
          mode={phase === "leaving" ? "cover" : "reveal"}
          duration={WIPE_MS}
        />
      )}
    </SiteThemeContext.Provider>
  );
}
