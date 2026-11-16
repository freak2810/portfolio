import { Fragment } from "react";
import { Gateway } from "./Gateway";
import { RoleRotator } from "./RoleRotator";
import { RouteLine } from "./RouteLine";
import { Shield } from "./Shield";
import styles from "./Landing.module.css";

type Place = { en: string; te?: string };

type LandingProps = {
  name: string;
  roles: readonly string[];
  heroLine: string;
  from?: Place;
  to: Place;
  skipLabel: string;
  scrollCue: string;
  scrollCueAria: string;
  heroGraphicAria: string;
};

export function Landing(props: LandingProps) {
  const cueAria = props.scrollCueAria.includes(props.scrollCue) ? props.scrollCueAria : undefined;
  return (
    <section id="home" className={styles.landing}>
      <Gateway />
      <div className={styles.stage}>
        <Shield ariaLabel={props.heroGraphicAria} />
      </div>
      <div className={styles.foot}>
        <h1 className={styles.name}>
          {props.name.split(" ").map((word, i) => (
            <Fragment key={word}>
              {i > 0 && " "}
              <span>{word}</span>
            </Fragment>
          ))}
        </h1>
        <div className={styles.role}>
          <RoleRotator roles={props.roles} />
        </div>
        <div className={styles.side}>
          <p className={styles.hero}>{props.heroLine}</p>
          <RouteLine from={props.from} to={props.to} />
        </div>
      </div>
      <div className={styles.actions}>
        <a className={styles.cue} href="#projects" aria-label={cueAria}>
          <span className={styles.tick} aria-hidden="true" />
          {props.scrollCue}
        </a>
        <a className={styles.skip} href="#experience">
          {props.skipLabel}
        </a>
      </div>
    </section>
  );
}
