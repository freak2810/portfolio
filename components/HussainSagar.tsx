import { TracedArt } from "./TracedArt";
import styles from "./HussainSagar.module.css";

const ripples = [
  { y: 6, w: 120, opacity: 0.9 },
  { y: 16, w: 200, opacity: 0.7 },
  { y: 26, w: 280, opacity: 0.5 },
  { y: 36, w: 360, opacity: 0.35 },
].map(({ y, w, opacity }) => {
  const q = w / 4;
  return { opacity, d: `M${300 - w / 2} ${y} q${q / 2} -3 ${q} 0 t${q} 0 t${q} 0 t${q} 0` };
});

export function HussainSagar() {
  return (
    <div className={styles.lake} data-egg="lake">
      <TracedArt
        name="buddha"
        layers={["water", "body", "rim"]}
        width={557}
        height={1630}
        className={styles.art}
      />
      <svg className={styles.ripples} viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
        {ripples.map((r, i) => (
          <path key={r.d} className={styles.line} d={r.d} pathLength={1} strokeOpacity={r.opacity} data-ripple={i} />
        ))}
      </svg>
    </div>
  );
}
