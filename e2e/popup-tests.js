import { TRACKERS } from "../src/common/index.js";
import { test, expect } from "./fixtures.js";
import {
    PopupPage,
    OptionsPage
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

    test.describe("Actions", () => {
        test("Update tab - custom", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);
            const updatedPage = await context.newPage();

            // Act
            await pom.search("2023");
            await pom.enter();

            // Assert
            await expect(updatedPage).toHaveURL("https://example.com/test-2023");
        });

        test("Update tab - youtrack", async ({ page, extensionId, context }) => {
            // Arrange
            const options = new OptionsPage(page, extensionId);
            await options.goto();

            await options.url.tracker.setValue(TRACKERS.YOUTRACK);
            await options.save();

            const pom = new PopupPage(page, extensionId);
            await pom.goto();
            const updatedPage = await context.newPage();

            // Act
            await pom.search("2023");
            await pom.enter();

            // Assert
            await expect(updatedPage).toHaveURL("https://example.com/issue/MYTEAM-2023");
        });

        test("Update tab - jira", async ({ page, extensionId, context }) => {
            // Arrange
            const options = new OptionsPage(page, extensionId);
            await options.goto();

            await options.url.tracker.setValue(TRACKERS.JIRA);
            await options.save();

            const pom = new PopupPage(page, extensionId);
            await pom.goto();
            const updatedPage = await context.newPage();

            // Act
            await pom.search("2023");
            await pom.enter();

            // Assert
            await expect(updatedPage).toHaveURL("https://example.com/browse/MYTEAM-2023");
        });

        test("Open new tab", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("2023");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL("https://example.com/test-2023");
        });
    });
});