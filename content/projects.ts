import type { Content, Project } from "./types.ts";

export const projects: readonly Project[] = [
  {
    id: "wexa-agent-engine",
    title: "Wexa agent execution engine",
    headline: "Agent engine built from zero for an AI automation platform",
    points: [
      { text: "Autonomous multi-step workflows with data sharing between workflows." },
      { text: "Context managed within the model's token limit: distilled outputs, RAG overflow, short and long-term memory." },
    ],
    tech: ["Qdrant", "RAG", "GPT", "LLaMA", "Claude"],
    stat: { value: "$0.5M", label: "angel funding the company raised" },
  },
  {
    id: "eventdesk-revival",
    title: "EventDesk revival",
    headline: "Venue booking marketplace shipped as lockdowns eased",
    points: [
      { text: "Shared TypeScript across web and mobile." },
      {
        text: "Led a team of 5 developers.",
        flag: "Team size: resume and LinkedIn say 5, interview prep says 4",
        hold: true,
      },
      {
        text: "Kept the client business alive.",
        flag: "Interview prep only, not on the resume",
        hold: true,
      },
    ],
    tech: ["TypeScript", "Next.js", "React Native"],
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
    id: "cdc-pipeline",
    title: "CDC master-data pipeline",
    headline: "One store across DynamoDB and MongoDB",
    points: [
      { text: "Plant-ID partitioning and dedup, built for millions of records." },
    ],
    tech: ["DynamoDB", "MongoDB"],
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

export const featuredProjectIds: Content["featuredProjectIds"] = ["wexa-agent-engine", "eventdesk-revival", "cdc-pipeline"];
