import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useSwipeable} from 'react-swipeable';
import {useGameManager} from 'hooks/useGameManager';
import {useClickOutside} from 'hooks/useClickOutside';
import {useBooleanState} from 'hooks/useBooleanState';
import {Score} from 'components/Score';
import {ButtonRestart} from 'components/ButtonRestart';
import {ButtonSettings} from 'components/ButtonSettings';
import {throttle} from 'lib/event';
import {GameConfig} from 'lib/game/types';
import {GameConfigContext} from 'lib/game/context';
import {
	DEFAULT_CONFIG,
	DIRECTION_BY_KEY,
	DIRECTION_BY_SWIPE,
	MOVE_THROTTLE_DURATION,
} from 'lib/game/constants';

import {SettingsView} from './SettingsView';
import {FieldView} from './FieldView';
import {PauseView} from './PauseView';
import {CellsView} from './CellsView';
import {OverView} from './OverView';
import styles from './index.css';

export type Props = {
	intialConfig?: GameConfig;
	configurable?: boolean;
};

export function GameView({
	intialConfig = DEFAULT_CONFIG,
	configurable = false,
}: Props) {
	const progressState = useBooleanState();
	const settingsState = useBooleanState();
	const contentRef = useRef<HTMLDivElement>(null);
	const [config, setConfig] = useState(intialConfig);
	const {cells, score, isOver, restart, move} = useGameManager(config);

	const handleMove = useCallback(throttle(move, MOVE_THROTTLE_DURATION), [move]);
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
						{configurable && (
							<ButtonSettings
								isOpen={settingsState.value}
								onClick={settingsState.toggle}
							/>
						)}
					</div>
				</div>
				{!settingsState.value && (
					<div {...handlers} className={styles.field}>
						<FieldView />
						<CellsView cells={cells} />
						{isOver && <OverView />}
						{!isOver && !progressState.value && <PauseView />}
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
