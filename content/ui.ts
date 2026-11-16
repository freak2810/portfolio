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
    projects: "Selected work.",
    experience: "Field record.",
    education: "Where the training happened.",
    technology: "The kit.",
    contact: "The road so far.",
  },
  resumeLinkLabel: "Resume PDF",
  notFound: {
    title: "Off the map.",
    body: "No such position here. Fall back to the start.",
    homeLabel: "Back to base.",
  },
  aria: {
    nav: "Primary",
    resumeLink: "Download the resume as a PDF",
    scrollCue: "Scroll to the projects",
    heroGraphic: "A star inside a shield",
    rotatorPause: "Pause the rotating list",
    rotatorPlay: "Play the rotating list",
  },
  footer: "Built in Hyderabad, rooted in Warangal.",
};
