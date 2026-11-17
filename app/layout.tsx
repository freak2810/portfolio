import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/motion.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import { content } from "../content";
import { withBase } from "../lib/base-path";

const addJsClass = 'document.documentElement.classList.add("js")';

const { profile, links, experience } = content;
const siteUrl = links.site;
const title = `${profile.name} | ${profile.title}`;
const description = profile.description;
const employer = experience.find((entry) => entry.roles.some((role) => role.end === "present"));
const image = { url: `${new URL(siteUrl).origin}${withBase("/og.png")}`, width: 1200, height: 630, alt: profile.name };

const personLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: profile.base.en, addressCountry: "IN" },
  sameAs: [links.github, links.linkedin],
  worksFor: employer && { "@type": "Organization", name: employer.company },
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  title,
  description,
  icons: {
    icon: [
      { url: withBase("/art/favicon.svg"), type: "image/svg+xml" },
      { url: withBase("/art/favicon-32.png"), type: "image/png", sizes: "32x32" },
    ],
    apple: { url: withBase("/art/apple-touch-icon.png"), sizes: "180x180" },
  },
  openGraph: { title, description, type: "website", url: siteUrl, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export const viewport: Viewport = { themeColor: "black" };

const display = Big_Shoulders({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-display", display: "optional" });
const body = Hanken_Grotesk({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: addJsClass }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personLd }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
