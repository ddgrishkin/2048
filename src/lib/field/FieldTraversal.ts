import {Coord, Vector} from 'lib/helpers';
import {FieldTraversalAxis} from './FieldTraversalAxis';
import {FieldTraversePredicate, FieldSize} from './types';

export class FieldTraversal {
	private readonly x: FieldTraversalAxis;
	private readonly y: FieldTraversalAxis;

	constructor(size: FieldSize) {
		this.x = new FieldTraversalAxis(size.cols);
		this.y = new FieldTraversalAxis(size.rows);
	}

	traverse(vector: Vector, predicate: FieldTraversePredicate) {
		const xTraverse = vector.x > 0 ? this.x.forEachRight : this.x.forEach;
		const yTraverse = vector.y < 0 ? this.y.forEachRight : this.y.forEach;

		xTraverse.call(this.x, (x: number) => {
			yTraverse.call(this.y, (y: number) => {
				predicate(new Coord(x, y));
			});
		});
	}
}
