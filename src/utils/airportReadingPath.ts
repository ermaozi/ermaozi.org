export const readingSteps = [
  { href: "/posts/vpn-recommendation/", title: "比较机场与套餐", description: "返回候选清单，对照预算、流量周期与订阅要求。" },
  { href: "/posts/jichang-buying-checklist/", title: "下单前核对条款", description: "检查倍率、设备限制、付款周期和退款条件。" },
  { href: "https://www.ermao.net/article/jichang-subscription-guide/", title: "安装客户端与导入订阅（主站）", description: "按设备选择教程，完成导入、更新和连接验证。" },
  { href: "/posts/vpn-troubleshooting-guide/", title: "连接失败按步骤排查", description: "区分订阅、客户端和网络问题，再决定是否更换服务。" },
];

const guidePaths = new Set([
  "/posts/vpn-recommendation/",
  "/posts/jichang-buying-checklist/",
  "/posts/vpn-troubleshooting-guide/",
  "/posts/vpn-vs-jichang-guide/",
]);

// Scope follows the numbered candidate table, not broad tags that also occur
// on risk archives, news and unrelated posts. No second merchant list to maintain.
export function airportReadingSteps(currentPath: string, recommendationBody: string) {
  const candidatePaths = new Set(
    [...recommendationBody.matchAll(/^\|\s*\d+\s*\|\s*\[[^\]]+\]\((\/posts\/[^\s)]+\/)\)/gm)]
      .map(match => match[1])
  );
  if (!candidatePaths.has(currentPath) && !guidePaths.has(currentPath)) return [];
  return readingSteps.filter(step => step.href !== currentPath);
}
