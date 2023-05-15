import React, {useCallback} from 'react';
import {RadioButton} from 'form/RadioButton';
import cn from 'classnames';
import styles from './index.css';

type Props = {
	label?: string;
	value: number;
	options: number[];
	onChange(value: number): void;
}

export function SettingsField({label, options, value, onChange}: Props): React.ReactElement {
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(event.target.value));
	}, [onChange]);

	return (
		<label className={styles.label}>
			{label && <div className={styles.text}>{label}</div>}
			<div className={styles.group}>
				{options.map((rows) => (
					<RadioButton
						key={rows}
						name='rows'
						value={`${rows}`}
						onChange={handleChange}
						checked={value === rows}
					>
						<div
							className={cn(styles.option, {
								[styles.active]: value === rows,
							})}
						>
							{rows}
						</div>
					</RadioButton>
				))}
			</div>
		</label>
	);
};
