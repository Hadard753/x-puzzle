import { Node } from './models/Node';
import { arrayEquals, getKeyValue, getNeighbors } from './utils';

export const BFS = (G: number[], root: number[]) => {
    // Create a Queue
    let Q: Node[] = [];
    let closeList = new Set();

    // Label root as discovered
    closeList.add(JSON.stringify(root));

    // Enqueue root
    Q.push({value: root});

    // While Q is not empty
    while (Q.length) {
        // v := Q.dequeue()
        let v: Node = Q.shift() || { value: [] };

        // If v is the goal
        if(arrayEquals(v.value,G)) {
            return v;
        }

        const edges = getNeighbors(v.value, Math.sqrt(v.value.length));
        // 1. In the neighbors object, we search for nodes this node is directly connected to.
        // 2. We filter out the nodes that have already been explored.
        // 3. Then we mark each unexplored node as explored and add it to the queue.
        Object.keys(edges)
        .forEach((n: string) => {
            const w: Node = { value : getKeyValue(n as never)(edges) };
            if(w.value) {
                if(!closeList.has(JSON.stringify(w.value))) {
                    closeList.add(JSON.stringify(w.value));
                    w.parent = v;
                    w.move = n;
                    Q.push(w);
                }
            }
        });
    }
}