import styles from "./GatewayDivider.module.css";

const pillars =
  "M70 32 V76 M62 76 H78 M58 82 H82 M0 88 H86 M290 32 V76 M282 76 H298 M278 82 H302 M274 88 H360 M70 54 A22 22 0 0 1 92 32 M290 54 A22 22 0 0 0 268 32";
const lintel = "M70 32 H290";
const arch =
  "M110 32 C108 18 134 12 146 24 C150 14 166 10 180 6 C194 10 210 14 214 24 C226 12 252 18 250 32";

export function GatewayDivider() {
  return (
    <div className={styles.divider} data-divider aria-hidden="true">
      <svg className={styles.rule} viewBox="0 0 100 96" preserveAspectRatio="none">
        <line className={styles.line} x1={100} y1={88} x2={0} y2={88} pathLength={1} data-draw="rules" />
      </svg>
      <svg className={styles.motif} viewBox="0 0 360 96" preserveAspectRatio="xMidYMax meet">
        <path className={styles.line} d={pillars} pathLength={1} data-draw="motif" />
        <path className={styles.line} d={lintel} pathLength={1} data-draw="motif" />
        <path className={styles.line} d={arch} pathLength={1} data-draw="motif" />
      </svg>
      <svg className={styles.rule} viewBox="0 0 100 96" preserveAspectRatio="none">
        <line className={styles.line} x1={0} y1={88} x2={100} y2={88} pathLength={1} data-draw="rules" />
      </svg>
    </div>
  );
}
