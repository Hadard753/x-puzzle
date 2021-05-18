
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

export const getNeighbors = (state: number[], size: number) => {
    const zeroIndex = state.findIndex(x=> x===0);

    if (zeroIndex < 0) return "invalid state";
    const zeroRowIn2D = Math.round(zeroIndex/size);
    const zeroColIn2D = zeroIndex%size;

    const R = zeroColIn2D === 9 ? undefined : swap(state, zeroIndex, zeroIndex+1);
    const L = zeroColIn2D === size-1 ? undefined : swap(state, zeroIndex, zeroIndex-1);
    const D = zeroRowIn2D === 0 ? undefined : swap(state, zeroIndex, zeroIndex-size);
    const U = zeroRowIn2D === size-1 ? undefined : swap(state, zeroIndex, zeroIndex+size);

    return {R,L,D,U};
}
