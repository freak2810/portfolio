import { TracedArt } from "./TracedArt";
import styles from "./Portrait.module.css";

export function Portrait() {
  return (
    <div className={styles.portrait} aria-hidden="true">
      <TracedArt name="portrait" layers={["shadow", "mid", "light", "rim"]} width={660} height={800} />
    </div>
  );
}
