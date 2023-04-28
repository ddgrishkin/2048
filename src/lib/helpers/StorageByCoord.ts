import {Coord} from './Coord';

export class StorageByCoord<T> {
	private data: Record<string, T | void> = {};

	get size(): number {
		return this.values().length;
	}

	has(coord: Coord) {
		const coordKey = coord.toString();
		return coordKey in this.data;
	}

	add(coord: Coord, value: T) {
		const coordKey = coord.toString();
		this.data[coordKey] = value;
	}

	get(coord: Coord) {
		const coordKey = coord.toString();
		return this.data[coordKey];
	}

	delete(coord: Coord) {
		const coordKey = coord.toString();
		const coordCell = this.data[coordKey];
		delete this.data[coordKey];

		return coordCell;
	}

	values(): T[] {
		return Object
			.values(this.data)
			.filter((item): item is T => Boolean(item));
	}
}
