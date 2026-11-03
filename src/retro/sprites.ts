// src/retro/sprites.ts
// Hand-drawn pixel art for the retro edition. Each sprite is a list of rows;
// every character is one pixel, looked up in PALETTE ("." is transparent).
// <Sprite /> in ui.tsx renders them as crisp SVG.

export type Art = readonly string[];

export const PALETTE: Record<string, string> = {
  k: "#0b0718", // outline
  t: "#120a24", // deep shadow
  w: "#ffffff",
  W: "#c9d4ff",
  g: "#8a93b8",
  G: "#4b5275",
  s: "#fff2c4", // parchment
  y: "#ffd23f",
  Y: "#ff9f1c",
  o: "#ff6b1c",
  r: "#ff3b3b",
  R: "#a3122a",
  p: "#ff3ea5",
  q: "#ffb3dd",
  P: "#a07bff",
  v: "#6a3df0",
  V: "#2f1470",
  c: "#3ef3ff",
  C: "#1a8fd6",
  b: "#2b4bff",
  B: "#0d1a73",
  l: "#7dff3a",
  L: "#1f9e3a",
  n: "#b07a3c",
  N: "#6b4220",
};

// Swaps characters in a sprite, e.g. to draw an animation frame
const recolor = (art: Art, swaps: Record<string, string>, rows?: number[]) =>
  art.map((row, y) =>
    rows && !rows.includes(y)
      ? row
      : row.replace(/./g, (ch) => swaps[ch] ?? ch)
  );

const mirror = (halves: string[]) =>
  halves.map((half) => half + [...half].reverse().join(""));

// Paints `patch` onto `art` at (x, y); "." in the patch keeps the original
const overlay = (art: Art, patch: Art, x: number, y: number) =>
  art.map((row, r) => {
    const line = patch[r - y];
    if (line === undefined) return row;
    return [...row]
      .map((ch, c) => (c >= x && line[c - x] && line[c - x] !== "." ? line[c - x] : ch))
      .join("");
  });

// --- Characters ------------------------------------------------------------

// The hero: a hooded mage with a glowing staff (Player 1)
const MAGE_BODY = [
  ".............",
  ".............",
  "......k......",
  ".....kvk.....",
  "....kvPvk....",
  "...kvPPPvk...",
  "..kvPPPPPvk..",
  "..kvPkkkPvk..",
  ".kvPktttkPvk.",
  ".kvPkctckPvk.",
  ".kvPktttkPvk.",
  ".kvvPkkkPvvk.",
  "kvvvvyyyvvvvk",
  "kvPvvvyvvvPvv",
  "kvPvvvvvvvPvv",
  "kvPvvvvvvvPvk",
  "kvPvvvvvvvPvk",
  "kvvPvvvvvPvvk",
  "kvvPvvvvvPvvk",
  "kvvvPvvvPvvvk",
  "kyyyyyyyyyyyk",
  "kkkkkkkkkkkkk",
  "..kNNk.kNNk..",
  "..kkkk.kkkk..",
];
const MAGE_STAFF = [
  ".kkk.",
  "kqppk",
  "kpppk",
  ".kkk.",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "kkn..",
  "vggk.",
  "vggk.",
  "kkn..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..n..",
  "..N..",
  ".....",
  ".....",
];
export const MAGE: Art = MAGE_BODY.map((row, i) => row + MAGE_STAFF[i]);
// Blink, and the orb flickers cyan
export const MAGE_BLINK: Art = recolor(recolor(MAGE, { c: "t" }, [9]), { p: "c", q: "w" }, [1, 2]);

// The mage's drone: a little floating agent
export const DRONE: Art = [
  "....kk....",
  ".kkkkkkkk.",
  "....kk....",
  "..kkkkkk..",
  ".kWWWWWWk.",
  ".kWkcckWk.",
  ".kWWWWWWk.",
  "..kggggk..",
  "...kkkk...",
];
export const DRONE_SPIN: Art = overlay(DRONE, ["..kkkkkk.."], 0, 1).map((row, i) =>
  i === 1 ? "...kkkk..." : row
);

// The boss: an untested investment thesis, all questions and no answers
const BOSS_BASE = mirror([
  "......kkkk",
  "....kkvvvv",
  "...kvvPPPP",
  "..kvvPPPPP",
  "..kvPkkPPP",
  ".kvvPPkkPP",
  ".kvPPwwwkP",
  ".kvPPwkkPP",
  ".kvPPPPPPP",
  "kvvPPPPPkw",
  "kvPPPPPPPP",
  "kvPPPPPPPP",
  "kvPPPPPPPP",
  "kvvPPPPPPP",
  "kvvvPPPPPP",
  ".kvvvvPPPP",
  "..kvvvvvvv",
  ".kvvkvvvkv",
  ".kkk.kkk.k",
]);
export const BOSS: Art = overlay(
  BOSS_BASE,
  [".yy.", "y..y", "...y", "..y.", "....", "..y."],
  8,
  10
);
export const BOSS_WOBBLE: Art = overlay(BOSS, ["kvvvkvvvkvvvkvvvkvvk", "kkk.kkk.kkkk.kkk.kkk"], 0, 17);

// Map marker: the player's ship
const SHIP_HULL = [
  "..kk.......",
  "..kWk......",
  ".kkWWkkk...",
  "kcWWWWWWkk.",
  "kcWWbbWWWWk",
  "kcWWWWWWkk.",
  ".kkWWkkk...",
  "..kWk......",
  "..kk.......",
];
const FLAME_A = ["...", "...", "...", ".oy", "oyy", ".oy", "...", "...", "..."];
const FLAME_B = ["...", "...", "...", "..y", ".oy", "..y", "...", "...", "..."];
export const SHIP: Art = SHIP_HULL.map((row, i) => FLAME_A[i] + row);
export const SHIP_THRUST: Art = SHIP_HULL.map((row, i) => FLAME_B[i] + row);

// --- Items & HUD ---------------------------------------------------------

export const COIN: Art = [
  "..kkkk..",
  ".kyyyyk.",
  "kywyYyYk",
  "kwyyYyYk",
  "kyyyYyYk",
  "kyyyYYYk",
  ".kYYYYk.",
  "..kkkk..",
];

export const HEART: Art = [
  ".kk.kk.",
  "kqrkrrk",
  "krrrrrk",
  "krrrrrk",
  ".krrrk.",
  "..krk..",
  "...k...",
];

export const TROPHY: Art = [
  "kkkkkkkkkk",
  "kywyyyyYYk",
  "kywyyyyYYk",
  ".kwyyyyYk.",
  "..kyyyYk..",
  "...kyYk...",
  "....kk....",
  "...kyYk...",
  "..kyyyYk..",
  "..kkkkkk..",
];

export const POWER: Art = [
  "...w...",
  ".w.w.w.",
  "w..w..w",
  "w.....w",
  "w.....w",
  ".w...w.",
  "..www..",
];

export const STAR: Art = [
  ".....kk.....",
  "....kyyk....",
  "....kyyk....",
  "kkkkkyykkkkk",
  "kywyyyyyyyyk",
  ".kyyyyyyyyk.",
  "..kyyyyyyk..",
  "..kyyyyyyk..",
  ".kyyykkyyyk.",
  ".kyyk..kyyk.",
  "kyyk....kyyk",
  "kkk......kkk",
];

export const CHEST: Art = [
  "............",
  "..kkkkkkkk..",
  ".knnnnnnnnk.",
  "knnnnnnnnnnk",
  "kyyyyyyyyyyk",
  "kkkkkwwkkkkk",
  "knnnnyynnnnk",
  "knnnnkknnnnk",
  "kNNNNNNNNNNk",
  "kyyyyyyyyyyk",
  "kkkkkkkkkkkk",
  "............",
];
export const CHEST_OPEN: Art = [
  ".kkkkkkkkkk.",
  "knnnnnnnnnnk",
  "kyyyyyyyyyyk",
  "kkkkkkkkkkkk",
  "kwwwwwwwwwwk",
  "kyywyyyywyyk",
  "knnnnyynnnnk",
  "knnnnkknnnnk",
  "kNNNNNNNNNNk",
  "kyyyyyyyyyyk",
  "kkkkkkkkkkkk",
  "............",
];

export const SCROLL: Art = [
  "kkkkkkkkkkkk",
  "knnnnnnnnnnk",
  "kkkkkkkkkkkk",
  ".kssssssssk.",
  ".ksGGGGGGsk.",
  ".kssssssssk.",
  ".ksGGGGsssk.",
  ".kssssssssk.",
  ".ksGGGGGssk.",
  "kkkkkkkkkkkk",
  "knnnnnnnnnnk",
  "kkkkkkkkkkkk",
];

// --- Quest icons (keyed by the `icon` names in src/data) -----------------

const PARTY: Art = [
  "............",
  "...kk...kk..",
  "..kyyk.kcck.",
  "..kyyk.kcck.",
  "...kk...kk..",
  "..kkkk.kkkk.",
  ".kyyyykcccck",
  ".kyyyykcccck",
  ".kyyyykcccck",
  ".kkkkkkkkkkk",
  "............",
  "............",
];

const BOOKS: Art = [
  "............",
  ".kkkkkkkkkk.",
  ".kpppppppwk.",
  ".kkkkkkkkkk.",
  "..kkkkkkkkkk",
  "..kcccccccwk",
  "..kkkkkkkkkk",
  ".kkkkkkkkkk.",
  ".kyyyyyyywk.",
  ".kkkkkkkkkk.",
  "............",
  "............",
];

const POTION: Art = [
  "...kkkkkk...",
  "....kWWk....",
  "....kWWk....",
  "....kWWk....",
  "...kWWWWk...",
  "..kWWWWWWk..",
  ".kllllllllk.",
  ".klwllllllk.",
  "kllllllllllk",
  "kllllllllLLk",
  "kLLLLLLLLLLk",
  ".kkkkkkkkkk.",
];

const CHECK: Art = [
  "............",
  "..........k.",
  ".........klk",
  "........kllk",
  ".......kllk.",
  ".k....kllk..",
  "klk..kllk...",
  "kllkkllk....",
  ".kllllk.....",
  "..kllk......",
  "...kk.......",
  "............",
];

const FLOW: Art = [
  "kkkk........",
  "kcckwww.....",
  "kcck..w.....",
  "kkkk..w.....",
  "......w.kkkk",
  "......wwkppk",
  "......w.kppk",
  "......w.kkkk",
  "kkkk..w.....",
  "kyyk..w.....",
  "kyykwww.....",
  "kkkk........",
];

const SHIELD: Art = [
  ".kkkkkkkkkk.",
  ".kcccyyCCCk.",
  ".kcccyyCCCk.",
  ".kyyyyyyyyk.",
  ".kcccyyCCCk.",
  ".kcccyyCCCk.",
  "..kccyyCCk..",
  "..kccyyCCk..",
  "...kcyyCk...",
  "....kyyk....",
  ".....kk.....",
  "............",
];

const NETWORK: Art = [
  "............",
  "kkk......kkk",
  "kck......kpk",
  "kkkw....wkkk",
  "....kkkk....",
  "....kyyk....",
  "....kyyk....",
  "....kkkk....",
  "kkkw....wkkk",
  "klk......kck",
  "kkk......kkk",
  "............",
];

const BOLT: Art = [
  "......kkkk..",
  ".....kyyk...",
  "....kyyk....",
  "...kyyk.....",
  "..kyyykkkk..",
  "..kyyyyyyk..",
  "..kkkkyyk...",
  ".....kyk....",
  "....kyk.....",
  "...kyk......",
  "...kk.......",
  "............",
];

const MAGNIFIER: Art = [
  "............",
  "..kkkk......",
  ".kcwcck.....",
  "kcwcccck....",
  "kcccccck....",
  "kccccCck....",
  ".kccCCk.....",
  "..kkkknk....",
  ".......nk...",
  "........nk..",
  ".........nk.",
  "..........k.",
];

const VIAL: Art = [
  "...kkkkkk...",
  "....kWWk....",
  "....kWWk....",
  "....kWqk....",
  "....kWWk....",
  "....kppk....",
  "....kqpk....",
  "....kppk....",
  "....kppk....",
  "....kppk....",
  ".....kk.....",
  "............",
];

// --- Inventory bags (keyed by skill group `icon`) ---------------------------

export const ORB: Art = [
  "....kkkk....",
  "..kkPPPPkk..",
  ".kPwwPPPPPk.",
  ".kPwPPPPvvk.",
  "kPPPPPPPvvvk",
  "kPPPPPPvvvvk",
  "kPPPPPvvvvVk",
  ".kPPvvvvVVk.",
  "..kkvvVVkk..",
  "...kyyyyk...",
  "..kyYYYYyk..",
  "..kkkkkkkk..",
];

export const SWORD: Art = [
  ".....kk.....",
  "....kWgk....",
  "....kWgk....",
  "....kWgk....",
  "....kWgk....",
  "....kWgk....",
  "....kWgk....",
  ".kkkkkkkkkk.",
  ".kyyyyyyyyk.",
  ".kkkknnkkkk.",
  "....knnk....",
  "....kyyk....",
  "....kkkk....",
];

export const EYE: Art = [
  "............",
  "............",
  "...kkkkkk...",
  ".kkwwwwwwkk.",
  "kwwwkkkkwwwk",
  "kwwkcwcckwwk",
  "kwwkckkckwwk",
  "kwwwkkkkwwwk",
  ".kkwwwwwwkk.",
  "...kkkkkk...",
  "............",
  "............",
];

// --- Side quests (keyed by the `icon` names in src/data interests) ----------

const YOGA: Art = [
  ".....kk.....",
  "....kcck....",
  "....kcck....",
  ".....kk.....",
  "...kkcckk...",
  "..kcccccck..",
  ".kckcccckck.",
  "kck.kcck.kck",
  ".k..kcck..k.",
  ".kkcccccckk.",
  "kcccccccccck",
  ".kkkkkkkkkk.",
];

const SWIM: Art = [
  "............",
  "..k.........",
  ".kWk..kkkk..",
  ".kWk.kyyyyk.",
  ".kWk.kyyyyk.",
  ".kWkkkWWWWk.",
  "c.cc.cc.cc.c",
  "CcCCcCCcCCcC",
  "CCCCCCCCCCCC",
  "BCBBCBBCBBCB",
  "BBBBBBBBBBBB",
  "............",
];

const TENNIS: Art = [
  "..kkkk...kk.",
  ".kWgWgk.kllk",
  "kWgWgWgkkllk",
  "kgWgWgWk.kk.",
  "kWgWgWgk....",
  ".kgWgWk.....",
  "..kkkk......",
  "....knk.....",
  ".....knk....",
  "......knk...",
  ".......kNk..",
  "........kk..",
];

const PICKLEBALL: Art = [
  ".kkkkkk.....",
  "kppppppk....",
  "kpqqqppk....",
  "kppppppk....",
  "kppppppk....",
  "kppppppk....",
  ".kppppk.....",
  "..knnk..kkk.",
  "..knnk.kyNyk",
  "..knnk.kNyNk",
  "..kkkk.kyNyk",
  "........kkk.",
];

const HIKING: Art = [
  "......krr...",
  "......krrr..",
  "......k.....",
  ".....kWk....",
  "....kWWWk...",
  "...kWgWLLk..",
  "..kLLgLLLLk.",
  ".kLLLLlLLLLk",
  "kLLlLLLLLlLk",
  "kkkkkkkkkkkk",
  "............",
  "............",
];

const BOOK: Art = [
  "............",
  ".kkkk..kkkk.",
  "kwwwwkkwwwwk",
  "kwGGGkkGGGwk",
  "kwwwwkkwwwwk",
  "kwGGGkkGGGwk",
  "kwwwwkkwwwwk",
  "kwGGwkkwGGwk",
  "kwwwwkkwwwwk",
  "kkkkkkkkkkkk",
  ".knnnnnnnnk.",
  "..kkkkkkkk..",
]

const CRYPTO: Art = [
  "...kkkkkk...",
  "..kyyyyyyk..",
  ".kyyykyyyyk.",
  "kyyyNNNyyyYk",
  "kyyyNyyNyyYk",
  "kyyyNNNyyyYk",
  "kyyyNyyNyyYk",
  "kyyyNNNyyyYk",
  ".kyyykyyyYk.",
  "..kYYYYYYk..",
  "...kkkkkk...",
  "............",
];

const CHART: Art = [
  "............",
  "........kkkk",
  "........kllk",
  "........kllk",
  "....kkkkkllk",
  "....kcckkllk",
  "....kcckkllk",
  "kkkkkcckkllk",
  "kyykkcckkllk",
  "kyykkcckkllk",
  "kkkkkkkkkkkk",
  "............",
];

const RACECAR: Art = [
  "............",
  "............",
  "kkk.........",
  "krk...kkk...",
  "krk..kyWyk..",
  "krrrrrrrrrk.",
  "krrwwrrrrrrk",
  "kkGGkkkkGGkk",
  ".kGgk..kGgk.",
  "..kk....kk..",
  "............",
  "............",
];

const SNOWBOARD: Art = [
  ".....c......",
  "...c.c.c....",
  "....ccc.....",
  "..cccWccc...",
  "....ccc.....",
  "...c.c.c....",
  ".....c......",
  "............",
  ".kkkkkkkkkk.",
  "kppqpppppppk",
  ".kkkkkkkkkk.",
  "............",
];

const MARTINI: Art = [
  "............",
  "kkkkkkkkkkk.",
  ".kppplppqk..",
  "..kpplpqk...",
  "...kppqk....",
  "....kpk.....",
  ".....k......",
  ".....k......",
  ".....k......",
  "...kkkkk....",
  "............",
  "............",
];

export const ICONS: Record<string, Art> = {
  // Experience highlights
  boxes: CHEST,
  users: PARTY,
  layers: BOOKS,
  flask: POTION,
  checks: CHECK,
  workflow: FLOW,
  shield: SHIELD,
  network: NETWORK,
  gauge: BOLT,
  fileSearch: MAGNIFIER,
  testTube: VIAL,
  // Skill groups
  bot: ORB,
  braces: SCROLL,
  server: SWORD,
  radar: EYE,
  // Interests
  yoga: YOGA,
  swimming: SWIM,
  tennis: TENNIS,
  pickleball: PICKLEBALL,
  hiking: HIKING,
  reading: BOOK,
  crypto: CRYPTO,
  finance: CHART,
  f1: RACECAR,
  snowboarding: SNOWBOARD,
  cocktails: MARTINI,
};

export const iconFor = (name: string | undefined): Art =>
  (name && ICONS[name]) || STAR;

// --- Cursor ----------------------------------------------------------------

export const CURSOR: Art = [
  "k..........",
  "kk.........",
  "kwk........",
  "kwwk.......",
  "kwwwk......",
  "kwwwwk.....",
  "kwwwwwk....",
  "kwwwwwwk...",
  "kwwwwwwwk..",
  "kwwwwwwwwk.",
  "kwwwwwkkkkk",
  "kwwkwwk....",
  "kwk.kwwk...",
  "kk..kwwk...",
  "k....kwwk..",
  ".....kkk...",
];
export const CURSOR_ACTIVE: Art = recolor(CURSOR, { w: "y" });

// --- Planets (generated) ------------------------------------------------------

// 4x4 ordered-dither thresholds, the classic way to fake gradients
export const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

// A dithered sphere lit from the top left, optionally with a tilted ring
export const planet = (
  radius: number,
  [light, mid, dark]: [string, string, string],
  ring?: string
): Art => {
  const ringRx = ring ? Math.round(radius * 1.75) : radius;
  const width = ringRx * 2 + 2;
  const height = radius * 2 + 2;
  const cx = width / 2;
  const cy = height / 2;
  const rows: string[] = [];
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const dist = Math.hypot(dx, dy);
      const tilt = dy + dx * 0.18;
      const ringValue = ring
        ? (dx / ringRx) ** 2 + (tilt / (radius * 0.42)) ** 2
        : Infinity;
      const onRing = ringValue > 0.6 && ringValue < 1;
      // The ring passes behind the planet's top half and in front of its bottom
      if (dist < radius && !(onRing && tilt > 0)) {
        if (dist > radius - 1.2) {
          row += "k";
          continue;
        }
        // Low near the light source, high on the far side
        const shade =
          0.5 + ((dx * 0.55 + dy * 0.65) / radius) * 0.6 + (dist / radius) ** 2 * 0.2;
        const threshold = BAYER[y % 4][x % 4];
        row +=
          shade < 0.22 + threshold * 0.3
            ? light
            : shade < 0.72 + threshold * 0.3
              ? mid
              : dark;
      } else {
        row += onRing ? ring! : ".";
      }
    }
    rows.push(row);
  }
  return rows;
};

// Menu cursor / list bullet
export const ARROW: Art = [
  "yy....",
  "yyyy..",
  "yyyyyy",
  "yyyy..",
  "yy....",
];

// --- Rendering helpers -----------------------------------------------------

export interface CompiledSprite {
  width: number;
  height: number;
  // [color, SVG path] pairs, one path per color
  paths: [string, string][];
}

const compiled = new WeakMap<Art, CompiledSprite>();

// Merges each row into horizontal runs and groups them by color
export const compileSprite = (art: Art): CompiledSprite => {
  const cached = compiled.get(art);
  if (cached) return cached;
  const byColor = new Map<string, string>();
  art.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      const color = PALETTE[ch];
      if (color) {
        byColor.set(color, `${byColor.get(color) ?? ""}M${x} ${y}h${end - x}v1h${x - end}z`);
      }
      x = end;
    }
  });
  const result: CompiledSprite = {
    width: Math.max(...art.map((row) => row.length)),
    height: art.length,
    paths: [...byColor],
  };
  compiled.set(art, result);
  return result;
};

// For CSS cursors and backgrounds
export const spriteDataUri = (art: Art, scale = 2) => {
  const { width, height, paths } = compileSprite(art);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" ` +
    `viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">` +
    paths.map(([color, d]) => `<path fill="${color}" d="${d}"/>`).join("") +
    "</svg>";
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
