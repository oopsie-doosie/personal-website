// src/retro/particles.ts
// Pixel particles (sparkle trails, bursts, floating "+250" text) shared by
// every part of the retro edition and drawn by <Sparkles />.

export const RAINBOW = ["#ff3ea5", "#ffd23f", "#3ef3ff", "#7dff3a", "#a07bff", "#ff6b1c"];
export const GOLD = ["#ffd23f", "#ff9f1c", "#fff2c4", "#ffffff"];

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  shape: "square" | "star" | "text";
  text?: string;
}

export const particles: Particle[] = [];
const MAX_PARTICLES = 600;

let wake: (() => void) | null = null;
// <Sparkles /> registers here so it only animates while particles exist
export const onSpawn = (fn: () => void) => {
  wake = fn;
  return () => {
    if (wake === fn) wake = null;
  };
};

const add = (particle: Particle) => {
  if (particles.length >= MAX_PARTICLES) particles.shift();
  particles.push(particle);
};

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

export const spawnBurst = (
  x: number,
  y: number,
  { count = 16, colors = RAINBOW, speed = 5, gravity = 0.18, size = 4 } = {}
) => {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const velocity = speed * (0.4 + Math.random() * 0.8);
    const life = 30 + Math.random() * 30;
    add({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - speed * 0.3,
      gravity,
      life,
      maxLife: life,
      color: pick(colors),
      size: Math.random() < 0.25 ? size * 2 : size,
      shape: Math.random() < 0.3 ? "star" : "square",
    });
  }
  wake?.();
};

export const spawnTrail = (x: number, y: number, colors = RAINBOW) => {
  const life = 22 + Math.random() * 18;
  add({
    x: x + (Math.random() - 0.5) * 10,
    y: y + (Math.random() - 0.5) * 10,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 0.8,
    gravity: 0.05,
    life,
    maxLife: life,
    color: pick(colors),
    size: 4,
    shape: Math.random() < 0.35 ? "star" : "square",
  });
  wake?.();
};

export const spawnText = (x: number, y: number, text: string, color = "#ffd23f") => {
  add({ x, y, vx: 0, vy: -1.4, gravity: 0.02, life: 50, maxLife: 50, color, size: 16, shape: "text", text });
  wake?.();
};

// A short fireworks show across the whole screen
export const spawnFireworks = (bursts = 8) => {
  for (let i = 0; i < bursts; i++) {
    window.setTimeout(() => {
      spawnBurst(
        window.innerWidth * (0.15 + Math.random() * 0.7),
        window.innerHeight * (0.15 + Math.random() * 0.45),
        { count: 28, speed: 7, gravity: 0.12, colors: [pick(RAINBOW), pick(RAINBOW), "#ffffff"] }
      );
    }, i * 180);
  }
};
