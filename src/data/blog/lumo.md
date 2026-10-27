---
title: Lumo 测速截图怎么看：AnyTLS兼容、节点倍率与套餐选择
description: 解读用户提供的 Lumo 广州移动与长沙电信原图，区分截图样本和长期表现，并列出 AnyTLS 兼容、Basic/Premium 倍率与四档套餐的核对顺序。
pubDatetime: '2026-10-27'
author: Ermaozi
tags:
  - 机场推荐
  - Lumo
  - AnyTLS
---

看 Lumo 的测速图之前，先确认自己用的客户端能否接入 AnyTLS，再看节点倍率。**截图上的速度不等于自己的可用速度，套餐包含 Premium 也不表示与 Basic 扣费相同。** 这篇笔记以用户提供的两张原图为线索，整理接入前最值得核对的信息。

<a href="https://s1.lumo-invite.com/sign-up/?code=Duy8hdoL" rel="sponsored nofollow noopener" target="_blank">查看 Lumo 套餐与试用条件</a> · [公告频道](https://t.me/Lumo_Notice)

![用户提供的 Lumo 标志](https://www.ermao.net/images/lumo/logo.png)

## 两张原图分别记录了什么

![用户提供的广州移动 Lumo 测速原图，保留 SpeedCentre+ 水印](https://www.ermao.net/images/lumo/speed-guangzhou-20261025.jpg)

广州图标注 **2026-10-25 20:07:51 CST、移动1Gbps、6线程、10.77GB测试消耗**。

![用户提供的长沙电信 Lumo 测速原图，保留 SpeedCentre+ 水印](https://www.ermao.net/images/lumo/speed-changsha-20261025.jpg)

长沙图标注 **2026-10-25 21:38:24 CST、电信2Gbps、6线程、10.42GB测试消耗**。两张均是用户提供的原始截图，保留原水印，**非本站亲测**。

它们能说明图中环境在对应时点的样本，不能代表其他地区、运营商或未来表现。截图里的行数不应直接当成独立节点总数；EG01 的速度栏为空，不应补成成功结果。测试流量也不是赠送额度，更不是套餐可用流量。

## AnyTLS 兼容先于速度比较

商家资料和截图标注 AnyTLS，公开[客户端公告](https://t.me/Lumo_Notice/4)可作为查找说明的起点，但不是所有客户端版本的兼容保证。开始前核对这三项：

1. 客户端的确切版本与内核是否支持服务商当前使用的 AnyTLS 配置。
2. 服务商是否提供适合该客户端的订阅格式；能导入文件不代表每个节点都可连接。
3. 导入后是否能更新节点并访问自己的目标应用，再检查系统代理或接管模式是否生效。

不要将“支持部分第三方客户端”改成所有 Clash、Shadowrocket 或路由器固件都通用。订阅链接含访问凭据，排障时不要公开发送；可先按[本站排障顺序](/posts/vpn-troubleshooting-guide/)缩小范围。

## Basic 与 Premium 的计费差异

商家将 Basic 描述为优化直连，给出的时段为01:00–19:00计0.6倍，19:00–01:00计1.0倍，**政策时区未说明**。不能用截图的 CST 标记替代政策时区。

Premium 被商家描述为 Gomami / DMIT 三网精品线路，原图中的节点标注2.8×；当前倍率及变化规则仍需核实。线路名称不能证明合同类型、独享资源或实际更快。测试时同时观察应用表现和账户流量扣除，才知道更高倍率是否适合自己的用途。

## 用量确定后再选套餐

以下是用户提供的商家资料，非本次独立核价，单位为 GiB。

| 套餐 | 价格 | 流量周期 |
| --- | --- | --- |
| Lite | 119元/年 | 365GiB/年 |
| Plus | 29元/月 | 150GiB/月 |
| Pro | 45元/月 | 250GiB/月 |
| Max | 79元/月 | 450GiB/月 |

Lite 是年度总流量而非月额度，也不是不限时包。Plus、Pro、Max 另有季、半年、年付，但对应价格没有提供，不推算折扣。首次使用可先核试用，再选小档月付观察；不能仅凭两张图决定长期付款。<a href="https://s1.lumo-invite.com/sign-up/?code=Duy8hdoL" rel="sponsored nofollow noopener" target="_blank">查看 Lumo 套餐与试用条件</a>。

## 尚需在购买前问清的条款

活动资料称新用户用 `hellolumo` 下单减10元、注册可试用，适用套餐、期限、叠加规则及试用时长/流量仍未知。退款、设备限制也未确认，不将缺项写成无限制。

商家称成立于2026年，约40节点动态变化，常用香港、台湾、新加坡、日本、美国并覆盖10多个地区；自建DNS、监控、负载均衡及 Netflix/ChatGPT/Gemini 支持均属其陈述。它们不是本站独立测试结论。

资料来自用户提供的公开介绍及原图、[主站已审文章](https://www.ermao.net/blog/lumo/)和公告渠道。可继续读 [XXYun 历史截图核对](/posts/xxyun/)或[机场候选清单](/posts/vpn-recommendation/)。入口含推广参数，本站可能获得佣金，不承诺相同测试表现。
