import { Doodles } from "./Doodles";
import { RouteLine } from "./RouteLine";
import styles from "./Contact.module.css";

type Place = { en: string; te?: string };

type About = {
  paragraphs: readonly string[];
  onRepeatLabel: string;
  onRepeat: readonly { title: string; artist: string }[];
  closing: { before: string; link: string; after: string };
};

type ContactProps = {
  about: About;
  from?: Place;
  to: Place;
};

export function Contact({ about, from, to }: ContactProps) {
  return (
    <div className={styles.root}>
      <Doodles />
      <div className={styles.story}>
        <div className={styles.route} data-reveal>
          <RouteLine from={from} to={to} large />
        </div>
        <div className={styles.text} data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3 className={styles.label}>{about.onRepeatLabel}</h3>
          <ul className={styles.songs}>
            {about.onRepeat.map((song) => (
              <li key={song.title}>
                {song.title}
                <span className={styles.artist}>, {song.artist}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.closing} data-reveal>
        {about.closing.before}
        <a className={styles.closingLink} href="#home">
          {about.closing.link}
        </a>
        {about.closing.after}
      </p>
    </div>
  );
}
