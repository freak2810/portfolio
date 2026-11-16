import { techIconPaths } from "./techIconPaths";
import styles from "./SocialIcons.module.css";

// GitHub: Simple Icons (CC0), shared with the technology icons. LinkedIn: Material Design Icons 7.4.47 (Apache-2.0), 24 by 24 fill.
// Resume: Lucide 1.73.0 file-down (ISC), elements merged into one path, stroke on 24 by 24.
const linkedinPath =
  "M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z";
const resumePath =
  "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2zM14 2v5a1 1 0 0 0 1 1h5M12 18v-6M9 15l3 3 3-3";

export type SocialLinksProps = {
  github: string;
  linkedin: string;
  resumeHref: string;
  labels: { github: string; linkedin: string; resume: string };
};

function Icon({ d, stroke }: { d: string; stroke?: boolean }) {
  return (
    <svg className={stroke ? `${styles.icon} ${styles.stroke}` : styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

export function SocialLinks({ github, linkedin, resumeHref, labels }: SocialLinksProps) {
  return (
    <>
      <a className={styles.link} href={linkedin} aria-label={labels.linkedin} title={labels.linkedin}>
        <Icon d={linkedinPath} />
      </a>
      <a className={styles.link} href={github} aria-label={labels.github} title={labels.github}>
        <Icon d={techIconPaths.github} />
      </a>
      <a className={styles.link} href={resumeHref} download aria-label={labels.resume} title={labels.resume}>
        <Icon d={resumePath} stroke />
      </a>
    </>
  );
}
