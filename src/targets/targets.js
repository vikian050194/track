import {
    Local,
    Target,
    TARGETS,
    dom
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $root = document.getElementById("root");

    const rows = await Local.get(TARGETS.TARGETS);
    const newId = rows.reduce((max, { id }) => max < id ? id : max, 0) + 1;

    const onDelete = async (id) => {
        const remainingRows = rows.filter(r => r.id !== id);
        await Local.set(TARGETS.TARGETS, remainingRows);
        location.reload();
    };

    const columns = [
        new dom.DataColumn("#", "id", false),
        new dom.DataColumn("name", "name", true),
        new dom.DataColumn("URL template", "template", true),
        new dom.DataColumn("active", "isActive", true),
        new dom.ActionColumn("delete", "X", onDelete)
    ];

    const $table = dom.makeTable(columns, rows);
    $root.append($table);

    const $createButton = document.getElementById("create");
    $createButton.addEventListener("click", async () => {
        rows.push(new Target(newId, `target#${newId}`, "http://example.com?issue={{value}}", true));
        await Local.set(TARGETS.TARGETS, rows);
        location.reload();
    });

    const $saveButton = document.getElementById("save");
    $saveButton.addEventListener("click", async () => {
        await Local.set(TARGETS.TARGETS, rows);
        location.reload();
    });

    const $resetButton = document.getElementById("reset");
    $resetButton.addEventListener("click", async () => {
        await Local.set(TARGETS.TARGETS, []);
        location.reload();
    });
});
