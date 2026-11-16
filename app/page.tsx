import { withBase } from "../lib/base-path";

export default function Home() {
  return (
    <main>
      <h1>Aditya Manikanth Rao</h1>
      <a href={withBase("/resume.pdf")}>Resume</a>
    </main>
  );
}
