import styles from "./Shield.module.css";

const outline = "M100 8 L184 38 V128 C184 186 146 218 100 236 C54 218 16 186 16 128 V38 Z";
const inset14 = "M100 23 L170 48 V128 C170 180 140 206 100 221 C60 206 30 180 30 128 V48 Z";
const inset28 = "M100 38 L156 58 V128 C156 170 130 193 100 207 C70 193 44 170 44 128 V58 Z";
const star =
  "M100 62 L107.99 85 L132.34 85.49 L112.93 100.2 L119.98 123.51 L100 109.6 L80.02 123.51 L87.07 100.2 L67.66 85.49 L92.01 85 Z";

const traceLeft = [
  { d: "M44 118 H58 L64 124", dot: [64, 124] },
  { d: "M44 134 H72", dot: [72, 134] },
  { d: "M52 150 H66 L74 158", dot: [74, 158] },
] as const;

function Traces({ mirror }: { mirror?: boolean }) {
  return (
    <g transform={mirror ? "translate(200 0) scale(-1 1)" : undefined}>
      {traceLeft.map((t) => (
        <g key={t.d}>
          <path className={styles.trace} d={t.d} pathLength={1} />
          <circle className={styles.dot} cx={t.dot[0]} cy={t.dot[1]} r={2.2} />
        </g>
      ))}
    </g>
  );
}

export function Shield({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg className={styles.shield} viewBox="0 0 200 240" role="img" aria-label={ariaLabel}>
      <defs>
        <radialGradient id="shield-glow">
          <stop className={styles.glowCore} offset="0" />
          <stop className={styles.glowEdge} offset="1" />
        </radialGradient>
      </defs>
      <path className={styles.band} d={`${inset14} ${inset28}`} fillRule="evenodd" />
      <path className={styles.outline} d={outline} pathLength={1} />
      <path className={styles.ring} d={inset14} pathLength={1} />
      <path className={styles.ring} d={inset28} pathLength={1} />
      <Traces />
      <Traces mirror />
      <g data-egg="star">
        <circle className={styles.glow} cx={100} cy={96} r={62} fill="url(#shield-glow)" />
        <path className={styles.star} d={star} pathLength={1} />
      </g>
    </svg>
  );
}
