import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook: adds `.revealed` class when element enters the viewport.
 * Usage: const ref = useScrollReveal(); <div ref={ref} className="reveal-on-scroll"> ...
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Multi-child scroll-reveal: observes all direct children of a container
 * and adds `.revealed` class with staggered delay.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.08,
  staggerMs = 80
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = children.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("revealed");
            }, index * staggerMs);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    children.forEach((child) => {
      child.classList.add("reveal-child");
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [threshold, staggerMs]);

  return ref;
}
