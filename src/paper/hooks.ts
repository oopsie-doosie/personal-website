// src/paper/hooks.ts
// Small helpers shared across the newspaper edition.
import { useEffect, useState, type RefObject } from "react";

export const cx = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(" ");

export const slug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useInView = (ref: RefObject<Element>, threshold = 0.25) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};
