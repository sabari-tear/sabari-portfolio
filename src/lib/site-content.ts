import rawContent from "../../content/site/site-content.json";

export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  years: string;
  role: string;
  company?: string;
  href?: string;
  description: string;
  technologies: string[];
};

export type ProjectItem = {
  year: string;
  name: string;
  company?: string;
  href?: string;
  technologies: string[];
  summary?: string;
  image?: string;
  linkLabel?: string;
};

export type SiteContent = {
  site: {
    name: string;
    role: string;
    intro: string;
    phone: string;
    email: string;
    resumePath: string;
    authorAvatar: string;
  };
  seo: {
    home: { title: string; description: string };
    blog: { title: string; description: string };
    archive: { title: string; description: string };
  };
  navigation: {
    about: string;
    experience: string;
    projects: string;
  };
  labels: {
    allPosts: string;
    allProjects: string;
    viewFull: string;
    resume: string;
    projectArchive: string;
    viewAll: string;
    posts: string;
    readMore: string;
    followMe: string;
    blog: string;
    home: string;
  };
  socialLinks: SocialLink[];
  aboutParagraphs: string[];
  aboutInteractive: {
    prefix: string;
    movies: { text: string; href: string };
    middle: string;
    shows: { text: string; href: string };
    suffix: string;
  };
  experiences: ExperienceItem[];
  featuredProjects: ProjectItem[];
  archiveProjects: ProjectItem[];
};

export const siteContent = rawContent as SiteContent;
