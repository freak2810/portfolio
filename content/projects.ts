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
    id: "innovapptive-admin-layer",
    title: "Connected Worker Platform admin layer",
    headline: "Tech lead of the 3-member platform team, owning performance and reliability",
    points: [
      { text: "Built a CDC pipeline for the platform's v1-to-v2 merge, streaming master data from DynamoDB and MongoDB into one database." },
      { text: "Eliminated the major slow APIs through query optimization, caching and async aggregation pipelines." },
      { text: "Set up Sentry end to end: P95/P99 latency, Sev-1/Sev-2 alerts and uptime checks, keeping services within SLO." },
    ],
    tech: ["DynamoDB", "MongoDB", "Sentry"],
  },
  {
    id: "this-portfolio",
    title: "This portfolio",
    headline: "Static site on GitHub Pages",
    points: [
      { text: "Typed content files feed both the site and the PDF." },
      { text: "A content check runs on every build." },
    ],
    tech: ["Next.js", "TypeScript", "GitHub Actions"],
    repoUrl: "https://github.com/freak2810/Portfolio",
    liveUrl: "https://freak2810.github.io/Portfolio/",
  },
];

export const featuredProjectIds: Content["featuredProjectIds"] = ["wexa-agent-engine", "eventdesk", "innovapptive-admin-layer"];
