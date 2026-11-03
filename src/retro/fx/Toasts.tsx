// src/retro/fx/Toasts.tsx
// "ACHIEVEMENT UNLOCKED" pop-ups.
import { useEffect, useRef } from "react";
import { game, useGame } from "../game";
import { sfx } from "../sound";
import { TROPHY } from "../sprites";
import { Sprite } from "../ui";

const SHOW_MS = 3800;

export function Toasts() {
  const toasts = useGame((s) => s.toasts);
  const scheduled = useRef(new Set<number>());

  useEffect(() => {
    for (const toast of toasts) {
      if (scheduled.current.has(toast.id)) continue;
      scheduled.current.add(toast.id);
      sfx.achievement();
      window.setTimeout(() => game.dismissToast(toast.id), SHOW_MS);
    }
  }, [toasts]);

  return (
    <div className="rx-toasts" role="status" aria-live="polite">
      {toasts.slice(-3).map((toast) => (
        <div key={toast.id} className="rx-toast">
          <Sprite art={TROPHY} className="rx-toast-icon" />
          <div>
            <p className="rx-toast-kicker">ACHIEVEMENT UNLOCKED</p>
            <p className="rx-toast-title">{toast.title}</p>
            <p className="rx-toast-text">
              {toast.text} <span>+{toast.points}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
