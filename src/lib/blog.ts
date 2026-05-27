import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostFrontmatter = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  metaDescription: string;
  image: string;
  bannerImage: string;
};

export type BlogPostListItem = BlogPostFrontmatter;

export type BlogPost = BlogPostFrontmatter & {
  content: React.ReactNode;
};

async function getPostFileNames(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.mdx$/, "");
}

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPostsMeta(): Promise<BlogPostListItem[]> {
  const fileNames = await getPostFileNames();

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = toSlug(fileName);
      const fullPath = path.join(BLOG_DIR, fileName);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        summary: String(data.summary),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        metaDescription: String(data.metaDescription),
        image: String(data.image),
        bannerImage: String(data.bannerImage),
      } satisfies BlogPostListItem;
    }),
  );

  return sortByDateDesc(posts);
}

export async function getPostSlugs(): Promise<string[]> {
  const fileNames = await getPostFileNames();
  return fileNames.map(toSlug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const source = await fs.readFile(fullPath, "utf8");
    const { content, frontmatter } = await compileMDX<BlogPostFrontmatter>({
      source,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary,
      tags: frontmatter.tags,
      metaDescription: frontmatter.metaDescription,
      image: frontmatter.image,
      bannerImage: frontmatter.bannerImage,
      content,
    };
  } catch {
    return null;
  }
}
