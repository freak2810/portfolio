"use client";

import { THEME_KEY, nextTheme } from "./theme";
import styles from "./ThemeToggle.module.css";

function flip() {
  const root = document.documentElement;
  const next = nextTheme(root.dataset.theme);
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // storage can be blocked; the page still flips for this visit
  }
}

export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  return (
    <button type="button" className={styles.toggle} onClick={flip}>
      <span className={`sr-only ${styles.toLight}`}>{toLight}</span>
      <span className={`sr-only ${styles.toDark}`}>{toDark}</span>
      <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <circle className={styles.ring} cx={12} cy={12} r={9} />
        <path className={styles.half} d="M12 3 A9 9 0 0 0 12 21 Z" />
      </svg>
    </button>
  );
}
