import {Coord, Vector} from 'lib/helpers';
import {FieldTraversal} from './FieldTraversal';
import {FieldSize} from './types';

export class FieldCoord extends FieldTraversal {
	readonly size: FieldSize;
	constructor(size: FieldSize) {
		super(size);
		this.size = size;
	}

	hasCoord(coord: Coord): boolean {
		const xBelongs = coord.x >= 0 && coord.x < this.size.cols;
		const yBelongs = coord.y >= 0 && coord.y < this.size.rows;
		return xBelongs && yBelongs;
	}

	getAllCoords(): Coord[] {
		const result: Coord[] = [];
		const vector: Vector = new Vector('down');
		this.traverse(vector, (coord) => {
			result.push(coord);
		});

		return result;
	}

	getNextCoord(coord: Coord, vector: Vector): Coord | null {
		const nextX = coord.x + vector.x;
		const nextY = coord.y - vector.y;

		if (nextY < 0 || nextY >= this.size.rows) return null;
		if (nextX < 0 || nextX >= this.size.cols) return null;

		return new Coord(nextX, nextY);
	}
}
