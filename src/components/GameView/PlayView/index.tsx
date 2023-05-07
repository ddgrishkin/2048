import React from 'react';
import styles from './index.css';

export function PlayView(): React.ReactElement {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>GAME PAUSED</div>
				<div className={styles.subtitle}>Click at any place to start</div>
			</div>
		</div>
	);
};
