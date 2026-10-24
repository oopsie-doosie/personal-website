// src/components/sections/Experience.tsx
import type { CSSProperties } from "react";
import { experience, type Highlight } from "@/data";
import { Icon } from "@/utils/icons";
import SectionHeading from "@/components/ui/SectionHeading";
import AgentTrace from "@/components/ui/AgentTrace";

const spanClass = {
  2: "sm:col-span-2",
  3: "lg:col-span-3",
};

/* --------------------------------------------------- card diagrams */

const StackVisual = () => (
  <div className="space-y-2 font-mono text-[11.5px] sm:text-xs">
    {[
      ["interface", "React / TypeScript SPA"],
      ["platform", "FastAPI · access control · billing · monitoring"],
      ["data", "40+ pipelines → 130M-row time-series store"],
    ].map(([layer, detail], i) => (
      <div
        key={layer}
        className="flex items-baseline gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 sm:[margin-left:var(--ml)] sm:[margin-right:var(--mr)]"
        style={{ "--ml": `${i * 4}%`, "--mr": `${(2 - i) * 4}%` } as CSSProperties}
      >
        <span className="w-16 shrink-0 text-faint">{layer}</span>
        <span className="min-w-0 text-muted">{detail}</span>
      </div>
    ))}
  </div>
);

const Node = ({ children, accent = false }: { children: string; accent?: boolean }) => (
  <span
    className={`rounded-lg border px-2 py-1 font-mono text-[10.5px] sm:px-2.5 sm:text-xs ${
      accent
        ? "border-cyan/40 bg-cyan/10 text-cyan"
        : "border-white/10 bg-ink-2 text-muted"
    }`}
  >
    {children}
  </span>
);

const PipelineVisual = () => (
  <div className="relative flex items-center justify-between gap-1.5">
    <span className="absolute inset-x-2 top-1/2 h-px bg-gradient-to-r from-violet/50 via-cyan/50 to-mint/50" aria-hidden="true" />
    <span className="relative"><Node>thesis</Node></span>
    <span className="relative"><Node>plan</Node></span>
    <span className="relative flex flex-col gap-1.5">
      <Node accent>valuation</Node>
      <Node accent>risk</Node>
    </span>
    <span className="relative"><Node>backtest</Node></span>
    <span className="relative"><Node>report</Node></span>
  </div>
);

const ReferenceVisual = () => (
  <div className="rounded-2xl border border-white/[0.08] bg-ink-2/70 p-4 font-mono text-[11.5px] sm:text-xs">
    <div className="flex flex-wrap items-center gap-2 text-muted">
      <Node>screen</Node>
      <span className="text-faint">─</span>
      <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-mint">ref:7f3a</span>
      <span className="text-faint">→</span>
      <Node>valuation</Node>
      <span className="text-faint">─</span>
      <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-mint">ref:91c2</span>
      <span className="text-faint">→</span>
      <Node>report</Node>
    </div>
    <p className="mt-3 text-faint">
      payloads stored once · prompts carry pointers · cached · cost per call
    </p>
  </div>
);

const visuals = {
  stack: StackVisual,
  pipeline: PipelineVisual,
  reference: ReferenceVisual,
};

/* --------------------------------------------------- cards */

const FeatureCard = ({ item }: { item: Highlight }) => {
  const Visual = item.visual ? visuals[item.visual] : null;
  const isFull = item.span === 3;

  return (
    <article
      className={`spotlight card reveal p-6 sm:p-7 ${item.span ? spanClass[item.span] : ""} ${
        isFull ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10" : "flex flex-col"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          {item.metric && (
            <span className="rounded-full border border-mint/25 bg-mint/[0.08] px-3 py-1 font-mono text-xs text-mint">
              {item.metric}
            </span>
          )}
        </div>
        <h4 className="mt-6 text-lg font-medium tracking-tight text-fg">{item.title}</h4>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
      </div>
      {Visual && (
        <div className={isFull ? "mt-6 lg:mt-0" : "mt-auto pt-7"}>
          <Visual />
        </div>
      )}
    </article>
  );
};

const MetricCard = ({ item }: { item: Highlight }) => (
  <article className="spotlight card reveal flex flex-col p-6 sm:p-7">
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan">
      <Icon name={item.icon} className="h-5 w-5" />
    </span>
    <p className="mt-8 text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.045em] text-gradient">
      {item.metric}
    </p>
    <p className="mt-2 text-sm text-muted">{item.metricLabel}</p>
    <div className="my-6 h-px bg-white/[0.08]" />
    <h4 className="text-lg font-medium tracking-tight text-fg">{item.title}</h4>
    <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
  </article>
);

/* --------------------------------------------------- section */

const Experience = () => (
  <section id="work" className="section">
    <div className="shell">
      <SectionHeading index="01" eyebrow="Experience" title="Where I've" accent="shipped.">
        Four years in regulated finance: from the reporting engine behind Goldman Sachs'
        institutional clients to an AI research platform I'm building from the ground up.
      </SectionHeading>

      <div className="mt-20 space-y-24">
        {experience.map((job) => (
          <div key={job.company}>
            <div className="reveal flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold tracking-tight">
                  <span className="text-gradient">{job.monogram}</span>
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{job.company}</h3>
                  <p className="mt-1 text-muted">{job.role}</p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{job.period}</p>
                <p className="mt-2 text-sm text-muted">{job.summary}</p>
              </div>
            </div>

            {job.showcase && (
              <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="reveal lg:col-span-5">
                  <p className="eyebrow">Under the hood</p>
                  <h4 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                    {job.showcase.title}
                  </h4>
                  <p className="mt-4 text-[17px] leading-relaxed text-muted">{job.showcase.text}</p>
                </div>
                <div className="lg:col-span-7">
                  <AgentTrace />
                </div>
              </div>
            )}

            <div className="mt-12 grid gap-4 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3">
              {job.highlights.map((item) =>
                item.metricLabel ? (
                  <MetricCard key={item.title} item={item} />
                ) : (
                  <FeatureCard key={item.title} item={item} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
