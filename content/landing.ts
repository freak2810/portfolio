import type { Landing } from "./types.ts";

export const landing: Landing = {
  heroLine: "Systems that hold the line. Teams that hold it with me.",
  roles: [
    "Senior Backend Engineer | Tech Lead",
    "Principal Software Engineer · Wexa",
    "Full Stack Engineer · MockTheta",
  ],
  descriptors: ["Backend systems", "AI agent platforms", "Cloud and DevOps", "API design", "Team leadership"],
  scrollCue: "Scroll to the record",
  skipLabel: "Skip to resume",
  easterEggs: [
    {
      id: "star",
      tap: { target: '[data-egg="star"]' },
      keys: ["s", "t", "a", "r"],
      message: "Five points. No point works alone.",
    },
    {
      id: "shield",
      tap: { target: '[data-egg="shield"]' },
      keys: ["s", "h", "i", "e", "l", "d"],
      message: "It always comes back.",
    },
  ],
};
