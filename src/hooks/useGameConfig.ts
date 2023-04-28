import {useContext} from 'react';
import {GameConfigContext} from 'lib/game/context';

export function useGameConfig() {
	return useContext(GameConfigContext);
}
