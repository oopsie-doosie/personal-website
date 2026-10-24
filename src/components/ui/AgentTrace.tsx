// src/components/ui/AgentTrace.tsx
// Illustrative terminal showing the shape of an Arbwick agent run. Lines type
// in as the card scrolls into view, with CSS only (see .scroll-trace).
import type { CSSProperties, ReactNode } from "react";

type Line = { mark: string; tone: string; label: ReactNode; detail?: string; parallel?: boolean };

const lines: Line[] = [
  {
    mark: "❯",
    tone: "text-mint",
    label: (
      <>
        thesis <span className="text-fg">"Mid-cap semis with improving margins, trading below peers"</span>
      </>
    ),
  },
  { mark: "→", tone: "text-violet", label: "plan", detail: "5 analyses · 2 parallel" },
  { mark: "→", tone: "text-violet", label: "tools", detail: "9 of 300+ loaded on demand" },
  { mark: "✓", tone: "text-mint", label: "screen.universe", detail: "0.4s" },
  { mark: "✓", tone: "text-mint", label: "valuation.relative", detail: "1.1s", parallel: true },
  { mark: "✓", tone: "text-mint", label: "risk.factor_exposure", detail: "0.9s", parallel: true },
  { mark: "✓", tone: "text-mint", label: "backtest.thesis", detail: "2.6s" },
  { mark: "✓", tone: "text-mint", label: "audit", detail: "every figure → source query" },
];

const AgentTrace = () => (
  <figure
    className="scroll-trace glow-border mx-auto w-full max-w-[34rem] transition-transform duration-700 ease-out lg:[transform:perspective(1400px)_rotateY(-9deg)_rotateX(5deg)] lg:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]"
    role="img"
    aria-label="Illustration of an Arbwick agent run: a plain-English investment thesis is planned, tools are loaded on demand, analyses run in parallel, and every figure is traced back to its source query."
  >
    <div className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="ml-3 font-mono text-xs text-muted">arbwick — agent run</span>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-faint">
          illustrative
        </span>
      </div>

      <div className="space-y-2.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {lines.map((line, i) => (
          <div
            key={i}
            className="scroll-line flex gap-3"
            style={{ "--i": i } as CSSProperties}
          >
            <span className={`${line.tone} w-3 shrink-0`}>{line.mark}</span>
            <span className="min-w-0 flex-1 text-muted">
              {line.label}
              {line.parallel && (
                <span className="ml-2 rounded bg-cyan/10 px-1.5 py-px text-[10px] uppercase tracking-wider text-cyan">
                  parallel
                </span>
              )}
            </span>
            {line.detail && (
              <span className="shrink-0 text-right text-faint">{line.detail}</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.07] px-5 py-4">
        <div className="trace-bar h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <span />
        </div>
        <p
          className="scroll-line mt-3 font-mono text-[12.5px] text-fg sm:text-[13px]"
          style={{ "--i": lines.length } as CSSProperties}
        >
          <span className="text-mint">▸</span> report ready · re-verify any number in one click
          <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan" />
        </p>
      </div>
    </div>
  </figure>
);

export default AgentTrace;
