import assert from "node:assert";

import {
    Target,
    Node,
    Leaf
} from "../../src/common/index.js";
import { getHierarchy } from "../../src/popup/hierarchy.js";

describe("Hierarchy", function () {
    it("No targets", () => {
        const input = [];
        const expected = [];

        const actual = getHierarchy(input);

        assert.deepEqual(actual, expected);
    });

    it("One layer - three target", () => {
        const input = [
            new Target(1, "first", "first-{{value}}", true),
            new Target(3, "third", "third-{{value}}", false),
            new Target(2, "second", "second-{{value}}", true)
        ];
        const expected = [
            new Leaf(1, "first", "first-{{value}}"),
            new Leaf(3, "third", "third-{{value}}"),
            new Leaf(2, "second", "second-{{value}}")
        ];

        const actual = getHierarchy(input);

        assert.deepEqual(actual, expected);
    });

    it("Two layers - one target", () => {
        const input = [
            new Target(1, "a/aa", "first-{{value}}", true)
        ];
        const expected = [
            new Node("a", [new Leaf(1, "aa", "first-{{value}}")])
        ];

        const actual = getHierarchy(input);

        assert.deepEqual(actual, expected);
    });

    it("Two layers - three target", () => {
        const input = [
            new Target(1, "a/aa", "aaa-{{value}}", true),
            new Target(3, "b", "b-{{value}}", true),
            new Target(2, "a/ab", "aab-{{value}}", true)
        ];
        const expected = [
            new Node("a", [
                new Leaf(1, "aa", "aaa-{{value}}"),
                new Leaf(2, "ab", "aab-{{value}}")
            ]),
            new Leaf(3, "b", "b-{{value}}")
        ];

        const actual = getHierarchy(input);

        assert.deepEqual(actual, expected);
    });
});
