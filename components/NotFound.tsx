import { Divider } from "./Divider";
import styles from "./NotFound.module.css";

type NotFoundProps = { title: string; body: string; homeLabel: string; homeHref: string };

export function NotFound({ title, body, homeLabel, homeHref }: NotFoundProps) {
  return (
    <main className={styles.page}>
      <Divider />
      <h1 className={styles.title}>{title}</h1>
      <p>{body}</p>
      <a className="button" href={homeHref}>
        {homeLabel}
      </a>
    </main>
  );
}
