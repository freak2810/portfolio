import styles from "./RoleRotator.module.css";

export function RoleRotator({ roles }: { roles: readonly string[] }) {
  return (
    <p className={styles.rotator} data-count={roles.length}>
      <span className="sr-only">{roles[0]}</span>
      <span className={styles.items} aria-hidden="true">
        {roles.map((role) => (
          <span key={role} className={styles.item}>
            {role}
          </span>
        ))}
      </span>
    </p>
  );
}
