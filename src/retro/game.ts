// src/retro/game.ts
// Arcade state for the retro edition: score, hidden coins, achievements and
// player settings. A tiny external store, so the HUD can tick away without
// re-rendering the whole page.
import { useSyncExternalStore } from "react";

export const ACHIEVEMENTS = {
  start: { title: "PRESS START", text: "Began a new game" },
  prologue: { title: "LORE KEEPER", text: "Read the whole prologue" },
  player: { title: "CHARACTER SHEET", text: "Inspected Player 1" },
  map: { title: "CARTOGRAPHER", text: "Opened the world map" },
  boss: { title: "THESIS DEFENDED", text: "Won the boss battle" },
  clear: { title: "STAGE CLEAR", text: "Tallied a stage bonus" },
  cartridge: { title: "BLOW ON IT", text: "Got the bonus cartridge running" },
  inventory: { title: "PACK RAT", text: "Opened the inventory" },
  sidequests: { title: "SIDE QUESTER", text: "Found the side quests" },
  coins: { title: "TREASURE HUNTER", text: "Found every hidden coin" },
  contact: { title: "PLAYER 2 HAS ENTERED", text: "Pressed a contact button" },
  cheat: { title: "CHEATER!", text: "Entered the secret code" },
  credits: { title: "THE END?", text: "Rolled the credits" },
} as const;

export type AchievementId = keyof typeof ACHIEVEMENTS;
export const ACHIEVEMENT_IDS = Object.keys(ACHIEVEMENTS) as AchievementId[];

// One coin is hidden in each of these sections
export const COIN_IDS = [
  "title",
  "prologue",
  "player",
  "map",
  "boss",
  "bonus",
  "inventory",
  "credits",
] as const;
export type CoinId = (typeof COIN_IDS)[number];

export const POINTS = { section: 1000, achievement: 500, coin: 250, click: 10 };

export interface Settings {
  sfx: boolean;
  music: boolean;
  crt: boolean;
}

export interface Toast {
  id: number;
  title: string;
  text: string;
  points: number;
}

export interface GameState {
  score: number;
  hiScore: number;
  coins: readonly CoinId[];
  achievements: readonly AchievementId[];
  toasts: readonly Toast[];
  stage: string;
  lives: number;
  cheat: boolean;
  settings: Settings;
}

const SAVE_KEY = "rx-save";
// Like an arcade cabinet fresh from the factory: a score worth chasing
const DEFAULT_HI_SCORE = 25000;

const loadSave = (): Pick<GameState, "hiScore" | "settings"> => {
  const defaults = {
    hiScore: DEFAULT_HI_SCORE,
    settings: { sfx: false, music: false, crt: true },
  };
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "{}");
    return {
      hiScore:
        typeof saved.hiScore === "number" ? saved.hiScore : defaults.hiScore,
      settings: { ...defaults.settings, ...saved.settings },
    };
  } catch {
    return defaults;
  }
};

let state: GameState = {
  score: 0,
  coins: [],
  achievements: [],
  toasts: [],
  stage: "TITLE SCREEN",
  lives: 3,
  cheat: false,
  ...loadSave(),
};

const listeners = new Set<() => void>();
const visitedSections = new Set<string>();
let nextToastId = 1;
let saveTimer: number | undefined;

const update = (patch: Partial<GameState>) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

const save = () => {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ hiScore: state.hiScore, settings: state.settings })
      );
    } catch {
      // Saving is a nicety; the game works without it
    }
  }, 400);
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// Selectors must return primitives or existing state objects (not new ones)
export const useGame = <T,>(select: (s: GameState) => T): T =>
  useSyncExternalStore(subscribe, () => select(state));

export const game = {
  get state() {
    return state;
  },

  addScore(points: number) {
    const score = state.score + points;
    const hiScore = Math.max(state.hiScore, score);
    update({ score, hiScore });
    if (hiScore !== DEFAULT_HI_SCORE) save();
  },

  unlock(id: AchievementId) {
    if (state.achievements.includes(id)) return;
    const { title, text } = ACHIEVEMENTS[id];
    update({
      achievements: [...state.achievements, id],
      toasts: [
        ...state.toasts,
        { id: nextToastId++, title, text, points: POINTS.achievement },
      ],
    });
    this.addScore(POINTS.achievement);
  },

  dismissToast(id: number) {
    update({ toasts: state.toasts.filter((toast) => toast.id !== id) });
  },

  collectCoin(id: CoinId) {
    if (state.coins.includes(id)) return;
    update({ coins: [...state.coins, id] });
    this.addScore(POINTS.coin);
    if (state.coins.length === COIN_IDS.length) this.unlock("coins");
  },

  // Called as each section scrolls through the middle of the screen
  enterSection(id: string, label: string, achievement?: AchievementId) {
    if (state.stage !== label) update({ stage: label });
    if (visitedSections.has(id)) return;
    visitedSections.add(id);
    if (id !== "title") this.addScore(POINTS.section);
    if (achievement) this.unlock(achievement);
  },

  activateCheat() {
    update({ cheat: true, lives: 99 });
    this.unlock("cheat");
  },

  setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    update({ settings: { ...state.settings, [key]: value } });
    save();
  },
};
