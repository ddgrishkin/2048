import React, {useCallback, useEffect, useState} from 'react';
import {throttle} from 'lib/event';
import {Score} from 'components/Score';
import {FieldView} from 'components/FieldView';
import {Description} from 'components/Description';
import {useGameManager} from 'hooks/useGameManager';
import {ButtonRestart} from 'components/ButtonRestart';
import {ButtonSettings} from 'components/ButtonSettings';
import {GameConfigContext} from 'lib/game/context';
import {DIRECTION_BY_KEY} from 'lib/game/constants';
import {DEFAULT_CONFIG} from 'lib/game/constants';
import styles from './index.css';
import {useDialogManager} from 'lib/dialog/hooks';
import {DialogSettings} from 'components/DialogSettings';

export function GameView() {
	const dialogManager = useDialogManager();
	const [config, setConfig] = useState(() => DEFAULT_CONFIG);
	const {cells, score, isOver, restart, move} = useGameManager(config);

	useEffect(() => {
		const handleDirection = throttle(move, 100);
		const handleKeyDown = (event: KeyboardEvent) => {
			const direction = DIRECTION_BY_KEY[event.key];
			if (direction) {
				event.preventDefault();
				handleDirection(direction);
			}
		};

		document.body.addEventListener('keydown', handleKeyDown);
		return () => document.body.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleOpenSettings = useCallback(() => {
		const close = dialogManager.close.bind(dialogManager);
		dialogManager.open(
			<DialogSettings
				config={config}
				onSave={setConfig}
				onClose={close}
			/>
		);
	}, [config]);

	return (
		<GameConfigContext.Provider value={config}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.header}>
						<div className={styles.info}>
							<div className={styles.controls}>
								<Score value={score} />
								<ButtonRestart onClick={restart} />
							</div>
							<ButtonSettings onClick={handleOpenSettings} />
						</div>
					</div>
					<div className={styles.field}>
						<FieldView cells={cells} isOver={isOver} />
					</div>
					<Description />
				</div>
			</div>
		</GameConfigContext.Provider>
	);
}
