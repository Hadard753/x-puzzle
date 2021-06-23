import { arrayEquals, getKeyValue, getNeighbors, PriorityQueue } from './utils';

const heuristic = (G: number[], curr: number[]) => {
    const size = Math.sqrt(G.length)
    let distance = 0;
    for(let i=0; i < curr.length; i++) { // Foreach tile in the puzzle calculate its distance from the goal state (Manhattan distance)
        const currIndex = curr.findIndex(x=> x===i);
        if (currIndex < 0) return -1;
        const currRowIn2D = Math.floor(currIndex/size);
        const currColIn2D = currIndex%size;

        const goalIndex = curr.findIndex(x=> x===i);
        const goalRowIn2D = Math.floor(goalIndex/size);
        const goalColIn2D = goalIndex%size;
        if (goalIndex < 0) return -1;

        distance += Math.abs(currRowIn2D-goalRowIn2D) + Math.abs(currColIn2D-goalColIn2D);
    }
    return distance;
}

export const Astar = (G: number[], root: number[]) => {
    var openList = new PriorityQueue();
    // push startNode onto openList
    const rootH = heuristic(G,root);
    openList.enqueue({key: JSON.stringify(root), value: root, g: 0, h: rootH, f: rootH, parent: undefined, move: undefined}, rootH);
    const closedList = new Map();

    // openList is not empty
    while (!openList.isEmpty()) {
        // find lowest f in openList
        const currentNode = openList.dequeue().element;

        // if currentNode is final, return the successful path
        if(arrayEquals(currentNode.value,G)) {
            return currentNode;
        }
        closedList.set(currentNode.key, currentNode);

        const edges = getNeighbors(currentNode.value, Math.sqrt(currentNode.value.length));
        //  foreach neighbor of currentNode
        Object.keys(edges)
        .forEach((n: string) => {
            if(getKeyValue(n as never)(edges)) {
                const neighbor = { value : getKeyValue(n as never)(edges), key: JSON.stringify(getKeyValue(n as never)(edges)) };
                const g = currentNode.g+1;
                const h = heuristic(G, neighbor.value);
                const f = g+h;
                const neighborInOpenList = openList.getByKey(neighbor.key);
                // if neighbor is not in openList
                if(!neighborInOpenList) {
                    openList.enqueue({ ...neighbor, g, h, f, move: n, parent: currentNode }, f)
                } else if (g < neighborInOpenList.g) { // if neighbor is in openList but the current g is better than previous g
                    neighborInOpenList.g = g;
                    neighborInOpenList.f = f;
                    neighborInOpenList.parent = currentNode;
                    neighborInOpenList.move = n;
                }
            }
        });
    }
}