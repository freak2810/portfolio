import { about } from "./about.ts";
import { certifications } from "./certifications.ts";
import { education } from "./education.ts";
import { experience } from "./experience.ts";
import { landing } from "./landing.ts";
import { links } from "./links.ts";
import { featuredProjectIds, projects } from "./projects.ts";
import { profile } from "./profile.ts";
import { skills } from "./skills.ts";
import { techIcons } from "./techIcons.ts";
import { byKitOrder } from "./techOrder.ts";
import { ui } from "./ui.ts";
import type { Content } from "./types.ts";

const sortTech = <T extends { tech: readonly string[] }>(item: T): T => ({ ...item, tech: byKitOrder(item.tech) });

export const content: Content = {
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
};

export { sectionIds } from "./ids.ts";
export type { Content } from "./types.ts";
