import { HussainSagar } from "./HussainSagar";
import { RouteLine } from "./RouteLine";
import { SHIELD_OUTLINE } from "./shieldGeometry";
import styles from "./Footer.module.css";

type Place = { en: string; te?: string };

export function Footer({ line, from, to }: { line: string; from?: Place; to: Place }) {
  return (
    <footer className={styles.footer}>
      <span className={styles.glyph} data-egg="shield">
        <svg viewBox="0 0 200 240" aria-hidden="true">
          <path d={SHIELD_OUTLINE} />
        </svg>
      </span>
      <HussainSagar />
      <RouteLine from={from} to={to} />
      <p className={styles.line}>{line}</p>
    </footer>
  );
}
