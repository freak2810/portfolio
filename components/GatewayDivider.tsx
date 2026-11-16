import { TracedArt } from "./TracedArt";
import styles from "./GatewayDivider.module.css";

export function GatewayDivider({ art }: { art?: boolean }) {
  return (
    <div className={art ? `${styles.divider} ${styles.tall}` : styles.divider} data-divider aria-hidden="true">
      <svg className={styles.rule} viewBox="0 0 100 96" preserveAspectRatio="none">
        <line className={styles.line} x1={100} y1={88} x2={0} y2={88} pathLength={1} data-draw="rules" />
      </svg>
      {art && (
        <TracedArt
          name="torana"
          layers={["dark", "stone", "red"]}
          width={720}
          height={602}
          className={styles.art}
        />
      )}
      <svg className={styles.rule} viewBox="0 0 100 96" preserveAspectRatio="none">
        <line className={styles.line} x1={0} y1={88} x2={100} y2={88} pathLength={1} data-draw="rules" />
      </svg>
    </div>
  );
}
