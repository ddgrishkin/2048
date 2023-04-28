import {Coord, StorageByCoord} from 'lib/helpers';

export type FieldTraversePredicate = (coord: Coord) => void;
export type FieldSize = {
	rows: number;
	cols: number;
};

export type FieldMoveState = {
	merges: StorageByCoord<FieldMergeItem>;
	transitions: StorageByCoord<FieldTransitionItem>;
};

export type FieldValueItem = {
	value: number;
	coord: Coord;
};

export type FieldTransitionItem = {
	from: Coord;
	to: Coord;
};

export type FieldMergeItem = {
	value: number;
	from: Coord;
	to: Coord;
};
