import { yearRange } from "./dateRange";
import styles from "./Education.module.css";

type Entry = {
  id: string;
  school: string;
  degree: string;
  start: number;
  end: number | "present";
  detail?: string;
};

type Certification = { id: string; name: string; issuer?: string; year?: number; url?: string };

type EducationProps = {
  entries: readonly Entry[];
  majorProject?: { title: string; summary: string; tech: readonly string[] };
  certifications: readonly Certification[];
};

const CERT_LABEL = "Certifications";
const MAJOR_LABEL = "Major project";

export function Education({ entries, majorProject, certifications }: EducationProps) {
  return (
    <>
      <ul className={styles.entries}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles.entry} data-reveal>
            <p className={styles.dates}>{yearRange(entry.start, entry.end)}</p>
            <div>
              <h3 className={styles.school}>{entry.school}</h3>
              <p>{entry.degree}</p>
              {entry.detail && <p className={styles.muted}>{entry.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
      {majorProject && (
        <div className={styles.block} data-reveal>
          <h3 className={styles.school}>
            {MAJOR_LABEL}: {majorProject.title}
          </h3>
          <p>{majorProject.summary}</p>
          <p className={`${styles.muted} ${styles.tech}`}>{majorProject.tech.join(" · ")}</p>
        </div>
      )}
      <div className={styles.block} data-reveal>
        <p id="education-certifications" className={styles.listHead}>
          {CERT_LABEL}
        </p>
        <ul className={styles.certs} aria-labelledby="education-certifications">
          {certifications.map((cert) => {
            const detail = [cert.issuer, cert.year].filter(Boolean).join(", ");
            return (
              <li key={cert.id}>
                {cert.url ? <a href={cert.url}>{cert.name}</a> : cert.name}
                {detail && <span className={styles.muted}>{` (${detail})`}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
