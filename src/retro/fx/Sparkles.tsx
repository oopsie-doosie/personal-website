// src/retro/fx/Sparkles.tsx
// Draws the shared pixel particles (see particles.ts): a sparkle trail behind
// the mouse, a burst and "+10" on every click, plus whatever else spawns them.
import { useEffect, useRef } from "react";
import { game, POINTS } from "../game";
import { prefersReducedMotion } from "../hooks";
import { onSpawn, particles, spawnBurst, spawnText, spawnTrail, RAINBOW } from "../particles";

const GRID = 4;
const TRAIL_SPACING = 14;

export function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = prefersReducedMotion();
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let running = false;
    let lastTrail = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const snap = (value: number) => Math.round(value / GRID) * GRID;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        if (--p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        // Fade in hard steps, not smoothly
        const left = p.life / p.maxLife;
        ctx.globalAlpha = left > 0.5 ? 1 : left > 0.25 ? 0.6 : 0.3;
        if (p.shape === "text") {
          ctx.font = `${p.size}px "Press Start 2P", monospace`;
          ctx.textAlign = "center";
          ctx.fillStyle = "#0b0718";
          ctx.fillText(p.text ?? "", snap(p.x) + 3, snap(p.y) + 3);
          ctx.fillStyle = p.color;
          ctx.fillText(p.text ?? "", snap(p.x), snap(p.y));
          continue;
        }
        const x = snap(p.x);
        const y = snap(p.y);
        ctx.fillStyle = p.color;
        ctx.fillRect(x, y, p.size, p.size);
        if (p.shape === "star") {
          ctx.fillRect(x - p.size, y, p.size, p.size);
          ctx.fillRect(x + p.size, y, p.size, p.size);
          ctx.fillRect(x, y - p.size, p.size, p.size);
          ctx.fillRect(x, y + p.size, p.size, p.size);
        }
      }
      ctx.globalAlpha = 1;
      if (particles.length) requestAnimationFrame(loop);
      else running = false;
    };

    const wake = () => {
      if (running) return;
      running = true;
      requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const dx = event.clientX - lastTrail.x;
      const dy = event.clientY - lastTrail.y;
      if (dx * dx + dy * dy < TRAIL_SPACING * TRAIL_SPACING) return;
      lastTrail = { x: event.clientX, y: event.clientY };
      const cheat = game.state.cheat;
      for (let i = 0; i < (cheat ? 3 : 1); i++) {
        spawnTrail(event.clientX, event.clientY, cheat ? RAINBOW : undefined);
      }
    };

    const onDown = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest?.(".rx-coin")) return;
      game.addScore(POINTS.click);
      if (still) return;
      spawnBurst(event.clientX, event.clientY, { count: 10, speed: 3.5 });
      spawnText(event.clientX, event.clientY - 16, `+${POINTS.click}`, "#ffffff");
    };

    resize();
    const stop = onSpawn(wake);
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onDown);
    if (finePointer && !still) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      stop();
      particles.length = 0;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="rx-sparkles" aria-hidden="true" />;
}
