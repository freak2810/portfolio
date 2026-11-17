import { Doodles } from "./Doodles";
import styles from "./Footer.module.css";

export function Footer({ line }: { line: string }) {
  return (
    <footer className={styles.footer}>
      <Doodles variant="footer" />
      <p className={styles.line}>{line}</p>
      <p className={styles.attribution}>
        Art traced from a Wikimedia Commons photo: Kakatiya thoranam by Ms Sarah Welch (CC0).
      </p>
    </footer>
  );
}
