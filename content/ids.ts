export const sectionIds = ["home", "projects", "experience", "education", "technology", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
export const iconSlugs = [
  "typescript", "javascript", "python", "nodedotjs", "express", "fastapi", "graphql",
  "react", "nextdotjs", "angular", "html5", "css", "sass",
  "apachekafka", "rabbitmq", "docker", "githubactions", "sentry", "git", "github",
  "postgresql", "mongodb", "elasticsearch", "redis", "qdrant", "firebase", "stripe",
  "solidity", "langchain", "langgraph", "meta", "claude",
] as const;
export type IconSlug = (typeof iconSlugs)[number];
