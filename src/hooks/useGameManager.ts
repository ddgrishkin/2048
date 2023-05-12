import {StorageByCoord} from 'lib/helpers/StorageByCoord';
import {useState, useCallback, useEffect, useRef} from 'react';
import {GameConfig} from 'lib/game/types';
import {ReactCell} from 'lib/react';
import {Direction} from 'lib/types';
import {Game} from 'lib/game';

type State = {
	cells: ReactCell[];
	score: number;
	isOver: boolean;
};

const defaultState: State = {
	cells: [],
	score: 0,
	isOver: false,
};

export function useGameManager(config: GameConfig) {
	const [game, setGame] = useState<Game>();
	const gameRef = useRef(game);
	gameRef.current = game;

	const getInitialState = useCallback((): State => {
		const cells = gameRef.current?.values().map(({coord, value}) => (
			new ReactCell(value, coord)
		));

		return Object.assign(defaultState, {
			cells,
			score: gameRef.current?.score,
			isOver: gameRef.current?.isOver,
		});
	}, []);

	const [state, setState] = useState<State>(defaultState);
	const restart = useCallback(() => {
		gameRef.current?.restart();
		setState(getInitialState());
	}, []);

	const move = useCallback((direction: Direction) => {
		const moveState = gameRef.current?.move(direction);
		if (moveState) {
			setState(({cells}) => {
				const cellByCoord = new StorageByCoord<ReactCell>();
				const cellsCopy = cells.reduceRight<ReactCell[]>((acc, item) => {
					if (!cellByCoord.has(item.coord)) {
						cellByCoord.add(item.coord, item);
						acc.unshift(item);
					}

					return acc;
				}, []);

				moveState.transitions.values().forEach(({from, to}) => {
					const fromCell = cellByCoord.get(from);
					if (fromCell) {
						fromCell.move(to);
					}
				});

				moveState.merges.values().forEach(({value, to}) => {
					const newCell = new ReactCell(value, to);
					cellsCopy.push(newCell);
				}, []);

				if (moveState.newValue) {
					const {coord, value} = moveState.newValue;
					cellsCopy.push(new ReactCell(value, coord));
				}

				return {
					score: moveState.score,
					isOver: moveState.isOver,
					cells: cellsCopy,
				};
			});
		}
	}, []);

	useEffect(() => {
		setGame(new Game(config));
		setState(getInitialState);

		return restart;
	}, [config]);

	return {
		cells: state.cells,
		score: state.score,
		isOver: state.isOver,
		move,
		restart,
	};
}
