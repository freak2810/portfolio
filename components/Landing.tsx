import { Fragment } from "react";
import { MotionToggle, type MotionToggleProps } from "./MotionToggle";
import { Muggu } from "./Muggu";
import { RoleRotator } from "./RoleRotator";
import { SocialLinks, type SocialLinksProps } from "./SocialIcons";
import styles from "./Landing.module.css";

type LandingProps = {
  name: string;
  title: string;
  descriptors: readonly string[];
  social: SocialLinksProps;
  motion: MotionToggleProps["labels"];
};

export function Landing(props: LandingProps) {
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
        <div className={styles.details}>
          <Muggu />
          <p className={styles.title}>{props.title}</p>
          <div className={styles.descriptor}>
            <RoleRotator items={props.descriptors} />
          </div>
          <div className={styles.actions}>
            <SocialLinks {...props.social} />
            <MotionToggle labels={props.motion} />
          </div>
        </div>
      </div>
    </section>
  );
}
