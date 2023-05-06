import {Field} from 'lib/field';
import {Direction} from 'lib/types';
import {randomElement} from 'lib/array';
import {DIRECTIONS} from './constants';
import {GameConfig, GameMoveState} from './types';
import {getFieldSizeFromGameConfig} from './utils';

export class Game {
	field: Field;
	score: number;
	config: GameConfig;
	isOver: boolean;

	constructor(config: GameConfig) {
		this.field = new Field(getFieldSizeFromGameConfig(config));
		this.config = config;
		this.isOver = false;
		this.score = 0;
		this.init();
	}

	restart() {
		this.score = 0;
		this.isOver = false;
		this.field = new Field(getFieldSizeFromGameConfig(this.config));
		this.init();
	}

	init() {
		const coords = this.field.getEmptyCoords();
		const emptyCoord1 = randomElement(coords);
		const emptyCoord2 = randomElement(coords);

		if (emptyCoord1.isEqual(emptyCoord2)) {
			this.field.addValue(this.config.digit * 2, emptyCoord1);
		} else {
			this.field.addValue(this.config.digit, emptyCoord1);
			this.field.addValue(this.config.digit, emptyCoord2);
		}
	}

	move(direction: Direction): GameMoveState | void {
		if (this.isOver) return;

		const {merges, transitions} = this.field.move(direction);
		const emptyCoords = this.field.getEmptyCoords();

		// Add new value on the field if it has vacant cells.
		// Just take such cell randomly and fill it.
		let newValue: GameMoveState['newValue'] = undefined;
		if (emptyCoords.length > 0 && transitions.size > 0) {
			const emptyCoord = randomElement(emptyCoords);
			this.field.addValue(this.config.digit, emptyCoord);
			newValue = {coord: emptyCoord, value: this.config.digit};
		}

		// If field has 0 empty cells, that means it's full
		// and if field has no transitions after move we have to check that field has 
		// at least one possibile move, otherwise we have to over game.
		if (!emptyCoords.length && !transitions.size) {
			const fieldClone = this.field.clone();
			this.isOver = DIRECTIONS.every((item) => {
				const {transitions} = fieldClone.move(item);
				return !transitions.size;
			});
		}

		// Increase score if field has merges after move.
		if (merges.size > 0) {
			merges.values().forEach(({value}) => {
				this.score += value;
			});
		}

		// TODO
		// @ts-ignore
		return {
			merges,
			newValue,
			transitions,
			score: this.score,
			isOver: this.isOver,
		};
	}

	values() {
		return this.field.values();
	}
}
