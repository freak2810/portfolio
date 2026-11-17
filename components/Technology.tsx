import { TechList, TechTile, TechTiles } from "./TechIcons";
import styles from "./Technology.module.css";
import type { Profile } from "../content/types";

type TechnologyProps = {
  groups: readonly { name: string; items: readonly string[] }[];
  languages: Profile["languages"];
  icons: Readonly<Record<string, string>>;
  labels: { spokenLanguages: string };
};

const LANGUAGE_TILES: Record<Profile["languages"][number]["name"], { glyph: string; lang: string }> = {
  English: { glyph: "A", lang: "en" },
  Hindi: { glyph: "अ", lang: "hi" },
  Telugu: { glyph: "అ", lang: "te" },
};

export function Technology({ groups, languages, icons, labels }: TechnologyProps) {
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
        <dt className={styles.term}>{labels.spokenLanguages}</dt>
        <dd className={styles.items}>
          <TechTiles size="lg" label={labels.spokenLanguages}>
            {languages.map((lang) => (
              <TechTile
                key={lang.name}
                name={lang.name}
                mark={
                  <span className={styles.glyph} lang={LANGUAGE_TILES[lang.name].lang} aria-hidden="true">
                    {LANGUAGE_TILES[lang.name].glyph}
                  </span>
                }
                note={lang.level && <span className={styles.level}>{lang.level}</span>}
              />
            ))}
          </TechTiles>
        </dd>
      </div>
    </dl>
  );
}
