
import { _1Dto2DState, _2Dto1DState, arrayEquals, getKeyValue, getNeighbors, swap } from './utils';

test('1D state to 2D state', () => {
    const expected = [
        [1,2,3,4],
        [5,6,7,8],
        [9, 10,11,12],
        [13,0,14,15],
    ];
    const actual = _1Dto2DState([1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15], 4);

    expect(actual).toEqual(expected);
});

test('2D state to 1D state', () => {
    const expected = [1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15];
    const actual = _2Dto1DState([
        [1,2,3,4],
        [5,6,7,8],
        [9, 10,11,12],
        [13,0,14,15],
    ], 4);

    expect(actual).toEqual(expected);
});

test('swap', () => {
    const expected = [1,2,3,4,5];
    const actual = swap([1,2,3,5,4], 3, 4);

    expect(actual).toEqual(expected);
});

test('getNeighbors only R and D', () => {
    const expected = { R: [1,2,3,4,5,6,7,0,8], D: [1,2,3,4,5,0,7,8,6] };
    const actual = getNeighbors([1,2,3,4,5,6,7,8,0], 3);

    expect(actual).toEqual(expected);
});

test('getNeighbors only L and U', () => {
    const expected = { L: [1,0,2,3,4,5,6,7,8], U: [3,1,2,0,4,5,6,7,8] };
    const actual = getNeighbors([0,1,2,3,4,5,6,7,8], 3);

    expect(actual).toEqual(expected);
});

test('getNeighbors all directions', () => {
    const expected = {
        L: [1,2,3,4,5,0,6,7,8],
        U: [1,2,3,4,7,5,6,0,8],
        R: [1,2,3,0,4,5,6,7,8],
        D: [1,0,3,4,2,5,6,7,8]
    };
    const actual = getNeighbors([1,2,3,4,0,5,6,7,8], 3);

    expect(actual).toEqual(expected);
});

test('arrayEquals true', () => {
    const actual = arrayEquals([1,1,1], [1,1,1]);
    expect(actual).toBe(true);
});

test('arrayEquals false', () => {
    const actual = arrayEquals([1,1,1], [1,1,2]);
    expect(actual).toBe(false);
});

test('getKeyValue', () => {
    const expected = [1,2,3];
    const actual = getKeyValue('R' as never)({R: [1,2,3]});
    expect(actual).toEqual(expected);
});