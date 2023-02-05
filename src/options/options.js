import {
    Sync,
    OPTIONS
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $custom = document.getElementById(OPTIONS.CUSTOM_URL);
    $custom.value = await Sync.get(OPTIONS.CUSTOM_URL);

    const $host = document.getElementById(OPTIONS.HOST);
    $host.value = await Sync.get(OPTIONS.HOST);

    const $team = document.getElementById(OPTIONS.TEAM);
    $team.value = await Sync.get(OPTIONS.TEAM);

    const $tracker = document.getElementById(OPTIONS.TRACKER);
    $tracker.value = await Sync.get(OPTIONS.TRACKER);

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(OPTIONS.CUSTOM_URL, $custom.value);
        await Sync.set(OPTIONS.HOST, $host.value);
        await Sync.set(OPTIONS.TEAM, $team.value);
        await Sync.set(OPTIONS.TRACKER, $tracker.value);
    });
});
