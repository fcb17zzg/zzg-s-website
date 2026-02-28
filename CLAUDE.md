# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (static generation)
npm run lint     # ESLint (flat config)
```

No test suite is configured.

## Architecture

Next.js 15 App Router site with three content types: blog, life, thoughts. All content is Markdown files in `content/` parsed at build time into statically generated pages.

**Data flow:**
- `lib/data.ts` — all hardcoded site config (profile, nav, social links, projects, tech stack)
- `lib/mdx.ts` — `getAllPosts(type)` and `getPostBySlug(type, slug)` read from `content/{type}/`
- `lib/types.ts` — shared TypeScript interfaces

**Content frontmatter by type:**
- `content/blog/` — `title`, `date`, `tags`, `summary`
- `content/life/` — `title`, `date`, `cover`, `summary`
- `content/thoughts/` — `title`, `date`, `category` (`book|movie|music|idea`), `summary`

**Routing:**
- `/blog/[slug]` uses `generateStaticParams()` for static generation at build time
- `/life` and `/thoughts` are fully static (no dynamic segments)

**Styling:** Tailwind CSS 4 with `@tailwindcss/typography` (`prose prose-neutral`) for Markdown rendering. Chinese-first font stack (`PingFang SC`, `Microsoft YaHei`).

**Deployment:** Vercel. Live at `https://mypersonalpage-swart.vercel.app`. Manual deploy (no GitHub auto-deploy configured yet).
