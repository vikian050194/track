import { test, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Sections", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test("Appearance", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.ui.selectedItemColor.hasValue("#EC4339");

        // Act
        await pom.ui.selectedItemColor.setValue("#00A0DC");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.ui.selectedItemColor.hasValue("#00A0DC");
    });

    test("Autoclose", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(2).click();

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