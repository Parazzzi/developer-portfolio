import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test("content, links, composition and responsive navigation", async ({ page, request }) => {
  const errors: string[] = []
  const heavyRequests: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()) })
  page.on("request", item => { if (/\.mp4|youtube\.com\/embed/.test(item.url())) heavyRequests.push(item.url()) })
  await page.goto("/")
  await expect(page.locator("h1")).toContainText("DEMENTIY")
  await expect(page.locator(".lab-index-entry")).toHaveCount(11)
  for (const title of ["PC Creator 3", "PC Creator 3 Pro", "PC Creator 2", "VR Football Penalty"]) await expect(page.getByRole("heading", { name: title, exact: true })).toHaveCount(1)
  await expect(page.locator("video, iframe")).toHaveCount(0)
  expect(heavyRequests).toEqual([])
  expect((await request.get("/dementiy-besarab-cv.pdf")).status()).toBe(200)
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))))
  expect(brokenAnchors).toEqual([])

  for (const width of [1920, 1440, 1024, 768, 430, 390]) {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `Overflow at ${width}`).toBeLessThanOrEqual(1)
  }
  const menuButton = page.getByRole("button", { name: "Open navigation menu" })
  await menuButton.click()
  await expect(page.locator("#mobile-menu")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(menuButton).toBeFocused()
  await page.getByRole("button", { name: "Switch language" }).click()
  await expect(page.locator("html")).toHaveAttribute("lang", "uk")
  await page.reload()
  await expect(page.locator("html")).toHaveAttribute("lang", "uk")
  expect(errors).toEqual([])
})

test("native galleries preserve keyboard focus and full screenshots", async ({ page }) => {
  await page.goto("/")
  const preview = page.locator(".lab-preview").first()
  await preview.click()
  const dialog = page.locator(".lab-gallery")
  await expect(dialog).toBeVisible()
  await expect(dialog.locator("img").first()).toBeVisible()
  await page.keyboard.press("Tab")
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBeTruthy()
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(preview).toBeFocused()
})

test("WebGL falls back without blocking content or background changes", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type.startsWith("webgl")) return null
      return original.apply(this, [type, ...args] as Parameters<typeof original>)
    } as typeof original
  })
  await page.goto("/")
  await expect(page.locator(".artifact-fallback")).toBeVisible()
  await page.locator("#experience").evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY, behavior: "instant" }))
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--page-bg"))).toBe("rgb(233.0 231.0 225.0)")
  expect(await page.locator("#experience").evaluate(element => getComputedStyle(element).color)).toBe("rgb(32, 35, 28)")
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute("href", "mailto:besarabdementij1@gmail.com")
})

test("reduced-motion and semantic content remain accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.locator(".motion-control")).toBeHidden()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto")
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
  expect(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([])
})

test("portfolio information is server-rendered without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page.getByRole("heading", { name: "PC Creator 3", exact: true })).toBeVisible()
  await expect(page.locator(".lab-index-entry")).toHaveCount(11)
  await expect(page.locator(".noscript-nav")).toBeVisible()
  await context.close()
})
