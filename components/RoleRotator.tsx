import styles from "./RoleRotator.module.css";

export function RoleRotator({ items }: { items: readonly string[] }) {
  return (
    <p className={styles.rotator} data-count={items.length}>
      <span className="sr-only">{items[0]}</span>
      <span className={styles.items} aria-hidden="true">
        {items.map((item) => (
          <span key={item} className={styles.item}>
            {item}
          </span>
        ))}
      </span>
    </p>
  );
}
