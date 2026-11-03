// src/retro/fx/HeroScene.tsx
// The title screen's landscape: a ringed planet, two ranges of drifting
// mountains and a perspective checkerboard floor rushing towards the viewer
// (the faux-3D floor trick of 16-bit consoles), all at quarter resolution.
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";
import { BAYER, PALETTE, SHIP, planet, type Art } from "../sprites";

const PX = 4;
const FRAME_MS = 33;
const RIDGE_LENGTH = 512;
const PLANET = planet(15, ["q", "p", "V"], "c");

const rgba = (color: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
  // ImageData is little-endian RGBA
  return (255 << 24) | (b << 16) | (g << 8) | r;
};
const FLOOR_A = rgba("#3b0f6e");
const FLOOR_B = rgba("#12052e");
const FOG = rgba("#a3127a");
const GLOW = rgba("#ff3ea5");

// A looping mountain ridge by midpoint displacement
const makeRidge = (roughness: number, height: number) => {
  const ridge = new Array(RIDGE_LENGTH).fill(0);
  let step = RIDGE_LENGTH / 4;
  let spread = height;
  for (let i = 0; i < RIDGE_LENGTH; i += step) ridge[i] = Math.random() * height;
  while (step > 1) {
    const half = step / 2;
    for (let i = 0; i < RIDGE_LENGTH; i += step) {
      const next = ridge[(i + step) % RIDGE_LENGTH];
      ridge[i + half] = (ridge[i] + next) / 2 + (Math.random() - 0.5) * spread;
    }
    spread *= roughness;
    step = half;
  }
  const min = Math.min(...ridge);
  return ridge.map((h) => Math.max(2, Math.round(h - min + 3)));
};

const drawArt = (ctx: CanvasRenderingContext2D, art: Art, x: number, y: number) => {
  art.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const color = PALETTE[row[c]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + c, y + r, 1, 1);
    }
  });
};

const toCanvas = (art: Art) => {
  const canvas = document.createElement("canvas");
  canvas.width = art[0].length;
  canvas.height = art.length;
  drawArt(canvas.getContext("2d")!, art, 0, 0);
  return canvas;
};

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = prefersReducedMotion();
    const planetImage = toCanvas(PLANET);
    const shipImage = toCanvas(SHIP);
    const far = makeRidge(0.55, 22);
    const near = makeRidge(0.5, 14);

    let width = 0;
    let height = 0;
    let horizon = 0;
    let floor: ImageData | null = null;
    let time = 0;
    let frame = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      width = Math.ceil(canvas.clientWidth / PX);
      height = Math.ceil(canvas.clientHeight / PX);
      canvas.width = width;
      canvas.height = height;
      horizon = Math.round(height * 0.68);
      floor = ctx.createImageData(width, height - horizon);
      draw();
    };

    const drawFloor = () => {
      if (!floor) return;
      const pixels = new Uint32Array(floor.data.buffer);
      const rows = height - horizon;
      for (let y = 0; y < rows; y++) {
        const depth = 30 / (y + 1.5);
        const v = depth * 2.2 + time * 1.6;
        const fog = 1 - y / (rows * 0.32);
        for (let x = 0; x < width; x++) {
          const threshold = BAYER[y % 4][x % 4];
          let color: number;
          if (y === 0) color = GLOW;
          else if (fog > threshold) color = fog - 0.35 > threshold ? FOG : GLOW;
          else {
            const u = ((x - width / 2) / width) * depth * 7 + Math.sin(time * 0.3) * 2;
            color = (Math.floor(u) + Math.floor(v)) & 1 ? FLOOR_A : FLOOR_B;
          }
          pixels[y * width + x] = color;
        }
      }
      ctx.putImageData(floor, 0, horizon);
    };

    const drawRidge = (ridge: number[], offset: number, fill: string, edge: string) => {
      for (let x = 0; x < width; x++) {
        const h = ridge[Math.floor(x + offset) % RIDGE_LENGTH];
        ctx.fillStyle = fill;
        ctx.fillRect(x, horizon - h, 1, h);
        ctx.fillStyle = edge;
        ctx.fillRect(x, horizon - h, 1, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const bob = still ? 0 : Math.round(Math.sin(time * 0.15) * 2);
      // On narrow screens the planet tucks into the corner, clear of the logo
      const narrow = width < 200;
      ctx.drawImage(
        planetImage,
        Math.round(width * (narrow ? 0.9 : 0.8) - PLANET[0].length / 2),
        Math.round(height * (narrow ? 0.07 : 0.15)) + bob
      );

      // Every so often a ship streaks across the sky
      const lap = (time * 2.2) % (width * 3);
      if (!still && lap < width + 20) {
        ctx.drawImage(shipImage, Math.round(lap - 20), Math.round(height * 0.38 + Math.sin(lap / 9) * 3));
      }

      drawRidge(far, time * 0.6, "#24104f", "#5b2bb0");
      drawRidge(near, time * 1.4, "#140833", "#3a1a78");
      drawFloor();
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || now - last < FRAME_MS) return;
      last = now;
      time += 1;
      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    resize();
    window.addEventListener("resize", resize);
    if (!still) frame = requestAnimationFrame(loop);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="rx-hero-scene" aria-hidden="true" />;
}
