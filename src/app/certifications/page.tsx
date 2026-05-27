import type { Metadata } from "next";
import Link from "next/link";

import { ExploreSideArrows } from "@/components/explore-side-arrows";
import { ParticleHeader } from "@/components/particle-header";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Certifications Archive | ${siteContent.site.name}`,
  description: `Course certifications completed by ${siteContent.site.name}.`,
};

export default function CertificationsPage() {
  return (
    <div id="__next">
      <div className="group/spotlight relative">
        <div className="spotlight-layer pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" />

        <ParticleHeader />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:py-24">
            <Link className="group mb-2 inline-flex items-center font-semibold leading-tight text-blue-300" href="/">
              {siteContent.site.name}
            </Link>
            <div className="flex justify-center" data-reveal>
              <div className="inline-flex items-center justify-center gap-3 whitespace-nowrap">
                <h1 className="text-center text-3xl font-bold leading-none tracking-tight text-slate-200 sm:text-5xl">Certifications Archive</h1>
                <ExploreSideArrows />
              </div>
            </div>

            <table id="content" className="mt-12 w-full border-collapse text-left" data-animate>
              <thead className="sticky top-0 z-10 border-b border-slate-300/10 px-6 py-5 backdrop-blur">
                <tr>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Certification</th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Issuer</th>
                </tr>
              </thead>
              <tbody className="group/list">
                {siteContent.certifications.map((cert) => (
                  <tr key={`${cert.name}-${cert.year}`} className="border-b border-slate-300/10 last:border-none lg:hover:!opacity-100 lg:group-hover/list:opacity-50 transition-all" data-reveal>
                    <td className="py-4 pr-4 align-top text-sm">{cert.year}</td>
                    <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">{cert.name}</td>
                    <td className="py-4 pr-4 align-top text-sm">{cert.issuer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
