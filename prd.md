# 个人网站 PRD 规划

## Context

为个人品牌形象与内容分享搭建一个多页面个人网站，展示专业能力、记录生活思考、提供联系渠道。项目从零开始，技术栈已确定。

---

## 技术栈

- **框架**: Next.js (App Router) + TypeScript
- **样式**: Tailwind CSS + `@tailwindcss/typography`
- **内容管理**: Markdown 文件 + `gray-matter` + `next-mdx-remote`
- **部署**: Vercel（静态生成，免费套餐）

---

## 页面结构

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 主页 | 个人简历式，含简介/技术栈/项目/爱好 |
| `/blog` | 技术博客 | 文章列表 + `/blog/[slug]` 详情页 |
| `/life` | 生活分享 | 类朋友圈动态，无详情页 |
| `/thoughts` | 随想与推荐 | 顶部分类切换（Tab）+ 列表 |

---

## 项目目录结构

```
my_personal_page/
├── app/
│   ├── layout.tsx              # 根布局，含 Navbar
│   ├── page.tsx                # 主页
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── life/page.tsx
│   └── thoughts/page.tsx
├── components/
│   ├── layout/Navbar.tsx
│   ├── home/                   # Hero, TechStack, Projects, Hobbies
│   ├── blog/                   # PostCard, PostBody
│   ├── life/MomentCard.tsx
│   └── thoughts/ThoughtCard.tsx
├── content/
│   ├── blog/
│   ├── life/
│   └── thoughts/
├── lib/
│   ├── mdx.ts                  # getAllPosts / getPostBySlug
│   ├── data.ts                 # 主页硬编码数据
│   └── types.ts
└── public/images/
```

---

## Markdown frontmatter 约定

```
---
title: "标题"
date: "2026-02-28"
tags: ["tag1"]
summary: "摘要"
category: "book|movie|music|idea"  # thoughts 页专用
---
```

---

## 数据读取（`lib/mdx.ts`）

- `getAllPosts(type)` — 读取目录下所有 `.md`，返回元数据列表
- `getPostBySlug(type, slug)` — 读取单篇完整内容
- 使用 `generateStaticParams` 预生成所有博客详情页（完全静态）
- 主页数据硬编码在 `lib/data.ts`

---

## 视觉风格

- 参考 https://www.qzq.at/ — 简洁、现代、大量留白
- 白底 + 深灰文字 + 极少强调色
- 中文字体优先：`-apple-system, "PingFang SC", "Microsoft YaHei"`
- Markdown 内容区使用 `prose prose-neutral` 类
- 动画效果（Framer Motion）非 MVP，后续迭代加入
- MVP 允许轻量微交互（hover/focus 150~200ms），不做页面切换动效

---

## 开发优先级（MVP）

1. 初始化项目 + 安装依赖 + 配置 Tailwind
2. 实现 `Navbar` + 根 `layout.tsx`
3. 实现 `lib/mdx.ts` 数据层
4. 打通 `/blog` 列表页和详情页
5. 实现主页四个区块
6. 实现 `/life` 和 `/thoughts` 页面
7. 推送 GitHub + 连接 Vercel 部署

---

## 关键依赖

```
gray-matter
next-mdx-remote
@tailwindcss/typography
```

---

## 验证方式

- `npm run dev` 本地访问四个路由均正常渲染
- `npm run build` 构建成功，所有博客页静态生成
- 推送到 GitHub 后 Vercel 自动部署成功，线上访问正常

---

## 访谈确认版（2026-02-28）

### 1) 导航与布局规范

- 顶部导航文案：`Home / Blog / Life / Thoughts`
- 导航信息架构：四个主路由均为“页面切换”，非单页锚点跳转
- 导航激活规则：前缀匹配 + 首页单独规则
	- `/` 仅在首页高亮
	- `/blog/[slug]` 归属 `Blog`
	- `/life/*`、`/thoughts/*` 按前缀归属
- 移动端：汉堡菜单，点击后展示下拉覆盖面板
- 移动端交互：点击任意菜单项后自动收起
- 可访问性最低标准（MVP）
	- 导航区域语义标签（如 `aria-label`）
	- 当前页标识（`aria-current="page"`）
	- 键盘可达与可见 focus 状态

### 2) 视觉系统冻结

- 整体气质：极简理性（大留白、低对比、信息克制）
- 强调策略：轻微颜色变化 + 字重变化
- 卡片策略：首页中后段采用”非常浅底色卡片”
- 动效边界：仅保留 hover/focus 微交互；页面切换动效后置
- 阅读密度：宽松（更大行高和段间距）

### 视觉系统 v2（2026-02-28 迭代）

- 整体气质升级为”温暖生活感”：暖米色底 + 暖棕文字 + 鼠尾草绿强调色
- 颜色系统：`warm-*`（背景层次）+ `ink-*`（文字层次）+ `sage-*`（强调色）
- 字体：Lora（serif，标题）+ Inter（sans，正文）+ 中文 fallback PingFang SC
- 动画：CSS 原生弹性 fade-up 入场（cubic-bezier 过冲感）+ stagger 列表 + 卡片 hover 上浮
- 导航：sticky + backdrop-blur，激活态用 sage 绿下划线
- 卡片：rounded-2xl，warm-100 底色，shadow-sm → hover:shadow-lg
- 强调色：鼠尾草绿（sage）用于链接、分类 badge、项目标签
- 头像：next/image 加载 /images/个人头像.jpg，圆形 + warm-300 描边
- 无需新增 npm 依赖

### 3) 页面级展示规范

#### `/` 主页

- 首屏结构：一句核心定位 + 头像 + 个性标签 + 简短自我介绍
- 中后段：混合式编排（头部叙事 + 卡片信息区块）

#### `/blog` 列表页

- 单列列表卡片
- 字段：标题 + 日期 + 摘要 + 标签

#### `/blog/[slug]` 详情页

- 窄栏正文（`prose`）
- 顶部展示元信息（标题、日期、标签）

#### `/life` 页面

- 时间轴式展示，按日期分组
- 支持封面图
- 正文支持配图

#### `/thoughts` 页面

- 顶部分类切换（Tab）+ 列表
- 文本优先
- 正文支持配图

#### 空状态策略

- 当前决策：无内容时直接留白（不展示空状态组件）
- 风险备注：可发现性较弱，后续可迭代为空状态文案

### 4) 社交入口与元信息

- 顶部社交入口：`GitHub / LinkedIn / WeChat / Email`
- WeChat 展示方式：点击复制微信号 `FCB_REAL_MUCHEN`
- 基础 metadata
	- `title`: `zzg's website`
	- `description`: 后续补充

### 5) 体验与验收补充

- 必须通过
	- 四个主路由可达且高亮正确
	- 移动端汉堡展开/收起正确，不遮挡关键内容
	- 键盘可操作与焦点可见
	- 构建通过且无 hydration 问题
- 参考策略
	- 对 qzq.at 采用“弱参考”：仅借鉴留白与排版节奏，不复制其信息架构

### 6) 实施策略

- 执行节奏：严格按 MVP 顺序逐步验收
- 取舍原则：优先保证可用性与可访问性，视觉细节后置
- 维护性：导航与社交入口配置集中管理（`lib/data.ts`）
