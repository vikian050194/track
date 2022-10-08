import assert from "node:assert";

import { buildYouTrackIssueUrl } from "../../src/common/url.js";

describe("Build YouTrack issue URL", function () {
    it("all values are undefined", () => {
        const host = undefined;
        const team = undefined;
        const issue = undefined;

        const expected = "undefined/issue/undefined-undefined";

        const actual = buildYouTrackIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("host value is undefined", () => {
        const host = undefined;
        const team = "team";
        const issue = "issue";

        const expected = "undefined/issue/team-issue";

        const actual = buildYouTrackIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("team value is undefined", () => {
        const host = "host";
        const team = undefined;
        const issue = "issue";

        const expected = "host/issue/undefined-issue";

        const actual = buildYouTrackIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("issue value is undefined", () => {
        const host = "host";
        const team = "team";
        const issue = undefined;

        const expected = "host/issue/team-undefined";

        const actual = buildYouTrackIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("all values are provided", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/issue/team-issue";

        const actual = buildYouTrackIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });
});
