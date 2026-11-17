import { MugguPause } from "./MugguPause";
import { mugguDots, mugguPath, mugguViewBox } from "./mugguPath";
import styles from "./Landing.module.css";

// Decorative only: the h1 stays the accessible name of the landing.
export function Muggu() {
  const { w, h } = mugguViewBox;
  const { step, r } = mugguDots;
  return (
    <MugguPause className={styles.muggu}>
      <svg viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
        <pattern id="muggu-dots" width={step} height={step} x={(w % step) / 2} y={(h % step) / 2} patternUnits="userSpaceOnUse">
          <circle className={styles.dots} cx={step / 2} cy={step / 2} r={r} />
        </pattern>
        <rect width={w} height={h} fill="url(#muggu-dots)" />
        <path className={styles.line} d={mugguPath} pathLength={1} />
      </svg>
    </MugguPause>
  );
}
