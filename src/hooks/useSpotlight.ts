// src/hooks/useSpotlight.ts
import { useEffect } from "react";

// Feeds the pointer position to the hovered `.spotlight` card as CSS
// variables, which drive its glow (see .spotlight in index.css)
export const useSpotlight = () => {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(
        ".spotlight"
      );
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);
};
