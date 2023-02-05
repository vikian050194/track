import { OPTIONS } from "../../src/common/constants/index.js";
import { BasePage, BasePOM } from "./base.js";

class InputOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, id) {
        super(page);

        this.locator = page.locator(`#${id}`);
    }

    async setValue(value) {
        await this.locator.fill(value);
    }

    async hasValue(value) {
        await this.expect(this.locator).toHaveValue(value);
    }
}

class SelectOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, id) {
        super(page);

        this.locator = page.locator(`#${id}`);
    }

    async click() {
        await this.locator.click();
    }

    async setValue(value) {
        await this.locator.selectOption(value);
    }

    async hasValue(value) {
        await this.expect(await this.locator.inputValue()).toBe(value);
    }
}

export class UrlOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.customUrl = new InputOption(page, OPTIONS.CUSTOM_URL, page);
        this.host = new InputOption(page, OPTIONS.HOST, page);
        this.team = new InputOption(page, OPTIONS.TEAM, page);
        this.tracker = new SelectOption(page, OPTIONS.TRACKER);
    }
}

export class OptionsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.url = new UrlOptions(page);

        this.saveButton = page.locator("#save");
    }

    async goto() {
        await super.goto("options");
    }

    async save() {
        await this.saveButton.click();
    }
}
