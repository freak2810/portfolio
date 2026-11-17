import { Doodles } from "./Doodles";
import styles from "./Footer.module.css";

export function Footer({ line }: { line: string }) {
  return (
    <footer className={styles.footer}>
      <Doodles variant="footer" />
      <p className={styles.line}>{line}</p>
    </footer>
  );
}
