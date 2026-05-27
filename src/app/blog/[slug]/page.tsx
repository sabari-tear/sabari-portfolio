import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SocialIconLinks } from "@/components/social-icon-links";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { siteContent } from "@/lib/site-content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | ${siteContent.site.name}'s Blog`,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-24">
      <nav className="mb-20" aria-label="breadcrumb" data-reveal>
        <ol className="flex flex-wrap">
          <li className="mr-1.5">
            <Link className="hover:text-slate-200 focus-visible:text-slate-200 cursor-pointer" href="/">
              {siteContent.labels.home}
            </Link>{" "}
            /
          </li>
        </ol>
      </nav>

      <div className="inline-flex items-center gap-5 flex-wrap" data-reveal>
        <Link className="group mb-2 inline-flex items-center font-semibold leading-tight text-blue-300" href="/blog">
          {siteContent.labels.blog}
        </Link>
        <ul className="flex flex-wrap" aria-label="Technologies Used">
          {post.tags.map((tag) => (
            <li key={tag} className="mr-1.5">
              <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-300">
                {tag}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h1 className="leading-light font-bold text-2xl lg:text-5xl tracking-widest text-slate-200" data-reveal>{post.title}</h1>

        <div className="mt-6 flex items-center justify-between text-sm border-b border-t border-slate-600 py-3" data-reveal>
          <div className="inline-flex items-center">
            {siteContent.site.name}
          </div>
          <div>{new Date(post.date).toLocaleDateString("en-US")}</div>
        </div>

        <div className="mt-8" data-animate>
          <img alt={post.title} width={1920} height={1080} className="w-full h-auto object-cover rounded-md" src={post.bannerImage} />
        </div>

        <section className="mt-6 lg:mt-20" data-animate>
          {post.content}
        </section>

        <div className="mt-20">
          <SocialIconLinks includeFollowLabel />
        </div>
      </div>
    </div>
  );
}
