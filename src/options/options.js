import {
    Sync,
    HOST,
    TEAM
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $host = document.getElementById(HOST);
    $host.value = await Sync.get(HOST);

    const $team = document.getElementById(TEAM);
    $team.value = await Sync.get(TEAM);

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Sync.set(HOST, $host.value);
        await Sync.set(TEAM, $team.value);
    });
});
