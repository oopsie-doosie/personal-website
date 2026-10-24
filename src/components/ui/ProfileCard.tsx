// src/components/ui/ProfileCard.tsx
// Hero "whoami" terminal with quick facts. Lines type in with CSS only (see
// .trace-line), so it animates before JavaScript loads.
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { facts, personalInfo } from "@/data";

const line = (i: number) => ({ "--i": i, "--step": "170ms" }) as CSSProperties;

const links = [
  { label: "email", href: `mailto:${personalInfo.email}` },
  { label: "linkedin", href: personalInfo.linkedin },
  { label: "github", href: personalInfo.github },
];

const ProfileCard = () => (
  <figure
    className="rise glow-border mx-auto w-full max-w-[34rem] transition-transform duration-700 ease-out lg:[transform:perspective(1400px)_rotateY(-9deg)_rotateX(5deg)] lg:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]"
    style={{ "--d": "250ms" } as CSSProperties}
    aria-label={`Quick facts about ${personalInfo.name}`}
  >
    <div className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-white/10" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-white/10" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-white/10" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-muted">~/polat — zsh</span>
      </div>

      <div className="px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        <p className="trace-line text-fg" style={line(0)}>
          <span className="mr-3 text-mint" aria-hidden="true">❯</span>whoami
        </p>
        <dl className="mt-3 space-y-2">
          {facts.map((fact, i) => (
            <div key={fact.label} className="trace-line grid grid-cols-[5.75rem_1fr] gap-3" style={line(i + 1)}>
              <dt className="text-faint">{fact.label}</dt>
              <dd className={i === 0 ? "text-gradient" : "text-fg/90"}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-white/[0.07] px-5 py-4 font-mono text-[12.5px] sm:text-[13px]">
        <p className="trace-line text-fg" style={line(facts.length + 1)}>
          <span className="mr-3 text-mint" aria-hidden="true">❯</span>open --links
        </p>
        <p className="trace-line mt-3 flex flex-wrap items-center gap-2" style={line(facts.length + 2)}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-muted transition hover:border-cyan/40 hover:text-cyan"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
          <span className="caret ml-1 inline-block h-4 w-2 bg-cyan" aria-hidden="true" />
        </p>
      </div>
    </div>
  </figure>
);

export default ProfileCard;
