import styles from "./Doodles.module.css";

// Line icons on a 24 by 24 box. guitar, headphones and pizza start from Lucide 1.73.0
// (ISC), elements merged into one path, ellipses and relative starts rewritten. ma is the outline
// of Noto Sans Telugu (SIL OFL 1.1). nios is traced from "Hyundai AI3 Grand i10.jpg" (Bull-Doser, public
// domain) and pom from "Pomeranian Gerry.jpg" (Zikmund105, CC0), both Wikimedia Commons; the badge,
// plate and lettering are left out and the lower ruff of pom is extended past the photo edge. The rest are
// original shapes; Wikimedia Commons CC0 and public domain photos were reference only.
const n = (v: number) => +v.toFixed(1);
const ring = (x: number, y: number, rx: number, ry = rx) => `M${n(x - rx)} ${y}a${rx} ${ry} 0 1 0 ${n(2 * rx)} 0a${rx} ${ry} 0 1 0 ${n(-2 * rx)} 0Z`;
// orbit: ellipse through (12,12) with its long axis turned by deg
const orbit = (deg: number) => {
  const t = (deg * Math.PI) / 180, a = [n(12 + 10.5 * Math.cos(t)), n(12 + 10.5 * Math.sin(t))], b = [n(12 - 10.5 * Math.cos(t)), n(12 - 10.5 * Math.sin(t))];
  return `M${a}A10.5 4 ${deg} 1 0 ${b}A10.5 4 ${deg} 1 0 ${a}Z`;
};
// short ticks across a segment, k of them, each 2h long
const ticks = (x0: number, y0: number, x1: number, y1: number, k: number, h: number) => {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy), px = (-dy / l) * h, py = (dx / l) * h;
  return Array.from({ length: k }, (_, i) => { const f = (i + 1) / (k + 1), x = x0 + dx * f, y = y0 + dy * f; return `M${n(x - px)} ${n(y - py)}L${n(x + px)} ${n(y + py)}`; }).join("");
};

// fluffy edge: one outward arc between each pair of points (sweep 1 for a clockwise walk, 0 for counter-clockwise)
const tufts = (p: number[][], sweep: 0 | 1) => p.slice(1).map(([x, y], i) => { const r = n(Math.hypot(x - p[i][0], y - p[i][1]) * 0.6); return `A${r} ${r} 0 0 ${sweep} ${n(x)} ${n(y)}`; }).join("");
const onCircle = (cx: number, cy: number, r: number, deg: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const paths = {
  shield: ring(12, 12, 10.5) + ring(12, 12, 8) + ring(12, 12, 5.4) + "M12 7.8L13.1 10.6L16 10.8L13.8 12.7L14.5 15.5L12 14L9.5 15.5L10.2 12.7L8 10.8L10.9 10.6Z" + "M12 1.5v1.4M12 21.1v1.4M1.5 12h1.4M21.1 12h1.4",
  helmet: "M4.5 14V10a7.5 7.5 0 0 1 15 0v4l-2 5-2.5 2.5h-6L6.5 19ZM12 2.5v4M6.5 9.5c3.5-1.5 7.5-1.5 11 0M7.5 12.2l3.2 1.1M16.5 12.2l-3.2 1.1M12 10.5v6M7 15c.2 1.8 1 3 2 3.8M17 15c-.2 1.8-1 3-2 3.8M10 20.2h4M4.5 11.5H3M19.5 11.5H21M8 22.5c2.5.8 5.5.8 8 0",
  guitar: "M11.9 12.1l4.514-4.514M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4zM6 16l2 2M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" + ring(9.2, 14.2, 1.7) + ticks(12, 12, 16.4, 7.6, 3, 0.9) + "M16.3 2.8l1 1M20.8 7.2l1 1M18.6 1.4l.8.8",
  tabla: ring(7, 8.5, 5.4, 2) + ring(7, 8.5, 2.2, 0.8) + "M1.6 8.5c0 6 1.4 11.5 3.2 13h4.4c1.8-1.5 3.2-7 3.2-13M2.2 13l1.6 2.4 1.6-2.4 1.6 2.4 1.6-2.4 1.6 2.4 1.6-2.4M3 17l1.4 2 1.5-2 1.5 2 1.5-2 1.5 2" + ring(18.3, 10.5, 3.6, 1.3) + ring(18.3, 10.5, 1.4, 0.5) + "M14.7 10.5l.9 9h5.4l.9-9M15.1 14.2l1.2 1.6 1.3-1.6 1.3 1.6 1.3-1.6 1.2 1.6",
  veena: ring(6.8, 17.2, 4.9) + ring(6.8, 17.2, 1.7) + "M10.4 13.8L19 5.2M12 15.4L20.6 6.8"  + ticks(11.2, 14.6, 19.8, 6, 5, 1) + ring(14.6, 9, 2.1) + "M19 5.2c1-2 3.4-1.8 3.4.3S20.6 7.6 20.6 6.8" + "M22.2 3.8l1 1M20.5 2.5l.5 1.3",
  piano: "M2 6.5h20v12H2ZM3.5 3.5h17v3M10.6 6.5v12M4.9 13.5v5M7.7 13.5v5M13.4 13.5v5M16.3 13.5v5M19.1 13.5v5M4.1 6.5v7h1.6v-7M6.9 6.5v7h1.6v-7M12.6 6.5v7h1.6v-7M15.5 6.5v7h1.6v-7M18.3 6.5v7h1.6v-7",
  horn: ring(10, 14, 7.5) + ring(10, 14, 4.8) + "M17 11.5C19 9.5 20 7.5 20.5 5M17.2 17C20 15 22 11 22.8 8M20.5 5a1.2 3.5 35 0 1 2.3 3M10 6.5V3.5H8M8 3.5V2M12.2 6.7V3M14.3 7.3V4.3",
  chai: "M7 8h8l-.9 9H7.9ZM7.4 10.8h7.2M6.2 13.5h9.6V19H6.2ZM15.8 14.2h2.3a2 2 0 0 1 0 4h-2.3M3.5 21.5h15M5 21.5c.5 1.2 2 1.8 6 1.8s5.5-.6 6-1.8M8.5 2c-1 1.3 1 2.2 0 3.5M11 1.5c-1 1.5 1 2.5 0 4M13.5 2c-1 1.3 1 2.2 0 3.5",
  laptop: "M6 2.5h12v10H6ZM7.5 5h3M8.5 7h5M7.5 9h2.5M11.5 9h4M12 3.6v.01M3.5 14h17l1.5 6.5H2ZM5 16.3h14M4.4 18.3h15.2M9.5 19.2h5",
  headphones: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3M5.2 12a6.8 6.8 0 0 1 13.6 0M6 15v5M18 15v5M5 21v1c0 1 .6 1.5 1.5 1.5",
  ma: "M6.8 10.8Q6.3 10.8 5.8 10.6Q5.3 10.4 4.9 9.8Q4.5 9.3 4.2 8.2L5.7 7.8Q6 8.7 6.3 9.1Q6.5 9.4 6.9 9.4Q7.3 9.4 7.6 9.2Q7.9 8.9 8.5 8.2L9 7.5Q9.7 6.7 10.2 6.2Q10.7 5.8 11.3 5.5Q11.9 5.3 12.7 5.3L12.8 6.7Q12.1 6.8 11.7 6.9Q11.3 7.1 10.9 7.4Q10.6 7.8 10.1 8.4L9.7 8.9Q8.9 9.9 8.3 10.3Q7.6 10.8 6.8 10.8ZM11.2 18.7Q10.2 18.7 9.6 18.3Q8.9 17.9 8.3 17.2Q7.8 17.8 7.2 18.3Q6.6 18.7 5.6 18.7Q4.7 18.7 4.1 18.3Q3.5 17.9 3.3 17.3Q3 16.6 3 16Q3 14.8 3.7 14.1Q4.5 13.3 5.6 13.3Q6.2 13.3 6.7 13.6Q7.2 13.8 7.7 14.3Q8.2 14.8 8.8 15.5Q9.3 16.2 9.6 16.6Q10 16.9 10.4 17.1Q10.8 17.2 11.3 17.2Q12.2 17.2 12.7 16.7Q13.2 16.1 13.2 15Q13.2 13.6 12.5 12.7Q11.8 11.7 10.5 11.2Q9.3 10.8 7.8 10.8L6.9 10.8L8.4 9.4Q10.4 9.5 11.8 10.3Q13.2 11 14 12.2Q14.7 13.4 14.7 14.9Q14.7 16 14.3 16.9Q14 17.7 13.2 18.2Q12.4 18.7 11.2 18.7ZM4.4 16Q4.4 16.6 4.8 16.9Q5.1 17.3 5.7 17.3Q6.3 17.3 6.7 17Q7.1 16.7 7.4 16Q6.9 15.3 6.5 15Q6.1 14.7 5.6 14.7Q5.1 14.7 4.7 15Q4.4 15.4 4.4 16ZM17.5 18.7Q16.3 18.7 15.3 18.1Q14.4 17.4 13.7 16.4L14.4 15.3Q15.2 16.3 16 16.8Q16.7 17.2 17.6 17.2Q18.5 17.2 19 16.7Q19.5 16.1 19.5 15Q19.5 13.9 19.1 13.1Q18.6 12.3 17.9 11.8Q17.2 11.2 16.3 10.8L17 9.4Q18.1 9.9 19 10.7Q19.9 11.5 20.5 12.5Q21 13.6 21 14.9Q21 16.6 20.1 17.7Q19.2 18.7 17.5 18.7Z",
  pizza: "M12 14l-1 1M13.75 18.25l-1.25 1.42M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12M18.8 9.3a1 1 0 0 0 2.1 7.7M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" + ring(12.5, 9, 1.3) + ring(9, 14, 1.1) + ring(14.5, 14.2, 1.2) + "M10 19.2v1.8a.9.9 0 0 0 1.8 0v-1.4M6 17.5v1.2",
  spaghetti: "M2.5 15.5h19c0 3.6-4.3 6-9.5 6s-9.5-2.4-9.5-6ZM13.5 8.2C13.3 8.4 13 9.2 12.3 9.5C11.6 9.8 10.4 10 9.5 10.1C8.6 10.2 7.4 10 6.7 9.9C6.1 9.7 5.6 9.3 5.6 9C5.6 8.7 6.1 8.3 6.8 8.2C7.4 8 8.6 7.9 9.5 7.9C10.4 8 11.6 8.3 12.2 8.6C12.8 8.9 13.3 9.4 13.3 9.8C13.3 10.2 12.8 10.7 12.1 11C11.5 11.3 10.4 11.5 9.5 11.6C8.6 11.7 7.5 11.6 6.9 11.4C6.3 11.2 5.9 10.9 5.9 10.6C5.9 10.3 6.3 10 6.9 9.8C7.6 9.7 8.7 9.6 9.5 9.6C10.3 9.7 11.4 10 12 10.2C12.6 10.5 13 11 13 11.4C13 11.8 12.6 12.3 12 12.5C11.4 12.8 10.3 13.1 9.5 13.1C8.7 13.2 7.6 13.1 7.1 12.9C6.5 12.8 6.1 12.4 6.1 12.2C6.1 12 6.6 11.6 7.1 11.5C7.7 11.3 8.7 11.3 9.5 11.3C10.3 11.4 11.3 11.6 11.8 11.9C12.4 12.2 12.6 12.8 12.8 13M11 6.2L19.5 1.5M7 12.7c-.5 1.4.5 2.2-.1 2.8M13 12.9c.4 1.2-.4 1.8 0 2.6",
  dosa: "M3 17L17.2 3.8M3 17L20.8 9.2M17.2 3.8A1.4 3.2 -33.3 1 1 20.8 9.2A1.4 3.2 -33.3 1 1 17.2 3.8ZM6.5 14.4C11 14 14.5 11 18 6.8M1 20a8.5 2.6 0 1 0 17 0a8.5 2.6 0 1 0 -17 0ZM18.4 19.6a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0-4.6 0ZM18.8 18.5h3.8M8 16.6C11.5 16 15 13.5 18.5 9.5",
  nios: "M4.1 5.3L8.2 5.4L14.1 5.7L18.6 9.1L21.8 10.6Q22.2 11.4 22.3 12.4L22.7 12.8Q22.8 14.3 22.3 15.7L20.8 16.8Q16.6 18.1 14.8 17.8L12.3 17.9L12 17.6M11.4 17.5L8.5 15.1L3.4 13.1L1.4 12.7Q1.2 10.6 1.3 9.1L2.8 7.1L4.1 5.3M9.1 16A1.5 2.4 10 1 0 12 16.5A1.5 2.4 10 1 0 9.1 16ZM9.7 16.2A0.9 1.6 10 1 0 11.5 16.6A0.9 1.6 10 1 0 9.7 16.2ZM9 14.9Q9.3 13.9 10.5 13.7Q11.4 13.8 11.9 14.5M1.6 12.2A0.8 1.7 5 1 0 3.2 12.4A0.8 1.7 5 1 0 1.6 12.2ZM1.9 12.3A0.5 1.1 5 1 0 2.9 12.4A0.5 1.1 5 1 0 1.9 12.3ZM3.6 5.8L5.3 5.6L5.5 8.4L4.6 8.3L2.9 7.1ZM6 5.7L8.1 5.5L8.3 8.4L5.5 8.4ZM8.3 5.5L14.1 5.7L18.6 9.1L14.1 9.5L9.1 9ZM6.1 8.9L6.7 8.5L7.6 8.3L8.3 8.7L8.3 9.3L7.3 9.5L6.1 9.2ZM9.1 9L10.3 9.5L11.4 11M8.5 10.3L8.3 14.9M4.8 9L3.5 12.8M4.8 9.5L5.5 9.8M2.3 8.7L2.8 9M15.4 12.7L21.8 11.8M11.3 11.2Q11.7 11 12.8 11.4L15.6 12.7L16.4 13.1L15.3 13.6L14.1 13.4L12.9 12.9L11.9 12.1ZM15.2 14.5L16.5 13.8L22.6 13L22.5 14.3L21.8 15.1L18.1 16L16.6 16.1ZM14.8 17.3L17.3 16.7L21.8 15.4M13.8 14.8L14.7 15.8L13.2 17L13.1 16.4Z",
  pom: "M6 5.9Q6 3.6 7.2 1.7Q9.1 2.2 10.3 3.9Q12.8 3.2 14.8 3.7Q15.4 2.3 16.4 1.6Q17.7 3.1 17.8 5.9A1.7 1.7 0 0 1 19.2 8.2A1.3 1.3 0 0 1 20.2 10.1A1.2 1.2 0 0 1 20.5 12A1.2 1.2 0 0 1 20.9 13.8A1.2 1.2 0 0 1 20.5 15.7A1.2 1.2 0 0 1 20.8 17.5A1.2 1.2 0 0 1 20.5 19.5A0.8 0.8 0 0 1 19.8 20.6A1.9 1.9 0 0 1 16.9 21.6A1.6 1.6 0 0 1 14.4 22.1A1.6 1.6 0 0 1 11.9 22.2A1.6 1.6 0 0 1 9.3 22.1A1.6 1.6 0 0 1 6.8 21.6A1.9 1.9 0 0 1 3.9 20.6A0.8 0.8 0 0 1 3.2 19.5A1.2 1.2 0 0 1 3 17.5A1.2 1.2 0 0 1 3.2 15.7A1.2 1.2 0 0 1 2.9 13.8A1.2 1.2 0 0 1 3.2 12A1.2 1.2 0 0 1 3.5 10.1A1.3 1.3 0 0 1 4.5 8.2A1.7 1.7 0 0 1 6 5.9M6.8 4.8Q6.9 3.7 7.5 2.9M16.8 4.8Q16.7 3.7 16.2 2.9M8.6 10.6A0.7 0.6 0 1 0 10 10.6A0.7 0.6 0 1 0 8.6 10.6ZM13.2 10.4A0.7 0.6 0 1 0 14.6 10.4A0.7 0.6 0 1 0 13.2 10.4ZM10.2 12.2Q10.3 11.8 11.3 11.8Q12.4 11.8 12.5 12.2Q12.5 13.1 11.3 13.3Q10.2 13.1 10.2 12.2ZM11.3 13.3L11.3 14M10 14.3Q11.3 15.1 12.7 14.3M8.7 9.4Q9.5 8.9 10.5 9.4M13.1 9.3Q14.2 8.9 15.1 9.3",
  truck: "M1.5 6h8.5v11H1.5ZM10 14.5h1.5M11.5 17V7.5a1 1 0 0 1 1-1h3.2l2 4h3.6c.7 0 1.2.5 1.2 1.2V17ZM13 8.3h2.2l1.4 2.7H13ZM21.3 12.5v4M20 12.5v4M12 6.5v-4M13.8 6.5v-3M1.5 17h20" + ring(6, 18.2, 2.2) + ring(6, 18.2, .7) + ring(17, 18.2, 2.2) + ring(17, 18.2, .7),
  atom: orbit(0) + orbit(60) + orbit(120) + ring(12, 12, 1.5),
  whiteboard: "M2.5 3.5h19v14h-19ZM8 17.5l-2 4M16 17.5l2 4M4 20h16M6.6 7.5H4v5h2.6M4 10h2.2M8.2 9h2.6M8.2 11h2.6M12.4 12.5v-3.5M12.4 9.6c.4-.8 1.6-.8 1.6 0v2.9M14 9.6c.4-.8 1.6-.8 1.6 0v2.9M19 9.5a1.8 1.8 0 1 0 0 2.2M19.6 6.4h1.6l-1.6 1.6h1.6",
  umbrella: "M2 12a10 9 0 0 1 20 0c-1.8 1.5-3.3 1.5-5 0-1.6 1.5-3.4 1.5-5 0-1.6 1.5-3.4 1.5-5 0-1.7 1.5-3.2 1.5-5 0ZM12 3v9M12 3C8 5 5.5 8 5.2 12M12 3c4 2 6.5 5 6.8 9M12 1.2V3M12 12v7a2.5 2.5 0 1 1-5 0",
  couch: "M4 11V8.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3V11M1.5 13a2 2 0 0 1 4 0v1.5h13V13a2 2 0 0 1 4 0v4a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1ZM12 5.5V11M5.5 14.5V18M18.5 14.5V18M4 18v2.5M20 18v2.5",
  frame: "M3.5 2.5h17a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 20V4a1.5 1.5 0 0 1 1.5-1.5ZM5 5h14v14H5Z" + ring(12, 12, 3.2) + ring(12, 12, 1.2) + "M10.5 10.5l.8-.5",
  sparkle: "M12 2C12.7 7.8 16.2 11.3 22 12C16.2 12.7 12.7 16.2 12 22C11.3 16.2 7.8 12.7 2 12C7.8 11.3 11.3 7.8 12 2ZM19.5 2.5v3M18 4h3",
  star: "M12 2.6L14.6 9L21.3 9.4L16.2 13.7L17.9 20.4L12.1 16.7L6.3 20.4L8.1 13.7L2.8 9.5L9.4 9.1Z",
  loop: "M2 18C7 18.5 11 15.5 11 11.5C11 7.8 7.4 7.2 6.9 9.8C6.4 12.8 11 14.2 15 11.6C18 9.6 19 6.6 22 6.2",
  squiggle: "M1.5 13C3 8.2 5 8.2 6.5 12.2S9.5 16.2 11 12.2S14 8.2 15.5 12.2S18.5 16.2 20 12.2S22 10.2 22.6 11",
  arrowr: "M2 7C7 4.8 14 6 19.5 11.5M19.5 11.5L14.2 11.2M19.5 11.5L18 6.4",
  arrowl: "M22 7C17 4.8 10 6 4.5 11.5M4.5 11.5L9.8 11.2M4.5 11.5L6 6.4",
  bubble: "M5.2 3.4C9 3 15 3.2 18.8 3.5A2.6 2.6 0 0 1 21.4 6.1V13.7A2.6 2.6 0 0 1 18.8 16.3H13L8.2 21V16.3H5.2A2.6 2.6 0 0 1 2.6 13.7V6A2.6 2.6 0 0 1 5.2 3.4ZM8 10h.01M12 10h.01M16 10h.01",
  house: "M3 11.5L12 3l9 8.5M5 10v11h14V10M16.5 6V3h2v4.5M7.5 12.5H11V16H7.5ZM13 12.5h3.5V16H13ZM10.5 21v-3.5h3V21" + ring(12, 7.6, 1.4),
} as const;

type Name = keyof typeof paths;
type Size = "xs" | "s" | "m" | "l";
type Tier = "x" | "m" | "ml" | "l";
type Spot = readonly [Name, number, number, number, Size, Tier];

// name, left %, top %, rotation deg, size, layout tier (x under 768px, m to 1279px, ml from 768px, l from 1280px). Hand placed, not a grid.
// The portrait frame holds the page's left on wide screens and the top when stacked, so the backdrop keeps to the free bands beside and below it.
const closingSpots: readonly Spot[] = [
  ["shield", 1.2, 3, -8, "l", "m"],
  ["atom", 87.5, 3, 9, "m", "m"],
  ["umbrella", 88.5, 17, -7, "m", "m"],
  ["piano", 88, 31, 6, "m", "m"],
  ["veena", 87.5, 45, -4, "m", "m"],
  ["dosa", 88.5, 63, -4, "m", "m"],
  ["pizza", 91, 77, -9, "s", "m"],
  ["shield", 89.3, 1.7, -8, "l", "l"],
  ["atom", 92.4, 24.8, 9, "m", "l"],
  ["umbrella", 90.2, 38.8, -7, "m", "l"],
  ["helmet", 55, 3, 7, "l", "l"],
  ["nios", 73.5, 3, 3, "m", "l"],
  ["couch", 66, 12, -5, "m", "l"],
  ["piano", 70.6, 62, 6, "m", "l"],
  ["tabla", 78.2, 62.5, -6, "m", "l"],
  ["veena", 85.8, 62.5, -4, "m", "l"],
  ["whiteboard", 93.5, 62, -4, "m", "l"],
  ["pizza", 71.2, 77.5, -9, "s", "l"],
  ["spaghetti", 78.2, 76.5, 6, "m", "l"],
  ["dosa", 86.5, 77, -4, "m", "l"],
  ["frame", 59.4, 88.8, 6, "s", "l"],
  ["house", 69.2, 88.8, 4, "s", "l"],
  ["truck", 78.9, 88.8, -3, "s", "l"],
];

// Around the portrait: one ring of scribbles and icons, % of the portrait frame (the frame pads the ring, so nothing leaves it).
const portraitSpots: readonly Spot[] = [
  ["chai", 4.5, 2.2, 6, "s", "ml"],
  ["sparkle", 26, 2.2, 10, "s", "ml"],
  ["star", 46, 4.4, -12, "xs", "ml"],
  ["bubble", 72, 2.2, 4, "s", "ml"],
  ["arrowl", 86, 19, 8, "s", "ml"],
  ["pom", 86, 37, -6, "s", "ml"],
  ["sparkle", 86, 54, -10, "s", "ml"],
  ["ma", 86, 78, -6, "s", "ml"],
  ["headphones", 86, 66.5, 8, "s", "ml"],
  ["laptop", 13, 88.2, -6, "s", "ml"],
  ["squiggle", 37, 88.2, -3, "s", "ml"],
  ["loop", 57, 88.2, 4, "s", "ml"],
  ["star", 80, 90.4, 12, "xs", "ml"],
  ["arrowr", 2.5, 19, -12, "s", "ml"],
  ["guitar", 2.5, 38, 10, "s", "ml"],
  ["star", 4.7, 60, -8, "xs", "ml"],
  ["sparkle", 4.7, 74, 6, "xs", "ml"],
  ["chai", 2, 1.4, 5, "s", "x"],
  ["sparkle", 27, 4.8, 10, "xs", "x"],
  ["bubble", 42, 1.4, 4, "s", "x"],
  ["star", 66, 4.8, -12, "xs", "x"],
  ["pom", 78, 1.4, -6, "s", "x"],
  ["arrowr", 1.9, 22, -12, "xs", "x"],
  ["star", 1.9, 55, -8, "xs", "x"],
  ["sparkle", 1.9, 74, 6, "xs", "x"],
  ["arrowl", 87.8, 22, 8, "xs", "x"],
  ["ma", 86, 36, -6, "s", "x"],
  ["sparkle", 87.8, 50, -10, "xs", "x"],
  ["star", 87.8, 72, 12, "xs", "x"],
  ["laptop", 2, 84.2, -6, "s", "x"],
  ["headphones", 26, 84.2, 7, "s", "x"],
  ["guitar", 51, 84.2, 8, "s", "x"],
  ["squiggle", 77, 84.2, -3, "s", "x"],
];

// Footer band: same icons, free side bands of the centred footer text (a row above the text on phones).
const footerSpots: readonly Spot[] = [
  ["veena", 12, 8, -6, "s", "x"],
  ["umbrella", 44, 8, 5, "s", "x"],
  ["atom", 76, 8, -8, "s", "x"],
  ["umbrella", 3, 12, -7, "s", "m"],
  ["whiteboard", 10, 50, 4, "s", "m"],
  ["atom", 87, 12, 8, "s", "m"],
  ["couch", 85, 50, -5, "s", "m"],
  ["veena", 5, 12, -6, "m", "l"],
  ["whiteboard", 12.5, 50, 4, "m", "l"],
  ["umbrella", 21.5, 12, -7, "m", "l"],
  ["tabla", 22.5, 52, -5, "s", "l"],
  ["atom", 70, 12, 8, "s", "l"],
  ["couch", 76, 50, -5, "m", "l"],
  ["guitar", 85, 12, -6, "m", "l"],
  ["headphones", 91, 52, 6, "s", "l"],
];

// The footer and portrait variants reuse the symbols the closing chapter defines, so they render no second copy of them.
const spots = { closing: closingSpots, footer: footerSpots, portrait: portraitSpots };
const fieldClass = { closing: styles.field, footer: `${styles.field} ${styles.flush}`, portrait: `${styles.field} ${styles.cluster}` };

export function Doodles({ variant = "closing" }: { variant?: "closing" | "footer" | "portrait" }) {
  return (
    <div className={fieldClass[variant]} aria-hidden="true" data-reveal={variant === "footer" ? undefined : "fade"}>
      {variant === "closing" && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          {Object.entries(paths).map(([name, d]) => (
            <symbol key={name} id={`dd-${name}`} viewBox="0 0 24 24">
              <path d={d} vectorEffect="non-scaling-stroke" />
            </symbol>
          ))}
        </svg>
      )}
      {spots[variant].map(([name, x, y, turn, size, tier], i) => (
        <svg
          key={i}
          className={`${styles.icon} ${styles[size]} ${styles[`t${tier}`]}`}
          style={{ left: `${x}%`, top: `${y}%`, rotate: `${turn}deg` }}
        >
          <use href={`#dd-${name}`} />
        </svg>
      ))}
    </div>
  );
}
