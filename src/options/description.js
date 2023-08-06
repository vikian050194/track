import {
    OPTIONS,
    DEFAULTS
} from "../common/index.js";
import { getTranslation } from "./translation.js";

class Description {
    constructor(id, title, paragraphs) {
        this.id = id;
        this.title = title;
        this.paragraphs = paragraphs;
    }
}

const getDefault = (key) => `<i>Default value is &laquo;${getTranslation(DEFAULTS[key])}&raquo;.</i>`;

const makeDescription = (key, title, paragraphs) => new Description(key, title, [...paragraphs, getDefault(key)]);

export const descriptions = [
    makeDescription(
        OPTIONS.UI_FONT_SIZE,
        "Font size",
        [
            "Popup font size in pixels."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_COLOR,
        "Selected item color",
        [
            "Color of selected item.",
            "It's also used in different places on options page."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT,
        "Selected item font weight",
        [
            "Font weight of selected item."
        ]
    ),
    makeDescription(
        OPTIONS.UI_SELECTED_ITEM_ARROW,
        "Arrow pointer",
        [
            "Arrow appears in front of selected item."
        ]
    ),

    makeDescription(
        OPTIONS.IS_AUTOCLOSE_ENABLED,
        "Autoclose enabled",
        [
            "If enabled then popup will be closed automatically after usage.",
            "It's possible to cancel closing by any key pressing."
        ]
    ),
    makeDescription(
        OPTIONS.AUTOCLOSE_TIME,
        "Autoclose time",
        [
            "Popup autoclose time in seconds."
        ]
    ),

    makeDescription(
        OPTIONS.CHANGELOG_SHOW,
        "Show on update",
        [
            "If enabled then changelog page will be shown automatically on extension version update."
        ]
    )
];