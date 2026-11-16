import { RouteLine } from "./RouteLine";
import { Shield } from "./Shield";
import styles from "./Footer.module.css";

type Place = { en: string; te?: string };

export function Footer({ line, from, to, starLabel }: { line: string; from?: Place; to: Place; starLabel: string }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.mark}>
        <span className={styles.shieldHit} data-egg="shield" />
        <Shield ariaLabel={starLabel} />
      </div>
      <RouteLine from={from} to={to} />
      <p className={styles.line}>{line}</p>
    </footer>
  );
}
