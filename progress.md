# 项目进度（Progress）

更新时间：2026-02-28

## 项目概览

- 项目：个人多页面网站（Next.js App Router + TypeScript）
- 目标：内容可发布、体验可用、可部署上线
- 当前阶段：MVP 后半程（M2 完成，M3 联调中）

## 里程碑

- [x] M0：PRD 明确与访谈决策冻结
- [x] M1：布局与导航基线完成
- [x] M2：内容系统（blog/life/thoughts）打通
- [ ] M3：体验基线（移动端 + a11y + SEO）
- [ ] M4：构建通过并部署到 Vercel

## 已完成

- [x] PRD 初版完成
- [x] 访谈决策写回 PRD（视觉、导航、页面展示、社交、验收）
- [x] 新增进度文档并建立追踪结构
- [x] `package.json` 补齐 `dev/build/start/lint` 脚本
- [x] 导航配置抽离到 `lib/data.ts`
- [x] 根布局 metadata 标题更新为 `zzg's website`
- [x] 根布局语言更新为 `zh-CN`
- [x] Navbar 重构（桌面导航 + 移动端汉堡 + 社交入口 + WeChat 复制）
- [x] 高亮规则实现（前缀匹配 + 首页单独规则）
- [x] 本地 `npm run build` 构建通过（Exit Code 0）
- [x] Blog 数据层增强（frontmatter 兜底 + 日期排序健壮性）
- [x] `/blog` 列表页实现（标题/日期/摘要/标签）
- [x] `/blog/[slug]` 详情页实现（`generateStaticParams` + MDX 正文渲染）
- [x] 新增示例文章并验证静态生成产物（`/blog/hello-static-blog`）
- [x] 修复 MDX 构建依赖缺失（安装 `micromark-util-subtokenize`）
- [x] 本地 `npm run build` 再次通过（Blog 路由静态化成功）
- [x] 首页四区块实现（核心定位、技术栈、项目、爱好）
- [x] 首页路由 `/` 接入并通过静态构建验证
- [x] `/life` 时间轴页面实现（按日期分组 + 时间轴样式）
- [x] `/life` 内容渲染支持封面图与正文配图（MDX）
- [x] 补充 life 示例内容并通过构建验证（`/life` 静态生成）
- [x] `/thoughts` Tab + 列表页面实现（按 `category` 过滤）
- [x] thoughts 内容渲染支持正文配图（MDX）
- [x] 补充 thoughts 示例内容并通过构建验证
- [x] SEO 基线补充（根布局 description + 页面级 metadata）
- [x] 全站 `npm run build` 持续通过（含 Home/Blog/Life/Thoughts）
- [x] 修复 lint 流程（迁移到 ESLint flat config，`npm run lint` 可执行）
- [x] 全站自动化联调完成（lint + build）

## 进行中

- [ ] 全站联调（路由高亮、移动端导航、可访问性）

## 待办（按优先级）

1. 全站联调（路由高亮、移动端导航、可访问性）
2. 连接 Vercel 完成上线验证

## 风险与阻塞

- 当前无阻塞
- 风险：空状态策略为“直接留白”，可发现性较弱，后续可能需要回调
- 风险：`/life` 页面使用外链 `<img>`，当前 lint 为 warning（性能可优化项，非阻塞）

## 决策日志

- 2026-02-28：导航文案采用 `Home / Blog / Life / Thoughts`
- 2026-02-28：移动端采用汉堡下拉，点击菜单项自动收起
- 2026-02-28：MVP 不做页面切换动效，仅保留微交互（150~200ms）
- 2026-02-28：视觉主轴为极简理性，浅底色卡片，宽松阅读密度
- 2026-02-28：社交入口为 GitHub / LinkedIn / WeChat（复制）/ Email
- 2026-02-28：thoughts 页面采用 Tab + 列表

## 下一步（执行顺序）

- 先做手动联调（桌面/移动端/键盘可达）
- 再连接 Vercel 完成上线验证

## 新 Session 交接要点

- 内容链路已完成：`/blog`、`/life`、`/thoughts` 均可渲染并参与构建
- 自动化检查现状：`npm run build` 通过，`npm run lint` 通过（含 1 条非阻塞 warning）
- 联调重点：移动端菜单收起行为、导航高亮一致性、键盘焦点可见与可达
