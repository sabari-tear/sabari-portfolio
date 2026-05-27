import identityRaw from "../../content/site/identity.json";
import settingsRaw from "../../content/site/settings.json";
import aboutRaw from "../../content/site/about.json";
import experienceRaw from "../../content/site/experience.json";
import projectsRaw from "../../content/site/projects.json";

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
  aboutText: string;
  aboutHighlights: string[];
  experiences: ExperienceItem[];
  featuredProjects: ProjectItem[];
  archiveProjects: ProjectItem[];
};

export const siteContent: SiteContent = {
  ...identityRaw,
  ...settingsRaw,
  ...aboutRaw,
  ...experienceRaw,
  ...projectsRaw,
};
