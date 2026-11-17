import { iconViewBoxes, strokeIconSlugs, techIconPaths } from "./techIconPaths";
import type { IconSlug } from "../content/ids";
import styles from "./TechIcons.module.css";

const strokeProps = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function TechIconSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      {Object.entries(techIconPaths).map(([slug, d]) => (
        <symbol key={slug} id={`ti-${slug}`} viewBox={iconViewBoxes[slug as IconSlug] ?? "0 0 24 24"}>
          <path d={d} {...(strokeIconSlugs.has(slug) ? strokeProps : undefined)} />
        </symbol>
      ))}
    </svg>
  );
}

type TechListProps = {
  names: readonly string[];
  icons: Readonly<Record<string, string>>;
  size: "lg" | "sm";
  label: string;
};

export function TechList({ names, icons, size, label }: TechListProps) {
  return (
    <ul className={`${styles.list} ${styles[size]}`} role="list" aria-label={label}>
      {names.map((name) => {
        const slug = icons[name];
        if (!slug || !(slug in techIconPaths)) {
          return (
            <li key={name} className={styles.chip}>
              {name}
            </li>
          );
        }
        return (
          <li key={name}>
            <span className={styles.logo} data-reveal="pop">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <use href={`#ti-${slug}`} />
              </svg>
              <span className={styles.name}>
                {name}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
