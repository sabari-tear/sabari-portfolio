import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionRuntime } from "@/components/motion-runtime";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martin Beck Andersen - Experienced Front-End Engineer | Web Developer | Technology Enthusiast",
  description:
    "Experienced Front-End Engineer skilled in React, TypeScript, HTML5, CSS3, JavaScript. Offering full-stack development, web design, and multimedia solutions. Explore my diverse portfolio and professional experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="/assets/site.css" />
      </head>
      <body className="__className_f2b945 leading-relaxed text-slate-400 antialiased selection:bg-blue-300 selection:text-blue-900">
        <MotionRuntime />
        {children}
      </body>
    </html>
  );
}
