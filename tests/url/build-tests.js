import assert from "node:assert";

import { buildUrl } from "../../src/common/url.js";
import { Keys } from "../../src/common/index.js";

describe("Build URL", function () {
    it("custom", () => {
        const custom = "custom";
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "customissue";

        const actual = buildUrl(custom, Keys.CUSTOM, host, team, issue);

        assert.equal(actual, expected);
    });

    it("YouTrack", () => {
        const custom = "custom";
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/issue/team-issue";

        const actual = buildUrl(custom, Keys.YOUTRACK, host, team, issue);

        assert.equal(actual, expected);
    });

    it("Jira", () => {
        const custom = "custom";
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/browse/team-issue";

        const actual = buildUrl(custom, Keys.JIRA, host, team, issue);

        assert.equal(actual, expected);
    });

    it("error", () => {
        const custom = "custom";
        const host = "host";
        const team = "team";
        const issue = "issue";

        assert.throws(() => {
            buildUrl(custom, "test", host, team, issue);
        }, Error, "Unknown tracker test",);
    });
});
