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
  stat?: { value: string; label: string };
};

export function Projects({ projects }: { projects: readonly Plate[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => {
        const link = project.repoUrl ?? project.liveUrl;
        return (
          <article key={project.id} className={styles.plate} data-project={project.id} data-reveal="rise">
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.headline}>{project.headline}</p>
            {index === 0 && project.stat && (
              <p className={styles.stat}>
                <span className={styles.figure}>{project.stat.value}</span>
                <span className={styles.figureLabel}>{project.stat.label}</span>
              </p>
            )}
            {project.points.length > 0 && (
              <ul className={styles.points}>
                {project.points.slice(0, 3).map((point) => (
                  <li key={point.text}>{point.text}</li>
                ))}
              </ul>
            )}
            <p className={styles.tech}>{project.tech.join(" · ")}</p>
            {link && (
              <p className={styles.links}>
                <a href={link}>{linkText(link)}</a>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
