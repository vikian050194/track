import { TRACKERS } from "../src/common/index.js";
import { test, expect } from "./fixtures.js";
import { OptionsPage } from "./pom/index.js";

test.describe("Options", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(1000);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test.describe("Navigation", () => {
        test("Options", async ({ page }) => {
            // Arrange
            const link = page.locator("footer > span", { hasText: "options" });

            // Act
            await link.click();

            // Assert
            await expect(page).toHaveURL(new RegExp("options/options.html"));
        });
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("Options");
    });

    test("Sections", async ({ page }) => {
        // Arrange
        const sections = page.locator("h2");

        // Assert
        await expect(sections.nth(0)).toHaveText("URL");
    });

    test("Section: URL", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.url.customUrl.hasValue("https://example.com/test-");
        await pom.url.host.hasValue("https://example.com");
        await pom.url.team.hasValue("MYTEAM");
        await pom.url.tracker.hasValue(TRACKERS.CUSTOM);

        // // Act
        await pom.url.customUrl.setValue("foobar3000.com/t-");
        await pom.url.host.setValue("foobar3000.com");
        await pom.url.team.setValue("kek");
        await pom.url.tracker.setValue(TRACKERS.JIRA);

        await pom.save();
        await pom.reload();

        // Assert
        await pom.url.customUrl.hasValue("foobar3000.com/t-");
        await pom.url.host.hasValue("foobar3000.com");
        await pom.url.team.hasValue("kek");
        await pom.url.tracker.hasValue(TRACKERS.JIRA);
    });
});