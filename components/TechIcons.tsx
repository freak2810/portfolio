import type { ReactNode } from "react";
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

type TechTilesProps = { size: TechListProps["size"]; label: string; children: ReactNode };

export function TechTiles({ size, label, children }: TechTilesProps) {
  return (
    <ul className={`${styles.list} ${styles[size]}`} role="list" aria-label={label}>
      {children}
    </ul>
  );
}

type TechTileProps = { mark: ReactNode; name: string; note?: ReactNode };

export function TechTile({ mark, name, note }: TechTileProps) {
  return (
    <li>
      <span className={styles.logo} data-reveal="pop">
        {mark}
        <span className={styles.name}>{name}</span>
        {note}
      </span>
    </li>
  );
}

export function TechList({ names, icons, size, label }: TechListProps) {
  return (
    <TechTiles size={size} label={label}>
      {names.map((name) => {
        const slug = icons[name];
        if (!slug || !(slug in techIconPaths)) {
          return (
            <li key={name} className={styles.chip}>
              {name}
            </li>
          );
        }
        const mark = (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <use href={`#ti-${slug}`} />
          </svg>
        );
        return <TechTile key={name} mark={mark} name={name} />;
      })}
    </TechTiles>
  );
}
