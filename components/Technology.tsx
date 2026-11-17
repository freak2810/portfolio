import { TechList } from "./TechIcons";
import tech from "./TechIcons.module.css";
import styles from "./Technology.module.css";
import type { Profile } from "../content/types";

type TechnologyProps = {
  groups: readonly { name: string; items: readonly string[] }[];
  languages: Profile["languages"];
  icons: Readonly<Record<string, string>>;
};

const LANGUAGES_LABEL = "Spoken languages";
const LANGUAGE_TILES: Record<Profile["languages"][number]["name"], { glyph: string; lang: string }> = {
  English: { glyph: "A", lang: "en" },
  Hindi: { glyph: "अ", lang: "hi" },
  Telugu: { glyph: "అ", lang: "te" },
};

export function Technology({ groups, languages, icons }: TechnologyProps) {
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
        <dd className={styles.items}>
          <ul className={`${tech.list} ${tech.lg}`} role="list" aria-label={LANGUAGES_LABEL}>
            {languages.map((lang) => (
              <li key={lang.name}>
                <span className={tech.logo} data-reveal="pop">
                  <span className={styles.glyph} lang={LANGUAGE_TILES[lang.name].lang} aria-hidden="true">
                    {LANGUAGE_TILES[lang.name].glyph}
                  </span>
                  <span className={tech.name}>{lang.name}</span>
                  {lang.level && <span className={styles.level}>{lang.level}</span>}
                </span>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
