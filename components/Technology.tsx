import { TechList } from "./TechIcons";
import styles from "./Technology.module.css";

type TechnologyProps = {
  groups: readonly { name: string; items: readonly string[] }[];
  languages: readonly { name: string; level?: string }[];
  icons: Readonly<Record<string, string>>;
};

const LANGUAGES_LABEL = "Spoken languages";

export function Technology({ groups, languages, icons }: TechnologyProps) {
  const spoken = languages.map((lang) => (lang.level ? `${lang.name} (${lang.level})` : lang.name));
  return (
    <dl className={styles.list}>
      {groups.map((group) => (
        <div key={group.name} className={styles.row}>
          <dt className={styles.term}>{group.name}</dt>
          <dd className={styles.items}>
            <TechList names={group.items} icons={icons} size="lg" label={group.name} />
          </dd>
        </div>
      ))}
      <div className={styles.row}>
        <dt className={styles.term}>{LANGUAGES_LABEL}</dt>
        <dd className={styles.items}>{spoken.join(" · ")}</dd>
      </div>
    </dl>
  );
}
