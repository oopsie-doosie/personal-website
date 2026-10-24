// src/components/sections/Projects.tsx
import { AlertTriangle, Check, CheckCircle2, Wrench } from "lucide-react";
import { projects } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";

// Illustrative conversation showing the MCP's guardrail on a destructive action
const ChatMock = () => (
  <div
    className="glow-border w-full"
    role="img"
    aria-label="Illustrative chat: a user asks for a leveraged ETH perpetual order with a stop-loss, the agent prepares a place_order tool call, asks for confirmation because the action is destructive, and submits it after the user confirms."
  >
    <div className="space-y-3 p-4 sm:p-5">
      <div className="flex items-center justify-between pb-1">
        <span className="font-mono text-xs text-muted">trade-mcp · chat</span>
        <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-faint">
          illustrative
        </span>
      </div>

      <p className="reveal ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-violet/90 to-cyan/80 px-4 py-2.5 text-[15px] text-ink">
        Long ETH perp, $2k notional at 3x. Stop-loss 4% below entry.
      </p>

      <div className="reveal max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] p-3.5 font-mono text-xs leading-relaxed">
        <p className="flex items-center gap-2 text-cyan">
          <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> place_order
        </p>
        <pre className="mt-2 whitespace-pre-wrap text-muted">
{`{ "symbol": "ETH-PERP", "side": "buy",
  "notional": 2000, "leverage": 3,
  "stop_loss": "-4%" }`}
        </pre>
      </div>

      <div className="reveal max-w-[92%] rounded-2xl rounded-bl-md border border-amber/30 bg-amber/[0.07] p-3.5">
        <p className="flex items-center gap-2 text-sm text-amber">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Destructive action. Confirm before sending?
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-amber px-3 py-1 font-medium text-ink">Confirm</span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-muted">Cancel</span>
        </div>
      </div>

      <p className="reveal ml-auto w-fit rounded-2xl rounded-br-md bg-gradient-to-br from-violet/90 to-cyan/80 px-4 py-2.5 text-[15px] text-ink">
        Confirm
      </p>

      <p className="reveal flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] text-fg">
        <CheckCircle2 className="h-4 w-4 text-mint" aria-hidden="true" />
        Order submitted with stop-loss attached.
      </p>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="section">
    <div className="shell">
      <SectionHeading index="02" eyebrow="Project" title="Trading, in" accent="plain English.">
        A side project that turns any LLM client into a careful trader.
      </SectionHeading>

      {projects.map((project) => (
        <article
          key={project.title}
          className="spotlight card reveal mt-16 grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14"
        >
          <div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="chip font-mono text-xs text-cyan">
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.tagline}</p>

            <ul className="mt-8 space-y-4">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-faint">
              Runs on
              {project.surfaces.map((surface) => (
                <span key={surface} className="chip">
                  {surface}
                </span>
              ))}
            </p>
          </div>

          <ChatMock />
        </article>
      ))}
    </div>
  </section>
);

export default Projects;
