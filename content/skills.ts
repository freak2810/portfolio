import type { SkillGroup } from "./types.ts";

export const skills: readonly SkillGroup[] = [
  {
    name: "Architecture",
    items: ["System Design", "Distributed Systems", "API Design", "Performance Optimization", "Observability"],
  },
  {
    name: "Messaging & Streaming",
    items: ["Kafka", "RabbitMQ", "AWS SQS"],
  },
  {
    name: "AI",
    items: ["LangChain", "LangGraph", "LlamaIndex", "RAG", "Vector Search", "Agentic AI", "LLMs", "Generative AI"],
  },
  {
    name: "Cloud & DevOps",
    items: ["AWS (Lambda, S3, CloudFront)", "Docker", "GitHub Actions", "Sentry", "Git", "GitHub"],
  },
  {
    name: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Angular", "HTML", "CSS", "SASS"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Elasticsearch", "Redis", "Qdrant", "Relational Databases", "Firebase"],
  },
  {
    name: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "GraphQL", "REST", "Microservices", "Event-Driven Architecture", "Stripe"],
  },
  {
    name: "Blockchain",
    items: ["Solidity", "MetaMask"],
  },
  {
    name: "Engineering Practice",
    items: ["Unit Testing", "Agile", "Object-Oriented Programming", "Team Leadership"],
  },
];
