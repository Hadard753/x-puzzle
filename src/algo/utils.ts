
export const _1Dto2DState = (state: number[], size: number) => {
    const convertedState: number[][] = [];

    for(let i=0, k=0; i<size*size; i+=size, k++) {
        convertedState[k] = [];
        for(let j=0; j<size; j++) {
            convertedState[k].push(state[i+j]);
        }
    }

    return convertedState;
}

export const _2Dto1DState = (state: number[][], size: number) => {
    const convertedState: number[] = [];

    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            convertedState.push(state[i][j]);
        }
    }

    return convertedState;
}

export const swap = (state: number[], i: number, j:number) => {
    const swapped = [...state];
    [swapped[i], swapped[j]] = [swapped[j], swapped[i]];
    return swapped;
}

export const getNeighbors = (state: number[], size: number) : { R?: number[], L?: number[], U?: number[], D?: number[]} => {
    const zeroIndex = state.findIndex(x=> x===0);

    if (zeroIndex < 0) return {};
    const zeroRowIn2D = Math.floor(zeroIndex/size);
    const zeroColIn2D = zeroIndex%size;

    const R = zeroColIn2D === 0 ? undefined : swap(state, zeroIndex, zeroIndex-1);
    const L = zeroColIn2D === size-1 ? undefined : swap(state, zeroIndex, zeroIndex+1);
    const D = zeroRowIn2D === 0 ? undefined : swap(state, zeroIndex, zeroIndex-size);
    const U = zeroRowIn2D === size-1 ? undefined : swap(state, zeroIndex, zeroIndex+size);

    return {R,L,D,U};
}

export const arrayEquals = (a: any[], b: any[]) => {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

// best
export const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
  obj[key];


// User defined class
// to store element and its priority
class QElement {
    element;
    priority: number;

	constructor(element: any, priority: number)
	{
		this.element = element;
		this.priority = priority;
	}
}

// PriorityQueue class
export class PriorityQueue {
    items: any[]

	// An array is used to implement priority
	constructor()
	{
		this.items = [];
	}

    // enqueue function to add element
    // to the queue as per priority
    enqueue(element: any, priority: number)
    {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }

    // dequeue method to remove
    // element from the queue
    dequeue()
    {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // isEmpty function
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length === 0;
    }

    getByKey(key: string) {
        return this.items.find((item: { key: string; }) => item.key === key)
    }

    updateByKey(key: string, updated: any) {
        this.items.forEach((item: { key: string; }) => item.key === key ? {...item, ...updated} : item)
    }
}
