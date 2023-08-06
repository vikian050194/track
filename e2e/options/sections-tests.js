import { test, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Sections", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test("Appearance", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.ui.fontSize.hasValue("12");
        await pom.ui.selectedItemColor.hasValue("#EC4339");
        await pom.ui.selectedItemFontWeight.hasValue("bold");
        await pom.ui.selectedItemArrow.isChecked(true);

        // Act
        await pom.ui.fontSize.setValue("8");
        await pom.ui.selectedItemColor.setValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.setValue("normal");
        await pom.ui.selectedItemArrow.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.ui.fontSize.hasValue("8");
        await pom.ui.selectedItemColor.hasValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.hasValue("normal");
        await pom.ui.selectedItemArrow.isChecked(false);
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

    test("Changelog", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(3).click();

        await pom.changelog.show.isChecked(true);

        // Act
        await pom.changelog.show.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.changelog.show.isChecked(false);
    });
});