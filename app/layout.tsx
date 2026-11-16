import "../styles/tokens.css";
import "../styles/base.css";
import type { ReactNode } from "react";
import { Big_Shoulders, Hanken_Grotesk, Noto_Sans_Telugu } from "next/font/google";

export const metadata = { title: "Aditya Manikanth Rao" };

const display = Big_Shoulders({ weight: "800", subsets: ["latin"], variable: "--font-display" });
const body = Hanken_Grotesk({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-body" });
const telugu = Noto_Sans_Telugu({ weight: "500", subsets: ["telugu"], variable: "--font-telugu", preload: false });

const addJsClass = 'document.documentElement.classList.add("js")';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${telugu.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: addJsClass }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
