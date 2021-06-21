import { IDS } from './IDS';
import { Node } from './models/Node';

test('IDS', () => {
    const expected = 'UL';
    let v: Node | undefined = IDS([1,2,3,4,5,6,7,8,0], [1,2,3,4,0,6,7,5,8], 5);
    let actual = '';

    while(v && v.parent) {
        actual = v.move + actual;
        v = v.parent;
    }

    expect(actual).toEqual(expected);
});


test('IDS Failed not deep enough', () => {
    const expected = '';
    let v: Node | undefined = IDS([1,2,3,4,5,6,7,8,0], [1,2,3,4,0,6,7,5,8], 1);
    let actual = '';

    while(v && v.parent) {
        actual = v.move + actual;
        v = v.parent;
    }

    expect(actual).toEqual(expected);
});