import { withBase } from "../lib/base-path";
import styles from "./Portrait.module.css";

export function Portrait() {
  return (
    <div className={styles.portrait} data-art="portrait">
      <img
        src={withBase("/photo/portrait-640.jpg")}
        srcSet={`${withBase("/photo/portrait-480.jpg")} 480w, ${withBase("/photo/portrait-640.jpg")} 640w`}
        sizes="(min-width: 1280px) 22rem, (min-width: 768px) 20rem, 60vw"
        width={640}
        height={800}
        alt="Aditya Manikanth Rao smiling, turned toward the camera"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
