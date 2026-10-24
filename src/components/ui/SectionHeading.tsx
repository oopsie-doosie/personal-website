// src/components/ui/SectionHeading.tsx
import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  children?: ReactNode;
  centered?: boolean;
}

const SectionHeading = ({
  index,
  eyebrow,
  title,
  accent,
  children,
  centered = false,
}: SectionHeadingProps) => (
  <div className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
    <p className="eyebrow">
      <span className="text-gradient">{index}</span>
      <span className="mx-2 text-white/20">/</span>
      {eyebrow}
    </p>
    <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
      {title} <span className="serif-accent text-gradient">{accent}</span>
    </h2>
    {children && (
      <p className="mt-6 text-lg leading-relaxed text-muted">{children}</p>
    )}
  </div>
);

export default SectionHeading;
