import type { ReactNode } from "react";
import { TechList } from "./TechIcons";
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

type Labels = { technologies: string; newTab: string; website: string; onGitHub: string };

// Globe: Material Design Icons "web" (Apache-2.0), 24 by 24 fill. GitHub: the Simple Icons (CC0) symbol from the page sprite (TechIconSprite, id ti-github).
const globePath =
  "M16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14M14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56M14.34 14H9.66C9.56 13.34 9.5 12.68 9.5 12C9.5 11.32 9.56 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14M12 19.96C11.17 18.76 10.5 17.43 10.09 16H13.91C13.5 17.43 12.83 18.76 12 19.96M8 8H5.08C6.03 6.34 7.57 5.06 9.4 4.44C8.8 5.55 8.35 6.75 8 8M5.08 16H8C8.35 17.25 8.8 18.45 9.4 19.56C7.57 18.93 6.03 17.65 5.08 16M4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14M12 4.03C12.83 5.23 13.5 6.57 13.91 8H10.09C10.5 6.57 11.17 5.23 12 4.03M18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.34 18.92 8M12 2C6.47 2 2 6.5 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z";

function IconLink({ href, label, newTab, children }: { href: string; label: string; newTab: string; children: ReactNode }) {
  return (
    <a className={styles.iconLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} ${newTab}`} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {children}
      </svg>
    </a>
  );
}

export function Projects({ projects, icons, labels }: { projects: readonly Plate[]; icons: Readonly<Record<string, string>>; labels: Labels }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => {
        return (
          <article key={project.id} className={styles.plate} data-reveal="rise">
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
            <div className={styles.foot}>
              <div className={styles.tech}>
                <TechList names={project.tech} icons={icons} size="sm" label={labels.technologies} />
              </div>
              {(project.liveUrl || project.repoUrl) && (
                <div className={styles.links}>
                  {project.liveUrl && (
                    <IconLink href={project.liveUrl} label={`${project.title} ${labels.website}`} newTab={labels.newTab}>
                      <path d={globePath} />
                    </IconLink>
                  )}
                  {project.repoUrl && (
                    <IconLink href={project.repoUrl} label={`${project.title} ${labels.onGitHub}`} newTab={labels.newTab}>
                      <use href="#ti-github" />
                    </IconLink>
                  )}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
