import { Shield } from "./Shield";
import styles from "./Footer.module.css";

export function Footer({ line, starLabel }: { line: string; starLabel: string }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.mark}>
        <span className={styles.shieldHit} data-egg="shield" />
        <Shield ariaLabel={starLabel} />
      </div>
      <p className={styles.line}>{line}</p>
      <p className={styles.attribution}>
        Art traced from Wikimedia Commons photos: Kakatiya thoranam by Ms Sarah Welch (CC0); Buddha statue by iMahesh (CC
        BY-SA 4.0).
      </p>
    </footer>
  );
}
