import {
    Sync,
    OPTIONS
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Autoclose
    const $isAutocloseEnabled = document.getElementById(OPTIONS.IS_AUTOCLOSE_ENABLED);
    $isAutocloseEnabled.checked = await Sync.get(OPTIONS.IS_AUTOCLOSE_ENABLED);

    const $autocloseTimeSec = document.getElementById(OPTIONS.AUTOCLOSE_TIME);
    $autocloseTimeSec.value = await Sync.get(OPTIONS.AUTOCLOSE_TIME);

    // Save
    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        // Autoclose
        await Sync.set(OPTIONS.IS_AUTOCLOSE_ENABLED, $isAutocloseEnabled.checked);
        await Sync.set(OPTIONS.AUTOCLOSE_TIME, $autocloseTimeSec.value);
    });
});
