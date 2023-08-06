import { expect } from "../fixtures.js";

export class BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.expect = expect;
    }

    async goto(name) {
        await this.page.goto(`chrome-extension://${this.extensionId}/${name}/${name}.html`);
    }
}

export class BasePage extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page);

        this.extensionId = extensionId;
    }

    async goto(name, params = {}) {
        let q = "";
        for (const key in params) {
            const value = params[key];
            if (value !== null) {
                q += `${key}=${value}`;
            }
        }
        await this.page.goto(`chrome-extension://${this.extensionId}/${name}/${name}.html${q ? "?" + q : ""}`);
    }

    async reload() {
        await this.page.reload();
    }

    async close() {
        await this.page.close();
    }
}
