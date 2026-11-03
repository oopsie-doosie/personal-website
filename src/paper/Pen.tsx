// src/paper/Pen.tsx
// An editor's red-pen marks that draw themselves in when scrolled into view
// (PaperApp marks them `data-in`, see .np-pen in paper.css).
import type { ReactNode } from "react";
import { cx } from "./hooks";

const SHAPES = {
  // A loose loop that overshoots where it started, like a real pen circle
  circle: "M10,24 C4,10 38,2 62,4 C88,6 99,14 96,25 C93,35 60,40 36,38 C12,36 1,28 9,15 C13,9 22,6 32,5",
  underline: "M2,30 C20,26 34,34 52,29 C68,25 82,33 98,27",
};

export function PenMark({
  shape = "circle",
  note,
  children,
}: {
  shape?: keyof typeof SHAPES;
  note?: string;
  children: ReactNode;
}) {
  return (
    <span className={cx("np-pen", `np-pen-${shape}`)}>
      {children}
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path d={SHAPES[shape]} pathLength={1} />
      </svg>
      {note && (
        <span className="np-pen-note" aria-hidden="true">
          {note}
        </span>
      )}
    </span>
  );
}
