import { Node } from './models/Node';
import { arrayEquals, getNeighbors } from './utils';

export const DFSRec = (G: number[], V: Node, closeList: Map<string, Node>, currDepth: number, maxDepth: number) => {
  // If V is the goal
  if(arrayEquals(V.value,G)) {
    return V;
  }

  // Stop if we reached max depth
  if (currDepth === maxDepth) {
    return null;
  }

  // Label root as discovered
  closeList.set(JSON.stringify(V.value), V);

  // Log every element that comes out of the Queue
  const edges = getNeighbors(V.value, Math.sqrt(V.value.length));

  for (const key in edges) {
    const w = (edges as any)[key];

    if(w && !closeList.has(JSON.stringify(w))) {
      const solution: any = DFSRec(G, { value: w, parent: V, move: key }, closeList, currDepth+1, maxDepth);
      if(solution !== null)
        return solution;
    }
  }

  // No path found
  return null;
}

export const DFS = (G: number[], root: number[], maxDepth: number) => {
  let closeList = new Map();

  return DFSRec(G, { value: root }, closeList, 0, maxDepth);
}

export const IDS = (G: number[], root: number[], limit: number) => {
  // If root is the goal
  if(arrayEquals(root,G)) {
    return { value: root };
  }
  // Do a DFS searching for a path of length 1
  let depth = 1;
  while (depth <= limit) {
    const dfsRes = DFS(G, root, depth);
    if (dfsRes) { // If we found a path return it
      return dfsRes;
    } else { // If there is no path of length depth go one level deeper
      depth++;
    }
  }
  return false; // We have reached the limit depth and found no path to the goal state
}