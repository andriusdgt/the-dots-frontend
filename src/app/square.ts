import { Point } from './point';

export class Square {
    constructor(
        public vertices: Map<SquareVertex, Point>
    ) {}
}

enum SquareVertex {
    BOTTOM_LEFT, UPPER_LEFT, UPPER_RIGHT, BOTTOM_RIGHT
}
