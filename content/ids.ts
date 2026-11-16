export const sectionIds = ["home", "projects", "experience", "education", "technology", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
