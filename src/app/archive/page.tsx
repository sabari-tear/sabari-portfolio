import type { Metadata } from "next";
import Link from "next/link";

import { ParticleHeader } from "@/components/particle-header";
import { siteContent } from "@/lib/site-content";

const { archiveProjects } = siteContent;

export const metadata: Metadata = {
  title: siteContent.seo.archive.title,
  description: siteContent.seo.archive.description,
};

export default function ArchivePage() {
  return (
    <div id="__next">
      <div className="group/spotlight relative">
        <div
          className="spotlight-layer pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        />

        <ParticleHeader />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:py-24">
            <Link className="group mb-2 inline-flex items-center font-semibold leading-tight text-blue-300" href="/">
              {siteContent.site.name}
            </Link>

            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">{siteContent.labels.allProjects}</h1>

            <table id="content" className="mt-12 w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 border-b border-slate-300/10 px-6 py-5 backdrop-blur">
                <tr>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">Made at</th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">Built with</th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">Link</th>
                </tr>
              </thead>
              <tbody className="group/list">
                {archiveProjects.map((project) => (
                  <tr key={`${project.year}-${project.name}`} className="border-b border-slate-300/10 last:border-none lg:hover:!opacity-100 lg:group-hover/list:opacity-50 transition-all" data-reveal>
                    <td className="py-4 pr-4 align-top text-sm">
                      <div className="translate-y-px">{project.year}</div>
                    </td>
                    <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                      <div className="hidden sm:block">{project.name}</div>
                      <div className="block sm:hidden">
                        {project.href ? (
                          <a target="_blank" rel="noreferrer" className="inline-flex items-baseline text-sm font-medium leading-tight hover:text-blue-300 focus-visible:text-blue-300 group/link cursor-pointer" href={project.href}>
                            <span>{project.name}</span>
                          </a>
                        ) : (
                          <span>{project.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
                      <div className="translate-y-px whitespace-nowrap">{project.company ?? ""}</div>
                    </td>
                    <td className="hidden py-4 pr-4 align-top lg:table-cell">
                      <ul className="flex -translate-y-1.5 flex-wrap">
                        {project.technologies.map((tech) => (
                          <li key={`${project.name}-${tech}`} className="my-1 mr-1.5">
                            <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-300">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="hidden py-4 align-top sm:table-cell">
                      <ul className="translate-y-1">
                        <li className="mb-1 flex items-center">
                          {project.href && project.linkLabel ? (
                            <a target="_blank" rel="noreferrer" className="inline-flex items-baseline text-sm font-medium leading-tight hover:text-blue-300 focus-visible:text-blue-300 group/link" href={project.href}>
                              <span>{project.linkLabel}</span>
                            </a>
                          ) : null}
                        </li>
                      </ul>
                    </td>
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
