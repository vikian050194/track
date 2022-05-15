import assert from "assert";

import { buildUrl } from "../../src/common/url.js";
import { Keys } from "../../src/common/index.js";

describe("Build URL", function () {
    it("custom", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "hostteamissue";

        const actual = buildUrl(Keys.CUSTOM, host, team, issue);

        assert.equal(actual, expected);
    });

    it("YouTrack", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/issue/team-issue";

        const actual = buildUrl(Keys.YOUTRACK, host, team, issue);

        assert.equal(actual, expected);
    });

    it("Jira", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/browse/team-issue";

        const actual = buildUrl(Keys.JIRA, host, team, issue);

        assert.equal(actual, expected);
    });

    it("error", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        assert.throws(() => {
            buildUrl("test", host, team, issue);
        }, Error, "Unknown tracker test",);
    });
});
