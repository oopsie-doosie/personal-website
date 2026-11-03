// src/theme/PixelWipe.tsx
// Full-screen dissolve made of chunky squares, played over the modern edition
// while the site switches to (or back from) the retro one.
import { useEffect, useRef } from "react";

const CELL = 32;
// The leading edge of the dissolve flashes these before settling to black
const SPARKS = ["#ff3ea5", "#3ef3ff", "#ffd23f", "#8a5cff"];

export function PixelWipe({
  mode,
  duration,
}: {
  mode: "cover" | "reveal";
  duration: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // One canvas pixel per cell, scaled up with pixelated rendering
    const cols = Math.ceil(window.innerWidth / CELL);
    const rows = Math.ceil(window.innerHeight / CELL);
    canvas.width = cols;
    canvas.height = rows;
    canvas.style.width = `${cols * CELL}px`;
    canvas.style.height = `${rows * CELL}px`;

    // Random order, loosely sweeping from the top-right corner (the toggle)
    const order = Array.from({ length: cols * rows }, (_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      const sweep = ((cols - x) / cols + y / rows) / 2;
      return { x, y, key: sweep * 0.55 + Math.random() * 0.45 };
    }).sort((a, b) => a.key - b.key);

    const draw = (progress: number) => {
      const done = Math.floor(progress * order.length);
      const edge = Math.max(1, Math.floor(order.length * 0.06));
      ctx.clearRect(0, 0, cols, rows);
      if (mode === "cover") {
        for (let i = 0; i < done; i++) {
          ctx.fillStyle = i > done - edge ? SPARKS[i % SPARKS.length] : "#000";
          ctx.fillRect(order[i].x, order[i].y, 1, 1);
        }
      } else {
        for (let i = done; i < order.length; i++) {
          ctx.fillStyle = i < done + edge ? SPARKS[i % SPARKS.length] : "#000";
          ctx.fillRect(order[i].x, order[i].y, 1, 1);
        }
      }
    };

    if (duration <= 0) {
      draw(1);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // The first frame's timestamp can predate `start`
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      draw(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    draw(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        imageRendering: "pixelated",
        pointerEvents: "auto",
      }}
    />
  );
}
