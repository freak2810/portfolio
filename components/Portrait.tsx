import { withBase } from "../lib/base-path";
import styles from "./Portrait.module.css";

// Hand-drawn marks on the photo, in the photo's own pixel space (640 x 800). The svg slices the same way the image covers its box, so the marks track the head at every width.
// The crown sits just above the hair and tilts with the head; it never covers the face.
const CROWN = "M-72 -2Q-30 4 4 -1Q40 -5 71 -3M-70 -4L-79 -60L-40 -30L-2 -80L38 -31L79 -62L71 -5M-79 -60m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M-2 -80m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M79 -62m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M-66 -16Q-30 -12 2 -15Q36 -18 68 -17";
const TICKS = ["M418 52v24M406 64h24", "M468 118v14M461 125h14", "M112 162v16M104 170h16"];

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
      <svg className={styles.head} viewBox="0 0 640 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g transform="translate(250 133)">
          <g className={styles.crown}>
            <path d={CROWN} transform="rotate(-14) scale(1.12)" />
          </g>
        </g>
        {TICKS.map((d) => (
          <path key={d} className={styles.tick} d={d} />
        ))}
      </svg>
    </div>
  );
}
