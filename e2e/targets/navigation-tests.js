import { test, expect, timeout } from "../fixtures.js";
import { TargetsPage } from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, context, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new TargetsPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        // TODO extract header locator
        const header = page.locator("header > h1");

        // Assert
        await expect(header).toHaveText("Targets");
    });

    test("Options", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.navigation.options.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("Targets", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.navigation.targets.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("targets/targets.html"));
    });

    test("Counters", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.navigation.counters.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("counters/counters.html"));
    });

    test("Changelog", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.navigation.changelog.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("changelog/changelog.html"));
    });

    test("Version", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Assert
        await pom.checkVersion();
    });
});