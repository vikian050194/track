import {
    Node,
    Leaf
} from "../common/index.js";

export const getHierarchy = (targets) => {
    const result = [];

    for (const target of targets) {
        const layersNames = target.name.split("/");

        let node = null;
        let nodes = result;

        for (let i = 0; i < layersNames.length; i++) {
            const name = layersNames[i];
            node = nodes.find((n) => n.name === name);

            if (node) {
                nodes = node.nodes;
            } else {
                if(i === layersNames.length - 1){
                    node = new Leaf(target.id, name, target.template);
                } else {
                    node = new Node(name, []);
                }

                nodes.push(node);
                nodes = node.nodes;
            }
        }
    }

    return result;
};