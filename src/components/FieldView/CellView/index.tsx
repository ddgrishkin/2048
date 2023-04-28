import {useGameConfig} from 'hooks/useGameConfig';
import {ReactCell} from 'lib/react/ReactCell';
import React, {useMemo} from 'react';
import styles from './index.css';
import {generateColorsMap, getTranslate} from './utils';

export type Props = {
  cell: ReactCell;
};

export function CellView({cell}: Props) {
  const {rows, cols, digit} = useGameConfig();
  const colorByValue = useMemo(() => generateColorsMap(digit), [digit]);
  const width = useMemo(() => 100 / cols, [cols]);
  const style = {
    width: `${width}%`,
    transform: getTranslate(cell.coord),
  };

  return (
    <div className={styles.cell} style={style}>
      <div className={styles.inner} style={{background: colorByValue[cell.value]}} />
      <div className={styles.value}>
          {cell.value}
        </div>
    </div>
  );
}
