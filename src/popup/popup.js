import {
    Sync,
    Keys
} from "../common/index.js";
import { buildUrl } from "../common/url.js";

const makeDiv = (id, text = null, className = null) => {
    const newElement = document.createElement("div");
    newElement.id = id;
    if (className) {
        newElement.className = className;
    }
    if (text) {
        const textContent = document.createTextNode(text);
        newElement.appendChild(textContent);
    }
    return newElement;
};

document.addEventListener("DOMContentLoaded", async () => {
    const custom = await Sync.get(Keys.CUSTOM_URL);
    const tracker = await Sync.get(Keys.TRACKER);
    const host = await Sync.get(Keys.HOST);
    const team = await Sync.get(Keys.TEAM);

    const build = (issue) => buildUrl(custom, tracker, host, team, issue);

    let issue = "";

    const $root = document.getElementById("root");

    const $query = makeDiv("query");

    $root.append($query);

    $query.innerText = "...";

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        switch (key) {
            case "Enter": {
                const url = build(issue);
                if (shiftKey) {
                    await chrome.tabs.create({ url });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    await chrome.tabs.update(tab.id, { url });
                }
                window.close();
                break;
            }
            default:
                if (key.length == 1) {
                    issue += key;
                } else {
                    if (key == "Backspace") {
                        issue = issue.slice(0, issue.length - 1);
                    } else {
                        break;
                    }
                }
                break;
        }

        $query.innerText = issue || "...";
    });
});
