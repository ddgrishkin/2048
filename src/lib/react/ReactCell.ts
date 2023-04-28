import {v4 as uuid} from 'uuid';
import {Coord} from 'lib/helpers';

export class ReactCell {
	readonly id: string;
	value: number;
	coord: Coord;

	constructor(value: number, coord: Coord) {
		this.id = uuid();
		this.value = value;
		this.coord = coord;
	}

	update(value: number) {
		this.value = value;
	}

	move(coord: Coord) {
		this.coord = coord;
	}
}
