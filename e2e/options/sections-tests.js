import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Sections", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test("Sections", async ({ page }) => {
        // Arrange
        const sections = page.locator("h2");

        // Assert
        await expect(sections.nth(0)).toHaveText("Popup autoclose");
    });

    test("Section: Popup autoclose", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.autoclose.enabled.isChecked(true);
        await pom.autoclose.time.hasValue("1");

        // Act
        await pom.autoclose.enabled.click();
        await pom.autoclose.time.setValue("2");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.autoclose.enabled.isChecked(false);
        await pom.autoclose.time.hasValue("2");
    });
});