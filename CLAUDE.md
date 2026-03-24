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

## 发布文章必要格式（Agent 执行版）

以下规则用于在 `content/` 下新增文章时保持可被页面正确读取与渲染。

### 1) 文件名规则（slug）

- 文件必须放在以下目录之一：
	- `content/blog/`
	- `content/life/`
	- `content/thoughts/`
- 文件扩展名必须是 `.md`。
- slug 直接来自文件名（去掉 `.md`），例如：
	- `content/blog/hello-static-blog.md` -> slug: `hello-static-blog`
	- `content/thoughts/atomic-habits-afterword.md` -> slug: `atomic-habits-afterword`
- 建议使用小写英文和连字符（kebab-case），避免空格和特殊字符，以保证 URL 稳定。

### 2) 头部格式（第 1-6 行）

所有文章必须以 YAML frontmatter 开头，行号结构如下：

1. `---`
2. `title: "..."`
3. `date: "YYYY-MM-DD"`
4. `summary: "..."`
5. 类型专属字段（见下）
6. `---`

按内容类型使用第 5 行字段：

- Blog (`content/blog`):
	- 第 5 行写 `tags: ["tag1", "tag2"]`
- Life (`content/life`):
	- 第 5 行写 `cover: "图片URL或站内路径"`
- Thoughts (`content/thoughts`):
	- 第 5 行写 `category: "book|movie|music|idea"`

模板示例：

```md
---
title: "文章标题"
date: "2026-03-24"
summary: "一句话摘要"
tags: ["nextjs", "mdx"]
---
```

```md
---
title: "生活标题"
date: "2026-03-24"
summary: "一句话摘要"
cover: "/images/life/xxx.jpg"
---
```

```md
---
title: "思考标题"
date: "2026-03-24"
summary: "一句话摘要"
category: "book"
---
```

### 3) 图片放置与引用规则

- 站内图片放在 `public/images/` 下，推荐按类型分目录：
	- `public/images/blog/`
	- `public/images/life/`
	- `public/images/thoughts/`
- Markdown 正文内图片使用绝对站内路径（从 `/images/...` 开始）：
	- `![说明](/images/thoughts/atomic-habits-loop.png)`
- `life` 类型封面图优先使用 `cover` 字段；正文图片仍可用 Markdown `![alt](url)` 插入。
- `blog` 与 `thoughts` 类型没有独立封面字段要求，正文图片直接放在文章内容中。

### 4) 渲染相关注意事项

- 正文通过 `MDXRemote` 渲染，标准 Markdown 语法（标题、列表、图片、代码块）可直接使用。
- `date` 应使用可被 `Date.parse` 正常解析的格式（推荐 `YYYY-MM-DD`），否则会影响排序。

### 5) 发文后 Git 同步规则

- 每次新增或修改文章后，执行 Git 同步流程（`add` -> `commit` -> `push`）。
- `commit message` 必须使用中文，清晰描述本次文章更新内容。
