// src/paper/Halftone.tsx
// A newspaper "photograph": a scene painted off-screen at one pixel per dot,
// then reprinted as a staggered halftone screen whose dots grow with the
// darkness underneath. It prints itself in, top to bottom, when scrolled to.
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./hooks";

// Halftone cell size in CSS px: finer on small screens
const dotSize = (width: number) => (width < 520 ? 3.5 : 5);
const INK = "#1b1712";
const PRINT_MS = 1100;

type Paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

const palm = (ctx: CanvasRenderingContext2D, x: number, base: number, height: number, lean: number) => {
  const topX = x + lean;
  const topY = base - height;
  ctx.strokeStyle = "#111";
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(1.5, height * 0.035);
  ctx.beginPath();
  ctx.moveTo(x, base);
  ctx.quadraticCurveTo(x + lean * 0.2, base - height * 0.55, topX, topY);
  ctx.stroke();
  // Fronds droop out from the crown
  ctx.lineWidth = Math.max(1.2, height * 0.028);
  for (let i = 0; i < 9; i++) {
    const angle = -Math.PI / 2 + (i - 4) * 0.42;
    const length = height * (0.32 + (i % 2) * 0.06);
    const endX = topX + Math.cos(angle) * length;
    const endY = topY + Math.sin(angle) * length * 0.35 + length * 0.42;
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(topX + Math.cos(angle) * length * 0.6, topY - length * 0.3, endX, endY);
    ctx.stroke();
  }
};

// Sunset over the city: sky, sun, hills, a downtown skyline, palms and a road
const paintCity: Paint = (ctx, w, h) => {
  const horizon = h * 0.64;
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#3a3a3a");
  sky.addColorStop(0.55, "#9a9a9a");
  sky.addColorStop(1, "#f4f4f4");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);

  const glow = ctx.createRadialGradient(w * 0.66, horizon - h * 0.02, 0, w * 0.66, horizon, h * 0.45);
  glow.addColorStop(0, "rgba(255,255,255,0.95)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, horizon);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w * 0.66, horizon - h * 0.03, h * 0.11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#b5b5b5";
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  for (let x = 0; x <= w; x += w / 12) {
    ctx.lineTo(x, horizon - h * (0.06 + 0.05 * Math.abs(Math.sin(x * 0.045 + 1.3))));
  }
  ctx.lineTo(w, horizon);
  ctx.fill();

  // Downtown towers
  ctx.fillStyle = "#6d6d6d";
  const towers = [[0.2, 0.17], [0.235, 0.27], [0.27, 0.21], [0.3, 0.31], [0.335, 0.24], [0.37, 0.14], [0.4, 0.19]];
  for (const [x, tall] of towers) ctx.fillRect(w * x, horizon - h * tall, w * 0.032, h * tall);

  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(0, horizon, w, h - horizon);
  // The road, vanishing towards the sun
  ctx.fillStyle = "#5e5e5e";
  ctx.beginPath();
  ctx.moveTo(w * 0.62, horizon);
  ctx.lineTo(w * 0.7, horizon);
  ctx.lineTo(w * 1.05, h);
  ctx.lineTo(w * 0.28, h);
  ctx.fill();
  ctx.strokeStyle = "#e8e8e8";
  ctx.lineWidth = Math.max(1, w * 0.006);
  ctx.setLineDash([h * 0.05, h * 0.05]);
  ctx.beginPath();
  ctx.moveTo(w * 0.66, horizon);
  ctx.lineTo(w * 0.66, h);
  ctx.stroke();
  ctx.setLineDash([]);

  palm(ctx, w * 0.07, h * 1.02, h * 0.74, w * 0.03);
  palm(ctx, w * 0.17, h * 0.98, h * 0.56, -w * 0.02);
  palm(ctx, w * 0.88, h * 1.02, h * 0.78, -w * 0.035);
  palm(ctx, w * 0.96, h * 0.97, h * 0.5, w * 0.015);
};

const SCENES = { city: paintCity };

export function Halftone({
  scene,
  label,
  aspect = 1.6,
}: {
  scene: keyof typeof SCENES;
  label: string;
  aspect?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0;
    let printed = prefersReducedMotion();
    let dots: { x: number; y: number; r: number }[] = [];
    let height = 0;

    const layout = () => {
      const width = canvas.clientWidth;
      height = Math.round(width / aspect);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Paint the scene at one pixel per halftone cell, then read it back
      const dot = dotSize(width);
      const cols = Math.ceil(width / dot);
      const rows = Math.ceil(height / dot);
      const source = document.createElement("canvas");
      source.width = cols;
      source.height = rows;
      const sourceCtx = source.getContext("2d", { willReadFrequently: true })!;
      SCENES[scene](sourceCtx, cols, rows);
      const pixels = sourceCtx.getImageData(0, 0, cols, rows).data;

      dots = [];
      for (let row = 0; row < rows; row++) {
        // Odd rows shift half a cell, so they hold one dot fewer
        for (let col = 0; col < cols - (row % 2); col++) {
          const i = (row * cols + col) * 4;
          const light = pixels[i] / 255 + (Math.random() - 0.5) * 0.06;
          const dark = Math.min(1, Math.max(0, 1 - light));
          if (dark < 0.04) continue;
          // Dot area tracks darkness
          dots.push({
            x: col * dot + (row % 2 ? dot / 2 : 0),
            y: row * dot + dot / 2,
            r: Math.sqrt(dark) * dot * 0.68,
          });
        }
      }
      draw(printed ? height : 0);
    };

    const draw = (upTo: number) => {
      ctx.clearRect(0, 0, canvas.clientWidth, height);
      ctx.fillStyle = INK;
      ctx.beginPath();
      for (const dot of dots) {
        if (dot.y > upTo) continue;
        ctx.moveTo(dot.x + dot.r, dot.y);
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const print = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / PRINT_MS);
        draw(progress * height);
        if (progress < 1) frame = requestAnimationFrame(step);
        else printed = true;
      };
      frame = requestAnimationFrame(step);
    };

    const resize = new ResizeObserver(layout);
    resize.observe(canvas);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || printed) return;
        observer.disconnect();
        print();
      },
      { threshold: 0.3 }
    );
    observer.observe(canvas);
    return () => {
      resize.disconnect();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [scene, aspect]);

  return <canvas ref={canvasRef} className="np-halftone" role="img" aria-label={label} />;
}
