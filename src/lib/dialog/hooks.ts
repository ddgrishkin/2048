import {useContext} from 'react';
import {DialogManagerContext} from './context';

export function useDialogManager() {
	const dialogManager = useContext(DialogManagerContext);
	if (!dialogManager) {
		throw new Error('Provider for DialogManagerContext was not provided');
	}

	return dialogManager;
}
