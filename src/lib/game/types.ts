import {FieldSize, FieldMoveState, FieldValueItem} from 'lib/field/types';

export type GameConfig = {
	digit: number;
	rows: number;
	cols: number;
};

export type GameMoveState = FieldMoveState & {
	score: number;
	isOver: boolean;
	newValue?: FieldValueItem;
};
