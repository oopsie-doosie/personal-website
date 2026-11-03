// src/retro/sound.ts
// Chiptune sound effects and a looping soundtrack, synthesized live with the
// Web Audio API: no audio files. Everything stays silent until the player
// turns sound on from the HUD or the title screen's options.
import { game } from "./game";

let ctx: AudioContext | null = null;
let sfxBus: GainNode | null = null;
let musicBus: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;

const audio = () => {
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.55;
    sfxBus.connect(ctx.destination);
    musicBus = ctx.createGain();
    musicBus.gain.value = 0.32;
    musicBus.connect(ctx.destination);
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended" && !document.hidden) {
    ctx.resume().catch(() => {});
  }
  return ctx;
};

// "A4" -> 440
const NOTE_INDEX: Record<string, number> = {
  C: -9, "C#": -8, D: -7, "D#": -6, E: -5, F: -4,
  "F#": -3, G: -2, "G#": -1, A: 0, "A#": 1, B: 2,
};
const hz = (note: string) => {
  const name = note.slice(0, -1);
  const octave = Number(note.slice(-1));
  return 440 * 2 ** ((NOTE_INDEX[name] + (octave - 4) * 12) / 12);
};

interface ToneOptions {
  freq: number;
  to?: number;
  type?: OscillatorType;
  at?: number;
  length?: number;
  volume?: number;
  bus?: GainNode | null;
}

const tone = (c: AudioContext, opts: ToneOptions) => {
  const { freq, to, type = "square", length = 0.1, volume = 0.2 } = opts;
  const at = opts.at ?? c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, at + length);
  gain.gain.setValueAtTime(volume, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(opts.bus ?? sfxBus!);
  osc.start(at);
  osc.stop(at + length + 0.02);
};

const noise = (
  c: AudioContext,
  { at = c.currentTime, length = 0.2, volume = 0.2, filter = 4000, bus = sfxBus } = {}
) => {
  const source = c.createBufferSource();
  const band = c.createBiquadFilter();
  const gain = c.createGain();
  source.buffer = noiseBuffer;
  band.type = "bandpass";
  band.frequency.value = filter;
  gain.gain.setValueAtTime(volume, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  source.connect(band).connect(gain).connect(bus!);
  source.start(at);
  source.stop(at + length + 0.02);
};

// Plays a list of [note, beats] at a fixed step length
const jingle = (c: AudioContext, notes: [string, number][], step: number, type: OscillatorType = "square", volume = 0.16) => {
  let at = c.currentTime;
  for (const [note, beats] of notes) {
    if (note !== "-") tone(c, { freq: hz(note), type, at, length: step * beats * 0.95, volume });
    at += step * beats;
  }
};

const play = (fn: (c: AudioContext) => void) => () => {
  if (!game.state.settings.sfx) return;
  const c = audio();
  if (c) fn(c);
};

let lastBlip = 0;

export const sfx = {
  blip: play((c) => {
    // Hover sounds are rate-limited so sweeping the mouse isn't a buzzsaw
    if (c.currentTime - lastBlip < 0.05) return;
    lastBlip = c.currentTime;
    tone(c, { freq: 1320, length: 0.035, volume: 0.05 });
  }),
  select: play((c) => {
    tone(c, { freq: 660, length: 0.05, volume: 0.12 });
    tone(c, { freq: 990, at: c.currentTime + 0.05, length: 0.08, volume: 0.12 });
  }),
  back: play((c) => tone(c, { freq: 520, to: 260, length: 0.12, volume: 0.12 })),
  type: play((c) => tone(c, { freq: 1100 + Math.random() * 200, length: 0.018, volume: 0.035 })),
  tick: play((c) => tone(c, { freq: 1500, length: 0.025, volume: 0.06 })),
  coin: play((c) => {
    tone(c, { freq: hz("C6"), length: 0.07, volume: 0.13 });
    tone(c, { freq: hz("G6"), at: c.currentTime + 0.07, length: 0.3, volume: 0.13 });
  }),
  jump: play((c) => tone(c, { freq: 300, to: 760, length: 0.12, volume: 0.1 })),
  laser: play((c) => tone(c, { freq: 1400, to: 180, length: 0.14, volume: 0.09 })),
  hit: play((c) => {
    noise(c, { length: 0.14, volume: 0.25, filter: 1800 });
    tone(c, { freq: 220, to: 55, length: 0.16, volume: 0.14 });
  }),
  explode: play((c) => {
    noise(c, { length: 0.7, volume: 0.35, filter: 600 });
    tone(c, { freq: 140, to: 30, length: 0.6, type: "triangle", volume: 0.3 });
  }),
  error: play((c) => {
    tone(c, { freq: 140, length: 0.16, volume: 0.14 });
    tone(c, { freq: 140, at: c.currentTime + 0.2, length: 0.3, volume: 0.14 });
  }),
  whoosh: play((c) => noise(c, { length: 0.45, volume: 0.2, filter: 1200 })),
  powerUp: play((c) =>
    jingle(c, [["C5", 1], ["E5", 1], ["G5", 1], ["C6", 1], ["E6", 1], ["G6", 1], ["C7", 3]], 0.045)
  ),
  start: play((c) =>
    jingle(c, [["G4", 1], ["C5", 1], ["E5", 1], ["G5", 2], ["E5", 1], ["G5", 4]], 0.07)
  ),
  achievement: play((c) => {
    jingle(c, [["E5", 1], ["G5", 1], ["C6", 1], ["E6", 1], ["G6", 4]], 0.065, "square", 0.12);
    jingle(c, [["C4", 4], ["G3", 4]], 0.065, "triangle", 0.2);
  }),
  victory: play((c) => {
    jingle(c, [["G5", 1], ["G5", 1], ["C6", 2], ["-", 1], ["A5", 1], ["B5", 1], ["C6", 1], ["E6", 2], ["D6", 1], ["C6", 4]], 0.09);
    jingle(c, [["C4", 4], ["F3", 4], ["G3", 4], ["C3", 4]], 0.09, "triangle", 0.22);
  }),
  powerOn: play((c) => tone(c, { freq: 90, to: 1400, length: 0.35, type: "triangle", volume: 0.18 })),
  powerOff: play((c) => tone(c, { freq: 1400, to: 50, length: 0.5, type: "triangle", volume: 0.18 })),
};

// --- Soundtrack -----------------------------------------------------------
// An original 8-bar loop in A minor: lead, arpeggio, bass and drums.

const BPM = 140;
const STEP = 60 / BPM / 4; // a sixteenth note
const BARS = 8;
const CHORDS: [string, string[]][] = [
  ["A2", ["A4", "C5", "E5"]],
  ["F2", ["F4", "A4", "C5"]],
  ["C3", ["G4", "C5", "E5"]],
  ["G2", ["G4", "B4", "D5"]],
  ["A2", ["A4", "C5", "E5"]],
  ["F2", ["F4", "A4", "C5"]],
  ["C3", ["G4", "C5", "E5"]],
  ["E2", ["E4", "G#4", "B4"]],
];
// [note, sixteenths] per bar; "-" is a rest
const MELODY: [string, number][][] = [
  [["E5", 2], ["A5", 2], ["B5", 2], ["C6", 4], ["B5", 2], ["A5", 2], ["G5", 2]],
  [["A5", 4], ["F5", 2], ["A5", 2], ["C6", 6], ["A5", 2]],
  [["G5", 2], ["E5", 2], ["G5", 2], ["C6", 4], ["D6", 2], ["E6", 4]],
  [["D6", 6], ["B5", 2], ["G5", 4], ["-", 4]],
  [["E6", 2], ["D6", 2], ["C6", 2], ["B5", 2], ["A5", 4], ["E5", 4]],
  [["F5", 2], ["A5", 2], ["C6", 2], ["F6", 4], ["E6", 2], ["C6", 4]],
  [["E6", 4], ["D6", 2], ["C6", 2], ["G5", 4], ["C6", 4]],
  [["B5", 4], ["A5", 2], ["B5", 2], ["D6", 4], ["E6", 4]],
];
const LEAD = new Map<number, [string, number]>();
MELODY.forEach((bar, b) => {
  let step = b * 16;
  for (const [note, length] of bar) {
    if (note !== "-") LEAD.set(step, [note, length]);
    step += length;
  }
});
const ARP_ORDER = [0, 1, 2, 1];

let musicTimer: number | undefined;
let nextStepAt = 0;
let step = 0;

const playStep = (c: AudioContext, s: number, at: number) => {
  const bar = Math.floor(s / 16) % BARS;
  const beat = s % 16;
  const [root, chord] = CHORDS[bar];
  const bus = musicBus;

  const lead = LEAD.get(s);
  if (lead) {
    tone(c, { freq: hz(lead[0]), at, length: STEP * lead[1] * 0.9, volume: 0.11, bus });
  }
  tone(c, { freq: hz(chord[ARP_ORDER[beat % 4]]) * (beat >= 8 ? 2 : 1), at, length: STEP * 0.8, volume: 0.035, bus });
  if (beat % 2 === 0) {
    const bassFreq = hz(root) * (beat % 4 === 0 ? 1 : 2);
    tone(c, { freq: bassFreq, type: "triangle", at, length: STEP * 1.8, volume: 0.34, bus });
  }
  if (beat === 0 || beat === 8 || beat === 11) {
    tone(c, { freq: 150, to: 40, type: "sine", at, length: 0.14, volume: 0.5, bus });
  }
  if (beat === 4 || beat === 12) noise(c, { at, length: 0.12, volume: 0.22, filter: 2200, bus });
  if (beat % 2 === 0) noise(c, { at, length: 0.03, volume: 0.06, filter: 9000, bus });
};

const scheduleMusic = () => {
  const c = ctx;
  if (!c) return;
  // After a stall (e.g. a throttled background tab) skip ahead instead of
  // playing every missed note at once
  if (nextStepAt < c.currentTime - 0.1) nextStepAt = c.currentTime + 0.05;
  while (nextStepAt < c.currentTime + 0.15) {
    playStep(c, step, nextStepAt);
    nextStepAt += STEP;
    step = (step + 1) % (BARS * 16);
  }
};

const startMusic = () => {
  const c = audio();
  if (!c || musicTimer !== undefined) return;
  musicBus!.gain.cancelScheduledValues(c.currentTime);
  musicBus!.gain.setValueAtTime(0.32, c.currentTime);
  step = 0;
  nextStepAt = c.currentTime + 0.08;
  musicTimer = window.setInterval(scheduleMusic, 40);
  scheduleMusic();
};

const stopMusic = () => {
  if (musicTimer === undefined) return;
  window.clearInterval(musicTimer);
  musicTimer = undefined;
  if (ctx && musicBus) {
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
  }
};

// Browsers only allow audio to start from a click or key press, so call this
// from the handler that turns sound on
export const unlockAudio = () => {
  audio();
};

export const syncMusic = (on: boolean) => {
  if (on) startMusic();
  else stopMusic();
};

// Silence everything while the tab is hidden
export const pauseAudio = (paused: boolean) => {
  if (!ctx) return;
  if (paused) ctx.suspend().catch(() => {});
  else ctx.resume().catch(() => {});
};

export const shutdownAudio = () => {
  stopMusic();
  ctx?.suspend().catch(() => {});
};
