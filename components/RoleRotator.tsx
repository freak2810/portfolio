import type { CSSProperties } from "react";
import styles from "./RoleRotator.module.css";

type Props = { items: readonly string[] };

// Long quotes get a longer slot so they can be read. The slot seconds here and the keyframe percentages in the CSS move together.
const SLOT_SECONDS = { short: 3, mid: 5, long: 8 } as const;
// Must match data-cycle and animation-duration in RoleRotator.module.css.
const CYCLE_SECONDS = 57;
type Length = keyof typeof SLOT_SECONDS;

const lengthOf = (item: string): Length => {
  const words = item.split(/\s+/).length;
  return words > 12 ? "long" : words > 5 ? "mid" : "short";
};

export function RoleRotator({ items }: Props) {
  let offset = 0;
  const slots = items.map((item) => {
    const length = lengthOf(item);
    const slot = { item, length, at: offset };
    offset += SLOT_SECONDS[length];
    return slot;
  });
  if (offset !== CYCLE_SECONDS) {
    throw new Error(`RoleRotator slots sum to ${offset} s but the CSS is tuned for ${CYCLE_SECONDS} s: retune RoleRotator.module.css (data-cycle, animation-duration, keyframes) and CYCLE_SECONDS.`);
  }
  return (
    <div className={styles.rotator} data-count={items.length} data-cycle={offset}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span className={styles.items} aria-hidden="true">
        {slots.map(({ item, length, at }) => (
          <span key={item} className={`${styles.item} ${styles[length]}`} style={{ "--at": `${at}s` } as CSSProperties}>
            {item}
          </span>
        ))}
      </span>
    </div>
  );
}
