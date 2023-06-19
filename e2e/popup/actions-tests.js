import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    TargetsPage
} from "../pom/index.js";

test.describe("Actions", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test("Update tab", async ({ page, extensionId, context }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.reset();
        await targets.create();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
        const updatedPage = await context.newPage();

        // Act
        await pom.search("2023");
        await pom.enter();

        // Assert
        await expect(updatedPage).toHaveURL("http://example.com/?issue=2023");
    });

    test("Open new tab", async ({ page, extensionId, context }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.reset();
        await targets.create();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("2023");
        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            pom.shiftEnter()
        ]);

        // Assert
        await expect(newPage).toHaveURL("http://example.com/?issue=2023");
    });

    test("Ignore attempt to execute directory", async ({ page, extensionId, context }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.create();
        const firstRow = targets.getRowPom(1);
        await firstRow.name.setValue("a/aa");
        await targets.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
        const updatedPage = await context.newPage();

        // Act
        await pom.search("2023");
        await pom.enter();

        // Assert
        await expect(updatedPage).not.toHaveURL("http://example.com/?issue=2023");
    });
});