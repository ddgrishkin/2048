export class FieldTraversalAxis {
	readonly size: number;
	constructor(size: number) {
		this.size = size;
	}

	forEach(predicate: (value: number) => void) {
		for (let i = 0; i < this.size; i++) {
			predicate(i);
		}
	}

	forEachRight(predicate: (value: number) => void) {
		for (let i = this.size - 1; i >= 0; i--) {
			predicate(i);
		}
	}
}
