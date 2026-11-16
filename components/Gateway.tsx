import styles from "./Gateway.module.css";

const arch =
  "M20 400 V210 A78 78 0 0 1 130 125 C140 70 205 25 260 0 C315 25 380 70 390 125 A78 78 0 0 1 500 210 V400";

const plinths =
  "M12 384 H28 M8 392 H32 M4 400 H36 M492 384 H508 M488 392 H512 M484 400 H516";

function Pillar({ side }: { side: "left" | "right" }) {
  return (
    <svg className={`${styles.pillar} ${styles[side]}`} width={40} height="100%">
      <path className={styles.line} d="M20 0 V10000" pathLength={1} />
      <svg y="100%" overflow="visible">
        <path className={styles.line} d="M8 -30 H32 M4 -20 H36 M0 -10 H40" pathLength={1} />
      </svg>
    </svg>
  );
}

export function Gateway() {
  return (
    <div className={styles.gateway} aria-hidden="true">
      <Pillar side="left" />
      <Pillar side="right" />
      <svg className={styles.arch} viewBox="0 0 520 400">
        <path className={styles.line} d={arch} pathLength={1} />
        <path className={styles.line} d={plinths} pathLength={1} />
        <path
          className={styles.line}
          d={arch}
          pathLength={1}
          transform="translate(260 400) scale(0.9) translate(-260 -400)"
        />
      </svg>
    </div>
  );
}
