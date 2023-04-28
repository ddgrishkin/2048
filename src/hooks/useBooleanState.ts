import {useCallback, useState} from 'react';

export type UseBooleanState = {
	value: boolean;
	toggle(): void;
	setTrue(): void;
	setFalse(): void;
	setValue(nextValue: boolean): void;
};

export function useBooleanState(initialState: boolean = false): UseBooleanState {
	const [value, setValue] = useState(initialState);
	const toggle = useCallback(() => {
		setValue((currValue) => !currValue);
	}, []);

	const setTrue = useCallback(() => setValue(true), []);
	const setFalse = useCallback(() => setValue(false), []);

	return {value, toggle, setValue, setTrue, setFalse};
}
