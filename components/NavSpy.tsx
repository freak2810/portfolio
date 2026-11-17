"use client";

import { useEffect } from "react";
import { sectionIds } from "../content/ids";

// The nav's one script: it only sets aria-current on the link of the section in view. CSS does the rest.
// Band: from under the sticky nav (4rem, about 64px) down to 30% of the viewport.
const BAND = "-64px 0px -70% 0px";

export function NavSpy() {
  useEffect(() => {
    const inBand = new Set<string>();
    const links = document.querySelectorAll<HTMLAnchorElement>('.lintel a[href^="#"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? inBand.add(entry.target.id) : inBand.delete(entry.target.id)));
        const current = sectionIds.findLast((id) => inBand.has(id));
        if (!current) return;
        const href = current === "home" ? "" : `#${current}`;
        links.forEach((link) =>
          link.getAttribute("href") === href ? link.setAttribute("aria-current", "location") : link.removeAttribute("aria-current"),
        );
      },
      { rootMargin: BAND },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
