# Content Editing Guide

## Quick edits (recommended)

1. Edit site content in `content/site/site-content.json`
2. Edit blog posts in `content/blog/*.mdx`
3. Put images in `public/assets/images`
4. Run `npm run build` to validate

## What to edit where

- Hero, contact info, labels, social links, experience, projects:
  - `content/site/site-content.json`
- Blog posts:
  - `content/blog/*.mdx`
- Resume file:
  - `public/resume.pdf`

## Create a new blog post

1. Add a new file in `content/blog`, for example `my-new-post.mdx`
2. Use this template:

```mdx
---
title: "Post title"
date: "2026-05-27"
summary: "Short summary shown in cards."
tags:
  - tag-1
  - tag-2
metaDescription: "SEO meta description."
image: "/assets/images/my-thumb.jpg"
bannerImage: "/assets/images/my-banner.jpg"
---

## Section heading

Your content here.
```

## CMS UI (Production Ready with Vercel)

The CMS is available at /admin and is configured for GitHub OAuth through a Vercel API route.

### One-time Vercel + GitHub setup

1. Deploy this project to Vercel from your GitHub repository.
2. Open public/admin/config.yml and set:
  - backend.repo to your GitHub repo, for example your-org/your-repo
  - backend.base_url to your deployed origin, for example https://your-site.vercel.app
3. Create a GitHub OAuth App in GitHub Developer Settings.
4. Set Authorization callback URL to:
  - https://your-site.vercel.app/api/auth
5. In Vercel Project Settings -> Environment Variables, add:
  - GITHUB_OAUTH_CLIENT_ID
  - GITHUB_OAUTH_CLIENT_SECRET
6. Redeploy the project.
7. Open /admin on your deployed site and sign in with GitHub.

After this, CMS edits create commits and editorial workflow entries directly in your GitHub repo.

### Local testing

1. Run npm run dev
2. Open /admin
3. Local backend support is enabled in public/admin/config.yml
