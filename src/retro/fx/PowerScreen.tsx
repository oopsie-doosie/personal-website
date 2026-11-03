// src/retro/fx/PowerScreen.tsx
// The CRT switching on (and, when leaving, off), then a publisher splash
// the first time per visit. Timings match the keyframes in retro.css.
import { useEffect, useState } from "react";
import { cx, prefersReducedMotion } from "../hooks";

type Step = "on" | "splash" | "reveal" | "done";

const SPLASH_KEY = "rx-splash-seen";
const DURATION: Record<Step, number> = { on: 650, splash: 2400, reveal: 700, done: 0 };

const CrtLines = () => (
  <>
    <i className="rx-pw-top" />
    <i className="rx-pw-bottom" />
    <i className="rx-pw-line" />
    <i className="rx-pw-flash" />
  </>
);

export function PowerScreen({ leaving }: { leaving: boolean }) {
  const [splash] = useState(() => {
    try {
      return !sessionStorage.getItem(SPLASH_KEY);
    } catch {
      return false;
    }
  });
  const [step, setStep] = useState<Step>(() => (prefersReducedMotion() ? "done" : "on"));

  useEffect(() => {
    if (step === "done") return;
    if (step === "splash") {
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {
        // Then the splash simply plays again next time
      }
    }
    const next: Step = step === "on" ? (splash ? "splash" : "done") : step === "splash" ? "reveal" : "done";
    const timer = window.setTimeout(() => setStep(next), DURATION[step]);
    return () => window.clearTimeout(timer);
  }, [step, splash]);

  // Any key or click skips the splash
  useEffect(() => {
    if (step !== "splash") return;
    const skip = () => setStep("reveal");
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [step]);

  if (leaving) {
    return (
      <div className="rx-power rx-power-off" aria-hidden="true">
        <CrtLines />
      </div>
    );
  }
  if (step === "done") return null;

  return (
    <div className={cx("rx-power", `rx-power-${step}`)} aria-hidden="true">
      {splash && (
        <div className="rx-splash">
          {step !== "on" && (
            <div className="rx-splash-logo">
              <p className="rx-splash-name" data-text="POLATSOFT">
                POLATSOFT
              </p>
              <p className="rx-splash-sub">PRESENTS</p>
              <span className="rx-splash-star" />
              <span className="rx-splash-star" />
              <span className="rx-splash-star" />
            </div>
          )}
          {step === "reveal" && <i className="rx-iris" />}
        </div>
      )}
      {step === "on" && <CrtLines />}
    </div>
  );
}
