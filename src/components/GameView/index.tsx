import React, {useCallback, useEffect, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import {useGameManager} from 'hooks/useGameManager';
import {Score} from 'components/Score';
import {FieldView} from 'components/FieldView';
import {Description} from 'components/Description';
import {ButtonRestart} from 'components/ButtonRestart';
import {ButtonSettings} from 'components/ButtonSettings';
import {DialogSettings} from 'components/DialogSettings';
import {DEFAULT_CONFIG} from 'lib/game/constants';
import {DIRECTION_BY_KEY, DIRECTION_BY_SWIPE} from 'lib/game/constants';
import {useDialogManager} from 'lib/dialog/hooks';
import {GameConfigContext} from 'lib/game/context';
import {throttle} from 'lib/event';
import styles from './index.css';

const THROTTLE_DURATION = 100;

export function GameView() {
	const dialogManager = useDialogManager();
	const [config, setConfig] = useState(() => DEFAULT_CONFIG);
	const {cells, score, isOver, restart, move} = useGameManager(config);

	const handleMove = useCallback(throttle(move, THROTTLE_DURATION), [move]);
	const handlers = useSwipeable({
		touchEventOptions: {passive: false},
		onSwiped(event) {
			event.event.preventDefault();
			handleMove(DIRECTION_BY_SWIPE[event.dir]);
		},
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const direction = DIRECTION_BY_KEY[event.key];
			if (direction) {
				event.preventDefault();
				handleMove(direction);
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
					<div {...handlers} className={styles.field}>
						<FieldView cells={cells} isOver={isOver} />
					</div>
					<Description />
				</div>
			</div>
		</GameConfigContext.Provider>
	);
}
