// src/components/sections/Hero.tsx
import type { CSSProperties } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { personalInfo, stats } from "@/data";
import ProfileCard from "@/components/ui/ProfileCard";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Highlight the name I go by (e.g. "Yuksel *Polat* Akbiyik")
const [firstName, , lastName] = personalInfo.name.split(" ");

const Hero = () => (
  <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
    <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

    <div className="shell">
      <p
        className="rise glass inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full px-4 py-1.5 text-sm text-muted"
        style={delay(0)}
      >
        <span className="flex items-center gap-2.5">
          <span className="pulse-dot" aria-hidden="true" />
          {personalInfo.role} at <span className="text-fg">{personalInfo.company}</span>
        </span>
        <span className="hidden h-3.5 w-px bg-white/15 sm:block" aria-hidden="true" />
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {personalInfo.location}
        </span>
      </p>

      <h1
        className="focus-in mt-8 text-[clamp(3.1rem,6.9vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-fg"
        style={delay(80)}
      >
        {firstName}{" "}
        <span className="serif-accent text-gradient tracking-[-0.02em]">{personalInfo.shortName}</span>{" "}
        {lastName}
      </h1>

      <div className="mt-12 grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p
            className="focus-in text-[clamp(1.85rem,3.4vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]"
            style={delay(160)}
          >
            I build AI agents <span className="serif-accent text-gradient">finance can trust.</span>
          </p>

          <p className="focus-in mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(240)}>
            {personalInfo.intro}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(360)}>
            <a href="#work" className="btn-primary">
              See the work
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
            <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="icon-btn" aria-label="Email">
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ProfileCard />
        </div>
      </div>
    </div>

    <div className="shell mt-24">
      <ul className="rise grid grid-cols-2 gap-y-10 border-t border-white/[0.08] pt-10 lg:grid-cols-4" style={delay(500)}>
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className={`pr-6 ${i > 0 ? "lg:border-l lg:border-white/[0.08] lg:pl-8" : ""}`}
          >
            <p className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em]">
              {stat.value}
              <span className="text-gradient">{stat.unit}</span>
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-snug text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Hero;
