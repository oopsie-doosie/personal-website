// src/components/layout/Footer.tsx
import { ArrowUp } from "lucide-react";
import { personalInfo } from "@/data";
import { Monogram } from "@/components/layout/Navbar";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08]">
      <div className="shell flex flex-col items-center justify-between gap-6 py-10 text-sm text-faint sm:flex-row">
        <div className="flex items-center gap-3">
          <Monogram className="h-7 w-7" />
          {/* Prerendered at build time, so the year may differ on hydration */}
          <p suppressHydrationWarning>
            © {currentYear} {personalInfo.name} · {personalInfo.location}
          </p>
        </div>
        <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-fg">
          Back to top
          <span className="icon-btn h-9 w-9 group-hover:-translate-y-0.5">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
