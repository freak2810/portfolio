import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = { id: string; heading: string; children?: ReactNode };

export function Section({ id, heading, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={styles.section}>
      <div className={styles.inner}>
        <h2 id={`${id}-heading`} className={styles.heading} data-reveal="wipe">
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
}
