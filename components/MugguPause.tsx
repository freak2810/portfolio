"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MugguPauseProps = { className: string; children: ReactNode };

// The one script of the muggu: it only sets data-paused while the box is out of view or the tab is hidden. CSS does the rest.
export function MugguPause({ className, children }: MugguPauseProps) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let inView = true;
    const sync = () => el.toggleAttribute("data-paused", !inView || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div ref={box} className={className} data-muggu>
      {children}
    </div>
  );
}
