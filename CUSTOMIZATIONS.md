# 自定义改造记录

本文档用于记录本项目相对于上游主题的核心改造点，便于后续维护与回溯。

---

## 1. 全局品牌与站点身份

- 站点域名统一为 `ermaozi.org`。
- 作者统一为 `Ermaozi`。
- 社交与联系信息统一替换为当前可用联系方式。
- Logo 资源切换为 `src/assets/logo/ermaozi.svg`，并在页头/页脚接入。

涉及文件：

- `src/config.ts`
- `src/constants.ts`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/assets/logo/ermaozi.svg`

---

## 2. 文章内容源同步

- 已将 `ermao.org` 的文章同步到当前站点 `src/data/blog/`。
- frontmatter 字段已做兼容处理：
  - `pubDate` → `pubDatetime`
  - `image` → `ogImage`
- 为兼容字符串日期，内容集合 schema 使用 `z.coerce.date()`。

涉及文件：

- `src/data/blog/*`
- `src/content.config.ts`

---

## 3. 页面与功能清理

- 删除不需要的画廊页面路由。
- 配置中关闭 `showGalleries`。
- 仅保留当前站点实际需要的内容结构与入口。

涉及文件：

- `src/pages/galleries/index.astro`（已删除）
- `src/pages/galleries/[gallery].astro`（已删除）
- `src/config.ts`

---

## 4. 搜索与构建流程

- 保留 Pagefind 作为静态搜索方案。
- 构建命令仍为：`astro check && astro build && pagefind --site dist`。

涉及文件：

- `package.json`
- `src/pages/search.astro`

---

## 5. Open Graph 策略调整

- 为提升构建稳定性，站点级 OG 改为本地静态图引用。
- 移除了依赖外部拉取字体的站点级动态 OG 路由。

涉及文件：

- `src/config.ts`
- `src/pages/og.png.ts`（已删除）
- `public/ermaozi-og.webp`

---

## 6. 文档中文化

已将核心文档中文化，便于日常维护与团队协作：

- `README.md`
- `CUSTOMIZATIONS.md`（当前文件）
- `GALLERIES.md`

---

## 7. 当前状态

- 项目可正常安装与构建。
- 文章路由、标签页、归档页正常生成。
- 如需重新启用画廊功能，可参考 `GALLERIES.md` 并恢复相关路由与配置。
