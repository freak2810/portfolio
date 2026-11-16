import { Divider } from "./Divider";
import { TracedArt } from "./TracedArt";
import styles from "./NotFound.module.css";

type NotFoundProps = { title: string; body: string; homeLabel: string; homeHref: string };

export function NotFound({ title, body, homeLabel, homeHref }: NotFoundProps) {
  return (
    <main className={styles.page}>
      <Divider />
      <div className={styles.art}>
        <TracedArt name="torana" width={720} height={601} lazy />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p>{body}</p>
      <a className="button" href={homeHref}>
        {homeLabel}
      </a>
    </main>
  );
}
