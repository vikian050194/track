import {
    dom,
    Sync,
    Local,
    OPTIONS,
    TARGETS
} from "../common/index.js";
import { buildUrl } from "../common/url.js";

document.addEventListener("DOMContentLoaded", async () => {
    const isAutocloseEnabled = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);
    const autocloseTimeSec = await Sync.get(OPTIONS.AUTOCLOSE_TIME);
    let autocloseId = null;
    const resetAutoclose = () => clearTimeout(autocloseId);

    const allTargets = await Local.get(TARGETS.TARGETS);
    const activeTargets = allTargets.filter(t => t.isActive);

    const makeDiv = dom.makeElementCreator("div");

    const makeId = (id) => `opt-${id}`;

    let currentOptionIndex = 0;
    let maxOptionIndex = activeTargets.length - 1;

    let query = "";

    const $root = document.getElementById("root");

    const $query = makeDiv({ id: "query" });
    const $options = makeDiv({ id: "options" });

    $root.append($query, document.createElement("hr"), $options);

    const render = () => {
        const elements = [];

        for (let index = 0; index <= maxOptionIndex; index++) {
            const option = activeTargets[index];
            const isSelected = index == currentOptionIndex;
            const title = `#${option.id}:${option.name}`;
            const className = isSelected ? "selected" : null;
            elements.push(makeDiv({ id: makeId(index), innerHTML: title, className }));
        }

        while ($options.firstChild) {
            $options.removeChild($options.firstChild);
        }

        $options.append(...elements);
    };

    $query.innerText = "...";

    render();

    document.addEventListener("paste", e => {
        const data = e.clipboardData.getData("text/plain");
        query = data;
        $query.innerText = query || "...";
    });

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        switch (key) {
            case "Enter": {
                const url = buildUrl(allTargets[currentOptionIndex].template, query);
                if (shiftKey) {
                    await chrome.tabs.create({ url });
                } else {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    await chrome.tabs.update(tab.id, { url });
                }
                if (isAutocloseEnabled) {
                    autocloseId = setTimeout(window.close, autocloseTimeSec * 1000);
                }
                break;
            }
            case "ArrowUp":
                resetAutoclose();
                currentOptionIndex = currentOptionIndex > 0 ? currentOptionIndex - 1 : maxOptionIndex;
                // currentOptionIndex -= currentOptionIndex > 0 ? 1 : 0;
                render();
                break;
            case "ArrowDown":
                resetAutoclose();
                currentOptionIndex = currentOptionIndex < maxOptionIndex ? currentOptionIndex + 1 : 0;
                // currentOptionIndex += currentOptionIndex < maxOptionIndex ? 1 : 0;
                render();
                break;
            default:
                resetAutoclose();
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
