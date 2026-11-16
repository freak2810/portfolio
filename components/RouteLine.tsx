import type { ReactNode } from "react";
import { TracedArt } from "./TracedArt";
import styles from "./RouteLine.module.css";

type Place = { en: string; te?: string };

function Stop({ place, filled, art }: { place: Place; filled?: boolean; art?: ReactNode }) {
  return (
    <span className={styles.stop}>
      <span className={filled ? styles.dotFilled : styles.dot} aria-hidden="true" />
      <span>
        {place.en}
        {place.te && (
          <>
            <span aria-hidden="true"> · </span>
            <span lang="te" className={styles.te}>
              {place.te}
            </span>
          </>
        )}
      </span>
      {art}
    </span>
  );
}

export function RouteLine({ from, to, large }: { from?: Place; to: Place; large?: boolean }) {
  return (
    <p className={large ? `${styles.route} ${styles.large}` : styles.route}>
      {from && (
        <>
          <Stop place={from} art={
              large && (
                <span className={styles.marker} aria-hidden="true">
                  <TracedArt name="torana" width={720} height={601} lazy />
                </span>
              )
            } />
          <span className="sr-only"> to </span>
          <span className={styles.link} aria-hidden="true" />
        </>
      )}
      <Stop place={to} filled art={
          large && (
            <span className={`${styles.marker} ${styles.narrow}`} aria-hidden="true">
              <TracedArt name="buddha" width={720} height={1028} lazy />
            </span>
          )
        } />
    </p>
  );
}
