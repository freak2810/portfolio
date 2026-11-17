import type { Content, Project } from "./types.ts";

export const projects: readonly Project[] = [
  {
    id: "wexa-agent-engine",
    title: "Wexa agent execution engine",
    headline: "Agent engine built from zero for an AI automation platform",
    points: [
      { text: "Designed the agent execution engine: autonomous multi-step workflows with data sharing between workflows." },
      { text: "Built an LLM-agnostic agent framework: agents composed from instructions and skills, across GPT, LLaMA and Claude." },
      { text: "Led and mentored 10+ engineers and interns across the full development lifecycle." },
    ],
    tech: ["Qdrant", "RAG", "GPT", "LLaMA", "Claude"],
    liveUrl: "https://wexa.ai/",
    stat: { value: "$0.5M", label: "angel funding the company raised" },
  },
  {
    id: "eventdesk",
    title: "EventDesk",
    headline: "Venue discovery and direct booking marketplace",
    points: [
      { text: "Led a team of 5 developers and mentored interns, owning delivery across Android, iOS and web." },
      { text: "Built the customer venue booking marketplace and carried its heavy traffic through the September to January peak season." },
      { text: "Architected Stripe payments: charges, refunds and platform fees." },
    ],
    tech: ["TypeScript", "Next.js", "React Native", "Stripe"],
  },
  {
    id: "anu-ui",
    title: "Anu UI",
    headline: "One React Native component library for web and mobile",
    points: [
      { text: "70%+ code reuse across web and mobile." },
    ],
    tech: ["React Native"],
  },
  {
    id: "this-portfolio",
    title: "This portfolio",
    headline: "Static Next.js site on GitHub Pages, built with an AI agent team",
    points: [
      { text: "Built with my own multi-agent Claude Code setup: a planner, a pair of coding agents and reviewers, gated by scripted checks." },
      { text: "Lighthouse 100 for performance and accessibility, guarded by a budget script that fails when first and largest paint diverge." },
      { text: "Typed content files feed both the site and the resume PDF, with a content check on every build." },
    ],
    tech: ["Next.js", "TypeScript", "GitHub Actions", "Claude Code"],
    repoUrl: "https://github.com/freak2810/portfolio",
    liveUrl: "https://freak2810.github.io/portfolio/",
  },
];

export const featuredProjectIds: Content["featuredProjectIds"] = ["wexa-agent-engine", "eventdesk"];
