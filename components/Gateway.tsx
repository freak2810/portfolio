import { TracedArt } from "./TracedArt";
import styles from "./Gateway.module.css";

export function Gateway() {
  return (
    <div className={styles.gateway} aria-hidden="true">
      <TracedArt
        name="torana"
        layers={["dark", "stone", "red"]}
        width={720}
        height={602}
        reveal="load"
        className={styles.torana}
      />
    </div>
  );
}
