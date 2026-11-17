import { monthRange } from "./dateRange";
import { TechList } from "./TechIcons";
import styles from "./Experience.module.css";

type Entry = {
  id: string;
  company: string;
  about?: string;
  location: string;
  roles: readonly { title: string; start: string; end: string }[];
  bullets: readonly { text: string }[];
  tech: readonly string[];
};

type ExperienceProps = {
  summary: string;
  entries: readonly Entry[];
  icons: Readonly<Record<string, string>>;
  labels: { technologies: string };
};

export function Experience({ summary, entries, icons, labels }: ExperienceProps) {
  return (
    <>
      <p className={styles.lede}>{summary}</p>
      <div className={styles.timeline}>
        {entries.map((entry) => (
          <article key={entry.id} className={styles.entry}>
            <div className={styles.meta}>
              <h3 className={styles.company}>{entry.company}</h3>
              {entry.roles.map((role) => (
                <p key={role.start} className={styles.role}>
                  {role.title}
                  <span className={styles.dates}>{monthRange(role.start, role.end)}</span>
                </p>
              ))}
              {entry.about && <p className={styles.about}>{entry.about}</p>}
              <p className={styles.about}>{entry.location}</p>
            </div>
            <div className={styles.body}>
              <ul className={styles.bullets}>
                {entry.bullets.map((bullet) => (
                  <li key={bullet.text}>{bullet.text}</li>
                ))}
              </ul>
              {entry.tech.length > 0 && (
                <div className={styles.tech}>
                  <TechList names={entry.tech} icons={icons} size="sm" label={labels.technologies} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
