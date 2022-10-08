import assert from "node:assert";

import { buildJiraIssueUrl } from "../../src/common/url.js";

describe("Build Jira issue URL", function () {
    it("all values are undefined", () => {
        const host = undefined;
        const team = undefined;
        const issue = undefined;

        const expected = "undefined/browse/undefined-undefined";

        const actual = buildJiraIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("host value is undefined", () => {
        const host = undefined;
        const team = "team";
        const issue = "issue";

        const expected = "undefined/browse/team-issue";

        const actual = buildJiraIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("team value is undefined", () => {
        const host = "host";
        const team = undefined;
        const issue = "issue";

        const expected = "host/browse/undefined-issue";

        const actual = buildJiraIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("issue value is undefined", () => {
        const host = "host";
        const team = "team";
        const issue = undefined;

        const expected = "host/browse/team-undefined";

        const actual = buildJiraIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });

    it("all values are provided", () => {
        const host = "host";
        const team = "team";
        const issue = "issue";

        const expected = "host/browse/team-issue";

        const actual = buildJiraIssueUrl(host, team, issue);

        assert.equal(actual, expected);
    });
});
