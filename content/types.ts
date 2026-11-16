import type { IconSlug, SectionId } from "./ids.ts";

export type Bilingual = { en: string; te?: string };
export type YearMonth = `${number}-${number}`;
export type End = YearMonth | "present";
export type Confirmation = "placeholder" | "confirmed";
export type Flagged = { flag?: string; hold?: true };
export type Bullet = { text: string } & Flagged;

export type Profile = {
  name: string;
  title: string;
  summary: string;
  base: Bilingual;
  origin?: Bilingual;
  languages: readonly { name: "English" | "Hindi" | "Telugu"; level?: string }[];
};
export type Links = {
  linkedin: string;
  github: string;
  resumePath: "/resume.pdf";
};
export type About = {
  paragraphs: readonly [string, ...string[]];
  onRepeatLabel: string;
  onRepeat: readonly { title: string; artist: string }[];
  closing: string;
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
} & Flagged;
export type Education = { id: string; school: string; degree: string; start: number; end: number | "present"; detail?: string };
export type MajorProject = { title: string; summary: string; tech: readonly string[] };
export type Certification = { id: string; name: string; issuer?: string; year?: number; url?: string } & Flagged;
export type Project = {
  id: string;
  title: string;
  headline: string;
  points: readonly Bullet[];
  tech: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
  stat?: { value: string; label: string };
} & Flagged;
export type EasterEgg = {
  id: string;
  tap: { target: string };
  keys?: readonly string[];
  message: string;
};
export type Landing = {
  descriptors: readonly [string, ...string[]];
  scrollCue: string;
  skipLabel: string;
  easterEggs: readonly EasterEgg[];
};
export type Ui = {
  nav: Record<SectionId, string>;
  headings: Record<SectionId, string>;
  resumeLinkLabel: string;
  notFound: { title: string; body: string; homeLabel: string };
  aria: { nav: string; resumeLink: string; scrollCue: string; heroGraphic: string; rotatorPause: string; rotatorPlay: string };
  social: { github: string; linkedin: string; resume: string };
  footer: string;
};
export type SectionKey = "profile" | "links" | "skills" | "experience" | "education" | "certifications" | "projects" | "landing" | "ui";
export type Content = {
  profile: Profile;
  links: Links;
  about: About;
  skills: readonly SkillGroup[];
  experience: readonly Experience[];
  education: { entries: readonly Education[]; majorProject?: MajorProject };
  certifications: readonly Certification[];
  projects: readonly Project[];
  featuredProjectIds: readonly [string, string, string];
  landing: Landing;
  ui: Ui;
  techIcons: Readonly<Record<string, TechIcon>>;
  status: Record<SectionKey, Confirmation>;
};
