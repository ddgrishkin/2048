import {useContext} from 'react';
import {DialogManagerContext} from './context';

export function useDialogManager() {
	return useContext(DialogManagerContext);
}
