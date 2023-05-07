import React from 'react';
import styles from './index.css';

export function OverView(): React.ReactElement {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>GAME OVER</div>
				<div className={styles.subtitle}>You have no turns</div>
			</div>
		</div>
	);
};
