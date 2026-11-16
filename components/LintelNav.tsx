import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./LintelNav.module.css";

type NavItem = { id: string; label: string };

type LintelNavProps = {
  name: string;
  homeLabel: string;
  navLabel: string;
  items: readonly NavItem[];
  resumeHref: string;
  resumeLabel: string;
  themeLabels: { toLight: string; toDark: string };
};

const MENU_LABEL = "Menu";

function NavLinks({ items }: { items: readonly NavItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a className={styles.link} href={`#${item.id}`}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LintelNav(props: LintelNavProps) {
  const initials = props.name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <header className={`lintel ${styles.bar}`}>
      <nav className={styles.nav} aria-label={props.navLabel}>
        <a className={styles.mark} href="#home">
          {initials}
          <span className="sr-only">
            {" "}
            {props.name} {props.homeLabel}
          </span>
        </a>
        <div className={styles.links}>
          <NavLinks items={props.items} />
        </div>
        <div className={styles.menu}>
          <NavMenu label={MENU_LABEL}>
            <NavLinks items={props.items} />
          </NavMenu>
        </div>
        <a className="button" href={props.resumeHref}>
          {props.resumeLabel}
        </a>
        <ThemeToggle {...props.themeLabels} />
      </nav>
    </header>
  );
}
