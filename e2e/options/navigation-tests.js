import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("header > h1");

        // Assert
        await expect(header).toHaveText("Options");
    });

    test("Options", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "options" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("Targets", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "targets" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("targets/targets.html"));
    });
});