// src/retro/stages.ts
// Turns education and experience into the game's stages, numbered in the
// order they were played: school first, the current role last.
import { education, experience } from "@/data/index";
import { planet, type Art } from "./sprites";

export interface Stage {
  id: string;
  number: number;
  name: string;
  period: string;
  status: "clear" | "current";
  kind: "school" | "job";
  // Index into `education` or `experience`
  index: number;
  world: Art;
}

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const WORLDS: Art[] = [
  planet(9, ["c", "C", "B"]),
  planet(9, ["W", "g", "G"], "y"),
  planet(10, ["q", "p", "V"], "c"),
  planet(9, ["l", "L", "B"], "W"),
];

// src/data lists experience newest first
const played = [
  ...education.map((school, index) => ({ kind: "school" as const, index, name: school.school, period: school.period })),
  ...experience
    .map((job, index) => ({ kind: "job" as const, index, name: job.company, period: job.period }))
    .reverse(),
];

export const STAGES: Stage[] = played.map((stage, i) => ({
  ...stage,
  id: slug(stage.name),
  number: i + 1,
  status: /present/i.test(stage.period) ? "current" : "clear",
  world: WORLDS[i % WORLDS.length],
}));

export const stageFor = (kind: Stage["kind"], index: number) =>
  STAGES.find((stage) => stage.kind === kind && stage.index === index)!;
