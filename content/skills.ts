import type { SkillGroup } from "./types.ts";

export const skills: readonly SkillGroup[] = [
  {
    name: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Stripe"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Elasticsearch", "Redis", "Qdrant", "Firebase"],
  },
  {
    name: "Messaging & Streaming",
    items: ["Kafka", "RabbitMQ", "AWS SQS"],
  },
  {
    name: "Cloud & DevOps",
    items: ["AWS", "Docker", "GitHub Actions", "Sentry", "GitHub"],
  },
  {
    name: "AI",
    items: ["LangChain", "LangGraph", "LlamaIndex", "RAG", "Agentic AI"],
  },
  {
    name: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "SASS"],
  },
  {
    name: "Architecture",
    items: ["System Design", "Distributed Systems", "API Design", "Performance Optimization", "Observability", "Event-Driven Architecture", "REST", "GraphQL", "Microservices"],
  },
];
