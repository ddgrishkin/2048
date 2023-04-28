import {Coord} from './Coord';
import {Direction} from 'lib/types';

export const COORD_BY_DIRECTION: Record<Direction, Coord> = {
	right: new Coord(1, 0),
	left: new Coord(-1, 0),
	down: new Coord(0, -1),
	up: new Coord(0, 1),
}

export class Vector extends Coord {
	constructor(direction: Direction) {
		const coord = COORD_BY_DIRECTION[direction];
		super(coord.x, coord.y);
	}
}
