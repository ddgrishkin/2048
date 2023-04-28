import {useBooleanState} from './useBooleanState';

export type UsePopupState = {
	isOpen: boolean;
	open(): void;
	close(): void;
};

export function usePopupState(initialState: boolean = false): UsePopupState {
	const {setFalse, setTrue, value} = useBooleanState(initialState);

	return {
		isOpen: value,
		open: setTrue,
		close: setFalse,
	};
}
