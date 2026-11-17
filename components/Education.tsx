import { yearRange } from "./dateRange";
import { TechList } from "./TechIcons";
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
  icons: Readonly<Record<string, string>>;
  labels: { technologies: string; newTab: string; certifications: string; majorProject: string };
};

export function Education({ entries, majorProject, certifications, icons, labels }: EducationProps) {
  return (
    <>
      <ul className={styles.entries}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles.entry}>
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
        <div className={styles.block}>
          <h3 className={styles.school}>
            {labels.majorProject}: {majorProject.title}
          </h3>
          <p>{majorProject.summary}</p>
          <div className={styles.tech}>
            <TechList names={majorProject.tech} icons={icons} size="sm" label={labels.technologies} />
          </div>
        </div>
      )}
      <div className={styles.block}>
        <p id="education-certifications" className={styles.listHead}>
          {labels.certifications}
        </p>
        <ul className={styles.certs} aria-labelledby="education-certifications">
          {certifications.map((cert) => {
            const detail = [cert.issuer, cert.year].filter(Boolean).join(", ");
            return (
              <li key={cert.id}>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {cert.name}
                    <span className="sr-only"> {labels.newTab}</span>
                  </a>
                ) : (
                  cert.name
                )}
                {detail && <span className={styles.muted}>{` (${detail})`}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
