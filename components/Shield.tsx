import styles from "./Shield.module.css";

const star = "M100.00 66.00 L107.63 89.49 L132.34 89.49 L112.35 104.01 L119.98 127.51 L100.00 112.99 L80.02 127.51 L87.65 104.01 L67.66 89.49 L92.37 89.49 Z";

export function Shield({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className={styles.wrap}>
      <svg className={styles.shield} viewBox="0 0 200 200" role="img" aria-label={ariaLabel}>
        <defs>
          <radialGradient id="shield-glow">
            <stop className={styles.glowCore} offset="0" />
            <stop className={styles.glowEdge} offset="1" />
          </radialGradient>
        </defs>
        <circle className={styles.rim} cx={100} cy={100} r={94} />
        <circle className={styles.band} cx={100} cy={100} r={76} />
        <circle className={styles.hairline} cx={100} cy={100} r={58} />
        <circle className={styles.band} cx={100} cy={100} r={40} />
        <g data-flare>
          <circle className={styles.glow} cx={100} cy={100} r={40} fill="url(#shield-glow)" />
          <path className={styles.star} d={star} />
        </g>
      </svg>
      <span className={styles.hit} data-egg="star" />
    </div>
  );
}
