import {SwipeDirections} from 'react-swipeable';
import {GameConfig} from 'lib/game/types';
import {Direction} from 'lib/types';
import {Key} from 'lib/event/types';

export const MOVE_THROTTLE_DURATION = 100;

export const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left'];
export const DIRECTION_BY_SWIPE: Record<SwipeDirections, Direction> = {
  'Up': 'up',
  'Down': 'down',
  'Left': 'left',
  'Right': 'right',
};

export const DIRECTION_BY_KEY: Record<string, Direction | undefined> = {
  [Key.ARROW_UP]: 'up',
  [Key.ARROW_DOWN]: 'down',
  [Key.ARROW_LEFT]: 'left',
  [Key.ARROW_RIGHT]: 'right',
};

export const DEFAULT_CONFIG: GameConfig = {
	digit: 2,
  cols: 4,
  rows: 4,
};
