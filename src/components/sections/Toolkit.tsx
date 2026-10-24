// src/components/sections/Toolkit.tsx
import type { CSSProperties } from "react";
import { skills } from "@/data";
import { Icon } from "@/utils/icons";
import SectionHeading from "@/components/ui/SectionHeading";

const Marquee = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
  <div className="marquee py-2" aria-hidden="true">
    <div
      className={`marquee-track gap-3 ${reverse ? "reverse" : ""}`}
      style={{ "--duration": `${items.length * 4.5}s` } as CSSProperties}
    >
      {/* Rendered twice so the loop is seamless */}
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2.5 text-[15px] text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Toolkit = () => {
  const [ai, ...rest] = skills;
  const stack = rest.flatMap((group) => group.items);

  return (
    <section id="toolkit" className="section">
      <div className="shell">
        <SectionHeading index="03" eyebrow="Toolkit" title="The stack behind" accent="the work.">
          From model APIs and agent patterns to the data, backend and observability
          layers that keep them honest in production.
        </SectionHeading>
      </div>

      <div className="reveal mt-14 space-y-3">
        <Marquee items={ai.items} />
        <Marquee items={stack} reverse />
      </div>

      <div className="shell mt-14 grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <article key={group.group} className="spotlight card reveal p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan">
                <Icon name={group.icon} className="h-[18px] w-[18px]" />
              </span>
              <h3 className="text-lg font-medium tracking-tight">{group.group}</h3>
              <span className="ml-auto font-mono text-xs text-faint">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip transition-colors hover:border-white/25 hover:text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Toolkit;
