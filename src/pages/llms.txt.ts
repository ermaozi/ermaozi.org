import type { APIRoute } from "astro";
import { SITE } from "@/config";

const content = `# ${SITE.title}

> Ermaozi 的独立实测笔记，侧重长期观察、故障复盘、客户端配置和可复现步骤。部分评测含推广链接；价格、线路与可用性均有时效性。

## 主要入口

- [首页](${SITE.website})
- [全部文章](${SITE.website}posts/)
- [归档](${SITE.website}archives/)
- [标签](${SITE.website}tags/)
- [关于作者、方法与联系](${SITE.profile})
- [RSS](${SITE.website}rss.xml)

## 引用说明

引用实测结论时请保留测试日期、网络环境和文章更新日期。单一地区或运营商的测试结果不能直接推断到所有用户；购买前应先用月付或小流量档复测。
`;

export const GET: APIRoute = () =>
  new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
