import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/nav-target.css";
import "../styles/motion.css";
import type { ReactNode } from "react";
import { Big_Shoulders, Hanken_Grotesk, Noto_Sans_Telugu } from "next/font/google";
import { withBase } from "../lib/base-path";
import { headScript } from "../components/theme";

export const metadata = { title: "Aditya Manikanth Rao" };

const display = Big_Shoulders({ weight: "800", subsets: ["latin"], variable: "--font-display" });
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
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
