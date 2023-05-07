import React from 'react';
import {GameView} from 'components/GameView';
import {DialogManager} from 'lib/dialog';
import {DialogManagerContext} from 'lib/dialog/context';

// TODO: get container from props
const DIALOG_CONTAINER = document.getElementById('dialog')!;
const DIALOG_MANAGER = new DialogManager(DIALOG_CONTAINER);

export default function App() {
	return (
		<DialogManagerContext.Provider value={DIALOG_MANAGER}>
			<GameView />
		</DialogManagerContext.Provider>
	);
}
