export interface Node {
    value: number[],
    parent?: Node,
    move?: string; // 'R' | 'L' | 'U' | 'D'
}