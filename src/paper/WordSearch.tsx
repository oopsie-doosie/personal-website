// src/paper/WordSearch.tsx
// The daily puzzle: a word search hiding the interests from src/data. Drag
// across letters (mouse or touch) to circle a word.
import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { interests } from "@/data/index";
import { cx } from "./hooks";

const SIZE = 13;
// Right, down and both diagonals, so every word reads forwards
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

interface Cell {
  r: number;
  c: number;
}

interface Placement {
  word: string;
  name: string;
  cells: Cell[];
}

// Small seeded RNG so the puzzle is the same on every visit
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// "Formula 1" -> FORMULA; names too long for the grid use their longest word
const toWord = (name: string) => {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "");
  if (letters.length <= SIZE) return letters;
  return name
    .toUpperCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Z]/g, ""))
    .sort((a, b) => b.length - a.length)[0];
};

const buildPuzzle = () => {
  const random = seeded(2026);
  const grid: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
  const placements: Placement[] = [];
  const words = interests
    .map((interest) => ({ name: interest.name, word: toWord(interest.name) }))
    .filter(({ word }) => word.length >= 2)
    .sort((a, b) => b.word.length - a.word.length);

  for (const { name, word } of words) {
    for (let attempt = 0; attempt < 500; attempt++) {
      const [dr, dc] = DIRECTIONS[Math.floor(random() * DIRECTIONS.length)];
      const r0 = Math.floor(random() * SIZE);
      const c0 = Math.floor(random() * SIZE);
      const cells = [...word].map((_, i) => ({ r: r0 + dr * i, c: c0 + dc * i }));
      const fits = cells.every(
        ({ r, c }, i) => r >= 0 && r < SIZE && c >= 0 && c < SIZE && (!grid[r][c] || grid[r][c] === word[i])
      );
      if (!fits) continue;
      cells.forEach(({ r, c }, i) => (grid[r][c] = word[i]));
      placements.push({ word, name, cells });
      break;
    }
  }
  for (const row of grid) {
    for (let c = 0; c < SIZE; c++) {
      if (!row[c]) row[c] = String.fromCharCode(65 + Math.floor(random() * 26));
    }
  }
  // List the words in the same order as src/data
  placements.sort(
    (a, b) =>
      interests.findIndex((i) => i.name === a.name) - interests.findIndex((i) => i.name === b.name)
  );
  return { grid, placements };
};

// Straight lines only; anything else selects just the first letter
const lineBetween = (start: Cell, end: Cell): Cell[] => {
  const dr = end.r - start.r;
  const dc = end.c - start.c;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [start];
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  return Array.from({ length: steps + 1 }, (_, i) => ({
    r: start.r + Math.sign(dr) * i,
    c: start.c + Math.sign(dc) * i,
  }));
};

const sameCells = (a: Cell[], b: Cell[]) =>
  a.length === b.length && a.every((cell, i) => cell.r === b[i].r && cell.c === b[i].c);

// The pen loop drawn around a found word
const loopStyle = ({ cells }: Placement): CSSProperties => {
  const first = cells[0];
  const last = cells[cells.length - 1];
  const unit = 100 / SIZE;
  const dx = last.c - first.c;
  const dy = last.r - first.r;
  return {
    left: `${((first.c + last.c) / 2 + 0.5) * unit}%`,
    top: `${((first.r + last.r) / 2 + 0.5) * unit}%`,
    width: `${(Math.hypot(dx, dy) + 0.95) * unit}%`,
    height: `${unit * 0.82}%`,
    transform: `translate(-50%, -50%) rotate(${Math.atan2(dy, dx)}rad)`,
  };
};

export function WordSearch() {
  const { grid, placements } = useMemo(buildPuzzle, []);
  const gridRef = useRef<HTMLDivElement>(null);
  const [found, setFound] = useState<string[]>([]);
  const [drag, setDrag] = useState<{ start: Cell; end: Cell } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const cellAt = (event: PointerEvent<HTMLDivElement>): Cell => {
    const rect = gridRef.current!.getBoundingClientRect();
    const clamp = (value: number) => Math.min(SIZE - 1, Math.max(0, Math.floor(value)));
    return {
      r: clamp(((event.clientY - rect.top) / rect.height) * SIZE),
      c: clamp(((event.clientX - rect.left) / rect.width) * SIZE),
    };
  };

  const selection = drag ? lineBetween(drag.start, drag.end) : [];
  const selected = new Set(selection.map(({ r, c }) => `${r},${c}`));

  const finish = () => {
    if (!drag) return;
    const match = placements.find(
      ({ cells }) => sameCells(cells, selection) || sameCells([...cells].reverse(), selection)
    );
    if (match && !found.includes(match.word)) setFound([...found, match.word]);
    setDrag(null);
  };

  const shown = placements.filter(({ word }) => revealed || found.includes(word));

  return (
    <div className="np-ws">
      <div
        ref={gridRef}
        className="np-ws-grid"
        style={{ "--n": SIZE } as CSSProperties}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          const cell = cellAt(event);
          setDrag({ start: cell, end: cell });
        }}
        onPointerMove={(event) => drag && setDrag({ ...drag, end: cellAt(event) })}
        onPointerUp={finish}
        onPointerCancel={() => setDrag(null)}
        aria-hidden="true"
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <span key={`${r}-${c}`} className={cx(selected.has(`${r},${c}`) && "is-selected")}>
              {letter}
            </span>
          ))
        )}
        {shown.map((placement) => (
          <i
            key={placement.word}
            className={cx("np-ws-loop", !found.includes(placement.word) && "is-answer")}
            style={loopStyle(placement)}
          />
        ))}
      </div>
      <div className="np-ws-side">
        <p className="np-label">
          Find these {placements.length} words · {found.length} found
        </p>
        <ul className="np-ws-words">
          {placements.map(({ word, name }) => (
            <li key={word} className={cx(found.includes(word) && "is-found")}>
              {name}
              {word !== name.toUpperCase().replace(/[^A-Z]/g, "") && <small> ({word.toLowerCase()})</small>}
            </li>
          ))}
        </ul>
        {found.length === placements.length ? (
          <p className="np-ws-done">Solved! The editor is impressed.</p>
        ) : (
          <button type="button" className="np-link-button np-ws-reveal" onClick={() => setRevealed(!revealed)}>
            {revealed ? "Hide the answers" : "Stumped? Show the answers"}
          </button>
        )}
      </div>
    </div>
  );
}
