import React, {useCallback, useRef} from 'react';
import styles from './index.css';

type Props = {
	name: string;
	value: string;
	checked?: boolean;
	children: React.ReactNode;
	defaultChecked?: boolean;
	onClick?(value: string): void;
}

export function RadioButton({name, value, children, checked, defaultChecked, onClick}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = useCallback(() => {
		if (inputRef.current) {
			onClick?.(value);
			inputRef.current.click();
		}
	}, [onClick, value]);

	return (
		<button type='button' className={styles.button} onClick={handleClick}>
			<div>{children}</div>
			<input
				ref={inputRef}
				type='radio'
				name={name}
				value={value}
				checked={checked}
				className={styles.input}
				defaultChecked={defaultChecked}
			/>
		</button>
	);
}
