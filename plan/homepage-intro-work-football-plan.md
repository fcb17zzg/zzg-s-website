# 首页自我介绍改版实施计划（已落地，2026-03-03）

## 目标
- 首页从占位信息升级为正式个人主页介绍，突出系统与网络方向。
- 首页不展示项目卡片，改为“工作 + 足球”两块核心信息。
- 爱好调整为：音乐、足球、吉他、电影、游戏。
- 工作经历仅保留安恒信息，并精炼职责。
- 足球内容使用不规则叠放图墙，去除图片描述文本并加入动画效果。

## 已完成改动
- 数据层（`lib/data.ts`）
  - 更新 `profile`：姓名、标题、简介、标签。
  - 更新 `techStack`：按简历重写并包含 `DPDK`，且将 `C++11/14` 调整为 `C++`。
  - 更新 `hobbies`：音乐、足球、吉他、电影、游戏。
  - 新增 `workExperience`：安恒信息岗位、职责要点、技术栈（含 `StrongSwan / VPP / DPDK / IKE/IPsec`）。
  - 新增 `footballGallery`：仅保留 `title + images`（无说明、无 caption）。

- 类型层（`lib/types.ts`）
  - 新增 `WorkExperience`、`FootballGalleryImage`、`FootballGallery`。
  - 根据最新需求移除足球 `description` 与图片 `caption` 字段。

- 组件层
  - 新增 `components/home/WorkExperience.tsx`：展示安恒工作内容与关键词。
  - 新增 `components/home/FootballGallery.tsx`：
    - 不规则旋转叠放样式；
    - 动画与悬停交互（回正、抬升、轻微缩放）；
    - 不显示图片描述。
  - 修改 `app/page.tsx`：
    - 首页顺序改为 `Hero -> TechStack -> WorkExperience -> FootballGallery -> Hobbies`；
    - 移除 `Projects` 区块渲染。

## 图片约定
- 默认路径：
  - `/images/football/team-1.jpg`
  - `/images/football/team-2.jpg`
  - `/images/football/team-3.jpg`
- 存放目录：`public/images/football/`

## 验收结果
- [x] 首页不再展示项目区块。
- [x] 自我介绍文案已替换为正式版本。
- [x] 爱好准确展示 5 项：音乐、足球、吉他、电影、游戏。
- [x] 工作区块仅展示安恒信息内容。
- [x] 足球区块为不规则叠放样式且不展示图片描述。
- [x] `npm run lint` 通过（仅保留历史 `img` warning，无 error）。
