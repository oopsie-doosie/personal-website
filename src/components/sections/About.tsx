// src/components/sections/About.tsx
import { GraduationCap } from "lucide-react";
import { education, interests } from "@/data";
import { Icon } from "@/utils/icons";
import SectionHeading from "@/components/ui/SectionHeading";

const About = () => (
  <section id="about" className="section">
    <div className="shell">
      <SectionHeading index="04" eyebrow="About" title="Systems and" accent="markets." />

      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        <div className="reveal space-y-6 text-xl leading-relaxed text-muted lg:col-span-7 lg:pr-10 sm:text-2xl sm:leading-relaxed">
          <p>
            I studied <span className="text-fg">computer science and economics</span> at
            UCLA, and I've worked where the two meet ever since: three and a half years
            building client reporting at <span className="text-fg">Goldman Sachs</span>, and
            now <span className="text-fg">Arbwick</span>, where agents do real research work
            for institutional investors.
          </p>
          <p>
            The part I care about most is the unglamorous one: evaluations, audit trails and
            tested code underneath the model, so the answer holds up when a client asks
            where a number came from.
          </p>
        </div>

        <div className="grid gap-4 lg:col-span-5">
          {education.map((item) => (
            <article key={item.school} className="spotlight card reveal p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan">
                  <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <p className="eyebrow">Education</p>
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-tight">{item.school}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.degrees.map((degree) => (
                  <li key={degree} className="chip text-fg">
                    {degree}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {item.period} · {item.location}
              </p>
            </article>
          ))}

          <article className="spotlight card reveal p-6 sm:p-7">
            <p className="eyebrow">Off the clock</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li
                  key={interest.name}
                  className="chip group cursor-default transition hover:-translate-y-0.5 hover:border-white/25 hover:text-fg"
                >
                  <Icon
                    name={interest.icon}
                    className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-mint"
                  />
                  {interest.name}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
);

export default About;
