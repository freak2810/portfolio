import { Divider } from "./Divider";
import { withBase } from "../lib/base-path";
import styles from "./NotFound.module.css";

type NotFoundProps = { title: string; body: string; homeLabel: string; homeHref: string };

export function NotFound({ title, body, homeLabel, homeHref }: NotFoundProps) {
  return (
    <main className={styles.page}>
      <Divider />
      <div className={styles.art}>
        <span data-art="torana" style={{ display: "block", aspectRatio: "720 / 601" }}>
          <img src={withBase("/art/torana.svg")} width={720} height={601} alt="" loading="lazy" decoding="async" />
        </span>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p>{body}</p>
      <a className="button" href={homeHref}>
        {homeLabel}
      </a>
      <p className={styles.credit}>Art traced from a Wikimedia Commons photo: Kakatiya thoranam by Ms Sarah Welch (CC0).</p>
    </main>
  );
}
