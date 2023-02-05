import {
    Sync,
    OPTIONS,
    TRACKERS
} from "../../common/index.js";

const updateDefaultValues = async () => {
    const customUrl = await Sync.get(OPTIONS.CUSTOM_URL);
    if (customUrl === undefined) {
        await Sync.set(OPTIONS.CUSTOM_URL, "https://example.com/test-");
    }

    const host = await Sync.get(OPTIONS.HOST);
    if (host === undefined) {
        await Sync.set(OPTIONS.HOST, "https://example.com");
    }

    const team = await Sync.get(OPTIONS.TEAM);
    if (team === undefined) {
        await Sync.set(OPTIONS.TEAM, "MYTEAM");
    }

    const tracker = await Sync.get(OPTIONS.TRACKER);
    if (tracker === undefined) {
        await Sync.set(OPTIONS.TRACKER, TRACKERS.CUSTOM);
    }
};

export const onInstall = async () => {
    await updateDefaultValues();
};
