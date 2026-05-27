import type { Metadata } from "next";
import Link from "next/link";

import { ExploreSideArrows } from "@/components/explore-side-arrows";
import { ParticleHeader } from "@/components/particle-header";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Interview Experiences | ${siteContent.site.name}`,
  description: `Interview experiences and reflections from ${siteContent.site.name}.`,
};

export default function InterviewsPage() {
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
                <h1 className="text-center text-3xl font-bold leading-none tracking-tight text-slate-200 sm:text-5xl">All Interview Experiences</h1>
                <ExploreSideArrows />
              </div>
            </div>

            <div className="group/list mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none" data-animate>
              {siteContent.interviewExperiences.map((item) => (
                <div
                  key={`${item.company}-${item.role}-${item.year}`}
                  className="flex flex-col bg-slate-800/50 rounded-lg border-2 border-slate-200/10 group-hover:border-slate-200/30 shadow-lg overflow-hidden hover:shadow-xl transition-shadow lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                  data-enter
                >
                  <div className="px-6 py-6">
                    <p className="text-sm font-semibold leading-6">{item.year}</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-200">{item.role}</h2>
                    <p className="mt-1 text-sm text-slate-400">{item.company}</p>
                    <p className="mt-4 text-base">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
