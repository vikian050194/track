import assert from "node:assert";

import { buildUrl } from "../../src/common/url.js";

describe("Build URL", function () {
    it("Template without placeholder", () => {
        const template = "string_without_placeholder";
        const value = "issue";

        const expected = "string_without_placeholder";

        const actual = buildUrl(template, value);

        assert.equal(actual, expected);
    });

    it("Template with one placeholder", () => {
        const template = "example.com?issue={{value}}";
        const value = "2023";

        const expected = "example.com?issue=2023";

        const actual = buildUrl(template, value);

        assert.equal(actual, expected);
    });

    it("Template with two placeholders", () => {
        const template = "example.com?t1={{value}}&t2={{value}}";
        const value = "2023";

        const expected = "example.com?t1=2023&t2=2023";

        const actual = buildUrl(template, value);

        assert.equal(actual, expected);
    });
});
