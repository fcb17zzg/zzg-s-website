# 列表摘要预览 + 详情全文实现方案（2026-03-03）

## 目标
- 列表页不再显示正文全文，仅展示摘要预览。
- 详情页展示完整 Markdown 内容。
- 统一覆盖：`blog`、`life`、`thoughts`。

## 需求决策（已确认）
- 覆盖范围：三类列表统一处理。
- 截断方式：字符数 + 行数双重限制。
- 摘要来源：仅使用 frontmatter `summary`；无 `summary` 则不显示摘要。
- 交互方式：不加“阅读全文”按钮，仅标题可点击进入详情。

## 实施步骤
1. 新增统一摘要处理工具：`lib/summary.ts`
   - `truncateSummary(text, maxChars=140)`
   - 负责字符数截断并追加省略号。
2. 更新列表卡片组件：
   - `components/blog/PostCard.tsx`
   - `components/life/MomentCard.tsx`
   - `components/thoughts/ThoughtCard.tsx`
   - 改为只展示摘要，不渲染正文。
   - 摘要样式增加 3 行视觉截断（CSS line clamp）。
3. 打通详情页路由：
   - 已有：`app/blog/[slug]/page.tsx`
   - 新增：`app/life/[slug]/page.tsx`
   - 新增：`app/thoughts/[slug]/page.tsx`
   - 使用 `generateStaticParams` + `getPostBySlug`，详情页渲染全文。
4. 调整 thoughts 列表数据流：
   - `app/thoughts/page.tsx` 只用 `getAllPosts` 元数据，不再在列表读取全文。

## 验收清单
- [ ] `/blog` 列表仅显示摘要，标题可点进 `/blog/[slug]`。
- [ ] `/life` 列表仅显示摘要，标题可点进 `/life/[slug]`。
- [ ] `/thoughts` 列表仅显示摘要，标题可点进 `/thoughts/[slug]`。
- [ ] 三类详情页均显示完整 Markdown 正文。
- [ ] `npm run lint` 通过。
- [ ] `npm run build` 通过。

## 风险与后续
- 当前严格依赖 `summary` 字段；若内容作者漏填，将无摘要显示（符合本次确认）。
- 如后续希望提升内容容错，可在 `lib/mdx.ts` 增加“正文自动摘要兜底”作为第二阶段改造。
