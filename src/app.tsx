import React from 'react';
import {GameView} from 'components/GameView';
import {DialogManagerContext, initialValue} from 'lib/dialog/context';
import './index.css';

export default function App() {
	return (
		<DialogManagerContext.Provider value={initialValue}>
			<GameView />
		</DialogManagerContext.Provider>
	);
}
