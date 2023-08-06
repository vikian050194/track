import { test, timeout } from "../fixtures.js";
import { TargetsPage } from "../pom/index.js";

test.describe("Items", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new TargetsPage(page, extensionId);
        await pom.goto();
    });

    test("Empty", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Assert
        await pom.empty();
    });

    test("Create one target", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.create();

        // Assert
        const firstRow = pom.getRowPom(1);
        await firstRow.id.hasValue("1");
        await firstRow.name.hasValue("target#1");
        await firstRow.template.hasValue("http://example.com?issue={{value}}");
        await firstRow.isActive.isChecked(true);
    });

    test("Unsaved changes", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.create();
        const firstRow = pom.getRowPom(1);
        await firstRow.name.setValue("foo");
        await firstRow.template.setValue("bar");
        await firstRow.isActive.click();
        await pom.reload();

        // Assert
        await firstRow.id.hasValue("1");
        await firstRow.name.hasValue("target#1");
        await firstRow.template.hasValue("http://example.com?issue={{value}}");
        await firstRow.isActive.isChecked(true);
    });

    test("Saved changes", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.create();
        const firstRow = pom.getRowPom(1);
        await firstRow.name.setValue("foo");
        await firstRow.template.setValue("bar");
        await firstRow.isActive.click();
        await pom.save();

        // Assert
        await firstRow.id.hasValue("1");
        await firstRow.name.hasValue("foo");
        await firstRow.template.hasValue("bar");
        await firstRow.isActive.isChecked(false);
    });

    test("Three rows", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.create();
        await pom.create();
        await pom.create();

        // Assert
        for (let index = 1; index <= 3; index++) {
            const row = pom.getRowPom(index);
            await row.id.hasValue(index.toString());
            await row.name.hasValue(`target#${index}`);
            await row.template.hasValue("http://example.com?issue={{value}}");
            await row.isActive.isChecked(true);
        }
    });

    test("Delete one target", async ({ page }) => {
        // Arrange
        const pom = new TargetsPage(page);

        // Act
        await pom.create();
        await pom.getRowPom(1).delete.click();

        // Assert
        await pom.empty();
    });
});