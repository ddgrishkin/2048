import {StorageByCoord} from 'lib/helpers/StorageByCoord';
import {Vector} from 'lib/helpers/Vector';
import {Coord} from 'lib/helpers/Coord';
import {Direction} from 'lib/types';
import {FieldCoord} from './FieldCoord';
import {
	FieldMoveState,
	FieldMergeItem,
	FieldValueItem,
	FieldTransitionItem,
} from './types';

export class Field extends FieldCoord {
	private valuesStorage: StorageByCoord<FieldValueItem> = new StorageByCoord();

	clone(): Field {
		const fieldCopy = new Field(this.size);
		const vector: Vector = new Vector('down');
		this.traverse(vector, (coord) => {
			const value = this.valuesStorage.get(coord);
			if (value) {
				fieldCopy.addValue(value.value, coord);
			}
		});

		return fieldCopy;
	}

	getEmptyCoords(): Coord[] {
		const result: Coord[] = [];
		const vector: Vector = new Vector('down');
		this.traverse(vector, (coord) => {
			if (!this.valuesStorage.has(coord)) {
				result.push(coord);
			}
		});

		return result;
	}

	addValue(value: number, coord: Coord): void {
		this.valuesStorage.add(coord, {coord, value});
	}

	deleteValue(coord: Coord): FieldValueItem | void {
		return this.valuesStorage.delete(coord);
	}

	values(): FieldValueItem[] {
		return this.valuesStorage.values();
	}

	move(direction: Direction): FieldMoveState {
		const vector = new Vector(direction);
		const merges = new StorageByCoord<FieldMergeItem>();
		const transitions = new StorageByCoord<FieldTransitionItem>();

		this.traverse(vector, (coord) => {
			if (this.valuesStorage.has(coord)) {
				let coordCurr = coord;
				let coordNext = this.getNextCoord(coord, vector);

				while (coordNext) {
					const valueNext = this.valuesStorage.get(coordNext);
					const valueCurr = this.valuesStorage.get(coordCurr);

					if (!valueCurr) break;
					if (valueNext) {
						if (valueNext.value === valueCurr.value && !merges.has(coordNext)) {
							const nextValue = valueNext.value * 2;
							this.deleteValue(coordCurr);
							this.addValue(nextValue, coordNext);
							transitions.add(coord, {from: coord, to: coordNext});
							merges.add(coordNext, {
								from: coord,
								to: coordNext,
								value: nextValue,
							});
						}
	
						break;
					} else {
						transitions.add(coord, {from: coord, to: coordNext});
						this.addValue(valueCurr.value, coordNext);
						this.deleteValue(coordCurr);
					}
	
					coordCurr = coordNext;
					coordNext = this.getNextCoord(coordNext, vector);
				}
			}
		});

		return {transitions, merges};
	}
}
