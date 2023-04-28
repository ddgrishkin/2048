import {useContext} from 'react';
import {GameContext} from 'lib/game/context';

export function useGame() {
	return useContext(GameContext);
}
