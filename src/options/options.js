import {
    dom,
    Sync,
    OPTIONS,
    AUTOCLOSE
} from "../common/index.js";
import { descriptions } from "./description.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $modal = document.getElementById("modal-one");

    const icon = "{ &#8505; }";

    const openModal = (optionid) => {
        const description = descriptions.find(({ id }) => id === optionid);
        $modal.querySelector("h1").innerHTML = description.title;
        $modal.querySelector("div.description").innerHTML = description.paragraphs.map(p => `<p>${p}</p>`).join("");
        $modal.classList.add("open");
        const exits = $modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
            exit.addEventListener("click", function (event) {
                event.preventDefault();
                $modal.classList.remove("open");
            });
        });
    };

    document.querySelectorAll("span.title").forEach(function (element) {
        const optionId = element.getAttribute("data-info-id");
        const description = descriptions.find(({ id }) => id === optionId);
        element.innerHTML = description.title;
    });

    document.querySelectorAll("span.info").forEach(function (trigger) {
        trigger.innerHTML = icon;
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const optionId = event.target.getAttribute("data-info-id");
            openModal(optionId);
        });
    });

    const makeOption = dom.makeElementCreator("option");

    // Autoclose
    const $isAutocloseEnabled = document.getElementById(OPTIONS.IS_AUTOCLOSE_ENABLED);
    $isAutocloseEnabled.checked = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);

    const $autocloseTimeSec = document.getElementById(OPTIONS.AUTOCLOSE_TIME);
    for (const value of AUTOCLOSE.ORDERED) {
        $autocloseTimeSec.append(
            makeOption({ text: value.toString(), value }),
        );
    }
    $autocloseTimeSec.value = await Sync.get(OPTIONS.AUTOCLOSE_TIME);

    // Save
    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        // Autoclose
        await Sync.set(OPTIONS.IS_AUTOCLOSE_ENABLED, $isAutocloseEnabled.checked);
        await Sync.set(OPTIONS.AUTOCLOSE_TIME, $autocloseTimeSec.value);
    });
});
