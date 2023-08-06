import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    TargetsPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Hierarchy", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("One layer", async ({ page, extensionId }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.create();
        const firstRow = targets.getRowPom(1);
        await firstRow.name.setValue("aa");
        await targets.save();
        await targets.create();
        const secondRow = targets.getRowPom(2);
        await secondRow.name.setValue("ab");
        await targets.save();
        await targets.create();
        const thirdRow = targets.getRowPom(3);
        await thirdRow.name.setValue("ac");
        await targets.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.right();
        await pom.down();
        await pom.left();

        // Assert
        await expect(pom.nth(0)).toHaveText("#1:aa");
        await expect(pom.nth(2)).toHaveText("#3:ac");
        
        await expect(pom.selected).toHaveText("#2:ab");
        await expect(pom.nth(1)).toHaveText("#2:ab");

        for (let index = 0; index < 3; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Two layers - without dive", async ({ page, extensionId }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.create();
        const firstRow = targets.getRowPom(1);
        await firstRow.name.setValue("w");
        await targets.save();
        await targets.create();
        const secondRow = targets.getRowPom(2);
        await secondRow.name.setValue("a/aa");
        await targets.save();
        await targets.create();
        const thirdRow = targets.getRowPom(3);
        await thirdRow.name.setValue("a/ab");
        await targets.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.down();

        // Assert
        await expect(pom.nth(0)).toHaveText("#1:w");

        await expect(pom.selected).toHaveText("a");
        await expect(pom.nth(1)).toHaveText("a");

        for (let index = 0; index < 2; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Two layers - with dive", async ({ page, extensionId }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.create();
        const firstRow = targets.getRowPom(1);
        await firstRow.name.setValue("w");
        await targets.save();
        await targets.create();
        const secondRow = targets.getRowPom(2);
        await secondRow.name.setValue("a/aa");
        await targets.save();
        await targets.create();
        const thirdRow = targets.getRowPom(3);
        await thirdRow.name.setValue("a/ab");
        await targets.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.down();
        await pom.right();

        // Assert
        await expect(pom.selected).toHaveText("#2:aa");
        await expect(pom.nth(0)).toHaveText("#2:aa");

        await expect(pom.nth(1)).toHaveText("#3:ab");

        for (let index = 0; index < 2; index++) {
            if (index === 0) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Two layers - restore previous index", async ({ page, extensionId }) => {
        // Arrange
        const targets = new TargetsPage(page, extensionId);
        await targets.goto();
        await targets.create();
        const firstRow = targets.getRowPom(1);
        await firstRow.name.setValue("w");
        await targets.save();
        await targets.create();
        const secondRow = targets.getRowPom(2);
        await secondRow.name.setValue("a/aa");
        await targets.save();
        await targets.create();
        const thirdRow = targets.getRowPom(3);
        await thirdRow.name.setValue("a/ab");
        await targets.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.down();
        await pom.right();
        await pom.down();
        await pom.left();

        // Assert
        await expect(pom.nth(0)).toHaveText("#1:w");

        await expect(pom.selected).toHaveText("a");
        await expect(pom.nth(1)).toHaveText("a");

        for (let index = 0; index < 2; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });
});