"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

type NavMenuProps = { label: string; children: ReactNode };

function closeOnLink(event: MouseEvent<HTMLDetailsElement>) {
  if (event.target instanceof Element && event.target.closest("a")) {
    event.currentTarget.open = false;
  }
}

function closeOnEscape(event: KeyboardEvent<HTMLDetailsElement>) {
  if (event.key === "Escape" && event.currentTarget.open) {
    event.currentTarget.open = false;
    event.currentTarget.querySelector("summary")?.focus();
  }
}

export function NavMenu({ label, children }: NavMenuProps) {
  return (
    <details onClick={closeOnLink} onKeyDown={closeOnEscape}>
      <summary>{label}</summary>
      {children}
    </details>
  );
}
