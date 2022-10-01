import { Keys } from "./index.js";

export const buildYouTrackIssueUrl = (host, team, issue) => {
    return `${host}/issue/${team}-${issue}`;
};

export const buildJiraIssueUrl = (host, team, issue) => {
    return `${host}/browse/${team}-${issue}`;
};

export const buildCustomIssueUrl = (host, team, issue) => {
    return `${host}${team}${issue}`;
};

export const buildUrl = (custom, tracker, host, team, issue) => {
    switch (tracker) {
        case Keys.CUSTOM:
            return buildCustomIssueUrl(custom, "", issue);
        case Keys.YOUTRACK:
            return buildYouTrackIssueUrl(host, team, issue);
        case Keys.JIRA:
            return buildJiraIssueUrl(host, team, issue);
        default:
            throw new Error(`Unknown tracker ${tracker}`);
    }
};
