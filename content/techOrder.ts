import { skills } from "./skills.ts";

// Tech names shown outside the kit, filed under the kit category they belong to (after the kit's own items).
const extras: Readonly<Record<string, readonly string[]>> = {
  "Programming Languages": ["Solidity"],
  Databases: ["Firestore"],
  "Messaging & Streaming": ["Apache Kafka"],
  "Cloud & DevOps": ["Vercel"],
  AI: ["GPT", "LLaMA", "Claude", "OpenAI", "Claude Code"],
};

const order: readonly string[] = skills.flatMap((group) => [...group.items, ...(extras[group.name] ?? [])]);

export const hasRank = (name: string): boolean => order.includes(name);

// Unranked names sort last; check-content fails on them.
export const byKitOrder = (names: readonly string[]): string[] => {
  const rank = (name: string): number => (hasRank(name) ? order.indexOf(name) : order.length);
  return [...names].sort((a, b) => rank(a) - rank(b));
};
