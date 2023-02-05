import { TRACKERS } from "./constants/index.js";

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
        case TRACKERS.CUSTOM:
            return buildCustomIssueUrl(custom, "", issue);
        case TRACKERS.YOUTRACK:
            return buildYouTrackIssueUrl(host, team, issue);
        case TRACKERS.JIRA:
            return buildJiraIssueUrl(host, team, issue);
        default:
            throw new Error(`Unknown tracker ${tracker}`);
    }
};
