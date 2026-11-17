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
      { text: "Technical lead for the 3-member platform team building the admin layer used to configure and manage the Connected Worker Platform products. Owns performance and reliability across the stack to keep services within SLO targets." },
      { text: "Built a change data capture (CDC) pipeline for the merge of the platform's two versions, streaming master data changes from DynamoDB (v1) and MongoDB (v2) into a common database across two different architectures." },
      { text: "Eliminated the platform's major slow APIs by optimizing database queries, adding caching, and moving heavy aggregations to asynchronous pipelines." },
      { text: "Mapped the manual system setup with multiple teams, then automated its most critical and repetitive steps, removing manual configuration errors from those steps." },
      { text: "Set up Sentry end to end: P95/P99 latency, Sev-1/Sev-2 alerts and uptime checks, and maintain it for the team." },
      { text: "Brought load times under 1 second for most screens through lazy loading, list virtualization and rendering optimizations." },
      { text: "Built agents and skills for AI coding tools such as Claude Code to automate repetitive development workflows." },
      { text: "Interviews senior full-stack candidates across DSA, system design and full-stack architecture." },
    ],
    tech: ["Node.js", "TypeScript", "Express.js", "MongoDB", "Apache Kafka", "DynamoDB", "Sentry"],
  },
  {
    id: "freelance-search",
    company: "Freelance",
    about: "LinkedIn-style candidate search for a hiring product",
    location: "Hyderabad",
    roles: [
      { title: "Backend Engineer", start: "2025-04", end: "2025-05" },
    ],
    bullets: [
      { text: "Built a LinkedIn-style candidate search for a hiring product as a freelance engagement." },
      { text: "Parsed resumes into structured profiles and indexed them in Elasticsearch for hybrid search." },
      { text: "Turned a pasted job description into structured filters such as skills, experience and location with an LLM call." },
      { text: "Matched skills semantically, then scored candidates to rank them by relevance." },
    ],
    tech: ["TypeScript", "Node.js", "Elasticsearch", "AWS SQS", "OpenAI", "LlamaIndex"],
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
      { text: "Designed the execution engine for AI agents, enabling autonomous multi-step workflows with data sharing between workflows for complex use cases." },
      { text: "Built an LLM-agnostic agent framework where agents are composed from instructions and skills, integrating GPT, LLaMA and Claude models." },
      { text: "Built a RAG system on Qdrant, grounding agent responses in enterprise data through vector search and retrieval." },
      { text: "Led and mentored a team of 10+ engineers and interns across the full development lifecycle." },
      { text: "Turned client requirements from business and implementation teams into technical solutions, and helped shape the initial product roadmap." },
      { text: "Core contributor to the product through its $0.5M angel funding round." },
    ],
    tech: ["Python", "FastAPI", "TypeScript", "Node.js", "React.js", "Next.js", "MongoDB", "Qdrant", "GPT", "LLaMA", "Claude"],
  },
  {
    id: "mocktheta",
    company: "MockTheta, Inc",
    about: "Fintech and e-commerce startup",
    location: "Hyderabad",
    roles: [
      { title: "Full Stack Engineer", start: "2023-01", end: "2023-10" },
    ],
    bullets: [
      { text: "Built a reusable React Native UI component library for web and mobile (anu.dev), achieving 70%+ code sharing between the web and mobile apps." },
      { text: "Architected and led backend microservices for authentication, file uploads, notifications, document signing, LLC setup and KYC." },
      { text: "Led backend infrastructure development to manage users, projects, contracts and assets." },
      { text: "Built a tokenized real-estate marketplace in a team of four, including crypto-wallet login and Solidity ERC-721 smart contracts for NFT minting, listings and escrow." },
    ],
    tech: ["Node.js", "TypeScript", "GraphQL", "Microservices", "React.js", "Next.js", "React Native", "Solidity", "AWS"],
  },
  {
    id: "eventdesk",
    company: "EventDesk",
    about: "Venue discovery and direct booking marketplace",
    location: "Hyderabad (Remote)",
    roles: [
      { title: "Lead Developer", start: "2022-01", end: "2022-12" },
      { title: "Full Stack Engineer", start: "2021-04", end: "2022-01" },
    ],
    bullets: [
      { text: "Led a team of 5 developers and mentored interns, owning delivery across Android, iOS and web." },
      { text: "Built the customer-facing venue booking marketplace, which handled heavy traffic through the September to January peak season." },
      { text: "Architected the payments system on Stripe, covering payments, refunds and platform fees." },
      { text: "Built real-time messaging between customers and venue managers with Firebase Firestore and MongoDB, including in-chat reservation actions." },
      { text: "Built the venue management portal for businesses to update listings and availability." },
      { text: "Bootstrapped the frontend stack with Next.js and React Native for the Android, iOS and web apps." },
      { text: "Resolved frontend issues through the initial product launch." },
    ],
    tech: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "Firestore", "Stripe", "React.js", "Next.js", "React Native"],
  },
];
