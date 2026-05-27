import { siteContent } from "./site-content";

export type { ExperienceItem, ProjectItem, SocialLink } from "./site-content";

export const socialLinks = siteContent.socialLinks;
export const aboutParagraphs = siteContent.aboutText
	.split(/\n\s*\n/)
	.filter((paragraph) => paragraph.trim().length > 0);
export const experiences = siteContent.experiences;
export const featuredProjects = siteContent.featuredProjects;
export const archiveProjects = siteContent.archiveProjects;
