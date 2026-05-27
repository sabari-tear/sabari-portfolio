import type { Metadata } from "next";
import Link from "next/link";

import { ExploreSideArrows } from "@/components/explore-side-arrows";
import { ParticleHeader } from "@/components/particle-header";
import { getAllPostsMeta } from "@/lib/blog";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: siteContent.seo.blog.title,
  description: siteContent.seo.blog.description,
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

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
            <div className="flex justify-center" data-reveal>
              <div className="inline-flex items-center justify-center gap-3 whitespace-nowrap">
                <h1 className="text-center text-3xl font-bold leading-none tracking-tight text-slate-200 sm:text-5xl">{siteContent.labels.allPosts}</h1>
                <ExploreSideArrows />
              </div>
            </div>

            <div className="group/list mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none" data-animate>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="flex flex-col bg-slate-800/50 rounded-lg border-2 border-slate-200/10 group-hover:border-slate-200/30 shadow-lg overflow-hidden hover:shadow-xl transition-shadow lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                  data-enter
                >
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="font-medium leading-snug text-slate-200">
                      <div>
                        <Link className="items-baseline font-medium leading-tight text-slate-200 hover:text-blue-300 focus-visible:text-blue-300 text-base" aria-label={post.title} href={`/blog/${post.slug}`}>
                          <img alt={post.title} width={352} height={192} className="w-full object-cover" src={post.image} />
                          <div>
                            <div>
                              <span className="block mt-2 text-xl font-semibold py-2 px-6">{post.title}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </h3>

                    <div className="px-6">
                      <p className="mt-3 text-base">{post.summary}</p>
                      <div className="flex mt-12 items-center justify-between py-6">
                        <div className="text-sm">{new Date(post.date).toLocaleDateString("en-US")}</div>
                        <div className="flex-shrink-0">
                          <Link
                            className="block rounded bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 px-2 py-1 text-sm tracking-widest text-white cursor-pointer lg:hover:from-blue-500 lg:hover:via-blue-600 lg:hover:to-purple-700"
                            aria-label={`Read more about ${post.title}`}
                            href={`/blog/${post.slug}`}
                          >
                            {siteContent.labels.readMore}
                          </Link>
                        </div>
                      </div>
                    </div>
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
