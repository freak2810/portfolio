"use client";

import { useState, type CSSProperties } from "react";
import styles from "./RoleRotator.module.css";

type Props = { items: readonly string[]; pauseLabel: string; playLabel: string };

// Long quotes get a longer slot so they can be read. The slot seconds here and the keyframe percentages in the CSS move together.
const SLOT_SECONDS = { short: 3, mid: 5, long: 8 } as const;
type Length = keyof typeof SLOT_SECONDS;

const lengthOf = (item: string): Length => {
  const words = item.split(/\s+/).length;
  return words > 12 ? "long" : words > 5 ? "mid" : "short";
};

export function RoleRotator({ items, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);
  let offset = 0;
  const slots = items.map((item) => {
    const length = lengthOf(item);
    const slot = { item, length, at: offset };
    offset += SLOT_SECONDS[length];
    return slot;
  });
  return (
    <p className={styles.rotator} data-count={items.length} data-cycle={offset} data-paused={paused || undefined}>
      <span className="sr-only">{items[0]}</span>
      <button type="button" className={styles.toggle} aria-label={paused ? playLabel : pauseLabel} onClick={() => setPaused(!paused)}>
        <svg viewBox="0 0 10 10" width="15" height="15" aria-hidden="true" focusable="false">
          {paused ? <path d="M2 1 9 5 2 9z" /> : <path d="M1.5 1h2.5v8H1.5zM6 1h2.5v8H6z" />}
        </svg>
      </button>
      <span className={styles.items} aria-hidden="true">
        {slots.map(({ item, length, at }) => (
          <span key={item} className={`${styles.item} ${styles[length]}`} style={{ "--at": `${at}s` } as CSSProperties}>
            {item}
          </span>
        ))}
      </span>
    </p>
  );
}
