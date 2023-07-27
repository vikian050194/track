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

    const color = await Sync.get(OPTIONS.UI_SELECTED_ITEM_COLOR);
    const weight = await Sync.get(OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
    const fontSize = await Sync.get(OPTIONS.UI_FONT_SIZE);
    const isArrow = await Sync.get(OPTIONS.UI_SELECTED_ITEM_ARROW);

    // Autoclose
    let autocloseId = null;
    const resetAutoclose = () => clearTimeout(autocloseId);

    // Input and output
    let query = "";
    const allTargets = await Local.get(TARGETS.TARGETS);
    const activeTargets = allTargets.filter(t => t.isActive);
    const layers = [];
    const indexes = [];
    let currentLayer = getHierarchy(activeTargets);

    // UI items
    const arrowChar = "&#10148;";
    const visibleArrow = isArrow ? `<span>${arrowChar}</span>` : "";
    const invisibleArrow = isArrow ? `<span style="color:white;">${arrowChar}</span>` : "";
    const queryPlaceholder = "";

    // Indexes
    let currentOptionIndex = 0;
    let maxOptionIndex = currentLayer.length - 1;

    // UI builders
    const makeDiv = dom.makeElementCreator("div");

    const makeId = (id) => `opt-${id}`;

    // DOM elements creating and updating
    const $rootElement = document.documentElement;
    const $root = document.getElementById("root");

    const $query = makeDiv({ id: "query" });
    const $options = makeDiv({ id: "options" });

    $root.append($query, document.createElement("hr"), $options);

    $rootElement.style.setProperty("--selected-item-color", color);
    $rootElement.style.setProperty("--selected-item-font-weight", weight);
    $rootElement.style.setProperty("--font-size", `${fontSize}px`);

    // Render
    const render = () => {
        const elements = [];

        for (let index = 0; index <= maxOptionIndex; index++) {
            const option = currentLayer[index];
            const isSelected = index == currentOptionIndex;
            const titlePrefix = isSelected ? visibleArrow : invisibleArrow;
            const title = titlePrefix + (option.isLeaf ? `#${option.id}:${option.name}` : option.name);
            const classList = ["option"];
            if (isSelected) {
                classList.push("selected");
            }
            elements.push(makeDiv({ id: makeId(index), innerHTML: title, classList }));
        }

        while ($options.firstChild) {
            $options.removeChild($options.firstChild);
        }

        $options.append(...elements);

        $query.innerText = query || queryPlaceholder;
    };

    render();

    document.addEventListener("paste", e => {
        const data = e.clipboardData.getData("text/plain");
        query = data;
        $query.innerText = query || queryPlaceholder;
    });

    document.addEventListener("keydown", async ({ key, shiftKey }) => {
        resetAutoclose();

        switch (key) {
            case "Enter": {
                const node = currentLayer[currentOptionIndex];
                if (node.isLeaf === false) {
                    break;
                }
                const url = buildUrl(node.template, query);
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
                render();
                break;
        }
    });
});
