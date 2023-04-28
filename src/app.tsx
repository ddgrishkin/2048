import React from 'react';
import {DialogManager} from 'lib/dialog';
import {DialogManagerContext, initialValue} from 'lib/dialog/context';
import {GameView} from 'components/GameView';
import './index.css';

export default function App() {
	return (
		<DialogManagerContext.Provider value={initialValue}>
			<GameView />
		</DialogManagerContext.Provider>
	);
}
