import {FieldSize} from 'lib/field/types';
import {GameConfig} from './types';

export function getFieldSizeFromGameConfig(config: GameConfig): FieldSize {
	return {rows: config.rows, cols: config.cols};
}
