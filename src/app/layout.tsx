import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionRuntime } from "@/components/motion-runtime";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteContent.seo.home.title,
  description: siteContent.seo.home.description,
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
