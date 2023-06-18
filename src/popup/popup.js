import {
    dom,
    Sync,
    Local,
    OPTIONS,
    TARGETS,
    buildUrl
} from "../common/index.js";
import { getHierarchy } from "./hierarchy.js";

document.addEventListener("DOMContentLoaded", async () => {
    const isAutocloseEnabled = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);
    const autocloseTimeSec = await Sync.get(OPTIONS.AUTOCLOSE_TIME);
    let autocloseId = null;
    const resetAutoclose = () => clearTimeout(autocloseId);

    const allTargets = await Local.get(TARGETS.TARGETS);
    const activeTargets = allTargets.filter(t => t.isActive);
    const layers = [];
    const indexes = [];
    let currentLayer = getHierarchy(activeTargets);

    let currentOptionIndex = 0;
    let maxOptionIndex = currentLayer.length - 1;

    const makeDiv = dom.makeElementCreator("div");

    const makeId = (id) => `opt-${id}`;

    let query = "";

    const $root = document.getElementById("root");

    const $query = makeDiv({ id: "query" });
    const $options = makeDiv({ id: "options" });

    $root.append($query, document.createElement("hr"), $options);

    const render = () => {
        const elements = [];

        for (let index = 0; index <= maxOptionIndex; index++) {
            const option = currentLayer[index];
            const isSelected = index == currentOptionIndex;
            const title = option.isLeaf ? `#${option.id}:${option.name}` : option.name;
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
        resetAutoclose();

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
                currentOptionIndex = currentOptionIndex > 0 ? currentOptionIndex - 1 : maxOptionIndex;
                render();
                break;
            case "ArrowDown":
                currentOptionIndex = currentOptionIndex < maxOptionIndex ? currentOptionIndex + 1 : 0;
                render();
                break;
            case "ArrowRight":
                if (currentLayer[currentOptionIndex].isLeaf) {
                    break;
                }
                layers.push(currentLayer);
                indexes.push(currentOptionIndex);
                currentLayer = currentLayer[currentOptionIndex].nodes;
                currentOptionIndex = 0;
                maxOptionIndex = currentLayer.length - 1;
                render();
                break;
            case "ArrowLeft":
                if (layers.length < 1) {
                    break;
                }
                currentLayer = layers.pop();
                currentOptionIndex = indexes.pop();
                maxOptionIndex = currentLayer.length - 1;
                render();
                break;
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
