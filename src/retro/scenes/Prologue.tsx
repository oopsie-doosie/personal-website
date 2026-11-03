// src/retro/scenes/Prologue.tsx
// The intro, told as an RPG dialogue box that types itself out.
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/index";
import { game } from "../game";
import { useInView } from "../hooks";
import { sfx } from "../sound";
import { ARROW, MAGE, MAGE_BLINK } from "../sprites";
import { Coin, Heading, Sprite, Typewriter, Win } from "../ui";

// Split on sentence ends without breaking numbers like "3.5"
const sentences = (text: string) =>
  text.replace(/([.!?])\s+(?=[A-Z])/g, "$1\u0000").split("\u0000");

const PAGES = [
  ...sentences(personalInfo.intro),
  "The adventure continues below. Good luck, PLAYER 2!",
];

export function Prologue() {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { threshold: 0.6 });
  const [page, setPage] = useState(0);
  const [typed, setTyped] = useState(false);
  const [instant, setInstant] = useState(false);
  const last = page === PAGES.length - 1;

  useEffect(() => {
    if (typed && last) game.unlock("prologue");
  }, [typed, last]);

  const advance = () => {
    if (!inView) return;
    if (!typed) {
      setInstant(true);
      return;
    }
    sfx.select();
    setPage(last ? 0 : page + 1);
    setTyped(false);
    setInstant(false);
  };

  return (
    <section id="prologue" className="rx-section" data-stage="PROLOGUE">
      <Heading kicker="CHAPTER 0" title="PROLOGUE" sub="THE STORY SO FAR..." />
      <div className="rx-dialog rx-reveal" ref={boxRef} onClick={advance}>
        <Win className="rx-portrait" tone="dark">
          <Sprite art={MAGE} alt={MAGE_BLINK} anim="blink" />
          <p className="rx-nameplate">{personalInfo.shortName.toUpperCase()}</p>
        </Win>
        <Win className="rx-dialog-box">
          <p className="rx-dialog-speaker">{personalInfo.shortName.toUpperCase()}:</p>
          <p className="rx-dialog-text">
            <Typewriter
              key={page}
              text={PAGES[page]}
              active={inView}
              instant={instant}
              onDone={() => setTyped(true)}
            />
          </p>
          <div className="rx-dialog-foot">
            <span className="rx-dialog-page">
              {page + 1}/{PAGES.length}
            </span>
            <button
              type="button"
              className="rx-dialog-next"
              onClick={(event) => {
                event.stopPropagation();
                advance();
              }}
            >
              {typed ? (last ? "READ AGAIN" : "NEXT") : "SKIP"}
              <Sprite art={ARROW} className={typed ? "rx-nudge-down" : undefined} />
            </button>
          </div>
        </Win>
      </div>
      <Coin id="prologue" style={{ right: "5%", top: "14%" }} />
    </section>
  );
}
