import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/nav-target.css";
import "../styles/motion.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Big_Shoulders, Hanken_Grotesk, Noto_Sans_Telugu } from "next/font/google";
import { content } from "../content";
import { withBase } from "../lib/base-path";

const addJsClass = 'document.documentElement.classList.add("js")';

const { profile, projects } = content;
const siteUrl = projects.find((project) => project.id === "this-portfolio")?.liveUrl ?? "";
const title = `${profile.name} | ${profile.title}`;
const description = "Backend engineer and tech lead in Hyderabad. Builds distributed systems and AI agent platforms for enterprise SaaS and startups.";
const image = { url: `${new URL(siteUrl).origin}${withBase("/og.png")}`, width: 1200, height: 630, alt: profile.name };

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: siteUrl, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export const viewport: Viewport = { themeColor: "black" };

const display = Big_Shoulders({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-display" });
const body = Hanken_Grotesk({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-body" });
const telugu = Noto_Sans_Telugu({ weight: "500", subsets: ["telugu"], variable: "--font-telugu", preload: false });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${telugu.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={withBase("/art/favicon.svg")} type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: addJsClass }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
