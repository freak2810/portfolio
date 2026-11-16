"use client";

import { useState, type CSSProperties } from "react";
import styles from "./RoleRotator.module.css";

type Props = { items: readonly string[]; pauseLabel: string; playLabel: string };

export function RoleRotator({ items, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);
  return (
    <p className={styles.rotator} data-count={items.length} data-paused={paused || undefined}>
      <span className="sr-only">{items[0]}</span>
      <span className={styles.items} aria-hidden="true">
        {items.map((item, i) => (
          <span key={item} className={styles.item} style={{ "--i": i } as CSSProperties}>
            {item}
          </span>
        ))}
      </span>
      <button type="button" className={styles.toggle} aria-label={paused ? playLabel : pauseLabel} onClick={() => setPaused(!paused)}>
        <svg viewBox="0 0 10 10" width="15" height="15" aria-hidden="true" focusable="false">
          {paused ? <path d="M2 1 9 5 2 9z" /> : <path d="M1.5 1h2.5v8H1.5zM6 1h2.5v8H6z" />}
        </svg>
      </button>
    </p>
  );
}
