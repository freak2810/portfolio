import { content } from "../content";

export const siteUrl = content.projects.find((project) => project.id === "this-portfolio")?.liveUrl ?? "";
