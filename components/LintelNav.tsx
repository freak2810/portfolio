import { NavMenu } from "./NavMenu";
import { NavSpy } from "./NavSpy";
import { teluguAPath, teluguAViewBox } from "./teluguA";
import styles from "./LintelNav.module.css";

type NavItem = { id: string; label: string };

type LintelNavProps = {
  name: string;
  homeLabel: string;
  navLabel: string;
  menuLabel: string;
  items: readonly NavItem[];
};

const HOME_ID = "home";

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
  return (
    <header className={`lintel ${styles.bar}`}>
      <nav className={styles.nav} aria-label={props.navLabel}>
        <a className={styles.mark} href={`#${HOME_ID}`}>
          <svg className={styles.glyph} viewBox={teluguAViewBox} aria-hidden="true" focusable="false">
            <path d={teluguAPath} />
          </svg>
          <span className="sr-only">
            {" "}
            {props.name} {props.homeLabel}
          </span>
        </a>
        <div className={styles.links}>
          <NavLinks items={props.items} />
        </div>
        <div className={styles.menu}>
          <NavMenu label={props.menuLabel}>
            <NavLinks items={props.items} />
          </NavMenu>
        </div>
      </nav>
      <NavSpy ids={[HOME_ID, ...props.items.map((item) => item.id)]} />
    </header>
  );
}
