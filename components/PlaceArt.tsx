import styles from "./PlaceArt.module.css";

const svgProps = {
  className: styles.art,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function Thoranam({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className ? `${styles.art} ${className}` : styles.art}>
      <path d="M16 9V6h4v3M28 9V6h4v3" />
      <path d="M10 14V9h28v5" />
      <path d="M6 14v4h36v-4z" />
      <path d="M10 18v24h6V18M32 18v24h6V18" />
      <path d="M16 18.5q8 6 16 0" />
      <path d="M20 22v2.5M24 23.5v3M28 22v2.5" />
      <path d="M7 42h34" />
    </svg>
  );
}

export function BuddhaStatue({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className ? `${styles.art} ${className}` : styles.art}>
      <path d="M21 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0M24 4V3" />
      <path d="M21 10l-2 4-1 14h12l-1-14-2-4M24 14v14" />
      <path d="M18.5 14.5L15.5 12V9" />
      <path d="M17 28h14v3M14 31h20" />
      <path d="M12 31v7h24v-7M12 34.5h24" />
      <path d="M3 42c3-2 5-2 8 0s5 2 8 0 5-2 8 0 5 2 8 0 5-2 8 0" />
      <path d="M10 45.5c3-1.5 5-1.5 8 0s5 1.5 8 0" />
    </svg>
  );
}
