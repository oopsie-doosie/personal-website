// src/retro/ui.tsx
// Building blocks for the retro edition's screens.
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { game, POINTS, useGame, type CoinId } from "./game";
import { cx, useLatest, useReducedMotion } from "./hooks";
import { GOLD, spawnBurst, spawnText } from "./particles";
import { sfx } from "./sound";
import { ARROW, COIN, compileSprite, type Art } from "./sprites";

interface SpriteProps {
  art: Art;
  // Optional second frame, swapped in by CSS
  alt?: Art;
  anim?: "flip" | "blink";
  // Pixel size in CSS px; omit to size the sprite with CSS
  scale?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Sprite({ art, alt, anim = "flip", scale, label, className, style }: SpriteProps) {
  const base = compileSprite(art);
  const second = alt ? compileSprite(alt) : null;
  return (
    <svg
      className={cx("rx-sprite", className)}
      viewBox={`0 0 ${base.width} ${base.height}`}
      width={scale ? base.width * scale : undefined}
      height={scale ? base.height * scale : undefined}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
    >
      <g className={second ? `rx-f0 rx-${anim}` : undefined}>
        {base.paths.map(([color, d]) => (
          <path key={color} fill={color} d={d} />
        ))}
      </g>
      {second && (
        <g className={`rx-f1 rx-${anim}`}>
          {second.paths.map(([color, d]) => (
            <path key={color} fill={color} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
}

// A classic RPG window: gradient fill, white rim, notched pixel corners
export function Win({
  title,
  tone = "blue",
  className,
  style,
  children,
}: {
  title?: ReactNode;
  tone?: "blue" | "dark" | "gold" | "pink";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={cx("rx-win", `rx-win-${tone}`, className)} style={style}>
      {title && <p className="rx-win-title">{title}</p>}
      {children}
    </div>
  );
}

export function Heading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="rx-head rx-reveal">
      <p className="rx-head-kicker">
        <Sprite art={ARROW} className="rx-blink" /> {kicker}
      </p>
      <h2 className="rx-head-title" data-text={title}>
        {title}
      </h2>
      {sub && <p className="rx-head-sub">{sub}</p>}
    </header>
  );
}

// A hidden coin. Collect them all for an achievement.
export function Coin({ id, style }: { id: CoinId; style?: CSSProperties }) {
  const taken = useGame((s) => s.coins.includes(id));
  if (taken) return null;

  const collect = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    sfx.coin();
    spawnBurst(x, y, { colors: GOLD, count: 20 });
    spawnText(x, y - 12, `+${POINTS.coin}`);
    game.collectCoin(id);
  };

  return (
    <button type="button" className="rx-coin" style={style} onClick={collect} aria-label="Collect hidden coin">
      <Sprite art={COIN} />
    </button>
  );
}

// Counts every number inside `value` up from zero ("3% → 60%", "200k+")
export function CountUp({
  value,
  active,
  duration = 1200,
  delay = 0,
  onTick,
  onDone,
}: {
  value: string;
  active: boolean;
  duration?: number;
  delay?: number;
  onTick?: () => void;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const parts = useMemo(() => value.split(/(\d+(?:\.\d+)?)/), [value]);
  const [progress, setProgress] = useState(0);
  const callbacks = useLatest({ onTick, onDone });

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setProgress(1);
      callbacks.current.onDone?.();
      return;
    }
    let frame = 0;
    let lastTick = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setProgress(p);
        if (now - lastTick > 60) {
          lastTick = now;
          callbacks.current.onTick?.();
        }
        if (p < 1) frame = requestAnimationFrame(step);
        else callbacks.current.onDone?.();
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active, reduced, duration, delay, callbacks]);

  const eased = 1 - (1 - progress) ** 3;
  return (
    <span className="rx-countup">
      <span className="rx-sr">{value}</span>
      <span aria-hidden="true">
        {parts.map((part, i) => {
          if (i % 2 === 0) return part;
          const decimals = part.split(".")[1]?.length ?? 0;
          return (Number(part) * eased).toFixed(decimals);
        })}
      </span>
    </span>
  );
}

// Types text out letter by letter. The untyped rest is kept (invisible) so
// the box never changes size. Remount with a new `key` for new text.
export function Typewriter({
  text,
  active = true,
  instant = false,
  speed = 24,
  onDone,
}: {
  text: string;
  active?: boolean;
  instant?: boolean;
  speed?: number;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const shown = instant || reduced ? text.length : count;
  const done = shown >= text.length;
  const doneRef = useLatest(onDone);

  useEffect(() => {
    if (!active || done) return;
    // Pause at the end of a sentence (but not inside "3.5")
    const sentenceEnd = ".!?".includes(text[count - 1] ?? "") && text[count] === " ";
    const delay = sentenceEnd ? speed * 10 : speed;
    const timer = window.setTimeout(() => {
      setCount((c) => c + 1);
      if (count % 2 === 0 && text[count] !== " ") sfx.type();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [active, done, count, text, speed]);

  useEffect(() => {
    if (active && done) doneRef.current?.();
  }, [active, done, doneRef]);

  return (
    <span className="rx-type">
      <span className="rx-sr">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, shown)}
        <span className="rx-type-ghost">{text.slice(shown)}</span>
      </span>
    </span>
  );
}
