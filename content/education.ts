import type { Content } from "./types.ts";

export const education: Content["education"] = {
  entries: [
    {
      id: "mvsr",
      school: "MVSR Engineering College, Hyderabad",
      degree: "B.E. Computer Science",
      start: 2017,
      end: 2021,
      detail: "CGPA 8.01/10",
    },
    {
      id: "sri-chaitanya",
      school: "Sri Chaitanya Junior College, Hyderabad",
      degree: "Intermediate (MPC)",
      start: 2015,
      end: 2017,
    },
    {
      id: "jsm",
      school: "JSM High School",
      degree: "10th Standard",
      start: 2011,
      end: 2015,
    },
  ],
  majorProject: {
    title: "Secure banking system",
    summary: "A secure banking system using Paillier partial homomorphic encryption against MITM attacks.",
    tech: ["TypeScript", "React.js", "Next.js", "Express.js", "MongoDB"],
  },
};
