import assert from "node:assert";

import { 
    Node,
    Leaf
} from "../../src/common/index.js";

describe("Node", function () {
    it("Node - is leaf", () => {
        const node = new Node("test", []);
        const expected = true;

        const actual = node.isLeaf;

        assert.equal(actual, expected);
    });

    it("Node - is not leaf", () => {
        const node = new Node("test", [new Node("test2", [])]);
        const expected = false;

        const actual = node.isLeaf;

        assert.equal(actual, expected);
    });

    it("Leaf - is leaf", () => {
        const node = new Leaf(1, "test", "{{value}}");
        const expected = true;

        const actual = node.isLeaf;

        assert.equal(actual, expected);
    });
});
