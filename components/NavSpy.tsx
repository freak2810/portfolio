"use client";

import { useEffect } from "react";

// The nav's one script: it only sets aria-current on the link of the section in view. CSS does the rest.
// Band: from under the sticky nav (4rem, about 64px) down to 30% of the viewport.
// At the page bottom the last section is current: on a tall viewport it can never reach the band.
const BAND = "-64px 0px -70% 0px";

export function NavSpy({ ids }: { ids: readonly string[] }) {
  useEffect(() => {
    const inBand = new Set<string>();
    const links = document.querySelectorAll<HTMLAnchorElement>('.lintel ul a[href^="#"]');
    const update = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const current = atBottom ? ids.at(-1) : ids.findLast((id) => inBand.has(id));
      if (!current) return;
      links.forEach((link) =>
        link.getAttribute("href") === `#${current}` ? link.setAttribute("aria-current", "location") : link.removeAttribute("aria-current"),
      );
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? inBand.add(entry.target.id) : inBand.delete(entry.target.id)));
        update();
      },
      { rootMargin: BAND },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [ids]);
  return null;
}
