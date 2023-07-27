import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    TargetsPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Items", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.ui.selectedItemArrow.click();
        await options.save();
        
        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    const COUNT = 3;

    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout);

        const targets = new TargetsPage(page, extensionId);
        await targets.goto();

        for (let index = 0; index < COUNT; index++) {
            await targets.create();
        }

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("Arrow is visible", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Assert
        await expect(pom.selected).toHaveText("➤#1:target#1");
        await expect(pom.nth(0)).toHaveText("➤#1:target#1");
    });

    test("No items", async ({ page, extensionId }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.reset();

        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.up();
        await pom.down();

        // Assert
        await expect(pom.selected).not.toBeVisible();
        await expect(pom.nth(0)).not.toBeVisible();
    });

    test("Up for down", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.up();

        // Assert
        await expect(pom.selected).toHaveText("#3:target#3");
        await expect(pom.nth(COUNT - 1)).toHaveText("#3:target#3");

        for (let index = 0; index < COUNT - 1; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Down for second item", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.down();

        // Assert
        await expect(pom.selected).toHaveText("#2:target#2");
        await expect(pom.nth(1)).toHaveText("#2:target#2");

        for (let index = 0; index < COUNT; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Down for up", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        for (let index = 0; index < COUNT; index++) {
            await pom.down();
        }

        // Assert
        await expect(pom.selected).toHaveText("#1:target#1");
        await expect(pom.nth(0)).toHaveText("#1:target#1");

        for (let index = 1; index < COUNT; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });
});