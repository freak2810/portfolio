import { linkText } from "./linkText";
import styles from "./Projects.module.css";

type Plate = {
  id: string;
  title: string;
  headline: string;
  points: readonly { text: string }[];
  tech: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
};

const cusp = "M0 14 H34 C40 14 42 12 45 8 L50 1 L55 8 C58 12 60 14 66 14 H100";

export function Projects({ projects }: { projects: readonly Plate[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <article
          key={project.id}
          className={index === 0 ? `${styles.plate} ${styles.lead}` : styles.plate}
          data-project={project.id}
          data-reveal="rise"
        >
          <svg className={styles.edge} viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
            <path d={cusp} pathLength={1} />
          </svg>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.headline}>{project.headline}</p>
          {project.points.length > 0 && (
            <ul className={styles.points}>
              {project.points.map((point) => (
                <li key={point.text}>{point.text}</li>
              ))}
            </ul>
          )}
          <p className={styles.tech}>{project.tech.join(" · ")}</p>
          {(project.repoUrl || project.liveUrl) && (
            <p className={styles.links}>
              {project.repoUrl && <a href={project.repoUrl}>{linkText(project.repoUrl)}</a>}
              {project.liveUrl && <a href={project.liveUrl}>{linkText(project.liveUrl)}</a>}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
