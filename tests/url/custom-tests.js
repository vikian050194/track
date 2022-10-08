import assert from "node:assert";

import { buildCustomIssueUrl } from "../../src/common/url.js";

describe("Build custom issue URL", function () {
    it("all values are undefined", () => {
        const host = undefined;
        const team = undefined;
        const issue = undefined;

        const expected = "undefinedundefinedundefined";

        const actual = buildCustomIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("host value is undefined", () => {
        const host = undefined;
        const team = "team";
        const issue = "issue";

        const expected = "undefinedteamissue";

        const actual = buildCustomIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("team value is undefined", () => {
        const host = "host";
        const team = undefined;
        const issue = "issue";

        const expected = "hostundefinedissue";

        const actual = buildCustomIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("issue value is undefined", () => {
        const host = "host";
        const team = "team";
        const issue = undefined;

        const expected = "hostteamundefined";

        const actual = buildCustomIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("all values are provided", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "hostteamissue";

        const actual = buildCustomIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });
});
