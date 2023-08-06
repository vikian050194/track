import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage
} from "../pom/index.js";

test.describe("Query", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("Empty", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Assert
        await expect(pom.query).toHaveText("");
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
        await expect(pom.query).toHaveText("");
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