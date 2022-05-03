import {
    Sync,
    HOST,
    TEAM
} from "../common/index.js";

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
    const host = await Sync.get(HOST);
    const team = await Sync.get(TEAM);

    let query = "";

    const $root = document.getElementById("root");

    const $query = makeDiv("query");

    $root.append($query);

    $query.innerText = "...";

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        switch (key) {
            case "Enter": {
                const url = `${host}/${team}-${query}`;
                if (shiftKey) {
                    await chrome.tabs.create({ url });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    await chrome.tabs.update(tab.id, { url });
                }
                // TODO add setting for this feature
                window.close();
                break;
            }
            default:
                if (key.length == 1) {
                    query += key;
                } else {
                    if (key == "Backspace") {
                        query = query.slice(0, query.length - 1);
                    } else {
                        break;
                    }
                }
                break;
        }

        $query.innerText = query || "...";
    });
});
