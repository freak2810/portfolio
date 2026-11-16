import type { Ui } from "./types.ts";

export const ui: Ui = {
  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    technology: "Technology",
    contact: "Contact",
  },
  headings: {
    home: "Home",
    projects: "Three missions worth showing.",
    experience: "Field record.",
    education: "Where the training happened.",
    technology: "The kit.",
    contact: "Send word. A real person answers.",
  },
  resumeLinkLabel: "Resume PDF",
  themeToggle: { toLight: "Switch to the light theme", toDark: "Switch to the dark theme" },
  notFound: {
    title: "Off the map.",
    body: "No such position here. Fall back to the start.",
    homeLabel: "Back to base.",
  },
  aria: {
    nav: "Primary",
    themeToggle: "Colour theme",
    resumeLink: "Download the resume as a PDF",
    scrollCue: "Scroll to the projects",
    heroGraphic: "A glowing star inside a shield in a stone gateway",
  },
  footer: "Built in Hyderabad, rooted in Warangal. Nobody on this team stands alone.",
};
