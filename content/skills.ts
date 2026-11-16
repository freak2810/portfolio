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
    items: ["LangChain", "LangGraph", "LlamaIndex", "RAG", "Vector Search", "Agentic AI", "LLMs"],
  },
  {
    name: "Cloud & DevOps",
    items: ["AWS (Lambda, S3, CloudFront)", "Docker", "GitHub Actions", "Sentry"],
  },
  {
    name: "Frontend",
    items: ["React.js", "Next.js", "React Native"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Elasticsearch", "Redis", "Qdrant"],
  },
  {
    name: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "GraphQL", "REST", "Microservices", "Event-Driven Architecture"],
  },
];
