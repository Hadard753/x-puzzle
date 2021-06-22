import { Astar } from './Astar';
import { Node } from './models/Node';

test('Astar', () => {
    const expected = 'UL';
    let v: Node | undefined = Astar([1,2,3,4,5,6,7,8,0], [1,2,3,4,0,6,7,5,8]);
    let actual = '';

    while(v && v.parent) {
        actual = v.move + actual;
        v = v.parent;
    }

    expect(actual).toEqual(expected);
});