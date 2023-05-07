import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useSwipeable} from 'react-swipeable';

// hooks imports
import {useGameManager} from 'hooks/useGameManager';
import {useClickOutside} from 'hooks/useClickOutside';
import {useBooleanState} from 'hooks/useBooleanState';

// components imports
import {Score} from 'components/Score';
import {ButtonRestart} from 'components/ButtonRestart';
import {ButtonSettings} from 'components/ButtonSettings';
import {DialogSettings} from 'components/DialogSettings';

// lib imports
import {throttle} from 'lib/event';
import {useDialogManager} from 'lib/dialog/hooks';
import {GameConfigContext} from 'lib/game/context';
import {DEFAULT_CONFIG} from 'lib/game/constants';
import {DIRECTION_BY_KEY, DIRECTION_BY_SWIPE} from 'lib/game/constants';

// local imports
import {GridView} from './GridView';
import {CellsView} from './CellsView';
import {OverView} from './OverView';
import {PlayView} from './PlayView';
import styles from './index.css';

const THROTTLE_DURATION = 100;

export function GameView() {
	const dialogRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const dialogManager = useDialogManager();
	const progressState = useBooleanState();
	const [config, setConfig] = useState(() => DEFAULT_CONFIG);
	const {cells, score, isOver, restart, move} = useGameManager(config);

	const handleMove = useCallback(throttle(move, THROTTLE_DURATION), [move]);
	const handlers = useSwipeable({
		touchEventOptions: {passive: false},
		onSwiped(event) {
			if (progressState.value) {
				event.event.preventDefault();
				handleMove(DIRECTION_BY_SWIPE[event.dir]);
			}
		},
	});

	useClickOutside({
		exludeRef: dialogRef,
		targetRef: contentRef,
		onClickOutside: progressState.setFalse,
	});

	useEffect(() => {
		if (progressState.value) {
			const handleKeyDown = (event: KeyboardEvent) => {
				const direction = DIRECTION_BY_KEY[event.key];
				if (direction) {
					event.preventDefault();
					handleMove(direction);
				}
			};

			document.addEventListener('keydown', handleKeyDown);
			return () => document.removeEventListener('keydown', handleKeyDown);
		}
	}, [progressState.value]);

	const handleOpenSettings = useCallback(() => {
		const close = dialogManager.close.bind(dialogManager);
		dialogManager.open(
			<DialogSettings
				ref={dialogRef}
				config={config}
				onSave={setConfig}
				onClose={close}
			/>
		);
	}, [config]);

	return (
		<GameConfigContext.Provider value={config}>
			<div ref={contentRef} className={styles.content} onClick={progressState.setTrue}>
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
					<GridView />
					<CellsView cells={cells} />
					{isOver && <OverView />}
					{!isOver && !progressState.value && <PlayView />}
				</div>
			</div>
		</GameConfigContext.Provider>
	);
}
