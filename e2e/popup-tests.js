import { test, expect } from "./fixtures.js";
import {
    PopupPage,
    OptionsPage,
    TargetsPage
} from "./pom/index.js";

test.describe("Popup", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(1000);

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test.describe("Query", () => {
        test("Empty", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Assert
            await expect(pom.query).toHaveText("...");
        });

        test("One word", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("2023");

            // Assert
            await expect(pom.query).toHaveText("2023");
        });

        test("Clean", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("2023");
            for (let index = 0; index < 4; index++) {
                await pom.backspace();
            }

            // Assert
            await expect(pom.query).toHaveText("...");
        });

        test("Paste", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("2023");
            await pom.press("Control+A");
            await pom.press("Control+C");
            for (let index = 0; index < 4; index++) {
                await pom.backspace();
            }
            await pom.press("Control+V");

            // Assert
            await expect(pom.query).toHaveText("2023AC");
        });
    });

    test.describe("Items", () => {
        const COUNT = 3;

        test.beforeEach(async ({ page, extensionId }) => {
            await page.waitForTimeout(1000);
    
            const targets = new TargetsPage(page, extensionId);
            await targets.goto();

            for (let index = 0; index < COUNT; index++) {
                await targets.create();
            }

            const pom = new PopupPage(page, extensionId);
            await pom.goto();
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

    test.describe("Actions", () => {
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
    });
});