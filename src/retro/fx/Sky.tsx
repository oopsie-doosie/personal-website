// src/retro/fx/Sky.tsx
// The fixed backdrop behind every screen: a dithered nebula with three layers
// of parallax stars and the odd shooting star, drawn at a third of the screen
// resolution and scaled up with chunky pixels.
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";
import { BAYER } from "../sprites";

const PX = 3;
const FRAME_MS = 50;
const GRADIENT = ["#04010c", "#0a0428", "#170842", "#26094e"];
const NEBULA = ["#2c0c5c", "#4a1170", "#6b1a86"];
const STAR_COLORS = ["#ffffff", "#ffffff", "#c9d4ff", "#3ef3ff", "#ffb3dd", "#ffd23f"];
const LAYER_SPEED = [0.03, 0.08, 0.16];

interface Star {
  x: number;
  y: number;
  layer: number;
  color: string;
  phase: number;
}

const hex = (color: string) => [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));

// Smooth value noise, good enough for clouds
const makeNoise = (width: number, height: number, cell: number) => {
  const cols = Math.ceil(width / cell) + 2;
  const rows = Math.ceil(height / cell) + 2;
  const grid = Array.from({ length: cols * rows }, Math.random);
  const smooth = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const gx = x / cell;
    const gy = y / cell;
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const fx = smooth(gx - x0);
    const fy = smooth(gy - y0);
    const at = (cx: number, cy: number) => grid[cy * cols + cx];
    const top = at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx;
    const bottom = at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx;
    return top * (1 - fy) + bottom * fy;
  };
};

const paintBackdrop = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(width, height);
  const gradient = GRADIENT.map(hex);
  const nebula = NEBULA.map(hex);
  const big = makeNoise(width, height, 48);
  const small = makeNoise(width, height, 14);

  for (let y = 0; y < height; y++) {
    const position = (y / height) * (gradient.length - 1);
    const band = Math.floor(position);
    for (let x = 0; x < width; x++) {
      const threshold = BAYER[y % 4][x % 4];
      let color = gradient[Math.min(gradient.length - 1, band + (position - band > threshold ? 1 : 0))];
      // A diagonal band of cloud across the sky
      const diagonal = 1 - Math.abs((x / width) * 0.7 - (y / height) + 0.15) * 2.2;
      const cloud = (big(x, y) * 0.65 + small(x, y) * 0.35) * Math.max(0, diagonal);
      if (cloud > 0.5 + threshold * 0.12) color = nebula[0];
      if (cloud > 0.6 + threshold * 0.12) color = nebula[1];
      if (cloud > 0.7 + threshold * 0.1) color = nebula[2];
      const i = (y * width + x) * 4;
      image.data[i] = color[0];
      image.data[i + 1] = color[1];
      image.data[i + 2] = color[2];
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
};

export function Sky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let backdrop: HTMLCanvasElement | null = null;
    let stars: Star[] = [];
    let shooting: { x: number; y: number; age: number } | null = null;
    let nextShooting = 60;
    let tick = 0;
    let frame = 0;
    let last = 0;

    const resize = () => {
      width = Math.ceil(window.innerWidth / PX);
      height = Math.ceil(window.innerHeight / PX);
      canvas.width = width;
      canvas.height = height;
      backdrop = paintBackdrop(width, height);
      stars = Array.from({ length: Math.round((width * height) / 70) }, () => ({
        x: Math.floor(Math.random() * width),
        y: Math.random() * height,
        layer: Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        phase: Math.floor(Math.random() * 120),
      }));
      draw();
    };

    const draw = () => {
      if (!backdrop) return;
      ctx.drawImage(backdrop, 0, 0);
      const scroll = still ? 0 : window.scrollY / PX;
      for (const star of stars) {
        const y = Math.floor((((star.y - scroll * LAYER_SPEED[star.layer]) % height) + height) % height);
        const twinkle = !still && (tick + star.phase) % 120 < 6;
        ctx.globalAlpha = star.layer === 0 && !twinkle ? 0.55 : 1;
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, y, 1, 1);
        if (star.layer === 2 || twinkle) {
          ctx.globalAlpha = twinkle ? 0.9 : 0.35;
          ctx.fillRect(star.x - 1, y, 1, 1);
          ctx.fillRect(star.x + 1, y, 1, 1);
          ctx.fillRect(star.x, y - 1, 1, 1);
          ctx.fillRect(star.x, y + 1, 1, 1);
        }
      }
      ctx.globalAlpha = 1;
      if (shooting) {
        for (let i = 0; i < 8; i++) {
          ctx.globalAlpha = 1 - i / 8;
          ctx.fillStyle = i === 0 ? "#ffffff" : "#ffd23f";
          ctx.fillRect(Math.round(shooting.x + i * 2), Math.round(shooting.y - i), 1, 1);
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      tick++;
      if (shooting) {
        shooting.x -= 4;
        shooting.y += 2;
        if (++shooting.age > 24) shooting = null;
      } else if (--nextShooting <= 0) {
        shooting = { x: width * (0.4 + Math.random() * 0.6), y: height * Math.random() * 0.4, age: 0 };
        nextShooting = 70 + Math.random() * 120;
      }
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!still) frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="rx-sky" aria-hidden="true" />;
}
