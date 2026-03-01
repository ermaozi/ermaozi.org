# Ermaozi Blog

基于 [AstroPaper](https://github.com/satnaing/astro-paper) 深度定制的个人博客，当前站点为 [ermaozi.org](https://ermaozi.org)。

![Ermaozi OG](public/ermaozi-og.webp)

---

## 项目简介

- 主要内容：机场评测、科学上网实践、工具教程。
- 技术栈：Astro 5 + TypeScript + Tailwind CSS + Pagefind。
- 风格特性：终端风视觉、全局搜索、卡片光效、时间线归档。

---

## 目录结构

```text
/
├── public/
│   ├── audio/                # 音频资源
│   └── pagefind/             # 构建后生成的搜索索引
├── src/
│   ├── assets/               # 字体、图标、Logo
│   ├── components/           # 组件
│   ├── data/
│   │   └── blog/             # 文章内容（.md/.mdx）
│   ├── layouts/              # 页面布局
│   ├── pages/                # 路由页面
│   ├── styles/               # 全局样式与排版
│   └── utils/                # 工具函数
├── astro.config.ts
└── src/config.ts
```

---

## 本地开发

**环境要求**

- Node.js 20+
- pnpm

**安装依赖**

```bash
pnpm install
```

**启动开发环境**

```bash
pnpm run dev
```

默认访问：`http://localhost:4321`

---

## 常用命令

| 命令 | 说明 |
|---|---|
| `pnpm install` | 安装依赖 |
| `pnpm run dev` | 启动开发服务 |
| `pnpm run build` | 生产构建（含 `astro check` 与 Pagefind 索引） |
| `pnpm run preview` | 预览构建产物 |
| `pnpm run lint` | 运行 ESLint |
| `pnpm run format` | 使用 Prettier 格式化 |

---

## 内容发布

### 文章目录

文章放在 `src/data/blog/`，支持 `.md` 和 `.mdx`。

### Frontmatter 示例

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDatetime: 2026-03-01T08:00:00Z
tags: ["机场", "教程"]
draft: false
featured: false
---
```

### 说明

- `pubDatetime` 建议使用 ISO 8601。
- `draft: true` 的文章不会在生产环境展示。
- 可在正文加入 `## Table of contents` 自动生成目录。

---

## 搜索功能

- 由 Pagefind 提供静态搜索索引。
- 支持页面搜索与快捷键弹窗（`⌘K` / `Ctrl+K`）。
- 搜索索引在 `pnpm run build` 时生成到 `dist/pagefind`，并复制到 `public/pagefind`。

---

## 画廊功能说明

- 项目保留画廊能力，但当前默认关闭（`showGalleries: false`）。
- 如需启用，可参考 [GALLERIES.md](GALLERIES.md) 并恢复对应路由。

---

## 站点配置

核心配置位于 `src/config.ts`：

- 站点地址：`https://ermaozi.org/`
- 作者：`Ermaozi`
- 语言：`zh-CN`
- 时区：`Asia/Shanghai`

---

## Docker（可选）

```bash
docker build -t ermaozi-blog .
docker run -p 4321:80 ermaozi-blog
```

---

## 许可

项目遵循仓库中的许可证文件。
