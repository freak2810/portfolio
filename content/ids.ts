export const sectionIds = ["home", "projects", "experience", "education", "technology", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
export const iconSlugs = [
  "typescript", "javascript", "python", "nodedotjs", "express", "fastapi", "graphql",
  "react", "nextdotjs", "tailwindcss", "sass",
  "apachekafka", "rabbitmq", "docker", "githubactions", "sentry", "github", "vercel",
  "postgresql", "mongodb", "elasticsearch", "redis", "qdrant", "firebase", "stripe",
  "solidity", "langchain", "langgraph", "meta", "claude",
  "openai", "layers", "network", "webhook", "gauge", "activity",
  "filesearch", "bot", "aws", "awssqs", "awsdynamodb", "llamaindex",
  "arrowleftright", "boxes", "zap",
] as const;
export type IconSlug = (typeof iconSlugs)[number];
