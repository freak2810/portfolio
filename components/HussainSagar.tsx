import styles from "./HussainSagar.module.css";

const horizon = "M0 118 H600";
const rock = "M236 118 L254 99 L274 103 L328 100 L346 104 L364 118";
const robe = "M300 40 C280 52 276 80 280 100 H320 C324 80 320 52 300 40 Z";
const robeLines = "M292 62 V100 M300 56 V100 M308 62 V100";
const topKnot = "M296 21 A4 4 0 0 1 304 21";

const ripples = [
  { y: 126, w: 120, opacity: 0.9 },
  { y: 134, w: 200, opacity: 0.7 },
  { y: 142, w: 280, opacity: 0.5 },
  { y: 150, w: 360, opacity: 0.35 },
].map(({ y, w, opacity }) => {
  const q = w / 4;
  return { opacity, d: `M${300 - w / 2} ${y} q${q / 2} -3 ${q} 0 t${q} 0 t${q} 0 t${q} 0` };
});

export function HussainSagar() {
  return (
    <svg className={styles.art} viewBox="0 0 600 160" aria-hidden="true" data-egg="lake">
      <path className={styles.line} d={horizon} />
      <path className={styles.line} d={rock} />
      <path className={styles.line} d={robe} />
      <path className={styles.line} d={robeLines} />
      <circle className={styles.line} cx={300} cy={30} r={9} />
      <path className={styles.line} d={topKnot} />
      {ripples.map((r) => (
        <path key={r.d} className={styles.line} d={r.d} pathLength={1} strokeOpacity={r.opacity} data-ripple />
      ))}
    </svg>
  );
}
