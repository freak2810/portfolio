import { HussainSagar } from "./HussainSagar";
import { RouteLine } from "./RouteLine";
import styles from "./Footer.module.css";

type Place = { en: string; te?: string };

export function Footer({ line, from, to }: { line: string; from?: Place; to: Place }) {
  return (
    <footer className={styles.footer}>
      <HussainSagar />
      <RouteLine from={from} to={to} />
      <p className={styles.line}>{line}</p>
    </footer>
  );
}
