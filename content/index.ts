import { about } from "./about.ts";
import { certifications } from "./certifications.ts";
import { education } from "./education.ts";
import { experience } from "./experience.ts";
import { landing } from "./landing.ts";
import { links } from "./links.ts";
import { featuredProjectIds, projects } from "./projects.ts";
import { profile } from "./profile.ts";
import { skills } from "./skills.ts";
import { status } from "./status.ts";
import { techIcons } from "./techIcons.ts";
import { byKitOrder } from "./techOrder.ts";
import { ui } from "./ui.ts";
import type { Content } from "./types.ts";

const isHeld = (item: unknown): boolean =>
  typeof item === "object" && item !== null && (item as { hold?: unknown }).hold === true;

const dropHeld = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.filter((item) => !isHeld(item)).map(dropHeld);
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, dropHeld(inner)]));
  }
  return value;
};

const sortTech = <T extends { tech: readonly string[] }>(item: T): T => ({ ...item, tech: byKitOrder(item.tech) });

const composed: Content = {
  profile,
  links,
  about,
  skills,
  experience: experience.map(sortTech),
  education: { ...education, majorProject: education.majorProject && sortTech(education.majorProject) },
  certifications,
  projects: projects.map(sortTech),
  featuredProjectIds,
  landing,
  ui,
  techIcons,
  status,
};

export const content = dropHeld(composed) as Content;
export { sectionIds } from "./ids.ts";
export type { SectionId } from "./ids.ts";
export type { Content } from "./types.ts";
