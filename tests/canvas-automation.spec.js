import { test, expect } from "@playwright/test";

test("canvas sync + click interaction", async ({ page }) => {
  await page.goto("http://localhost:8080");

  await page.evaluate(() => {
    window.__ready = false;
  });

  await page.waitForFunction(() =>
    window.getCanvasState && window.getCanvasState().length > 0
  );

  const node = await page.evaluate(() =>
    window.getCanvasState()[0]
  );

  const canvas = page.locator("#automationCanvas");
  const box = await canvas.boundingBox();

  await page.waitForTimeout(300);

  const clickX = box.x + node.x + node.width / 2;
  const clickY = box.y + node.y + node.height / 2;

  await page.mouse.click(clickX, clickY);

  await page.waitForFunction((id) => {
    const state = window.getCanvasState();
    const node = state.find(n => n.id === id);
    return node && node.status === "ACKNOWLEDGED";
  }, node.id, {
    polling: 100,
    timeout: 10000
  });

  const finalState = await page.evaluate(() =>
    window.getCanvasState()
  );

  expect(finalState.find(n => n.id === node.id).status)
    .toBe("ACKNOWLEDGED");
});
