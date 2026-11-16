import { Fragment } from "react";
import { Portrait } from "./Portrait";
import { RoleRotator } from "./RoleRotator";
import styles from "./Landing.module.css";

type LandingProps = {
  name: string;
  title: string;
  descriptors: readonly string[];
  contactLabel: string;
  scrollCue: string;
  scrollCueAria: string;
  pauseLabel: string;
  playLabel: string;
};

export function Landing(props: LandingProps) {
  const cueAria = props.scrollCueAria.includes(props.scrollCue) ? props.scrollCueAria : undefined;
  return (
    <section id="home" className={styles.landing}>
      <div className={styles.text}>
        <h1 className={styles.name}>
          {props.name.split(" ").map((word, i) => (
            <Fragment key={word}>
              {i > 0 && " "}
              <span>{word}</span>
            </Fragment>
          ))}
        </h1>
        <p className={styles.title}>{props.title}</p>
        <div className={styles.descriptor}>
          <RoleRotator items={props.descriptors} pauseLabel={props.pauseLabel} playLabel={props.playLabel} />
        </div>
        <a className={`button ${styles.contact}`} href="#contact">
          {props.contactLabel}
        </a>
        <a className={styles.cue} href="#projects" aria-label={cueAria}>
          <span className={styles.tick} aria-hidden="true" />
          {props.scrollCue}
        </a>
      </div>
      <Portrait />
    </section>
  );
}
