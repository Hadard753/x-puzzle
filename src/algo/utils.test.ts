
import { _1Dto2DState, _2Dto1DState } from './utils';

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

