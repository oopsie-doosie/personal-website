// src/theme/ScreenWipe.tsx
// Full-screen transitions played over the modern edition while the site
// switches to (or back from) another edition: chunky pixels for the retro
// game, growing halftone ink dots for the newspaper.
import { useEffect, useRef } from "react";

export type WipeStyle = "pixels" | "halftone";

const PIXEL = 32;
// The leading edge of the pixel dissolve flashes these before settling to black
const SPARKS = ["#ff3ea5", "#3ef3ff", "#ffd23f", "#8a5cff"];
const DOT = 26;
const INK = "#14110d";

interface Cell {
  x: number;
  y: number;
  key: number;
}

// Random order, loosely sweeping from the top-right corner (the toggles)
const sweepOrder = (cols: number, rows: number, randomness: number): Cell[] =>
  Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    const sweep = ((cols - x) / cols + y / rows) / 2;
    return { x, y, key: sweep * (1 - randomness) + Math.random() * randomness };
  });

const drawPixels = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mode: "cover" | "reveal") => {
  // One canvas pixel per cell, scaled up with pixelated rendering
  const cols = Math.ceil(window.innerWidth / PIXEL);
  const rows = Math.ceil(window.innerHeight / PIXEL);
  canvas.width = cols;
  canvas.height = rows;
  canvas.style.width = `${cols * PIXEL}px`;
  canvas.style.height = `${rows * PIXEL}px`;
  canvas.style.imageRendering = "pixelated";
  const order = sweepOrder(cols, rows, 0.45).sort((a, b) => a.key - b.key);

  return (progress: number) => {
    const done = Math.floor(progress * order.length);
    const edge = Math.max(1, Math.floor(order.length * 0.06));
    ctx.clearRect(0, 0, cols, rows);
    const [from, to] = mode === "cover" ? [0, done] : [done, order.length];
    for (let i = from; i < to; i++) {
      const sparking = mode === "cover" ? i > done - edge : i < done + edge;
      ctx.fillStyle = sparking ? SPARKS[i % SPARKS.length] : "#000";
      ctx.fillRect(order[i].x, order[i].y, 1, 1);
    }
  };
};

const drawHalftone = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mode: "cover" | "reveal") => {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(ratio, ratio);
  const cells = sweepOrder(Math.ceil(width / DOT) + 1, Math.ceil(height / DOT) + 1, 0.2);
  // Big enough that neighbouring dots overlap into solid ink
  const full = DOT * 0.75;

  return (progress: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = INK;
    if (mode === "cover" && progress >= 1) {
      ctx.fillRect(0, 0, width, height);
      return;
    }
    ctx.beginPath();
    for (const cell of cells) {
      // Each dot grows (or shrinks) over a third of the run, staggered by the sweep
      const local = Math.min(1, Math.max(0, (progress - cell.key * 0.65) / 0.35));
      const radius = full * (mode === "cover" ? local : 1 - local);
      if (radius < 0.3) continue;
      const cx = cell.x * DOT;
      const cy = cell.y * DOT;
      ctx.moveTo(cx + radius, cy);
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    }
    ctx.fill();
  };
};

export function ScreenWipe({
  mode,
  variant,
  duration,
}: {
  mode: "cover" | "reveal";
  variant: WipeStyle;
  duration: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const draw = (variant === "pixels" ? drawPixels : drawHalftone)(canvas, ctx, mode);

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
  }, [mode, variant, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        pointerEvents: "auto",
      }}
    />
  );
}
