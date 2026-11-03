// src/components/layout/Navbar.tsx
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Gamepad2, Menu, X } from "lucide-react";
import { personalInfo } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSiteTheme } from "@/theme/siteTheme";

const navItems = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "toolkit", label: "Toolkit" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const sectionIds = navItems.map((item) => item.id);

// useLayoutEffect warns during the build-time render; it only matters in the browser
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const Monogram = ({ className = "" }: { className?: string }) => {
  const gradientId = useId();
  return (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b6a9ff" />
        <stop offset="0.5" stopColor="#7fe7f7" />
        <stop offset="1" stopColor="#8cf3c6" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
    <path
      d="M9.5 10.5 14 16l-4.5 5.5M16.5 21.5H23"
      fill="none"
      stroke="#07080b"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
};

const Navbar = () => {
  const active = useActiveSection(sectionIds);
  const { switchTheme, preloadRetro } = useSiteTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [showRetroHint, setShowRetroHint] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Nudge first-time visitors towards the retro edition (shown while they're
  // at the top of the page). Anyone who has switched before is marked
  // `retro-seen` by the boot script in index.html.
  useEffect(() => {
    if (document.documentElement.classList.contains("retro-seen")) return;
    const show = window.setTimeout(() => setShowRetroHint(true), 1200);
    return () => window.clearTimeout(show);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide the highlight pill under the active link
  useIsomorphicLayoutEffect(() => {
    const link = linkRefs.current[active];
    setIndicator(
      link ? { left: link.offsetLeft, width: link.offsetWidth } : { left: 0, width: 0 }
    );
  }, [active]);

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Main"
          className={`glass flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-1.5 pl-2 pr-1.5 transition-shadow duration-500 ${
            isScrolled ? "shadow-[0_18px_50px_-18px_rgba(0,0,0,0.85)]" : ""
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
            aria-label={`${personalInfo.name}, back to top`}
          >
            <Monogram className="h-8 w-8" />
            <span className="font-medium tracking-tight">{personalInfo.shortName}</span>
          </a>

          <ul className="relative hidden items-center md:flex">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full bg-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.width ? 1 : 0,
              }}
            />
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            {/* Swaps the whole site for the retro game edition (src/retro).
                Until a visitor has tried it, it bounces and glows (.retro-toggle). */}
            <div className="relative">
              <button
                type="button"
                className="icon-btn retro-toggle group h-10 w-10 md:h-9 md:w-9"
                onClick={() => switchTheme("retro")}
                onPointerEnter={preloadRetro}
                onFocus={preloadRetro}
                aria-label="Switch to the retro game edition"
                title="Press start"
              >
                <Gamepad2
                  className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-12"
                  aria-hidden="true"
                />
                <span className="retro-toggle-ping" aria-hidden="true" />
              </button>
              {/* The button above is the accessible control; this is a visual
                  hint that teases without spoiling the surprise */}
              <div
                aria-hidden="true"
                onClick={() => switchTheme("retro")}
                onPointerEnter={preloadRetro}
                className={`retro-hint ${
                  showRetroHint && !isScrolled && !isMenuOpen ? "is-visible" : ""
                }`}
              >
                <span className="retro-hint-eyebrow">Psst · Secret mode</span>
                <span>Go on, press it. Trust me.</span>
              </div>
            </div>
            <a href="#contact" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
              Let's talk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="icon-btn h-10 w-10 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink/85 backdrop-blur-2xl transition-opacity duration-500 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="shell flex h-full flex-col justify-center gap-2">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className="transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transitionDelay: isMenuOpen ? `${80 + index * 60}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "none" : "translateY(16px)",
              }}
            >
              <a
                href={`#${item.id}`}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-baseline gap-4 py-2 text-5xl font-semibold tracking-[-0.04em]"
              >
                <span className="font-mono text-sm text-faint">0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
