import {
    Sync,
    Keys
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $host = document.getElementById(Keys.HOST);
    $host.value = await Sync.get(Keys.HOST);

    const $team = document.getElementById(Keys.TEAM);
    $team.value = await Sync.get(Keys.TEAM);

    const $tracker = document.getElementById(Keys.TRACKER);
    $tracker.value = await Sync.get(Keys.TRACKER);

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(Keys.HOST, $host.value);
        await Sync.set(Keys.TEAM, $team.value);
        await Sync.set(Keys.TRACKER, $tracker.value);
    });
});
