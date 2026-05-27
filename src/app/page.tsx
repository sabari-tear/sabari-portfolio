import type { Metadata } from "next";
import Link from "next/link";

import { ParticleHeader } from "@/components/particle-header";
import { SocialIconLinks } from "@/components/social-icon-links";
import { siteContent } from "@/lib/site-content";

const { experiences, featuredProjects } = siteContent;

function ExternalArrowIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: siteContent.seo.home.title,
  description: siteContent.seo.home.description,
};

function renderBoldMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={`about-bold-${index}`} className="font-semibold text-slate-200">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function Home() {
  return (
    <main>
      <div className="min-h-screen">
        <div id="__next">
          <div className="group/spotlight relative">
            <div
              className="spotlight-layer pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
            />

            <ParticleHeader />

            <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
              <div className="lg:flex lg:justify-between lg:gap-4">
                <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                  <div id="namecard-block">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                      <Link className="cursor-pointer" href="/">
                        {siteContent.site.name}
                      </Link>
                    </h1>
                    <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                      {siteContent.site.role}
                    </h2>
                    <p className="mt-4 max-w-xs leading-normal">
                      {siteContent.site.intro}
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center mt-4 small_laptop_hidden">
                        <span className="inline-block">{siteContent.site.phone}</span>
                      </div>
                      <div className="flex items-center mt-2 small_laptop_hidden">
                        <span className="inline-block">
                          <a className="hover:text-slate-200" href={`mailto:${siteContent.site.email}`}>
                            {siteContent.site.email}
                          </a>
                        </span>
                      </div>
                      <SocialIconLinks />
                    </div>

                    <nav className="nav hidden lg:block">
                      <ul className="mt-16 w-max">
                        <li>
                          <a id="about-nav" className="group flex items-center py-3 cursor-pointer active" href="#about">
                            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{siteContent.navigation.about}</span>
                          </a>
                        </li>
                        <li>
                          <a id="experience-nav" className="group flex items-center py-3 cursor-pointer" href="#experience">
                            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{siteContent.navigation.experience}</span>
                          </a>
                        </li>
                        <li>
                          <a id="projects-nav" className="group flex items-center py-3 cursor-pointer" href="#projects">
                            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{siteContent.navigation.projects}</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <blockquote className="namecard-quote max-w-xs border-l border-slate-700/60 pl-4 text-xs italic leading-relaxed text-slate-500">
                    {siteContent.labels.bottomQuote}
                  </blockquote>
                </header>

                <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
                  <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About Me">
                    <div id="about-content">
                      {siteContent.aboutText
                        .split(/\n\s*\n/)
                        .filter((paragraph) => paragraph.trim().length > 0)
                        .map((paragraph, index) => (
                          <p key={`about-${index}`} className="mb-4" data-reveal>
                            {renderBoldMarkdown(paragraph)}
                          </p>
                        ))}
                    </div>
                  </section>

                  <div className="section-divider" aria-hidden="true" />

                  <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work Experience">
                    <div>
                      <ol className="group/list">
                        {experiences.map((experience) => (
                          <li key={`${experience.years}-${experience.role}`} className="mb-12" data-reveal>
                            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                                {experience.years}
                              </header>
                              <div className="z-10 sm:col-span-6">
                                <h3 className="font-medium leading-snug text-slate-200">
                                  <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">
                                    <span>{experience.role}{experience.company ? " · " : ""}</span>
                                    {experience.company ? experience.company : null}
                                  </span>
                                </h3>
                                <p className="mt-2 text-sm leading-normal">{experience.description}</p>
                                <ul className="mt-2 flex flex-wrap" aria-label="Technologies Used">
                                  {experience.technologies.map((tag) => (
                                    <li key={`${experience.role}-${tag}`} className="mr-1.5 mt-2">
                                      <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-300">
                                        {tag}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-12">
                        <a className="inline-flex items-center leading-tight font-semibold text-slate-200 group cursor-pointer" target="_blank" aria-label={`View Full ${siteContent.labels.resume}`} href={siteContent.site.resumePath} rel="noreferrer">
                          <span>
                            <span className="border-b border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">{siteContent.labels.viewFull}&nbsp;</span>
                            <span className="whitespace-nowrap">
                              <span className="border-b border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">{siteContent.labels.resume}</span>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="48" d="M268 112l144 144-144 144m124-144H100" /></svg>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </section>

                  <div className="section-divider" aria-hidden="true" />

                  <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected Projects">
                    <div>
                      <ol className="group/list">
                        {featuredProjects.map((project) => (
                          <li key={`${project.year}-${project.name}`} className="mb-12" data-reveal>
                            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                              <div className="z-10 sm:order-2 sm:col-span-6">
                                <h3>
                                  {project.href ? (
                                    <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-blue-300 focus-visible:text-blue-300 group/link text-base" target="_blank" aria-label={project.name} href={project.href} rel="noreferrer">
                                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                      <span>{project.name}</span>
                                      <span className="inline-block"><ExternalArrowIcon /></span>
                                    </a>
                                  ) : (
                                    <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base">{project.name}</span>
                                  )}
                                </h3>
                                {project.summary ? <p className="mt-2 text-sm leading-normal">{project.summary}</p> : null}
                                <ul className="mt-2 flex flex-wrap" aria-label="Technologies Used">
                                  {project.technologies.map((tag) => (
                                    <li key={`${project.name}-${tag}`} className="mr-1.5 mt-2">
                                      <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-300">
                                        {tag}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {project.image ? (
                                <img
                                  alt={project.name}
                                  width={200}
                                  height={48}
                                  className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                                  src={project.image}
                                />
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-12">
                        <Link className="inline-flex items-center leading-tight font-semibold text-slate-200 group cursor-pointer" aria-label="View Full Project Archive" href="/archive">
                          <span>
                            <span className="border-b border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">{siteContent.labels.viewFull}&nbsp;</span>
                            <span className="whitespace-nowrap">
                              <span className="border-b border-transparent pb-px transition group-hover:border-blue-300 motion-reduce:transition-none">{siteContent.labels.projectArchive}</span>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="48" d="M268 112l144 144-144 144m124-144H100" /></svg>
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </section>

                  <div className="section-divider" aria-hidden="true" />

                  <section id="explore-more" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Explore more">
                    <div>
                      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500">Explore More</h2>
                      <div className="grid gap-3 sm:grid-cols-2" data-reveal>
                        <Link className="group rounded-md border border-slate-700/60 bg-slate-900/30 px-4 py-3 transition hover:border-blue-300/60 hover:bg-slate-800/60" href="/blog">
                          <span className="text-sm font-medium text-slate-200">Posts</span>
                          <span className="ml-2 inline-block text-blue-300"><ExternalArrowIcon /></span>
                        </Link>
                        <Link className="group rounded-md border border-slate-700/60 bg-slate-900/30 px-4 py-3 transition hover:border-blue-300/60 hover:bg-slate-800/60" href="/books">
                          <span className="text-sm font-medium text-slate-200">Books</span>
                          <span className="ml-2 inline-block text-blue-300"><ExternalArrowIcon /></span>
                        </Link>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
