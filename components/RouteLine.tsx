import styles from "./RouteLine.module.css";

type Place = { en: string; te?: string };

function Stop({ place, filled }: { place: Place; filled?: boolean }) {
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
    </span>
  );
}

export function RouteLine({ from, to }: { from?: Place; to: Place }) {
  return (
    <p className={styles.route}>
      {from && (
        <>
          <Stop place={from} />
          <span className="sr-only"> to </span>
          <span className={styles.link} aria-hidden="true" />
        </>
      )}
      <Stop place={to} filled />
    </p>
  );
}
