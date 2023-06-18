export class Node {
    constructor(name, nodes) {
        this.name = name;
        this.nodes = nodes;
    }

    get isLeaf() {
        return this.nodes.length === 0;
    }
}

export class Leaf extends Node {
    constructor(id, name, template) {
        super(name, []);

        this.id = id;
        this.template = template;
    }
}
