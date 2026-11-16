import { linkText } from "./linkText";
import { RouteLine } from "./RouteLine";
import styles from "./Contact.module.css";

type Place = { en: string; te?: string };

type About = {
  paragraphs: readonly string[];
  onRepeatLabel: string;
  onRepeat: readonly { title: string; artist: string }[];
  closing: string;
};

type ContactProps = {
  about: About;
  from?: Place;
  to: Place;
  linkedin: string;
  github: string;
  resumeHref: string;
  resumeLabel: string;
};

export function Contact({ about, from, to, linkedin, github, resumeHref, resumeLabel }: ContactProps) {
  return (
    <>
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
        {about.closing}
      </p>
      <ul className={styles.list} data-reveal>
        <li>
          <a href={linkedin}>{linkText(linkedin)}</a>
        </li>
        <li>
          <a href={github}>{linkText(github)}</a>
        </li>
      </ul>
      <a className={`button ${styles.resume}`} href={resumeHref}>
        {resumeLabel}
      </a>
    </>
  );
}
