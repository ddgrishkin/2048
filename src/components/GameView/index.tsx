import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useSwipeable} from 'react-swipeable';
import {useGameManager} from 'hooks/useGameManager';
import {useClickOutside} from 'hooks/useClickOutside';
import {useBooleanState} from 'hooks/useBooleanState';
import {Score} from 'components/Score';
import {ButtonClose} from 'components/ButtonClose';
import {ButtonRestart} from 'components/ButtonRestart';
import {ButtonSettings} from 'components/ButtonSettings';
import {throttle} from 'lib/event';
import {GameConfigContext} from 'lib/game/context';
import {DEFAULT_CONFIG} from 'lib/game/constants';
import {DIRECTION_BY_KEY, DIRECTION_BY_SWIPE} from 'lib/game/constants';
import {SettingsView} from './SettingsView';
import {FieldView} from './FieldView';
import {CellsView} from './CellsView';
import {OverView} from './OverView';
import {PlayView} from './PlayView';
import styles from './index.css';

const THROTTLE_DURATION = 100;

export function GameView() {
	const progressState = useBooleanState();
	const settingsState = useBooleanState();
	const contentRef = useRef<HTMLDivElement>(null);
	const [config, setConfig] = useState(DEFAULT_CONFIG);
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

	return (
		<GameConfigContext.Provider value={config}>
			<div ref={contentRef} className={styles.content} onClick={progressState.setTrue}>
				<div className={styles.header}>
					<div className={styles.info}>
						<div className={styles.controls}>
							<Score value={score} />
							<ButtonRestart onClick={restart} />
						</div>
						{settingsState.value
							? <ButtonClose onClick={settingsState.setFalse} />
							: <ButtonSettings onClick={settingsState.setTrue} />}
					</div>
				</div>
				{!settingsState.value && (
					<div {...handlers} className={styles.field}>
						<FieldView />
						<CellsView cells={cells} />
						{isOver && <OverView />}
						{!isOver && !progressState.value && <PlayView />}
					</div>
				)}
				{settingsState.value && (
					<SettingsView
						config={config}
						onSave={setConfig}
						onClose={settingsState.setFalse}
					/>
				)}
			</div>
		</GameConfigContext.Provider>
	);
}
