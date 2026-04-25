# 图片画廊功能说明

本文档说明本项目中“图片画廊（Galleries）”功能的设计与使用方式。

> 当前状态：**默认关闭**（`src/config.ts` 中 `showGalleries: false`）。

---

## 1. 功能概述

画廊功能用于发布图片集合，路由形式如下：

- 列表页：`/galleries`
- 详情页：`/galleries/<slug>`

每个画廊对应 `src/data/galleries/` 下的一个文件夹，文件夹内包含：

- `index.md` 或 `index.mdx`（元数据）
- 若干图片文件（jpg/png/webp/avif/gif）

---

## 2. 相关文件

| 文件 | 作用 |
|---|---|
| `src/config.ts` | 通过 `showGalleries` 控制是否启用画廊 |
| `src/content.config.ts` | 定义 `galleries` 内容集合 schema |
| `src/components/GalleryCard.astro` | 画廊卡片组件 |
| `src/components/GalleryEmbed.astro` | 在 MDX 文章中嵌入画廊 |
| `src/pages/galleries/index.astro` | 画廊列表页（当前已移除） |
| `src/pages/galleries/[gallery].astro` | 画廊详情页（当前已移除） |
| `src/data/galleries/` | 画廊内容目录 |

---

## 3. 内容结构约定

```text
src/data/galleries/
└── my-gallery/
    ├── index.md
    ├── 01-cover.jpg
    ├── 02-detail.jpg
    └── 03-scene.png
```

规则：

- 文件夹名即路由 slug（`my-gallery` → `/galleries/my-gallery`）。
- 元数据文件必须命名为 `index.md` 或 `index.mdx`。
- 图片按文件名排序，建议使用数字前缀控制顺序。

---

## 4. Frontmatter 字段

```yaml
---
title: 我的旅行相册
description: 记录这次旅行的照片
pubDatetime: 2026-03-01T00:00:00Z
draft: false
coverImage: ./01-cover.jpg
tags:
  - 旅行
  - 摄影
---
```

字段说明：

- `title`：必填，画廊标题。
- `description`：必填，列表说明与 SEO 描述。
- `pubDatetime`：必填，发布时间。
- `draft`：可选，草稿不发布。
- `coverImage`：可选，指定封面图。
- `tags`：可选，标签列表。

---

## 5. 图片处理机制

画廊图片通过 `import.meta.glob(..., { eager: true })` 在构建期收集，然后交给 Astro 图片管线处理，获得：

- 响应式 `srcset`
- 自动优化格式（如 WebP/AVIF）
- 懒加载与尺寸信息

典型做法：

```ts
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/data/galleries/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
```

---

## 6. GalleryEmbed 用法

`GalleryEmbed` 支持在 MDX 正文中嵌入画廊（通常在 `PostDetails` 中全局注册）。

```mdx
<GalleryEmbed slug="my-gallery" />
<GalleryEmbed slug="my-gallery" limit={4} cols={2} showLink={false} />
<GalleryEmbed slug="my-gallery" limit={0} />
```

参数：

- `slug`：必填，画廊目录名。
- `limit`：显示数量，`0` 为全部。
- `cols`：列数（`2 | 3 | 4`）。
- `showLink`：是否显示“查看完整画廊”链接。

---

## 7. 启用 / 禁用

在 `src/config.ts` 中修改：

```ts
showGalleries: false
```

- `false`：隐藏入口并禁用路由生成。
- `true`：启用画廊导航与相关页面。

---

## 8. 当前项目建议

由于本站当前主线是文章内容，建议继续保持画廊关闭；若后续需要恢复：

1. 将 `showGalleries` 改为 `true`。
2. 恢复 `src/pages/galleries/*` 路由文件。
3. 准备 `src/data/galleries/*` 内容目录。
4. 执行 `pnpm run build` 验证。
