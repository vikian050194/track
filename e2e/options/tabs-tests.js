import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Tabs", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test("Titles and descriptions", async ({ page }) => {
        // Assert
        const titles = await page.locator("span.title").allInnerTexts();
        for (const title of titles) {
            await expect(title.length).toBeGreaterThan(0);
        }

        const icons = await page.locator("span.info").allInnerTexts();
        for (const icon of icons) {
            await expect(icon.length).toBe(5);
        }
    });

    test("Descriptions in modal popup", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        const modal = pom.modal;
        await modal.hidden();

        // Assert
        const icons = await page.locator("span.info").all();
        for (const icon of icons) {
            await icon.click();
            await modal.visible();
            await modal.hasTitle();
            await modal.hasDescription();
            await modal.close();
            await modal.hidden();

            await icon.click();
            await modal.visible();
            await modal.exit();
            await modal.hidden();
        }
    });
});