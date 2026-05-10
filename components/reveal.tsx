"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li" | "aside";
}

/**
 * Tasteful one-shot reveal: respects `prefers-reduced-motion` (handled in CSS),
 * uses IntersectionObserver, and cleans up after firing. No re-render churn,
 * no global scroll listener.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.setAttribute("data-reveal", "in");
            observer.unobserve(node);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { "--reveal-delay": delay } as CSSProperties;

  // Cast to keep TS happy across the union of HTML element refs.
  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}
