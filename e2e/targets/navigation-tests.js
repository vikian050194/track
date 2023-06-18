import { test, expect, timeout } from "../fixtures.js";
import { TargetsPage } from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new TargetsPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("Targets");
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