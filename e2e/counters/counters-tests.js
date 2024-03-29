import { test, expect, timeout } from "../fixtures.js";
import {
    CountersPage,
    TargetsPage,
    PopupPage
} from "../pom/index.js";

test.describe("Counters", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new CountersPage(page, extensionId);
        await pom.goto();
    });

    test("Sections", async ({ page }) => {
        // Arrange
        const sections = page.locator("h2");

        // Assert
        await expect(sections.nth(0)).toHaveText("Common");
        await expect(sections.nth(1)).toHaveText("Opening");
    });

    test.describe("Data", () => {
        test("Initial", async ({ page, extensionId }) => {
            // Arrange
            const pom = new CountersPage(page, extensionId);

            // Assert
            await pom.since();
            await pom.total(0);
            await pom.update(0, 0.00);
            await pom.create(0, 0.00);
        });

        test("Update", async ({ page, extensionId, context }) => {
            // Arrange
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();
            await targets.reset();
            await targets.create();

            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            const pom = new CountersPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.since();
            await pom.total(1);
            await pom.update(1, 100.00);
            await pom.create(0, 0.00);
        });

        test("Create", async ({ page, extensionId, context }) => {
            // Arrange
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();
            await targets.reset();
            await targets.create();

            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.shiftEnter();

            page = await context.newPage();
            const pom = new CountersPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.since();
            await pom.total(1);
            await pom.update(0, 0.00);
            await pom.create(1, 100.00);
        });

        test("One update and two create", async ({ page, extensionId, context }) => {
            // Arrange
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();
            await targets.reset();
            await targets.create();

            const popup = new PopupPage(page, extensionId);

            // Act
            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.shiftEnter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.shiftEnter();

            page = await context.newPage();
            const pom = new CountersPage(page, extensionId);
            await pom.goto();
            await page.reload();

            // Assert
            await pom.since();
            await pom.total(3);
            await pom.update(1, 33.33);
            await pom.create(2, 66.67);
        });

        test("Create and keep group", async ({ page, extensionId, context }) => {
            // Arrange
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();
            await targets.reset();
            await targets.create();

            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.controlShiftEnter();

            page = await context.newPage();
            const pom = new CountersPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.since();
            await pom.total(1);
            await pom.update(0, 0.00);
            await pom.create(1, 100.00);
        });

        test("Reset", async ({ page, extensionId, context }) => {
            // Arrange
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();
            await targets.reset();
            await targets.create();

            const popup = new PopupPage(page, extensionId);

            // Act
            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.shiftEnter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.shiftEnter();

            page = await context.newPage();
            const pom = new CountersPage(page, extensionId);
            await pom.goto();
            await pom.reset();

            // Assert
            await pom.since();
            await pom.total(0);
            await pom.update(0, 0.00);
            await pom.create(0, 0.00);
        });
    });
});