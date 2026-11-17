import type { IconSlug, SectionId } from "./ids.ts";

export type Bilingual = { en: string; te?: string };
export type YearMonth = `${number}-${number}`;
export type End = YearMonth | "present";
export type Bullet = { text: string };

export type Profile = {
  name: string;
  title: string;
  summary: string;
  description: string;
  base: Bilingual;
  languages: readonly { name: "English" | "Hindi" | "Telugu"; level?: string }[];
};
export type Links = {
  linkedin: string;
  github: string;
  site: string;
  resumePath: "/resume.pdf";
};
export type About = {
  paragraphs: readonly [string, ...string[]];
  closing: { before: string; link: string; after: string };
};
export type TechIcon = IconSlug | "chip";
export type SkillGroup = { name: string; items: readonly string[] };
export type Role = { title: string; start: YearMonth; end: End };
export type Experience = {
  id: string;
  company: string;
  about?: string;
  location: string;
  roles: readonly [Role, ...Role[]];
  bullets: readonly Bullet[];
  tech: readonly string[];
};
export type Education = { id: string; school: string; degree: string; start: number; end: number | "present"; detail?: string };
export type MajorProject = { title: string; summary: string; tech: readonly string[] };
export type Certification = { id: string; name: string; issuer?: string; year?: number; url?: string };
export type Project = {
  id: string;
  title: string;
  headline: string;
  points: readonly Bullet[];
  tech: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
  stat?: { value: string; label: string };
};
export type Landing = {
  descriptors: readonly [string, ...string[]];
  skipLabel: string;
};
export type Ui = {
  nav: Record<SectionId, string>;
  headings: Record<SectionId, string>;
  notFound: { title: string; body: string; homeLabel: string };
  aria: { nav: string };
  social: { github: string; linkedin: string; resume: string };
  labels: {
    technologies: string;
    newTab: string;
    certifications: string;
    majorProject: string;
    spokenLanguages: string;
    menu: string;
    website: string;
    onGitHub: string;
  };
  footer: string;
};
export type Content = {
  profile: Profile;
  links: Links;
  about: About;
  skills: readonly SkillGroup[];
  experience: readonly Experience[];
  education: { entries: readonly Education[]; majorProject?: MajorProject };
  certifications: readonly Certification[];
  projects: readonly Project[];
  featuredProjectIds: readonly [string, string];
  landing: Landing;
  ui: Ui;
  techIcons: Readonly<Record<string, TechIcon>>;
};
