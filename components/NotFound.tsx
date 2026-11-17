import { Divider } from "./Divider";
import { TracedArt } from "./TracedArt";
import styles from "./NotFound.module.css";

type NotFoundProps = { title: string; body: string; homeLabel: string; homeHref: string };

export function NotFound({ title, body, homeLabel, homeHref }: NotFoundProps) {
  return (
    <main className={styles.page}>
      <Divider />
      <div className={styles.art}>
        <TracedArt name="torana" width={720} height={601} />
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
