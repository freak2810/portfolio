import { linkText } from "./linkText";
import styles from "./Contact.module.css";

type ContactProps = {
  email: string;
  linkedin: string;
  github: string;
  resumeHref: string;
  resumeLabel: string;
};

export function Contact({ email, linkedin, github, resumeHref, resumeLabel }: ContactProps) {
  return (
    <>
      <ul className={styles.list}>
        <li>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
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
