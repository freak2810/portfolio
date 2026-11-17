import type { Experience } from "./types.ts";

export const experience: readonly Experience[] = [
  {
    id: "innovapptive",
    company: "Innovapptive Inc",
    about: "Connected Worker Platform, enterprise SaaS for industrial frontline operations",
    location: "Hyderabad",
    roles: [
      { title: "Senior Software Engineer", start: "2025-07", end: "present" },
    ],
    bullets: [
      { text: "Tech lead of a 3-member platform team building the admin layer that configures the products." },
      { text: "Built a CDC pipeline merging two platform versions: master data from DynamoDB (v1) and MongoDB (v2) into one database." },
      { text: "Removed the major slow APIs through query optimization, caching and async pipelines." },
      { text: "Automated the error-prone steps of manual system setup after mapping requirements across teams." },
      { text: "Set up Sentry end to end: P95/P99 latency, Sev-1/Sev-2 alerts and uptime checks, within SLO targets." },
      { text: "Most screens load in under 1 second through lazy loading, virtualization and rendering work." },
      { text: "Built agents and skills for AI coding tools such as Claude Code." },
      { text: "Interviews senior full-stack candidates." },
    ],
    tech: ["DynamoDB", "MongoDB", "Sentry"],
  },
  {
    id: "wexa",
    company: "Wexa.ai",
    about: "AI automation platform with virtual coworkers",
    location: "Hyderabad",
    roles: [
      { title: "Principal Software Engineer", start: "2023-12", end: "2025-03" },
    ],
    bullets: [
      { text: "Designed the agent execution engine: autonomous multi-step workflows with data sharing between workflows." },
      { text: "Built an LLM-agnostic agent framework (agents composed from instructions and skills) across GPT, LLaMA and Claude." },
      { text: "Built a RAG system on Qdrant with vector search." },
      { text: "Led and mentored 10+ engineers and interns." },
      { text: "Turned client requirements into technical solutions and shaped the first roadmap. The product raised $0.5M angel funding." },
    ],
    tech: ["Qdrant", "GPT", "LLaMA", "Claude"],
  },
  {
    id: "mocktheta",
    company: "MockTheta, Inc",
    about: "Fintech and e-commerce startup",
    location: "Remote",
    roles: [
      { title: "Full Stack Engineer", start: "2023-01", end: "2023-10" },
    ],
    bullets: [
      { text: "Led backend microservices: uploads, auth, notifications, document signing, LLC setup, KYC." },
      { text: "Built a tokenized real-estate marketplace with a team of 4: wallet login, Solidity ERC-721 minting and escrow." },
      { text: "Built the Anu UI library (anu.dev, React Native): 70%+ code sharing between web and mobile." },
    ],
    tech: ["Solidity", "React Native"],
  },
  {
    id: "eventdesk",
    company: "EventDesk",
    about: "Venue discovery and direct booking marketplace",
    location: "Remote",
    flag: "Own employer or under MockTheta (resume and LinkedIn differ); location not stated, Remote is a placeholder",
    roles: [
      { title: "Lead Developer", start: "2022-01", end: "2022-12" },
      { title: "Full Stack Engineer", start: "2021-04", end: "2022-01" },
    ],
    bullets: [
      { text: "Led the developers, mentored interns." },
      {
        text: "Led a team of 5 developers.",
        flag: "Team size: resume and LinkedIn say 5, interview prep says 4",
        hold: true,
      },
      { text: "Owned Android, iOS and web delivery." },
      { text: "Built Stripe payments (payments, refunds, platform fees), real-time chat with Firestore and MongoDB, and a venue management portal." },
      { text: "Handled the September to January peak season." },
      { text: "Bootstrapped the Next.js and React Native stack and fixed issues through launch." },
    ],
    tech: ["Next.js", "React Native", "Stripe", "Firestore", "MongoDB"],
  },
  {
    id: "mocktheta-intern",
    company: "MockTheta, Inc",
    location: "Remote",
    flag: "Include it? LinkedIn only, absent from the resume; location not stated",
    hold: true,
    roles: [
      { title: "Junior Software Developer Intern", start: "2019-06", end: "2020-05" },
    ],
    bullets: [
      { text: "Built reusable React Native screens with TypeScript and GraphQL." },
    ],
    tech: ["React Native", "TypeScript", "GraphQL"],
  },
];
