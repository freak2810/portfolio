import styles from "./Technology.module.css";

type TechnologyProps = {
  groups: readonly { name: string; items: readonly string[] }[];
  languages: readonly { name: string; level?: string }[];
};

const LANGUAGES_LABEL = "Languages";

export function Technology({ groups, languages }: TechnologyProps) {
  const spoken = languages.map((lang) => (lang.level ? `${lang.name} (${lang.level})` : lang.name));
  return (
    <dl className={styles.list} data-reveal>
      {groups.map((group) => (
        <div key={group.name} className={styles.row}>
          <dt className={styles.term}>{group.name}</dt>
          <dd className={styles.items}>{group.items.join(" · ")}</dd>
        </div>
      ))}
      <div className={styles.row}>
        <dt className={styles.term}>{LANGUAGES_LABEL}</dt>
        <dd className={styles.items}>{spoken.join(" · ")}</dd>
      </div>
    </dl>
  );
}
