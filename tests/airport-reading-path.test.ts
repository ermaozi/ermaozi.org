import { test } from "node:test";
import assert from "node:assert/strict";
import { airportReadingSteps } from "../src/utils/airportReadingPath.ts";

const body = "| 1 | [示例](/posts/example/) | 资料价 |\n\n[风险档案](/posts/archive/)\n| 名称 | [其他](/posts/other/) |\n";

test("numbered candidates get the full task path, without converting ordinary links into candidates", () => {
  assert.equal(airportReadingSteps("/posts/example/", body).length, 4);
  for (const path of ["/posts/archive/", "/posts/other/", "/posts/news/"])
    assert.deepEqual(airportReadingSteps(path, body), []);
});

test("guides link back to selection and never link to themselves", () => {
  const steps = airportReadingSteps("/posts/jichang-buying-checklist/", body);
  assert.equal(steps.length, 3);
  assert(steps.some(step => step.href === "/posts/vpn-recommendation/"));
  assert(!steps.some(step => step.href === "/posts/jichang-buying-checklist/"));
});

test("a removed candidate loses the task block and an empty body does not select reviews", () => {
  assert.deepEqual(airportReadingSteps("/posts/example/", ""), []);
  assert.deepEqual(airportReadingSteps("/posts/example/", body.replace("| 1 |", "| removed |")), []);
});
