import {useGame} from 'hooks/useGame';
import {useGameConfig} from 'hooks/useGameConfig';
import React, {useMemo} from 'react';
import styles from './index.css';
import {getCellKey, getRowKey} from './utils';

export function GridView() {
  const {rows, cols} = useGameConfig();
  const width = useMemo(() => 100 / cols, [cols]);
  const style = {width: `${width}%`};

  return (
    <div>
      {new Array(rows).fill(null).map((_, rowIndex) => (
        <div className={styles.row} key={getRowKey(rowIndex)}>
          {new Array(cols).fill(null).map((_, cellIndex) => (
            <div style={style} className={styles.cell} key={getCellKey(rowIndex, cellIndex)}>
              <div className={styles.inner} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
