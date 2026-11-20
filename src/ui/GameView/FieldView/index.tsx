import React, {useMemo} from 'react';
import {useGameConfig} from 'hooks/useGameConfig';
import {getCellKey, getRowKey} from './utils';
import styles from './index.css';

export function FieldView() {
  const {rows, cols} = useGameConfig();
  const width = useMemo(() => 100 / cols, [cols]);
  const style = {width: `${width}%`};

  return (
    <div className={styles.container}>
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
