import { Doodles } from "./Doodles";
import { Portrait } from "./Portrait";
import styles from "./Contact.module.css";

type About = {
  paragraphs: readonly string[];
  closing: { before: string; link: string; after: string };
};

export function Contact({ about }: { about: About }) {
  return (
    <div className={styles.root}>
      <Doodles />
      <div className={styles.story}>
        <div className={styles.figure}>
          <Portrait />
          <Doodles variant="portrait" />
        </div>
        <div className={styles.text}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} data-reveal="rise">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <p className={styles.closing} data-reveal="rise">
        {about.closing.before}
        <a className={styles.closingLink} href="#home">
          {about.closing.link}
        </a>
        {about.closing.after}
      </p>
    </div>
  );
}
